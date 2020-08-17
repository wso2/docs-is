# Configure X509 Certificate Authenticator

This page guides you through configuring the X509 certificate authenticator and the WSO2 Identity Server using a sample app to demonstrate authentication.

---

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/mfa/x509"   rel="nofollow noopener">I have my own application</a>

---

{! fragments/work-with-certificates.md !}

---

## Deploy travelocity.com sample app

{! fragments/travelocity.md !}

---

## Configure the service provider

TODO: dev-portal-fragment

---

{! fragments/crl-caching.md !}

---

{! fragments/import-certificates.md !}

---

## Test the sample

1.  To test the sample, go to the following URL:
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
    E.g., http://localhost:8080/travelocity.com
2.  Click the link to log in with SAML from WSO2 Identity Server.

    !!! note
        If you have set this up as the first factor you will not
        get basic authentication.

3.  The basic authentication page appears unless it is not set as the
    first factor. Use your username and password and click **Sign In**
    (Only for the second step).  

4.  You are directed to the X509 certificate authentication page (
    `          https://localhost:8443/x509-certificate-servlet         `
    ). If the authentication is successful, you will be taken to the home page of the travelocity.com app.  

---

!!! note "Related Topics"
    - [Working with certificates](TO DO: concepts)
    - [Configure X509 Certificate Authenticator](../../guides/mfa/x509)