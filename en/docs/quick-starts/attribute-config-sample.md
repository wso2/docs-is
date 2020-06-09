
# Request attributes using samples

This page guides you through configuring [requested attributes](insertlink) for a web application using OIDC and SAML. 
This is demonstrated using two sample applications, **Travelocity** and **Playground2**.

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../../guides/login/request-app-claims"   rel="nofollow noopener">I have my own application</a>

----

what is all this

## Request attributes for a SAML application

{! fragments/travelocity.md !}

### Add custom attribute dialects

{! fragments/add-custom-attributes-saml.md !}

### Set mandatory attributes

{! fragments/set-mandatory-attributes.md !}

---

## Request attributes for an OIDC application

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
