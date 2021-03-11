## Set up recaptcha

[reCaptcha](https://developers.google.com/recaptcha/) is a free widget service provided by Google that can be used for protection against spam or other forms of internet abuse by verifying whether a user is a human or a robot.The following section guides you through setting up reCaptcha with the WSO2 Identity Server.

First, you will need to register and create an API key pair for the required domain. The key pair consists of a site key and secret. The site key is what is used when a reCaptcha widget is displayed on a page. After verification, a new parameter called g-recaptcha-response appears on the form which the user submits. From the server side, you can verify the submitted captcha response by calling the Google API with the secret key.

1.  Go to <https://www.google.com/recaptcha/admin>.

2.  You will see the following window. Fill in the fields to register
    your identity server domain and click **Register**. The following
    are sample values:
    -   **Label:** WSO2 Identity Server
    -   Select the reCAPTCHA V2 option.
    -   **Domains:** is.wso2.com  

3.	Accept the terms of service. 

3.  Click **Submit**.

    ![configuring-recaptcha-api-keys](../../../assets/img/fragments/recaptcha-new-sso.png) 

3.  Take note of the site key and secret that you receive.
    ![note-site-key-secret](../../../assets/img/fragments/copy-key.png) 

4.  Open the `deployment.toml` file located in the `<IS_HOME>/repository/conf/` directory and add the following configurations.

    ``` toml 
    # Google reCAPTCHA settings

    # Enable Google reCAPTCHA
    [recaptcha] 
    enabled= true

    # reCaptcha API URL
    api_url="https://www.google.com/recaptcha/api.js"

    # reCaptcha verification URL
    verify_url="https://www.google.com/recaptcha/api/siteverify"

    # reCaptcha site key
    site_key="6Lc8THgUAAAAAPekxT991FGFXRrsiPCMNv5PwZHB"

    # reCaptcha secret key
    secret_key="6Lc8THgUAAAAAEu83iOwSin_CSt6gqe97aa7EGFd"
    ```

    !!! note
    
        If you have additional authorization endpoints, you need to include
        the `login.do` URL paths of these endpoints. Here,
        url\_path is the URL without the host parameters.
    
        ``` toml
        redirect_urls="url1_path,url2_path"
        ```
    
        Below is an example of how to include the URL paths of additional
        authorization end points.
    
        ``` toml
        redirect_urls="/authenticationendpointone/login.do,/authenticationendpointtwo/login.do"
        ```
    
5.  Restart the WSO2 IS server.

You have successfully set up reCaptcha for your site.

