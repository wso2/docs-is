# Log in to SimpleSAMLphp using WSO2 Identity Server

This page guides you through using WSO2 Identity Server to log in to SimpleSAMLphp.

-----

## Set up SimpleSAMLphp as a service provider

1.  Install [Apache](https://httpd.apache.org/).

    ``` java
    # apt-get install apache2 
    ```

2.  Install [PHP](https://www.php.net/) and related extensions.

    ``` java
    # apt-get install php5  
        
    # apt-get install php5-cli  
        
    # apt-get install php5-common  
        
    # apt-get install php5-curl  
        
    # apt-get install php-pear  
        
    # apt-get install php5-mcrypt 
    ```

    !!! info 
		If you are an Ubuntu user, install the following extension as well:
		`            # apt-get install php5-json           `

3.  Install [SimpleSAMLphp](https://simplesamlphp.org/) using the following commands.

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

6.  Access the SimpleSAMLphp web app using the following URL:
    [http://localhost/simplesaml](http://localhost/simplesaml).
7.  Set the SimpleSAMLphp administrator login configuration as follows:

    ``` java
    # cd /var/simplesamlphp/simplesamlphp  
        
    # vi config/config.php  
    ```

    1.  Search for ' **auth.adminpassword** ' and change its value
        from the default and save the file.
    2.  Click on ' **Login as administrator** ' from the web page
        `                         http://localhost/simplesaml                       `
        to test the configured value.

8.  Add a service provider to SimpleSAMLphp.

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

        By default, WSO2 IS runs on localhost:9443. If you are using a different hostname or have configured a port offset, adjust the configurations above accordingly.

9.  Add the identity provider metadata.

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
        thumbprint of the default certificate shipped with WSO2 IS. The SAML2
        Response is signed with this certificate.

----

## Configure the service provider in WSO2 IS

{!./includes/register-a-service-provider.md !}

1.	Expand **Inbound Authentication Configuration > SAML Configuration** and click **Configure**.

2.	Enter the following details and keep the values of the rest of the fields as it is. 

	-	**Issuer**:simplesaml

    -	**Assertion Consumer URL**:
    	http://localhost/simplesaml/module.php/saml/sp/saml2-acs.php/wso2-sp

    -	**Enable Single Logout**: True

    -	**SLO Response URL**:
    	http://localhost/simplesamlphp/www/module.php/saml/sp/saml2-logout.php/wso2-sp

3.	Click **Register**

    ![simplesamlphp-sp.png]({{base_path}}/assets/img/fragments/simplesamlphp-sp.png)

## Configure a resident identity provider in WSO2 IS

1.	In the **Main** menu of the Management Console (`https://<IS_HOST>:<PORT>/carbon`), click **Resident** under **Identity Providers**.

2.	On the page that appears, open the **SAML2 Web SSO Configuration** section under **Inbound Authentication Configuration**.
    
3.	Make the value of the **Identity Provider Entity ID** field as same as the SAML endpoint of WSO2 Identity Server: `https://{yourhost}:{port}/samlsso`		
	
	![simeplesamlphp-resident]({{base_path}}/assets/img/fragments/simplesamlphp-resident.png)

### Test SimpleSAMLphp

1.  Access <http://localhost/simplesaml> and then to **Authentication** and click on **Test configured authentication sources**.
2.  Choose " **wso2-sp** ". You are redirected to WSO2 IS SAML2 IdP for
    login.

For more information on SimpleSAMLphp, click <https://simplesamlphp.org/docs/stable/>

----

!!! info "Related topics"
    - [Concept: Identity Federation]({{base_path}}/references/concepts/identity-federation/)
