# Customize Login Pages

You can customize the layout and branding of user interfaces like the login page, register page, username and password recovery pages, and single sign-on pages.

All UIs are available in the `authenticationendpoint` and `accountrecoveryendpoint` apps located in the `<IS_HOME>/repository/deployment/server/webapps` folder.

## General components of the UI

All pages of WSO2 Identity Server are separated into two general components as shown below. You can reference these components when you write the custom layout using a special notation.
    
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

### Step 2: Create the basic custom layout resources

To create the basic custom layout resources:

1. In the `authenticationendpoint` folder, navigate to the created `extensions` folder and create the folder structure as below. Inside the `layouts` folder, you can create folders for multiple layouts (e.g. `custom`).
    
    ```
    └── extensions
        └── branding
            └── <tenant-domain>
                ├── apps
                │   └── <app-name>
                │       └── layouts
                │           └── custom 
                └── layouts
                    ├── custom
                    └── left-aligned
    ```
    !!! note
    You can apply tenant-wise or application-wise layouts by creating the folders accordingly. Application-wise layouts will override tenant-wise layouts.

2. Navigate to the `webapps/authenticationendpoint/includes/layouts/default` folder, copy the `body.html` file, and add it to the created `custom` folder.

3. Create the following files and folder inside the `custom` folder:
    - `styles.css` file
    - `script.js` file
    - `assets` folder

!!! note
    Repeat the above steps for `accountrecoveryendpoint` as well.

### Step 3: Add the branding-preference.json file

The branding-preference.json file is used to specify which layout should be used. To add this file, follow the guide [Re-brand WSO2 Identity Server UIs](https://github.com/wso2/docs-is/tree/master/en/docs/references/extend/rebranding/rebrand-identity-server-uis.md).
The `activeLayout` property in the branding-preference.json file should be set to the name of the layout to be used (e.g. `custom`) in the tenant or app.

!!! note
    The activated layout will be that which is defined at the level of the active branding preferences file. If no layouts are defined at the level of the active branding preferences file, the default layout will be activated.
    For example, if a branding preferences file is defined at app-level but no layouts are defined at app-level, the default layout will be activated.

The complete folder structure will be as below.

    ```
    └── extensions
        └── branding
            └── <tenant-domain>
                ├── apps
                │   └── <app-name>
                │       ├── layouts
                │       │   └── custom 
                │       └── branding-preference_en_US.json 
                ├── layouts
                │   ├── custom
                │   └── left-aligned
                └── branding-preference_en_US.json
    ```

### Step 4: Add a custom layout design

To add a custom layout to the login page:

1. Navigate to the relevant `custom` folder and follow the instructions provided below:

    1. Copy the code snippet from the [html file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/body.html) into the `body.html` file.
       !!! note
       Make sure to update the html file with the correct source paths to the script and image files.

    2. Copy the code snippet from the [css file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/style.css) into the `styles.css` file.

    3. Copy the code snippet from the [javascript file](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/script.js) into the `script.js` file.

    4. Copy the [illustration.svg](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/illustration.svg) file into the `assets` folder.

2. Build the source code.

    1. Copy the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts/custom` directory and place it into the `<IDENTITY-APPS-HOME>/components/login-portal-layouts/layouts `directory.

    2. Navigate to `<IDENTITY-APPS-HOME>/components/login-portal-layouts` directory and build the source code using `mvn clean install` command (Build should be succeeded for further steps).

    3. Copy `<IDENTITY-APPS-HOME>/components/login-portal-layouts/layouts/custom` folder (Compiled version of the layout source code) and paste it into the relevant directory in <IS_HOME> (e.g. `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/branding/carbon.super/layouts`).

3. Refresh the browser and check out the added custom layout.

    !!! tip
        In certain cases, the server might stop working after adding changes. In such cases, restart the server to check the changes.

## Best Practices

Use the following **best practices** when creating a custom layout:

- Add a prefix for the new CSS classes so that the newly added classes will not conflict with existing classes.

- Set `cache="false"` when developing a custom layout. Be sure to remove the `cache="false"` in production code.