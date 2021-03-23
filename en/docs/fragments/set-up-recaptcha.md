## Configure reCaptcha API keys

[reCAPTCHA](https://developers.google.com/recaptcha/) is a free widget service provided by Google that can be used for protection against spam or other forms of internet abuse by verifying whether a user is a human or a robot.The following section guides you through setting up reCAPTCHA with the WSO2 Identity Server.

First, you will need to register and create an API key pair for the required domain. The key pair consists of a site key and secret. The site key is what is used when a reCAPTCHA widget is displayed on a page. After verification, a new parameter called g-recaptcha-response appears on the form which the user submits. From the server side, you can verify the submitted captcha response by calling the Google API with the secret key.

1.  Go to <https://www.google.com/recaptcha/admin>.

2.  You will see the following window. Fill in the fields to register
    your identity server domain and click **Register**. The following
    are sample values:
    -   **Label:** WSO2 Identity Server
    -   Select the reCAPTCHA V2 option.
    -   **Domains:** is.wso2.com  

3.	Accept the terms of service. 

4.  Click **Submit**.

    ![configuring-recaptcha-api-keys](../../../assets/img/fragments/recaptcha-new-sso.png) 

5.  Take note of the site key and secret that you receive.
    ![note-site-key-secret](../../../assets/img/fragments/copy-key.png) 

## Configure reCAPTCHA settings in WSO2 IS

1. Open the `deployment.toml` file located in the `<IS_HOME>/repository/conf/` directory and uncomment the following configuration 
   block to Google reCAPTCHA settings. The values copied from step 5 should be added for the `site_key` and `secret_key` properties. 

    ```toml
    [recaptcha]
    enabled = "true"
    api_url = "https://www.google.com/recaptcha/api.js"
    verify_url = "https://www.google.com/recaptcha/api/siteverify"
    site_key = ""
    secret_key = ""
    ```
    
    !!! note
    
        If you have additional authorization endpoints, you need to include
        the `login.do` URL paths of these endpoints. Here,
        URL paths are the URLs without the host parameters. The URL paths should be comma seperated. The `redirect_urls`
        should be added as a property of `[recaptcha]` in the deployment.toml file.
    
        ``` toml
        redirect_urls="url1_path,url2_path"
        ```
    
        Below is an example of how to include the URL paths of additional authorization end points.
    
        ``` toml
        redirect_urls="/authenticationendpointone/login.do,/authenticationendpointtwo/login.do"
        ```

    !!! tip
        
        To modify the filter mapping for reCAPTCHA, open the
        `           web.xml          ` file located in the
        `           <IS_HOME>/repository/conf/tomcat/carbon/WEB-INF          `
        directory and find the following filter. You can modify the relevant
        URL patterns if required.
    
        ``` xml
        <filter>
            <filter-name>CaptchaFilter</filter-name>
            <filter-class>org.wso2.carbon.identity.captcha.filter.CaptchaFilter</filter-class>
        </filter>
        <filter-mapping>
            <filter-name>CaptchaFilter</filter-name>
            <url-pattern>/samlsso</url-pattern>
            <url-pattern>/oauth2</url-pattern>
            <url-pattern>/commonauth</url-pattern>
            <dispatcher>FORWARD</dispatcher>
            <dispatcher>REQUEST</dispatcher>
        </filter-mapping>
        ```
        
2. Restart the WSO2 IS server.

3. Log in to the management console.

4. Click **Resident** under **Identity Providers** found in the **Main** tab.

5. Expand the **Login Attempts Security** tab. Then, expand the **reCaptcha for SSO Login** tab.

6. Select the relevant option according to your requirement:

    - **Always prompt reCaptcha:** 

        Select this option to prompt users for reCaptcha with every SSO login attempt. 

    - **Prompt reCaptcha after max failed attempts:** 
    
        Select this option to prompt reCAPTCHA only after the number of max failed attempts has been exceeded. 
    
        If this option is selected, enter a value for the **Max failed attempts for reCaptcha** field as well. For example, if you enter 3, reCaptcha will be re-enabled after 3 failed attempts.  
        
        ![configure-captcha-for-sso](../../../assets/img/guides/recaptcha-sso.png)
        
        Note the following when selecting this option:
        
        - Account locking must be enabled to enable **Prompt reCaptcha after max failed attempts**.

        - The **Max failed attempts for reCaptcha** value must be lower than the **Maximum failed login attempts** value configured under the **Account Lock** tab.
    
          ![configure-account-locking](../../../assets/img/guides/configure-account-locking.png)
    
7.  You have now successfully configured reCAPTCHA for the single sign
    on flow. If the number of failed attempts reaches the maximum
    configured value, the following reCAPTCHA window appears.  

    ![captcha-login-failed](../../../assets/img/guides/captcha-login-failed.png)
       
    
