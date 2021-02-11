# Configuring OpenID Connect Single Logout

The [OpenID Connect Session Management
specification](http://openid.net/specs/openid-connect-session-1_0.html)
 provides a way for a Relying Party (RP) to monitor the login status of
an end-user with an OpenID Connect Provider (OP) so that the RP
application can log-out any end user that has logged out of the OP
(i.e., the WSO2 Identity Server). For instance, if there are two RP
applications relying on WSO2 Identity Server, when an end-user logs-out
of one of the applications, he/she can be automatically logged out of
the other one as well.

## How it works

OpenID Connect session management works with two hidden iframes where
both reside at the RP. One is from the RP itself and the other is from
the OP. When authenticating, the OP sends an iframe to the RP. The RP
embed this OP-provided iframe into the RP. The RP checks the session
state via the RP iframe by continuously polling the embedded OP provided
iframe, without causing network traffic. Thereby, the RP is notified
when the session state of the end-user has changed. The flow of this is
as follows.

1.  The RP iframe polls the OP iframe for a session status.
2.  The OP iframe sends back a message (by using HTML5
    Winodw.postMessage()) about the session state as 'changed,
    'unchanged' or 'error'.
3.  If the session state is 'changed', the RP sends a passive request
    for re-authentication.
4.  If the end user has logged out from the OP, the RP will receive an
    authentication failure message along with a new session state value.
    The RP handles this as an end-user logout.
5.  If the end user has not logged out, the RP will receive a successful
    authentication response along with a new session state value.
  

**Related Links**

To test this feature with WSO2 Playground sample, see the [Session
Management with Playground](../../learn/session-management-with-playground) topic.
