# Logging into Drupal using the Identity Server

Drupal is an open source content management software distributed under the terms of the [GNU General Public License](http://www.gnu.org/copyleft/gpl.html) (GPL). This topic provides instructions on how to log into Drupal using your WSO2 Identity Server credentials. In this tutorial, Drupal acts as the service provider and WSO2 Identity Server acts as the identity provider.

Let's get started!

!!! tip "Before you begin!"
    - You need to have Drupal installed. Click[ here](https://www.drupal.org/docs/installing-drupal) for more information on installing Drupal.

    - You need to have Composer installed. Click[ here](https://getcomposer.org/) for more information on installing Composer.
    
    - You need to have SimpleSAMLphp Authentication Drupal modules installed. This module helps Drupal to communicate with WSO2 Identity Server. You can install it using the composer by executing the following command.
    
        ```
        composer require drupal/simplesamlphp_auth
        ```
## Configure SimpleSAMLphp as a service provider

1. Navigate to the Web directory on a terminal window and run the following command to create a symlink to the `vendor/simplesamlphp/simplesamlphp/www` folder.

    ```
    ln -s {{base_path}}/vendor/simplesamlphp/simplesamlphp/www simplesaml
    ```
2. Create an `.htaccess file` inside the simplesaml symlink folder and add the following configurations.

    ```markdown
    RewriteCond %{REQUEST_URI} !/core/[^/]*\.php$
    RewriteCond %{REQUEST_URI} !/core/modules/system/tests/https?.php
    RewriteCond %{REQUEST_URI} !/core/modules/statistics/statistics.php$
    RewriteCond %{REQUEST_URI} !/simplesaml/[^/]*\.php$
    RewriteCond %{REQUEST_URI} !/simplesaml/admin/[^/]*\.php$
    RewriteCond %{REQUEST_URI} !/simplesaml/[^/]*\.php/sanitycheck/[^/]*\.php$
    RewriteCond %{REQUEST_URI} !/simplesaml/[^/]*\.php/saml/[^/]*\.php$
    RewriteCond %{REQUEST_URI} !/simplesaml/[^/]*\.php/saml/sp/[^/]*\.php/default-sp$
    RewriteRule "^(.+/.*|autoload)\.php($|/)" - [F]\
    ```
3. Make the following changes to the `<PROJECT_NAME>/vendor/simplephp/simplephp/config/config.php` file.

    !!! info
            If you are unable to find the config folder, create an empty folder and copy all the files from config-templates directory.

    - store.type: **sql**
    - store.sql.dsn: **mysql:host=localhost;dbname=db_name** (change the host & db_name according to your values)
    - store.sql.username: enter the **Drupal database user_name**
    - store.sql.password: enter the **Drupal database password**
    - auth.adminpassword: Change admin password of the simplesaml setup
    - enable.saml20-idp: **true**
    - technicalcontact_name: enter the name of thet echnical person who is running this installation.(optional)
    - technicalcontact_email: enter the email of the technical person who is running this installation.(optional)
    - Add this line to the end of the config.php file 

    ```markdown
    $config['baseurlpath'] = 'http://'. $_SERVER[‘HTTP_HOST’].'/simplesaml/';
    ```

    !!! note "Note!"
            Configure your server to support virtual hosts and point the document root to `<PATH_TO_PROJECT>/www`. Click [here](https://httpd.apache.org/docs/2.4/vhosts/index.html) to see how to configure virtual hosts in the Apache server.

4. Update the `config/authsources.php` file of the service provider by providing the following details under **default-sp**.

    <table>
      <tr>
        <td>Field</td>
        <td>Value</td>
        <td>Description</td>
      </tr>
      <tr>
        <td>EntityID</td>
        <td>SimpleSAML</td>
        <td>Entity ID of the service provider that WSO2 IS is expecting in Human readable format. This field can be NULL/unset, in which case an entity ID is generated based on the metadata URL.</td>
      </tr>
      <tr>
        <td>idp</td>
        <td>https://localhost:9443/samlsso</td>
        <td>Entity ID of the IdP. </td>
      </tr>
    </table>


5. Copy IdP metadata to the `metadata/saml20-idp-remote.php` file of the Service Provider. WSO2 IS’s cert fingerprint should be set as the **certFingerprint** and tenant domain should be set as Idp tenant domain.
    ```markdown
     $metadata['https://localhost:9443/samlsso'] = array(
       'name' => array(
           'en' => 'WSO2 IS',
           'no' => 'WSO2 IS',
       ),
       'description' => 'Login with WSO2 IS SAML2 IdP.',
       'SingleSignOnService'  => 'https://localhost:9443/samlsso?tenantDomain=carbon.super',
       'SingleLogoutService'  => 'https://localhost:9443/samlsso?tenantDomain=carbon.super',
       'certFingerprint'  => '57ff38d97664c792ff8801171f04191ded88778d'
    );
    ```
## Configure WSO2 Identity Server as the identity provider

1. Click on **Identity Providers > Resident** and then expand **SAML2 Web SSO Configuration**.

2. Use `https://localhost:9443/samlsso` as the Identity Provider **Entity Id** and click **Update** to save the configuration.

    <!-- ![resident-idp-config]({{base_path}}/assets/img/tutorials/drupal-is-resident-idp-config.png) -->

3. Click **Service Providers > Add** and enter a unique name as the **Service Provider name** (e.g., "Drupal_SP").

4. Expand **Inbound Authentication Configuration** and then expand **SAML2 Web SSO Configuration**.

5. Enter the value you configured as the **Entity ID** in the the `config/authsources.php` file as the **Issuer**.

6. Enter `http://$host/simplesaml/module.php/saml/sp/metadata.php/default-sp` as the **Assertion Consumer URL**.

7. Enable **Enable IdP Initiated SSO**.

8. Enable **Attribute Profile** and **Include Attributes in the Response Always**.

9. **Click Register** to save the details.

10. Expand **Claim Configuration**. Select **Define Custom Claim Dialect** and add the following Claim URI.

    * Service Provider Claim: Mail
    Local Claim:[https://wso2.com/claims/emailaddress](https://wso2.com/claims/emailaddress)
    Requested Claim: Yes

    * Service Provider Claim: fname
    Local Claim:[https://wso2.org/claims/givenname](https://wso2.org/claims/givenname)
    Requested Claim: Yes

    <!-- ![image alt text]({{base_path}}/assets/img/tutorials/drupal-sp-claim-config.png) -->

11. Click **Update** to save.

## Try SAML 2.0 authentication

1. On a browser window, navigate to: **http://'. $_SERVER[‘HTTP_HOST’] .’/simplesaml/**.

    <!-- ![drupal-simple-saml-welcome-page]({{base_path}}/assets/img/tutorials/drupal-simple-saml-welcome-page.png) -->

2. Click **Authentication > Test configured authentication sources**.

    <!-- ![drupal-simple-saml-default-sp]({{base_path}}/assets/img/tutorials/drupal-simple-saml-default-sp.png) -->

3. Click **default-sp**. You will be redirected to the WSO2 Identity Server authentication page.

4. Login as the newly created user and you will see the User attributes, SAML Subject and Auth Data.

    <!-- ![drupal-simple-saml-login]({{base_path}}/assets/img/tutorials/drupal-simple-saml-login.png) -->

## Configure Drupal

1. Go to the **Drupal** Home page and login as admin.

2. Click on the **Extend** tab and install the following modules.

    * SimpleSAMLphp Authentication

    * External Authentication

3. Click  **Configuration > People > SimpleSAMLphpAuthSettings**.

4. Enable **Activate authentication via SimpleSAMLphp**.

    <!-- ![drupal-sp-enable-simpe-saml-php]({{base_path}}/assets/img/tutorials/drupal-sp-enable-simpe-saml-php.png) -->

5. Enable **User provisioning > Register users** to create or register users using this module.

6. Click **Save configuration**.

7. Click on the **User info and syncing** tab.

8. Enter `Mail` as the **SimpleSAMLphp attribute to be used as a unique identifier for the user**.

9. Enter `fname` as the **SimpleSAMLphp attribute to be used as a username for the user**.

10. Enter `Mail` as the **SimpleSAMLphp attribute to be used as an email address for the user**.

    <!-- ![drupal-sp-config-user-info]({{base_path}}/assets/img/tutorials/drupal-sp-config-user-info.png)-->

11. Click **Save configuration**.

## Try it out

1. [Create a user](https://is.docs.wso2.com/en/latest/learn/adding-users-and-roles/#create-a-user) in WSO2 IS.
    Edit the user profile and update the **First name** and **email address** fields.

2. Login to Drupal as the admin user and create a user with the same email address.

3. Logout of Drupal. You will be redirected to the Drupal Login page.

4. Click **Federated login** You will be directed to the WSO2 Login Page.

    <!-- ![drupal-sp-login]({{base_path}}/assets/img/tutorials/drupal-sp-login.png) -->

    <!-- ![drupal-idp-login]({{base_path}}/assets/img/tutorials/drupal-idp-login.png) -->

5. Provide user credentials of the user you created in step 2 and click **Continue**.

6. Enable **Select All**.

    <!-- ![drupal-idp-consent]({{base_path}}/assets/img/tutorials/drupal-idp-consent.png) -->

7. Click **continue** You will be redirected to the Drupal home page.

    <!-- ![drupal-sp-welcome-page]({{base_path}}/assets/img/tutorials/drupal-sp-welcome-page.png) -->

8. Click **edit** . The user profile attributes configured in WSO2 Identity Server will be populated in the **Personal details** section of your account.

    <!-- ![drupal-sp-populated-user-info]({{base_path}}/assets/img/tutorials/drupal-sp-populated-user-info.png) -->
