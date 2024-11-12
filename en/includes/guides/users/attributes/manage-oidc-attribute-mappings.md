# Manage OpenID Connect attribute mappings

You can map OpenID Connect attributes to default attributes in the organization. This allows applications that implement OpenID Connect login to receive user information in the ID token.

## View OpenID Connect attributes
To view the OpenID Connect attributes available for your organization:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes** > **Manage Attribute Mappings**.
2. Click **OpenID Connect**.

   ![View OpenID Connect attributes]({{base_path}}/assets/img/guides/organization/attributes/attribute-mappings/view-oidc-attributes.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

You can find the mapped OpenID Connect attributes.

## Add an OpenID Connect attribute
{{ product_name }} supports some OpenID Connect attributes by default. You can add new OpenID Connect attributes as follows:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes** > **Manage Attribute Mappings**.
2. Click **OpenID Connect** > **New Attribute**.
3. Enter values for the following properties:

    ![Add OpenID Connect attributes]({{base_path}}/assets/img/guides/organization/attributes/attribute-mappings/add-oidc-attribute-mapping.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
          <tbody>
            <tr>
                <td>**OpenID Connect Attribute**</td>
                <td>The OpenID Connect attribute name that will be shared with applications in the ID token and userinfo responses.</td>
             </tr>
             <tr>
                <td>**User attribute to map to**</td>
                <td>Select the default attribute that should be mapped to the new OIDC attribute.</td>
             </tr>
          </tbody>
       </table>

5. Click **Save**.

For example, shown below is an OpenID Connect attribute mapped to a user attribute in {{ product_name }}:
<table>
     <thead>
           <tr>
              <th>**OpenID Connect Attribute**</th>
              <th>**User attribute to map to**</th>
           </tr>
     </thead>
     <tbody>
     <tr>
       <td><b>`email_home`</b></td>
       <td>`http://wso2.org/claims/emails.home` </td>
     </tr>
     </tbody>
</table>

You need to enable `email_home` as a [requested attribute]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#select-user-attributes) for your application and also add it to an OIDC scope. You can then configure your application to receive this user information when a user signs in.

After user authentication, you can find the `email_home` claim in the ID token, as shown below.

``` 
{
  "isk": "69b37037a2349763dc48e2a30a62c3feebf0b5823cf869e149352737ddc0ca63",
  "at_hash": "7qgloEmkz3kGBTtH7RI4qw",
  "sub": "user@sample.com",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "{{iss_path}}",
  "given_name": "alice",
  "sid": "5580be2b-a12d-43a4-823a-9d1352b88269",
  "aud": "UEP40cZTZfxJfGdDWFmTrwqluxoa",
  "c_hash": "VlKxb3UhuYtFEG_VftAa0g",
  "nbf": 1625557031,
  "azp": "UEP40cZTZfxJfGdDWFmTrwqluxoa",
  "nickname": "nick",
  "exp": 1625560631,
  "iat": 1625557031,
  "family_name": "john"
  "email_home": "john_home@gmail.com"
}
```

## Delete an OpenID Connect attribute
To delete the OpenID Connect attributes available in your organization:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Under **Manage Attribute Mappings**, click **OpenID Connect**.
3. Select the attribute you wish to delete.
3. Click **Delete** and select the checkbox to confirm your action.
4. Click **Confirm**.

!!! note
    
    Only custom attributes can be deleted.
