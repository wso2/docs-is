# Customize layouts with editor

You can now easily customize the branding and layout of user interfaces like the login, registration, username and password recovery, and single sign-on pages using the new in-console editor.
This feature lets you apply changes instantly, without editing files or rebuilding artifacts manually.

You can find all user interfaces in the following apps under the `<IS_HOME>/repository/deployment/server/webapps` folder.

- `authenticationendpoint`
- `accountrecoveryendpoint`
- `x509certificateauthenticationendpoint`

## Enabling the editor

Before using the editor for customizing, follow these steps:

To enable layout customization:

- Log in to the WSO2 Identity Server Console.
- Click your username in the top-right corner.
- Enable the `Customize layouts with editor` toggle under `Feature Preview`.

Once enabled, the `Customize` button will appear on the `Preview` tab under `Branding` > `Styles & Text`, after selecting the `Custom` tile from the `Design` tab.

## General components of the user interface

All pages in WSO2 Identity Server consist of three general components, as shown below. You can reference these components when you form the custom layout.

![Login Page]({{base_path}}/assets/img/guides/branding/login-page-labelled.png)

## Layout syntax formats

This section explains the special syntax that you can use to create a custom layout.

- **Component syntax**

    This syntax will be used to indicate the position of the general component in the custom layout code. The component syntaxes will be replaced with actual content at runtime.

    !!! note
        The components `{{{MainSection}}}` and `{{{ProductFooter}}}` must be in the HTML code to publish it successfully.

    ```html
    <div class="page-wrapper layout-file">
        <main class="center-segment">
            <div class="ui container medium center aligned middle">
                {{{ProductHeader}}}
                {{{MainSection}}}
            </div>
            {{{ProductFooter}}}
        </main>
    </div>
    ```

- **Data syntax**

    This syntax can be used to add data to the layout code.

    **Reference: Available `data-*` Attributes for Layout Customization**

    When customizing layouts using the layout editor, you can style or control logic based on the following `data-*` attributes injected into the `<body>` tag of each page.

    These attributes are available across the **authentication**, **recovery**, and **certificateauthentication** portals.

    ---

    - **Common `data-*` Attributes**

    | Attribute              | Description                                                                 | Example Value               |
    |------------------------|-----------------------------------------------------------------------------|-----------------------------|
    | `data-page`            | Indicates the current page's name. Derived from `request.setAttribute(...)`. | `sign-in`, `logout`, `error`  |
    | `data-responsetype`    | Indicates the outcome of the operation. Replaces older boolean flags, `isResponsePage`, `isErrorResponse`, etc. | `error`, `success`          |

    ---

    - **Common `data-page` Values**

    These are the actual page names set in JSP files:

    | Page                            | `data-page` Value                      |
    |---------------------------------|----------------------------------------|
    | Login                           | `sign-in`              |
    | Logout                          | `logout`                               |
    | Error pages                     | `error`, `totp-error`, `oauth2-error`, `duo-error`, etc. |
    | Self-registration               | `self-registration`, `self-registration-complete`, `self-registration-username-request` |
    | Password recovery               | `password-recovery`, `password-reset`, `password-reset-success` |
    | Username recovery               | `username-recovery`, `username-recovery-complete` |
    | TOTP                            | `totp`, `totp-error`                   |
    | SMS OTP                         | `sms-otp`, `sms-otp-error`             |
    | Email OTP                       | `email-otp`, `email-otp-error`         |
    | Push Authentication            | `push-auth`, `push-auth-error`         |
    | Device Success Pages            | `device-success`                       |
    | Policies                        | `privacy-policy`, `cookie-policy`      |
    | Account linking / invite flow   | `accept-invitation`                    |
    | Other                           | `retry`, `consent`, `domain`, `oauth2-consent`, etc. |

    ---

    - **Deprecated Attributes (Replaced by `data-responsetype`)**

    The following were removed and replaced with a single simplified `data-responsetype`:

    | Old Attributes                     | Replaced by                     |
    |-----------------------------------|----------------------------------|
    | `isResponsePage="true"`           | `data-responsetype="success"` or `"error"` |
    | `isErrorResponse="true"`     | `data-responsetype="error"`     |
    | `isSuccessResponse="true"`   | `data-responsetype="success"`   |

    !!! note
        Use only `data-responsetype` in your CSS or JS instead of the older ones.

    ---

    - Example: JSP Injected Data
    ```html
        <body data-page="sign-in" data-error="true">
    ```

    - Sample HTML code to be written-in
    ```html
        <div class="message">Invalid credentials</div>
    ```

    - Accessing in CSS
    ```css
        body[data-page="sign-in"][data-error="true"] .message {
            color: red;
            font-weight: bold;
        }
    ```

    - Accessing in JS
    ```javascript
        if (document.body.dataset.page === "sign-in") {
            // Perform sign-in page-specific logic
        }
    ```

    !!! note
        All `data-*` attributes are injected via `<% request.setAttribute(...) %>` inside `JSP` pages.
        These are guaranteed only if you're using `WSO2 Identity Server versions that have layout editor support`.

## Add custom layouts

Follow the steps below to customize the layout for login, registration , username and password recovery, and single sign-on pages.

### Step 1: Enable Custom branding

To enable custom branding, go to **Branding** > **Styles & Text** > **Design** in the WSO2 Identity Server Console.
Select **Custom** layout as the **Login Layout** and click **Save & Publish** to apply the branding configurations.

### Step 2: Access the Editor

Navigate to `Branding` > `Styles & Text`. Under the `Design` tab, select the `Custom` tile, then switch to the `Preview` tab and click `Customize`.

### Step 3: Add a custom layout design

To add a custom layout to the login page:

1. Navigate to the editor and add the HTML, CSS, and Javascript code snippets those will enable the custom layout which your organization may need to:

- To create the basic custom layout resources, below are examples to help you get started.

    - Sample HTML Code
    ```html
    <div id="default">
        <div id="welcome-popup" style="display: none;">
  		    <div> Welcome to the Login Page!</div>
            <div> Enjoy our new features onboarded. </div>
	    </div>
        <div class="page-wrapper layout-file" id="page-wrapper">
            {{{ProductHeader}}}
            <main class="hero-section">
                <div class="background-image-wrapper">
                    <img src="http://your-domain.com/backgroundimg.jpg" alt="Background Image" class="background-image" />
                </div>
                <div class="main-content-box">
                    {{{MainSection}}}
                </div>
            </main>
            {{{ProductFooter}}}
        </div>
    </div>

    <div id="policy">
        <main class="policy-page">
            <div class="ui borderless top fixed app-header menu" id="app-header">
                <div class="ui container">
                    <div class="header item product-logo">
                        {{{ProductHeader}}}
                    </div>
                </div>
            </div>
            <div class="app-content policy-page-content" style="padding-top: 62px">
                <div class="ui container">
                    {{{MainSection}}}
                </div>
            </div>
        </main>
        {{{ProductFooter}}}
    </div>
    ```

    !!! warning
        To avoid breaking the runtime, your HTML layout **must** include both `{{{MainSection}}}` and `{{{ProductFooter}}}`.
        Additionally, you must **Save and Publish** the HTML code at a minimum. Without a valid HTML layout that includes these required sections, the custom layout won't render correctly.

    - Sample CSS code

    ```css
    /* Hide both initially */
    #policy,
    #default {
        display: none !important;
    }

    /* Show based on data-page */
    body[data-page="privacy-policy"] #policy {
        display: block !important;
    }
    body:not([data-page="privacy-policy"]) #default {
        display: block !important;
    }

    /* --- Layout Styling --- */
    .page-wrapper.layout-file {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        max-height: fit-content;
    }

    .page-wrapper layout-file > main.hero-section {
        position: relative;
        flex: 1;
        display: flex;
        align-items: right;
        justify-content: flex-end;
        background-size: cover;
        padding: 40px;
        margin-left: 20px;
    }

    .background-image-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    }

    .background-image-wrapper .background-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.6; 
    }

    /* Main section box (right aligned) */
    .main-content-box {
        position: relative;
        justify-content: right;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 20px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        margin-left: 15px;
        margin-top: 10%;
        margin-bottom: 12%;
    }

    /* Header/Footer placeholders */
    .page-wrapper.layout-file > :first-child {
        padding: 1rem;
        background: #f0f0f0;
        text-align: center;
        font-weight: bold;
    }

    .page-wrapper.layout-file > :last-child {
        padding: 1rem;
        background: #f0f0f0;
        text-align: center;
        font-weight: bold;
    }

    @media only screen and (min-width: 768px) {
        .main-content-box {
            margin-left: 55%;
        }
    }

    /* Welcome popup */
    #welcome-popup {
        position: fixed;
        top: 20%;
        right: 42%;
        background-color: #f0f8ff;
        color: #333;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        font-weight: 500;
        z-index: 1000;
        animation: fadeInOut 4s ease-in-out forwards;
    }

    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-10px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-10px); }
    }
    ```

    !!! note
        If you are using the default html page provided by the product, please use the exact CSS class names when overriding the existing styles.

    - Sample JS Code

    ```javascript
    const page = document.body.dataset.page;
    const responseType = document.body.dataset.responsetype;

    if (page === "privacy-policy" || page === "cookie-policy") {
	    // Some policy page specific logic goes here
    }

    if (responseType === "error") {
	    document.getElementById("page-wrapper").classList.add("error-page");
    } else if (responseType === "success") {
	    document.getElementById("page-wrapper").classList.add("success-page");
    }

    window.addEventListener("DOMContentLoaded", function () {
        if (document.body.dataset.page === "sign-in") {
            const popup = document.getElementById("welcome-popup");
            popup.style.display = "block";
        }
    });
    ```

- Resources Handling

    !!! note
        Use only **absolute URLs** (for example, https://your-domain.com/img.jpg) when referencing assets like images, fonts, or icons. These resources must be hosted and publicly accessible.

    - Correct
    ```html
    <img src="https://example.com/assets/img.jpg">
    ```

    - Wrong
    ```html
    <img src="./assets/img.jpg">
    ```

!!! note
    To update the header and the footer, use the [Branding UI]({{base_path}}/guides/branding/configure-ui-branding/#update-branding).

!!! note "Application-specific layouts"
    To add application-specific custom layouts, toggle the Application selector at the top-right corner of the Branding view and choose the desired app and apply your custom layout to it specifically.

2. Click **Save & Publish** to apply the custom layout configurations added.

3. Refresh the browser and check out the added custom layout.

## Best Practices

Use the following best practices when creating a custom layout:

- Add a prefix for the new CSS classes so that the newly added classes won't conflict with existing classes.

- In your development environment, be sure to add the `cache="false"` flag as a parameter in the `<layout:main>` tag of all pages that require testing with the custom layout. With this flag in place, the layouts will compile at runtime eliminating the need to manually recompile layouts. Remember to remove this flag in the production environment.