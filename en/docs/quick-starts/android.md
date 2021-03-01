# Start enable Authentication for Android App

!!! Tip 
    [Try Our Sample](../android-sample)

---

## Overview
This android library currently supports:

- OpenID Connect Authorization Code Flow using the [PKCE extension](https://tools.ietf.org/html/rfc7636)

---

## Register Application

{! fragments/register-mobile-application.md !}

---

## Installation

### Add the dependency 

Add [latest released SDK](https://github.com/wso2-extensions/identity-sdks-android/releases) in
 your app's `build.gradle` file.
 
```
implementation 'org.wso2.identity.sdk.android.oidc:wso2-oidc-sdk:0.0.5'
```

**Example:**
```gradle
dependencies {
   dependencies {
        .
        .
        .
        implementation 'org.wso2.identity.sdk.android.oidc:wso2-oidc-sdk:0.0.5'
   }
}
```
 
### Add a URI Scheme 
  
You need to add  `appAuthRedirectScheme` in your application level `build.gradle` file. This will allow you to
 register your android app for a URI scheme.

```gradle
android.defaultConfig.manifestPlaceholders = [
       'appAuthRedirectScheme': 'your-application'
]
```

**Example:**
```gradle
android.defaultConfig.manifestPlaceholders = [
       'appAuthRedirectScheme': 'wso2sample'
]
```

Verify that this should be consistent with the [CallBack Url](#register-application) of the application that you configured in the
 developer-portal and in the `oidc_config.json` file. Refer the [configuration section](#configuration) for further information.

For example, if you have configured the callBackUrl as ‘wso2sample://oauth’, then the
 ‘appAuthRedirectScheme’ should be ‘wso2sample’

### Configuration

You need to add application configuration in your android project in order to authenticate with WSO2 Identity server
 using OAuth/OpenID Connect protocol.
 
Create the `oidc_config.json` file inside the `res/raw` folder. 

- Copy the following configurations into the `oidc_config.json` file. 

- Change the **client_id** and **redirect_uri** configs. These should be taken from [application](#register-application).

- Update the {HOST_NAME}:{PORT} with the IS server's hostname and port respectively in the **discovery_uri** config.

```json
{
 "client_id": "{client-id}",
 "redirect_uri": "{your-application-url}",
 "authorization_scope": "openid",
 "discovery_uri": "https://{HOST_NAME}:{PORT}/oauth2/oidcdiscovery/.well-known/openid-configuration"
}
```

**Example:**

```json
{
"client_id": "rs5ww91iychg9JN0DJGLMaxG2gha",
 "redirect_uri": "wso2sample://oauth2",
 "authorization_scope": "openid",
 "discovery_uri": "https://stgcloud.kubesb.com/t/example/oauth2/oidcdiscovery/.well-known/openid-configuration"
}
```

### Login

- First, you need to initialize the SDK object in an `Activity` that you are using to log users into your app. 

- In this example, we will call it `LoginActivity`. After successful authentication, the user will be redirected to
 another `Activity`. Let's name it as `UserInfoActivity`.

```java
LoginService mLoginService = new DefaultLoginService(this);
```


- Have a `login button` inside `LoginActivity`. Here the button id is referred as `login`.

- Call the`doLogin()` method  when the `login button` is clicked to initiate authentication with WSO2 Identity Server.
 
- You need to create `completionIntent` and `cancelIntent` while calling the `authorize` method of `LoginService`.

- You can pass either `true` or `false` for the `callUserInfo` parameter. If `callUserInfo` value is `true`
, then `userinfo request` will be made to the IdentityServer after successful token exchange. Else, if `callUserInfo`
 value is `false`, SDK will not make any request to UserInfo Endpoint after token flow.

```java
    findViewById(R.id.login).setOnClickListener(v ->
                   doLogin()
    );
```
   
```java
private void doLogin() {
   
      LoginService mLoginService = new DefaultLoginService(this);
      Intent completionIntent = new Intent(this, UserInfoActivity.class);
      Intent cancelIntent = new Intent(this, LoginActivity.class);
      cancelIntent.putExtra("failed", true);
      cancelIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
      PendingIntent successIntent = PendingIntent.getActivity(this, 0, completionIntent, 0);
      PendingIntent failureIntent = PendingIntent.getActivity(this, 0, cancelIntent, 0);

      mLoginService.authorize(successIntent, failureIntent, true);
   }
```

Now you will be able to authenticate the user with Identity Server.

### Authentication Context.

- After successful authentication, `AuthenticationContext` object will be returned in the Intent
. This `AuthenticationContext` Object is used to store all the context related to that authentication
 flow.

- From the `oncreate()` method of the `UserInfoActivity`, get the `AuthenticationContext` object. 

- Authentication context object has `User`, `OidcDiscovery response`,   `TokenResponse`, and `UserInfoResponse`.
 
```java
@Override
    protected void create() {  
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_info);
        mLoginService = new DefaultLoginService(this);
        mAuthenticationContext = (AuthenticationContext) getIntent().getSerializableExtra("context");
    }
``` 


#### Get User Details.

In order to get user-related information,


`String userName = mAuthenticationContext.getUser().getUserName();`
                
`Map<String, Object> userAttributes = mAuthenticationContext.getUser().getAttributes();`

#### Get information related to token response

To get information related to token response, first you need to get `OAuth2TokenResponse` from
 `AuthenticationContext`. You can use the following code blocks.

```OAuth2TokenResponse oAuth2TokenResponse = mAuthenticationContext.getOAuth2TokenResponse();```   
   
To get AccessToken, RefreshToken and IDToken from  OAuth2TokenResponse
      
```
String idToken = oAuth2TokenResponse.getIdToken();
String accessToken = oAuth2TokenResponse.getAccessToken();
Long accessTokenExpTime = oAuth2TokenResponse.getAccessTokenExpirationTime();
String tokenType = oAuth2TokenResponse.getTokenType();
String refreshToken = oAuth2TokenResponse.getRefreshToken();
```

!!! Tip 
    To get refresh token from WSO2 Identity Server, you need to enable [Refresh Token](../../../guides/access-delegation/configure-refresh-token) grant type.

#### Get claims from IDToken

To get information from idToken , first you need to get `IDTokenResponse` from `OAuth2TokenResponse`. 
You can use the following code blocks.

```
OAuth2TokenResponse.IDTokenResponse idTokenResponse = mAuthenticationContext
                .getOAuth2TokenResponse().getIdTokenResponse();
```

To get server specific claims from idToken:

```
String iss = idTokenResponse.getIssuer();
String sub = idTokenResponse.getSubject();
String iat = idTokenResponse.getIssueTime();
String exp = idTokenResponse.getExpiryTime();
List<String> audience = idTokenResponse.getAudience()

```

To get the map of all claims

`Map<String, Object> claims = idTokenResponse.getClaims();`

To get a specific String claim

`String claimValue = idTokenResponse.getClaim(claimName)`

#### Get userinfo response

-   Get userinfo response from authentication context

    If you called `LoginService.authorize(PendingIntent successIntent, PendingIntent failureIntent
    , Boolean callUserInfo)` with `callUserInfo` parameter as `true`, then `UserInfoResponse` will be
    stored in the `AuthenticationContext` object.
    
    To get `UserInfoResponse` from `AuthenticationContext`,

    ```UserInfoResponse userInfoResponse = mAuthenticationContext.getUserInfoResponse();```
    
    - To get the subject,

        `String subject = userInfoResponse.getSubject();`
    
    - To get some specific claim,

        `String email = userInfoResponse.getUserInfoProperty("email");`
        
    - To get all claims,

        `JSONObject userClaims = userInfoResponse.getUserInfoProperties();`

-   Call UserInfo explicitly.

    You can get userclaims by calling `getUserInfo(..)` method in the `LoginService`.

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

### Logout

- Have a button with id logout.
- Call the logout method when logout button is clicked.

```java
findViewById(R.id.logout).setOnClickListener(v -> logout());

```
- Call the logout method of LoginService instance.

```java
private void logout() {

        mLoginService.logout(this, mAuthenticationContext);
        finish();
    }
```

!!! info "Related Topics"

    To try out a sample, refer [this repository](https://github.com/wso2-extensions/identity-samples-android.git).
