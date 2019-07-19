# Authentication Data API

Authentication Data API provides REST services that are used to retrieve
endpoint parameters provided by the authentication framework or related
services.

These parameters may not be passed in the redirect URL due to one or
many of the following reasons.

-   Sensitivity of the values passed.
-   Complexity of the values passed.
-   Length of the parameters exceeding, or has the possibility of
    exceeding the allowed limits.
-   Compliance to certain business policies.

### Configuring Authentication Data API

To make these parameters available via the Authentication Data API, we
need to configure the Identity Server as follows.

1.  Configure the following parameters in the
    `                       application-authentication.xml                      `
    file in
    `                       <IS_HOME>/repository/conf/identity                      `
    as per the descriptions provided below.

    ``` java
    <AuthenticationEndpointRedirectParams action="include" 
    removeOnConsumeFromAPI="true">
    <AuthenticationEndpointRedirectParam name="sessionDataKey"/> 
    </AuthenticationEndpointRedirectParams>
    ```

    | Field Name                          | Description                                                                                                                                                                                              |
    |-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | action                              | Value is either **include** or **exclude**. An **include** indicates a whitelist, whereas an **exclude** indicates a blacklist.                                                                         |
    | removeOnConsumeFromAPI              | The decides whether to remove the parameters on a read. If set to true, parameters are deleted upon read and won’t be available for subsequent API requests, unless they are repopulated at the backend. |
    | AuthenticationEndpointRedirectParam | The list of parameters to be whitelisted/blacklisted. The name attribute is used to specify the parameter name.                                                                                          |

2.  Restart the server.

### Using the API

The data can be accessible at
`                 https://<IS_HOST>:<PORT>/api/identity/auth/v1.1/data/<Type>/<Key>.                `

-   \<Type\> - This refers to the key type that should be used. The
    value is **AuthRequestKey** for pages which directly communicate
    with the authentication framework using
    `                  sessionDataKey,                 ` and
    **OauthConsentKey** for the Oauth consent page which uses
    `                  sessionDataKeyConsent                 ` as the
    correlation key.
-   \<Key\> - The correlation key whose value is either
    **sessionDataKey** or **sessionDataKeyConsent**.

### Authenticating the API

This API can be authenticated by following the steps given
[here](https://docs.wso2.com/display/IS570/Authenticating+and+Authorizing+REST+APIs)
.

Following are the sample requests and responses using cURL.

**Request-1**

``` java
curl -k -X GET "https://localhost:9443/api/identity/auth/v1.1/data/AuthRequestKey/7a6886ab -b02f-424f-9cd4-adf5e92f0798" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json"
```

**Response-1**

``` java
{"paramKey1": "paramValue1","paramKey2": "paramValue2"}
```

**Request-2**

``` java
curl -k -X GET "https://localhost:9443/api/identity/auth/v1.1/data/OauthConsentKey/7a6886a b-b02f-424f-9cd4-adf5e92f0798" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json"
```

**Response-2**

``` java
{"paramKey1":"paramValue1","paramKey2":"paramValue2"}
```

  

  

  
