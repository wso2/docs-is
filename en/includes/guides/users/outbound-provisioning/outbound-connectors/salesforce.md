# Configure outbound provisioning with Salesforce

This guide explains how you can configure Salesforce as an outbound connector in {{product_name}}.

## Configure Salesforce for provisioning

Follow the steps below to learn how you can configure Salesforce for provisioning.

1. Sign up to [Salesforce](https://developer.salesforce.com/){:target="_blank"}.

2. Create a connected app.

    1. Click **Setup** on the upper-right corner.

    2. From the left navigation, under **PLATFORM TOOLS**, click **Apps** > **App Manager**.

    3. Click **New Connected App** and enter the following details.

        <table>
            <tr>
                <td>Connected App Name</td>
                <td>Name of the connected app. e.g. <code>IdentityServerProvisioning</code>.</td>
            </tr>
            <tr>
                <td>API Name</td>
                <td>Name used when referring to your app from a program. This should match the name of the connected app. This defaults to a version of the name with spaces replaced with underscores. Only letters, numbers, and underscores are allowed. If the app name contains any other characters, be sure to change them.</td>
            </tr>
            <tr>
            <td>Contact Email</td>
            <td>The email address used by the connected app.</td>
            </tr>
            <tr>
            <td>Enable OAuth Settings</td>
            <td>Select the checkbox to enable. This section controls how your app communicates with Salesforce.</td>
            </tr>
            <tr>
                <td>Callback URL</td>
                <td>The URL a user’s browser is redirected to after successful authentication. Use the following value  here:<code>https://login.salesforce.com/services/oauth2/token</code></td>
            </tr>
            <tr>
                <td>Selected OAuth Scopes</td>
                <td>Scopes refer to the permissions the user gives to the connected app while it is running.
                Choose <strong>Full access (full)</strong> and click <strong>Add</strong>.
                <div class="admonition note">
                    <p class="admonition-title">Important</p>
                    <p>Full access (full) scope, while allows access to the logged-in user’s data and encompasses all other  scopes, does not return a refresh token. You must explicitly request the <code>refresh_token</code> scope to get one.</p>
                </div>
                </td>
            </tr>
            <tr>
                <td>Enable Client Credentials Flow</td>
                <td>Select the checkbox to enable. This allows token generation using the Client Credentials grant. 
                    A security warning will appear — review and accept it to proceed. </br>
                    <div class="admonition note">
                        <p class="admonition-title">Important</p>
                        <p>When enabled, any app with access to the client ID and secret can obtain a token. Keep these credentials secure.</p>
                    </div>
                </td>
            </tr>
        </table>

    4. Click **Save** and then **Continue** to add the connected app.

    5. Select an **Execution User** for the flow.

        1. Under connected app detail page, click **Manage**.
        2. Click **Edit Policies**.
        3. Under **Client Credentials Flow** , for **Run As**, 
        click on the magnifying glass icon, and find the user that you want to assign the client credentials flow. 
        The execution user must have the API Only User permission.
        4. Save your changes.

    6. Take note of the following about the connected app.

        1. Under **Consumer Key and Secret**, click **Manage Consumer Details** and get the,
            - Consumer Key - A value that the client uses to identify itself
        with Salesforce. Referred to as `client_id` in OAuth 2.0.

            - Consumer Secret - A secret that the client uses to establish
        ownership of the consumer key. Referred to as `client_secret` in
        OAuth 2.0.

        2. Callback URL

3. Add your connected app to a profile.

    !!! note
        Allow from 2-10 minutes for your changes to take effect on the
        server before using the connected app.

    1. In the setup page, go to **ADMINISTRATION** > **Users** and click **Profiles**.

    2. Click **Edit** on a profile and under **Connected App Address**, select the checkbox corresponding to the created app.

    3. Click **Save**.

    4. Make a note of the ID of the user profile.

        !!! tip
            While in the profile, copy the URL and decode it to obtain the profile ID.

            e.g. https://computing-force-3514.lightning.force.com/lightning/setup/Profiles/page?address=/**00eGB000003bWuc**/e?ret......

4. Get the public certificate for Salesforce.

    !!! info
        For more information on generating the certificate, see the [Salesforce
        documentation](https://help.salesforce.com/s/articleView?id=sf.security_keys_about.htm&type=5){:target="_blank"}.

    1. In the setup page, go to **SETTINGS** > **Security** and click **Certificate and Key Management**.

    2. For a self-signed certificate, click **Create Self-Signed Certificate**.

    3. Enter the **Label** and a **Unique Name** and click **Save**.

    4. Click the **Download Certificate** button to download the certificate.

## Configure the Salesforce outbound connector

Create an [organization-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) or [IdP-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/idp-level) outbound provisioning and enter the following details to configure the Salesforce outbound connector.

<table>
    <tr>
        <td>API version</td>
        <td>The version of the API you are using in Salesforce.
        <div class="admonition note">
        <p class="admonition-title">How to find my version?</p>
        <ol>
            <li>Log in to Salesforce and go to the setup page</li>
            <li>Go to <b>PLATFORM TOOLS</b> &lt; <b>Integrations</b> and click <b>API</b>.</li>
            <li>Generate any one of the WSDLs and you will be navigated to a page with XML syntaxes.</li>
            <li>On the top it mentions <code>Salesforce.com Enterprise Web Services API Version &gt;VERSION&lt; "</br> <code>Salesforce.com Enterprise Web Services API Version 41.0</code>
        </ol>
        </div>
        </td>
    </tr>
    <tr>
        <td>Domain Name</td>
        <td>Enter the Domain name with an HTTPS suffix so it resembles a URL.
        <div class="admonition note">
        <p class="admonition-title">How to create a domain?</p>
        <ol>
            <li>Log in to Salesforce and go to the setup page</li>
            <li>Go to <b>SETTINGS</b> &gt; <b>Company Settings</b> and click <b>My Domain</b>.</li>
            <li>Under <b>My Domain Details</b>, click <b>Edit</b>.</li>
            <li>Come up with a domain name and check its availability by clicking <b>Check Availability</b>.</li>
            <li>Click <b>Save</b></li>
            <li>Deploy the domain once it's ready.</li>
        </ol>
        </div>
        </td>
    </tr>
    <tr>
        <td>Client ID</td>
        <td>The consumer key obtained when creating the connected app.</td>
    </tr>
    <tr>
        <td>Client Secret</td>
        <td>The consumer secret obtained when creating the connected app.</td>
    </tr>
    <tr>
        <td>Username</td>
        <td>Salesforce username.</td>
    </tr>
    <tr>
        <td>Password</td>
        <td>Enable user password provisioning to a Salesforce domain.</td>
    </tr>
    <tr>
        <td>OAuth2 Token Endpoint</td>
        <td>The Salesforce token endpoint.</td>
    </tr>
    <tr>
        <td>Provisioning Pattern</td>
        <td>{{product_name}} uses this pattern to build the user ID of the provisioned user account. Learn more about <a href="{{base_path}}/guides/users/outbound-provisioning/provisioning-patterns">provisioning patterns</a>.</br>
        e.g. <code>{UD,UN,TD,IDP}</code></td>
    </tr>
    <tr>
        <td>Provisioning Separator </td>
        <td>Used to separate provisioning pattern attributes of the user ID. Learn more about <a href="{{base_path}}/guides/users/outbound-provisioning/provisioning-patterns">provisioning patterns</a></br>
        e.g. <code>-</code>(hyphen).</td>
        </td>
    </tr>
    <tr>
        <td>Provisioning Domain</td>
        <td>The domain in which user provisioning operations occur. 
            This will be appended to the username during outbound provisioning.</br>
            e.g. <code>primary.com</code>
        </td>
    </tr>
</table>

