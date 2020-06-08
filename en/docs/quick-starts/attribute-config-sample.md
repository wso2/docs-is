
# Request attributes using samples

This page guides you through configuring [requested attributes](insertlink) for a web application using OIDC and SAML. 
This is demonstrated using two **sample applications**, **Travelocity** and **Playground2**.

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/request-app-claims"   rel="nofollow noopener">I have my own application</a>

----

## Request atttributes for a SAML application

### Deploy the sample SAML application and configure it in WSO2 Identity Server

{! fragments/travelocity.md !}

### Add custom attribute dialects

1.  Navigate to the **Attributes** tab of the application you registered in the previous step. 

2.  Enable attribute mapping by clicking on the toggle button, **Enable mapping**. 

3.  Click on the edit icon. 

4.  Choose the attributes that you require for this application. For this scenario, we have chosen `Country`, `Username`, and `Email`. 

    ![choose-attibutes](../../assets/img/samples/choose-attributes.png)

5.  Click **Save**. 

6.  Give appropriate names for the application attribute to which the local attributes are to be mapped. 

    ![attribute-mapping-saml](../../assets/img/samples/attribute-mapping-saml.png)

### Set mandatory attributes

To make the attributes configured above appear for the user to fill in or consent to during login, enable **Requested** and **Mandatory** for these attributes.  

![enable-mandate](../../assets/img/samples/enable-mandate.png)

### Set role attribute URI 

In the **Role** section, choose a role attribute from the application attributes listed in the dropdown. 

![role-claim](../../assets/img/samples/role-claim.png)

### Try it out 

1.  Login to the sample application at <http://wso2is.local:8080/travelocity.com/index.jsp> using admin credentials. 

    !!! info 
        The user's consent is required to access the attribute information. Click on **Continue** to agree to let the application access this information. To skip this step, you can navigate to the **Advanced** tab of your application and enable **Skip login consent**.

        ![login-travelocity-mandatory](../../assets/img/samples/login-travelocity-mandatory.png)

2.  The application requests values for attributes which are not already mapped to any user profile information. Enter any suitable value to proceed. 

    ![mandatory-claim](../../assets/img/samples/mandatory-claim.png)

3. You are now successfully logged in to the sample application. 

---

## Request attributes for an OIDC application

### Deploy the sample OIDC application and configure it in WSO2 Identity Server

{! fragments/oauth-playground.md !}

### Add attribute dialects 

1.  Navigate to the **Attributes** tab. 

2.  Click the edit icon. 

3.  Select the required local attributes for this application. For this scenario, we have chosen `address`, `country`, `email`, and `name`. 

    ![choose-attribute-oidc.png](../../assets/img/samples/choose-attribute-oidc.png)

4.  Click **Save**. 

5.  You can select any or all of these attribute as mandatory attirbutes as shown below. 

    ![choose-mandatory-playground](../../assets/img/samples/choose-mandatory-playground.png)

### Set subject attribute URL 

Choose an attribute from the local attributes listed in the **Subject attribute** dropdown. 

![subject-attribute](../../assets/img/samples/subject-attribute.png)

### Try it out

1.  Access the sample application at <http://wso2is.local:8080/playground2/>.  

2.  Obtain the values for **Client ID**, **Client Secret**, and **Callback URL** from the developer portal. This will be found in the **Access** tab of the application you created. 

3.  Enter the **Client ID** and **Callback URL**.

    ![playground-login](../../assets/img/samples/playground-login.png)

4.  Click **Authorize**. 

5.  Give the consent to share your attribute information with the application by clicking on **Continue**. 

    ![consent-playground](../../assets/img/samples/consent-playground.png)

6.  Enter the **client secret** and the **callback url**. 

7.  Click **Get access token**. 

8.  You are now successfully logged in to the sample application. 

    ![playground-sub](../../assets/img/samples/playground-sub.png)