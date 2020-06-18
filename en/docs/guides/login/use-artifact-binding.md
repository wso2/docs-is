# Use SAML2 Artifact Binding

This page guides you through enabling [SAML2 artifact binding](TODO:insert-link-to-concept) with WSO2 Identity Server. 

Generally, SAML authentication requests and assertion data is sent through the browser using POST or Http Redirect binding. If you do not want to expose the entire message to the browser, you can use artifact binding instead. 

----

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/use-artifact-binding-sample" rel="nofollow noopener">Try it with the sample</a>

----

(TO DO: dev-portal-fragment)

----

{!fragments/enable-artifact-binding.md!}

---

## Try it

1.  Access the application application URL.

2.  Log in to the application. 

3.  You can use a SAML tracer add-on with your browser to view the SAML2 response artifact for the SSO authentication request. The code block below shows an example response.

    ``` java
    HTTP/1.1 302 Object Moved
    Date: 21 Jan 2004 07:00:49 GMT
    Location: https://application.com/ACS/URL?
    SAMLart=AAQAADWNEw5VT47wcO4zX%2FiEzMmFQvGknDfws2ZtqSGdkNSbsW1cmVR0bzU%3D&RelayState=0043bfc1bc45110dae17004005b13a2b
    Content-Type: text/html; charset=iso-8859-1
    ```

You have successfully set up SAML artifact binding. See the sections below for more information on resolving SAML2 artifacts and configuring an artifact expiration time.

----

{!fragments/artifact-binding-settings.md!}

-----

!!! info "Related Topics"
    - [Concept: SAML2 Artifact Binding](TODO:insert-link-to-concept)
    - [Demo: Use SAML2 Artifact Binding](../../../quick-starts/use-artifact-binding-sample)
    - [Guide: Enable Login for a SAML Application](../webapp-saml)
    - [Guide: SAML Authentication Errors](TODO:insert-link)

