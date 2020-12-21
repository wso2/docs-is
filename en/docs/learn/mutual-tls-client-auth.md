# Configuring Mutual TLS Client Authentication and Certificate-Bound Access Tokens

WSO2 Identity Server (WSO2 IS) supports Mutual TLS Client Authentication and certificate-bound access tokens according to the [specification](https://tools.ietf.org/html/draft-ietf-oauth-mtls-17). When a client makes `/token` endpoint call, WSO2 IS issues a token by validating certificate information available in the HTTP header, with a certificate stored in the service provider. As per the specification, an MTLS certificate validates against the stored SP certificate for a `/token` request issued with the client-credential grant, authorization code grant, or refresh token grant. The response from the `/introspect` endpoint will present the bounded certificate according to the introspection response defined in the [specification]((https://tools.ietf.org/html/draft-ietf-oauth-mtls-17)).

This page guides you through configuring mutual TLS client authentication and certificate-bound access tokens with WSO2 IS. For more information, see [Mutual TLS for OAuth Clients](../../learn/mutual-tls-for-oauth-clients). 

---

## Configure mutual TLS client authenticator 

1. Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file to deploy and configure the mutual TLS client authenticator artifacts.

    ```toml
    [[event_listener]]
    id = "introspection_response_interceptor"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
    name="org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls.introspection.IntrospectionResponseInterceptor"
    order=27
    enable=true

    [[event_listener]]
    id = "is_introspection_data_provider"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
    name= "org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls.introspection.ISIntrospectionDataProvider"
    order=28
    enable=true

    [oauth.grant_type.authorization_code]
    grant_handler = "org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls.handlers.MTLSTokenBindingAuthorizationCodeGrantHandler"

    [oauth.grant_type.client_credentials]
    grant_handler = "org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls.handlers.MTLSTokenBindingClientCredentialsGrantHandler"

    [oauth.grant_type.refresh_token]
    grant_handler = "org.wso2.carbon.identity.oauth2.token.handler.clientauth.mutualtls.handlers.MTLSTokenBindingRefreshGrantHandler"

    [oauth.grant_type.uma_ticket]
    retrieve_uma_permission_info_through_introspection = true

    [oauth.mutualtls]
    client_certificate_header = "x-wso2-mtls-cert"
    ```

    In the configurations given above, add the relevant certificate header name as the `client_certificate_header` value (`x-wso2-mtls-cert` is given as a sample value). 

2. Restart WSO2 Identity Server to apply the configurations. 

---

## Configure the service provider

To test out if the configurations work as desired, you can configure a service provider for a sample application. Follow the steps below to set up the sample application and configure the service provider. 

**Set up the sample application**

Follow the instructions given in [Deploying the Sample App](../../learn/deploying-the-sample-app/#deploying-the-playground2-webapp) to set up the Playground2 web application. 

**Configure the service provider**

1. Navigate to **Service Providers>List** on the management console and click **Edit** to edit the service provider you created for the playground web app. 

2. Select **Upload SP Certificate** and copy the client application’s certificate into the **Application Certificate** text field.

     1. To generate the client’s private key and public certificate, execute the following command and enter **Distinguished Name (DN)** when prompted.

        ```tab="Format"
        openssl req -newkey rsa:2048 -x509 -keyout <CLIENT_PRIVATE_KEY> -out <CLIENT_PUBLIC_CERTIFICATE> -days <VALIDITY_PERIOD> -nodes
        ```

        ``` tab="Sample"
        openssl req -newkey rsa:2048 -x509 -keyout key.pem -out client-certificate.pem -days 3650 -nodes
        ```
        
    2. You will see the client certificate content in the `client-certificate.pem` file. A sample client certificate is shown below.

        ```
        -----BEGIN CERTIFICATE-----
        MIID3TCCAsWgAwIBAgIUJQW8iwYsAbyjc/oHti8DPLJH5ZcwDQYJKoZIhvcNAQEL
        BQAwfjELMAkGA1UEBhMCU0wxEDAOBgNVBAgMB1dlc3Rlcm4xEDAOBgNVBAcMB0Nv
        bG9tYm8xDTALBgNVBAoMBFdTTzIxDDAKBgNVBAsMA0lBTTENMAsGA1UEAwwER2Fn
        YTEfMB0GCSqGSIb3DQEJARYQZ2FuZ2FuaUB3c28yLmNvbTAeFw0yMDAzMjQxMjQy
        MDFaFw0zMDAzMjIxMjQyMDFaMH4xCzAJBgNVBAYTAlNMMRAwDgYDVQQIDAdXZXN0
        ZXJuMRAwDgYDVQQHDAdDb2xvbWJvMQ0wCwYDVQQKDARXU08yMQwwCgYDVQQLDANJ
        QU0xDTALBgNVBAMMBEdhZ2ExHzAdBgkqhkiG9w0BCQEWEGdhbmdhbmlAd3NvMi5j
        b20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+reCEYOn2lnWgFsp0
        TF0R1wQiD9C/N+dnv4xCa0rFiu4njDzWR/8tYFl0koaxXoP0+oGnT07KlkA66q0z
        twikLZXphLdCBbJ1hSmNvor48FuSb6DgqWixrUa2LHlpaaV7RvlmG+IhZEgKDXdS
        +/tK0hlcgRzENyOEdETDO5fFlKGGuwaGv6/w69h2LTKGu5nyDLF51rjQ18xp026b
        tHC7se/XSlcp3X63xeOIcFv6m84AN2lnV+g8MOfu2wgWtsKaxn4BL64E7nHZNNLx
        MRf7GtUm2bl9ydFX4aD1r1Oj4iqFWMNcfQ676Qshk8s7ui3LKWFXwNN/SRD0c/OR
        tv23AgMBAAGjUzBRMB0GA1UdDgQWBBRDu/vqRafReh4fFHS3Nz4T6u9mUDAfBgNV
        HSMEGDAWgBRDu/vqRafReh4fFHS3Nz4T6u9mUDAPBgNVHRMBAf8EBTADAQH/MA0G
        CSqGSIb3DQEBCwUAA4IBAQB7NH51Yj4moEhMonnLUh3eTtf6DUnrpscx6td28rry
        oDZPfCkJs4VHU9F50etw54FoHqoIaHp5UIB6l1OsVXytUmwrdxbqW7nfOItYwN1y
        V093aI2aOeMQYmS+vrPkSkxySP6+wGCWe4gfMgpr6iu9xiWLpnILw5q71gmXWtS9
        00S5aLbllGYe74jkyldLIdhS4TyEBIDgcpZrD8x/Z42al6T/6EANMpvu4Jopisg+
        uwwkEGSM1I/kjiW+YkWC4oTZ1jMZUWC11WbcouLwjfaf6gt4zWitYCP0r0fLGk4b
        SJfUFsnJNu6vDhx60TbRhIh9P2jxkmgNYPuAxFtF8v+h
        -----END CERTIFICATE-----
        ```

---

## Try it out

Use the following sample requests to try out each grant. 

### Client credential grant type

The following token request uses mutual TLS client authentication. 

```tab="Request Format"
curl -X POST \
https://localhost:9443/oauth2/token \
-H 'content-type: application/x-www-form-urlencoded' \
-H '<CERTIFICATE_HEADER_NAME>: <CLIENT_PUBLIC_CERTIFICATE>' \
-d 'grant_type=client_credentials&client_id=<CLIENT_ID>'
```

```tab="Sample Request"
curl -X POST \
https://localhost:9443/oauth2/token \
-H 'content-type: application/x-www-form-urlencoded' \
-H 'x-wso2-mtls-cert: -----BEGIN CERTIFICATE-----MIID3TCCAsWgAwIBAgIUJQW8iwYsAbyjc/oHti8DPLJH5ZcwDQYJKoZIhvcNAQELBQAwfjELMAkGA1UEBhMCU0wxEDAOBgNVBAgMB1dlc3Rlcm4xEDAOBgNVBAcMB0NvbG9tYm8xDTALBgNVBAoMBFdTTzIxDDAKBgNVBAsMA0lBTTENMAsGA1UEAwwER2FnYTEfMB0GCSqGSIb3DQEJARYQZ2FuZ2FuaUB3c28yLmNvbTAeFw0yMDAzMjQxMjQyMDFaFw0zMDAzMjIxMjQyMDFaMH4xCzAJBgNVBAYTAlNMMRAwDgYDVQQIDAdXZXN0ZXJuMRAwDgYDVQQHDAdDb2xvbWJvMQ0wCwYDVQQKDARXU08yMQwwCgYDVQQLDANJQU0xDTALBgNVBAMMBEdhZ2ExHzAdBgkqhkiG9w0BCQEWEGdhbmdhbmlAd3NvMi5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+reCEYOn2lnWgFsp0TF0R1wQiD9C/N+dnv4xCa0rFiu4njDzWR/8tYFl0koaxXoP0+oGnT07KlkA66q0ztwikLZXphLdCBbJ1hSmNvor48FuSb6DgqWixrUa2LHlpaaV7RvlmG+IhZEgKDXdS+/tK0hlcgRzENyOEdETDO5fFlKGGuwaGv6/w69h2LTKGu5nyDLF51rjQ18xp026btHC7se/XSlcp3X63xeOIcFv6m84AN2lnV+g8MOfu2wgWtsKaxn4BL64E7nHZNNLxMRf7GtUm2bl9ydFX4aD1r1Oj4iqFWMNcfQ676Qshk8s7ui3LKWFXwNN/SRD0c/ORtv23AgMBAAGjUzBRMB0GA1UdDgQWBBRDu/vqRafReh4fFHS3Nz4T6u9mUDAfBgNVHSMEGDAWgBRDu/vqRafReh4fFHS3Nz4T6u9mUDAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQB7NH51Yj4moEhMonnLUh3eTtf6DUnrpscx6td28rryoDZPfCkJs4VHU9F50etw54FoHqoIaHp5UIB6l1OsVXytUmwrdxbqW7nfOItYwN1yV093aI2aOeMQYmS+vrPkSkxySP6+wGCWe4gfMgpr6iu9xiWLpnILw5q71gmXWtS900S5aLbllGYe74jkyldLIdhS4TyEBIDgcpZrD8x/Z42al6T/6EANMpvu4Jopisg+uwwkEGSM1I/kjiW+YkWC4oTZ1jMZUWC11WbcouLwjfaf6gt4zWitYCP0r0fLGk4bSJfUFsnJNu6vDhx60TbRhIh9P2jxkmgNYPuAxFtF8v+h-----END CERTIFICATE-----' \
-d 'grant_type=client_credentials&client_id=h9gd1bLEgzUwftAhnrof0fZWcZwa'
```

```tab="Sample Response"
{“access_token”:”9d109c6d-d42e-3b6e-9d93-ae3cb8f65ade”,”scope”:”default”,”token_type”:”Bearer”,”expires_in”:3445}
```

### Authorization code grant type

1.  Visit the URL `http://wso2is.local:8080/playground2/oauth2.jsp` to start the scenario with the sample application.

2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Authorization Code
    -   **Client ID:** (the client id received when registering the service provider for the application)
    -   **Scope:** Any scope you wish to obtain the token for
    -   **Callback URL:** http://wso2is.local:8080/playground2/oauth2client
    -   **Authorize Endpoint:** https://localhost:9443/oauth2/authorize

3. Log in with the user credentials.  
    
4.  Select **Approve Once** or **Approve Always** and select the attributes you consent to share. Click **Ok** to continue. 
    ![approve-consent](../assets/img/using-wso2-identity-server/approve-consent.png) 

5. Copy the authorization code that you receive. 

6. Send the following request.

    ```tab="Request Format"
    curl -X POST \
    https://localhost:9443/oauth2/token \
    -H 'content-type: application/x-www-form-urlencoded' \
    -H '<CERTIFICATE_HEADER_NAME>: <CLIENT_PUBLIC_CERTIFICATE>' \
    -d 'grant_type=authorization_code&client_id=<CLIENT_ID>&code=<CODE>&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fplayground2%2Foauth2client'
    ```

    ```tab="Sample Request"
    curl -X POST \
    https://localhost:9443/oauth2/token \
    -H 'content-type: application/x-www-form-urlencoded' \
    -H 'x-wso2-mtls-cert: -----BEGIN CERTIFICATE-----MIID3TCCAsWgAwIBAgIUJQW8iwYsAbyjc/oHti8DPLJH5ZcwDQYJKoZIhvcNAQELBQAwfjELMAkGA1UEBhMCU0wxEDAOBgNVBAgMB1dlc3Rlcm4xEDAOBgNVBAcMB0NvbG9tYm8xDTALBgNVBAoMBFdTTzIxDDAKBgNVBAsMA0lBTTENMAsGA1UEAwwER2FnYTEfMB0GCSqGSIb3DQEJARYQZ2FuZ2FuaUB3c28yLmNvbTAeFw0yMDAzMjQxMjQyMDFaFw0zMDAzMjIxMjQyMDFaMH4xCzAJBgNVBAYTAlNMMRAwDgYDVQQIDAdXZXN0ZXJuMRAwDgYDVQQHDAdDb2xvbWJvMQ0wCwYDVQQKDARXU08yMQwwCgYDVQQLDANJQU0xDTALBgNVBAMMBEdhZ2ExHzAdBgkqhkiG9w0BCQEWEGdhbmdhbmlAd3NvMi5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+reCEYOn2lnWgFsp0TF0R1wQiD9C/N+dnv4xCa0rFiu4njDzWR/8tYFl0koaxXoP0+oGnT07KlkA66q0ztwikLZXphLdCBbJ1hSmNvor48FuSb6DgqWixrUa2LHlpaaV7RvlmG+IhZEgKDXdS+/tK0hlcgRzENyOEdETDO5fFlKGGuwaGv6/w69h2LTKGu5nyDLF51rjQ18xp026btHC7se/XSlcp3X63xeOIcFv6m84AN2lnV+g8MOfu2wgWtsKaxn4BL64E7nHZNNLxMRf7GtUm2bl9ydFX4aD1r1Oj4iqFWMNcfQ676Qshk8s7ui3LKWFXwNN/SRD0c/ORtv23AgMBAAGjUzBRMB0GA1UdDgQWBBRDu/vqRafReh4fFHS3Nz4T6u9mUDAfBgNVHSMEGDAWgBRDu/vqRafReh4fFHS3Nz4T6u9mUDAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQB7NH51Yj4moEhMonnLUh3eTtf6DUnrpscx6td28rryoDZPfCkJs4VHU9F50etw54FoHqoIaHp5UIB6l1OsVXytUmwrdxbqW7nfOItYwN1yV093aI2aOeMQYmS+vrPkSkxySP6+wGCWe4gfMgpr6iu9xiWLpnILw5q71gmXWtS900S5aLbllGYe74jkyldLIdhS4TyEBIDgcpZrD8x/Z42al6T/6EANMpvu4Jopisg+uwwkEGSM1I/kjiW+YkWC4oTZ1jMZUWC11WbcouLwjfaf6gt4zWitYCP0r0fLGk4bSJfUFsnJNu6vDhx60TbRhIh9P2jxkmgNYPuAxFtF8v+h-----END CERTIFICATE-----' \
    -d 'grant_type=authorization_code&client_id=h9gd1bLEgzUwftAhnrof0fZWcZwa&code=d7678fec-2cb0-374b-82cb-d368d301be57&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fplayground2%2Foauth2client'
    ```

    ```tab="Sample Response"
    {"access_token":"72480539-a018-3611-aeb3-1e3e8b7f78da","refresh_token":"47757b20-1013-3fd7-a547-c8b080427abd","scope":"openid","id_token":"eyJ4NXQiOiJaalJtWVRNd05USmpPV1U1TW1Jek1qZ3pOREkzWTJJeU1tSXlZMkV6TWpkaFpqVmlNamMwWmciLCJraWQiOiJaalJtWVRNd05USmpPV1U1TW1Jek1qZ3pOREkzWTJJeU1tSXlZMkV6TWpkaFpqVmlNamMwWmdfUlMyNTYiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiZXgyci1tZGhhRXJoT0MxSjlUTjZXQSIsImF1ZCI6Img5Z2QxYkxFZ3pVd2Z0QWhucm9mMGZaV2Nad2EiLCJjX2hhc2giOiI3bnlHb0Y5b0NuRFdIWk9uZlVuT3VnIiwic3ViIjoiYWRtaW4iLCJuYmYiOjE1ODY4OTA3MTYsImF6cCI6Img5Z2QxYkxFZ3pVd2Z0QWhucm9mMGZaV2Nad2EiLCJhbXIiOlsiQmFzaWNBdXRoZW50aWNhdG9yIl0sImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTU4Njg5NDMxNiwiaWF0IjoxNTg2ODkwNzE2LCJzaWQiOiIwMTQxOGNiYS1kZWMxLTRjY2UtODg1MC0yM2Q5YWVmNDdhMjUifQ.c7zueSgckyK7la0fWCVXsDL7zEQV40VmI2FUCDrlN4sFY3U90ObtwXVp0V6Di_BzOWCGc7RN6xWTBkfo2ayph8FxVtUyO-c4tUZCB_EDCsyOLBjV-s1Z7bhy4lw5-utSCcE5d4TZoDTFKvL7PrUCrRZ2VcGfmqNKZKgRo1eCfVcT5M7Udzkq22JdOp1jkv0tTso3zvQFqUKFaNNi1gKDdWR00WjBEnAMhmbz0Sd2HZ2GNuKbwYZLPz3P2FZvS7mVJJW_kku4nTksP3cMIrDjZz8fCST210GmlW_GC1f2XudhiM8Qkdcu011cdEmG5bmJcWCQs-90GLn5u-e1gjIaQw","token_type":"Bearer","expires_in":3600}
    ```

### Refresh token grant

To try this out, first send an authorization code grant type request and obtain the refresh token from the response.

```tab="Request Format"
curl -X POST \
  https://localhost:9443/oauth2/token \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H '<CERTIFICATE_HEADER_NAME>: <CLIENT_PUBLIC_CERTIFICATE>' \
  -d 'grant_type=refresh_token&refresh_token=<REFRESH_TOKEN>&client_id=<CLIENT_ID>'
```

```tab="Sample Request"
curl -X POST \
  https://localhost:9443/oauth2/token \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'x-wso2-mtls-cert: -----BEGIN CERTIFICATE-----MIID3TCCAsWgAwIBAgIUJQW8iwYsAbyjc/oHti8DPLJH5ZcwDQYJKoZIhvcNAQELBQAwfjELMAkGA1UEBhMCU0wxEDAOBgNVBAgMB1dlc3Rlcm4xEDAOBgNVBAcMB0NvbG9tYm8xDTALBgNVBAoMBFdTTzIxDDAKBgNVBAsMA0lBTTENMAsGA1UEAwwER2FnYTEfMB0GCSqGSIb3DQEJARYQZ2FuZ2FuaUB3c28yLmNvbTAeFw0yMDAzMjQxMjQyMDFaFw0zMDAzMjIxMjQyMDFaMH4xCzAJBgNVBAYTAlNMMRAwDgYDVQQIDAdXZXN0ZXJuMRAwDgYDVQQHDAdDb2xvbWJvMQ0wCwYDVQQKDARXU08yMQwwCgYDVQQLDANJQU0xDTALBgNVBAMMBEdhZ2ExHzAdBgkqhkiG9w0BCQEWEGdhbmdhbmlAd3NvMi5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+reCEYOn2lnWgFsp0TF0R1wQiD9C/N+dnv4xCa0rFiu4njDzWR/8tYFl0koaxXoP0+oGnT07KlkA66q0ztwikLZXphLdCBbJ1hSmNvor48FuSb6DgqWixrUa2LHlpaaV7RvlmG+IhZEgKDXdS+/tK0hlcgRzENyOEdETDO5fFlKGGuwaGv6/w69h2LTKGu5nyDLF51rjQ18xp026btHC7se/XSlcp3X63xeOIcFv6m84AN2lnV+g8MOfu2wgWtsKaxn4BL64E7nHZNNLxMRf7GtUm2bl9ydFX4aD1r1Oj4iqFWMNcfQ676Qshk8s7ui3LKWFXwNN/SRD0c/ORtv23AgMBAAGjUzBRMB0GA1UdDgQWBBRDu/vqRafReh4fFHS3Nz4T6u9mUDAfBgNVHSMEGDAWgBRDu/vqRafReh4fFHS3Nz4T6u9mUDAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQB7NH51Yj4moEhMonnLUh3eTtf6DUnrpscx6td28rryoDZPfCkJs4VHU9F50etw54FoHqoIaHp5UIB6l1OsVXytUmwrdxbqW7nfOItYwN1yV093aI2aOeMQYmS+vrPkSkxySP6+wGCWe4gfMgpr6iu9xiWLpnILw5q71gmXWtS900S5aLbllGYe74jkyldLIdhS4TyEBIDgcpZrD8x/Z42al6T/6EANMpvu4Jopisg+uwwkEGSM1I/kjiW+YkWC4oTZ1jMZUWC11WbcouLwjfaf6gt4zWitYCP0r0fLGk4bSJfUFsnJNu6vDhx60TbRhIh9P2jxkmgNYPuAxFtF8v+h-----END CERTIFICATE-----' \
  -d 'grant_type=refresh_token&refresh_token=47757b20-1013-3fd7-a547-c8b080427abd&client_id=h9gd1bLEgzUwftAhnrof0fZWcZwa'
```

```tab="Sample Response"
{"access_token":"e01612d2-5538-32ac-9b1c-c2978ce47e91","refresh_token":"0278af3e-e75b-3f66-bad5-13a773397b8e","scope":"openid","id_token":"eyJ4NXQiOiJaalJtWVRNd05USmpPV1U1TW1Jek1qZ3pOREkzWTJJeU1tSXlZMkV6TWpkaFpqVmlNamMwWmciLCJraWQiOiJaalJtWVRNd05USmpPV1U1TW1Jek1qZ3pOREkzWTJJeU1tSXlZMkV6TWpkaFpqVmlNamMwWmdfUlMyNTYiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSHJsTl9PNGZ3THNldnlRWXcxdjdGdyIsImF1ZCI6Img5Z2QxYkxFZ3pVd2Z0QWhucm9mMGZaV2Nad2EiLCJzdWIiOiJhZG1pbiIsIm5iZiI6MTU4Njg5MTU4MywiYXpwIjoiaDlnZDFiTEVnelV3ZnRBaG5yb2YwZlpXY1p3YSIsImFtciI6WyJyZWZyZXNoX3Rva2VuIl0sImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTU4Njg5NTE4MywiaWF0IjoxNTg2ODkxNTgzfQ.XonQryWAEoUAsEWBYh97N8Wra1o1g-gs_VQfD1jeKpIMXONrRJt9ArTwf7THE0AmwoiHqv3JDsFDfj7FY4-xMEXb9bbwm2CB7ptWdw_Z0_rEoLv8uFo69k0G07C1bPsE4Lfdg4_BKMWN5-h8U0l7p35AQW-hT4qGkASOkgo0xz2AaBpXgItP91NsUoJ3Xmr1E9Bmv_0vIO8XK1hvZkk95inCVp2HVBBRuQNIO4PIaqrGNijMUoKN5DokUr_pyZ3xHbHL8pJ5Smg5wLfDAng7BSwiBd1Lf_8wyWaNSHCvI27sVtU8fLRi7X0_p-4mVtmfK2Qe-hK8wQA3E_vFLr3WMA","token_type":"Bearer","expires_in":3600}
```

## OAuth token introspection

Use the following [OAuth token introspection](learn/invoke-the-oauth-introspection-endpoint/) request to obtain a sample introspection response from an active token using an `x5t#S256` certificate thumbprint confirmation method. The new introspection response content introduced by this feature is the `cnf` confirmation method that has the `x5t#S256` confirmation method member containing the value that is the hash of the client certificate to which the access token is bound.

```tab="Request Format"
curl -X POST \
  https://localhost:9443/oauth2/introspect \
  -H 'authorization: Basic YWRtaW46YWRtaW4=' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d token=9d109c6d-d42e-3b6e-9d93-ae3cb8f65ade
```

```tab="Sample Request"
curl -X POST \
  https://localhost:9443/oauth2/introspect \
  -H 'authorization: Basic YWRtaW46YWRtaW4=' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d token=9d109c6d-d42e-3b6e-9d93-ae3cb8f65ade
```

 ```tab="Sample Response"
{
    "nbf": 1586929210,
    "scope": "openid",
    "active": true,
    "cnf": {
        "x5t#SHA256": "mt3KDY1hofQurloTbphKHCSrTlAGl5MlgXX6Xxj9c_E"
    },
    "token_type": "Bearer",
    "exp": 1586932810,
    "iat": 1586929210,
    "client_id": "h9gd1bLEgzUwftAhnrof0fZWcZwa",
    "username": "admin@carbon.super"
}
```