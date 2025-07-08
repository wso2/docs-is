# User impersonation via Console

User impersonation lets you perform actions and access resources using another user’s permissions, useful for scenarios like testing and troubleshooting. You can follow this guide and use the My Account portal to start impersonating the user. In this scenario, the impersonator logs into the My Account portal as an impersonated user and Single Sign-On (SSO) into any business application with the impersonated user's permissions.

## Prerequisites

For this method to suit you, your organization should fulfill the following requirements.

- Your organization has [enabled]({{base_path}}/guides/user-self-service/configure-self-service-portal/#enabledisable-the-my-account-portal) the My Account portal.

- Your {{product_name}} Console and My Account portal have the same login flow.

If your organization can't meet the requirements above, you can start [impersonating via a business application]({{base_path}}/guides/authorization/user-impersonation/via-business-application). Keep in mind that this method involves more technical steps than using the Console.

## Step 1: Assign permissions to the impersonator

Follow the steps below to assign the right permissions to the impersonator.

1. The impersonator should have the **Impersonator** role assigned. To do so,

    1. On the {{product_name}} Console, go to **User Management** > **Roles**.

    2. Select the **Impersonator** application role that has **My Account** as its audience.

    3. Go to the **Users** tab and add the user's name under **Assigned Users**.

    4. Click **Update** to save the changes.

2. The impersonator also needs administrator permissions for the Console. If this user doesn't already have them,

    1. On the {{product_name}} Console, go to **Console Settings**.

    2. Under the **Administrators** tab, click **Add Administrators**.

    3. Enter the user's username and assign the **Administrator** role.

    4. Click **Add**.

## Step 2: Impersonate the user

With the required permissions in place, the impersonator can now impersonate another user using the steps below.

1. Log into the {{product_name}} Console with own credentials using the following URL.

    ```text
    {{base_url}}
    ```

2. Go to the **User management** > **Users** and select the user you want to impersonate.

3. Scroll down and click on **Impersonate User**.

    ![User Impersonate Button]({{base_path}}/assets/img/guides/authorization/impersonation/user-impersonate-button.png)

4. Log into **My Account** application as the impersonated user.

    ![Discoverable Applications]({{base_path}}/assets/img/guides/authorization/impersonation/impersonated-myaccount-no-applications.png)

5. The **My Account** portal shows all business applications that the impersonator can access as the impersonated user. Launch any application to log in as that user.

    !!! note "Display applications in the **My Account** portal"

        To make an application discoverable in the **My Account** portal for impersonators, you need to both enable impersonation for the application and mark it as discoverable. See [Configure business applications for impersonation](#configure-business-applications-for-impersonation) for instructions.

## Impersonate users in an organization

Organization administrators also impersonate users within their organization by following these steps:

1. Share **My Account** with the required organization.
2. Assign users with Impersonation Access.

    !!! note "Limitations"
        Organization impersonation doesn't support the following use cases.

        - Invited parent org user impersonating a organization user.
        - Organization user impersonating a invited parent org user.

### Step 1: Share **My Account** with the required organization

1. Login to the root organization on the {{product_name}} Console.

2. Go to Applications and on the top of the page, select the Settings icon corresponding to My Account.

3. Go to its Shared Access tab and do one of the following:
    - Select Share with all organizations for the application to share with all existing organizations and new organizations you may create in the future.

    - Select Share with only selected organizations and select the relevant organizations.

4. Click Update to save the changes.

### Step 2: Assign users with Impersonation Access

Follow the steps below to assign the right permissions to the impersonator.

1. Switch to the organization.

    1. Login to your organization (root) from the **{{product_name}} Console**.

    2. On the {{product_name}} Console, go to Organization Management > Organizations.

    3. Click the Switch icon next to the organization name to switch to its console.

2. The impersonator should have the **Impersonator** role assigned. To do so,

    1. On the {{product_name}} organization Console, go to **User Management** > **Roles**.

    2. Select the **Impersonator** application role that has **My Account** as its audience.

    3. Go to the **Users** tab and add the user's name under **Assigned Users**.

    4. Click **Update** to save the changes.

3. The impersonator also needs administrator permissions for the Console. If this user doesn't already have them,

    1. On the {{product_name}} Console, go to **Console Settings**.

    2. Under the **Administrators** tab, click **Add Administrators**.

    3. Enter the user's username and assign the **Administrator** role.

    4. Click **Add**.

### Step 3: Perform Impersonation

1. Log in to the organization Console using the business user credentials.

2. Go to the Users tab.

3. Locate and select the user to impersonate.

4. Click Impersonate User.

## Configure business applications for impersonation

To let an impersonator access a business application as another user, you need to enable impersonation for that app. This section shows you how to set it up.

### Step 1: Allow application to use the impersonation API

By following the steps below, you permit a business application to use the impersonation API.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application and go to its **API Authorization** tab.

3. Click **allow an API Resource** and do the following:

    1. Under **API Resource**, select **User Impersonation**.

    2. Under **Authorized Scopes**, select **User Impersonation Scope**.

    3. Click **Finish**.

        ![Authorize impersonation API]({{base_path}}/assets/img/guides/authorization/impersonation/api-authorization-impersonation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Enable user impersonation for organization user by registering ***Organization User Impersonation** API resource. (Optional)

        i. Under **API Resource**, select **Organization User Impersonation**.

        ii. Under **Authorized Scopes**, select **User Impersonation Scope for Organizations**.

        iii. Click **Finish**.

            ![Authorize org impersonation API]({{base_path}}/assets/img/guides/authorization/impersonation/org-api-authorization-impersonation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Step 2: Create an application role that permits impersonation

At the beginning of this guide, you assigned the impersonator with the *Impersonator* default permission. This permission's audience is **My Account**, which means that the role only grants permission to the impersonated user's My Account portal.

To access business applications as an impersonated user, you need to create a new role to give the impersonator the right permissions.

To do so,

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Go to the **Roles** tab of the application.

3. Under **Role Audience**, select **Application**. This sets the audience of this role to the current application.

4. Click **New Role** and do the following:

    1. Provide a suitable role name.

    2. Under **API Resource**, select **User Impersonation**. If planning to allow impersonation for organizations, select Organization User Impersonation resource as well.

    3. Select the checkbox corresponding to **User Impersonation** to select its scopes.

    4. Click **Create**.

        ![Role-Creation]({{base_path}}/assets/img/guides/authorization/impersonation/role-creation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Step 3: Assign the role to the impersonator

To assign the role,

1. On the {{product_name}} Console, go to **User Management** > **Roles**.

2. Select the role you just created. The audience of this role is set to your business application.

3. Under the **Users** tab, click **Assign Users** and select the impersonator.

4. Click **Update** to save the changes.

### Step 4: (Optional) Skip consent screens

Since the impersonator is pre-approved to access the application on behalf of another user, you can skip the login and logout consent prompts. To enable this:

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Switch to the **Advanced** tab of the application.

3. Select the **Skip login consent** and **Skip logout consent** checkboxes.

4. Click **Update** to save the changes.

### Step 5: (Optional) Make business application discoverable

When an impersonator logs into the My Account portal as another user, the portal shows all the applications the impersonator is allowed to access as that user. From there, the impersonator can launch any of those applications directly. To display applications like so, they need to be discoverable.

To make an application discoverable,

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Under the **General** tab, check the **Discoverable application** checkbox.

3. Click **Update** to save the changes.

### Step 4: Share Application with Organization(Optional)

To allow impersonating organization users, share the business applications with the relevant organization. Use the [documentation here]({{base_path}}/guides/organization-management/share-applications/#share-a-registered-application) to proceed with configuring.

## Access logs related to user impersonation

To troubleshoot issues and keep track of impersonators' actions, you can use {{product_name}} logs for user impersonation. Whenever a resource gets modified using an impersonated access token, an audit log prints with the relevant details of the impersonator.

{% if product_name == "Asgardeo" %}

You can access these logs from the **Logs** section of the {{product_name}} Console.

![Impersonation-Audit-Log]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-audit-logs.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    Learn more about [audit logs]({{base_path}}/guides/asgardeo-logs/audit-logs/).

{% else %}

=== "Audit log format"

    ```bash
    TID: [-1234] [2024-06-03 14:50:42,298] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} \
    - Initiator={Impersonator_User_Id} \
    Action=resource-modification-via-impersonation \
    Target={Impersonated_User_Id} \
    Data={"ResourcePath":{Resource_Path},"clientId":{Client_Id},"subject":{Impersonated_User_Id},"scope":{Scope Issued for the Impersonated Access token},"impersonator":{Impersonator_Id},"httpMethod":{Http_Method}} \
    Outcome=AUTHORIZED
    ```

=== "Example"

    ```bash
    TID: [-1234] [2024-06-03 14:50:42,298] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} \
    - Initiator=0fa51985-d36d-4492-9ebd-298f9d68861f \
    Action=resource-modification-via-impersonation \
    Target=49de2b73-5f0b-44db-bf75-6fddec4b058e \
    Data={"ResourcePath":"/scim2/Me","clientId":"luoljDTbHYcfx6YWT_7wsYs67rsa","subject":"49de2b73-5f0b-44db-bf75-6fddec4b058e","scope":"internal_login internal_user_mgt_list internal_user_mgt_view","impersonator":"0fa51985-d36d-4492-9ebd-298f9d68861f","httpMethod":"PATCH"} \
    Outcome=AUTHORIZED
    ```

When an impersonator modifies a resource, the system logs the action as follows:

```bash
TID: [-1234] [2024-06-03 14:50:42,976] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} \
- Initiator=49de2b73-5f0b-44db-bf75-6fddec4b058e \
Action=Set-User-Claim-Values \
Target=t******r \
Data={"ServiceProviderName":"POSTMAN_SBA","Claims":{"http://wso2.org/claims/country":"S***n","http://wso2.org/claims/modified":"2*************************Z","profileConfiguration":"d*****t"}} \
Outcome=Success | Impersonator : 0fa51985-d36d-4492-9ebd-298f9d68861f
```

{% endif %}

## Notify users on impersonation

When {{product_name}} issues an impersonated access token on behalf of a user, it can send a notification email to that user. This keeps the user informed of actions taken on their behalf, improving transparency.

Follow the steps below to enable or disable email notifications:

1. On the {{product_name}} Console, go to **Login & Registration**.
2. Under **Organization settings**, select **Impersonation**.
3. Toggle the switch on to enable email notifications and off to disable it.

The following is the default email notification sent to the impersonated user upon starting an impersonated session.

![Impersonation-Email-Notification]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-email-notification.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    If you wish to customize this email template, you may do so by navigating to **Branding** > **Email Templates**. For more information, refer to the [Customize email templates]({{base_path}}/guides/branding/customize-email-templates/) documentation.
    
## Access Organizations as an Impersonator

If the user also a member of a child [organization]({{base_path}}/guides/organization-management/), the impersonator can exchange the impersonated access token to an organization access token. This authorizes the impersonator to access child organizations with the same permission level as the impersonated user.

!!! note

    The impersonator can only access organizations where the impersonated user is an invited member. Learn more about [inviting users from the parent organization]({{base_path}}/guides/organization-management/invite-parent-organization-users/).

The following diagram shows the detailed steps involved in receiving an impersonated organization access token.

![Impersonation-sub-org]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-flow-sub-org.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

To access organizations as an impersonator, you need to switch your impersonated access token using the [organization switch grant]({{base_path}}/references/grant-types/#organization-switch-grant) as follows.

!!! tip "Get the impersonated access token"

    When you SSO into a business application from the impersonated user's My Account portal, the token that the application receives works as the impersonated access token.

=== "Request Format"

    ```bash
    curl --location 'https://{{base_url}}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
    --data-urlencode 'client_id={Client_Id}' \
    --data-urlencode 'grant_type=organization_switch' \
    --data-urlencode 'scope={Organization API Scopes}' \
    --data-urlencode 'switching_organization={Organization_Id}' \
    --data-urlencode 'token={Impersonated Access Token}'
    ```

=== "Example"

    ```bash
    curl --location 'https://{{base_url_sample}}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic QVVhZkoyeWpXM2dUR3JZaWZCTlF1MTBXRWtNYToybWN1blJ1T1Y5WFQ3QXpzRDEyVmY3cGhOVWJRUmdlT0NtZW5Wa0xKQTR3YQ==' \
    --data-urlencode 'client_id=AUafJ2yjW3gTGrYifBNQu10WEkMb' \
    --data-urlencode 'grant_type=organization_switch' \
    --data-urlencode 'scope=internal_login internal_org_user_mgt_view internal_org_user_mgt_list' \
    --data-urlencode 'switching_organization=2fb64b16-94ee-4727-a542-5db7af91ef06' \
    --data-urlencode 'token=eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJuYmYiOjE3MTg2OTUwNTIsImFjdCI6eyJzdWIiOiIyZDkzMWM5ZC04NzZlLTQ2YzAtOWFiYS1mMzQ1MDE4NzlkZmMifSwiYXpwIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsIm9yZ19pZCI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsInNjb3BlIjoiaW50ZXJuYWxfbG9naW4gaW50ZXJuYWxfb3JnX3VzZXJfbWd0X2xpc3QgaW50ZXJuYWxfb3JnX3VzZXJfbWd0X3ZpZXcgaW50ZXJuYWxfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF91c2VyX21ndF92aWV3IG9wZW5pZCIsImV4cCI6MTcxODY5ODY1Miwib3JnX25hbWUiOiJTdXBlciIsImlhdCI6MTcxODY5NTA1MiwianRpIjoiMDcyOGQ1MTctNzk2OC00NzRmLWJkN2QtMTI1MzdjY2JlNDM2In0.FqavHBDNLo-nMMgJ3OTDswo7pl6zMztpUkm-cgBOgDJPek_FAEQzt4DFxGglnf2-AtnRN14wPOv9_M_DYJWH529hbwYBVrQQDlJmcF1WtWX_MnBgBGsIfA5_3nzocZWBqj5KDjbXS3_3CSexQ9_h3tKWCDX1oit03flcs7E_xG_nkWV1TUPFUAaoHrMWTROIttN1iFqwRjeg6Bkqjx8hHM3Dn7E9Zsmby0EhuC7i41kid2s9F_5XPPMCYM0gyxX5lAjsf6UFth9v3SWIuMLFgiq5Eh6u4pCs9srh2A5t0DIcKMwyXTEm-QVIhGi1zkB-wGV6yYD9TwbiujnrqOyFQA'
    ```

The response looks like the following:

``` json
{
    "access_token": "eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJ1c2VyX29yZyI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsIm5iZiI6MTcxODY5NTA3MiwiYWN0Ijp7InN1YiI6IjJkOTMxYzlkLTg3NmUtNDZjMC05YWJhLWYzNDUwMTg3OWRmYyJ9LCJhenAiOiJqVmNXNG9MbjFKamIyVDk0SDRndFBWOXo1WTBhIiwib3JnX2lkIjoiMTU1OGViZjYtMTdlMC00MTY1LWI5YzAtYTgxMTdjODc4MDZiIiwic2NvcGUiOiJpbnRlcm5hbF9sb2dpbiBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfdmlldyIsImV4cCI6MTcxODY5ODY3Miwib3JnX25hbWUiOiJTdWJPcmciLCJpYXQiOjE3MTg2OTUwNzIsImp0aSI6IjA2NjcwOGYzLWQyNzYtNDQyMi1iZWZlLTE0Njk3N2RlMDA4ZiJ9.XliLCV0IS-KzYZTriSBpVacg-u4l0tLiRoBwWmjoyZz-9-LbCAf-oAweywpaWM7kwo6EaxCZ1S4Am5K1hh-R9Rp5RP1PouxL407MHd-gRpLU5x8V1c9PmofZgWNrrqWLgvxi-MjI-XRkFqMARf39tfBgqHcsZA8Ixeht8zN16EL4GTeYMWbcIuHPSDKaQ-_ZgOcoL1fim3ELUMc0N7Mtv4QGM8bHjhKUQV-wHrj6CRcx7TmyCcMyW1rqLpyqbnkbiOoUDlz0AvK_TxNVt4qhVsgS-9ZCmLb4fdIWTdsqAiZrM7Cfn1HT16PsGP0YTqz3AI3c_ZqTGuH867E6qxJpzg",
    "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

The impersonator can use the new access token to access any child organization the impersonated user can access.
