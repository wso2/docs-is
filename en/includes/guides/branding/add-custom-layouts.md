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

    ```html hl_lines="1 17"
    {% raw %}
    {{#isPolicyPage}}
    <main class="policy-page">
        <div class="ui borderless top fixed app-header menu" id="app-header">
            <div class="ui container">
                <div class="header item product-logo">
                    {{{ProductHeader}}}
                </div>
            </div>
        </div>
        <div class="app-content policy-page-content" style="padding-top: 62px;">
            <div class="ui container">
                {{{MainSection}}}
            </div>
        </div>
    </main>
    {{{ProductFooter}}}
    {{/isPolicyPage}}
    {% endraw %}
    ```
    
    - If the value of `isPolicyPage` is `true` or any non-empty string, then the content inside the block will be executed.
    - For all other values including `null` and `undefined`, the content of the block will not be executed.

- **Not Condition Block**

    This is similar to an `IF` block but with a NOT condition. 

    ```html hl_lines="1 12"
    {% raw %}
    {{^isPolicyPage}}
    <div class="page-wrapper layout-file {{#isErrorResponse}}error-page{{/isErrorResponse}}
        {{#isSuccessResponse}}success-page{{/isSuccessResponse}}">
        <main class="center-segment">
            <div class="ui container medium center aligned middle">
                {{{ProductHeader}}}
                {{{MainSection}}}
            </div>
            {{{ProductFooter}}}
        </main>
    </div>
    {{/isPolicyPage}}
    {% endraw %}
    
    ```
    
    - If the value of `isPolicyPage` is `false`, an empty string, `null` or `undefined`, the content inside the block will be executed. 
    - For all other values, the content of the block will not be executed.

- **Component Syntax**

    This syntax will be used to indicate the position of the general component in the custom layout code. The component syntaxes will be replaced with actual content at runtime.
    
    ```html hl_lines="6 7 9"
    {% raw %}
    {{^isPolicyPage}}
    <div class="page-wrapper layout-file {{#isErrorResponse}}error-page{{/isErrorResponse}}
        {{#isSuccessResponse}}success-page{{/isSuccessResponse}}">
        <main class="center-segment">
            <div class="ui container medium center aligned middle">
                {{{ProductHeader}}}
                {{{MainSection}}}
            </div>
            {{{ProductFooter}}}
        </main>
    </div>
    {{/isPolicyPage}}
    {% endraw %}
    
    ```


- **Data Syntax**
    
    This syntax can be used to add data to the layout code.

    ```html
    {% raw %}
    <script src="{{BASE_URL}}/script.js"></script>
    {% endraw %}
    ```

     The value stored in the `BASE_URL` variable will be converted to a string and placed in the corresponding location at runtime. All data syntax values will be sanitized before adding to the layout code.

    !!! info
        All these variables will be provided by `JSP` pages. To get more data from JSP pages, add the data into the `layoutData` map object found in each JSP page.

## Add custom layouts

Follow the steps below to customize the layout for login, registration , username and password recovery, and single sign-on pages.

!!! tip
    While `authenticationendpoint` is used to explain the steps below, the same steps can be carried on for `accountrecoveryendpoint` and `x509certificateauthenticationendpoint`.

!!! note
    The `<IS_HOME>/repository/deployment/server/webapps/` directory will be referred to as the `webapps` folder in the following steps.
    
### Step 1: Create the extensions folder

Navigate to `webapps/authenticationendpoint` and create a new folder named `extensions`.

### Step 2: Create the basic custom layout resources

To create the basic custom layout resources:

1. In the `authenticationendpoint` folder, navigate to the created `extensions` folder and create the `layouts`, `custom` and `carbon.super` folders as follows.
    
    ```
    └── extensions
        └── layouts
            └── custom
                └── carbon.super
    ```

    {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

    !!! note "Application-specific layouts"
        To add application-specific custom layouts, create a folder called `apps` under the organization folder (carbon.super). Within the `apps` folder, create a folder for each application and name it with the UUID of the application.

        The structure will look as follows.

        ```
        └── extensions
            └── layouts
                └── custom
                    └── carbon.super
                        └── apps
                            └── <UUID_OF_APP>
        ```
    

        Follow the next steps of the guide, but apply them to the `UUID_OF_APP` folder instead of `carbon.super`.

    {% endif %}

3. Navigate to the `webapps/authenticationendpoint/includes/layouts/centered` folder, copy the `body.html` file, and add it to the created `carbon.super` folder.

4. Create the following files and the folder inside the `carbon.super` folder:
    - `styles.css` file
    - `script.js` file
    - `assets` folder

### Step 3: Add a custom layout design

To add a custom layout to the login page:

1. Navigate to `webapps/authenticationendpoint/extensions/layouts/custom/carbon.super/` and follow the instructions provided below:

    1. Copy the code snippet from the [html file](https://github.com/wso2/docs-is/tree/master/en/identity-server/{{is_version}}/docs/assets/code-samples/body.html){target="_blank"} into the `body.html` file.

    2. Copy the code snippet from the [css file](https://github.com/wso2/docs-is/tree/master/en/identity-server/{{is_version}}/docs/assets/code-samples/style.css){target="_blank"}  into the `styles.css` file.

        !!! note
            If you are using the default html page provided by the product, please use the exact CSS class names when overriding the existing styles.

    3. Copy the code snippet from the [javascript file](https://github.com/wso2/docs-is/tree/master/en/identity-server/{{is_version}}/docs/assets/code-samples/script.js){target="_blank"} file  into the `script.js` file.

    4. Copy the [illustration.svg file](https://github.com/wso2/docs-is/tree/master/en/identity-server/{{is_version}}/docs/assets/code-samples/illustration.svg){target="_blank"} into the `assets` folder.

    !!! note
        To update the header and the footer, use the [Branding UI]({{base_path}}/guides/branding/configure-ui-branding/#update-branding).

2. Clone the [identity-apps repository](https://github.com/wso2/identity-apps){target="_blank"} from Github. This directory will be referred to as `IDENTITY-APPS-HOME` in the next step.

2. Build the source code.

    1. Copy the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts/custom` directory and place it into the `<IDENTITY-APPS-HOME>/identity-apps-core/components/login-portal-layouts/layouts` directory.

    2. Navigate to `<IDENTITY-APPS-HOME>/identity-apps-core/components/login-portal-layouts` directory and build the source code using `mvn clean install` command (Build should be succeeded for further steps).

    3. Copy `<IDENTITY-APPS-HOME>/identity-apps-core/apps/authentication-portal/src/main/webapp/extensions/layouts/custom` folder (Compiled version of the layout source code) and paste it into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts` directory.

4. To enable custom branding, go to **Branding** > **Styles & Text** > **Design** in the WSO2 Identity Server Console.
Select **Custom** layout as the **Login Layout** and click **Save & Publish** to apply the branding configurations.

   !!! tip
   If the server stops working after the changes are added, restart the server before verifying the changes.

5. Refresh the browser and check out the added custom layout.


## Best Practices

Use the following best practices when creating a custom layout:

- Add a prefix for the new CSS classes so that the newly added classes will not conflict with existing classes.

- In your development environment, be sure to add the `cache="false"` flag as a parameter in the `<layout:main>` tag of all pages that require testing with the custom layout. With this flag in place, the layouts will compile at runtime eliminating the need to manually recompile layouts. Remember to remove this flag in the production environment.