# Re-branding WSO2 Identity Server UIs

From [WSO2 Identity Server 5.9.0](https://wso2.com/identity-and-access-management/) onwards, a new UI extension has been introduced to easily re-brand  basic user interfaces like the login page, username and password recovery pages, and single sign-on pages.

All these UIs are available in the **`authenticationendpoint`** and **`accountrecoveryendpoint`** web apps that are located in the `<IS-HOME>/repository/deployment/server/webapps` folder. To re-brand these pages, follow the steps below. 


## Step 1: Create the extensions folder

1. Navigate to the `<IS-Home>/repository/deployment/server/webapps/authenticationendpoint` folder and create a new folder called **`extensions`**.

    !!! info
    
        You will be adding the modified JSP files along with the custom CSS files into this new `extensions` folder.
           
2. Similarly, navigate to the `<IS-Home>/repository/deployment/server/webapps/accountrecoveryendpoint` folder and create an `extensions` folder.


## Step 2: Copy the existing header and footer content

To re-brand the header and footer content of the web applications, first copy them over to the newly created `extensions` folders. 

1. To copy the header and footer content of the authenticationendpoint web application:

    1. Navigate to the `<IS-HOME>/repository/deployment/server/webapps/authenticationendpoint/includes` folder.

    2. Copy the `header.jsp` and `footer.jsp` files into the `<IS-Home>/repository/deployment/server/webapps/authenticationendpoint/extensions` folder.
       
        !!! note 
        
            The `header.jsp` and `footer.jsp` files have the capability to override the corresponding files in the `includes` folder.
    

2. Similarly, copy the header and footer content of the **accountrecoveryendpoint** web application.


## Step 3: Create styling

Create the basic CSS styles that are required to override the existing UI styling.

```css tab="Example"  
<style type="text/css">

body {
  background: #1e1e2f;
  color: #ffffff;
}

.logo-container {
  padding: 15px 30px;
}

header .brand img.logo {
  height: 40px;
}

.wr-title {
   background: #32344e !important;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
}

.header {
   border-top: 3px solid #1e8cf8;
   background: #1e1e2f;
   min-height: 70px;
   border-bottom: 1px solid #31314b;
}
.....

a:hover,
a:active {
color: #3a9dff;
}
</style>
```

## Step 4: Edit the existing header and footer content 

Add the `footer.jsp` and `header.jsp` files to the extensions folder as follows:

1.  To edit the header content of the **authenticationendpoint** web application:

    1. Open the `header.jsp` file in the <IS-HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions` folder.

    2. Add the following includes:

       ```
       <%@include file=”../localize.jsp” %>
       <%@include file=”../init-url.jsp” %>
       ``` 

    3. Add the styles that you created in [Step 3](#create-styling) inside the header tag as shown in the [sample file](https://github.com/wso2/samples-is/blob/master/sample-ui-extensions/accountrecoveryendpoint/extensions/header.jsp).

2.  To edit the footer content of the **authenticationendpoint** web application: 

    1. Open the `footer.jsp` file in the <IS-HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions` folder.

    2. Add the company name as shown in the [sample file](https://github.com/wso2/samples-is/blob/master/sample-ui-extensions/accountrecoveryendpoint/extensions/footer.jsp).

      
3. Similarly, you can re-brand the **accountrecovery** web application header and footer.

    !!! note
    
        Make sure to add the following include to the top, when editing the `header.jsp` file of the accountrecovery web application.
    
           ```
           <%@include file=”../localize.jsp” %>
           ```

4. Refresh the browser and check out the modified header and footer content. 

!!! tip

    Restarting the server is NOT required to reflect the changes—browser refresh will display the changes. 

    ![image](https://user-images.githubusercontent.com/9637873/69425601-420ece00-0d51-11ea-9ce6-b38b3382ae86.png)
    <span class="figcaption_hack">Customized Login Page</span>


    ![image](https://user-images.githubusercontent.com/9637873/69425723-7d110180-0d51-11ea-9467-0297f3933823.png)
    <span class="figcaption_hack">Customized Recover Username page</span>

    ![image](https://user-images.githubusercontent.com/9637873/69425759-8b5f1d80-0d51-11ea-8dd0-947b06a93a5e.png)
    <span class="figcaption_hack">Customized Recover Password page</span>


    ![image](https://user-images.githubusercontent.com/9637873/69425805-a6319200-0d51-11ea-860b-9cab9245c3d7.png)
    <span class="figcaption_hack">Customized Self signup page</span>


!!! note  
    One advantage of this approach is that WUM updates will not affect your UI changes and you need not worry about manually adding your changes. 
    