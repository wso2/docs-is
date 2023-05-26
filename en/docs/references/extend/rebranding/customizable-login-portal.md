# Customize Login Pages

You can customize the layout and branding of user interfaces like the login page, register page, username and password recovery pages, and single sign-on pages.

All UIs are available in the `authenticationendpoint`, `accountrecoveryendpoint`, and `x509certificateauthenticationendpoint` apps located in the `<IS_HOME>/repository/deployment/server/webapps` folder.

## General components of the UI

All pages of WSO2 Identity Server are separated into three general components as shown below. You can reference these components when you write the custom layout using a special notation.
    
- Login page
    ![Login Page]({{base_path}}/assets/img/references/login-page-labelled.png)

- Register page
    ![Register Page]({{base_path}}/assets/img/references/register-page-labelled.png)


## Layout syntaxes

This section includes details about the special syntax that can be used when writing a custom layout code.

- **Condition block**
    
    ![Condition Block]({{base_path}}/assets/img/references/condition-block.png)

    This is similar to an `IF` block. This condition block will activate or deactivate according to the value of the `isPolicyPage` variable.
    
    - If the value of `isPolicyPage` is `true` or any non-empty string, then the content inside the block will be executed.
    - For all other values including null and undefined, the content of the block will not be executed.

- **Not Condition Block**

    ![Not Condition Block]({{base_path}}/assets/img/references/not-condition-block.png)
    
    This is similar to an `IF` block with a NOT condition. 
    
    - If the value of `isPolicyPage` is `false`, an empty string, null or undefined, the content inside the block will be executed. 
    - For all other values, the content of the block will not be executed.

- **Component Syntax**
    
    ![Component Syntax]({{base_path}}/assets/img/references/component-syntax.png)

    This syntax will be used to indicate the position of the general component in the custom layout code. The component syntaxes will be replaced with actual content at runtime.

- **Data Syntax**
    
    ![Data Syntax]({{base_path}}/assets/img/references/data-syntax.png)

    This syntax can be used to add data to the layout code. The value stored in the `containerSize` variable will be converted to a string and placed in the corresponding location at runtime. All data syntax values will be sanitized before adding to the layout code.

!!! info
    All these variables will be provided by `JSP` pages. To get more data from JSP pages, add the data into the `layoutData` map object from each JSP page. This `layoutData` map object can be found on each JSP page.



## Add a custom layout for the authentication/recovery pages

To customize these pages, follow the steps below.

!!! note
    On this page, we will be referring to `<IS_HOME>/repository/deployment/server/webapps/` as the `webapps` folder.
    
### Step 1: Create the extensions folder

Navigate to `webapps/authenticationendpoint` and create a new folder named `extensions`.

!!! note
    Repeat the above step for `accountrecoveryendpoint` and `x509certificateauthenticationendpoint` as well.

### Step 2: Create the basic custom layout resources

To create the basic custom layout resources:

1. In the `authenticationendpoint` folder, navigate to the created `extensions` folder and create the `layouts` and `custom` folders recursively.
    
    ```
    └── extensions
        └── layouts
            └── custom
    ```

3. Navigate to the `webapps/authenticationendpoint/includes/layouts/default` folder, copy the `body.html` file, and add it to the created `custom` folder.

4. Create the following files and folder inside the `custom` folder:
    - `styles.css` file
    - `script.js` file
    - `assets` folder

!!! note
    Repeat the above steps for `accountrecoveryendpoint` and `x509certificateauthenticationendpoint` as well.

### Step 3: Add a custom layout design

To add a custom layout to the login page:

1. Navigate to `webapps/authenticationendpoint/extensions/layouts/custom/` and follow the instructions provided below:

    1. Copy the code snippet from the [html file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/body.html) into the `body.html` file.

    2. Copy the code snippet from the [css file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/style.css) into the `styles.css` file.

    3. Copy the code snippet from the [javascript file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/script.js) into the `script.js` file.

    4. Copy the [illustration.svg](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/illustration.svg) file into the `assets` folder.

2. Navigate to the `webapps/authenticationendpoint/includes` folder and copy the `product-title.jsp` and `product-footer.jsp` files to the `webapps/authenticationendpoint/extensions` folder as follows:

    1. Copy content from the [`jsp` file containing the project title](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/project-title-1.jsp) to the `webapps/authenticationendpoint/extensions/product-title.jsp` file of the app.

    2. Copy content from the [`jsp` file containing the project footer](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/product-footer-1.jsp) to the `webapps/authenticationendpoint/extensions/product-footer.jsp` file of the app.


    !!! note
        Repeat the above steps for `accountrecoveryendpoint` and `x509certificateauthenticationendpoint` as well. You will be copying the following files:
        

        - [Project title](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/product-title-2.jsp).

        - [Project footer](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/product-footer-2.jsp)

3. Refresh the browser and check out the added custom layout.

    !!! tip
        In certain cases, the server might stop working after adding changes. In such cases, restart the server to check the changes.

## Build the app

To build the apps from the `identity-apps` source code:

1. Add the developed custom layout folder into the `<IDENTITY_APPS_SOURCE_CODE>/components/login-portal-layouts/layouts` folder.

2. Build the source code. 

The custom layout will be moved to the corresponding locations of `authenticationendpoint`, `accountrecoveryendpoint`, and `x509certificateauthenticationendpoint` apps.

## Best Practices

Use the following **best practices** when creating a custom layout:

- Add a prefix for the new CSS classes so that the newly added classes will not conflict with existing classes.

- Set `cache="false"` when developing a custom layout. Be sure to remove the `cache="false"` in production code.