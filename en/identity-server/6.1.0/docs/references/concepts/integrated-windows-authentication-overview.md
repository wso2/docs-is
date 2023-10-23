# Integrated Windows Authentication

Integrated Windows Authentication (IWA) is a popular authentication mechanism used to authenticate users on Microsoft Windows servers.

---

## Introduction to IWA

IWA is a mechanism used by Microsoft Windows NT-based operating systems to authenticate their users to web applications. This is an easy method for users to log in to web applications that use Windows Active Directory as a user store.

This authentication mechanism does not use the traditional form-based authentication, where the users have to enter credentials in a form. Instead, it uses a browser-based authentication, where the authentication is handled by the web browser.

In the browser-based authentication method, the browser obtains the user credentials of the logged in user and authenticates the user with the help of the Windows server and the active directory.

**Requirements for IWA**

Following are the requirements for an application to use IWA:

- A Windows Server
- An Active Directory user store
- Web application protected with IWA
- Web application and the server should be on the same domain

Once all the requirements are fulfilled and the user enters the correct protected web application URL on the browser, the browser and the server uses IWA to authenticate the user.

## How IWA works

The following diagram indicates how the authentication procedure works.

![IWA SSO diagram]({{base_path}}/assets/img/concepts/iwa-work-flow.png)

---

## Pros and cons of IWA
This section covers the pros and cons of using IWA for your web applications.

### Pros
- Once a user logs into the windows domain they can automatically log in to IWA enabled web application within the same domain.
- Using IWA is secure, because IWA uses a hash function and a challenge response to authenticate the users

### Cons
- The client should  always be in the same domain as the server. IWA is functional only within the Intranet.
- For some web browsers (ex: Mozilla Firefox), IWA requires extra configurations.

---

## IWA for a Java web apps

IWA was developed by Microsoft as an authentication mechanism for their .NET-based IIS servers.

However, neither Java nor the server applications that host Java web applications (like Tomcat) have native support for IWA. There are several third-party libraries that provide the ability to enable the IWA for Java web applications. Following are some of those libraries:

- **JCIFS** is an open-source library that had been commonly used for IWA authentication of Java web applications. However, this library is no longer maintained and it is not recommended to use due to security flaws.
- **JESPA** is a commercial library that can be used to enable IWA in Java web applications.
- **Tomcat IWA** is Tomcat's implementation of IWA. However, this is not fully completed yet.
- **SPNEGO** is an open-source library. which uses Java Authentication and Authorization Service (JAAS) for authentication.
- **WAFFLE** is also an open-source library. It can be configured easily to use with the Java web applications.  

!!! info "Related topics"
    - See [configuring IWA Single-Sign-On]({{base_path}}/guides/login/configure-iwa-single-sign-on) to configure integrated windows authentication in WSO2 Identity Server.