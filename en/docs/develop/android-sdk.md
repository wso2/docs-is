# Android SDK

This page guides you through implementing authentication for an Android client application using the Android OpenID Connect authentication SDK with WSO2 Identity Server.

This Android SDK library currently supports the [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1) with [PKCE](https://tools.ietf.org/html/rfc7636).

----

## Get Started

The SDK supports Android API 16 (Jellybean) and above. 

1. Add the [latest released SDK](https://github.com/wso2-extensions/identity-sdks-android/releases) to the client application's `build.gradle` file.

    ```
    implementation 'org.wso2.identity.sdk.android.oidc:wso2-oidc-sdk:0.0.5'
    ```

2. Add `appAuthRedirectScheme` to your application level `build.gradle` file. This allows you to register your Android app for a URI scheme.

    ```gradle tab="Format"
    android.defaultConfig.manifestPlaceholders = [
        'appAuthRedirectScheme': 'your-application'
    ]
    ```

    ```gradle tab="Sample"
    android.defaultConfig.manifestPlaceholders = [
        'appAuthRedirectScheme': 'wso2sample'
    ]
    ```

3. Verify that the `appAuthRedirectScheme` is consistent with the **CallBack URL** of the application that you configured using the WSO2 IS developer portal, and with value configured in the `oidc_config.json` file. For more information, see the configuration section.

    !!! info
        For example, if you have configured the **CallBack Url** as `wso2sample://oauth2`, the `appAuthRedirectScheme` should be `wso2sample`.


----

## Configure the application

To authenticate with WSO2 Identity Server using OAuth/OpenID Connect, add the application configuration to your Android project. 

!!! tip
    See [Android Sample](https://github.com/wso2-extensions/identity-samples-android.git) for a sample application.

1. Create the `oidc_config.json` file inside the `res/raw` folder. 

2. Copy the following configurations to the `oidc_config.json` file. 

    ```json
    {
    "client_id": "{client-id}",
    "redirect_uri": "{your-application-url}",
    "authorization_scope": "openid",
    "discovery_uri": "https://{HOST_NAME}:{PORT}/oauth2/oidcdiscovery/.well-known/openid-configuration"
    }
    ```

3. Change the `client_id` and `redirect_uri` configurations according to your application.

4. Update the `{HOST_NAME}:{PORT}` placeholder for the `discovery_uri` configuration with the WSO2 IS server hostname and port respectively.

----

## Set up login

1. Initialize the SDK object in an `Activity` that you are using to log users into your application. 

    ```java
        LoginService mLoginService = new DefaultLoginService(this);
    ```

2. Write a login method that is triggered on button click to initiate authentication with WSO2 Identity Server. Sample code is shown below. 

    ```java
        findViewById(R.id.login).setOnClickListener(v ->
                    doLogin()
        );
    ```
   
    ```java
    private void doLogin() {
    
        Intent completionIntent = new Intent(this, UserInfoActivity.class);
        Intent cancelIntent = new Intent(this, LoginActivity.class);
        cancelIntent.putExtra("failed", true);
        cancelIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent successIntent = PendingIntent.getActivity(this, 0, completionIntent, 0);
        PendingIntent failureIntent = PendingIntent.getActivity(this, 0, cancelIntent, 0);

        mLoginService.authorize(successIntent, failureIntent, true);
    }
    ```

    Note the following details about the sample code shown above. 
    
    - An `Activity` named **LoginActivity** is used to authenticate users. After successful authentication, the user will be redirected to another `Activity` named **UserInfoActivity**.
    
    - A login button  has been added inside the `LoginActivity`. The button id is referred to as `login`.
    
    - A method called `doLogin()` is called when the `login button` is clicked to initiate authentication with WSO2 Identity Server.
    
    - `completionIntent` and `cancelIntent` is created while calling the `authorize` method of the `LoginService`.
    
    - You can pass either `true` or `false` for the `callUserInfo` parameter. If the `callUserInfo` value is `true`, then `userinfo request` will be made to WSO2 Identity Server after successful token exchange. Else, if the `callUserInfo` value is `false`, the SDK will not make any request to the `UserInfo Endpoint` after token flow.

Once this is completed according to your own application, you can authenticate a user with WSO2 Identity Server. 

----

## Store authentication context

After successful authentication, the `AuthenticationContext` object will be returned in the `Intent`. This `AuthenticationContext` Object is used to store all the context related to that authentication flow.

Use a method similar to the following sample to store the authentication context. 

```java
@Override
    protected void create() {  
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_info);
        mLoginService = new DefaultLoginService(this);
        mAuthenticationContext = (AuthenticationContext) getIntent().getSerializableExtra("context");
    }
``` 

Note the following details about the sample code shown above.

- The `AuthenticationContext` object is retrieved from the `oncreate()` method of the `UserInfoActivity`. 

- The `AuthenticationContext` object has `User`, `OidcDiscovery response`, `TokenResponse`, and `UserInfoResponse`.
 
----

## Get user details

Use the following code in order to get user-related information. 

```
String userName = mAuthenticationContext.getUser().getUserName();
```
                
```
Map<String, Object> userAttributes = mAuthenticationContext.getUser().getAttributes();
```

----

## Get information related to the token response

1. Use the following code to get information related to the token response. This is done by getting the `OAuth2TokenResponse` from the `AuthenticationContext` object.

    ```
    OAuth2TokenResponse oAuth2TokenResponse = mAuthenticationContext.getOAuth2TokenResponse();
    ```   
   
2. Use the following code to get the `AccessToken` and `IdToken` from the `OAuth2TokenResponse`. 
        
    ```
    String idToken = oAuth2TokenResponse.getIdToken();
    String accessToken = oAuth2TokenResponse.getAccessToken();
    Long accessTokenExpTime = oAuth2TokenResponse.getAccessTokenExpirationTime();
    String tokenType = oAuth2TokenResponse.getTokenType();
    String refreshToken = oAuth2TokenResponse.getRefreshToken();
    ```

## Get claims from the IdToken

1. Use the following code to get information from the `IdToken`. This is done by first getting the `IdTokenResponse` from the `OAuth2TokenResponse`. 

    ```
    OAuth2TokenResponse.IDTokenResponse idTokenResponse = mAuthenticationContext
                    .getOAuth2TokenResponse().getIdTokenResponse();
    ```

2. Use the following code to get server specific claims from the `IdToken`.

    ```
    String iss = idTokenResponse.getIssuer();
    String sub = idTokenResponse.getSubject();
    String iat = idTokenResponse.getIssueTime();
    String exp = idTokenResponse.getExpiryTime();
    List<String> audience = idTokenResponse.getAudience()

    ```

3. Use the following code to get all claim mappings.

    ```
    Map<String, Object> claims = idTokenResponse.getClaims();
    ```

4. Use the following code to get a specific string claim.

    ```
    String claimValue = idTokenResponse.getClaim(claimName)
    ```

## Get userinfo response

**Get userinfo response from the authentication context**

If you called `LoginService.authorize(PendingIntent successIntent, PendingIntent failureIntent, Boolean callUserInfo)` with the `callUserInfo` parameter set to `true`, the `UserInfoResponse` will be stored in the `AuthenticationContext` object.
 
1. Use the following code to get the `UserInfoResponse` from the `AuthenticationContext` object.

    ```
    UserInfoResponse userInfoResponse = mAuthenticationContext.getUserInfoResponse();
    ```
 
2. Use the following code to get the subject.

    ```
    String subject = userInfoResponse.getSubject();
    ```
 
3. Use the following code to get a specific claim.

    ```
    String email = userInfoResponse.getUserInfoProperty("email");
    ```
    
4. Use the following code to get all claims. 

    ```
    JSONObject userClaims = userInfoResponse.getUserInfoProperties();
    ```

**Call UserInfo endpoint explicitly**

Alternatively, you can get userclaims by calling the `getUserInfo(..)` method in the `LoginService`. Use the following code to do this. 

```java
private void getUserInfo(){
   mLoginService.getUserInfo(mAuthenticationContext,
                  new UserInfoRequestHandler.UserInfoResponseCallback() {
               @Override
               public void onUserInfoRequestCompleted(UserInfoResponse userInfoResponse,
                       ServerException e) {
                   if (userInfoResponse != null) {
                       mSubject = userInfoResponse.getSubject();
                       mEmail = userInfoResponse.getUserInfoProperty("email");
                       JSONObject userInfoProperties = userInfoResponse.getUserInfoProperties();
                   }
    }
```

----

## Set up logout

Write a logout method that is triggered on button click to initiate user logout with WSO2 Identity Server. Sample code is shown below. 

1. Create a button with the button id `logout`.

2. Call the `logout()` method when `logout` button is clicked.

    ```java
    findViewById(R.id.logout).setOnClickListener(v -> logout());

    ```

3. Call the `logout()` method of the `LoginService` instance.

    ```java
    private void logout() {

        mLoginService.logout(this, mAuthenticationContext);
        finish();
    }
    ```




