# Set Up SAML2 Bearer Assertion Profile

This page guides you through using the [SAML2 Bearer grant](../../../concepts/authorization/saml2-bearer-assertion-profile) to exchange a SAML2 assertion for a valid OAuth access token.

----

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/saml2-bearer-assertion-profile"   rel="nofollow noopener">Try it with the sample</a>

----


{!fragments/register-a-service-provider.md!}

----

{!fragments/oauth-app-config-basic.md!}

!!! tip
    -   Make sure the **SAML2** grant is enabled under **Allowed Grant Types** when configuring OAuth/OpenID Connect.

    -   You can provide any valid URL as the **Callback URL**. This URL value is not used for any other operations during this sample.

----

Next, set up the SAML application. 

{!fragments/register-a-service-provider.md!}

----

{!fragments/saml-app-config-basic.md!}


3. Modify the **SAML2 Web SSO Configuration** and enable the following fields.
    - **Enable Audience Restriction**
    - **Enable Recipient Validation**

4. Enter the following values. 
    - **Audience**: `https://localhost:9443/oauth2/token`
    - **Recipient**: `https://localhost:9443/oauth2/token`

    ![enable-audience-restriction](../../assets/img/samples/enable-audience-restriction.png) 

5. Click **Update** to save changes. 

-----

## Exchange SAML assertion for an OAuth access token

1. Use the following curl command to exchange the SAML assertion for an OAuth access token.

    ```
    curl -k -d "grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer&assertion=<base64-URL_encoded_assertion>&scope=PRODUCTION" -H "Authorization: Basic <base64_encoded_clientid:clientsecret>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:8243/token
    ```

2. Use the introspection endpoint of WSO2 Identity Server to get the token information.

    **Request**

    ``` java tab="Request Format"
    curl -k -u <username>:<password> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<access token>' https://<IS_HOST>:<IS_PORT>/oauth2/introspect
    ```

    ``` java tab="Sample Request"
    curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=f3116b04-924f-3f1a-b323-4f0988b94f9f' https://localhost:9443/oauth2/introspect
    ```
