# Configure User Age-Based Adaptive Authentication

This page guides you through configuring user age-based adaptive authentication for a sample web application using sample hardware key and fingerprint authenticators. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/configure-adaptive-auth"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

The instructions below guide you through specifying authentication steps based on the user's age. In this example, any user who is underage and below the specified age limit (i.e., under the age of 18 years) is restricted access and prevented from logging in to the application.

----

{!fragments/adaptive-auth-samples.md!}

----

## Configure claims

1.  Start the server and log in to the [management console](insertlink).

2.  Click **List** under **Claims** and click
    [http://wso2.org/claims](https://localhost:9443/carbon/identity-claim-mgt/list-local-claims.jsp).

3.  Click on the **Edit** corresponding to the **BirthDate** claim.

4.  Select the **Supported By Default** checkbox to enable the birth
    date claim.  

    ![enable dob claim](../assets/img/samples/enable-dob-claim.png)

----

## Add users

1.  Create a user called "Alex" with login permission.

    For instructions, see [Adding Users and Roles](insertlink).

2. Edit Alex's user profile and enter a birth date that specifies Alex as under 18 years of age.  
    For instructions, see [Editing User Profile](insertlink).

    Enter the birth date in the following format: `yyyy-mm-dd`.

3.  Next, create another user called "Kim".

4.  Edit Kim's user profile and enter a birth date that specifies Kim as over 18 years of age.

    Enter the birth date in the following format: `yyy-ymm-dd`.

----

## Configure user age-based authentication

1.  Click **Service Providers>List**.

2.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3.  Expand the **Local and Outbound Configuration** section and click **Advanced Authentication**.

4.  Expand **Script Based Conditional Authentication**.

5.  Click **Templates** on the right side of the **Script Based Conditional Authentication** field and then click **User-Age-Based**. 

    ![user age based template](../assets/img/samples/user-age-based-template.png)

6.  Click **Ok**. The authentication script and authentication steps
    are configured. 
    
    The authentication script grants access only to users who are 18 years or above and restricts underage users.
    Underage users are redirected to an error page.

7.  Click **Update**.

----

## Try it out

1.  Access the following sample PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>

    ![dispatch-login](../assets/img/samples/dispatch-login.png)

2.  Click **Login** and enter Kim's credentials. You are successfully
    logged in to the application.  

3.  Logout and login as Alex. Note that you are now restricted from
    logging in because Alex is underage.  

    ![age validation](../assets/img/samples/age-validation.png)