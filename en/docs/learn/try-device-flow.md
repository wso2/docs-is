# Try Device Authorization Grant

The Device Authorization Grant is one of the grant types in the OAuth 2.0
specification. For more information about this grant type, see
[Device Authorization Grant](../../learn/device-flow-grant).

!!! note "Before you begin" 
    You must first set up the `Device Flow Demo App` sample webapp.
    in order to try the following scenario.   
    
1. Navigate to <IS_HOME>/bin and start the server by executing the following command on a terminal window.

``` java tab="Linux/MacOS"
sh wso2server.sh
```

``` java tab="Windows"
wso2server.bat run
```

2. Access the [WSO2 Identity Server Management Console] (https://localhost:9443/carbon) and log in using your user
 name and password.

3. On the Main menu, click Users and Roles>Add and then click Add New User.
![register-user](../assets/img/using-wso2-identity-server/register-user.jpg)

4. On the Main menu, click Users and Roles>Add and then click Add New User.

![register-service-provider](../assets/img/using-wso2-identity-server/register-service-provider.png)

![register-service-provider-name](../assets/img/using-wso2-identity-server/register-sp-name.jpg)

5. Expand Inbound Authentication Configuration and then expand OAuth/OpenID Connect Configuration. Click Configure.

![register-service-provider-oauth](../assets/img/using-wso2-identity-server/register-sp-oauth.jpg)

7. Select `urn:ietf:params:oauth:grant-type:device_code` to enable using the device flow grant type. 

!!! info
Since these are public clients, ensure that the Allow authentication without the client secret checkbox is selected.

Next, click Update to save the service provider configurations. Note the generated OAuth client key and client secret.

8. On your device (i.e., the demo app), configure the client ID as your OAuth client-key.

![consumer-key-service-provider-oauth](../assets/img/using-wso2-identity-server/get-oauth-consumer-key.jpg)

9. Start the demo app.

![device-demo-login](../assets/img/using-wso2-identity-server/device-demo-login.jpg)

10. Now, click the Login button. This device will send a request to the /device_authorize endpoint along with it's
 client ID.

For example:

    https://localhost:9443/oauth2/device_authorize?client_id=GyPm7DliFituWP1fvWxhNcQOlGYa&scope=somescope_code

![device-demo-logged](../assets/img/using-wso2-identity-server/device-demo-logged.jpg)

11. Access the provided verification URI on your secondary device. You can either enter the user code there or scan the
 provided QR code. QR code contains verification URI complete(verification URI + user code).

![device-code-enter](../assets/img/using-wso2-identity-server/device-code-enter.jpg)

12. Click Sign In. If the user code is correct, you will be prompted to enter your credentials. If you have entered the
 wrong user code or an expired(user code is one time use code) one, it will ask to re enter your user code. In that case
  get a new user code and enter the new user code along with your credentials.
 
![device-username-password](../assets/img/using-wso2-identity-server/device-username-password.jpg)

![device-scopes](../assets/img/using-wso2-identity-server/device-scopes.jpg)

You will be redirected to the device flow success page. Note that you are now successfully logged in to the service
 provider and you are instructed to close the browser.

![device-success](../assets/img/using-wso2-identity-server/device-success.jpg)

On you demo app, you will see the following screen

![device-demo-success](../assets/img/using-wso2-identity-server/device-demo-success.jpg)

To see the device authorization response and token response, navigate to the Developer tab. To validate your token
, use the introspection endpoint. [Invoke the OAuth Introspection Endpoint](../../learn/invoke-the-oauth
-introspection-endpoint)
