# Set Up SAML2 Bearer Assertion Profile

This page guides you through using the [SAML2 Bearer grant](../../../references/concepts/authorization/saml2-bearer-assertion-profile) to exchange a SAML2 assertion for a valid OAuth access token.

----

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/saml2-bearer-assertion-profile"   rel="nofollow noopener">Try it with the sample</a>

----

## Create a service provider

{!fragments/register-a-service-provider.md!}

----

## Basic OAuth/OpenID Connect configuration

{!fragments/oauth-app-config-basic.md!}

!!! note
    -   Make sure the **SAML2** grant is enabled under **Allowed Grant Types** when configuring OAuth/OpenID Connect.

    -   You can provide any valid URL as the **Callback Url**. This URL value is not used for any other operations during this sample.

----

{!fragments/saml-app-config-basic.md!}


3. Select the the following check-boxes and enter the following values:
    1. **Enable Audience Restriction**
         - **Audience**: `https://localhost:9443/oauth2/token`
    2. **Enable Recipient Validation**
         - **Recipient**: `https://localhost:9443/oauth2/token`
   
    ![enable-audience-restriction](../../assets/img/samples/enable-audience-restriction.png) 

5. Click **Update** to save changes. 

-----

## Exchange SAML assertion for an OAuth access token

1. Use the following curl command to exchange the SAML assertion for an OAuth access token.

    ``` java tab="Request Format"
    curl -k -d "grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer&assertion=<base64-URL_encoded_assertion>&scope=<scope>" -H "Authorization: Basic <base64_encoded_clientid:clientsecret>" -H "Content-Type: application/x-www-form-urlencoded" https://<host>:<port>/oauth2/token
    ```
    
    ``` java tab="Sample Request"
    curl -k -d "grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer&assertion=PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZczpUcmFuc2Zvcm1zPgo8ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3zOlRyYW5zZm9ybXMaW&scope=PRODUCTION" -H "Authorization: Basic TGZkcWt3eVNGVVNZVjNtUkNNaE5vNmw1cWZJYTpOb0JQZjZkZGhxS2pXdEpNWHVibU04bndqNW9h" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
    ```
    
2. Use the introspection endpoint of WSO2 Identity Server to get the token information.

    ``` java tab="Request Format"
    curl -k -u <username>:<password> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<access token>' https://<IS_HOST>:<IS_PORT>/oauth2/introspect
    ```

    ``` java tab="Sample Request"
    curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=f3116b04-924f-3f1a-b323-4f0988b94f9f' https://localhost:9443/oauth2/introspect
    ```

!!! info "Related topics"
    -   [Concept: SAML2 Bearer Assertion Profile for OAuth 2.0](../../../references/concepts/authorization/saml2-bearer-assertion-profile)
    -   [Demo: Set Up SAML2 Bearer Assertion Profile](../../../quick-starts/saml2-bearer-assertion-profile/)
