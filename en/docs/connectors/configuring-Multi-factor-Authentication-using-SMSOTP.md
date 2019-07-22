# Configuring Multi-factor Authentication using SMSOTP

This topic provides instructions on how to configure the SMS OTP
connector and the WSO2 Identity Server (WSO2 IS) to integrate using a
sample app. This is configured so that SMSOTP is a second authentication
factor for the sample application. See the following sections for more
information.

To know more about the WSO2 Identity Server versions supported by this
connector, see the [WSO2
store](https://store.wso2.com/store/assets/isconnector/details/462ce8e9-8274-496c-a1c3-8aa40168bb1b)
.

This connector is supported by default from WSO2 Identity Server 5.4.0
onwards. For more information, see [Configuring SMS
OTP](https://docs.wso2.com/identity-server/Configuring+SMS+OTP).

-   [Deploying SMS OTP
    artifacts](#ConfiguringMulti-factorAuthenticationusingSMSOTP-DeployingSMSOTPartifacts)
-   [Deploying travelocity.com
    sample](#ConfiguringMulti-factorAuthenticationusingSMSOTP-Deployingtravelocity.comsampleDeployingtravelocity.comsample)
-   [Configuring the identity
    provider](#ConfiguringMulti-factorAuthenticationusingSMSOTP-Configuringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringMulti-factorAuthenticationusingSMSOTP-Configuringtheserviceprovider)
-   [Configuring
    claims](#ConfiguringMulti-factorAuthenticationusingSMSOTP-Configuringclaims)
-   [Testing the
    sample](#ConfiguringMulti-factorAuthenticationusingSMSOTP-Testingthesample)

!!! note
    
    **Note** : These configurations work with 2.0.9 to 2.0.12 version of the
    connector. If you have a older version, upgrade the connector and
    artifacts to the latest version from the [connector
    store](https://store.wso2.com/store/assets/isconnector/details/ec6a18ae-4763-4958-bc61-8e12f5b441ac)
    .
    
    The connector that is shipped OOTB with WSO2 Identity Server 5.3.0 is
    connector version 2.0.6. Therefore, if you are using WSO2 IS 5.3.0,
    upgrade the connector and artifacts to version 2.0.9 before you begin.
    Also the connector that is shipped OOTB with WSO2 Identity Server 5.7.0
    is connector version 2.0.15.
    

### Deploying SMS OTP artifacts

The artifacts can be obtained from [the store for this
authenticator](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22smsotp%22)
.

1.  P lace the `            smsotpauthenticationendpoint.war           `
    file inside the
    `            <IS_HOME>/repository/deployment/server/webapps           `
    directory.
2.  Place the
    `             org.wso2.carbon.extension.identity.authenticator.smsotp.connector-2.X.X.jar            `
    file inside the
    `             <IS_HOME>/repository/components/dropins            `
    directory.  

    !!! note
    
        If you want to upgrade the SMS OTP Authenticator in your existing
        WSO2 IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

3.  Add the following configurations in the
    `             <IS_HOME>/repository/conf/identity/application-authentication.xml            `
    file under the `             <AuthenticatorConfigs>            `
    section.

    ``` xml
    <AuthenticatorConfig name="SMSOTP" enabled="true">
        <Parameter name="SMSOTPAuthenticationEndpointURL">https://localhost:9443/smsotpauthenticationendpoint/smsotp.jsp</Parameter>
        <Parameter name="SMSOTPAuthenticationEndpointErrorPage">https://localhost:9443/smsotpauthenticationendpoint/smsotpError.jsp</Parameter>
        <Parameter name="MobileNumberRegPage">https://localhost:9443/smsotpauthenticationendpoint/mobile.jsp</Parameter>
        <Parameter name="RetryEnable">true</Parameter>
        <Parameter name="ResendEnable">true</Parameter>
        <Parameter name="BackupCode">true</Parameter>
        <Parameter name="SMSOTPEnableByUserClaim">false</Parameter>
        <Parameter name="SMSOTPMandatory">false</Parameter>
        <Parameter name="usecase">association</Parameter>
        <Parameter name="secondaryUserstore">primary</Parameter>
        <Parameter name="CaptureAndUpdateMobileNumber">true</Parameter>
        <Parameter name="SendOTPDirectlyToMobile">false</Parameter>
    </AuthenticatorConfig>
    ```

    The following table includes the definition of the parameters and
    the various values you can configure.

    <table>
    <thead>
    <tr class="header">
    <th>Value</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><pre><code>RetryEnable</code></pre></td>
    <td>This field makes it possible to retry the code if the user uses the wrong code. This value can be <code>                                   true                                 </code> or <code>                                   false.                                                  </code></td>
    </tr>
    <tr class="even">
    <td><pre><code>ResendEnable</code></pre></td>
    <td>This parameter makes it possible to resend the code in the same page if user enters the wrong code. This value can be <code>                                   true                                 </code> or <code>                                   false.                                                  </code></td>
    </tr>
    <tr class="odd">
    <td><pre><code>SMSOTPEnableByUserClaim</code></pre></td>
    <td>This field makes it possible to disable the 'SMS OTP disabling by user' functionality. The value can be <code>                                   true                                 </code> or <code>                                                      false                                   </code> . If the value is <code>                                                      true                                   </code>, the user can enable and disable the SMS OTP according to what the admin selects ( <code>                                   SMSOTPMandatory                 </code> parameter value).</td>
    </tr>
    <tr class="even">
    <td><pre><code>BackupCode</code></pre></td>
    <td>The backup code is used instead of the actual SMS code. The value can be <code>                                   true                                 </code> or <code>                                   false                                 </code> . If you do not want backup codes, set this as <code>                                                      false                                                   </code> . You can skip the steps 6.a and 7 in the Configuring claims section. <code>                </code></td>
    </tr>
    <tr class="odd">
    <td><pre><code>SMSOTPMandatory</code></pre></td>
    <td>If the value is <code>                 true                </code>, the second step is enabled by the admin. The user cannot be authenticated without the SMS OTP authentication. This parameter is used for both the super tenant and tenant in the configuration. The value can be <code>                                   true                                 </code> or <code>                                   false.                                 </code></td>
    </tr>
    <tr class="even">
    <td><pre><code>SendOTPDirectlyToMobile</code></pre></td>
    <td>In the <code>                 SMSOTPMandatory                </code> case, if the user does not exist in user store and if the admin enables <code>                 SendOTPDirectlyToMobile                </code> as true, then the user can enter the mobile number during the time of authentication and the OTP will directly send to that mobile number.</td>
    </tr>
    <tr class="odd">
    <td><pre><code>CaptureAndUpdateMobileNumber</code></pre></td>
    <td>In the <code>                 SMSOTPMandatory                </code> case, if the user or admin forgets to update the mobile number in the user's profile and this property is true, then the user can update a mobile claim during the time of authentication (logging in for the first time) and ask the user to enter the mobile number to send the OTP.<br />
    This update functionality happen when logging in for the first time only. Once the user updates the mobile number, the next time the user logs in the mobile number is taken from specific user's profile.</td>
    </tr>
    <tr class="even">
    <td><code>                 usecase                </code></td>
    <td>This field can take one of the following values: <code>                                   local                                 </code>, <code>                                   association                                 </code>, <code>                                   userAttribute                                 </code>, <code>                                   subjectUri                                 </code> . If you do not specify any <code>                 usecase                </code>, the default value is <code>                 local                </code> .</td>
    </tr>
    <tr class="odd">
    <td><pre><code>secondaryUserstore</code></pre></td>
    <td><p>The user store configuration is maintained per tenant as comma separated values. For example, <code>                  &lt;Parameter name="secondaryUserstore"&gt;jdbc                 </code>, <code>                  abc                 </code>, and <code>                  xyz&lt;/Parameter&gt;                 </code> .<br />
    </p></td>
    </tr>
    <tr class="even">
    <td><code>                 screenUserAttribute                </code></td>
    <td>If you need to show n digits of mobile number or any other user attribute value in the User Interface (UI), This parameter is used to pick the claim URI.</td>
    </tr>
    <tr class="odd">
    <td><code>                 order                </code></td>
    <td>Define the order of the n numbers you provide, such as the from the first or last or vice versa. The possible values for this property is backward or forward.</td>
    </tr>
    <tr class="even">
    <td><code>                 noOfDigits                </code></td>
    <td>The number of digits of claim value to show in UI. If the mobile claim selected for the property <code>                 screenUserAttribute                </code> and if the <code>                 noOfDigitsproperty                </code> has the value 4 then we can show the mobile number according to the property order. If the order is backward, then we can show the last 4 digits of mobile claim in the UI.</td>
    </tr>
    </tbody>
    </table>

    An admin can change the priority of the SMSOTP authenticator by
    changing the `             SMSOTPMandatory            ` value (
    `             true            ` or `             false            `
    ).

    -   If the Admin specifies that SMS OTP is mandatory (
        `              <Parameter name="SMSOTPMandatory">true</Parameter>)             `
       , you must enable SMS OTP in the user’s profile by adding the
        claim value as true in order to authenticate the user. If this
        is not done, the SMSOTP error page appears.
    -   If the Admin specifies that SMSOTP is optional (
        `              <Parameter name="SMSOTPMandatory">false</Parameter>)             `
        and you enable SMS OTP in the user's profile, the authenticator
        allows the user to login with the SMS OTP authentication as a
        second step (multi-step authentication). If the Admin
        specifies that the SMS OTP is optional and you do not enable SMS
        OTP in the user's profile, the SMSOTP authenticator proceeds to
        log the user in as the first step (basic authentication).

    The first step may be a local authenticator (basic) or a federated
    authenticator (e.g., Facebook, Twitter, etc.) . In federated
    authenticator support in first step, the following parameters are
    used according to the scenario.

    ``` java
             <Parameter name="usecase">association</Parameter>
             <Parameter name="secondaryUserstore">jdbc</Parameter>
    ```

    The usecase value can be local, association,
    `             userAttribute            ` or
    `             subjectUri            ` .

    <table>
    <tbody>
    <tr class="odd">
    <td><code>                 local                </code></td>
    <td><p>This is based on the federated username. This is the default value. You must set the federated username in the localuserstore. Basically, the federated username must be the same as the local username.</p></td>
    </tr>
    <tr class="even">
    <td><code>                 association                </code></td>
    <td><p>The federated username must be associated with the local account in advance in the Dashboard. So the local username is retrieved from the association. To associate the user, log into the <a href="https://docs.wso2.com/display/IS510/Using+the+End+User+Dashboard">end user dashboard</a> and go to <strong>Associated Account</strong> by clicking <strong>View details</strong> .</p></td>
    </tr>
    <tr class="odd">
    <td><code>                 userAttribute                </code></td>
    <td><div class="content-wrapper">
    <p>The name of the  federatedauthenticator's user attribute. That is,the local user namewhich is contained in a federated user's attribute. When using this, add the following parameter under the <code>                   &lt;AuthenticatorConfig name="SMSOTP" enabled="true"&gt;                  </code> section in the <code>                   &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                  </code> file and put the value (e.g., email, screen_name, id, etc.).</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>If you use, OpenID Connect supported authenticators such as LinkedIn, Foursquare, etc., or in the case of multiple social login options as the first step and SMSOTP as secondstep, you need to add similar configuration for the specific authenticator in the <code>                   &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                  </code> file under the &lt; <code>                   AuthenticatorConfigs                  </code> &gt; section as follows (the following shows the configuration forFoursquare,LinkedIn and Facebook authenticator respectively).</p>
    <p>Inside the <code>                   AuthenticatorConfig                  </code> (i.e., Foursquare), add the specific <code>                   userAttribute                  </code> with a prefix of the (current step) authenticator name (i.e., SMSOTP-userAttribute).</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;Foursquare&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb2-2" title="2">       <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;SMSOTP-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/foursquare/claims/email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb2-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;LinkedIn&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;SMSOTP-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/linkedin/claims/emailAddress<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb3-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;FacebookAuthenticator&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb4-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;SMSOTP-userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb4-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>Likewise, you can add the AuthenticatorConfig forAmazon,Google,Twitterand Instagram with relevant values.</p>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>                 subjectUri                </code></td>
    <td><p>When configuring the federated authenticator, select the attribute in the subject identifier under the service provider section in UI, this is used as the username of the SMSOTP authenticator.</p></td>
    </tr>
    </tbody>
    </table>

    If you use the secondary userstore, enter all the userstore values
    for the particular tenant as comma separated values.

    The user store configuration is maintained per tenant:

    -   If you use a **super tenant,** put all the parameter values into
        the
        `               <IS_HOME>/repository/conf/identity/application-authentication.xml              `
        file under the
        `               AuthenticatorConfigs              ` section.

    <!-- -->

    -   If you use a **tenant**, upload the same XML file (
        `               application-authentication.xml              ` )
        into a specific registry location (
        `               /_system/governance/SMSOTP)              ` .
        Create the collection named
        `               SMSOTP              `, add the resource and
        upload the
        `               application-authentication.xml              `
        file into theregistry). While doing the authentication, first it
        checks whether there is an XML file uploaded to the registry. If
        that is so, it reads it from the registry but does not take the
        local file. If there is no file in the registry, then it only
        takes the property values from the local file. This is how
        theuserstore configuration is maintained per tenant. You can use
        the registry or local file to get the property values.

    If you need to show last n digits of mobile number or any other user
    attribute value in UI,  the following parameters can be used 
    according to the scenario. For example, we can use the following
    parameters to get last 4 digits from mobile number.

    ``` xml
         <Parameter name="screenUserAttribute">http://wso2.org/claims/mobile</Parameter>
         <Parameter name="noOfDigits">4</Parameter>
         <Parameter name="order">backward</Parameter>
    ```

The SMS provider is the entity that is used to send the SMS. The SMSOTP
connector has been configured such that it can be used with most types
of SMS APIs. Some use the GET method with the client secret and API Key
encoded in the URL (e.g., Nexmo), while some may use the POST method
when sending the values in the headers and the message and telephone
number in the payload (e.g., Clickatell). Note that this could change
significantly between different SMS providers. The configuration of the
connector in the identity provider would also change based on this.

### Deploying [travelocity.com](http://travelocity.com) sample

The next step is to [deploy the sample app](_Deploying_the_Sample_App_)
in order to use it in this scenario.

O nce this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity
provider](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)
and a [service provider](https://docs.wso2.com/display/IS510).

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and
    [run it](https://docs.wso2.com/display/IS510/Running+the+Product).
2.  Download the certificate of the SMS provider. Go to the link (eg:-
    [https://www.nexmo.com)](https://www.nexmo.com/) in your browser,
    and then click the HTTPS trust icon on the address bar (e.g., the
    padlock next to the URL in Chrome)
3.  Import that certificate into the IS client keystore.  
    `             keytool -importcert -file <certificate file> -keystore <IS>/repository/resources/security/client-truststore.jks -alias "Nexmo"            `

    Default client-truststore.jks password is "wso2carbon"

4.  Log into the [management
    console](https://docs.wso2.com/display/IS510/Getting+Started+with+the+Management+Console)
    as an administrator.

5.  In the **Identity** section under the **Main** tab of the management
    console, click **Add** under **Identity Providers**.

6.  Give a suitable name (e.g., SMSOTP) as the **Identity Provider
    Name**.

7.  Go to the **SMSOTP Configuration** under **Federated
    Authenticators**.

8.  Select both checkboxes to **Enable SMSOTP Authenticator** and make
    it the **Default**.

9.  Enter the SMS URL and the HTTP Method used (e.g., GET or POST).
    Include the headers and payload if the API uses any. If the text
    message and the phone number are passed as parameters in any field,
    then include them as $ctx.num and $ctx.msg respectively. You must
    also enter the HTTP Response Code the SMS service provider sends
    when the API is successfully called. Nexmo API and Bulksms API send
    200 as the code, while Clickatell and Plivo send 202. If this value
    is unknown, leave it blank and the connector checks if the response
    is 200, 201 or 202.

    **Note** : If Nexmo is used as the SMS provider,

    1.  Go to <https://dashboard.nexmo.com/sign-up> and click free
        signup and register.
    2.  Under **API Settings** in **Settings**, copy and save the API
        key and Secret.
    3.  The Nexmo API requires the parameters to be encoded in the URL,
        so the SMS URL would be as follows.

        |             |                                                                                                                                    |
        |-------------|------------------------------------------------------------------------------------------------------------------------------------|
        | SMS URL     | *https://rest.nexmo.com/sms/json?api\_key=\*\*\*\*\*\*\*\*\*&api\_secret=\*\*\*\*\*\*\*\*&from=NEXMO&to= $ctx.num &text= $ctx.msg* |
        | HTTP Method | GET                                                                                                                                |

    **Note** : If Clickatell is used as the SMS provider,

    1.  Go to <https://secure.clickatell.com/#/login> and create
        an account.
    2.  The auth token is provided when you register with Clickatell.

    3.  Clickatell uses a POST method with headers and the text message
        and phone number are sent as the payload. So the fields would be
        as follows.

        |              |                                                                                                             |
        |--------------|-------------------------------------------------------------------------------------------------------------|
        | SMS URL      | https://api.clickatell.com/rest/message                                                                     |
        | HTTP Method  | POST                                                                                                        |
        | HTTP Headers | X-Version: 1,Authorization: bearer \*\*\*\*\*\*\*\*,Accept: application/json,Content-Type: application/json |
        | HTTP Payload | {"text":" $ctx.msg ","to":\[" $ctx.num "\]}                                                                 |

    **Note** : If Plivo is used as the SMS provider,

    1.  Sign up for a free [Plivo trial
        account](https://manage.plivo.com/accounts/register/?utm_source=send%bulk%20sms&utm_medium=sms-docs&utm_campaign=internal)
        .
    2.  Phone numbers must be verified at the [Sandbox
        Numbers](https://manage.plivo.com/sandbox-numbers/) page (add at
        least two numbers and verify them).

    3.  The Plivo API is authenticated with Basic Auth using your
        `              AUTH ID             ` and
        `              AUTH TOKEN             `, Your Plivo
        `              AUTH ID             ` and
        `              AUTH TOKEN             ` can be found when you
        log in to your [dashboard.](https://manage.plivo.com/dashboard/)
    4.  Plivo uses a POST method with headers, and the text message and
        phone number are sent as the payload. So the fields would be as
        follows.

        <table>
        <colgroup>
        <col style="width: 50%" />
        <col style="width: 50%" />
        </colgroup>
        <tbody>
        <tr class="odd">
        <td>SMS URL</td>
        <td><p><a href="https://api.plivo.com/v1/Account/%7Bauth_id%7D/Message/">https://api.plivo.com/v1/Account/{auth_id}/Message/</a></p></td>
        </tr>
        <tr class="even">
        <td>HTTP Method</td>
        <td>POST</td>
        </tr>
        <tr class="odd">
        <td>HTTP Headers</td>
        <td>Authorization: Basic ********,Content-Type: application/json</td>
        </tr>
        <tr class="even">
        <td>HTTP Payload</td>
        <td>{"src":"+94*********","dst":"$ctx.num","text":"$ctx.msg"}</td>
        </tr>
        </tbody>
        </table>

    **Note** : If Bulksms is used as the SMS provider,

    1.  Go to <https://www2.bulksms.com/login.mc> and create an account.
    2.  While registering the account, verify your mobile number and
        click **Claim** to get free credits.  
        ![](attachments/48276901/51449676.png){width="800" height="198"}

    3.  Bulksms API authentication is performed by providing username
        and password request parameters.
    4.  Bulksms uses a POST method and the required parameters are to be
        encoded in the URL. So the fields would be as follows.

        |              |                                                                                                                                         |
        |--------------|-----------------------------------------------------------------------------------------------------------------------------------------|
        | SMS URL      | https://bulksms.vsms.net/eapi/submission/send\_sms/2/2.0?username=\*\*\*\*\*\*\*&password=\*\*\*\*\*\*&message=$ctx.msg&msisdn=$ctx.num |
        | HTTP Method  | POST                                                                                                                                    |
        | HTTP Headers | Content-Type: application/x-www-form-urlencoded                                                                                         |

          

    **Note** : If Twilio is used as the SMS provider,

    1.  Go to <https://www.twilio.com/try-twilio> and create an account.
    2.  While registering the account, verify your mobile number and
        click on console home <https://www.twilio.com/console> to get
        free credits (Account SID and Auth Token).

    3.  Twilio uses a POST method with headers and the text message and
        phone number are sent as the payload. So the fields would be as
        follows.  

        |              |                                                                           |
        |--------------|---------------------------------------------------------------------------|
        | SMS URL      | https://api.twilio.com/2010-04-01/Accounts/{AccountSID}/SMS/Messages.json |
        | HTTP Method  | POST                                                                      |
        | HTTP Headers | Authorization: Basic base64{AccountSID:AuthToken}                         |
        | HTTP Payload | Body=$ctx.msg&To=$ctx.num&From=urlencode{FROM\_NUM}                       |

          

10. Click **Update** and you have now added and configured the
    Identity provider.  

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Identity** section under the **Main** tab, click **Add**
    under **Service Providers**.

3.  Enter **[travelocity.com](http://travelocity.com)** in the **Service
    Provider Name** text box and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    ![](attachments/48276901/48211841.png?effects=border-simple,blur-border){width="500"}

5.  Now set the configuration as follows:

    1.  **Issuer** : [travelocity.com](http://travelocity.com)

    2.  **Assertion Consumer URL** :
        http://localhost:8080/travelocity.com/home.jsp

6.  Select the following check-boxes:
    1.  **Enable Response Signing**

    2.  **Enable Single Logout**

    3.  **Enable Attribute Profile**

    4.  **Include Attributes in the Response Always**

7.  Click **Update** to save the changes. Now you will be sent back to
    the Service Providers page.

8.  Go to **Claim configuration** and select the mobile claim.

    ![](attachments/48276901/48211842.png?effects=border-simple,blur-border){width="700"}

9.  Go to **Local and Outbound Authentication Configuration** section.

10. Select the **Advanced configuration** radio button option.

11. Add the **basic** authentication as first step and **SMSOTP**
    authentication as a second step. Adding basic authentication as a
    first step ensures that the first step of authentication will be
    done using the user's credentials that are configured with the WSO2
    Identity Server. SMSOTP is a second step that adds another layer of
    authentication and security.  
    ![](attachments/48276901/49222039.png?effects=border-simple,shadow-kn){width="700"}

12. Alternatively, federated authentication as the first step and SMSOTP
    authentication as the second step and click **Update** to save the
    changes.

You have now added and configured the service provider.

### Configuring claims

1.  Select **List** under **Users** **and** **Roles** in the IS
    Management Console.
2.  Go to the **User Profile** and update the mobile number (this number
    must be registered with Nexmo in order to send SMS).  
    ![](attachments/48276901/49222049.png?effects=border-simple,shadow-kn){width="500"}  
    **Note:** If you wish to use the backup codes to authenticate, you
    can add the following claim, otherwise you can leave it.
3.  In the **Main** menu, click **Add** under **Claims**.
4.  Click [Add New
    Claim](https://docs.wso2.com/display/IS510/Adding+New+Claim+Mapping)
    .
5.  Select the **Dialect** from the dropdown provided and enter the
    required information.
6.  Add the following user claims under ' http://wso2.org/claims' .  
    1.  Add the claim Uri -
        http://wso2.org/claims/identity/smsotp\_disabled . This is an
        optional claim for SMSOTP.
    2.  Add the claim Uri - http://wso2.org/claims/otpbackupcodes  
        The backup code claim is an optional.
7.  Once you add the above claim, Go to Users → admin →User Profile and
    update the Backup codes and user can disable SMS OTP by clicking
    "Disable SMS OTP".

    ![](attachments/48276901/57749623.png){width="600"}

### Testing the sample

1.  To test the sample, go to the following URL:
    [http://localhost:8080/travelocity.com  
    ](http://localhost:8080/travelocity.com)

    [![](attachments/48276901/48211814.png?effects=border-simple,blur-border){width="500"}  
    ](http://localhost:8080/travelocity.com)

2.  Click the link to log in with SAML from WSO2 Identity Server.

3.  The basic authentication page will be visible. Use your WSO2
    Identity Server credentials to sign in.  
    ![](attachments/48276901/48211843.png?effects=border-simple,blur-border){width="500"}

4.  You will get a token to your mobile phone.Type the code to
    authenticate, You will be taken to the home page of the
    [travelocity.com](http://travelocity.com) app

    !!! note
    
        **Note** : In case, If you forget the mobile phone number or do not
        have access to it, you can use the backup codes to authenticate and
        you will be taken to the home page of the
        [travelocity.com](http://travelocity.com) application.
    

    ![](attachments/48276901/49221144.png?effects=border-simple,shadow-kn){width="500"}

    ![](attachments/48276901/49222070.png?effects=border-simple,shadow-kn){width="500"
    height="222"}

  

  
  
  

  
