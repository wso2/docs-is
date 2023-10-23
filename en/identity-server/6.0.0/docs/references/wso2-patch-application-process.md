# WSO2 Patch Application Process

!!! note WSO2 has introduced the
	[WSO2 Update Manger (WUM)](https://wso2.com/updates/wum), which is a
	command-line tool that allows you to update your product with the latest
	available patches and enhancements. All WSO2 products based on Carbon
	4.5.x are supported by WUM. Go to the
	[WUM website](https://wso2.com/updates/wum) to see if your product
	version is currently supported. You can follow the instructions in
	Updating your WSO2 product to get the patch updates using WUM. Note that
	WUM does not allow you to pick and choose the patches that you apply.
	Therefore, if you want to apply a selected patch to your product, you
	must use the following patch application process.
    
The patch application process described below guides you on how to
manually apply patches, such as [security
patches](http://wso2.com/security-patch-releases/), to Carbon
4.5.x-based products (if your product version is currently not supported
by WUM).

---

## What is a patch?

The following diagram depicts the contents of a patch archive that is
provided by WSO2. The patch archive name indicates the WSO2 Carbon
Kernel version and the patch number. In this example, the Kernel version
is 4.5.0 and the patch number is 1341. Inside the patch archive there is
a README.txt file that includes the guidelines on how to apply the
patch. Some patches (as in the example given below) might have a
**resources** directory that contain artifacts, such as web apps,
library files, configurations, scripts and more.

**Example:**

` WSO2-CARBON-PATCH-4.5.0-1341 `

`           ├── LICENSE.txt          `

`           ├── NOT_A_CONTRIBUTION.txt          `

`           ├── patch1341          `

`           │   ├── org.wso2.carbon.identity.core_5.14.97.jar          `


├── README.txt

`           └── resources          `

    `           └── webapps          `
    
    `               └── api#identity#oauth2#v1.0.war          `

---

## Apply patches to the product

!!! info "Before You Begin"

        -   It is mandatory to follow the steps specified in the README.txt of
        the patch before applying the patch.
        -   If the README.txt provides instructions to replace existing
        resources in the WSO2 Identity Server with any artifact in the resources
        directory of the patch archive, it is highly recommended to backup
        the existing resources. The original files might be required if you
        are [reverting the
        patch](#remove-patches) later.  
        -   As a precaution, make a backup of the server.

Follow the steps given below to apply patches to your server.

1.  Shut down the server.
2.  Copy the patches (patchxxx directory in the patch archive) to the
    `           <IS_HOME>/repository/components/patches          `
    directory. **Note** that you may sometimes need to apply the patches
    one by one in order to avoid conflicts. Check the README.txt files
    carefully for these instructions.  

3.  If the resources directory in the patch archive contains artifacts,
    copy them to the appropriate location in your server as instructed
    in the README.txt file. Note that this will replace the already
    existing artifacts.
4.  Start the WSO2 server. The patches will then be incrementally
    applied to the
    `           <IS_HOME>/repository/components/plugins/          `
    directory.  

    !!! note
        When you start the server, the process first creates a backup folder
        named `           patch0000          ` inside the
        `           <IS_HOME>/repository/components/patches/          `
        directory, which will contain the original content of the
        `           <IS_HOME>/repository/components/plugins/          `
        directory. This step enables you to [revert back to the previous
        state](#remove-patches) if something
        goes wrong during operations.
    
---

## Verify the patch application

After the patch application process is completed, the patch verification
process ensures that the latest patches are correctly applied to the
`         <IS_HOME>/repository/components/plugins/        ` folder.

1.  Compare the md5sum of each component in the patchXXXX directory
    against the same component in the
    `           <           IS_HOME>/repository/components/plugins          `
    directory.

2.  The artifacts (from the resources directory) of the latest patch
    version that were copied to various locations of the server must
    contain the same md5sum as the artifact in the resources directory
    of the patch.
3.  You can use the following resources to track the patches:  
    -   All patch-related logs are recorded in the
        `            <IS_HOME>/repository/logs/                         patches.log            `
        file.
    -   The
        `            <IS_HOME>/repository/components/patches/.metadata/prePatchedJARs.txt           `
        meta file contains the list of patched JARs and the md5 values.
    -   The patch directory information of all the applied patched will
        be in the
        `             <IS_HOME>/repository/components/default/configuration/prePatchedDir.txt            `
        file.  

        !!! warning
                Do not change the data in the
                `             <IS_HOME>/repository/components/default/configuration/prePatchedDir.txt            `
                file. The patch application process gets the pre-patched list
                from this file and compares the list with the patches available
                in the `             patch            ` directory. If you change
                the data in this file, you will get a startup error when
                applying patches.
        
---

## Remove patches

Patches installed in your WSO2 product using the above steps can also be
removed when required. However, this needs to be done with caution as
explained below.

!!! info "Before removing an installed patch"
        -   Shut down the server.
        -   Make a backup as a precaution.
        -   Read the `           README.txt          ` file that is included in
        the patch ZIP. This file will specify if there are other patches
        that depend on the patch you are going to remove. You must also
        identify if there are manual steps to roll back.

To remove a patch:

1.  Remove the patch from the `          <         `
    `          IS_HOME>/repository/components/patches         `
    directory.
2.  If there were artifacts copied from the resources directory of the
    patch archive, you need to replace them with the original artifacts
    (from the [backup](#apply-patches-to-the-product) that was
    created before applying the patch). Also if there were exploded
    artifacts (such as \*.war files in the
    `          <IS_HOME>/repository/deployment/server/webapps         `
    directory), be sure to remove them as well.  
3.  Restart the server. The remaining patches will now be reinstalled.  

    !!! info     
		The `            patches.log           ` file in the
		`            <IS_HOME>/repository/logs           ` directory indicates
		the patches that are applied to the server.
