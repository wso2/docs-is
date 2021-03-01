1.	Start WSO2 IS.

2.	Access the Management Console (https://<IS_HOST\>:<PORT\>/carbon) to create a service provider.

3.	Navigate to the **Service Providers** tab listed under the **Identity** section and click **Add**.

4.	Provide the name for the service provider as `sample-app` and click **Register**. 

5.	Expand the  **Inbound Authentication Configuration** section and click **Configure** under the **OAuth/OpenID Connect Configuration** section.

6.	Provide the callback URL as `http://localhost:8080/spring-boot-app/login/oauth2/code/wso2`.
   
   !!!tip
      The **Callback URL** is the exact location in the service provider's application where a authorization code
      would be sent. This should be always `{baseUrl}/login/oauth2/code/wso2`.

      Example: http://localhost:8080/login/oauth2/code/wso2

      Optionally, if you need to configure an oidc logout, then add a post-logout-url as well.
      
      Example: http://localhost:8080/spring-boot-app/login
      
7.	Click **Update**.

8.	Expand the **Inbound Authentication Configuration** section and click the **OAuth/OpenID Connect Configuration** section. Copy the value of  `OAuth Client Key` shown here.

 
| Field                 | Value                                                                                                 | 
| --------------------- | -----------------------------                                                                         | 
| Service Provider Name | sample-app                                                                                            |
| Description           | This is a spring-boot application                                                                     | 
| CallBack Url          | http://localhost:8080/spring-boot-app/login/oauth2/code/wso2                                          |
