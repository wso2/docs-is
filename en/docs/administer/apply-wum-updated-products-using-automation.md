# Apply WUM-Updated Products Using Automation

After you generate a WUM-updated distribution, the next step is to apply
those updates to your environment.

In this method, you replac the product distribution that is currently
running in your environment by the new WUM-updated distribution using an
automation tool such as Puppet, Chef, or Ansible:

1.  You update the tool with all the product configurations.
2.  The tool applies the configurations to the WUM-updated distribution
    before pushing it into your environment.
3.  If you have customized artifacts in your current environment, you
    apply them manually to the new distribution.

    If you are using a deployment synchronization tool to manage your
    customized artifacts, you can merge the configurations using a
    script. WSO2 provides default scripts if your deployment
    synchronization tool is SVN. You can use these default scripts to
    develop new scripts to support any other tool as well.

Let's get started!

-   [Step 1: Generate the WUM-updated
    distribution](#ApplyWUM-UpdatedProductsUsingAutomation-Step1:GeneratetheWUM-updateddistribution)
-   [Step 2: Sign the WUM-updated
    distribution](#ApplyWUM-UpdatedProductsUsingAutomation-Step2:SigntheWUM-updateddistribution)
-   [Step 3: Apply the customized
    artifacts](#ApplyWUM-UpdatedProductsUsingAutomation-Step3:Applythecustomizedartifacts)
-   [Step 4: Apply the
    configurations](#ApplyWUM-UpdatedProductsUsingAutomation-Step4:Applytheconfigurations)
-   [Step 5: Deploy the WUM-updated
    distribution](#ApplyWUM-UpdatedProductsUsingAutomation-Step5:DeploytheWUM-updateddistribution)

### Step 1: Generate the WUM-updated distribution

See [Updating WSO2
Products](https://docs.wso2.com/display/ADMIN44x/Updating+WSO2+Products)
to get the latest WUM-updated product distribution to your local product
repository (i.e., `         wum-wso2/products        ` directory), if
you do not have one already.

  

### Step 2: Sign the WUM-updated distribution

Do you have **Java Security Manager** in your environment? If so, follow
the instructions in [Enabling Java Security Manager](../../setup/enabling-java-security-manager) to sign your 
latest WUM-updated product distribution.

### Step 3: Apply the customized artifacts

!!! note
    
    This step is only required if there are customized artifacts in your
    current environment.
    

If there are customized artifacts in your existing product distribution,
you need to merge them to the latest WUM-updated distribution.

This is done by comparing the deployment directory in your environment (
`         <PRODUCT_HOME>/repository/deployment/server        `
directory) with the same directory in your [latest WUM-updated product
distribution](#ApplyWUM-UpdatedProductsUsingAutomation-wum-updated-packs)
. If there is a difference in the artifacts found in the two
distributions, it means that you have customized artifacts in your
current environment. These customized artifacts can now be applied to
the latest WUM-updated distribution. If you are using a deployment
synchronization tool to manage the artifacts in your environment, you
can easily use automation scripts to apply the artifacts to the
WUM-updated distribution. WSO2 provides two default scripts for this
purpose:

-   **Merge script:** This script will merge the deployment directory of
    the WUM-updated distribution to a clone of the deployment directory
    in your tool.
-   **Deployment script:** This script will commit the updates from the
    clone to the deployment directory in your tool. WSO2 provides a
    deployment script for SVN-based deployment synchronization. If you
    are using a different tool, you need to develop a separate
    deployment script for this purpose. However, remember to increase
    the deployment time interval in your existing product nodes before
    running this script as explained
    [below](#ApplyWUM-UpdatedProductsUsingAutomation-before-deploying).

Let's start!

**Before you begin**, be sure to increase the deployment time interval
(for an hour or two) of all the product nodes that are already in
production. This is to make sure that the updates committed to the
deployment directory in your deployment synchronization tool will not be
applied to the current production environment before the new product
distribution is deployed. To increase the deployment time interval:

1.  Open the `            carbon.xml           ` file (stored in the
    `            <PRODUCT_HOME>/repository/conf           ` directory)
    and update the following property:

    ``` java
    <DeploymentUpdateInterval>15</DeploymentUpdateInterval>
    ```

2.  Restart all the server nodes in production.

1.  Unpack the [previous WUM-updated
    distribution](#ApplyWUM-UpdatedProductsUsingAutomation-wum-updated-packs)
    . Note that this is the distribution that is currently applied in
    production.
2.  Unpack the [latest WUM-updated
    distribution](#ApplyWUM-UpdatedProductsUsingAutomation-wum-updated-packs)
    .
3.  Clone the customized artifacts that are in the deployment directory
    ( `          <PRODUCT_HOME>/repository/deployment/server         `
    directory) that is used in production:
    -   If you are using svn dep-sync, you can directly get a checkout
        from the SVN server.
    -   If you are using Volume Mount or RSync, you can clone the
        relevant directory.
    -   If your configuration management tool (such as Puppet, Chef, or
        Ansible) is managing your customizations, you need to clone the
        deployment directory from the configuration management tool.
4.  Download the [merge script](../assets/img/72429776/76750720.sh) (
    `           merge_v1.s          ` h) and run it as explained below.

    !!! note
    
        **Before you run the script:**
    
        -   Be sure that the two distributions you unpacked in [step
            1](#ApplyWUM-UpdatedProductsUsingAutomation-step1) and [step
            2](#ApplyWUM-UpdatedProductsUsingAutomation-step2) are **NOT**
            started.
        -   Install the **diff** and **GNU patch** tools required by the
            command prompt (terminal) you use.
    

    -   For **Linux**, directly run the script in the terminal.
    -   For **Windows**, use one of the following methods:  
        -   Use git bash.

        -   Use cygwin with the diff and patch tool installed.

    When you run the script, you will be asked to provide the following
    information:

    -   The path to the deployment directory in your previous
        WUM-updated distribution, which you unpacked in [step
        1](#ApplyWUM-UpdatedProductsUsingAutomation-step1) above.

    -   The path to the deployment directory in your latest WUM-updated
        product distribution, which you unpacked in [step
        2](#ApplyWUM-UpdatedProductsUsingAutomation-step2) above.

    -   The path to the deployment directory that is currently in
        production, which you cloned in [step
        3](#ApplyWUM-UpdatedProductsUsingAutomation-step3) above.

5.  Check the output of the script log. You will be able to identify one
    of the following situations:

    -   Successfully updated the files: There will be a log, but you do
        not need to do anything.

    -   Updated with fuzz: You need to review these files before running
        the deployment script. There will be a backup of the original
        file created at the same location.

    -   Conflicts between files: If there are conflicts when updating
        the files, there will be a “.diff” file, and a backup of an
        original file, created at the location of those files along with
        the updated content. You need to manually update those files.

    -   Updated binary files: If there are updated binary files (.png,
        .war files), the updated files will be directly copied and a
        backup file of the original file will be created at the same
        location. You need to review those and delete the original or
        updated file.

6.  If the merge is successful, you will be asked if you want to deploy
    the updates in the deployment directory of your tool that manages
    the customizations. Select **Yes** and provide the location of your
    **deployment script**. If you are using SVN-based deployment
    synchronization, you can use the [deployment script for
    SVN](../assets/img/72429776/76750721.sh) (
    `           deploy_v1.sh          ` ).

    -   If any errors are indicated when the merge script is run, you
        will **not** be asked to provide the deployment script. You must
        first resolve the errors and then run the deployment script
        separately.

    -   In the merge script, we are passing the updated directory path
        to the deployment script as an argument. Therefore, if you are
        writing a script for your deployment synchronizer, you can use
        the same argument and implement your script.

7.  Be sure to check the **update summary PDF** of the latest
    WUM-updated distribution. There may be instructions to manually
    update the contents of the deployment directory. For example, you
    may need to manually delete directories
    inside the webapps directory.

    The **update summary PDF** is sent to you as an email. You can also
    find it inside the updated ZIP. For example,
    wso2am-2.1.0.1497355516179.zip/wso2am-2.1.0/updates/summary-2017-06-16T12-38-27/update-summary-1497355516179.pdf.

Your deployment synchronization tool now has all the customized
artifacts merged with the updates. These customizations will be pushed
to your WUM-updated distribution (by the deployment synchronization
tool) when the [deployment update
interval](#ApplyWUM-UpdatedProductsUsingAutomation-before-deploying)
expires.

### Step 4: Apply the configurations

**Before you begin,** check the updated summary PDF of the latest
WUM-updated distribution to identify any new configurations. For
example, consider the following instructions in the update summary:

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
update summary PDF

![Screen Shot 2017-06-26 at 10.13.47
PM.png](https://lh5.googleusercontent.com/2Vt0YZ7kl3EEMl1IelyJd90_KzntRvcxZ6bzxQhcSLjt6bhHJuiPad3mif__Di_gT5r3YJabyWIoJGjMt8hb9cm8wj_LoQOz6_F4wOaaeeYrv6Q861xSbMV3lQ_ebeT9K400pFR4){width="624"
height="404"}

Now, you can apply the configurations to your configuration management
tool:

1.  Add your latest WUM-updated product distribution to the correct
    location in your configuration management tool. For example, if you
    are using Puppet, you need to place the updated ZIP file inside the
    `           <PUPPET_HOME>/environments/production/modules/wso2am_runtime/files          `
    directory.

2.  Make sure that all the configurations are updated in your
    configuration management tool. These include the configurations that
    already existed in your environment as well as the new/changed
    configurations introduced by the WUM updates. For example, according
    to the update summary shown above, you need to add a new
    configuration to the
    `           <PRODUCT_HOME>/repository/conf/identity/application-authentication.xml          `
    file. If you are using Puppet, you need to add this configuration to
    the relevant hiera files with the correct configuration elements and
    placeholders. See the [instructions for
    Puppet](https://github.com/wso2/puppet-base/wiki/Use-WSO2-Puppet-Modules-in-puppet-master-agent-Environment)
    .

Your configuration management tool will now have all the product
configurations.

!!! note
    
    Using installed features?
    
    If you have already followed the previous steps, your WUM-updated
    distribution should now be ready. However, if you are currently using a
    product with additional features installed, you may need to make sure
    that those WSO2 features are installed in the new product distribution
    along with the relevant patches, before the new distribution is pushed
    to your environment. If you have installed the same new features that
    were installed in your previous product distribution, you will already
    have the patches for those features.
    
    Please note that WSO2 **does not** recommend the practice of adding new
    features to standard products. See [Working with
    Features](../../administer/working-with-features) for more information.
    

### Step 5: Deploy the WUM-updated distribution

Now, you can deploy the WUM-updated distribution in your environment.

1.  Run your configuration management tool. If you are using Puppet,
    note that a new product distribution with all the updates and
    configurations will be generated and pushed into your environment.

2.  The customized artifacts will be pushed to the new distribution
    directly from the deployment synchronization tool as explained in
    step 3 above.

The WUM-updated product distribution is now deployed in your
environment. Note that all the customized artifacts that you merged in
the previous step will be automatically deployed to your new product
nodes through the deployment synchronization tool.
