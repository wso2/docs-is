# Configuring User-Age-Based Adaptive Authentication

This scenario demonstrates user-age-based adaptive authentication in
WSO2 Identity Server using sample authenticators. The instructions below
guide you through specifying authentication steps based on the user's
age. In this example, any user who is underage and below the specified
age limit (i.e., under the age of 18 years) is restricted access and
prevented from logging in to the application.

!!! tip
    
    Before you begin
    
    -   Set up the service provider and sample application for adaptive
        authentication. For instructions on how to do this, see [Configuring
        a Service Provider for Adaptive
        Authentication](configuring-a-service-provider-for-adaptive-authentication.md)
        .
    -   For more information about adaptive authentication with WSO2
        Identity Server, see [Adaptive
        Authentication](adaptive-authentication-overview.md) .
    

### Configuring the sample scenario

1.  Log in to the management console.
2.  Click **List** under **Claims** and click
    [http://wso2.org/claims](https://localhost:9443/carbon/identity-claim-mgt/list-local-claims.jsp)
    .
3.  Click on the **Edit** corresponding to the **BirthDate** claim and
    select the **Supported By Default** checkbox to enable the birth
    date claim.  
    ![](../../assets/img/tutorials/enable-dob-claim.png)
4.  Create a user called "Alex" and edit the user profile. Enter a birth
    date that specifies Alex as under 18 years of age.  

    Enter the birth date in the following format: &lt;yyyy-mm-dd&gt;.

5.  Next, create another user called "Kim" and edit the user profile.
    Enter a birth date that specifies Kim as over 18 years of age.

    Enter the birth date in the following format: &lt;yyyy-mm-dd&gt;.

6.  Navigate to **Service Providers&gt;List** and click **Edit** on
    the saml2-web-app-dispatch.com service provider.
7.  Expand the **Local and Outbound Authentication Configuration**
    section and click **Advanced Configuration** .
8.  C lick on **Templates** on the right side of the **Script Based
    Conditional Authentication** field and then click **User-Age-Based**
    .  
    ![](../../assets/img/tutorials/user-age-based-template.png)
9.  Click **Ok** . The authentication script and authentication steps
    are configured. The authentication script grants access only to
    users who are 18 years or above and restricts underage users.
    Underage users are redirected to an error page.

10. Click **Update** .

### Trying out the sample scenario

1.  Access the following sample PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-dispatch.com>
2.  Click **Login** and enter Kim's credentials. You are successfully
    logged in to the application.  
    ![](../../assets/img/tutorials/pickup-sign-in-kim.png)
3.  Logout and login as Alex. Note that you are now restricted from
    logging in because Alex is underage.  
    ![](../../assets/img/tutorials/age-validation.png)

### What's Next?

The following scenarios demonstrate the use of adaptive authentication
templates and scripts to try out other use cases.

  
