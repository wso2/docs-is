# OAuth 2.0 Clients

The [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749)
defines two types of clients based on their ability to maintain the
confidentiality of client credentials as below.

-   Confidential:

	A Confidential client is capable of maintaining the confidentiality of
	its credentials provided by an authorization server. For example a web
	application where only the administrator can get access to the server
	and see the client credentials would be a confidential client.

-   Public:

	A public client is not capable of maintaining the confidentiality of its
	credentials provided by an authorization server. For example a mobile
	phone application or a desktop application that has the client secret
	embedded, could get cracked, and the secret could be revealed. The same
	is true for a JavaScript application running in the users browser. The
	user could use a JavaScript debugger to look into the application, and
	see client credentials.

With respect to above two client types there are applications invoking
OAuth 2.0 APIs, that can be either confidential or public. These
application profiles are as below.

**Web Application**

Web applications run on a web server and they typically consists of both
a browser part and a server part. Thus they can maintain the
confidentiality of client credentials as well as any access token issued
to the client as they can be stored on the web server, such that they
are not exposed to or accessible by the user.

The diagram below illustrates a confidential client web application.
Here the user interacts with the browser which is communicating with the
client. The client has a separate secure communication channel with the
authorization server and the resource server. Thus, the user’s browser
never makes a request directly to the Authorization server, everything
goes through the client first.

![oauth2-auth-code-diagram](../assets/img/using-wso2-identity-server/oauth2-auth-code-diagram.png)

Typically, the [authorization code grant type](../../learn/authorization-code-grant) is
used with these clients.

  

**User Agent Based Application**

A user agent based application is a public client in which the
Javascript and HTML source code is downloaded from a web server and
executes within a browser.  As the entire source is available to the
browser, these applications cannot maintain the confidentiality, thus
protocol data and credentials are easily accessible to the user.
Typically these applications are also known as Single-page apps (SPAs)
or browser-based apps.

The diagram below illustrates a user agent based application. After
first downloading the Javascript and HTML source code from the client,
the browser then makes direct requests to the Authorization server.

![oauth2-implicit-diagram](../assets/img/using-wso2-identity-server/oauth2-implicit-diagram.png)

Typically, the [implicit grant type](../../learn/implicit-grant) is used with these
clients.

!!! tip
    Refer [this blog
    post](http://blog.facilelogin.com/2015/06/oauth-20-with-single-page-applications.html)
    to learn more on protecting SPAs in accessing OAuth 2.0 secured APIs.
    

**  
Native Application**

A native application is a public client installed and executed on the
device used by the user.  Typically, mobile applications and desktop
applications fall in this category. Here, protocol data and credentials
are accessible to the user.  It is assumed that any client
authentication credentials included in the application can be extracted.
 At a minimum, credentials are protected from hostile servers with which
the application may interact, and on some platforms, these credential
might be protected from other applications residing on the same device.

It is usually recommended to take the advantage of
[PKCE](https://tools.ietf.org/html/rfc7636) extension with native
clients to mitigate [code interception attacks](../../administer/mitigating-authorization-code-interception-attacks) when
using [authorization code grant type](../../learn/authorization-code-grant) to
access secured services.
