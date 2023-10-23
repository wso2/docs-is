# Enable Single Sign-On for an OIDC Web Application

This page guides you through configuring [single sign-on authentication]({{base_path}}/references/concepts/single-sign-on) between two OIDC web applications. This is demonstrated using two sample applications called Pickup Dispatch and Pickup Manager.

## Scenario

Pickup is a cab company that has two OIDC web applications called pickup-dispatch and pickup-manager. Both applications use WSO2 Identity Server (IS) as the identity provider. When SSO is configured for both these applications, a user is only required to provide their credentials to the first application and the user will be automatically logged in to the second application.

![OIDC SSO scenario]({{base_path}}/assets/img/samples/oidc-sso-scenario-diagram.png)

Follow the steps below to deploy the sample applications and see how this works. 

----

## Register the services providers

You need to register the two sample applications as service providers in WSO2 Identity Server.

### Pickup Dispatch
1. Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using admin/admin credentials. 

2. Click **Service Providers** > **Add**. 

3. Enter `pickup-dispatch` as the **Service Provider Name**.
 
4. Click **Register**.
    
5. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

6. Click **Configure**.   

7. Select the relevant grant types that you wish to try out from the **Allowed Grant Types** list. 
        
8.  Enter `http://wso2is.local:8080/pickup-dispatch/oauth2client` as the **Callback Url**.
    
    !!! tip
        For more information on `Callback Url` field and other advanced configurations
        refer, [Advanced OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced)
        
9.  Click **Add**. Note that the **OAuth Client Key** and **Client Secret** get generated. You will need these values later on when deploying the sample application.

10.  Click **Update** to save the changes.

### Pickup Manager

1. Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2. Navigate to **Main**>**Identity**>**Service Providers** and click **Add**.

3. Enter **pickup-manager** in the **Service Provider Name** text box,
    and click **Register**.

4. In the **Inbound Authentication Configuration** section, click
    **Configure** under the **OAuth/OpenID Connect Configuration** section.
    
5. Enter the following value as the **Callback URL**: `http://localhost.com:8080/pickup-manager/oauth2client`

    !!! Tip
        The callback URL is the service provider URL to which the authorization codes are sent. Upon successful authentication, the browser should be redirected to this URL. 

6. Click **Add**. Note the **OAuth Client Key** and **Client Secret** that is displayed. You will need these values later on when deploying the sample application.

    !!! Tip
        For more information on the advanced configurations
        refer, [Advanced OAuth/OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced).

5.  Click **Update** to save the changes.

----

## Set up the samples

Let's set up and configure the sample applications:

### Pickup Dispatch


1. Download the [pickup-dispatch.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/pickup-dispatch.war) sample.

3.  Extract the `pickup-dispatch.war` file and open the `dispatch.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

4. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![Configurations of Pickup Dispatch application]({{base_path}}/assets/img/fragments/pickup-key-secret.png)

### Pickup Manager

1. Download the [pickup-manager.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/pickup-manager.war) sample.

2. Extract the `pickup-manager.war` file and open the `manager.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

3. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![pickup-key-secret-2]({{base_path}}/assets/img/fragments/pickup-key-secret-2.png)

## Deploy the samples

Next, deploy the sample web apps on a web container.

1.  Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.      
    
    !!! Info
        It is recommended that you use a hostname that is not `localhost` to avoid browser errors. Modify the `/etc/hosts` entry in your machine to reflect this. Note that `wso2is.local` is used in this documentation as an example, but you must modify this when configuring the authenticators or connectors with this sample application.

4.  Next, copy the extracted and modified `pickup-manager` and `pickup-dispatch` folders to the `<TOMCAT_HOME>/webapps` folder.

You are now ready to try out OpenID Connect SSO with the Pickup Dispatch and Pickup Manager sample web applications.

## Try it

Let's try SSO with the two application.

1. Navigate to `http://wso2is.local:8080/pickup-dispatch` on your browser and click **Login**.

    ![Pickup Dispatch login]({{base_path}}/assets/img/samples/dispatch-login.png)

2. You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (admin/admin). Provide the required consent.
You will be redirected to the Pickup Dispatch application home page.

3. Now, if you navigate to `http://wso2is.local:8080/pickup-manager` and click **Login**, you can see that user has been automatically logged in to this application without being prompted for user credentials.

You have successfully configured OpenID Connect single sign-on for two web applications using WSO2 IS as the identity provider.

----

!!! info "Related topics"
    - [Concept: Single Sign-On]({{base_path}}/references/concepts/single-sign-on)
    - [Guide: Manage User Sessions]({{base_path}}/guides/login/session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout]({{base_path}}/guides/login/oidc-backchannel-logout)