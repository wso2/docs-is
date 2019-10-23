# Logging in to SimpleSAMLphp using Identity Server

This section explains how to configure the WSO2 Identity Server with
SimpleSAMLphp as a service provider. Initially, it is necessary to setup
SimpleSAMLphp as a service provider. The steps below are tested with
Ubuntu.

### **Scenario**

![configuring-simple-saml-php](../assets/img/tutorials/configuring-simple-saml-php.png)

1.  A user tries to access a protected resource
2.  SimpleSAMLphp checks the authorization for the resource
3.  If the user is not authenticated, sends a SAML2 authentication
    request to the Identity server via the user agent
4.  Identity server authenticates the user and sends the authentication
    response back via the user agent
5.  SimpleSAMLphp validate the authenticate response and authorize the
    access to the protected resource
6.  User receives the protected resource

### **To setup SimpleSAMLphp as a service provider**

1.  Install Apache.

    ``` java
    # apt-get install apache2 
    ```

2.  Install PHP and related extensions.

    ``` java
    # apt-get install php5  
        
    # apt-get install php5-cli  
        
    # apt-get install php5-common  
        
    # apt-get install php5-curl  
        
    # apt-get install php-pear  
        
    # apt-get install php5-mcrypt 
    ```

    !!! info 
		For Ubuntu users, please install the following extension as well:
		`            # apt-get install php5-json           `

3.  Install SimpleSAMLphp using the following commands.

    ``` java
    # sudo mkdir /var/simplesamlphp/

    # cd /var/simplesamlphp/  
        
    # wget https://github.com/simplesamlphp/simplesamlphp/releases/download/simplesamlphp-1.11.0/simplesamlphp-1.11.0.tar.gz  
        
    # tar xvf simplesamlphp-1.11.0.tar.gz  
        
    # mv simplesamlphp-1.11.0 simplesamlphp  
        
    # cd simplesamlphp  
        
    # cp -r metadata-templates/*.php metadata/  
        
    # cp -r config-templates/*.php config 
    ```

4.  Configure SimpleSAMLphp web in Apache.

    ``` java
    # cd /var/www/html
        
    # ln -s /var/simplesamlphp/simplesamlphp/www simplesaml 
    ```

5.  Start Apache.

    ``` java
    # apachectl start  
    ```

6.  Access the SimpleSAMLphp web app from the following location:
    [http://localhost/simplesaml](http://localhost/simplesaml).
7.  Set the SimpleSAMLphp administrator login configuration as follows:

    ``` java
    # cd /var/simplesamlphp/simplesamlphp  
        
    # vi config/config.php  
    ```

    1.  Now look for ' **auth.adminpassword** ' and change its value
        from the default and save the file.
    2.  Click on ' **Login as administrator** ' from the web page
        `                         http://localhost/simplesaml                       `
        to test the configured value.

8.  Add a Service Provider to SimpleSAMLphp.

    ``` java
    # cd /var/simplesamlphp/simplesamlphp  
        
    # vi config/authsources.php 
    ```

    1.  Add the following section to the file and save.

        ``` java
        'wso2-sp' => array(  
            
        'saml:SP',  
            
        // The entity ID of this SP.  
            
        // Can be NULL/unset, in which case an entity ID is generated based on the metadata URL.  
            
        'entityID' => 'simplesaml',  
            
        // The entity ID of the IdP this should SP should contact.  
            
        // Can be NULL/unset, in which case the user will be shown a list of available IdPs.  
            
        'idp' => 'https://localhost:9443/samlsso',  
            
        // The URL to the discovery service.  
            
        // Can be NULL/unset, in which case a builtin discovery service will be used.  
            
        'discoURL' => NULL,  
            
        ),
        ```

        Here we assume WSO2 IS is running in localhost on 9443.

9.  Add the Identity Provider metadata.

    ``` java
    # cd /var/simplesamlphp/simplesamlphp  
        
    # vi metadata/saml20-idp-remote.php 
    ```

    1.  Add the following section to the file and save.

        ``` java
        $metadata['https://localhost:9443/samlsso'] = array(  
            
            'name' => array(  
            
            'en' =>  'WSO2 IS',  
            
            'no' =>  'WSO2 IS',  
            
        ),  
            
            'description'   =>  'Login with WSO2 IS SAML2 IdP.',  
            
            'SingleSignOnService'  =>  'https://localhost:9443/samlsso',  
            
            'SingleLogoutService'  => 'https://localhost:9443/samlsso',  
            
            'certFingerprint'      => '6bf8e136eb36d4a56ea05c7ae4b9a45b63bf975d'  
            
        );
        ```

    2.  Note that metadata \['
        `                           https://localhost:9443/samlsso                         `
        '\] should match the value of 'idp' in step 8.

    3.  Note that "6bf8e136eb36d4a56ea05c7ae4b9a45b63bf975d" is the
        thumbprint of the default certificate ships with WSO2 IS. SAML2
        Response is signed with this certificate.

10. Install WSO2 Identity Server. The WSO2 Identity Server is available
    for download [here](http://wso2.com/products/identity-server).
11. [Start WSO2 Identity
    Server](../../setup/running-the-product) and
    add a Service Provider under SAML SSO.

    -	**Issuer**:simplesaml

    -	**Assertion Consumer URL**:
    	http://localhost/simplesaml/module.php/saml/sp/saml2-acs.php/wso2-sp

    -	**Enable Single Logout**: True

    -	**SLO Response URL**:
    	http://localhost/simplesamlphp/www/module.php/saml/sp/saml2-logout.php/wso2-sp

    Keep the defaults for the rest.

12. In the **Main** menu of the [management
    console](../../setup/getting-started-with-the-management-console)
    , click **Resident** under **Identity Providers**.

13. On the page that appears, open the **SAML2 Web SSO Configuration**
    section under **Inbound Authentication Configuration**.
    
14. The ID value of the identity provider should be the SAML endpoint of
    the Identity Server:
    `          https://{yourhost}:{port}/samlsso         `

### Test SimpleSAMLphp

1.  Go to <http://localhost/simplesaml> and then to " **Authentication**
    " and click on " **Test configured authentication sources** "
2.  Pick " **wso2-sp** ". You are redirected to WSO2 IS SAML2 IdP for
    login.

For more information on SimpleSAMLphp, click
<https://simplesamlphp.org/docs/stable/>
