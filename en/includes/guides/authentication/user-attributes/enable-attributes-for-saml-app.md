# Enable user attributes for SAML apps

{{ product_name }} can share user attributes with applications. The following guide shows how to share user attributes with SAML applications.

## Prerequisite

To get started, you need to have an application registered in {{ product_name }}. If you don't have an app registered, go to {{ product_name }} to [register a SAML application]({{base_path}}/guides/applications/register-saml-web-app/).

## Configure user attributes to share

Follow the steps below to configure the user attributes from the {{ product_name }} Console and share them with the application.

### Select user attributes

You need to first specify the user attributes required for an application. This ensures that when a user logs in, the application can only get access to the user information exposed through these attributes.

To add user attributes to the app:

1. On the {{ product_name }}, go to **Applications**.
2. Select your application, go to the **Protocol** tab and select **Enable attribute profile**.
3. Click **Update** and go to the **User Attributes** tab.
3. Click **Add User Attribute** if you don't have any attributes already added.
   
    ![Add user attributes to a SAML app in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/add-user-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Select the required attributes from the list as shown below.
   
    ![Add user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/select-user-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Save** to return to the **User Attributes** tab and then click **Update**.

### Map user attributes

In the user attribute configurations, you can either choose default attribute names or define application-specific user attribute names.

To configure application-specific attribute names, you need to map the selected user attributes to application-specific user attributes.

To perform mapping:

1. Click **Enable Mapping** in the **User Attributes** section.
2. Change the **Mapped user attribute** for the selected attribute.

    ![Eable mapping]({{base_path}}/assets/img/guides/applications/attributes/saml/enable-mapping.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

This ensures that the application receives attributes based on the name that is configured.

### Define mandatory user attributes

{% include "../../fragments/manage-app/manage-user-attributes/select-mandatory-attributes.md" %}

![Add mandatory user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/saml/add-mandatory-user-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Select the subject attribute

The subject attribute is used for exchanging information about the user. The subject is represented by the **subject** attribute in the SAML assertion.

By default, {{ product_name }} shares **User ID** as the subject. You can define any user attribute as the subject.

To define a different attribute as the subject:

1. [Select it as a user attribute](#select-user-attributes).
2. Go to the **Subject** section under **User Attributes**.
 
    ![Select subject attribute in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/saml/select-sub-attribute.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select an attribute as the subject from the **Subject attribute** list.
4. Click **Update**.

## How it works

Let's see how this flow works in {{ product_name }}.

Once you have configured the user attributes that are required for your application, {{ product_name }} implements the following process when a user tries to log in to your app.

![Provides consent for attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/saml/how-it-works.png){: width="800" style="display: block; margin: 0;"}

### {{ product_name }} checks for mandatory attributes

{{ product_name }} verifies whether the user's profile has values for all the [mandatory attributes](#define-mandatory-user-attributes) that are requested by the application. If there are missing values, {{ product_name }} will prompt the user to enter the missing values.

### Requests user consent

By default, {{ product_name }} requests the user's consent to share the user attributes with the application.

!!! note
      Learn more about [managing user consent]({{base_path}}/guides/authentication/manage-consent-for-attributes/).

### Shares attributes with the app

{{ product_name }} will share these user attributes with an application, given the user has provided consent. User attributes, along with the **subject** attribute, are shared via SAML assertions.

#### Subject attribute

The subject attribute is shared via the `<saml2:Subject>` element based on the [configured subject attribute](#select-the-subject-attribute).

_A sample Subject element found in a SAML assertion is given below:_

```xml 
<saml2:Subject>
   <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">alice@bifrost.com</saml2:NameID>
   <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
         <saml2:SubjectConfirmationData InResponseTo="immfmmacmiaomepphphhlfokfggpffkleokajfbg"
                                 NotOnOrAfter="2021-07-13T06:09:33.594Z"
                                 Recipient="http://localhost:8081/sample-app/home.jsp"
                                 />
   </saml2:SubjectConfirmation>

</saml2:Subject>
```

#### Attribute statement

If the user gives consent to share attributes with the application, {{ product_name }} returns the requested user attributes via the `<saml2:AttributeStatement>` element.

_A sample attribute statement element found in a SAML assertion is given below:_
```xml 
<saml2:AttributeStatement>
        <saml2:Attribute Name="http://wso2.org/claims/country"
                         NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                         >
            <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                  xsi:type="xsd:string"
                                  >Sri Lanka</saml2:AttributeValue>
        </saml2:Attribute>
        <saml2:Attribute Name="http://wso2.org/claims/emailaddress"
                         NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                         >
            <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                  xsi:type="xsd:string"
                                  >alice@bifrost.com</saml2:AttributeValue>
        </saml2:Attribute>
</saml2:AttributeStatement> 
```

#### Attribute statement with attribute mapping

If you have done any custom attribute mapping via the [Enable mapping](#map-user-attributes) setting, the attributes will contain those application-specific names in the SAML assertion.

_A sample attribute statement element with custom attribute mapping is given below:_

```xml 
<saml2:AttributeStatement>
            <saml2:Attribute Name="country"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                             >
                <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xsd:string"
                                      >Sri Lanka</saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="emailaddress"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                             >
                <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xsd:string"
                                      >alice@bifrost.com</saml2:AttributeValue>
            </saml2:Attribute>
</saml2:AttributeStatement>
```