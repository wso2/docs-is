## Configure reCAPTCHA API keys

[reCAPTCHA](https://developers.google.com/recaptcha/) (v3 and v2) is a free widget service provided by Google that can be used for protection against spam or other forms of internet abuse by verifying whether a user is a human or a robot. The following section guides you through setting up reCAPTCHA with WSO2 Identity Server.

First, you need to register and create an API key pair for the required domain. The key pair consists of a site key and secret key. The site key is used to invoke reCAPTCHA on a page. A new parameter called g-recaptcha-response is embedded to the request when user submits. From the server side, you can verify the submitted captcha response by calling the Google API with the secret key.

!!! Info
    -   The invisible reCAPTCHA v2 is invoked when the user clicks on an existing button. Only the most suspicious traffic will be prompted to solve a captcha.
    -   The reCAPTCHA v3 does not require user interaction, and the user's actions are rated by the Google API by a score. 

!!! Note  
    -   For reCAPTCHA v3, you need to determine a threshold value for the score by looking at the traffic at [reCAPTCHA admin console](https://www.google.com/recaptcha/admin).
    -   In the current  implementation, if the  score is less than the threshold, the user request will be blocked by the server.

1.  Go to <https://www.google.com/recaptcha/admin>.

2.  Fill in the fields to register
    your identity server domain and click **Register**. The following
    are sample values:
    -   **Label:** WSO2 Identity Server
    -   Select either invisible reCAPTCHA V2 or reCAPTCHA V3 option.
    -   **Domains:** is.wso2.com  

3.	Accept the terms of service. 

4.  Click **Submit**.

    ![configuring-recaptcha-api-keys]({{base_path}}/assets/img/fragments/recaptcha-new-sso.png) 

5.  Take note of the site key and secret that you receive.
    ![note-site-key-secret]({{base_path}}/assets/img/fragments/copy-key.png) 