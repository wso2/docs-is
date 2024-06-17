# Customize layouts

You can customize the layout and branding of user interfaces like the login page, registration page, username and password recovery pages, and single sign-on pages.

All UIs are available in the following apps located in the `<IS_HOME>/repository/deployment/server/webapps` folder.

- `authenticationendpoint`
- `accountrecoveryendpoint`
 - `x509certificateauthenticationendpoint`

## General components of the UI

All pages of WSO2 Identity Server are separated into three general components as shown below. You can reference these components when you form the custom layout.

![Login Page]({{base_path}}/assets/img/guides/branding/login-page-labelled.png)

## Layout syntaxes

This section explains the special syntax that you can use to create a custom layout.

- **Condition block**
    
    This is similar to an `IF` block. In the following example, the condition block will activate or deactivate according to the value of the `isPolicyPage` variable.

    ![Condition Block]({{base_path}}/assets/img/guides/branding/condition-block.png){: width="700"}
    
    - If the value of `isPolicyPage` is `true` or any non-empty string, then the content inside the block will be executed.
    - For all other values including `null` and `undefined`, the content of the block will not be executed.

- **Not Condition Block**

    This is similar to an `IF` block but with a NOT condition. 

    ![Not Condition Block]({{base_path}}/assets/img/guides/branding/not-condition-block.png){: width="700"}
    
    
    - If the value of `isPolicyPage` is `false`, an empty string, `null` or `undefined`, the content inside the block will be executed. 
    - For all other values, the content of the block will not be executed.

- **Component Syntax**

    This syntax will be used to indicate the position of the general component in the custom layout code. The component syntaxes will be replaced with actual content at runtime.
    
    ![Component Syntax]({{base_path}}/assets/img/guides/branding/component-syntax.png){: width="700"}


- **Data Syntax**
    
    This syntax can be used to add data to the layout code.

    ![Data Syntax]({{base_path}}/assets/img/guides/branding/data-syntax.png){: width="700"}

     The value stored in the `containerSize` variable will be converted to a string and placed in the corresponding location at runtime. All data syntax values will be sanitized before adding to the layout code.

    !!! info
        All these variables will be provided by `JSP` pages. To get more data from JSP pages, add the data into the `layoutData` map object found in each JSP page.

## Add custom layouts

Follow the steps below to customize the layout for login, registration , username and password recovery, and single sign-on pages.

!!! note
    The `<IS_HOME>/repository/deployment/server/webapps/` directory will be referred to as the `webapps` folder in the following steps.
    
### Step 1: Create the extensions folder

Navigate to `webapps/authenticationendpoint` and create a new folder named `extensions`.

!!! note
    Repeat this step for `accountrecoveryendpoint` and `x509certificateauthenticationendpoint`.

### Step 2: Create the basic custom layout resources

To create the basic custom layout resources:

1. In the `authenticationendpoint` folder, navigate to the created `extensions` folder and create the `layouts`, `custom` and `carbon.super` folders as follows.
    
    ```
    └── extensions
        └── layouts
            └── custom
    ```

3. Navigate to the `webapps/authenticationendpoint/includes/layouts/centered` folder, copy the `body.html` file, and add it to the created `carbon.super` folder.

4. Create the following files and the folder inside the `custom` folder:
    - `styles.css` file
    - `script.js` file
    - `assets` folder

!!! note
    Repeat the above steps for `accountrecoveryendpoint` and `x509certificateauthenticationendpoint`.

### Step 3: Add a custom layout design

To add a custom layout to the login page:

1. Navigate to `webapps/authenticationendpoint/extensions/layouts/custom/` and follow the instructions provided below:

    1. Copy the code snippet from the [html file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/body.html) into the `body.html` file.

    2. Copy the code snippet from the [css file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/style.css) into the `styles.css` file.

    3. Copy the code snippet from the [javascript file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/script.js) into the `script.js` file.

    4. Copy the [illustration.svg](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/illustration.svg) file into the `assets` folder.

2. Navigate to the `webapps/authenticationendpoint/includes` folder and do the following:

    1. Copy content from the [`jsp` file containing the project title](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/project-title-1.jsp) to the `webapps/authenticationendpoint/extensions/product-title.jsp` file of the app.

    2. Copy content from the [`jsp` file containing the project footer](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/product-footer-1.jsp) to the `webapps/authenticationendpoint/extensions/product-footer.jsp` file of the app.


    !!! note
        Repeat the above steps for `accountrecoveryendpoint` and `x509certificateauthenticationendpoint` as well. You will be copying the following files:
        

        - [Project title](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/product-title-2.jsp).

        - [Project footer](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/product-footer-2.jsp)

3. Build the source code.

    1. Copy the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts/custom` directory and place it into the `<IDENTITY-APPS-HOME>/identity-apps-core/components/login-portal-layouts` directory.

    2. Navigate to `<IDENTITY-APPS-HOME>/identity-apps-core/components/login-portal-layouts` directory and build the source code using `mvn clean install` command (Build should be succeeded for further steps).

    3. Copy `<IDENTITY-APPS-HOME>/apps/authentication-portal/src/main/webapp/extensions/layouts/custom` folder (Compiled version of the layout source code) and paste it into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts` directory.

4. Refresh the browser and check out the added custom layout.

    !!! tip
        In certain cases, the server might stop working after adding changes. In such cases, restart the server to check the changes.

The custom layout will be moved to the corresponding locations of `authenticationendpoint`, `accountrecoveryendpoint`, and `x509certificateauthenticationendpoint` apps.

## Best Practices

Use the following best practices when creating a custom layout:

- Add a prefix for the new CSS classes so that the newly added classes will not conflict with existing classes.

- Set `cache="false"` when developing a custom layout. Be sure to remove the `cache="false"` in production code.