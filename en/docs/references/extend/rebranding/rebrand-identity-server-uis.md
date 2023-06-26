# Re-brand WSO2 Identity Server UIs

From [WSO2 Identity Server 5.9.0](https://wso2.com/identity-and-access-management/) onwards, a new UI extension has been introduced to easily re-brand  basic user interfaces like the login page, username and password recovery pages, and single sign-on pages.

All these UIs are available in the **`authenticationendpoint`** and **`accountrecoveryendpoint`** web apps that are located in the `<IS_HOME>/repository/deployment/server/webapps` folder. To customize these pages, follow the steps below. 

---

## Step 1: Create the extensions/branding folder

1. Navigate to the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint` folder and create a new folder called **`extensions`**. Inside the `extensions` folder, create a new folder called **`branding`**.
           
2. Similarly, navigate to the `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint` folder and create the folders `extensions/branding` recursively.

---

## Step 2: Create new folders for each tenant and app

To re-brand different tenants, create folders for each tenant named after the tenant domain, inside the newly created `branding` folders.
If you want to apply separate branding for each application, create folders for each application named after the application name, inside the tenant folders.

!!! note
    Application-wise branding will override tenant-wise branding.

---

## Step 3: Create the branding-preference.json file and CSS files

To customize the branding of a specific tenant or app, we need to create the `branding-preference_<locale>.json` file inside the relevant tenant or app folder. 
For example, the US English branding file should be named: **`branding-preference_en_US.json`**. If you want to customize the branding for the `wso2.com` tenant, create the `branding-preference_en_US.json` file inside the `extensions/branding/wso2.com` folder.

The final folder structure should look like this:
```
extensions
└── branding
    ├── carbon.super
    │   ├── apps
    │   │   ├── peoplehr
    │   │   │   ├── stylesheets
    │   │   │   │   └── override.css
    │   │   │   ├── branding-preference_en_US.json
    │   │   │   └── branding-preference_de_DE.json
    │   │   └── salesforce
    │   │       ├── stylesheets
    │   │       │   └── override.css
    │   │       ├── branding-preference_en_US.json
    │   │       └── branding-preference_de_DE.json
    │   ├── stylesheets
    │   │   └── override.css
    │   ├── branding-preference_en_US.json
    │   └── branding-preference_de_DE.json
    └── wso2.com
        ├── apps
        │   ├── logomaker
        │   │   ├── stylesheets
        │   │   │   └── override.css
        │   │   ├── branding-preference_en_US.json
        │   │   └── branding-preference_de_DE.json
        │   └── opd-claims
        │       ├── stylesheets
        │       │   └── override.css
        │       ├── branding-preference_en_US.json
        │       └── branding-preference_de_DE.json
        ├── stylesheets
        │   └── override.css
        ├── branding-preference_en_US.json
        └── branding-preference_de_DE.json
```
To customize any other styles, you can create the `stylesheets` folder inside the tenant or app folder and add an `override.css` file to it. This file will be loaded after the default stylesheets, so you can override any styles you want.

!!! note
    Make sure to update the branding-preference.json file with the correct path to the `override.css` file.

Checkout the sample [branding-preference_en_US.json](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/branding-preference_en_US.json) file and the corresponding [override.css](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/override-auth.css) file for authentication portal and the [override.css](https://github.com/wso2/docs-is/tree/master/en/docs/assets/code-samples/override-recovery.css) file for recovery portal.

---

After applying the changes, refresh the browser and check out the rebranded content.

!!! tip
    Restarting the server is NOT required to reflect the changes. A browser refresh will display the changes. 

-  Customized login page
![image]({{base_path}}/assets/img/extend/rebranded-ui-1.png)

- Customized recover username page
![image]({{base_path}}/assets/img/extend/rebranded-ui-2.png)
  
- Customized recover password page
![image]({{base_path}}/assets/img/extend/rebranded-ui-3.png)

- Customized self sign up page
![image]({{base_path}}/assets/img/extend/rebranded-ui-4.png)

!!! note  
    One advantage of this approach is that WUM updates will not affect your UI changes and you need not worry about manually adding your changes. 

