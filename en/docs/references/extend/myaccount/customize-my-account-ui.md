# Customize the My Account UI

This section explains how we can customize the theming of **My Account** application. 

---

## Change the default theme to dark mode

A customized version of the [default theme](https://github.com/Semantic-Org/Semantic-UI-LESS/tree/master/themes/default) in the Semantic UI LESS package has been used to achieve the look and feel of the **My Account**.

![default-my-account-theme]({{base_path}}/assets/img/extend/default-my-account-theme.png)

For information on the Semantic UI theming, see [Semantic UI documentation](https://semantic-ui.com/usage/theming.html).

---

## Before you begin

1. Check out the corresponding identity apps source code from the [identity-apps](https://github.com/wso2/identity-apps) repository. 

2. Check out the latest tag of the identity-apps. The `v1.4.28` tag (for WSO2 IS 6.1.0) is used in the sample mentioned below. 

    ```java
    $ git fetch --all --tags --prune
    $ git checkout tags/v1.4.28 -b feature-dark-theme-demo
    ```

3. Navigate to the `modules/theme/src/themes` folder within identity-apps. All the theme global variable overrides can be found in the `modules/theme/src/themes/default/globals/site.variables` file. For the full set of variables, see the [original theme variables file](https://github.com/Semantic-Org/Semantic-UI-LESS/blob/master/themes/default/globals/site.variables).

---

Follow the steps given below to further customize **My Account** application. 

## Step 1: Change the primary color of My Account

In order to change the primary color of the **My account** application, the variables in `site.variables` need to be overridden.

1.  Add a new color under the site colors and name it. In this example it is named, `facebookBlue`.

    ```java
    /*-------------------
        Site Colors
    --------------------*/

    @facebookBlue     : #2d88ff;
    ```

2. Now change the primary color variable.

    ```java
    /*-------------------
        Brand Colors
    --------------------*/

    @primaryColor        : @facebookBlue;
    ```

3. Next, change the page background color and text color. In this example, the background color is changed from white to dark gray and the default text color is changed to a
lighter shade. Add a new variable under the brand colors. It is called `globalBackgroundColor` in this example.

    ```java
    /*-------------------
        Brand Colors
    --------------------*/

    @globalBackgroundColor: #18191a;
    ```

4. Override the `@pageBackground` variable.

    ```java
    /*-------------------
            Page
    --------------------*/

    @pageBackground      : @globalBackgroundColor;
    @textColor           : #e4e6eb;
    ```

5. Build the theme module by running the following command and check the results reflected on the dev server.

    ```java
    # from inside `modules/theme`
    $ npm run build
    ```
    The response should be similar to the screenshot given below. 

    ![custom-theme-1]({{base_path}}/assets/img/extend/customize-theme1.png)
    
    As seen in the image above, the background color of the header, footer, side navigation, and content cards can be changed.

6.  In order to change the header and footer background colors, add a new variable to the
`modules/theme/src/themes/default/collections/menu.variables` file under the brand, "colors". This variable is named
`globalForegroundColor` in this example.
    
    ```java
    @background: @globalForegroundColor;
    ```


7.  Change the side panel background in the `modules/theme/src/themes/default/collections/menu.overrides` file.

    ```java
    .ui.vertical.menu {
        &.side-panel {
            background: @globalBackgroundColor;

            // Other styles
        }
    }
    ```

8.  Modify the content card background color in the `modules/theme/src/themes/default/views/card.variables` file.

    ```java
    @background: @globalForegroundColor;
    ```
The status can be checked by rebuilding the theme module. The changes should be reflected on the running dev server in no time. A sample screen of the new theme is shown below.

![custom-theme-2]({{base_path}}/assets/img/extend/customize-theme2.png)

## Step 2: Change the branding

Now that the styling is complete, the following steps explain how the product branding can be changed.

### Change the product logo

   Use one of the following methods to change the product logo.
    
   **Method 1 (Recommended)**
    
   If the logo should be changed without touching the compiled javascript bundle, follow these instructions to override the existing WSO2 IS logo using CSS.

1.  Download an icon from any of the providers such as [Flaticon.com](https://www.flaticon.com/). In this example, `owl.svg` was the downloaded icon. Now add it to the
`modules/theme/src/themes/default/assets/images` folder.

2.  Open the `modules/theme/src/definitions/globals/product.less` file and replace the existing styles in the `.product-logo` class with the following.

    ```java
    .product-title {
        .product-logo {
            width: 25px;
            height: 25px;
            vertical-align: text-top;
            margin-right: 5px;
            background: url(assets/images/owl.svg) no-repeat;
            background-size: auto;

            svg {
                display: none;
            }
        }

        // Other styles
    }
    ```

**Method 2**

1. Download an icon from any of the providers such as [Flaticon.com](https://www.flaticon.com/). In this example, `owl.svg` was the downloaded icon. Now add it to the
`modules/theme/src/themes/default/assets/images` folder.

2. Open the `modules/theme/src/index.js` file and replace `Logo` with the path to the new icon.

    ```java
    export const Logo = require("{{base_path}}/lib/assets/images/owl.svg");
    ```
3.  Build **my-account** artifacts.

    ```java
    npx lerna run build — scope @wso2is/my-account
    ```

4. Copy the `main.js` and `main.js.map` files from the `apps/my-account/build/my-account` folder and paste it
    inside the **my-account** web app found in the `<IS_HOME>/repository/deployment/server/webapps/my-account` folder.

5.  To change the product title & copyright, add the following entries to the `runConfig` window object in the
    `<IS_HOME>/repository/deployment/server/webapps/my-account/index.jsp` file.
    
    ```java
    window["runConfig"] = {
        ...
        applicationName: "NIGHT OWL EXPRESS",
        copyrightText: "Night Owl Express © 2020"
    };
    ```
    
6.  Replace `favicon.ico` in the `<IS_HOME>/repository/deployment/server/webapps/my-account` folder with the
    desired icon.

    !!! tip
        If you do not have a favicon already, you can use an online generator like [favicon.oi](https://favicon.io/) to generate a favicon for free.

7.  Change the `<title>` tag in the `<IS_HOME>/repository/deployment/server/webapps/my-account/index.jsp` file.
    ```html
    <title>Night Owl Express</title>
    ```

## Step 3: Deploy the changes in the web app

The final step of the process is the deployment. Follow the sequence of steps listed below to deploy
the changes performed in the previous steps.

1.  Build the theme module.

    ```java
    # from inside modules/theme
    $npm run build
    ```

2.  Copy the built artifacts available inside the `modules/theme/lib` folder. Navigate to 
    the `<IS_HOME>/repository/deployment/server/webapps/my-account/libs/styles/css` folder and paste the copied resources.
    
    !!! warning
        Make sure that you keep a backup of the original CSS folder.

The final theme should look similar to following.

![final-theme1]({{base_path}}/assets/img/extend/customize-theme-final1.png)

![final-theme2]({{base_path}}/assets/img/extend/customize-theme-final2.png)

![final-theme3]({{base_path}}/assets/img/extend/customize-theme-final3.png)

![final-theme4]({{base_path}}/assets/img/extend/customize-theme-final4.png)
