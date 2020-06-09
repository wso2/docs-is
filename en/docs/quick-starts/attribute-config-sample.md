
# Request Attributes

This page guides you through configuring [requested attributes](insertlink) for a web application using OIDC and SAML. 
This is demonstrated using two sample applications, **Travelocity** and **Playground2**.

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../../guides/login/request-app-claims"   rel="nofollow noopener">I have my own application</a>

----

## Request attributes for a SAML application

{! fragments/travelocity.md !}

### Add custom attribute dialects

{! fragments/add-custom-attributes-saml.md !}

### Set mandatory attributes

{! fragments/set-mandatory-attributes.md !}

### Set role attribute URI

{! fragments/set-role-attribute.md !}

### Try it out 

1.  Log in to the sample application at <http://wso2is.local:8080/travelocity.com/index.jsp> using admin credentials. 

    !!! info 
        The user's consent is required to access the attribute information. Click on **Continue** to agree to let the application access this information. To skip this step, you can navigate to the **Advanced** tab of your application and enable **Skip login consent**.

        ![login-travelocity-mandatory](../../assets/img/samples/login-travelocity-mandatory.png)

2.  The application requests values for attributes which are not already mapped to any user profile information. Enter any suitable value to proceed. 

    ![mandatory-claim](../../assets/img/samples/mandatory-claim.png)

3. You are now successfully logged in to the sample application. 

4.  In the landing page of the application, you can see that the values of application attributes that were mapped to the local attributes instead of the local attributes. The application attribute, `Name` contains the value of the application role instead of the username since it was configured as the `role attribute URI`. 

    ![travelocity-app-landing](../../assets/img/samples/travelocity-app-landing.png)

---

## Request attributes for an OIDC application

{! fragments/oauth-playground.md !}

### Add attribute dialects 

{! fragments/attribute-dialects-oidc.md !}

### Set subject attribute URL 

{! fragments/subject-attribute-oidc.md !}

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

8.  You are now successfully logged in to the sample application. You can see the values of the local attributes that were configured. You can also see the field, **Subject Claim URI** as **sub**, which contains the value of the local attribute you configured as the subject attribute URL. 

    ![playground-sub](../../assets/img/samples/playground-sub.png)
