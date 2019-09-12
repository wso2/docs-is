# Timestamp in WS-Security to Mitigate Replay Attacks

The following sections describe replay attacks and expand on how
timestamps can be used to mitigate these attacks in WS-Security.

### How replay attacks can be harmful?

When sensitive information is exchanged or critical transactions are
performed over the network, it becomes necessary to secure the
communication. General requirements of secure message communication are
authentication, integrity, confidentiality and non-repudiation. These
requirements can be achieved through transport level security or message
level security mechanisms such as security tokens, signature and
encryption. Even though you adopt these mechanisms to secure a message,
a secure message can be intercepted on the wire and the message can be
resent repeatedly to the same endpoint and cause severe damage, unless
there is a mechanism to verify the validity/originality of the message.

For an example:

-   A user logs into an online banking application and performs a
    transaction.
-   An attacker traces the messages exchanged during the process.
-   The attacker resends the sequence of messages involved with a login
    step, to login and steal money from the bank account.

### Timestamp in WS-Security

Due to replay attacks, it is important to validate the freshness of a
message before performing any operation that the message invokes. This
validation can be performed either in the business logic or security
processing layer of the platform in a generic manner. If your SOAP
message processing engine supports WS-Security to achieve message level
security; the Timestamp element defined there helps verifying the
message validity in terms of time.

!!! info "What is WS-Security?"
    WS-Security is a specification that defines a framework to enable
    security related information -as specified by mechanisms such as XML
    security, XML signature etc- be embedded in the SOAP message.

The Timestamp element allows the sender to express the creation and
expiration times of the security semantics of the message, using which,
the recipient can validate the freshness of the security semantics of
the message to mitigate replay attacks.

The following is the schema of Timestamp element.

``` xml
<wsu:timestamp wsu:id="...">  
    <wsu:created valuetype="...">...</wsu:created>  
    <wsu:expires valuetype="...">...</wsu:expires>  
    ...  
</wsu:timestamp>
```

Few points to be noted are:

-   Time references must be in UTC time.
-   Time references are recommended to be in
    `          xsd:dateTime         ` format, if in any other format is
    used, it should be specified in `          ValueType         `
    attribute.
-   The specification does not mention any mechanism for synchronizing
    the time between the sender and recipient. However, it specifies
    that this should be addressed.
-   The Timestamp element should be signed in order to prevent it being
    forged.
-   Another sub-element that may present in Timestamp element is
    `          wsu:received         ` that can be included by an
    intermediary.
-   Only one global timestamp element can be present in one security
    header.

The following is an actual Timestamp element extracted from a secured
message.

``` xml
<wsu:timestamp wsu:id="Timestamp-1" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">  
     <wsu:created>2011-09-24T12:11:41.331Z</wsu:created>  
     <wsu:expires>2011-09-24T12:16:41.331Z</wsu:expires>  
</wsu:timestamp>
```

The sections in this topic are related to Timestamp as defined in the
specification. The following sections discuss how it is being utilized
and processed in an actual implementation by referring to Rampart and
WSS4J.

### Rampart and WSS4J

Rampart is the Axis2 module that introduces security processing handlers
to the inflow and outflow of the Axis2 SOAP processing engine. Rampart
internally utilizes WSS4J which implements the support for WS-Security.

The following are the rampart configuration parameters that allows you
to configure and control Timestamp handling in Rampart and WSS4J
(applies to Rampart 1.6.2 or above).

``` xml
<rampart:rampartconfig xmlns:rampart="http://ws.apache.org/rampart/policy">  
      ...  
      <rampart:timestampprecisioninmilliseconds>true  
      </rampart:timestampprecisioninmilliseconds>  
      <rampart:timestampttl>300</rampart:timestampttl>  
      <rampart:timestampmaxskew>300</rampart:timestampmaxskew>  
      <rampart:timestampstrict>false</rampart:timestampstrict>  
      ...  
</rampart:rampartconfig>
```

-   `          timestampprecisioninmilliseconds         ` : This decides
    whether the precision of the timestamp reference is in milliseconds.
    This is a configuration parameter passed to WSS4J, when creating
    WSSConfig.
-   `          timestampttl         ` : This is the validity period of
    the message as decided by the sender of the message. This is used in
    Rampart level to calculate the "expires" time reference. Default
    value is 300 seconds.
-   `          timestampmaxskew         ` : Specifies the maximum
    tolerance limit for the clock skewed between the sender and
    recipient. As specified by the WS-Security specification, it should
    be taken into consideration that the sender and recipient may not
    have synchronized clocks and proper measures should be taken to
    avoid it. This is a rampart level configuration parameter and the
    default value is 300 seconds.
-   `          timestampstrict         ` : This instructs rampart
    whether to enable timestamp validation at WSS4J level or not. This
    is set to false by default. Timestamp validation happens in
    `          PolicyBasedResultsValidator         ` of Rampart.

### How Timestamp is created

`         RampartSender        ` is the handler introduced by Rampart
for security processing of the outflow of Axis2. In the process of
securing the outgoing message according to the defined security policy,
`         BindingBuilder        ` adds the Timestamp element to the
security header.

The following is how ' `         created        ` ' and '
`         expires        ` ' time references of Timestamp are derived:

-   `created = current time`
-   `expires = created(in millis) + timestampttl*1000`

### How Timestamp is validated

`         RampartReceiver        ` is the handler introduced by Rampart
for security processing of the inflow of Axis2. In the process of
validating the security of the incoming message, both
`         WSSecurityEngine        ` (in WSS4J) and
`         PolicyBasedResultsValidator        ` (in Rampart) validates
Timestamp in the security header. WSS4J only checks whether the '
`         expires        ` ' time reference is before the current time
of the receiver, to validate timestamp.

Rampart verifies the timestamp taking
`         timestampmaxskew        ` also into consideration and
validates against both ' `         created        ` ' and '
`         expires        ` ' time references.

Timestamp is invalid if:

- `current time < [created - (timestampmaxskew*1000)] (in millis)`
- `current time > [created + (timestampmaxskew*1000)] (in millis)`
  
Because of the consistent way timestamp is verified in Rampart level
considering both `         created        ` and
`         expires        `, the validation at the WSS4J is disabled by
default with `         timestampstrict        ` set to false.

### Other ways to avoid replay attacks

According to the above logic of validating Timestamp, it is considered
valid during the time period:
```
from (created - timestampskew) to (expires + timestampskew)
```

This means replay attacks made during that period are not detected if
any other mechanism is not adopted to detect and avoid replay
attacks. Some other mechanisms to avoid replay attacks are:

-   Using session keys
-   Using one time passwords
-   Using nonce value

  
