# Log in to AWS IAM Identity Center using {{ product_name }}

This page guides you through integrating {{ product_name }} for Single Sign-On (SSO) with [AWS IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html){:target="_blank"}. Once configured, users sign in to the AWS access portal with their {{ product_name }} credentials and access the AWS accounts and applications assigned to them.

In this integration, {{ product_name }} acts as the SAML 2.0 identity provider and AWS IAM Identity Center acts as the service provider.

!!! note "Before you begin"
    - You need an AWS account with IAM Identity Center enabled. Refer to the [AWS documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-set-up-for-idc.html){:target="_blank"} for more details.
    - You need administrator permissions to change the identity source of your IAM Identity Center instance.

## Get the SAML application details from AWS

Follow the steps below to obtain the SAML service provider details of IAM Identity Center.

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/){:target="_blank"} and open the **IAM Identity Center** console.

    If IAM Identity Center is not yet enabled in your account, click **Enable**.

    ![Enable IAM Identity Center]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/enable-iam-identity-center.png){: width="700" style="border: 0.3px solid lightgrey;"}

2. Review the instance configuration and click **Enable** to create an organization instance of IAM Identity Center.

    ![Enable an organization instance of IAM Identity Center]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/enable-organization-instance.png){: width="700" style="border: 0.3px solid lightgrey;"}

3. Go to **Settings** and under the **Identity source** tab, click **Actions** > **Change identity source**.

    ![Change identity source in IAM Identity Center]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/change-identity-source.png){: width="700" style="border: 0.3px solid lightgrey;"}

4. Select **External identity provider** and click **Next**.

    ![Select external identity provider]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/select-external-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}

5. Under **Service provider metadata**, click **Download metadata file** to download the SAML service provider metadata.

    ![Download the service provider metadata]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/configure-external-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}

!!! tip
    Keep this browser tab open. You will return to it to upload the {{ product_name }} identity provider metadata.

## Register the application in {{ product_name }}

Follow the steps below to register IAM Identity Center as an application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Traditional Web Application**.

3. Provide a name for the application, for example, `AWS IAM Identity Center`, and select **SAML** as the protocol.

4. Select **File Based** and upload the service provider metadata file you downloaded from AWS.

    ![Register the application using the AWS metadata file]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/register-app-with-metadata.png){: width="700" style="border: 0.3px solid lightgrey;"}

    !!! note
        Alternatively, select **Manual** and enter the following values from the **Service provider metadata** section in AWS. Learn more about [registering a SAML web application]({{base_path}}/guides/applications/register-saml-web-app/).

        - **Issuer** - The **IAM Identity Center issuer URL**.
        - **Assertion consumer service URLs** - The **IAM Identity Center Assertion Consumer Service (ACS) URL**.

5. Click **Create** to complete the registration, and go to the **Protocol** tab of the application.

6. Under **Response Signing**, make sure **Sign SAML responses** is enabled. IAM Identity Center rejects unsigned responses.

7. Click **Update** to save the changes.

8. Go to the **Info** tab of the application and note down the following details. You need them to configure {{ product_name }} as the identity provider in IAM Identity Center.

    - **Issuer** - The identity provider issuer of {{ product_name }}, for example, `{{ issuer_name }}`.
    - **Single Sign-On** - The SAML single sign-on endpoint of {{ product_name }}, for example, `{{ product_url_format }}/samlsso`.
    - **IdP certificate** - Download the identity provider certificate.

    !!! tip
        Alternatively, download the **IdP metadata** file from the **Info** tab. The metadata file contains all of the above details.

### Configure the subject attribute

IAM Identity Center matches the incoming SAML assertion to a user by comparing the `NameID` value with the username of the user in IAM Identity Center. Configure {{ product_name }} to send the user's username as the subject.

1. Go to the **User Attributes** tab of the application.

2. Add **Username** as a user attribute and mark it as **Mandatory**.

3. Under **Subject**, select **Username** as the subject attribute.

4. Click **Update** to save the changes.

!!! warning
    The username sent by {{ product_name }} must exactly match the username of the corresponding user in IAM Identity Center. Otherwise, the login fails even though the user authenticates successfully in {{ product_name }}.

## Configure AWS IAM Identity Center

Follow the steps below to configure {{ product_name }} as the external identity provider of IAM Identity Center.

1. Return to the **Change identity source** page in the IAM Identity Center console.

2. Under **Identity provider metadata**, either upload the **IdP metadata** file you downloaded from {{ product_name }} as the **IdP SAML metadata**, or enter the following values manually using the details you noted from the **Info** tab of the application:

    - **IdP sign-in URL** - The **Single Sign-On** URL.
    - **IdP issuer URL** - The **Issuer**.
    - **IdP certificate** - The IdP certificate you downloaded.

    ![Upload the identity provider metadata]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/configure-external-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}

    !!! note
        IAM Identity Center only accepts the IdP certificate in PEM format. Make sure the certificate file you upload is PEM-encoded, starting with `-----BEGIN CERTIFICATE-----` and ending with `-----END CERTIFICATE-----`.

3. Click **Next**, review the changes, type **ACCEPT**, and click **Change identity source**.

!!! warning
    Changing the identity source affects how existing users, groups, and MFA settings behave in IAM Identity Center. Review the [AWS documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-considerations.html){:target="_blank"} before you change the identity source of an instance in use.

## Provision users to AWS IAM Identity Center

IAM Identity Center only allows users that already exist in its directory to sign in through external federation. You can create users in IAM Identity Center in one of the following ways.

### Option 1: Provision users manually

In the IAM Identity Center console, go to **Users** > **Add user** and create a user whose **Username** matches the username of the user in {{ product_name }}.

### Option 2: Provision users manually using the SCIM2 API

You can create users in IAM Identity Center by directly invoking the SCIM2 API of IAM Identity Center.

1. In the IAM Identity Center console, go to **Settings**. In the **Automatic provisioning** panel, click **Enable**.

2. Copy the **SCIM endpoint** and the **Access token**.

    !!! note
        AWS displays the access token only once. Store it securely, as you need it to authenticate each SCIM request.

3. Send a `POST` request to the `/Users` endpoint of the SCIM endpoint to create the user. Replace `<scim-endpoint>` and `<scim-token>` with the values you copied.

    ```bash
    curl -i -X POST "<scim-endpoint>/Users" \
      -H "Authorization: Bearer <scim-token>" \
      -H "Content-Type: application/scim+json" \
      -d '{
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "userName": "bob@example.com",
        "displayName": "Bob Smith",
        "name": {
          "givenName": "Bob",
          "familyName": "Smith"
        },
        "emails": [
          { "value": "bob@example.com", "type": "work", "primary": true }
        ],
        "active": true
      }'
    ```

    !!! note
        - The `userName` must exactly match the username of the user in {{ product_name }}.
        - IAM Identity Center requires the `userName`, `displayName`, `name.givenName`, and `name.familyName` attributes.

    A successful request returns a `201 Created` response with the details of the created user.

4. In the IAM Identity Center console, go to **Users** and verify that the user is listed.

!!! note
    Once automatic provisioning is enabled, you can no longer create or edit users from the IAM Identity Center console. Use the SCIM2 API or [Option 3](#option-3-provision-users-automatically-with-scim2-outbound-provisioning) to manage users.

### Option 3: Provision users automatically with SCIM2 Outbound provisioning

You can configure {{ product_name }} to automatically provision users and groups to IAM Identity Center using SCIM 2.0.

1. In the IAM Identity Center console, go to **Settings**. In the **Automatic provisioning** panel, click **Enable**.

    ![Enable automatic provisioning in IAM Identity Center]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/enable-automatic-provisioning.png){: width="700" style="border: 0.3px solid lightgrey;"}

2. Copy the **SCIM endpoint** and the **Access token**.

    !!! note
        AWS displays the access token only once. The token expires after one year, after which you need to generate a new token and update it in {{ product_name }}.

3. In {{ product_name }}, [set up outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/setup-outbound-provisioning) and create an outbound provisioning connection. Provide a name for the connection, for example, `IAM Identity Center`, select **SCIM2** as the connection type, and click **Next**.

    ![Create an outbound provisioning connection]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/create-provisioning-connection.png){: width="500" style="border: 0.3px solid lightgrey;"}

4. [Configure the SCIM2 connector]({{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2/) with the following values and click **Finish**.

    - **Authentication Mode** - `Bearer`
    - **Access Token** - The access token you copied from AWS.
    - **User Endpoint** - `<SCIM endpoint>/Users`
    - **Group Endpoint** - `<SCIM endpoint>/Groups`

    ![Configure the SCIM2 connector]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/configure-scim2-connector.png){: width="500" style="border: 0.3px solid lightgrey;"}

5. Add the connection you created as an outbound provisioner, at the organization level or for a specific application, by selecting it as the **Provisioning Connection**. Refer to [set up outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/setup-outbound-provisioning) for details.

    {% if product_name == "WSO2 Identity Server" %}
    ![Add the outbound provisioner]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/add-outbound-provisioner.png){: width="500" style="border: 0.3px solid lightgrey;"}
    {% endif %}

!!! note
    IAM Identity Center requires the first name, last name, and display name of a user to be present in the SCIM request. Make sure that users in {{ product_name }} have values for these attributes. Refer to the [AWS documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/scim-profile-saml.html){:target="_blank"} for the supported SCIM attributes and limitations.

## Assign access in AWS

Once users exist in IAM Identity Center, assign them access to AWS accounts or applications.

1. In the IAM Identity Center console, go to **AWS accounts** under **Multi-account permissions**.

2. Select the AWS account, click **Assign users or groups**, and select the users or groups.

3. Select a permission set and click **Submit**.

Refer to the [AWS documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/assignusers.html){:target="_blank"} for more details.

## Try it out

Now that you have integrated {{ product_name }} with AWS IAM Identity Center, follow the steps below to test it with **AWS access portal**.

1. Create a user in {{ product_name }} and make sure the same user exists in IAM Identity Center with access to at least one AWS account.

2. In the IAM Identity Center console, go to **Settings** and copy the **AWS access portal URL**. It takes the form `https://<id>.awsapps.com/start`.

3. Open the AWS access portal URL in a private browser window. You will be redirected to the {{ product_name }} login screen.

    ![{{ product_name }} login screen]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/login-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

4. Enter the username and password of the user, and complete the login process.

5. Once redirected to the AWS access portal, verify that the assigned AWS accounts are listed.

    ![AWS access portal]({{base_path}}/assets/img/guides/authentication/sso-integrations/aws-iam-identity-center/aws-access-portal.png){: width="700" style="border: 0.3px solid lightgrey;"}
