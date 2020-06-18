# Query SAML2 Assertions

This page guides you through querying dynamic or existing [SAML2 assertions](TODO:insert-link-to-concept) using standard request messages via WSO2 Identity Server. 

Due to some reason if you can not pass a SAML Assertion to the backend, then you can pass an [identifier](TODO:insert-link) with the request to query and obtain the assertion from the backend instead. 

----

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/query-saml-assertions-sample" rel="nofollow noopener">Try it with the sample</a>

----

(TODO: dev-portal-fragment)
{!fragments/register-a-service-provider.md!}

----

(TODO: dev-portal-fragment)
{!fragments/saml-app-config-basic.md!}

4. Select **Enable Assertion Query Request Profile** to enable saml assertions. 

5. Click **Update**.

## Persist assertions to the database

Optionally, you can use a custom assertion builder that enables persisting assertions in the database for this profile. 

1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

2.  Add the following configuration.

    ``` toml
    [saml.extensions] 
    assertion_builder= "org.wso2.carbon.identity.sso.saml.builders.assertion.ExtendedDefaultAssertionBuilder"
    ```

3. Restart the server.
    
-----

## Query SAML assertions

1. Access the application that you configured as a service provider via the assertion consumer URL that you configured above. 

2.  Start the SAML Tracer.

    !!! tip
        If you do not have a SAML tracer already, install a SAML Tracer (plugin/application/browser extension) that enables searching assertions.

3.  Log in using administrator credentials (admin:admin).

    When a user logs in, the created assertion will be persisted in the SAML Tracer.

4. Navigate to the `<CLIENT_HOME>/src/main/java/org/wso2/carbon/identity/saml/query/profile/test` directory.

5. Open the relevant java class of the query type you wish to request (e.g., `SAMLAssertionIDRequestClient.java`).

6. Enter the required values extracted from the assertion, and run the `main()` method of the class. An assertion request will be generated.

7. Note that a request and response get generated according to the given query type.

    !!! tip 
        A sample for each request can be found at the `<CLIENT_HOME>/sample-request-messages` directory.

You have successfully queried an assertion using your application. 

-----

!!! info "Related Topics"
    - [Concept: SAML2 Assertions](TODO:insert-link-to-concept)
    - [Demo: Query SAML2 Assertions](../../../quick-starts/query-saml-assertions-sample)
    
