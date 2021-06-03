# Customize the Management Console

The user interface of the Management Console (
`https://localhost:9443/carbon`) of a Carbon product consists of two layers:

1.  **UI inherited from WSO2 Carbon platform** 

    The bundle, `org.wso2.carbon.ui_<version-number>.jar` located in `<IS_HOME>/repository/components/ plugins/`, contains the templates and styles (css files) for the Management Console. The `<version-number>` is the version of the Carbon Kernel that WSO2 Identity Server is built on. This 
    bundle is responsible for the overall look and feel of the entire Carbon platform.
    
2.  **Unique UI of each product** 

    Each Carbon product (that is built on Carbon kernel) has another style bundle, 
    `org.wso2.identity.styles_<version-number>.jar` located in `<IS_HOME>/repository/components/plugins/`. This contains all the styles and images that 
    override the ones in core Carbon platform. The `<version-number>` is the version of the product.
    


The following sections will guide you through the customization process.

---

## Set up the development environment

To download and set up the product environment for editing, follow the steps given below. 

1.  Download the latest version of [WSO2 Identity Server](https://wso2.com/identity-and-access-management/).
2.  Extract the ZIP file into a separate folder in your hard drive.
3.  Go to the `<IS_HOME>/repository/components/plugins/`
    directory to find the required JAR files:
    -   `org.wso2.carbon.ui_<version-number>.jar`
    -   `org.wso2.identity.styles_<version-number>.jar`
4.  Copy the JAR files to a separate location on your hard drive. Since
    the JAR files are zipped, you must unzip them to make them editable.

You can now customize the look and feel of your product by modifying the
contents of the JAR files as described in the next section.

---

## Customize the user interface

Customizing the product interface involves changing the layout (or design) of
the Carbon framework as well as changing the styles and images specific
to the product. The following topics explain how some of the main
changes to the product interface can be done.

---

### Change the layout

The layout of the Carbon framework is built using a tiles JSP tag
library. These tiles allow us to break the presentation of the
layout into small JSP snippets that perform a specific function. 

For example, `header.jsp` and `footer.jsp` are the tiles corresponding to the header and footer in the layout. 

The `template.jsp ` file controls the main layout page of the Carbon framework, 
which holds all the tiles together. The `template.jsp` file as well as 
the JSP files corresponding to the tiles are located in the
`org.wso2.carbon.ui_<version-name>..jar/web/admin/layout/         `
directory.

Therefore, changing the layout of your product primarily involves
changing the `template.jsp` page (main layout page) and other `.jsp` files 
of the JSP tiles.

!!! warning
    
    Do not change or remove the ID attributes on the `.jsp` files.
    
---

### Change the styles on the Carbon framework

The `global.css` file located in the
`org.wso2.carbon.ui_<version-name>.jar/web/admin/css/         `
directory determines the styles of the Carbon framework. 
You can edit this file as per your own requirement.
Alternatively, you can apply a completely new stylesheet to your
framework instead of the default `global.css`stylesheet.

#### Apply a new style sheet to the carbon framework

1.  Copy your new CSS file to this same location.
2.  Open the `template.jsp` file located in the
    `org.wso2.carbon.ui_<version_name>.jar /web/admin/layout/`
    directory, which contains the main layout of the page and the
    default JavaScript libraries.
3.  Replace `global.css` with the new style sheet
    by pointing the `String globalCSS` attribute
    to the new stylesheet.

    ```java
    //Customization of UI theming per tenant
    String tenantDomain = null;
    String globalCSS = "../admin/css/global.css";
    String mainCSS = "";
    ```

---

### Change the product specific styles and images

The styles and images unique to WSO2 Identity Server Management Console are located in the
`org.wso2.identity.styles_<version_number>.jar` file.
Follow the steps below to modify product specific styles and images.

1.  Copy the necessary images to the
    `org.wso2.identity.styles_<version-number>.jar/web/styles/images/`
    directory. 
    
    For example, if you want to change the product banner,
    add the new image file to the above directory.
    
2.  Open the `main.css` file located in the
    `org.wso2.identity.styles_<version-name>.jar/web/styles/css/`
    directory.
3.  To specify a new product banner, change the
    `background-image` attribute of
    `org.wso2.identity.styles_<version-name>.jar/web/styles/css/main.css`
    file as follows:

    ``` java
    /* ---------------- header styles ------------------ */
    div#header-div {
        background-image: url( ../images/newproduct-header-bg.png);
        height:70px;
    }
    ```

!!! note
    
    The size of the images you use will affect the overall UI of
    your product. 
    
    For example, if the height of the product logo image
    exceeds 28 pixels, you must adjust the `          main.css         `
    file in the
    `          org.wso2.identity.styles_<version-name>.jar/web/styles/css/         `
    directory to ensure that the other UI elements of your product aligns
    with the product logo.
    
---

## Start the server

In the preceding steps, you have done the changes to the product
interface after copying the JAR files to a separate location on your
hard drive. Therefore, before you start your production server, these
files must be correctly copied back to your production environment as
explained below.

1.  Compress the contents of the
    `           org.wso2.carbon.ui_<version-number>.jar          ` and
    `           org.wso2.identity.styles_<product-version>.jar          `
    folders into separate ZIP files.
2.  Change the name of the ZIP file to
    `           org.wso2.carbon.ui_<version-number>.jar          ` and
    `           org.wso2.identity.styles_<version-number>.jar `
    respectively.
3.  Copy two new JAR files to the 
    `<IS_HOME>/repository/components/plugins/` directory in
    your product installation.
4.  Start the server.
