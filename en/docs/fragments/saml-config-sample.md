1.	Expand **Inbound Authentication Configuration > SAML Configuration** and click **Configure**.

2.	Enter the following details and keep the values of the rest of the fields as it is. 

	-	**Issuer**:simplesaml

    -	**Assertion Consumer URL**:
    	http://localhost/simplesaml/module.php/saml/sp/saml2-acs.php/wso2-sp

    -	**Enable Single Logout**: True

    -	**SLO Response URL**:
    	http://localhost/simplesamlphp/www/module.php/saml/sp/saml2-logout.php/wso2-sp

3.	Click **Register**



