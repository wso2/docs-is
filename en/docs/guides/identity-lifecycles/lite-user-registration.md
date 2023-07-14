# Lite User Registration

Lite user registration lets users register without defining a password. Authentication and user profile creation is initiated merely using the email address. Follow the steps given below to enable and use lite user registration. 

---

## Enable the LiteUserRegistration handler 

Add the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file to enable lite user registration.

```toml
[identity_mgt.events.schemes.liteUserRegistration.properties]
enable = true
```

---

## Enable Lite User Registration 

1.	Sign in to the WSO2 Identity Server [Management Console]({{base_path}}/deploy/get-started/get-started-with-the-management-console).

2.	On the **Main** menu, click **Identity > Identity Providers > Resident**. 
	
	![resident-idp]({{base_path}}/assets/img/guides/resident-idp.png)

3.	Expand **User Onboarding**. 

4.	Expand **Lite User Registration**. 

5.	Select **Lite user registration** to allow users to register without a password. 

6.  Update the **Lite user registration callback URL regex** with a relavant one.

    !!! note
		The recommended **Lite user registration callback URL regex** to use when testing the product is `^https:\/\/localhost:9443\/.*`. However, users should modify it to meet their requirements when they deploy the product.

7. Click **Update**. 

---

## Map local claim attribute 

1.	On the **Main** menu, click **Identity > Claims > List**. 

2.	Select `http://wso2.org/claims`. 

3.	From the list of available claims, select **Lite User** and click **Edit**. 

4.	Change the value of **Mapped Attribute** to `title`. 

	![mapped-attribute-change]({{base_path}}/assets/img/guides/mapped-attribute-change.png)

	!!! note 
		This step needs to be performed since the `isLiteUser` attribute has not been introduced yet in the product. 

---

## Create a Lite User

Execute the following cURL command to create a user using the email address alone. 

!!! note 
	Make sure the user store regex patterns allow email to be used as the user name.

```curl 
curl -X POST -H "Authorization: Basic [Base64encode(Username>:<Password>)]=" -H "Content-Type: application/json" -d '{"email
": "<regsiter_email>","realm": "PRIMARY","preferedChannel":"Email","claims":[], "properties": []}' "https://localhost:9443/api/identity/user/v1.0/lite"
```

This will also trigger an email with a confirmation code. `LiteUserEmailConfirmation` is the email template used. Modifications can be performed on the template if required. `ResendLiteUserEmailConfrimation` is the email template used for resending the code. 

----

## Introspect the code 

Execute the following command to validate the confirmation code. 

```curl 
curl -k -v -X POST -H "Authorization: Basic [Base64encode(Username>:<Password>)]=" -H "Content-Type: application/json" -d '{ "code": "17f00958-a1d7-47b9-8183-be99c08a800f"}' "https://<host>:<port>/api/identity/user/v1.0/introspect-code"
```

Further scenario executions can be implemented to consume this valid confirmation and let the user build the user profile providing a password, create tenants, etc. With lite user registration, minimum resources are consumed until a user proves to have a valid email address.











