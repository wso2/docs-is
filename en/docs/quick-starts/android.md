# Start enable Authentication for Android App

!!! Tip 
    [Try Our Sample](../../samples/android)
    
< Intro - Guide to enable authentication for a Android application- references >

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>
 
## Register Application


{!fragments/oauth-app-config-basic.md!}

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample-app  |
| Description           | This is a mobile application  | 
| Call Back Url         | wso2sample://oauth2  | 

## Configure the Android SDK

### Initializing the  SDK

#### Build the SDK locally.
To Build the SDK in your local machine, 

1. Clone the [SDK repo](https://github.com/wso2-extensions/identity-sdks-android)
    - `git clone https://github.com/wso2-extensions/identity-sdks-android `

2. Run the following commands.

      - `./gradlew clean assembleRelease`
      - `./gradlew publishToMavenLocal `

3. Now the library will be available in your
 local .m2 cache. 
 
#### Add the dependency 

Add `WSO2IS-SDK` dependency in `build.gradle` file.

```gradle
dependencies {
   dependencies {
        implementation 'org.wso2.identity.sdk.android.oidc:wso2is-oidc-sdk:0.0.1'
   }
}
```
#### Add a URI Scheme   

To redirect to the application from browser, it is necessary to add redirect scheme in the application. To do this
, you must define a gradle manifest placeholder in your app's build.gradle:

```gradle

android.defaultConfig.manifestPlaceholders = [
       'appAuthRedirectScheme': 'wso2sample'
]

```
Verify that this should be consistent with the redirectUri of the application that you configured in the developer-portal and in the oidc_config.json file.

!!! Tip 
    For an example, if you have configured the **callbackUrl** as **wso2sample://oauth2**, 
    then the **appAuthRedirectScheme** should be **wso2sample**

#### Configuration

Create a `oidc_config.json` file inside the `res/raw` folder. Add the following configs. 

- Add the client-id and redirect-uri of the application.

- Update the {HOST_NAME}:{PORT} with the IS server's hostname and port respectively in the discovery endpoint.

```json
{
 "client_id": {client-id},
 "redirect_uri": "{application-redirect-url},
 "authorization_scope": "openid",
 "discovery_uri": "https://{HOST_NAME}:{PORT}/oauth2/oidcdiscovery/.well-known/openid-configuration"
}
```

Example:

```json
"client_id": "rs5ww91iychg9JN0DJGLMaxG2gha",
 "redirect_uri": "wso2sample://oauth2",
 "authorization_scope": "openid",
 "discovery_uri": "https://stgcloud.kubesb.com/t/example/oauth2/oidcdiscovery/.well-known/openid-configuration"
}
```


### Login

As the first step, you need to initialize SDK in the Activity#onCreate method of the Activity that you are using to
 log users into your app. 
In this example, we will call it LoginActivity:

```java
    mLoginService = new DefaultLoginService(this);
```


#### Authorization.

Have a login button inside LoginActivity. Call the `doAuthorization(Context context)` method 
 when the login button is clicked to call authorization flow.

```java
    findViewById(R.id.login).setOnClickListener(v ->
                       doAuthorization(this)
        );
```
   
```java
private void doAuthorization() {
   
        Intent completionIntent = new Intent(this, UserInfoActivity.class);
        Intent cancelIntent = new Intent(this, LoginActivity.class);
        cancelIntent.putExtra("failed", true);
        cancelIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent successIntent = PendingIntent.getActivity(this, 0, completionIntent, 0);
        PendingIntent failureIntent = PendingIntent.getActivity(this, 0, cancelIntent, 0);
  
        mLoginService.authorize(successIntent, failureIntent);
}
```
   


#### Get the token response.

- After successful authorization, AuthenticationContext object will be returned in the Intent
. From the `oncreate()` method of the UserInfo.Activity, get the authenticationcontext object.

- Authentication context object has oidcdiscovery response, tokenresponse, ans userinfo responses.

- In all flows such as userinfo and logout request, you need to pass this context object.
 
- In the authorization request, you need to create a Intent for successfull request and redirect to this activity.
```java
@Override
    protected void create() {  
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_info);
        mLoginService = new DefaultLoginService(this);
        mAuthenticationContext = (AuthenticationContext) getIntent().getSerializableExtra("context");
    }
``` 

  
### Read UserInfo

```java
private void getUserInfo(){
   new UserInfoRequestHandler.UserInfoResponseCallback() {
               @Override
               public void onUserInfoRequestCompleted(UserInfoResponse userInfoResponse,
                       ServerException e) {
                   if (userInfoResponse != null) {
                       mSubject = userInfoResponse.getSubject();
                       mEmail = userInfoResponse.getUserInfoProperty("email");
                       JSONObject userInfoProperties = userInfoResponse.getUserInfoProperties();
                   }
   
                   if (mAuthenticationContext.getOAuth2TokenResponse() != null) {
                       mIdToken = mAuthenticationContext.getOAuth2TokenResponse().getIdToken();
                       mAccessToken = mAuthenticationContext.getOAuth2TokenResponse().getAccessToken();
                   }
    }
```

### Logout

- Call the logout method when logout button is clicked.

```java
findViewById(R.id.logout).setOnClickListener(v -> Logout());

```

```java
private void Logout() {

        mLoginService.logout(this, mAuthenticationContext);
        finish();
    }
```  
  

!!! Tip "What's Next?"

    - [Enable single sign-on with another mobile application]()
    - [Check out Detailed guide](../guides/login/mobile-app.md)    