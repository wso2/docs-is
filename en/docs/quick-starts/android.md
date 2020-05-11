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
| Call Back Url         | com.example.myapplication://oauth  | 

## Configure the Android SDK

### Initializing the  SDK

#### Add the dependency 

Add `AppAuth-Android` dependency in `build.gradle` file.

```gradle
dependencies {
   implementation 'net.openid:appauth:0.7.0'
}
```

#### Add a URI Scheme   

You must add a redirect scheme to receive sign in results from the web browser.
 To do this, you must define a gradle manifest placeholder in your app's build.gradle:

```gradle
android.defaultConfig.manifestPlaceholders = [
       'appAuthRedirectScheme': 'com.example.myapplication'
]
```

#### Configuration

Create a `config.json` file in `res/raw/` directory and add the relevant configs. 
    - Add the client-id, client- secret and application-redirect-url of the application.
    - Update the {HOST_NAME}:{PORT} with the IS server's hostname and port respectively

```json
{
 "client_id": {client-id},
 "client_secret": {client-secret},
 "redirect_uri": "{application-redirect-url},
 "authorization_scope": "openid",
 "authorization_endpoint": "https://{HOST_NAME}:{PORT}/oauth2/authorize",
 "end_session_endpoint": "https://{HOST_NAME}:{PORT}/oidc/logout",
 "token_endpoint": "https://{HOST_NAME}:{PORT}/oauth2/token"
}
```
#### Read Configuration

Add a ConfigManager.java class to reads the configuration from res/raw/config.json file.

```java
/**
* Reads the configuration from res/raw/config.json file.
*/
public class ConfigManager {

   private static WeakReference<ConfigManager> sInstance = new WeakReference<>(null);

   private final Context context;
   private final Resources resources;

   private JSONObject configJson;
   private String clientId;
   private String clientSecret;
   private String scope;
   private Uri redirectUri;
   private Uri authEndpointUri;
   private Uri tokenEndpointUri;
   private Uri logoutEndpointUri;

   private ConfigManager(Context context) {

       this.context = context;
       resources = context.getResources();
       readConfiguration();
   }

   public static ConfigManager getInstance(Context context) {

       ConfigManager config = sInstance.get();
       if (config == null) {
           config = new ConfigManager(context);
           sInstance = new WeakReference<>(config);
       }

       return config;
   }
   public String getClientId() {return clientId;}
   public String getScope() { return scope; }
   public Uri getRedirectUri() {  return redirectUri; }
   public Uri getAuthEndpointUri() { return authEndpointUri;}
   public Uri getTokenEndpointUri() {return tokenEndpointUri;}
   public Uri getLogoutEndpointUri() { return logoutEndpointUri;}
   public String getClientSecret() { return clientSecret; }

    private void readConfiguration()  {

       BufferedSource configSource = Okio.buffer(Okio.source(resources.openRawResource(R.raw.config)));
       Buffer configData = new Buffer();

       try {
           configSource.readAll(configData);
           configJson = new JSONObject(configData.readString(Charset.forName("UTF-8")));
       } catch (IOException ex) {

       } catch (JSONException ex) {

       }
       clientId = getRequiredConfigString("client_id");
       clientSecret = getRequiredConfigString("client_secret");
       scope = getRequiredConfigString("authorization_scope");
       redirectUri = getRequiredConfigUri("redirect_uri");
       authEndpointUri = getRequiredConfigUri("authorization_endpoint");
       tokenEndpointUri = getRequiredConfigUri("token_endpoint");
       userInfoEndpointUri = getRequiredConfigUri("userinfo_endpoint");
       logoutEndpointUri = getRequiredConfigUri("end_session_endpoint");
   }

   private String getRequiredConfigString(String propName) {

       String value = configJson.optString(propName);

       if (value != null) {
           value = value.trim();
           if (TextUtils.isEmpty(value)) {
               value = null;
           }
       }
       if (value == null) {
           Log.e("ConfigManager", propName + " is required");
       }
       return value;
   }

     private Uri getRequiredConfigUri(String propName) {

       String uriStr = getRequiredConfigString(propName);
       Uri uri = null;
       try {
           uri = Uri.parse(uriStr);
       } catch (Throwable ex) {
           Log.e("ConfigManager", propName + "could not be parsed ");
       }
       return uri;
   }
}
```

5. In your Android activity, get the ConfigManager object by calling the `getInstance(context)` method.

    `ConfigManager configManager = ConfigManager.getInstance(context);`
 - This is the configManager object used throughout this document.




### Login

#### Get the authorization code with PKCE.


```java
private void doAuthorization(Context context){
        AuthorizationServiceConfiguration serviceConfiguration = new AuthorizationServiceConfiguration(
                configManager.getAuthEndpointUri(),  configManager.getTokenEndpointUri());
        AuthorizationRequest.Builder builder = new AuthorizationRequest.Builder(
                serviceConfiguration,
                configManager.getClientId(),
                ResponseTypeValues.CODE,
                configManager.getRedirectUri()
        );
        builder.setScopes(configManager.getScope());
        AuthorizationRequest request = builder.build();
        AuthorizationService authorizationService = new AuthorizationService(context);
        CustomTabsIntent.Builder intentBuilder = authorizationService.createCustomTabsIntentBuilder(request.toUri());

        customTabIntent.set(intentBuilder.build());
        // Redirect to UserInfoActivity after successful authnetication.
        Intent completionIntent = new Intent(context, UserInfoActivity.class);
        // Redirect to LoginActivity if the request fails.
        Intent cancelIntent = new Intent(context, LoginActivity.class);
        cancelIntent.putExtra("failed", true);
        cancelIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        authorizationService.performAuthorizationRequest(request, PendingIntent.getActivity(context, 0,
                completionIntent, 0), PendingIntent.getActivity(context, 0, cancelIntent, 0),
                customTabIntent.get());

    }
```
- You can add this `doAuthorization(Context context)` method inside a Activity class when a user clicks the login button. 

```java
    findViewById(R.id.login).setOnClickListener(v ->
                   doAuthorization(this)
           );
```

#### Get the accesstoken and idtoken.
```java
    private void handleAuthorizationResponse(Intent intent) {

        String clientSecret = configManager.getClientSecret();
        AuthorizationResponse response = AuthorizationResponse.fromIntent(intent);
        Map<String, String> additionalParameters = new HashMap<>();
        additionalParameters.put("client_secret", clientSecret);
        AuthorizationService service = new AuthorizationService(this);

        ClientAuthentication clientAuthentication = new ClientSecretBasic(clientSecret);
        service.performTokenRequest(response.createTokenExchangeRequest(additionalParameters),
                clientAuthentication, this::handleCodeExchangeResponse);
    }


    private void handleCodeExchangeResponse(TokenResponse tokenResponse, AuthorizationException authException) {

        String idToken = tokenResponse.idToken;
        String accessToken = tokenResponse.accessToken;
    }
```
- You can add this `handleAuthorizationResponse(Intent intent)` method inside a Activity when there is a successfull
 authentication response comes from the IDP. 
- In the authorization request, you need to create a Intent for successfull request and redirect to this activity.
    ```java
    @Override
        protected void onStart() {  
            super.onStart();
            getConfigManager(this);
            handleAuthorizationResponse(getIntent());
        }
     ``` 
### Logout

- Use the idToken obtained from the token response in the above flow to do the logout request.

    ```java
    private void singleLogout(Context context, String idToken){

        StringBuffer url = new StringBuffer();
        url.append(configManager.getLogoutEndpointUri());
        url.append("?id_token_hint=");
        url.append(idToken);
        url.append("&post_logout_redirect_uri=");
        url.append(configManager.getRedirectUri());

        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
        CustomTabsIntent customTabsIntent = builder.build();
        customTabsIntent.intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY | Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        customTabsIntent.launchUrl(context, Uri.parse(url.toString()));
    }
    ```
  - You can call this logout method from an Activity when the user click the logout button.
  
  ```java
  findViewById(R.id.logout).setOnClickListener(v ->
                  singleLogout(this, idToken)
          ); 
  ```

### Read User Information

- Can read the user information from idToken
- Add this dependency in you gradle file `com.googlecode.json-simple:json-simple:1.1` to import `org.json.simple.*` library.

    ```java
    private void readUserInfo(String idToken){

        try {
            JSONParser parser = new JSONParser();
            String[] split = idToken.split("\\.");
            String decodeIDToken = new String(Base64.decode(split[1], Base64.URL_SAFE),"UTF-8");
            JSONObject json = (JSONObject) parser.parse(decodeIDToken);
            String userName = (String) json.get("sub");
            String email = (String) json.get("email");

        } catch (Exception e) {
            //handle the exception.
        }
    }
    ```
### Check Session State

< Explain How to Use the SDKs >

!!! Tip "What's Next?"

    - [Enable single sign-on with another mobile application]()
    - [Check out Detailed guide](../guides/authentication/mobile-app.md)    