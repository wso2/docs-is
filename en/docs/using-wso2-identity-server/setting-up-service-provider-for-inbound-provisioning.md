# Setting Up Service Provider for Inbound Provisioning

Inbound provisioning configurations can be defined in Service provider
configuration at the admin console of the Identity Server.

It can be done using the following two methods.

### Configuring the Resident Service Provider

Configuring the resident service provider is particularly useful if your
application does not support OAuth. You can just send SCIM request
secured using HTTP basic authentication to the SCIM endpoints in the
Identity Server. If you have configured multiple user stores with
Identity Server, you can specify the user store domain that you are
provisioning the user.

#### Configuring the Identity Server for provisioning

The following steps provide instructions on how to configure this.

1.  Sign in to the WSO2 Identity Server [Management
    Console](../../setup/getting-started-with-the-management-console).
2.  On the **Main** menu, click **Identity \> Service Providers \>
    Resident**.  
    ![sp-resident](../../assets/img/using-wso2-identity-server/sp-resident.png)
3.  Under the **Inbound Provisioning Configuration** section, click
    **Inbound Provisioning Configuration**.  
    ![idp-provisioning-config](../../assets/img/using-wso2-identity-server/idp-provisioning-config.png)

    !!! info
        When configuring Inbound Provisioning Configuration, you can enable
        dumb mode for inbound provisioning by marking the check box
        available there. When this is enabled, Users/Groups will not
        provision to the user store, they will only outbound provisioned.

4.  From the drop down available, select the user store domain you
    prefer.

    !!! tip
    
        If you do not specify any user store domain in the
        configuration (basically keep it without selecting anything), the
        user is created in the user store domain that is contained in the
        request. For example, In the SCIM provisioning request, you can send
        the user name in the following format.
    
        ``` java
        {Domain-Name}/username
        ```

        If the `           Domain-Name          ` is not specified with the
        `           username          `, the user is provisioned to the
        primary user store.

        However, if you specify the user store in the configuration, the
        user is created in the configured user store domain regardless of
        the what is specified in the request.


5.  Click **Update** to save your configurations.

  

#### Testing the provisioning

To confirm that the provisioning works, do the following.

1.  Execute the following curl request (which will use SCIM to create a
    new user).

    ``` java
    curl -v -k --user admin:admin --data "{"schemas":[],"name":{"familyName":"mervyn","givenName":"samuel"},"userName":"samuel","password":"samuel","emails":[{"primary":true,"value":"samuel@wso2.com"}]}" --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```
    !!! info 
        Refer [SCIM 1.1 APIs](../../using-wso2-identity-server/scim-1.1-apis) page for more details on SCIM

2.  On the Management Console, click on **Users and Roles** in the
    **Identity** menu in **Main** tab.
3.  Click **List** and then Click **Users** and check if the user you
    added is listed in the user management user interface. If the user
    has been created in the configured or requested user store, the
    provisioning has worked successfully.  
      
    ![user-list](../../assets/img/using-wso2-identity-server/user-list.png)

      

### Configuring a Service Provider

It is more appropriate to configure a service provider if your
application offers support for OAuth. Also, this is a more appropriate
configuration if you do not want to create the user in the Identity
Server user store. When the resident service provider configuration is
used, it allows outbound provisioning while the user is created in the
Identity Server and it's user store. When using service provider
configurations instead, you can select the preferred identity provider
and connector for outbound provisioning.

#### Configuring the Identity Server for provisioning

The following steps provide instructions on how to configure the service
provider.

1.  On the **Main** menu of the Management Console, click **Identity \>
    Service Providers \> Add**.
2.  Enter the **Service Provider Name** and provide a brief
    **Description** of the service provider. Only **Service Provider
    Name** is a required field.  
    ![description-sp](../../assets/img/using-wso2-identity-server/description-sp.png) 
3.  Click **Register**. The service provider details page appears.

4.  Expand the **Inbound Provisioning Configuration** section and select
    the user store from the drop down.

    ![inbound-provisioning-configuration](../../assets/img/using-wso2-identity-server/inbound-provisioning-configuration.png) 

    !!! info 
        When configuring Inbound Provisioning Configuration, you can enable
        dumb mode for inbound provisioning by marking the check box
        available there. When this is enabled, Users/Groups will not
        provision to the user store, they will only outbound provisioned.

5.  Click **Update** to save your configurations.

When compared with the request sent to the resident service provider,
this will require HTTP basic authentication headers replaced with an
access token. You can simply use the client credentials or the resource
owner grant type to obtain the access token.

#### Obtaining an OAuth access token

For the purposes of this example, the access token was obtained by
configuring an OAuth service provider.

1.  On the **Main** menu of the Management Console,click **Identity \>
    Service Providers \> List**.
2.  Find the service provider you just created and click **Edit**.
3.  Under the **Inbound Authentication Configuration** section, click
    **OAuth/OpenID Connect Configuration \>** **Configure**.
4.  ![config-oauth-openid](../../assets/img/using-wso2-identity-server/config-oauth-openid.png) 

5.  Enter the required information.  
    ![oauth-openid-info](../../assets/img/using-wso2-identity-server/oauth-openid-info.png)   
    Here we use the playground sample as the Callback Url for the
    purposes of this example scenario.
6.  Click **Add**.
7.  We now have an **OAuth Client Key** and **OAuth Client Secret**.
    Click **Show** to view the **OAuth Client Secret**.  
    ![show-oauth-client-secret](../../assets/img/using-wso2-identity-server/show-oauth-client-secret.png)
8.  Use a service like [Base64](https://www.base64encode.org/) to encode
    your **OAuth Client Key** and **OAuth Client Secret**. For this
    example, click **Encode** and enter your client key and client
    secret separated by a colon ":". Click the **\> ENCODE \<** button
    to encode this.  
    ![encode-key-secret](../../assets/img/using-wso2-identity-server/encode-key-secret.png)

9.  Use the encoded value to generate the access token by inserting it
    into the following cURL command after `           Basic          ` .

    ``` java
        curl -v -X POST -H "Authorization: Basic N2pHaXl5NnRmcl9RSXp2NGZRSUYzcG92aDJRYTpDd09fRWVBdndLaW1vT0pOc0VGdWNHYjIzNWNh" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=admin&password=admin" https://localhost:9443/oauth2/token
    ```

    The access token can be found in the output.  
    ![access-token](../../assets/img/using-wso2-identity-server/access-token.png)

10. The access token is then entered in the provisioning request after
    `           Bearer          ` .

#### Testing the provisioning

To confirm that the provisioning works, do the following.

1.  Execute the following curl request (which will use SCIM to create a
    new user).

    ``` java
        curl -v -k --header "Authorization: Bearer 955fded39fc6cb08525b5f2a35b3e2e"  --data '{"schemas":[],"name":{"familyName":"fernando","givenName":"yohanna"},"userName":"yohanna","password":"yohanna","emails":[{"primary":true,"value":"yohanna@wso2.com"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    !!! info 
        Refer [SCIM 1.1 APIs](../../using-wso2-identity-server/scim-1.1-apis) page for more details on SCIM

2.  On the Management Console, click on **Users and Roles** in the
    **Identity** menu in **Main** tab.
3.  Click **List** and then Click **Users** and check if the user you
    added is listed in the user management user interface. If the user
    has been created in the configured or requested user store, the
    provisioning has worked successfully.

  
