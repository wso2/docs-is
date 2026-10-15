# Add login with Amazon Cognito

You can connect an Amazon Cognito user pool to your applications using {{ product_name }} and let users log in with their existing Amazon Cognito accounts.

Amazon Cognito user pools act as an OpenID Connect (OIDC) identity provider. {{ product_name }} connects to Amazon Cognito as a standard OIDC identity provider using the authorization code flow.

Follow this guide to register {{ product_name }} in Amazon Cognito and add Amazon Cognito to the login flow of your application.

!!! note
    For detailed instructions on configuring Amazon Cognito, refer to the [Amazon Cognito documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools.html){:target="_blank"}.

## Register {{ product_name }} in Amazon Cognito

You need to register {{ product_name }} as an app client in an Amazon Cognito user pool.

### Create a user pool and an app client

If you already have a user pool, skip to step 4 and create a new app client in the existing user pool.

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/){:target="_blank"} and open the [Amazon Cognito console](https://console.aws.amazon.com/cognito/home){:target="_blank"}.

2. Go to **User pools** and click **Create user pool**.

    ![Create User pools]({{base_path}}/assets/img/guides/idp/aws-cognito/user-pool-initial-creation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Under **Define your application**, select **Traditional web application** as the application type and enter a name for the application.

    ![Create traditional application]({{base_path}}/assets/img/guides/idp/aws-cognito/user-pool-creation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Under **Configure options**, select the sign-in identifiers and the required sign-up attributes for your users. For example, select **Email** as the sign-in identifier.

5. Under **Add a return URL**, enter the following URL. Amazon Cognito redirects users to this URL after they log in.

    ```bash
    {{ product_url_format }}/commonauth
    ```

6. Click **Create user directory** to create the user pool and the app client.

### Get the app client credentials

1. On the Amazon Cognito console, select your user pool.

2. Go to **Applications** > **App clients** and select the app client you created.

    ![View app]({{base_path}}/assets/img/guides/idp/aws-cognito/view-apps.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Under **App client information**, copy **Client ID** and the **Client secret**.

!!! tip "Verify the login pages of the app client"
    Amazon Cognito accepts a login request only if the request matches the login pages configuration of the app client. If the callback URL, grant type, or scopes that {{ product_name }} sends aren't allowed, Amazon Cognito rejects the request with an error such as `redirect_mismatch` or `invalid_scope`, and the user can't log in.

    When you create a **Traditional web application**, Amazon Cognito configures the login pages for you. If you use an existing app client, or if login fails with one of these errors, verify the configuration as follows:

    1. On the app client, go to the **Login pages** tab and click **Edit** under **Managed login pages configuration**.

    2. Make sure the following values are set and click **Save changes**.

        - **Allowed callback URLs**: `{{ product_url_format }}/commonauth`
        - **Identity providers**: **Cognito user pool directory**
        - **OAuth 2.0 grant types**: **Authorization code grant**
        - **OpenID Connect scopes**: **OpenID**, **Email**, and **Profile**

### Get the user pool endpoints

{{ product_name }} needs the OpenID Connect endpoints of your user pool. These endpoints are built from the domain, the region, and the ID of the user pool.

#### Get your domain

1. On the Amazon Cognito console, select your user pool.

2. Go to **Branding** > **Domain** and take note of the **Domain**. If the user pool doesn't have a domain yet, click **Actions** > **Create Cognito domain** and create one.

    The domain takes one of the following formats:

    - Cognito domain: `https://<domain_prefix>.auth.<region>.amazoncognito.com`
    - Custom domain: `https://<your_custom_domain>`

    ![View domain]({{base_path}}/assets/img/guides/idp/aws-cognito/view-domain.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

#### Endpoints

1. On the Amazon Cognito console, go to **Overview** of your user pool and take note of the **User pool ID** and the AWS region of the user pool.

2. Use the domain, the region, and the user pool ID to build the endpoints that {{ product_name }} needs:

    <table>
        <tr>
            <th>Endpoint</th>
            <th>URL</th>
        </tr>
        <tr>
            <td>Authorization endpoint</td>
            <td><code>https://&lt;cognito_domain&gt;/oauth2/authorize</code></td>
        </tr>
        <tr>
            <td>Token endpoint</td>
            <td><code>https://&lt;cognito_domain&gt;/oauth2/token</code></td>
        </tr>
        <tr>
            <td>User info endpoint</td>
            <td><code>https://&lt;cognito_domain&gt;/oauth2/userInfo</code></td>
        </tr>
        <tr>
            <td>JWKS endpoint</td>
            <td><code>https://cognito-idp.&lt;region&gt;.amazonaws.com/&lt;user_pool_id&gt;/.well-known/jwks.json</code></td>
        </tr>
    </table>

    !!! tip
        You can verify these values in the OpenID Connect discovery document of the user pool at `https://cognito-idp.<region>.amazonaws.com/<user_pool_id>/.well-known/openid-configuration`.

### Create a user in the user pool

To try out the login flow, you need a user account in the Amazon Cognito user pool. If the user pool doesn't have a user yet, follow the steps below to create one.

1. On the Amazon Cognito console, select your user pool.

2. Go to **User management** > **Users** and click **Create user**.

3. Enter the following details of the user:

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Invitation message</td>
            <td>Select <b>Don't send an invitation</b> to share the credentials with the user yourself, or <b>Send an email invitation</b> to email the temporary password to the user.</td>
        </tr>
        <tr>
            <td>Email address</td>
            <td>The email address of the user. Select <b>Mark email address as verified</b> so that the user can log in without verifying the email address.</td>
        </tr>
        <tr>
            <td>Temporary password</td>
            <td>Select <b>Set a password</b> and enter a password, or select <b>Generate a password</b> to let Amazon Cognito generate one.</td>
        </tr>
    </table>

    !!! note
        The fields you see depend on the sign-in identifiers and required attributes you selected when creating the user pool. For example, if you selected **Username** as a sign-in identifier, you need to enter a **User name** as well.

4. Click **Create user**.

     ![Create user in Cognito]({{base_path}}/assets/img/guides/idp/aws-cognito/create-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Amazon Cognito creates the user with the **Force change password** status. The user must change the temporary password at the first login.

!!! tip
    Instead of creating users manually, you can let users create their own accounts. To do so, go to **Authentication** > **Sign-up** on your user pool and enable **Self-registration**. Users can then sign up from the Amazon Cognito managed login page.

## Register the Amazon Cognito IdP

Now, let's register Amazon Cognito as a connection in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.

2. Click **Create Connection** and select **Standard-Based IdP**.

3. Enter a unique name for the identity provider, for example, `Amazon Cognito`, select **OpenID Connect**, and click **Next**.

    ![Create OIDC IdP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/aws-cognito/create-connection.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter the following details of Amazon Cognito and click **Next**:

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Client ID</td>
            <td>The client ID of the Amazon Cognito app client.</td>
        </tr>
        <tr>
            <td>Client secret</td>
            <td>The client secret of the Amazon Cognito app client.</td>
        </tr>
        <tr>
            <td>Authorization endpoint URL</td>
            <td><code>https://&lt;cognito_domain&gt;/oauth2/authorize</code></td>
        </tr>
        <tr>
            <td>Token endpoint URL</td>
            <td><code>https://&lt;cognito_domain&gt;/oauth2/token</code></td>
        </tr>
    </table>

    ![Add endpoints in {{ product_name }}]({{base_path}}/assets/img/guides/idp/aws-cognito/create-connection-wizard2.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Select **JWKS endpoint** as the mode of certificate configuration and enter the JWKS endpoint of the user pool.

    ```bash
    https://cognito-idp.<region>.amazonaws.com/<user_pool_id>/.well-known/jwks.json
    ```

    {{ product_name }} uses this endpoint to validate the signature of the ID tokens that Amazon Cognito issues.

6. Click **Finish** to complete the registration.

### Configure the scopes

By default, {{ product_name }} requests only the `openid` scope from the external identity provider. To receive the user's email and profile attributes from Amazon Cognito, add the required scopes.

1. On the created connection, go to the **Settings** tab.

2. Under **Scopes**, add `email` and `profile`.

    !!! note
        The scopes you add here must be enabled under **OpenID Connect scopes** of the Amazon Cognito app client.

3. Optionally, enter `https://cognito-idp.<region>.amazonaws.com/<user_pool_id>/oauth2/userInfo` as the **Userinfo Endpoint URL**.

4. Click **Update** to save your changes.

## Enable Amazon Cognito login

{% include "../../../guides/fragments/add-login/enterprise-login/add-aws-cognito-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, click **Sign in with Amazon Cognito**.

    ![Login with AWS Cognito {{ product_name }}]({{base_path}}/assets/img/guides/idp/aws-cognito/login-with-aws-cognito.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        The label of the login button uses the name you gave the connection.

4. Log in to the Amazon Cognito managed login page using an Amazon Cognito user account. If you don't have a user account yet, see [Create a user in the user pool](#create-a-user-in-the-user-pool).

    !!! note
        If you created the user with a temporary password, Amazon Cognito prompts the user to set a new password at the first login.

     ![User login with {{ product_name }}]({{base_path}}/assets/img/guides/idp/aws-cognito/user-login-to-aws-cognito.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Configure user attributes

Amazon Cognito returns user attributes as standard OpenID Connect claims such as `sub`, `email`, `email_verified`, `given_name`, and `family_name`. The `sub` claim holds a unique identifier that Amazon Cognito generates for the user.

{% include "../../fragments/manage-connection/manage-attributes.md" %}

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login) documentation.
