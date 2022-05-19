## Configure reCAPTCHA in WSO2 IS

1. Open the `deployment.toml` file located in the `<IS_HOME>/repository/conf/` directory and uncomment the following configuration 
   block to Google reCAPTCHA settings. The values copied when configuring reCAPTCHA API keys should be added for the `site_key` and `secret_key` properties. 

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
        
2. Restart the WSO2 IS server.
