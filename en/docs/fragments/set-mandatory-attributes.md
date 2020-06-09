To make the attributes configured above appear for the user to fill in or consent to during login, enable **Requested** and **Mandatory** for these attributes.  

![enable-mandate](../../assets/img/samples/enable-mandate.png)

### Set role attribute URI 

In the **Role** section, choose a role attribute from the application attributes listed in the dropdown. 

![role-claim](../../assets/img/samples/role-claim.png)

### Try it out 

1.  Log in to the sample application at <http://wso2is.local:8080/travelocity.com/index.jsp> using admin credentials. 

    !!! info 
        The user's consent is required to access the attribute information. Click on **Continue** to agree to let the application access this information. To skip this step, you can navigate to the **Advanced** tab of your application and enable **Skip login consent**.

        ![login-travelocity-mandatory](../../assets/img/samples/login-travelocity-mandatory.png)

2.  The application requests values for attributes which are not already mapped to any user profile information. Enter any suitable value to proceed. 

    ![mandatory-claim](../../assets/img/samples/mandatory-claim.png)

3. You are now successfully logged in to the sample application. 
