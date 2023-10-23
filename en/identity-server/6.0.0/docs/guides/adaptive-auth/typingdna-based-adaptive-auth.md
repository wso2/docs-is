# Configure TypingDNA-based adaptive Authentication

[Typing DNA](https://www.typingdna.com/) uses AI-based technology to identify users according to the way they type.

You can integrate typingDNA with WSO2 Identity Server to provide risk-based adaptive authentication for users.

----

## Scenario
Consider a scenario where you want to prompt an additional authentication step if the typing pattern of the user trying to log in does not match the typing pattern registered in the user's account. Then the log in flow of the user should be stepped up as follows:

1. Basic authentication (username and password)
2. TOTP

----

## Prerequisites
1. [Set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample)   application.
2. [Create a user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) named **Alex** with login permissions.
3. Create a typingDNA account. Learn how to create one [here](https://github.com/wso2-extensions/identity-conditional-auth-typingdna/blob/main/docs/files/Account%20Creation.pdf).

    !!! info
        Once you sign up for a typingDNA account, go to the dashboard and under API settings, enable **Auto-enroll**,   and **Force initial enrollments**.

## Set up TypingDNA in WSO2 IS

Follow the steps given below to set up typingDNA in the WSO2 IS server.

1. Open the **deployment.toml** file found in the `<IS-Home>/repository/conf/` directory and add the following configuration:
	```
	[myaccount.security]
    enabled_features=["security.loginVerifyData.typingDNA"]
    ```

2. Go to the [WSO2 store](https://store.wso2.com/store/assets/isconnector/list) and download both the authenticator and the artifacts from the **TypingDNA Connector**.

3. Copy the Authenticator file (`org.wso2.carbon.identity.conditional.auth.typingdna.functions-x.x.x.jar`) to the `<IS-Home>/repository/components/dropins` directory.

4. Unzip the Artifacts archive, copy the `api#identity#typingdna#v_.war` file to the `<IS-Home>/repository/deployment/server/webapps` directory.

5. Restart the WSO2 IS.

6. Go to **Identity Providers -> Resident -> Other Settings -> TypingDNA Configuration** and make the following changes.

    - Enable TypingDNA
    - Configure the typingDNA API key and API secret retrieved from the typingDNA [dashboard](https://www.typingdna.com/clients/).
    - Enable Advance TypingDNA-API mode if you have a pro/enterprise typingDNA account.
    - Configure the region (eu or us).

    ![TypingDNA configuration]({{base_path}}/assets/img/samples/typingdna-configuration.png)

7. Click **Update** to save the changes.

## Configure TypingDNA in applications

Follow the steps given below to configure TypingDNA in your application.

1. Go to **Service Providers -> List** and click **Edit** on the service provider that you want to configure TypingDNA in.

2. Expand **Local and Outbound Authentication Configuration** and click **Advanced Configuration**.
3. Configure two authentication steps.

    !!! info
        In this scenario, we will configure **Username and Password** and **TOTP**.
    
    ![TypingDNA configure two authentication steps]({{base_path}}/assets/img/samples/typingdna-two-steps.png)

4. Expand **Script Based Adaptive Authentication** and add the following script:

    ``` js
    // This script will step up 2FA authentication if the user's typing behaviour does not match with the enrolled behaviour.

    // You can use the parameters 'score' (num 0-100), 'result' (boolean), 'confidence' (num 0-100), 'comparedPatterns' in your 
    // authentication logic to trigger the 2nd step. 
    // Only the 'result' parameter has been used in the sample script. 

    var onLoginRequest = function(context) {
        executeStep(1, {
            onSuccess: function (context) {
                verifyUserWithTypingDNA(context, {
                    onSuccess: function(context,data){
                        // Change the definition here as required.
                        var userVerified = data.result;

                        // data.isTypingPatternReceived indicates whether a typing pattern is received from the login portal.
                        if (data.isTypingPatternReceived && !userVerified){
                            executeStep(2);
                        }
                    },onFail: function(context,data){
                        executeStep(2);
                    }
                });
            }
        });
    };

    ```
    ![TypingDNA script]({{base_path}}/assets/img/samples/typingdna-script.png)


5. Click **Update** to save the changes.

## Try it out

1. Access the login page of the sample application and click **Log in**
2. Use the credentials of **Alex** and log in to the application two times.
    
    !!! info
        You will be prompted for the second step on both occasions. TypingDNA requires two initial enrollments to register the user’s typing pattern. You can change the number of minimum initial enrollments required in the API settings of the [typingDNA dashboard](https://www.typingdna.com/clients/).

3. Log in for the third time with Alex's credentials.

    !!! info
        From this log in attempt and beyond, typingDNA will analyze your typing pattern against the registered typing pattern of the account. TOTP will only be prompted if your typing pattern does not match the typing pattern registered in Alex's account.





