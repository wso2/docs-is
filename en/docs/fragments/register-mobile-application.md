1.	Start WSO2 IS.
2.	Access the Management Console (https://<IS_HOST\>:<PORT\>/carbon) to create a service provider.
	![Management Console](../../../assets/img/fragments/android-sp.png)

3.	Navigate to the **Service Providers** tab listed under the **Identity** section and click **Add**.

4.	Provide the name for the service provider as `sample-app` and click **Register**. 

5.	Expand the  **Inbound Authentication Configuration** section and click **Configure** under the **OAuth/OpenID Connect Configuration** section.

6.	Provide the following values for the respective fields and click **Update** while keeping other default settings as it is.
	-  Callback Url - wso2sample://oauth2
	-  PKCE Mandatory - True
	-  Allow authentication without the client secret - True

7.	Click **Update**.

8.	Once the service provider is registered, you will be redirected to the **Service Provider Details** page. Here, expand the **Inbound Authentication Configuration** section and click the **OAuth/OpenID Connect Configuration** section. Copy the value of `OAuth Client Key` shown here.
	
	![android-client-id](../../../assets/img/fragments/android-client-id.png)


