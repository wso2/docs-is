# Configure Single-Sign-On with WSO2 Identity Server via OpenID Connect
 
 You can enable Single-sign-on for an ElasticSearch/Kibana deployment with WSO2 Identity Server via OpenID Connect. To set this up, follow the steps given below.
 
## Prerequisites

- An Elasticsearch platinum subscription is required to enable SSO in ELK.

- [Configure ELK Analytics](./elk-analytics-installation-guide.md) in WSO2 Identity Server.

    

## Configure a service provider at WSO2 Identity Server
 
To enable SSO with WSO2 Identity Server, a service provider needs to be created. Follow the steps given below to create a service provider.
 
1. Login to the WSO2 Identity Server management console via https://{IS_HOST}:{PORT}/carbon
 
2. In the **Main** tab, click **Add** under **Service Providers**.

    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-1.png)
 
3. Provide a name for the service provider (eg. kibana) and click **Regsiter**.
 
    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-2.png)
 
4. Once the service provider is created, expand its  **Claim Configuration** section. Configure the claims as shown in the image below and click **Update**.
 
    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-3.png)
 
5.  Expand the **Inbound Authentication Configuration** and under **OAuth/OpenID Connect Configuration** select **Configure**. Enter the following as the **Callback Url**.
    ```
    regexp=(https://localhost:5601/api/security/oidc/callback|https://localhost:5601/security/logged_out)
    ```
 
    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-4.png)
 
6. Click Update to save your changes.
 
7. Return to the **Main** tab of the WSO2 IS console and lick **OIDC Scopes** -> **List** under the **Manage** section.

8. Click **Add claims** in the **Openid** row. Add the claims you’ve used in step 4 and click **Finish**.


## Configure OIDC Realm in Elasticsearch
 
To configure single sign-on in the Elastic Stack using OpenID connect, follow the steps given [here](https://www.elastic.co/guide/en/elasticsearch/reference/7.16/oidc-guide.html).
 
A sample OpenID connect realm is as follows.
 
  ```
  xpack.security.authc.token.enabled: true
  xpack.security.authc.realms.oidc.oidc1:
    order: 1
    rp.client_id: "<<CLIENT ID>>"
    rp.response_type: code
    rp.redirect_uri: "http:///<KIBANA_HOST>:5601/api/security/oidc/callback"
    op.issuer: "https://<IS_HOST>:<PORT>/oauth2/token"
    op.authorization_endpoint: "https://<IS_HOST>:<PORT>/oauth2/authorize"
    op.token_endpoint: "https://<IS_HOST>:<PORT>/oauth2/token"
    op.jwkset_path: "https://<IS_HOST>:<PORT>/oauth2/jwks"
    op.endsession_endpoint: "https://<IS_HOST>:<PORT>/oidc/logout"
    op.userinfo_endpoint: "https://<IS_HOST>:<PORT>/oauth2/userinfo"
    rp.post_logout_redirect_uri: "http://<KIBANA_HOST>:5601/security/logged_out"
    claims.principal: sub
    ssl.verification_mode: none
    claims.groups: groups
    claims.name: name
    claims.mail: email
  ```
 
## Configure role mapping for Kibana Dashboard
 
Once the above steps are completed, role mapping needs to be configured in Kibana to allow WSO2 Identity Server users to access the dashboards in Kibana. For that follow the steps below.
 
### Create Users and Roles in WSO2 Identity Server
 
1. Login to the WSO2 Identity Server management console via https://{IS_HOST}:{PORT}/carbon
2. From the **Main** menu in the left panel, click **Add** under the **Users and Roles** section.

      ![]({{base_path}}/assets/img/elk-analytics/elk-create-role.png)

3. In **Add Users and Roles**, click **Add New Role**

      ![]({{base_path}}/assets/img/elk-analytics/elk-add-role.png)


4. Create a role (eg. `AnalyticsViewer`) and click **Finish**.

      ![]({{base_path}}/assets/img/elk-analytics/elk-new-role.png)

5. In **Add Users and Roles**, click **Add New User**.

6. Create a new user and click **Next**.

      ![]({{base_path}}/assets/img/elk-analytics/elk-add-new-user.png)

7. Assign the role that you created in step 4 to the user and click **Finish**.

      ![Assign role to user]({{base_path}}/assets/img/elk-analytics/elk-assign-role.png)


### Configure role mapping in Kibana
 
1. Login to Kibana using basic authentication.

2. Click **Stack Management** on the left panel and then click **Role Mappings** under the **Security** section.
 
3. Click **Create Role Mapping** and add a new role mapping by giving a **Mapping name**.
 
4. Select a role that has access to the particular dashboard from  **Roles**.
 
    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-6.png)
 
5. Click **Add Rules** under **Mapping rules**.

6. Select **groups** as the user field and enter the name of the role that you created in the WSO2 Identity Server.
 
    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-7.png)
 
 
7. Logout from Kibana and re-login by selecting the **Log in with WSO2 option**.
 
    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-8.png)
 
8. This will navigate to the WSO2 Identity Server login page. Try logging in with the credentials of the user that you created.
 
    ![]( {{base_path}}/assets/img/elk-analytics/elk-analytics-sso/elk-sso-9.png)
 
