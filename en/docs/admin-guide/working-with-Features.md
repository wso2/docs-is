# Working with Features

!!! warning
    
    **Important!**
    
    Note that **WSO2 does not recommend** installing new features on
    standard products as this practice is not supported by WSO2 Update
    Manager (WUM). Use the instructions below only for the purpose of demo
    or test.
    

Each enterprise middleware product is a collection of reusable software
units called features. Similarly, WSO2 Carbon consists of a collection
of features where a single feature is a list of components and/or other
features. A component of the Carbon platform is a single OSGi bundle or
a collection of bundles. Similar to a standard JAR file in Java, a
bundle is the modularization unit in OSGi.

Components in the Carbon platform add functionality to Carbon-based
products. For example, the statistics component enables users to monitor
system and service-level statistics. This component contains two
bundles: One is the back-end bundle that collects, summarizes and stores
statistics. The other is the front-end bundle, that presents the data to
the user through a user-friendly interface.

Equinox P2 is integrated with WSO2 Carbon, which allows users to
download WSO2 Carbon or any other WSO2 product and simply extend them by
installing various features. The WSO2 Feature Repository consists of
features that are bundled into WSO2 products (based on a particular
Carbon release). The feature repository for WSO2 products based on
Carbon 4.4.x versions is
<http://product-dist.wso2.com/p2/carbon/releases/wilkes/> .

-   [Installing features from the management
    console](#WorkingwithFeatures-Installingfeaturesfromthemanagementconsole)
-   [Installing features using pom
    files](#WorkingwithFeatures-pom_approachInstallingfeaturesusingpomfiles)
-   [Uninstalling features (using the management
    console)](#WorkingwithFeatures-Uninstallingfeatures(usingthemanagementconsole))
-   [Recovering from unsuccessful feature
    installation](#WorkingwithFeatures-Recoveringfromunsuccessfulfeatureinstallation)
    -   [Reverting using the management
        console](#WorkingwithFeatures-Revertingusingthemanagementconsole)
    -   [Reverting using the command
        line](#WorkingwithFeatures-Revertingusingthecommandline)

  

### Installing features from the management console

Note the following, when you use the **management console** to install a
new feature:

-   Features will only be installed in the default profile. Features can
    be installed into other profiles, only using the [POM-based
    approach](#WorkingwithFeatures-pom_approach) .

-   You need to start the server after installing new features from the
    management console, which will create logs, local indices (solr) and
    entries in the database. Further, any available webapps will also
    get deployed. If you want to deploy the installed feature in a
    clustered environment, these data should first be cleared. It is not
    required to restart the server if you use the [POM-based
    approach](#WorkingwithFeatures-pom_approach) . You can use maven to
    install the feature, then directly take the pack (in which the
    required feature is installed), and deploy it in the cluster.

-   In the [POM-based approach](#WorkingwithFeatures-pom_approach) , you
    will have the list of features and the corresponding versions of the
    features that are installed. You can easily use this to refer what
    has been installed in the pack.

-   If you are on Windows, be sure to point the
    `           -Dcarbon.home          ` property in the product's
    startup script ( `           wso2server.bat          ` ) to the
    product's distribution home (e.g.,
    `           -Dcarbon.home=C:\Users\VM\Desktop\wso2as-5.2.1          `
    ). Alternatively, you can also set the
    `           carbon.home          ` as a system property in Windows.
    Then, restart the server. Without this setting, you might not be
    able to install features through the management console.

Follow the instructions below:

1.  Log in to the product's management console.
2.  On the **Configure** menu, click **Features**. The **Feature
    Management** page will appear.
3.  Click **Available Features**.
4.  Select a relevant repository. You can add the
    <http://product-dist.wso2.com/p2/carbon/releases/wilkes/>
    repository to get the WSO2 product features of the Carbon 4.4.x
    platform (Wilkes). If no repositories have been added, or the
    required repository is not available, add a new repository.

    To add a new repository:

    1.  Go to the **Configure** menu on the management console, and
        click **Features**.
    2.  Go to the **Repository Management** tab, and click **Add
        Repository**.
    3.  Provide a convenient name for the repository being added.
    4.  Enter the repository location using one of the following
        methods:  
        1.  **URL** : This option is used when you are adding an
            external repository.  
            -   Select the **URL** option.
            -   Enter the Equinox P2 repository URL.

        2.  **Location** : This option is used when you are adding a
            repository that you have downloaded to your computer.  
            -   Select the **Local** option.
            -   Enter the directory path of the repository on your local
                machine.
    5.  Click **Add**. The newly added repository will appear in the
        list of available repositories.

    Once you have added the new repository, go back to the **Available
    Features** tab to find the required features.

5.  Some repositories contain multiple versions of features. If you are
    only interested in the latest versions, click **Show only the latest
    versions**.
6.  A feature category is a logical grouping of the features that
    constitute a particular Carbon-based product. Selecting the **Group
    features by category** option enables you to easily view and select
    the entire list of features of a particular product at once. If you
    do not select this option when looking for features, you will see an
    uncategorized, flat feature list from which individual features can
    be selected separately.
7.  Click **Find Features**. The available features will be listed.
8.  Select the features you wish to install.

    To find a particular feature, you can use the search function. Enter
    the name of a feature (or a part of the name) and press **Enter**
    .  
    ![](attachments/53125432/85387849.png) This search will return only
    available features; excluding the ones already installed.

9.  Click **Install**.
10. Verify the feature to be installed and click **Next**.
11. Read and accept the terms of the license agreement.
12. Click **Next**. The installation process starts. It may take a few
    minutes to download the necessary components.
13. Once the installation process is complete, click **Finish**.
14. Restart the server for the changes to take effect. Based on the
    newly added features, you will be able to see the additional
    functionalities.

### Installing features using pom files

When you are using the **pom-based approach** , be sure that
[Maven3](http://maven.apache.org/ref/3.0/) and
[Ant](http://ant.apache.org/) are installed in your system.

Following are the steps to create a new feature installed distribution
using a POM file:

1.  Copy the sample `           pom.xml          ` file given below to a
    directory on your machine.

    ``` java
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>org.wso2.sample</groupId>
        <artifactId>sample-feature-installation</artifactId>
        <version>1.0.0</version>
        <packaging>pom</packaging>
        <name>New feature</name>
        <url>http://wso2.org</url>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.wso2.maven</groupId>
                    <artifactId>carbon-p2-plugin</artifactId>
                    <version>1.5.4</version>
                    <executions>
                        <execution>
                            <id>feature-install</id>
                            <phase>package</phase>
                            <goals>
                                <goal>p2-profile-gen</goal>
                            </goals>
                            <configuration>
                                <profile>default</profile>
                                <metadataRepository>file:p2-repo</metadataRepository>
                                <artifactRepository>file:p2-repo</artifactRepository>
                                <destination>$distribution_name/repository/components</destination>
                                <deleteOldProfileFiles>false</deleteOldProfileFiles>
                                <features>
                                    <feature>
                                        <id>org.wso2.carbon.tryit.feature.group</id>
                                        <version>4.3.0</version>
                                    </feature>
                                </features>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-antrun-plugin</artifactId>
                    <version>1.1</version>
                    <executions>
                        <execution>
                            <phase>package</phase>
                            <configuration>
                                <tasks>
                                    <replace token="false" value="true" dir="$distribution_name/repository/components/default/configuration/org.eclipse.equinox.simpleconfigurator">
                                        <include name="**/bundles.info"/>
                                    </replace>
                                </tasks>
                            </configuration>
                            <goals>
                                <goal>run</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
        <repositories>
            <repository>
                <id>wso2-nexus</id>
                <name>WSO2 internal Repository</name>
                <url>http://maven.wso2.org/nexus/content/groups/wso2-public/</url>
                <releases>
                    <enabled>true</enabled>
                    <updatePolicy>daily</updatePolicy>
                    <checksumPolicy>ignore</checksumPolicy>
                </releases>
            </repository>
        </repositories>
        <pluginRepositories>
            <pluginRepository>
                <id>wso2-maven-releases-repository</id>
                <url>http://maven.wso2.org/nexus/content/repositories/releases/</url>
            </pluginRepository>
            <pluginRepository>
                <id>wso2-maven-snapshots-repository</id>
                <url>http://maven.wso2.org/nexus/content/repositories/snapshots/</url>
            </pluginRepository>
        </pluginRepositories>
    </project>
    ```

    Read more about the following plugins:

    -   [maven-antrun-plugin](http://maven.apache.org/plugins/maven-antrun-plugin/)
    -   [Carbon P2
        plugin](https://docs.wso2.com/display/Carbon4411/Using+the+Carbon+P2+Plugin)

2.  The above sample `          pom.xml         ` file specifies
    the default product profile (
    `          <profile>                     default                    </profile>         `
    ) and the corresponding directory path ( `          dir="         `
    `          $distribution_name/repository/components/                     default                    /configuration/org.eclipse.equinox.simpleconfigurator         `
    `          ">         ` ). If your product is running on a different
    profile, you need to update the profile name. Read more about
    profiles from
    [here](https://docs.wso2.com/display/Carbon4411/Creating+New+Server+Profiles)
    .
3.  Unzip the original product distribution (e.g.,
    `          wso2carbon-<version>.zip         ` ) and copy it to the
    same location as your `          pom.xml         ` file.
4.  Replace `          $distribution_name         ` in the
    `          pom.xml         ` file with the name of the unzipped
    product distribution (e.g., wso2carbon-\<version\>). Note that if
    your product distribution is not in the same location as your
    `          pom.xml         ` file, you can replace
    `          $distribution_name         ` with the complete path
    to your product distribution.  
5.  Now you need to specify the p2 repository from which the required
    features should be installed. This can be done in of two ways:
    1.  Copy the relevant p2 repository to the same directory location
        as the `            pom.xml           ` file. Note that your p2
        repository can be a local repository, or a download of the WSO2
        feature repository (e.g.,
        [http://product-dist.wso2.com/p2/carbon/releases/wilkes/](http://www.google.com/url?q=http%3A%2F%2Fproduct-dist.wso2.com%2Fp2%2Fcarbon%2Freleases%2Fwilkes%2F&sa=D&sntz=1&usg=AFQjCNGv1MEz9ke9kFGXz43VaETLFI7v2w)
        ).
    2.  Replace `             file:p2-repo            ` in the
        `             pom.xml            ` file with the direct link to
        the required p2 repository. For example, shown below is how the
        direct link to the **Wilkes** p2 repository of WSO2 is given in
        the `             pom.xml            ` file:  

        ``` java
                <metadataRepository>http://product-dist.wso2.com/p2/carbon/releases/wilkes/</metadataRepository>
                <artifactRepository>http://product-dist.wso2.com/p2/carbon/releases/wilkes/</artifactRepository>
        ```

6.  In the `           pom.xml          ` file, list down the features
    you want to install into your product. For example, consider the
    **Try It** feature in the **Wilkes** repository of WSO2. The feature
    name given in the Wilkes repository is
    `           org.wso2.carbon.tryit_4.5.4          ` . Therefore, you
    can add the feature ID and version to your
    `           pom.xml          ` file as shown below. Note that the
    feature ID should end with ' `           feature.group          ` '.

    ``` java
        <feature> 
           <id>org.wso2.carbon.tryit.feature.group</id> 
           <version>4.5.4/version> 
        </feature>
    ```

7.  Now let's add the feature to the product distribution: Open a
    terminal, navigate to the location of your
    `           pom.xml          ` file and execute the following
    command:

    ``` java
        mvn clean install
    ```

    Upon successful invocation of the build, the product distribution is
    provisioned with the new features. This approach is scriptable.

### Uninstalling features (using the management console)

You can uninstall features from the management console, by following the
steps given below.

1.  Log in to the product's management console.
2.  Go to the **Configure** menu, and click **Features**. The **Feature
    Management** page will appear.
3.  Click **Installed Features.** The **Installed Features** page allows
    you to browse through the list of installed features.
4.  Select the features that you need to uninstall. If you wish to
    uninstall all the features, click **Select all in this page**.
5.  Click **Uninstall**. A page will appear containing details of the
    features to be uninstalled.
6.  Verify the information and click **Next**. If the feature is
    successfully removed, a success message will appear.

    If there are other features that depend on the feature that needs to
    be uninstalled, those dependent sub features need to be uninstalled
    first, before attempting to uninstall the main feature.

7.  Click **Finish** and restart the server to apply the changes.

### Recovering from unsuccessful feature installation

After installing features, if you encounter server issues or startup
failures, you can revert the current configuration by restoring a
previous one using either the management console or the command line.
The latter is recommended if you cannot start the server.

Use the following steps to check your feature installation history and
revert the server back to a previous installation. In this recovery
process, some features might get installed and some uninstalled.

#### Reverting using the management console

1.  Log in to the management console.
2.  Go to the **Configure** menu, and click **Features**.
3.  Click on the **Installation History** tab **.** The **Installation
    History** page appears. See the example below.  
    ![](attachments/53125432/85387850.png){width="900"}
4.  Select the configuration to which you wish to revert.  
5.  Click **Revert** , to revert the current configuration to a previous
    configuration.

#### Reverting using the command line

If you cannot start the server after an unsuccessful feature
installation, use the following steps to revert to a previous
installation:

1.  Start your product with the `           -DosgiConsole          `
    system property.
2.  Once the server is started, type the following command:  
    `            osgi> getInstallationHistory                       `  
    You will get the following list of statuses:

    ``` java
        1376883697814 August 19, 2013 at 09:11:37 IST
        1376883697957 August 19, 2013 at 09:11:37 IST
        1376883700725 August 19, 2013 at 09:11:40 IST
        1376883701385 August 19, 2013 at 09:11:41 IST
        1376883704884 August 19, 2013 at 09:11:44 IST
        1376883712770 August 19, 2013 at 09:11:52 IST
        1376883715952 August 19, 2013 at 09:11:55 IST
        1376883743493 August 19, 2013 at 09:12:23 IST
        1376933879416 August 19, 2013 at 23:07:59 IST
        1376940017503 August 20, 2013 at 00:50:17 IST
    ```

3.  Check what features are installed and uninstalled them, in a given
    state, by entering the following command:  
    `            osgi> getInstallationHistory <timestamp>           `

    For example:  
    `            osgi> getInstallationHistory 1376933879416           `  
      
    The output will be as follows:

    ``` java
        -- Installed features in this configuration
    
        -- Uninstalled features in this configuration
        WSO2 Carbon - Service Management Feature 4.2.0
        WSO2 Stratos - Deployment Features 2.2.0
        WSO2 Stratos - Common Composite Feature 2.2.0
        WSO2 Stratos - Usage Agent Feature 2.2.0
        WSO2 Stratos - Throttling Agent Feature 2.2.0
        WSO2 Stratos AppServer - Dashboard UI Features 2.2.0
        WSO2 Stratos AppServer - Dashboard UI Features 2.2.0
    ```

4.  Decide the status to which you need to revert the system, and
    thereafter use the following command:  
    `            osgi> revert <timestamp>           `  
      
    For example:  
    `            osgi> revert 1376933879416                       `  
    The output will be as follows:

    ``` java
        Successfully reverted to 1376933879416
        Changes will get applied once you restart the server.
    ```
