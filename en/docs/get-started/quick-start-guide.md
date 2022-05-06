# What is WSO2 Identity Server? 

Are you new to **WSO2 Identity Server**? Let's get to know what we are all about! 

**WSO2 Identity Server (WSO2 IS)** simplifies the Identity and Access Management (IAM) needs of your organization. The product ensures easy integration with a variety of applications to facilitate single sign-on (SSO), social login, identity federation, API security, strong authentication, account management, privacy compliance, and so much more. 

<iframe width="800" height="250" src="https://www.youtube.com/embed/QUlcGOOdXU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



<!--- 
---

## Workflows

### Problem scenario

After Cameron sets up self registration for Pickup web applications,
Rowan is concerned about the security. Rowan prefers to review and
approve new user accounts before granting access to the Pickup web
applications. Thus, Rowan reaches out to Cameron with these concerns.
Cameron realizes the possibility of creating a workflow using WSO2 Identity Server
and granting role-based authorization, so that each account registration
will be subject to approval.

Let's use the command-line to check out the workflow functionality.

In this workflow, whenever a new user account is created, first it
creates a task for a junior manager (Alex) to approve/reject the account
creation. Upon the junior manager approving the account creation, a task
will be created for the senior manager (Cameron) to approve or reject
the user account.

### Configure a workflow

Follow the steps below to configure a workflow.

!!! tip "Before you begin"
    
    If you have run any other samples in this Quick Start Guide, navigate
    back to the `<IS_SAMPLE_DISTR>/IS-QSG/bin` using the command-line and
    execute either of the following commands to start the Quick Start
    samples.
    
    ``` java
    Linux   -- sudo sh qsg.sh run 
    Windows -- sudo qsg.bat run
    ```

A message appears to pick a scenario.


1.  Enter `6` as the scenario number at the
    command prompt.
      
    ![List of scenarios in QSG](../../assets/img/get-started/qsg-configure-sso.png)

    Note that a message with the user and web application details
    appears.

    ![QSG configure a workflow](../../assets/img/get-started/qsg-configure-a-workflow.png)

2.  Enter `http://localhost.com:8080/pickup-dispatch` on a web browser to access the Pickup Dispatch application.

3.  Click **Login**.
  
    ![Pickup Dispatch application login](../../assets/img/get-started/qsg-sso-dispatch-login.png)

4.  Click **Register Now**.

    ![WSO2 Identity Server sign in page](../../assets/img/get-started/qsg-sso-login-credentials.png)

5.  Enter a `username` for your user
    account and click **Proceed to Self Register**.

    ![QSG self-sign-up username](../../assets/img/get-started/qsg-self-sign-up-username.png)

    !!! note
    
        If you want a user to self register for a specific tenant, provide
        the `username` in the following format: `<USERNAME>@<TENAND_DOMAIN>` .
    

6.  Provide the `user profile details`,
    agree to the **Privacy Policy**, and click **Register**.
      
    ![QSG self sign-up new account](../../assets/img/get-started/qsg-self-sign-up-new-account.png)

    Even though a new user account is created successfully, it is in
    disabled state. To enable the user, you need to sign in to the WSO2
    user portal and approve the pending workflow requests.

7.  Enter the `http://localhost:9443/user-portal` URL on a web browser to access **WSO2 User Portal**.
  
    ![WSO2 Identity Server sign in page](../../assets/img/get-started/qsg-sso-login-credentials.png)

8.  Enter the following credentials to sign in as Alex and click **Sign
    In**.

    ``` java
    Username: alex    | Password: alex123
    ```

9. Click **Operations**.  

10. Click **Show more** under **Pending approvals**.

    ![QSG user-portal tasks](../../assets/img/get-started/qsg-user-portal-tasks.png)

11. Click **Approve** to approve the user account creation.
  
    ![QSG workflow approve task](../../assets/img/get-started/qsg-workflow-approve-task.png)

12. Click **Sign out** to sign out of WSO2 User Portal as Alex.
  
    ![QSG sign out](../../assets/img/get-started/qsg-sign-out.png)

13. Enter the following credentials to sign in as Cameron and click
    **Sign In**.

    ``` java
    Username: cameron    | Password: cameron123
    ```

14. Click **Show more** under **Pending approvals**.

    ![QSG user portal tasks](../../assets/img/get-started/qsg-user-portal-tasks.png)

15. Click **Approve** to approve the user account creation.

    ![QSG workflow-approve-task](../../assets/img/get-started/qsg-workflow-approve-task-2.png)

16. Navigate back to the Pickup Dispatch application and sign in using
    the new user credentials.

    ![WSO2 Identity Server sign in page](../../assets/img/get-started/qsg-sso-login-credentials.png)

    Select the attributes that you wish to share with Pickup Dispatch
    and click **Continue**.

    ![Consent page](../../assets/img/get-started/qsg-sso-consent.png)

    !!! note
        Obtaining the user consent is one of the fundamental requirements of
        GDPR regulation. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent Management](../../references/concepts/consent-management/).
    
    Note that the Pickup Dispatch home screen appears.

    ![Pickup Dispatch home screen](../../assets/img/get-started/qsg-sso-dispatch-home.png)

<!-- !!! info "Related topics"

    -   See the [Quick Starts](../../quick-starts/enable-login/) to try all the use cases with our sample applications. 
    -   See the [Guides](../../guides/login/webapp-oidc/) to integrate your custom applications with WSO2 Identity Server for different scenarios. -->


## Who uses WSO2 Identity Server?

- **Application developers** who build extensive IAM solutions for organizations.

- **Administrators** or **Team leaders** looking for an easy but secure way to onboard and manage users. 

- **Data Protection Officers** who need to implement and monitor a system that adheres to privacy protection regulations across the organization

- **Insight managers** who need precise data on logins, registrations, and user activities to derive business insights. 

---

## Why WSO2 Identity Server?

![IAM functionality](../../assets/img/guides/iam-functionality.png)

- **Unify sign-ins** -  WSO2 IS facilitates single sign-on (SSO) that eliminates the need to maintain multiple credentials for each application making life easier for your users.

- **Give the right access to the right people** - Control access to applications based on permission levels of users or groups.

- **Enforce strong authentication** - WSO2 Identity Server offers multi-factor capabilities such as Email OTP, SMS OTP, FIDO etc. It also enables adaptive authentication which means you can define the level of authentication based on user device, location, and usage context.

- **Empower users to manage their own accounts** - Enable self-registration to applications and let users view, and manage their own profiles.

- **Manage users and their accounts** - Take control of the entire identity lifecycle management of your organization. Provision users to or from trusted identity providers and integrate heterogeneous userstores such as LDAP, Active Directory, and JDBC.

- **Secure ever-growing APIs** - WSO2 Identity Server plays a key role as the authorization server that supports several OAuth related standards or profiles. It supports open standards such as OAuth, OpenID Connect, SAML 2.0, and XACML. It also enables high availability, failover, and performance for a smooth operation. 


- **To safeguard user data and give them control over it** - WSO2 Identity Server enables recording, reviewing, and revoking user consents by adhering to privacy by design principles and industry standards imposed by GDPR and similar privacy laws such as CCPA and LGDP.

---

<!-- ## What is WSO2 CIAM?

WSO2 Customer Identity and Access Management is all about ensuring your customer's convenience, and securing their identity and profile data. 

Smooth registration and access to your application means more engaged and less frustrate customers. This is acheieved in WSO2 CIAM via a multitude of techniques including self registration, single sign-on, and social logins with BYOID. 

This frictionless access is always accompanied by a secure profile management. Privacy and consent are of top priority and includes apt practices for consent management, preference management, profile management, and user pseudonimization or anonymization. 

It also provides a number of extension points to gather data for your business insights by integrating with CRM and marketing tools while ensuring privacy compliance.
 -->