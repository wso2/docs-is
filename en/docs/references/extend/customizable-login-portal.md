# Add a custom layout for the authentication/recovery pages

This feature can be used for both layout customization and branding customization of user interfaces like the login page, register page, username and password recovery pages, and single sign-on pages.

All these UIs are available in the `authenticationendpoint`, `accountrecoveryendpoint`, and `x509certificateauthenticationendpoint` web apps that are located in the `<IS_HOME>/repository/deployment/server/webapps` folder. To customize these pages, follow the steps below.

## Step 1: Create the extensions folder

Navigate to `<IS_HOME>/repository/deployment/server/webapps/` and create a new folder named `extensions` in the following folders:

- `authenticationendpoint`
- `accountrecoveryendpoint`
- `x509certificateauthenticationendpoint`

## Step 2: Create the basic custom layout resources

1. Navigate to the created `extensions` folder and create a new folder called `layouts`.
2. Navigate to the created `layouts` folder and create a new folder called `custom`.
3. Navigate to the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/includes/layouts/default` folder and copy the `body.html` file into the created `custom` folder.
4. Create the following files and folder inside the `custom` folder:
    - `styles.css` file
    - `script.js` file
    - `assets` folder

!!! note
    Repeat these steps for the other two apps as well(`accountrecoveryendpoint`, `x509certificateauthenticationendpoint`).

## Step 3: Add a custom layout design

**Identify General Components**:

All the pages of the identity server were separated into three general components. You can reference these components when you write the custom layout using a special notation (which will be shown next). To get an idea about these components, please refer to the following snapshots.
    - Login page
    - Register page
    - Password recovery page

**Layout Syntax:**

This section includes details about the special syntax that can be used when writing a custom layout code.

- **Condition block**
    
    ``` js
    ADD code block
    ```
    This is similar to an “IF” block. But this condition block will activate or deactivate according to the value of the “isPolicyPage” variable. If the value of “isPolicyPage” is true or any non-empty string then the inside content of the block will be executed. For all other values including null and undefined, the content of the block will not be executed.

- **Not Condition Block**
    
    This is similar to an “IF” block with a NOT condition. If the value of “isPolicyPage” is false, empty string, null or undefined then the inside content of the block will be executed. For all other values, the content of the block will not be executed.

- **Component Syntax**
    
    This syntax will be used to indicate the position of the general component in the custom layout code. The component syntaxes will be replaced with actual content at runtime.

- **Data Syntax**
    
    This syntax can be used to add data to the layout code. The value stored in the “containerSize” variable will be converted to a string and placed in the corresponding location at runtime. All data syntax values will be sanitized before adding to the layout code.

!!! info
    All these variables will be provided by the JSP pages. If you want to get more data from JSP pages, then you can put the data into the “layoutData” Map object from each JSP page. This “layoutData” map object can be found on each JSP page (Look into the HTML content starting place of the JSP pages).

1. Copy the following code into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts/custom/body.html` file.
    
    ??? "`body.html`"
        ``` html
        {{isPolicyPage}}
        <header class="fp-header">
            <div class="fp-header-logo">
                {{ProductHeader}}
            </div>
            <div class="fp-header-theme">
                <input type="checkbox" class="fp-checkbox" id="fp-checkbox">
                <label for="fp-checkbox" class="fp-theme-checkbox-label">
                    <i class="moon icon"></i>
                    <i class="sun icon"></i>
                    <div class="fp-theme-indicator"></div>
                </label>
            </div>
        </header>
        <main class="center-segment">
            <div class="ui segment fp-container">
                <div class="fp-info-container">
                    <div class="fp-info-illustration">
                        <img src="extensions/layouts/custom/assets/illustration.svg" alt="Auth Page Illustration Image">
                    </div>
                    <div class="fp-info-content">
                        <p>Access Our All Service With This Account</p>
                        <div class="fp-services">
                            <div class="fp-service-item">
                                <i class="utensils icon"></i>
                                <p>Create new orders</p>
                            </div>
                            <div class="fp-service-item">
                                <i class="shipping fast icon"></i>
                                <p>Get delivery to doorstep</p>
                            </div>
                            <div class="fp-service-item">
                                <i class="credit card icon"></i>
                                <p>Online payment facility</p>
                            </div>
                            <div class="fp-service-item">
                                <i class="money bill alternate outline icon"></i>
                                <p>Cash on delivery</p>
                            </div>
                            <div class="fp-service-item">
                                <i class="map marker alternate icon"></i>
                                <p>Track your order</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fp-divider"></div>
                <div class="fp-content-container">
                    <div class="center-segment">
                        <div class="ui container">
                            {{MainSection}}
                        </div>
                    </div>
                </div>
            </div>
        </main>
        {{ProductFooter}}
        {{isPolicyPage}}
        {{isPolicyPage}}
        <header class="fp-header">
            <div class="fp-header-logo">
                {{ProductHeader}}
            </div>
            <div class="fp-header-theme">
                <input type="checkbox" class="fp-checkbox" id="fp-checkbox">
                <label for="fp-checkbox" class="fp-theme-checkbox-label">
                    <i class="moon icon"></i>
                    <i class="sun icon"></i>
                    <div class="fp-theme-indicator"></div>
                </label>
            </div>
        </header>
        <main class="policy-page">
            <div class="app-content policy-page-content">
                <div class="ui container">
                    {{MainSection}}
                </div>
            </div>
        </main>
        {{ProductFooter}}
        {{isPolicyPage}}

        <script src="extensions/layouts/custom/script.js"></script>
        ```
2. Copy the following code into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts/custom/styles`.css file.
    ``` js

    ```
3. Copy the following code into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts/custom/script.js` file.
    ``` js

    ```
4. Copy the following resources into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/layouts/custom/assets` folder.
    ``` js

    ```
5. Navigate to the the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/includes` directory and copy the `product-title.jsp` and `product-footer.jsp` into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions` directory.
6. Copy the following code into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/product-title.jsp` file.

    For `authenticationendpoint` app:
        ``` js

        ```

    For `accountrecoveryendpoint` and `x509certificateauthenticationendpoint`:
        ``` js

        ```

7. Copy the following code into the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/extensions/product-footer.jsp` file.

    For `authenticationendpoint` app:
        ``` js

        ```

    For `accountrecoveryendpoint` and `x509certificateauthenticationendpoint`:
        ``` js

        ```

!!! note
    Repeat these steps for the other two apps (accountrecoveryendpoint, x509certificateauthenticationendpoint)

Refresh the browser and check out the added custom layout.

!!! tip
    Sometimes after doing changes, the server can be stopped working. In that case, restart the server to check the changes.

!!! note
    - When developing the custom layout try to use the following guidelines.
        - Try to add a prefix for the new CSS classes (Then those classes will not be conflicted with existing classes ).
        - Set the cache=”false” when developing a custom layout (Make sure to remove the cache=”false” in production code).
    - If you like to build the apps from source code (identity-apps). Then you can place the developed custom layout folder into `<IDENTITY_APPS_SOURCE_CODE>/components/login-portal-layouts/layouts` directory.
    Then after building the source code, the custom layout will be moved to the corresponding locations of `authenticationendpoint`, `accountrecoveryendpoint`, and `x509certificateauthenticationendpoint` apps.