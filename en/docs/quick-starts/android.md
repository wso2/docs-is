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

1. Add `AppAuth` dependency in `build.gradle` file.
    ```json
    dependencies {
       implementation 'net.openid:appauth:0.7.0'
    }
    ```
2. Add the following redirectScheme in the `build.gradle`.

    ```json
    android.defaultConfig.manifestPlaceholders = [
           'appAuthRedirectScheme': 'com.example.myapplication'
    ]
    ```

3. Create a `config.json` file in `res/raw/` directory and add the relevant configs.

    ```json
    {
     "client_id": "tkJfn9a8Yw2kfRfUSIrfvemcVjYa",
     "client_secret": "qrpIF2hh0bKl0Hojt4XTFuczy2oa",
     "redirect_uri": "com.example.myapplication://oauth",
     "authorization_scope": "openid",
     "authorization_endpoint": "https://10.0.2.2:9443/oauth2/authorize",
     "end_session_endpoint": "https://10.0.2.2:9443/oidc/logout",
     "token_endpoint": "https://10.0.2.2:9443/oauth2/token"
    }
    ```

4. Add a ConfigManager.java class to reads the configuration from res/raw/config.json file.

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

        Intent completionIntent = new Intent(context, UserInfoActivity.class);
        Intent cancelIntent = new Intent(context, LoginActivity.class);
        cancelIntent.putExtra("failed", true);
        cancelIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        authorizationService.performAuthorizationRequest(request, PendingIntent.getActivity(context, 0,
                completionIntent, 0), PendingIntent.getActivity(context, 0, cancelIntent, 0),
                customTabIntent.get());

    }
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

### Read User Information

- Can read the user information from idToken
- Add this dependency in you gradle file `com.googlecode.json-simple:json-simple:1.1` to import `org.json.simple
.*` library.


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