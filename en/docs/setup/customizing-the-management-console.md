# Customizing the Management Console

The Management Console user interface (
`                     https://localhost:9443/carbon                   `
) of a Carbon product consists of two layers:

1.  **UI inherited from WSO2 Carbon platform** contains the templates,
    styles (css files), and images that are stored in the core Carbon UI
    bundle stored in
    `           <PRODUCT_HOME>/repository/components/plugins/          `
    `           org.wso2.carbon.ui_<version-number>.jar          ` where
    `           <version-number>          ` is the version of the Carbon
    kernel that the product is built on. This bundle is responsible for
    the overall look and feel of the entire Carbon platform.
2.  **UI unique to each product** contains all the styles and images
    that override the ones in core Carbon platform. This file is in
    `                       <PRODUCT_HOME>/repository/components/plugins/           `
    org.wso2.\<product-name\>.styles\_\<version-number\>.jar where
    `           <version-number>          ` is the version of the
    product.

The following topics explain how to download a Carbon product and
customize its user interface.

### Setting up the development environment

To download and set up the product environment for editing, take the
following steps.

1.  Download your product.
2.  Extract the ZIP file into a separate folder in your hard drive.
3.  Go to the
    `           <PRODUCT_HOME>/repository/components/plugins/          `
    directory to find the required JAR files:
    -   `             org.wso2.carbon.ui_<version-number>.jar            `
    -   `             org.wso2.<product-name>.styles_<version-number>.jar            `
4.  Copy the JAR files to a separate location on your hard drive. Since
    the JAR files are zipped, you must unzip them to make them editable.

You can now customize the look and feel of your product by modifying the
contents of the JAR files as described in the next section.

### Customizing the user interface

Customizing the product interface involves changing the layout/design of
the Carbon framework as well as changing the styles and images specific
to the product. The following topics explain how some of the main
changes to the product interface can be done.

#### Changing the layout

The layout of the Carbon framework is built using a tiles JSP tag
library. The use of tiles allows us to break the presentation of the
layout into small JSP snippets that perform a specific function. For
example, `          header.jsp         ` and
`          footer.jsp         ` are the tiles corresponding to the
header and footer in the layout. The `          template.jsp         `
file controls the main layout page of the Carbon framework, which holds
all the tiles together. That is, the header part in the
`          template.jsp         ` file is replaced with the
`          <tiles:insertAttribute name="header"/>         ` tag, which
refers to the `          header.jsp         ` file. The
`          template.jsp         ` file as well as the JSP files
corresponding to the tiles are located in the
`          org.wso2.<product-name>.styles_<version-name>.jar/web/admin/layout/         `
directory.

Therefore, changing the layout of your product primarily involves
changing the `          template.jsp         ` page (main layout page)
and the JSP files of the relevant JSP tiles.

!!! note
    
    Ensure that you do not change or remove the ID attributes on the
    `          .jsp         ` files.
    

#### Changing the styles on the Carbon framework

The `          global.css         ` file, which determines the styles of
the Carbon framework, is located in the
`          org.wso2.carbon.ui_<version-name>.jar/web/admin/css/         `
directory. You can edit this file as per your requirement.
Alternatively, you can apply a completely new stylesheet to your
framework instead of the default `          global.css         `
stylesheet.

To apply a new style sheet to the carbon framework:

1.  Copy your new CSS file to this same location.
2.  Open the `           template.jsp          ` file located in the
    `           org.wso2.carbon.ui_<version-name>.jar/web/admin/layout/          `
    directory, which contains the main layout of the page and the
    default JavaScript libraries.
3.  Replace `            global.css           ` with the new style sheet
    by pointing the `            String globalCSS           ` attribute
    to the new stylesheet file.

    ``` java
    //Customization of UI theming per tenant
        String tenantDomain = null;
        String globalCSS = "../admin/css/global.css";
        String mainCSS = "";
    ```

#### Changing the product specific styles and images

The styles and images unique to your product are located in the
`          org.wso2.<product-name>.styles_<version-number>.jar         `
folder. To modify product specific styles and images, take the following
steps.

1.  Copy the necessary images to the
    `           org.wso2.<product-name>.styles_<version-number>.jar/web/styles/images/          `
    directory. For example, if you want to change the product banner,
    add the new image file to this directory.
2.  Open the `           main.css          ` file located in the
    `           org.wso2.<product-name>.styles_<version-name>.jar/web/styles/css/          `
    directory.
3.  To specify a new product banner, change the
    `            background-image           ` attribute of
    `            org.wso2.<product-name>.styles_<version-name>.jar/web/styles/css/            main.css           `
    file as follows:

    ``` java
        /* ---------------- header styles ------------------ */
        div#header-div {
            background-image: url( ../images/newproduct-header-bg.png);
            height:70px;
        }
    ```

!!! note
    
    Note that the size of the images you use will affect the overall UI of
    your product. For example, if the height of the product logo image
    exceeds 28 pixels, you must adjust the `          main.css         `
    file in the
    `          org.wso2.<product-name>.styles_<version-name>.jar/web/styles/css/         `
    directory to ensure that the other UI elements of your product aligns
    with the product logo.
    

### Starting the server

In the preceding steps, you have done the changes to the product
interface after copying the JAR files to a separate location on your
hard drive. Therefore, before you start your production server, these
files must be correctly copied back to your production environment as
explained below.

1.  Compress the contents of the
    `           org.wso2.carbon.ui_<version-number>.jar          ` and
    `           org.wso2.<product-name>.styles_<product-version>.jar          `
    folders into separate ZIP files.
2.  Change the name of the ZIP file to
    `           org.wso2.carbon.ui_<version-number>.jar          ` and
    `           org.wso2.<product-name>.styles_<version-number>.jar          `
    respectively.
3.  Copy these two new JAR files to the
    `           <PRODUCT_HOME>          ` /
    `           repository/components/plugins/          ` directory in
    your product installation.
4.  Start the server.
