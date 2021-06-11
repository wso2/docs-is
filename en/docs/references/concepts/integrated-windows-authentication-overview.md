# Integrated Windows Authentication

Integrated Windows Authentication (IWA) is a popular authentication
mechanism that is used to authenticate users in Microsoft Windows
servers. This section gives an introduction to IWA authentication,
provides information on how it works, and gives instructions on how to
use it. 

---

## Introduction to Integrated Windows Authentication

Integrated Windows Authentication (IWA) is an authentication mechanism
introduced by Microsoft to authenticate users in Microsoft Windows NT
based operating systems. IWA authentication provides an easier way for
users to log in to web applications that use Windows Active Directory as
an userstore. This is a popular choice of authentication among Windows
server users and administrators.

Most often, we log in to web applications by providing a username and
password on an HTML page. This type of authentication system is called
form-based authentication. However, there are several other ways where
the need for username and password is eliminated when the user is
already authenticated. Integrated Windows Authentication is one such
method. It is known as a browser-based authentication mechanism because
the authentication is handled by the browser. The web browser gets the
credentials of the Windows logged in user and uses those credentials to
authenticate the user with the help of the server and Active Directory.
The only requirement for the user is to simply enter the protected web
application's URL in the browser, and the browser and server take care
of the rest of the authentication and automatically logs the user in
(provided that the user is in the same domain and is a valid and
authorized user to log in). If the authentication fails, the user is
prompted to enter valid credentials to log in to the system.

---

## Authentication procedure

The following diagram indicates how the authentication procedure works.

![IWA SSO diagram](../../../assets/img/concepts/iwa-sso-diagram1.png)

1.  The user (who is already authenticated to the Windows domain when
    they log in to Windows) sends a usual request to a protected page of
    a web application (protected by IWA).
2.  The server rejects the request and sends a response saying the user
    needs to be authenticated using NTLM (NT (New Technology) LAN Manager).
3.  The client browser gets the user's credentials which were used to log
    in to Windows, takes the hash of it, and sends it to the server.
4.  With the hash received, the server looks up the userstore and
    identifies the user, and creates a unique and encrypted challenge to
    send back to the client browser. That challenge can be only
    decrypted using the user's password which the browser already has
    with itself.
5.  The client browser decrypts the challenge with the user's
    credentials which the browser already knows, and sends the response
    back to the server.
6.  The server checks whether the response for the challenge is correct
    and serves the user requested resource if the answer is correct. If
    the answer is wrong, the server denies access to the requested
    resources and sends the unauthorized message.

---

## Pros and cons of IWA

The main advantage of this authentication mechanism is that users do not
need to explicitly provide their credentials. Once users are logged into
the Windows domain they are automatically authenticated for the IWA
enabled web apps if the user is a valid user.

In IWA authentication, the username and password are not sent over the
network. Instead, it uses a hash function and a challenge response scheme
to authenticate. That makes the authentication more secure from
man-in-the-middle type of attacks.

The disadvantage is that since the authentication is done using the
Windows Active Directory it needs both the client and the server to use
Microsoft Windows NT based operating systems. Also, the clients need to
be connected to the domain hosted by the server. This can be used only
within an intranet. Also, IWA may need some configuration on certain
browsers like Mozilla Firefox.

---

## Implement IWA for a Java Web Application

IWA was initially developed by Microsoft as an authentication mechanism
for their .NET based IIS servers. However, neither Java nor the server
applications that host Java web applications (like Tomcat) have native
support for IWA. There are several third party libraries that provide
the ability to enable the IWA for Java web applications. Here are
some of those libraries:

-   **JCIFS** – JCIFS is an open source library that had been commonly
    used a few years ago for IWA authentication of Java web applications.
    However, this library is no longer maintained and it is not
    recommended to use because of security flaws.
-   **JESPA** – JESPA is a commercial library that can be used to enable
    IWA in Java web applications.
-   **Tomcat IWA** – This is Tomcat's implementation of IWA. However,
    this is not fully completed yet.
-   **SPNEGO** – SPNEGO is an open source library. It uses Java
    Authentication and Authorization Service (JAAS) for 
    authentication.
-   **WAFFLE** – WAFFLE is also an open source library. It can be
    configured easily to use with the Java web applications.  

<!--
!!! info "Related topics"

    -   See [Configuring IWA
        Single-Sign-On](../../../guides/login/configure-iwa-single-sign-on) to configure
        integrated windows authentication in WSO2 Identity Server.
-->
