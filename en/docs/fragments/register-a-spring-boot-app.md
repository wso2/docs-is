1.	Start WSO2 IS.

2.	Access the Management Console (https://<IS_HOST\>:<PORT\>/carbon) to create a service provider.

3.	Navigate to the **Service Providers** tab listed under the **Identity** section and click **Add**.

4.	Provide the name for the service provider as `sample-app` and click **Register**. 

5.	Now you will be redirected to the **Edit Service Provider** page.

6.	Expand the  **Inbound Authentication Configuration** section and click **Configure** under the **OAuth/OpenID Connect Configuration** section.

7.	Provide the callback URL as `http://localhost:8080/spring-boot-app/login/oauth2/code/wso2`.

8.	Click **Update**.

9.	Expand the **Inbound Authentication 			Configuration** section and click the **OAuth/OpenID Connect Configuration** section. Copy the value of  `OAuth Client Key` shown here.

 
| Field                 | Value                                                                                                 | 
| --------------------- | -----------------------------                                                                         | 
| Service Provider Name | sample-app                                                                                            |
| Description           | This is a spring-boot application                                                                     | 
| CallBack Url          | http://localhost:8080/spring-boot-app/login/oauth2/code/wso2                                          |


