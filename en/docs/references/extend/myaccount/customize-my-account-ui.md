# Customize the My Account UI

This section explains how we can customize the theming of **My Account** application. 

---

## Change the default theme

A customized version of the [default theme](https://github.com/Semantic-Org/Semantic-UI-LESS/tree/master/themes/default) in the Semantic UI LESS package has been used to achieve the look and feel of the **My Account**.

![default-my-account-theme]({{base_path}}/assets/img/extend/default-my-account-theme.png)

For information on the Semantic UI theming, see [Semantic UI documentation](https://semantic-ui.com/usage/theming.html).

---

Follow the steps given below to further customize **My Account** application. 

## Step 1: Create the extensions/branding folder

1. Navigate to the `<IS_HOME>/repository/deployment/server/webapps/myaccount` folder and create a new folder called **`extensions`**. Inside the `extensions` folder, create a new folder called **`branding`**.

---

## Step 2: Create new folders for each tenant as preferred

To re-brand different tenants, create folders for each tenant named after the tenant domain, inside the newly created `branding` folders.
For example, if the tenant domain is `rusticfox.com`, create a folder named `rusticfox.com` inside the `extensions/branding` folder.

---

## Step 3: Create the branding preferences json file and css files

To customize the branding of a specific tenant, we need to create the `branding-preference_<locale>.json` file inside the relevant tenant folder.
For example, the US English branding file should be named: **`branding-preference_en_US.json`**. If you want to customize the branding for the `rusticfox.com` tenant, create the `branding-preference_en_US.json` file inside the `extensions/branding/rusticfox.com` folder.

The final folder structure should look like this:

```
extensions
└── branding
    ├── rusticfox.com
    │   ├── stylesheets
    │   │   └── override.css
    │   ├── branding-preference_en_US.json
    │   └── branding-preference_de_DE.json
    └── wso2.com
        ├── stylesheets
        │   └── override.css
        ├── branding-preference_en_US.json
        └── branding-preference_de_DE.json
        
```
To customize any other styles, you can create the `stylesheets` folder inside the tenant or app folder and add an `override.css` file to it. This file will be loaded after the default stylesheets, so you can override any styles you want.

Checkout the sample [branding-preference_en_US.json](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/branding-preference_en_US_myaccount.json) file and the corresponding [override.css](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/override-myaccount.css) file.

---

The final rebranded content should look similar to the following.

![final-theme1]({{base_path}}/assets/img/extend/customize-theme-final1.png)

![final-theme2]({{base_path}}/assets/img/extend/customize-theme-final2.png)

![final-theme3]({{base_path}}/assets/img/extend/customize-theme-final3.png)
