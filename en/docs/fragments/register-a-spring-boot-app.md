1. Access WSO2 Identity Server Developer Portal .
 
 2. Go to **Applications** and click **New Application**.
  
 3. Click **Show More**
 
 4. Open the  **OIDC Web Application** template.
  
 5. Enter a **Name** for the application 
       
    This indicates the name of your application.       
    **Example**: sample-app
   
 6. Click **Next**
 
 7. Enter **Callback URL**. 
      Add the flowwing two callBack URLs: 

      - http://localhost:8080/spring-boot-sample/login/oauth2/code/wso2 
      - http://localhost:8080/spring-boot-sample/login
 
    !!!tip
        The **Callback URL** is the exact location in the service provider's application where a authorization code
        would be sent. This should be always `{baseUrl}/login/oauth2/code/wso2` .
            
           Example: http://localhost:8080/login/oauth2/code/wso2
            
        If you want configure oidc logout also, then you need to add post-logout-url.  You can add multiple callback
        urls. In WSO2 Identity Server, post-logout-url can be configured via callback URL.
    
           Example:  http://localhost:8080/spring-boot-app/login
           
     

 8. Click **Next**
 
 9. View the application details and Click **Finish**
 
 10. Click the **Access** tab and note the **Client ID** and **Client Secret** that appear. 
 
  
| Field                 | Value                                                                 | 
| --------------------- | ------------------------------                                        | 
| Service Provider Name | your-application-name                                                 |
| Description           | This is a spring-boot application                                     | 
| CallBack Url          | {baseUrl}/login/oauth2/code/wso2,{baseUrl}/spring-boot-app/login      |
                        

**Eg:**
 
| Field                 | Value                                                                                                 | 
| --------------------- | -----------------------------                                                                         | 
| Service Provider Name | sample-app                                                                                            |
| Description           | This is a spring-boot application                                                                     | 
| CallBack Url          | http://localhost:8080/sprinb-boot-app/login/oauth2/code/wso2, http://localhost:8080/spring-boot-app   |
