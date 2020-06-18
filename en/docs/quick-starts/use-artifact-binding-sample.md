# Use SAML2 Artifact Binding

This page guides you through enabling [SAML2 artifact binding](TODO:insert-link-to-concept) with WSO2 Identity Server.

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/use-artifact-binding" rel="nofollow noopener">I have my own application</a>

----

## Set up Pickup Dispatch sample

(TO DO: dev-portal-fragment)

{!fragments/pickup-dispatch-saml.md!}

----

{!fragments/enable-artifact-binding.md!}

---

## Try it

1.  Access the application application URL: <http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com>.

2.  You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (admin/admin). Provide the required consent.
You will be redirected to the Pickup Dispatch application home page.

3.  You can use a SAML tracer add-on with your browser to view the SAML2 response artifact for the SSO authentication request. The code block  below shows an example response.

    ``` java
    HTTP/1.1 302 Object Moved
    Date: 21 Jan 2004 07:00:49 GMT
    Location: https://application.com/ACS/URL?
    SAMLart=AAQAADWNEw5VT47wcO4zX%2FiEzMmFQvGknDfws2ZtqSGdkNSbsW1cmVR0bzU%3D&RelayState=0043bfc1bc45110dae17004005b13a2b
    Content-Type: text/html; charset=iso-8859-1
    ```

You have successfully set up SAML artifact binding. See the sections below for more information on resolving SAML2 artifacts and configuring  an artifact expiration time.

----

{!fragments/artifact-binding-settings.md!}

-----

!!! info "Related Topics"
    - [Concept: SAML2 Artifact Binding](TODO:insert-link-to-concept)
    - [Guide: Use SAML2 Artifact Binding](../../guides/login/use-artifact-binding-sample)
    - [Guide: Enable Login for a SAML Application](../../guides/login/webapp-saml)
    - [Guide: SAML Authentication Errors](TODO:insert-link)
