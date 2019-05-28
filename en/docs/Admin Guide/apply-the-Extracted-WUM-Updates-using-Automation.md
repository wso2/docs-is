# Apply the Extracted WUM Updates using Automation

After you generate a WUM-updated distribution, the next step is to apply
those updates to your environment. Assuming that a previous WUM-updated
distribution is currently running in your environment, let's see how to
apply the updates using a configuration management tools such as Puppet,
Chef, or Ansible.

**If you have customized artifacts** in your current environment, they
need to be manually merged into the WUM-updated distribution. You also
need to identify the artifacts/files in the existing product
distribution that have become redundant due to the updates and remove
them from the distribution.

This method does not replace the existing distribution but extract the
new/changed files and apply them to the distribution that is already in
your environment.

Let's get started!

-   [Step 1: Generate the WUM-updated
    distribution](#ApplytheExtractedWUMUpdatesusingAutomation-Step1:GeneratetheWUM-updateddistribution)
-   [Step 2: Generate ZIP file with WUM
    updates](#ApplytheExtractedWUMUpdatesusingAutomation-Step2:GenerateZIPfilewithWUMupdates)
-   [Step 3: Verify the
    updates](#ApplytheExtractedWUMUpdatesusingAutomation-Step3:Verifytheupdates)
-   [Step 4: Apply the
    updates](#ApplytheExtractedWUMUpdatesusingAutomation-Step4:Applytheupdates)
    -   [Apply the updated configurations and binary
        files](#ApplytheExtractedWUMUpdatesusingAutomation-Applytheupdatedconfigurationsandbinaryfiles)
    -   [Apply the updated Jaggery
        files](#ApplytheExtractedWUMUpdatesusingAutomation-ApplytheupdatedJaggeryfiles)
    -   [Remove redundant artifacts and
        files](#ApplytheExtractedWUMUpdatesusingAutomation-Removeredundantartifactsandfiles)
-   [Step 5: Deploy the
    updates](#ApplytheExtractedWUMUpdatesusingAutomation-Step5:Deploytheupdates)
-   [Step 6: Applying patches for installed
    features](#ApplytheExtractedWUMUpdatesusingAutomation-Step6:Applyingpatchesforinstalledfeatures)
    -   [Update the /patches
        directory](#ApplytheExtractedWUMUpdatesusingAutomation-Updatethe/patchesdirectory)
    -   [Apply new patches for installed
        features](#ApplytheExtractedWUMUpdatesusingAutomation-Applynewpatchesforinstalledfeatures)

### Step 1: Generate the WUM-updated distribution

See Getting Started with WUM for instructions on how to get the latest
updates for your current product distribution using WUM. When you
complete the update, your local product repository (
`         wum-wso2/products        ` directory) should have the latest
WUM-updated distribution.

### Step 2: Generate ZIP file with WUM updates

Shown below is your local product repository, which contains the latest
WUM-updated distribution and the previous WUM-updated distribution.
Let's assume that the `         Previous        `
`         WUM-updated        ` distribution listed below is currently
used in your environment.

/home/\<user\>/.wum-wso2/products/wso2am/2.1.0

├── wso2am-2.1.0.1497951882188.zip - **Latest WUM-updated distribution**

├── wso2am-2.1.0.1497355516179.zip - Previous WUM-updated distribution

└── wso2am-2.1.0.zip - Vanilla pack (Original product pack that was
downloaded from the [WSO2 website](http://wso2.com/platform) )

Now, you need to extract the updates in the latest WUM-updated
distribution and apply those to the product distribution in your
environment. You can generate this ZIP file using a single WUM command:

1.  First, using your command line terminal, navigate to the location
    where you want the ZIP file with the WUM updates to be stored. Note
    that this ZIP will NOT be stored in your product repository.
2.  Execute the 'wum diff' command using the product distribution names
    as shown below.

    ``` java
    wum diff wso2am-2.1.0.1497951882188.zip wso2am-2.1.0.1497355516179.zip
    ```

The directory path to the generated ZIP file will be published on your
terminal. The summary of the updates included in the ZIP file will be
emailed to you, and the same information will be included in your ZIP
file as a PDF.

### Step 3: Verify the updates

When you generate the ZIP file, a **Diff Summary PDF** will also be
generated and emailed to you. For example, consider the following
instructions in the update summary:

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
update summary PDF

![Screen Shot 2017-06-26 at 10.13.47
PM.png](https://lh5.googleusercontent.com/2Vt0YZ7kl3EEMl1IelyJd90_KzntRvcxZ6bzxQhcSLjt6bhHJuiPad3mif__Di_gT5r3YJabyWIoJGjMt8hb9cm8wj_LoQOz6_F4wOaaeeYrv6Q861xSbMV3lQ_ebeT9K400pFR4){width="624"
height="404"}

Check this summary PDF document to identify the changes that you need to
manually apply to your existing product distribution.

-   Updated **binary files** .
-   Updated **configuration files** .
-   Updated **Jaggery artifacts** .  
-   Removed files and artifacts.

### Step 4: Apply the updates

Once you have verified the updates in the summary PDF, you can apply the
updates to your existing product distribution.

#### Apply the updated configurations and binary files

Now, you can apply the updated binary files and configuration files
using a configuration management tool such as Puppet, Chef or Ansible.

1.  Make sure that all the configurations are updated in your
    configuration management tool. This includes the configurations that
    already existed in your environment as well as the new/changed
    configurations introduced by the WUM updates. For example, if you
    are using Puppet, the hiera files will have the configurations of
    your environment. See the [instructions for
    Puppet](https://github.com/wso2/puppet-base/wiki/Use-WSO2-Puppet-Modules-in-puppet-master-agent-Environment)
    .

2.  Make sure that all the binary changes (introduced by the WUM
    updates) are updated in your configuration management tool.

#### Apply the updated Jaggery files

Follow the steps given below to apply the WUM-updated Jaggery files to
your existing product distribution. Note that you may have customized
the Jaggery files in your existing distribution. Therefore, it is
necessary to manually merge Jaggery files to avoid conflicts.

1.  Check the summary PDF to identify how the Jaggery files have changed
    by the WUM updates.
2.  Manually apply the changes to the same files in your existing
    product distribution.

#### Remove redundant artifacts and files

If there are artifacts/files that are removed by the WUM updates,
**remove** those files from the existing product distribution.

### Step 5: Deploy the updates

Run your configuration management tool. The tool will push the
configurations and binaries into the product distribution that is in
your environment.

All the updates are now moved to your existing product distribution.

### Step 6: Applying patches for installed features

!!! note
    
    This step is necessary, **only** if you are already using additional
    WSO2 features in your product. Please note that WSO2 **does not**
    recommend the practice of adding new features to standard products. See
    [Working with Features](_Working_with_Features_) for more information.
    

If you successfully completed the steps given above, you have now
extracted the WUM updates and applied them to the existing product
distribution in your environment. However, if you have additional WSO2
features installed in your product, you may need to follow the
additional steps given below.

#### Update the `         /patches        ` directory

The patches that are already applied to your product distribution will
be included in the
`         <PRODUCT_HOME>/repository/components/patches/        `
directory. Also, note that the patches directory will have a copy of all
artifacts from the
`         <PRODUCT_HOME>/repository/components/plugins/        `
directory. See the [WSO2 Patch Application
Process](https://docs.wso2.com/display/ADMIN44x/WSO2+Patch+Application+Process)
for more information.

This means that if any of the artifacts in the
`         <PRODUCT_HOME>/repository/components/plugins/        `
directory has been replaced by the WUM updates, you need to replace the
same artifacts in the
`         <PRODUCT_HOME>/repository/components/patches/        `
directory as well.

#### Apply new patches for installed features

You may already have the patches related to the installed features
applied to your product. However, if there are new patches available for
the installed features, you need to obtain them from WSO2 and apply them
as well. Follow the instructions in the [WSO2 Patch Application
Process](https://docs.wso2.com/display/ADMIN44x/WSO2+Patch+Application+Process)
to apply new patches.
