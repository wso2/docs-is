# Start impersonation via console

When you start impersonsation from **Console**, you will get authorized into the **My Account** application as the impersonated user. To start impersonation via different business application, otherthan **My Account** you can refer [this guide]({{base_path}}/guides/authorization/user-impersonation/via-business-application).

Once succeful you can get SSO'd into any other [impersonation authorized applications](#step-3-configure-business-application-to-perform-impersonation) as the impersonated user.

## Prerequisits

To perform impersonation via the console application complete below requirements.

1. Have same login flow for both **My Account** and **Console** application login flows. 
2. Enable **My Account** Application, if not enabled.

If any of the given requirements remain unsatisfied, impersonation through the Console application can not proceed. In such cases, follow this guide to configure a business application to start impersonation.
Once you complete given steps, continue with the below guide.

## Step 1: Prepare the Impersonating Actor

1. Log into the Console.
2. Go to the **Roles** page.
3. Select the **Impersonator** application role with **My Account** as the audience.
4. Under the **Users** tab, assign the **Impersonator** role to the user.
5. Grant **Administrator** privileges to the selected user by [following this guide]({{base_path}}/guides/users/manage-administrators/#assign-admin-privileges-to-users).

## Step 2: Perform Impersonation

1. Log into the **Console** using the impersonating user’s credentials.
```
https://{{console_base_path}}/t/{organization_name}
```
2. Go to the **Users** list and select the user you want to impersonate.
3. Scroll to the bottom and click on the **Impersonate User** button.

    ![User Impersonate Button]({{base_path}}/assets/img/guides/authorization/impersonation/user-impersonate-button.png)

4. You should see logged into the **My Account** application as the impersonated user.

    ![Discoverable Applications]({{base_path}}/assets/img/guides/authorization/impersonation/impersonated-myaccount-no-applications.png)

After impersonation done via the Console, you can now SSO into any Business Application allowed for impersonation and where the impersonating user has the required application role with impersonation permissions.

## Step 3: Configure business application to perform impersonation

### Register user impersonation api resource

By registering the user impersonation API resource, you enable the application to use for impersonation.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application and go to its **API Authorization** tab.
3. Click **Authorize an API Resource** and do the following:
    1. Under **API Resource**, select **User Impersonation**.
    2. Under **Authorized Scopes**, select **User Impersonation Scope**.
    3. Click **Finish**.

![Authorize impersonation API]({{base_path}}/assets/img/guides/authorization/impersonation/api-authorization-impersonation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Create impersonator application role

Create a role with impersonation permissions.

1. Switch to the **Roles** tab of the application.
2. Under **Role Audience**, select **Application**.
3. Click **New Role** and do the following:
    1. Provide a suitable role name (**Impersonator**).
    2. Under **API Resource**, select **User Impersonation**.
    3. Select the checkbox corresponding to **User Impersonation** to select its scopes.
    4. Click **Create**.

![Role-Creation]({{base_path}}/assets/img/guides/authorization/impersonation/role-creation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Assign impersonating actor to the impersonator role

1. Select the **Impersonator** role with your Business Application as the audience.
    (The role you created while registering the API resource.)
2. Under the **Users** tab, assign the impersonating user.
3. Verify the users also have administrator privileges as required.

### Skip consent screens (optional)

Since the user pre-approved to impersonate another user, you can bypass the consent prompts during both login and logout processes. If you have already deactivated this feature and want to activate it:

1. Switch to the **Advanced** tab of the application.
2. Check **Skip login consent** and **Skip logout consent**.
3. Click **Update** to save the changes.

#### Step 4: Make business application discoverable (optional)

Make the impersonatable applications [discoverable]({{base_path}}/guides/user-self-service/discover-applications/), so that the impersonator can access the application via the **My Account** Applications menu.

#### Step 5: Perform impersonation on a business application

1. Log into the **Console** using the impersonating user’s credentials.
```
https://{{console_base_path}}/t/{organization_name}
```
2. Go to the **Users** list and select the user you want to impersonate.
3. Scroll to the bottom and click on the **Impersonate User** button.

![User Impersonate Button]({{base_path}}/assets/img/guides/authorization/impersonation/user-impersonate-button.png)

4. You should see the **My Account** application showing a session under the impersonated user.

If you have configured discoverable applications, you will prompted with the following screen.

![Discoverable Applications]({{base_path}}/assets/img/guides/authorization/impersonation/impersonated-myaccount.png)

5. **Click** on the Business Application that uses for impersonation.

Once you log in to the Business Application, you will get an **Impersonated Access Token**.

## Access logs related to user impersonation

To troubleshoot issues and keep track of the actions performed by impersonators, {{product_name}} supports logs for user impersonation. Whenever a resource gets modified using an impersonated access token, an audit log prints with the relevant details of the impersonator.

{% if product_name == "Asgardeo" %}

You may access these logs from the **Logs** section of the {{product_name}} Console.

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

Once the impersonator modifies a resource, a log prints as below:

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

When an impersonated access token issued on behalf of a user, {{product_name}} enables you to send a notification email to the affected user. 
This enhances transparency by keeping the user informed of any actions performed on their behalf.

Follow the steps below to enable or disable email notifications:

1. On the {{product_name}} Console, go to **Login & Registration**.
2. Under **Organization settings**, select **Impersonation**.
3. Toggle the switch on to enable email notifications and off to disable it.

The following is the default email notification sent to the impersonated user upon starting an impersonated session.

![Impersonation-Email-Notification]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-email-notification.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    
    If you wish to customize this email template, you may do so by navigating to **Branding** > **Email Templates**. For more information, refer to the [Customize email templates]({{base_path}}/guides/branding/customize-email-templates/) documentation.
    
## Access Organizations as an Impersonator

If the user also a member of a child [organization]({{base_path}}/guides/organization-management/), the impersonator can exchange the impersonated access token for an organization access token.
This authorizes the impersonator to access child organizations with the same permission level as the impersonated user.

!!! note
    
    The impersonator can only access organizations in which the impersonated user is an invited member. 
    Learn more about [inviting users from the parent organization]({{base_path}}/guides/organization-management/invite-parent-organization-users/).

The following diagram shows the detailed steps involved in receiving an impersonated organization access token.

![Impersonation-sub-org]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-flow-sub-org.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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

The response will look like following:

``` json
{
    "access_token": "eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJ1c2VyX29yZyI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsIm5iZiI6MTcxODY5NTA3MiwiYWN0Ijp7InN1YiI6IjJkOTMxYzlkLTg3NmUtNDZjMC05YWJhLWYzNDUwMTg3OWRmYyJ9LCJhenAiOiJqVmNXNG9MbjFKamIyVDk0SDRndFBWOXo1WTBhIiwib3JnX2lkIjoiMTU1OGViZjYtMTdlMC00MTY1LWI5YzAtYTgxMTdjODc4MDZiIiwic2NvcGUiOiJpbnRlcm5hbF9sb2dpbiBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfdmlldyIsImV4cCI6MTcxODY5ODY3Miwib3JnX25hbWUiOiJTdWJPcmciLCJpYXQiOjE3MTg2OTUwNzIsImp0aSI6IjA2NjcwOGYzLWQyNzYtNDQyMi1iZWZlLTE0Njk3N2RlMDA4ZiJ9.XliLCV0IS-KzYZTriSBpVacg-u4l0tLiRoBwWmjoyZz-9-LbCAf-oAweywpaWM7kwo6EaxCZ1S4Am5K1hh-R9Rp5RP1PouxL407MHd-gRpLU5x8V1c9PmofZgWNrrqWLgvxi-MjI-XRkFqMARf39tfBgqHcsZA8Ixeht8zN16EL4GTeYMWbcIuHPSDKaQ-_ZgOcoL1fim3ELUMc0N7Mtv4QGM8bHjhKUQV-wHrj6CRcx7TmyCcMyW1rqLpyqbnkbiOoUDlz0AvK_TxNVt4qhVsgS-9ZCmLb4fdIWTdsqAiZrM7Cfn1HT16PsGP0YTqz3AI3c_ZqTGuH867E6qxJpzg",
    "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

The impersonated organization access token also includes the act property for detecting impersonation, with `act.sub` containing the impersonator's user ID.
