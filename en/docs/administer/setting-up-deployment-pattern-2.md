# Setting Up Deployment Pattern 2

This page guides you through setting up deployment pattern 2, which is a
HA clustered deployment of WSO2 Identity Server with WSO2 Identity
Analytics. For more information about deployment pattern 2 and its high
level architecture, see [Deployment Patterns - Pattern
2](Deployment-Patterns_103329471.html#DeploymentPatterns-Pattern2-HAclustereddeploymentofWSO2IdentityServerwithWSO2IdentityAnalytics)
.

You can install multiple instances of WSO2 products in a cluster to
ensure that if one instance becomes unavailable or is experiencing high
traffic, another instance will seamlessly handle the requests. For
complete information on clustering concepts, see [Clustering Overview in
the Common Product Administration
Guide](https://docs.wso2.com/display/ADMIN44x/Clustering+Overview)
[.](https://docs.wso2.com/display/CLUSTER44x/WSO2+Clustering+and+Deployment+Guide)

Creating a cluster of [WSO2 Identity
Server](http://wso2.com/products/identity-server/) instances involves a
standard two node cluster for high availability. To ensure that the
instances share governance registry artifacts, you must create a JDBC
mount.

At a high level, use the following options to cluster Identity Server
with a minimum of two nodes. The first section includes instructions on
setting up databases. The second section involves setting up a standard
two node cluster, the third section involves setting up the Identity
Server dashboard in a clustered environment and the third section
includes additional configurations if you need to set up a load balancer
to front your cluster.

-   [Configuring the user
    store](#SettingUpDeploymentPattern2-Configuringtheuserstore)
-   [Configuring the
    datasources](#SettingUpDeploymentPattern2-Configuringthedatasources)
-   [Mounting the
    registry](#SettingUpDeploymentPattern2-Mountingtheregistry)
-   [Clustering Identity Server for high
    availability](#SettingUpDeploymentPattern2-ClusteringIdentityServerforhighavailability)
-   [Changing hostnames and
    ports](#SettingUpDeploymentPattern2-Changinghostnamesandports)
-   [Enabling artifact
    synchronization](#SettingUpDeploymentPattern2-Enablingartifactsynchronization)
-   [Setting up the
    dashboard](#SettingUpDeploymentPattern2-Settingupthedashboard)
-   [Fronting with a load balancer
    (Nginx)](#SettingUpDeploymentPattern2-Frontingwithaloadbalancer(Nginx))
    -   [Configuring
        Nginx](#SettingUpDeploymentPattern2-ConfiguringNginx)
    -   [Create SSL
        certificates](#SettingUpDeploymentPattern2-CreateSSLcertificates)
    -   [Configure the Proxy Port in IS
        Nodes](#SettingUpDeploymentPattern2-ConfiguretheProxyPortinISNodes)
-   [Running the
    cluster](#SettingUpDeploymentPattern2-Runningthecluster)
-   [Starting up and verifying product
    nodes](#SettingUpDeploymentPattern2-Startingupandverifyingproductnodes)
-   [Minimum High Availability Deployment for WSO2 IS
    Analytics](#SettingUpDeploymentPattern2-MinimumHighAvailabilityDeploymentforWSO2ISAnalytics)
-   [Prerequisites](#SettingUpDeploymentPattern2-Prerequisites)
-   [Required
    configurations](#SettingUpDeploymentPattern2-ConfigurationRequiredconfigurations)
-   [Starting the
    cluster](#SettingUpDeploymentPattern2-Startingthecluster)
-   [Testing the HA
    deployment](#SettingUpDeploymentPattern2-TestingtheHAdeployment)

### Configuring the user store

WSO2 products allow you to configure multiple user stores to store your
users and their roles. Your user store can be one of the following:

-   A Directory Service that can communicate over LDAP protocol like
    OpenLDAP

-   Active Directory

-   A database that can communicate over JDBC

1.  Set up a user store named **WSO2UserStore.**

    !!! tip
    
        **Note:** The instructions in this tutorial demonstrate configuring
        a JDBC user store. Point all cluster nodes to the same user store in
        the `            master-datasources.xml           ` and
        `            user-mgt.xml           ` file.
    
        See [Configuring User
        Stores](https://docs.wso2.com/display/IS580/Configuring+User+Stores)
        for more information on how to set up other types of user stores.
    

2.  Copy the JDBC driver (in this case MySQL driver) to the
    `            <IS_HOME>/repository/component/lib           `
    directory of both nodes. To do this, download the MySQL Java
    connector JAR from
    [here](http://dev.mysql.com/downloads/connector/j) and place it in
    the `            <IS_HOME>/repository/components/lib           `
    directory.

3.  By default, WSO2 Identity Server is started with an embedded LDAP
    which comes with the product. Disable the embedded LDAP of node 2 by
    modifying **embedded-ldap.xml** which can be found in the
    `            <IS_HOME>/repository/conf/identity           `
    directory.

    ``` html/xml
    <EmbeddedLDAP>
        <Property name="enable">false</Property>
    <--------------------->
    <EmbeddedLDAP>
    ```

------------------------------------------------------------------------

### Configuring the datasources

1.  Create the databases. See [Setting up the Physical
    Database](../../administer/setting-up-the-physical-database)
    in the WSO2 Administration Guide for db scripts and more
    information.  
    This tutorial demonstrates deployment with a user management
    database ( `            WSO2UMDB           ` ) and an identity
    database ( `            IDENTITYDB)           ` .

    !!! tip
    
        Alternatively, you can create more databases for each type of data
        to separate the data logically. Note that this will NOT make a
        difference in performance and is not actually neccessary.
    
        However, if you do wish to separate the data logically into separate
        databases, see the [Setting Up Separate Databases for
        Clustering](https://docs.wso2.com/display/IS580/Setting+Up+Separate+Databases+for+Clustering)
        topic.
    

2.  Configure the datasource for the databases in both nodes of your
    cluster in the **master-datasources.xml** file found in the
    `            <IS_HOME>/repository/conf/datasources           `
    folder.  
      
    The code block below shows a sample configuration of the user
    mangement database and identity database for a mysql database. For
    instructions on how to configure the datasource depending on the
    type of database you created, see [Changing the Carbon
    Database](https://docs.wso2.com/display/ADMIN44x/Changing+the+Carbon+Database)
    in the WSO2 Product Administration Guide.

    **Sample configuration of master-datasources.xml**

    ``` xml
     <datasources>
        <datasource>
            <name>WSO2_CARBON_DB</name>
            <description>The datasource used for registry and user manager</description>
            <jndiConfig>
                <name>jdbc/WSO2CarbonDB</name>
            </jndiConfig>
            <definition type="RDBMS">
                <configuration>
                    <url>jdbc:h2:./repository/database/WSO2CARBON_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000</url>
                    <username>wso2carbon</username>
                    <password>wso2carbon</password>
                    <driverClassName>org.h2.Driver</driverClassName>
                    <maxActive>50</maxActive>
                    <maxWait>60000</maxWait>
                    <testOnBorrow>true</testOnBorrow>
                    <validationQuery>SELECT 1</validationQuery>
                    <validationInterval>30000</validationInterval>
                    <defaultAutoCommit>false</defaultAutoCommit>
                </configuration>
            </definition>
        </datasource>
        <datasource>
            <name>WSO2UserStore</name>
            <description>The User Store</description>
            <jndiConfig>
                <name>jdbc/WSO2UserStore</name>
            </jndiConfig>
            <definition type="RDBMS">
                <configuration>
                    <url>jdbc:mysql://wso2is-pattern1-mysql-service:3306/WSO2UMDB?autoReconnect=true&amp;useSSL=false</url>
                    <username>wso2carbon</username>
                    <password>wso2carbon</password>
                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                    <maxActive>80</maxActive>
                    <maxWait>60000</maxWait>
                    <minIdle>5</minIdle>
                    <testOnBorrow>true</testOnBorrow>
                    <validationQuery>SELECT 1</validationQuery>
                    <validationInterval>30000</validationInterval>
                    <defaultAutoCommit>false</defaultAutoCommit>
                </configuration>
            </definition>
        </datasource>
        <datasource>
            <name>WSO2_IDENTITY_DB</name>
            <description>The datasource used for registry, user management and identity</description>
            <jndiConfig>
                <name>jdbc/WSO2IdentityDS</name>
            </jndiConfig>
            <definition type="RDBMS">
                <configuration>
                    <url>jdbc:mysql://wso2is-pattern1-mysql-service:3306/WSO2_IDENTITY_DB?autoReconnect=true&amp;useSSL=false</url>
                    <username>wso2carbon</username>
                    <password>wso2carbon</password>
                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                    <maxActive>80</maxActive>
                    <maxWait>60000</maxWait>
                    <minIdle>5</minIdle>
                    <testOnBorrow>true</testOnBorrow>
                    <validationQuery>SELECT 1</validationQuery>
                    <validationInterval>30000</validationInterval>
                    <defaultAutoCommit>false</defaultAutoCommit>
                </configuration>
            </definition>
        </datasource>
    </datasources>
    ```

    **Sample configuration of bps-datasources.xml**

    ``` xml
        <datasource>
            <name>BPS_DS</name>
            <description></description>
            <jndiConfig>
                <name>bpsds</name>
            </jndiConfig>
            <definition type="RDBMS">
                <configuration>
                    <url>jdbc:mysql://wso2is-pattern1-mysql-service:3306/WSO2_IDENTITY_DB autoReconnect=true&amp;verifyServerCertificate=false&amp;useSSL=true</url>
                    <username>wso2carbon</username>
                    <password>wso2carbon</password>
                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                    <maxActive>100</maxActive>
                    <maxWait>10000</maxWait>
                    <maxIdle>20</maxIdle>
                    <testOnBorrow>true</testOnBorrow>
                    <validationQuery>SELECT 1</validationQuery>
                    <validationInterval>30000</validationInterval>
                    <useDataSourceFactory>false</useDataSourceFactory>
                    <defaultAutoCommit>false</defaultAutoCommit>
                </configuration>
            </definition>
        </datasource>
    ```

------------------------------------------------------------------------

### Mounting the registry

Mount the governance and configuration registry in the
`          registry.xml         ` file found in the
`          <IS_HOME>/repository/conf         ` folder to share the
registry across all nodes in the cluster. The code block below shows a
sample configuration.

For more information on mounting the registry, see [Sharing Databases in
a
Cluster](https://docs.wso2.com/display/ADMIN44x/Sharing+Databases+in+a+Cluster)
.

**Sample configuration of registry.xml**

``` xml
<dbConfig name="sharedregistry">
    <dataSource>jdbc/WSO2IdentityDS</dataSource>
</dbConfig>
<remoteInstance url="https://localhost:9443/registry">
    <id>sharedregistry</id>
    <dbConfig>sharedregistry</dbConfig>
    <readOnly>false</readOnly>
    <registryRoot>/</registryRoot>
    <enableCache>true</enableCache>
    <cacheId>jdbc:mysql://wso2is-pattern1-mysql-service:3306/WSO2_IDENTITY_DB</cacheId>
</remoteInstance>
<mount path="/_system/config" overwrite="true">
    <instanceId>sharedregistry</instanceId>
    <targetPath>/_system/config</targetPath>
</mount>
<mount path="/_system/governance" overwrite="true">
    <instanceId>sharedregistry</instanceId>
    <targetPath>/_system/governance</targetPath>
</mount>
```

!!! tip
    
    **Note:** The production recommendation is to set the
    `          <versionResourcesOnChange>         ` property in the
    `          registry.xml         ` file to **false**. This is because
    automatic versioning of resources can be an extremely expensive
    operation.
    
    ``` java
    <versionResourcesOnChange>false</versionResourcesOnChange>
```


In the registry browser, verify that the governance collection is shown
with the symlink icon.

1.  Log in to the management console.
2.  Navigate to **Home \> Registry \> Browse**.  
    ![](attachments/103329476/103329488.png)

------------------------------------------------------------------------

### Clustering Identity Server for high availability

Follow the instructions below to cluster WSO2 Identity Server.

1.  Install Identity Server on each node.
2.  Do the following changes to the
    `            <IS_HOME>/repository/conf/axis2/axis2.xml           `
    file for both nodes.

    1.  Enable clustering on node 1 and node 2 by setting the clustering
        element to true:
        `                            <clustering class="              org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent              " enable="true">             `

    2.  `              Specify the name of the cluster this node will join.                            <parameter name="domain">                             wso2.is                            .domain</parameter>             `

    3.  Use the well knownaddress(WKA) based clustering method. In
        WKA-based clustering, we need to have a subset of cluster
        members configured in all the members of the cluster. At least
        one well knownmemberhas to be operational at all times.  
        `              <             `
        `              parameter             `
        `              name             ` `              =             `
        `              "membershipScheme"             `
        `              >wka</             `
        `              parameter             `
        `              >             `

    4.  Configure the `              localMemberHost             ` and
        `              localMemberPort             ` entries. These must
        be different port values for the two nodes if they are on the
        same server to prevent any conflicts.

        `              <             `
        `              parameter             `
        `              name             ` `              =             `
        `              "localMemberHost"             `
        `              >127.0.0.1</             `
        `              parameter             `
        `              >             `

        `              <             `
        `              parameter             `
        `              name             ` `              =             `
        `              "localMemberPort"             `
        `              >4000</             `
        `              parameter             `
        `              >             `

    5.  Under the `              members             ` section, add the
        `              hostName             ` and
        `              port             ` for each WKA member. As we
        have only two nodes in our sample cluster configuration, we will
        configure both nodes as WKA nodes.

        ``` xml
        <members>
            <member>
              <hostName>127.0.0.1</hostName>
              <port>4000</port>
            </member>
            <member>
              <hostName>127.0.0.2</hostName>
              <port>4010</port>
            </member>
        </members>
        ```

        !!! note
        
                **Note** : You can also use IP address ranges for the
                `              hostName             ` . For example,
                192.168.1.2-10. This should ensure that the cluster eventually
                recovers after failures. One shortcoming of doing this is that
                you can define a range only for the last portion of the IP
                address. You should also keep in mind that the smaller the
                range, the faster the time it takes to discover members since
                each node has to scan a lesser number of potential members.
        
                  
        

3.  All the caches are considered to be local caches in Identity Server
    by default. However, for clustered nodes enable local cache
    invalidation by setting the **ForceLocalCache** property within the
    `            <cache>           ` section in the
    `            carbon.xml           ` file in
    `            <IS_HOME>/repository/conf/           ` to
    `            true           ` .

    ``` java
    <ForceLocalCache>true</ForceLocalCache>
    ```

4.  Configure the following.
    1.  Change the datasource name to
        `              jdbc/WSO2UMDB             ` in **user-mgt.xml**
        (located in
        `              <IS_HOME>/repository/conf/             ` ). This
        refers to the user store you configured in the [Configuring the
        user
        store](https://docs.wso2.com/display/IS541/Setting+Up+Deployment+Pattern+1#SettingUpDeploymentPattern1-Configuringtheuserstore)
        section above.

        **user-mgt.xml**

        ``` html/xml
                <UserManager>
                  <Realm>
                  <Configuration>
                  ...
                  <Property name="dataSource">jdbc/WSO2CarbonDB</Property>
                  </Configuration>
                  ...
                  </Realm>
                </UserManager>
        ```

    2.  Change the datasource name to
        `              jdbc/WSO2IDENTITYDB             ` in
        **identity.xml** (located in
        `              <IS_HOME>/repository/conf/identity             `
        ) of both node1 and node2. This refers to the datasource
        [Configuring the
        datasources](#SettingUpDeploymentPattern2-Configuringthedatasources)
        section above.

        **identity.xml**

        ``` html/xml
                <JDBCPersistenceManager>
                     <DataSource>
                        <Name>jdbc/WSO2IDENTITYDB</Name>
                     </DataSource>
                             <!-- <SkipDBSchemaCreation>false</SkipDBSchemaCreation> -->
                </JDBCPersistenceManager>
        ```

------------------------------------------------------------------------

### Changing hostnames and ports

Configure the Identity Server node 1 using the following steps.

1.  Go to the
    `            <IS_HOME>/repository/conf/tomcat/catalina-server.xml           `
    file and add the proxy port as 443.

    ``` xml
        <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
                  port="9443"
                  proxyPort="443"
                  ........
    
        <!--
                optional attributes:
    
                proxyPort="80"
        -->
    
        <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
                  port="9763"
                  proxyPort="80"
    ```

    !!! tip
    
        **Tip:** If you are using an Openshift Docker container for the
        deployment, do the following.
    
        Add the following `            Tomcat           `
        `            RemoteIPValve           ` to the
        `            <IS_HOME>/repository/conf/tomcat/catalina-server.xml           `
        file.
    
        ``` java
            <Valve
              className="org.apache.catalina.valves.RemoteIpValve"
              internalProxies="reg_ex_for_internal_docker_IPs"
              remoteIpHeader="x-forwarded-for"
              proxiesHeader="x-forwarded-by"
              protocolHeader="x-forwarded-proto"
            />
    ```


2.  In the `            <IS_HOME>/repository/conf/carbon.xml           `
    directory, define the hostname for your server.

    ``` html/xml
    <HostName>wso2.is.com</HostName>

    <MgtHostName>wso2.is.com</MgtHostName>
    ```

    This hostname is used by the IS cluster. It must be specified in the
    `            /etc/hosts           ` file as:

    `            127.0.0.1   wso2.is.com           `

Follow all the configuration steps that were done in node 1 for node 2
as well.

------------------------------------------------------------------------

### Enabling artifact synchronization

To enable synchronization for runtime artifacts you must have a shared
file system. You can use one of the following depending on your
environment.

-   **Network File System (NFS)** : This is one of the most commonly
    known shared file system and can be used in a linux environment.
-   **Server Message Block (SMB) file system** : This can be used in a
    Windows environment.
-   **Amazon EFS** : This can be used in an AWS environment.

1.  Once you have chosen a file system, mount it in the nodes that are
    participating in the cluster.
2.  Next, create two directories called "Deployment" and "Tenants" in
    the shared file system.
3.  Create a symlink from the
    `           <IS_HOME>/repository/deployment          ` path to the
    "Deployment" directory of the shared file system that you created in
    step 2 of this section.
4.  Create a symlink from the
    `            <IS_HOME>/repository/tenants           ` path to the
    "Tenants" directory of the shared file system that you created in
    step 2 of this section.

    Instead of mounting the file system directly to the
    `             <IS_HOME>/repository/deployment            ` and
    `             <IS_HOME>/repository/tenants            ` paths, a
    symlink is created to avoid issues that may occur if you delete the
    product to redeploy it; in which case the file system would get
    mounted to a non existing path.

------------------------------------------------------------------------

### Setting up the dashboard

Follow the steps given below to set up the dashboard for the WSO2
Identity Server in a clustered environment.

1.  Change the service provider configuration for the dashboard in the
    `            <           `
    `            IS_HOME>/repository/conf/identity/sso-idp-config.xml           `
    file.

    ``` java
        <AssertionConsumerServiceURLs><AssertionConsumerServiceURL>https://is.wso2.com/dashboard/acs</AssertionConsumerServiceURL></AssertionConsumerServiceURLs>
        <DefaultAssertionConsumerServiceURL>https://is.wso2.com/dashboard/acs</DefaultAssertionConsumerServiceURL>
    ```

2.  Configure the `            proxyHost           ` and
    `            proxyHTTPSPort           ` in the
    `            <IS_HOME>/repository/deployment/server/jaggeryapps/dashboard/conf/site.json           `
    file with your IP or hostname and the port.

    ``` java
        "proxyHost" : "is.wso2.com",
        "proxyHTTPSPort" : "443",
    ```

3.  Configure the `            proxyHos           ` t and
    `            proxyHTTPSPort           ` in the
    `            <WSO2IS_HOME>/repository/deployment/server/webapps/shindig/WEB-INF/web.xml           `
    file with your IP or hostname and the port.

    ``` java
        shindig.host=is.wso2.com
        shindig.port=443
    ```

4.  Optionally, configure the
    `            <IS_HOME>repository/conf/datasources/master-datasources.xml           `
    file to set up the user dashboard.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to view a sample datasource configuration.

    ``` java
        <datasources-configuration xmlns:svns="http://org.wso2.securevault/configuration">
           <providers>
              <provider>org.wso2.carbon.ndatasource.rdbms.RDBMSDataSourceReader</provider>
           </providers>
           <datasources>
              <datasource>
                 <name>USER_DB</name>
                 <description>The datasource used for users and authorization management</description>
                 <jndiConfig>
                    <name>jdbc/UserDB</name>
                 </jndiConfig>
                 <definition type="RDBMS">
                    <configuration>
                       <url>jdbc:mysql://localhost:3306/USER_DB</url>
                       <username>root</username>
                       <password>root</password>
                       <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                       <maxActive>50</maxActive>
                       <maxWait>60000</maxWait>
                       <testOnBorrow>true</testOnBorrow>
                       <validationQuery>SELECT 1</validationQuery>
                       <validationInterval>30000</validationInterval>
                    </configuration>
                 </definition>
              </datasource>
              <datasource>
                 <name>IDENTITY_DB</name>
                 <description>The datasource used for WSO2 Identity Server specific data management</description>
                 <jndiConfig>
                    <name>jdbc/IdentityDB</name>
                 </jndiConfig>
                 <definition type="RDBMS">
                    <configuration>
                       <url>jdbc:mysql://localhost:3306/IDENTITY_DB</url>
                       <username>root</username>
                       <password>root</password>
                       <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                       <maxActive>50</maxActive>
                       <maxWait>60000</maxWait>
                       <testOnBorrow>true</testOnBorrow>
                       <validationQuery>SELECT 1</validationQuery>
                       <validationInterval>30000</validationInterval>
                    </configuration>
                 </definition>
              </datasource>
              <datasource>
                 <name>REG_DB</name>
                 <description>The datasource used for registry- config/governance</description>
                 <jndiConfig>
                    <name>jdbc/RegistryDB</name>
                 </jndiConfig>
                 <definition type="RDBMS">
                    <configuration>
                       <url>jdbc:mysql://localhost:3306/REG_DB?autoReconnect=true</url>
                       <username>root</username>
                       <password>root</password>
                       <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                       <maxActive>50</maxActive>
                       <maxWait>60000</maxWait>
                       <testOnBorrow>true</testOnBorrow>
                       <validationQuery>SELECT 1</validationQuery>
                       <validationInterval>30000</validationInterval>
                    </configuration>
                 </definition>
              </datasource>
              <datasource>
                 <name>LOCAL_REG_DB_1</name>
                 <description>The datasource used for local registry</description>
                 <jndiConfig>
                    <name>jdbc/WSO2CarbonDB</name>
                 </jndiConfig>
                 <definition type="RDBMS">
                    <configuration>
                       <url>jdbc:h2:repository/database/WSO2CARBON_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000</url>
                       <username>wso2carbon</username>
                       <password>wso2carbon</password>
                       <driverClassName>org.h2.Driver</driverClassName>
                       <maxActive>50</maxActive>
                       <maxWait>60000</maxWait>
                       <testOnBorrow>true</testOnBorrow>
                       <validationQuery>SELECT 1</validationQuery>
                       <validationInterval>30000</validationInterval>
                       <defaultAutoCommit>false</defaultAutoCommit>
                    </configuration>
                 </definition>
              </datasource>
           </datasources>
        </datasources-configuration>
    ```

------------------------------------------------------------------------

### Fronting with a load balancer (Nginx)

If you need to set up the above WSO2 Identity Server cluster with Nginx,
you can follow the instructions given below (you must do this **after**
setting up the cluster following the above instructions). When
clustering WSO2 Identity Server with a load balancer, you may need to
enable sticky sessions. This is required for the management console and
the dashboard to work and if we disable temporary session data
persistence in the
`          <IS_HOME>/repository/conf/identity/identity.xml         `
file. For more information on sticky sessions, see [Sticky Sessions with
Manager
Nodes](https://docs.wso2.com/display/CLUSTER44x/Sticky+Sessions+with+Manager+Nodes)
. The following is the deployment diagram with the load balancer.

![](attachments/103329476/103329481.png) 

#### Configuring Nginx

Use the following steps to configure [NGINX
Plus](https://www.nginx.com/products/) version 1.7.11 or
[nginx community](http://nginx.org/) version 1.9.2 as the load balancer
for WSO2 products. (In these steps, we refer to both versions
collectively as "Nginx".)

1.  Install Nginx (NGINX Plus or nginx community) in a server configured
    in your cluster.
2.  Configure Nginx to direct the HTTP requests to the two worker
    nodes via the HTTP 80 port using the
    `                         http://is.wso2.com/            >           `
    . To do this, create a VHost file (
    `            is.http.conf           ` ) in the
    `            /etc/nginx/conf.d           ` directory and add the
    following configurations into it.

    **Note:** Shown below is a general Nginx configuration. Click this
    link for more specific configuration with exposing various
    endpoints:

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Nginx
    configuration with exposing /oauth2, /commonauth, and other
    endpoints

    **Nginx configuration with exposing /oauth2, /commonauth, and other
    endpoints**

    ``` java
        upstream ssl.nginx.com {
            server 172.30.51.27:9443;  
            server x.x.x.x:9yyy  
          ip_hash; 
        }
    
        server {
            listen 443;
            server_name nginx.mybsf.org;   
            ssl on;
            ssl_certificate /home/centos/STAR_mybsf_org.crt; 
            ssl_certificate_key /home/centos/mybsforgdc.key;
    
            location /oauth2/token {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                
                proxy_pass  https://ssl.nginx.com/oauth2/token ;
                proxy_redirect https://172.30.51.27:9443/oauth2/token https://nginx.mybsf.org/oauth2/token ;
                proxy_redirect https://server x.x.x.x:9yyy/oauth2/token https://nginx.mybsf.org/oauth2/token ; 
            }
    
            location /commonauth {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/commonauth;
                proxy_redirect https://172.30.51.27:9443/commonauth https://nginx.mybsf.org/commonauth ;
                proxy_redirect https://server x.x.x.x:9yyy/commomnauth https://nginx.mybsf.org/commonauth;
            }
    
            location /oauth2/authorize {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/oauth2/authorize;
                proxy_redirect https://172.30.51.27:9443/oauth2/authorize https://nginx.mybsf.org/oauth2/authorize ;
                proxy_redirect https://server x.x.x.x:9yyy/oauth2/authorize https://nginx.mybsf.org/oauth2/ authorize;
            }
    
            location /authenticationendpoint/ {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/authenticationendpoint/;
                proxy_redirect https://172.30.51.27:9443/authenticationendpoint/ https://nginx.mybsf.org/authenticationendpoint/ ;
                proxy_redirect https://server x.x.x.x:9yyy/authenticationendpoint https://nginx.mybsf.org/ authenticationendpoint;
            }
    
            location /oauth2/userinfo {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/oauth2/userinfo;
                proxy_redirect https://172.30.51.27:9443/oauth2/userinfo https://nginx.mybsf.org/oauth2/userinfo ;
                proxy_redirect https://server x.x.x.x:9yyy/oauth2/userinfo https://nginx.mybsf.org/oauth2/ userinfo;
            }
        }
    ```

    **HTTP configurations**

    ``` java
        upstream wso2.is.com {
                server xxx.xxx.xxx.xx3:9763;
                server xxx.xxx.xxx.xx4:9763;
        }
    
        server {
                listen 80;
                server_name is.wso2.com;
                location / {
                       proxy_set_header X-Forwarded-Host $host;
                       proxy_set_header X-Forwarded-Server $host;
                       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                       proxy_set_header Host $http_host;
                       proxy_read_timeout 5m;
                       proxy_send_timeout 5m;
                       proxy_pass http://wso2.is.com;
         
                       proxy_http_version 1.1;
                       proxy_set_header Upgrade $http_upgrade;
                       proxy_set_header Connection "upgrade";
                }
        }
    ```

3.  Now that you've configured HTTP requests, you must also configure
    HTTP **S** requests. Configure Nginx to direct the HTTPS requests to
    the two worker nodes via the HTTPS 443 port using
    `                         https://is.wso2.com/            >           `
    . To do this, create a VHost file (
    `            is.https.conf           ` ) in the
    `            /etc/nginx/conf.d           ` directory and add the
    following configurations into it.

    !!! note
    
        **Note** : The configurations for nginx community version and NGINX
        Plus are different here since the community version does not support
        the `            sticky           ` directive.
    

    -   [**nginx Community Version**](#786e4b7f66264e5ab0f9ae6e88053ddd)
    -   [**NGINX Plus**](#a151fb6cf821430987068b2005728016)

    ``` java
    upstream ssl.wso2.is.com {
        server xxx.xxx.xxx.xx3:9443;
        server xxx.xxx.xxx.xx4:9443;
        ip_hash;
    }
     
    server {
    listen 443;
        server_name is.wso2.com;
        ssl on;
        ssl_certificate /etc/nginx/ssl/wrk.crt;
        ssl_certificate_key /etc/nginx/ssl/wrk.key;
        location / {
                   proxy_set_header X-Forwarded-Host $host;
                   proxy_set_header X-Forwarded-Server $host;
                   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                   proxy_set_header Host $http_host;
                   proxy_read_timeout 5m;
                   proxy_send_timeout 5m;
                   proxy_pass https://ssl.wso2.is.com;
     
                   proxy_http_version 1.1;
                   proxy_set_header Upgrade $http_upgrade;
                   proxy_set_header Connection "upgrade";
            }
    }
    ```

    ``` java
        upstream ssl.wso2.is.com {
            server xxx.xxx.xxx.xx3:9443;
            server xxx.xxx.xxx.xx4:9443;
         
                    sticky learn create=$upstream_cookie_jsessionid
                    lookup=$cookie_jsessionid
                    zone=client_sessions:1m;
        }
    
        server {
        listen 443;
            server_name is.wso2.com;
            ssl on;
            ssl_certificate /etc/nginx/ssl/wrk.crt;
            ssl_certificate_key /etc/nginx/ssl/wrk.key;
            location / {
                       proxy_set_header X-Forwarded-Host $host;
                       proxy_set_header X-Forwarded-Server $host;
                       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                       proxy_set_header Host $http_host;
                       proxy_read_timeout 5m;
                       proxy_send_timeout 5m;
                       proxy_pass https://ssl.wso2.is.com;
         
                       proxy_http_version 1.1;
                       proxy_set_header Upgrade $http_upgrade;
                       proxy_set_header Connection "upgrade";
                }
        }
    ```

4.  Configure Nginx to access the Management Console as
    `            https://mgt.is.wso2.com/carbon           ` via HTTPS
    443 port. This is to direct requests to the manager node. To do
    this, create a VHost file (
    `            mgt.is.https.conf           ` ) in the
    `            /etc/nginx/conf.d           ` directory and add the
    following configurations into it.

    **Management Console configurations**

    ``` java
        server {
            listen 443;
            server_name mgt.is.wso2.com;
            ssl on;
            ssl_certificate /etc/nginx/ssl/mgt.crt;
            ssl_certificate_key /etc/nginx/ssl/mgt.key;
    
            location / {
                       proxy_set_header X-Forwarded-Host $host;
                       proxy_set_header X-Forwarded-Server $host;
                       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                       proxy_set_header Host $http_host;
                       proxy_read_timeout 5m;
                       proxy_send_timeout 5m;
                       proxy_pass https://xxx.xxx.xxx.xx2:9443/;
         
                       proxy_http_version 1.1;
                       proxy_set_header Upgrade $http_upgrade;
                       proxy_set_header Connection "upgrade";
                }
            error_log  /var/log/nginx/mgt-error.log ;
                   access_log  /var/log/nginx/mgt-access.log;
        }
    ```

5.  Reload the Nginx server.  
    `            $sudo service nginx reload                       `

    !!! tip
    
        If you have made modifications to anything other than the VHost
        files, you may need to restart the Nginx server instead of
        reloading:
    
        `            $sudo service nginx restart           `
    

#### Create SSL certificates

Create SSL certificates for both the manager and worker nodes using the
instructions that follow:

1.  Create the server key.  
    `           $sudo openssl genrsa -des3 -out server.key 1024          `
2.  Create the certificate signing request.  
    `           $sudo openssl req -new -key server.key -out server.csr          `
3.  Remove the password.  
    `           $sudo cp server.key                       server.key.org                     `  
    `           $sudo openssl rsa -in                       server.key.org                      -out server.key          `
4.  Sign your SSL certificate.  
    `           $sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt          `
5.  Execute the following command to import the created certificate file
    to the client truststore:

    ``` java
    keytool -import -trustcacerts -alias server -file server.crt -keystore client-truststore.jks
    ```

While creating keys, enter the host name (
`          is.wso2.com         ` or `          mgt.is.wso2.com         `
) as the common name.

#### Configure the Proxy Port in IS Nodes

By default, WSO2 Identity Server runs on 9443 port. The following steps
describe how you can configure a proxy port of 443.

1.  Open
    `            <IS_HOME>/repository/conf/tomcat/catalina-server.xml           `
    file and add the proxy port 443 in https connector as follows.

    ``` xml
        <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
            port="9443"
            proxyPort="443"   
    ```

    !!! note
    
        It is not possible to configure proxy port from load balancer itself
        since there is a post request while authenticating to IS Dashboard.
        So, If you are planning to use Identity server Dashboard, you must
        do this configuration. Below configurations are also needed if you
        are using the dashboard.
    

2.  Configure proxy port and host in
    `                <IS_HOME>/repository/deployment/server/jaggeryapps/dashboard/conf/site.json               `
    file as follows:

    ``` xml
    {
      "proxy":{
        "proxyHost":"nginx.mybsf.org" 
        "proxyHTTPSPort":"443", 
        "proxyContextPath":"", 
        "servicePath":"/services"
      }     
    }   
    ```

3.  Configure proxy port and host in
    `                <IS_HOME>/repository/deployment/server/jaggeryapps/portal/conf/site.json               `
    file as follows:

    ``` xml
        {
          "proxy":{
            "proxyHost":"nginx.mybsf.org" 
            "proxyHTTPSPort":"443", 
            "proxyContextPath":"" 
          },
          "fido":{
            "appId":""
          }     
        }
    ```

4.  Configure proxy port and host in
    `            <IS_HOME>/repository/deployment/server/webapps/shindig/WEB-INF/web.xml           `

    ``` xml
        <context-param>
            <param-name> system.properties </param-name>
            <param-value>
                <![CDATA[
            shindig.host= 
            shindig.port=443
            aKey=/shindig/gadgets/proxy?container=default&url=
            ]]>
    ```

------------------------------------------------------------------------

### Running the cluster

1.  Start Nginx and the Identity Server nodes.
2.  Now you can access the management console using the following
    URL: https://wso2.is.com/carbon/

------------------------------------------------------------------------

### Starting up and verifying product nodes

1.  If both nodes will be running on the same server, [set the port
    offset](http://docs.wso2.org/identity-server/Default+Ports+of+WSO2+Products)
    to avoid port conflicts.

2.  Start the nodes using the following command on both nodes.

    -   [**Linux/Unix**](#df86fc0c70a94dd39a44441e1c18c24e)
    -   [**Windows**](#07a6f48db8d1429d906a086bceac6dde)

    ``` java
        sh wso2server.sh
    ```

    ``` java
        .\wso2server.bat
    ```

  

### Minimum High Availability Deployment for WSO2 IS Analytics 

This section explains how to configure WSO2 Identity Server Analytics in
a distributed setup. You can configure alerts to monitor these APIs and
detect unusual activity, manage locations via geo location statistics
and to carry out detailed analysis of logs relating to the APIs. WSO2 IS
Analytics is powered by WSO2 DAS. The following diagram indicates the
minimum deployment pattern used for high availability.

![](attachments/103329489/103329493.png)

WSO2 Identity Server Analytics supports a deployment scenario that has
focus on high availability (HA) along with HA processing. To enable HA
processing, you should have two WSO2 IS Analytics servers in a cluster.

For this deployment, both nodes should be configured to receive all
events. To achieve this, clients can either send all the requests to
both the nodes or each request to any one of the two nodes (i.e., using
load balancing or failover mechanisms). If clients send all the requests
to both nodes, the user has to specify that events are duplicated in the
cluster (i.e., the same event comes to all the members of the cluster).
Alternatively, if a client sends a request to one node, internally it
sends that particular request to the other node as well. This way, even
if the clients send requests to only one node, both IS Analytics nodes
receive all the requests.

In this scenario, one IS Analytics node works in active mode and the
other works in passive mode. However, both nodes process all the data.

If the active node fails, the other node becomes active and receives all
the requests.

![](attachments/103329489/103329496.png) 

  

When the failed node is up again, it fetches  all the internal states of
the current active node via synching.

![](attachments/103329489/103329495.png) 

![](attachments/103329489/103329494.png) 

The newly arrived node then becomes the passive node and starts
processing all the incoming messages to keep its state synched with the
active node so that it can become active if the current active node
fails.

!!! warning
    
    **Warning** : Some of the requests may be lost during the time the
    passive node switches to the active mode.
    

### Prerequisites

Before you configure a minimum high availability IS Analytics cluster,
the following needs to be carried out.

1.  Download the WSO2 IS Analytics distribution. Click **DOWNLOAD
    ANALYTICS** in the [WSO2 Identity and Access Management
    page](https://wso2.com/identity-and-access-management#download).
2.  Take the following steps to install WSO2 IS Analytics. Sicne this
    procedure is identical to installing WSO2 Data Analytics Server
    (DAS), these steps take you to the DAS documentation for details.
    1.  Ensure that you have met the [Installation
        Prerequisites](http://docs.wso2.com/data-analytics-server/Getting%20Started)
        .
    2.  Go to the installation instructions relevant to your operating
        system:  
        -   [Installing on
            Linux](http://docs.wso2.com/data-analytics-server/Installing%20on%20Linux)
        -   [Installing on
            Windows](http://docs.wso2.com/data-analytics-server/Installing%20on%20Windows)
        -   [Installing as a Windows
            Service](http://docs.wso2.com/data-analytics-server/Installing%20as%20a%20Windows%20Service)
        -   [Installing as a Linux
            Service](http://docs.wso2.com/data-analytics-server/Installing%20as%20a%20Linux%20Service)
3.  Follow the steps below to set up MySQL.
    1.  Download and install [MySQL
        Server](http://dev.mysql.com/downloads/).

    2.  Download the [MySQL JDBC
        driver](http://dev.mysql.com/downloads/connector/j/).

    3.  Unzip the downloaded MySQL driver zipped archive, and copy the
        MySQL JDBC driver JAR (
        `             mysql-connector-java-x.x.xx-bin.jar            ` )
        into the
        `             <IS Analytics_HOME>/repository/components/lib            `
        directory of all the nodes in the cluster.

    4.  Enter the following command in a terminal/command window, where
        `            username           ` is the username you want to
        use to access the databases.  
        `            mysql -u username -p           `
    5.  When prompted, specify the password that will be used to access
        the databases with the username you specified.
    6.  Create two databases named `             userdb            ` and
        `             regdb.            `

        About using MySQL in different operating systems

        For users of Microsoft Windows, when creating the database in
        MySQL, it is important to specify the character set as latin1.
        Failure to do this may result in an error (error code: 1709)
        when starting your cluster. This error occurs in certain
        versions of MySQL (5.6.x) and is related to the UTF-8 encoding.
        MySQL originally used the latin1 character set by default, which
        stored characters in a 2-byte sequence. However, in recent
        versions, MySQL defaults to UTF-8 to be friendlier to
        international users. Hence, you must use latin1 as the character
        set as indicated below in the database creation commands to
        avoid this problem. Note that this may result in issues with
        non-latin characters (like Hebrew, Japanese, etc.). The
        following is how your database creation command should look.

            mysql> create database <DATABASE_NAME> character set latin1;

        For users of other operating systems, the standard database
        creation commands will suffice. For these operating systems, the
        following is how your database creation command should look.

            mysql> create database <DATABASE_NAME>;

    7.  Execute the following script for the two databases you created
        in the previous step.  
        `             mysql> source <IS Analytics_HOME>/dbscripts/mysql.sql;                         `

        !!! note
        
                From WSO2 Carbon Kernel 4.4.6 onwards there are two MySQL DB
                scripts available in the product distribution. Click
                [here](https://docs.wso2.com/display/ADMIN44x/Changing+to+MySQL#ChangingtoMySQL-mysqlnote)
                to identify as to which version of the MySQL script to use.
        

        ![](images/icons/grey_arrow_down.png){.expand-control-image}
        Click here to view the commands for performing steps f and g

        ``` java
        mysql> create database userdb;
        mysql> use userdb;
        mysql> source <IS Analytics_HOME>/dbscripts/mysql.sql;
        mysql> grant all on userdb.* TO username@localhost identified by "password";
         
         
        mysql> create database regdb;
        mysql> use regdb;
        mysql> source <IS Analytics_HOME>/dbscripts/mysql.sql;
        mysql> grant all on regdb.* TO username@localhost identified by "password";
        ```

    8.  Configure the datasource in the
        `             <IS Analytics_HOME>/repository/conf/analytics/analytics-conf.xml            `
        file as shown in the code extract below. As it is possible to
        maintain the data in one database, you can point all three
        datasources to a single database.  
        **  
        Alternatively,** if you want to separate the data logically,
        create the following two databases in MySQL and point to the
        respective database as shown in the extract below.

        -   `              WSO2_ANALYTICS_EVENT_STORE_DB             `
        -   `               WSO2_ANALYTICS_PROCESSED_DATA_STORE_DB              `

        ``` xml
                <analytics-record-store name="EVENT_STORE">
                   <implementation>org.wso2.carbon.analytics.datasource.rdbms.RDBMSAnalyticsRecordStore</implementation>
                   <properties>
                      <property name="datasource">WSO2_ANALYTICS_EVENT_STORE_DB</property>
                      <property name="category">read_write_optimized</property>
                   </properties>
                </analytics-record-store>
                <analytics-record-store name="EVENT_STORE_WO">
                   <implementation>org.wso2.carbon.analytics.datasource.rdbms.RDBMSAnalyticsRecordStore</implementation>
                   <properties>
                      <property name="datasource">WSO2_ANALYTICS_EVENT_STORE_DB</property>
                      <property name="category">write_optimized</property>
                   </properties>
                </analytics-record-store>
                <analytics-record-store name="PROCESSED_DATA_STORE">
                   <implementation>org.wso2.carbon.analytics.datasource.rdbms.RDBMSAnalyticsRecordStore</implementation>
                   <properties>
                      <property name="datasource">WSO2_ANALYTICS_PROCESSED_DATA_STORE_DB</property>
                      <property name="category">read_write_optimized</property>
                   </properties>
                </analytics-record-store>
        ```

### Required configurations

When configuring the minimum high availability cluster following setups
should be done for both nodes.

1.  Do the following database-related configurations.
    1.  Follow the steps below to configure the
        `             <IS Analytics_HOME>/repository/conf/datasources/master-datasources.xml            `
        file as required.

        !!! note
        
                Note that you can point all these datasources to a single
                database as it is not technically neccessary to separate the
                data into different databases. However, if required, you can
                have separate databases as well.  
                  
                The steps given below demonstrate the flow assuming you have
                created separate databases for each. If you are using a single
                database instead, simply point the datasources indicated below
                to a single database.
        

        1.  Enable all the nodes to access the users database by
            configuring a datasource to be used by user manager as shown
            below.

            ``` xml
            <datasource>
                <name>WSO2UM_DB</name>
                <description>The datasource used by user manager</description>
                <jndiConfig>  
                <name>jdbc/WSO2UM_DB</name>
                </jndiConfig>
                <definition type="RDBMS">
                <configuration>
                    <url>jdbc:mysql://[MySQL DB url]:[port]/userdb</url>
                    <username>[user]</username>
                    <password>[password]</password>
                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                    <maxActive>50</maxActive>
                    <maxWait>60000</maxWait>
                    <testOnBorrow>true</testOnBorrow>
                    <validationQuery>SELECT 1</validationQuery>
                    <validationInterval>30000</validationInterval>
                </configuration>
                </definition>
            </datasource>
            ```

        2.  Enable the nodes to access the registry database by
            configuring the `               WSO2REG_DB              `
            data source as follows.

            ``` xml
                        <datasource>
                            <name>WSO2REG_DB</name>
                            <description>The datasource used by the registry</description>
                            <jndiConfig>
                            <name>jdbc/WSO2REG_DB</name>
                            </jndiConfig>
                            <definition type="RDBMS">
                            <configuration>
                                <url>jdbc:mysql://[MySQL DB url]:[port]/regdb</url>
                                <username>[user]</username>
                                <password>[password]</password>
                                <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                                <maxActive>50</maxActive>
                                <maxWait>60000</maxWait>
                                <testOnBorrow>true</testOnBorrow>
                                <validationQuery>SELECT 1</validationQuery>
                                <validationInterval>30000</validationInterval>
                            </configuration>
                            </definition>
                        </datasource>
            ```

            For detailed information about registry sharing strategies,
            see the library article [Sharing Registry Space across
            Multiple Product
            Instances](http://wso2.com/library/tutorials/2010/04/sharing-registry-space-across-multiple-product-instances/)
            .

    2.  Point to your database
        `             WSO2_ANALYTICS_EVENT_STORE_DB            ` and
        `             WSO2_ANALYTICS_PROCESSED_DATA_STORE_DB            `
        in the
        `             <IS Analytics_HOME>/repository/conf/datasources/analytics-datasources.xml            `
        file as shown below.

        ``` xml
                <datasources-configuration>
                    <providers>
                        <provider>org.wso2.carbon.ndatasource.rdbms.RDBMSDataSourceReader</provider>
                    </providers>
        
                    <datasources>
                        <datasource>
                            <name>WSO2_ANALYTICS_EVENT_STORE_DB</name>
                            <description>The datasource used for analytics record store</description>
                            <definition type="RDBMS">
                                <configuration>
                                    <url>jdbc:mysql://[MySQL DB url]:[port]/WSO2_ANALYTICS_EVENT_STORE_DB</url>
                                    <username>[username]</username>
                                    <password>[password]</password>
                                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                                    <maxActive>50</maxActive>
                                    <maxWait>60000</maxWait>
                                    <testOnBorrow>true</testOnBorrow>
                                    <validationQuery>SELECT 1</validationQuery>
                                    <validationInterval>30000</validationInterval>
                                    <defaultAutoCommit>false</defaultAutoCommit>
                                </configuration>
                            </definition>
                        </datasource>
                        <datasource>
                            <name>WSO2_ANALYTICS_PROCESSED_DATA_STORE_DB</name>
                            <description>The datasource used for analytics record store</description>
                            <definition type="RDBMS">
                                <configuration>
                                    <url>jdbc:mysql://[MySQL DB url]:[port]/WSO2_ANALYTICS_PROCESSED_DATA_STORE_DB</url>
                                    <username>[username]</username>
                                    <password>[password]</password>
                                    <driverClassName>com.mysql.jdbc.Driver</driverClassName>
                                    <maxActive>50</maxActive>
                                    <maxWait>60000</maxWait>
                                    <testOnBorrow>true</testOnBorrow>
                                    <validationQuery>SELECT 1</validationQuery>
                                    <validationInterval>30000</validationInterval>
                                    <defaultAutoCommit>false</defaultAutoCommit>
                                </configuration>
                            </definition>
                        </datasource>
                    </datasources>
                </datasources-configuration>
        ```

        For more information, see [Datasources in DAS
        documentation](https://docs.wso2.com/display/DAS300/Datasources)
        .

    3.  To share the user store among the nodes, open the
        `             <IS Analytics_HOME>/repository/conf/user-mgt.xml            `
        file and modify the `             dataSource            `
        property of the `             <configuration>            `
        element as follows.

        ``` xml
                <configuration> 
                ...
                    <Property name="dataSource">jdbc/WSO2UM_DB</Property>
                </configuration>
        ```

        The datasource name specified in this configuration should be
        the same as the datasource used by user manager that you
        configured in sub step **a, i**.

    4.  In the
        `             <IS Analytics_HOME>/repository/conf/registry.xml            `
        file, add or modify the `             dataSource            `
        attribute of the
        `             <dbConfig name="govregistry">            ` element
        as follows.

        ``` xml
                <dbConfig name="govregistry">
                    <dataSource>jdbc/WSO2REG_DB</dataSource>
                </dbConfig>
                <remoteInstance url="https://localhost:9443/registry"> 
                    <id>gov</id>
                    <cacheId>user@jdbc:mysql://localhost:3306/regdb</cacheId>
                    <dbConfig>govregistry</dbConfig>
                    <readOnly>false</readOnly>
                    <enableCache>true</enableCache>
                    <registryRoot>/</registryRoot>
                </remoteInstance>
                <mount path="/_system/governance" overwrite="true">
                    <instanceId>gov</instanceId>
                    <targetPath>/_system/governance</targetPath>
                </mount>
                <mount path="/_system/config" overwrite="true">
                    <instanceId>gov</instanceId>
                    <targetPath>/_system/config</targetPath>
                </mount>
        ```

        !!! note
        
                Do not replace the following configuration when adding in the
                mounting configurations. The registry mounting configurations
                mentioned in the above steps should be added in addition to the
                following.
        
                ``` xml
                        <dbConfig name="wso2registry">
                            <dataSource>jdbc/WSO2CarbonDB</dataSource>
                        </dbConfig>
                ```
        

2.  Update the
    `          <IS Analytics_HOME>/repository/conf/axis2/axis2.xml         `
    file as follows to enable Hazlecast clustering for both nodes.  
    1.  Set
        `             clustering class="org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent"            `
        to `             true            ` as shown below to enable
        Hazlecast clustering.

        ``` xml
        <clustering class="org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent" enable="true">
        ```

    2.  Enable **wka** mode on both nodes as shown below.  For more
        information on **wka** mode, read [About membership
        schemes](https://docs.wso2.com/display/IS530/Overview#Overview-Aboutmembershipschemes)
        .

        ``` xml
                <parameter name="membershipScheme">wka</parameter>
        ```

    3.  Add both the nodes as well known members in the cluster under
        the `             members            ` tag in each node as shown
        in the example below.

        ``` xml
                <members>
                    <member>
                        <hostName>[node1 IP]</hostName>
                        <port>[node1 port]</port>
                    </member>
                    <member>
                        <hostName>[node2 IP]</hostName>
                        <port>[node2 port]</port>
                    </member>
                </members>
        ```

    4.  For each node, enter the respective server IP address as the
        value for the `             localMemberHost            `
        property as shown below.

        ``` xml
                <parameter name="localMemberHost">[Server_IP_Address]</parameter>
        ```

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to view the complete clustering section of the axis2.xml file.
    with the changes mentioned above.

    ``` xml
            <clustering class="org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent"
                        enable="true">
    
                <!--
                   This parameter indicates whether the cluster has to be automatically initalized
                   when the AxisConfiguration is built. If set to "true" the initialization will not be
                   done at that stage, and some other party will have to explictly initialize the cluster.
                -->
                <parameter name="AvoidInitiation">true</parameter>
    
                <!--
                   The membership scheme used in this setup. The only values supported at the moment are
                   "multicast" and "wka"
    
                   1. multicast - membership is automatically discovered using multicasting
                   2. wka - Well-Known Address based multicasting. Membership is discovered with the help
                            of one or more nodes running at a Well-Known Address. New members joining a
                            cluster will first connect to a well-known node, register with the well-known node
                            and get the membership list from it. When new members join, one of the well-known
                            nodes will notify the others in the group. When a member leaves the cluster or
                            is deemed to have left the cluster, it will be detected by the Group Membership
                            Service (GMS) using a TCP ping mechanism.
                -->
                
                <parameter name="membershipScheme">wka</parameter>
    
                <!--<parameter name="licenseKey">xxx</parameter>-->
                <!--<parameter name="mgtCenterURL">http://localhost:8081/mancenter/</parameter>-->
    
                <!--
                 The clustering domain/group. Nodes in the same group will belong to the same multicast
                 domain. There will not be interference between nodes in different groups.
                -->
                <parameter name="domain">wso2.carbon.domain</parameter>
    
                <!-- The multicast address to be used -->
                <!--<parameter name="mcastAddress">228.0.0.4</parameter>-->
    
                <!-- The multicast port to be used -->
                <parameter name="mcastPort">45564</parameter>
    
                <parameter name="mcastTTL">100</parameter>
    
                <parameter name="mcastTimeout">60</parameter>
    
                <!--
                   The IP address of the network interface to which the multicasting has to be bound to.
                   Multicasting would be done using this interface.
                -->
                <!--
                    <parameter name="mcastBindAddress">10.100.5.109</parameter>
                -->
                <!-- The host name or IP address of this member -->
    
                <parameter name="localMemberHost">[node IP]</parameter>
    
                <!--
                    The bind adress of this member. The difference between localMemberHost & localMemberBindAddress
                    is that localMemberHost is the one that is advertised by this member, while localMemberBindAddress
                    is the address to which this member is bound to.
                -->
                <!--
                <parameter name="localMemberBindAddress">[node IP]</parameter>
                -->
    
                <!--
                The TCP port used by this member. This is the port through which other nodes will
                contact this member
                 -->
                <parameter name="localMemberPort">[node port]</parameter>
    
                <!--
                    The bind port of this member. The difference between localMemberPort & localMemberBindPort
                    is that localMemberPort is the one that is advertised by this member, while localMemberBindPort
                    is the port to which this member is bound to.
                -->
                <!--
                <parameter name="localMemberBindPort">4001</parameter>
                -->
    
                <!--
                Properties specific to this member
                -->
                <parameter name="properties">
                    <property name="backendServerURL" value="https://${hostName}:${httpsPort}/services/"/>
                    <property name="mgtConsoleURL" value="https://${hostName}:${httpsPort}/"/>
                    <property name="subDomain" value="worker"/>
                </parameter>
    
                <!--
                Uncomment the following section to load custom Hazelcast data serializers.
                -->
                <!--
                <parameter name="hazelcastSerializers">
                    <serializer typeClass="java.util.TreeSet">org.wso2.carbon.hazelcast.serializer.TreeSetSerializer
                    </serializer>
                    <serializer typeClass="java.util.Map">org.wso2.carbon.hazelcast.serializer.MapSerializer</serializer>
                </parameter>
                -->
    
                <!--
                   The list of static or well-known members. These entries will only be valid if the
                   "membershipScheme" above is set to "wka"
                -->
                <members>
                    <member>
                        <hostName>[node1 IP]</hostName>
                        <port>[node1 port]</port>
                    </member>
                    <member>
                        <hostName>[node2 IP]</hostName>
                        <port>[node2 port]</port>
                    </member>
                </members>
    
                <!--
                Enable the groupManagement entry if you need to run this node as a cluster manager.
                Multiple application domains with different GroupManagementAgent implementations
                can be defined in this section.
                -->
                <groupManagement enable="false">
                    <applicationDomain name="wso2.as.domain"
                                       description="AS group"
                                       agent="org.wso2.carbon.core.clustering.hazelcast.HazelcastGroupManagementAgent"
                                       subDomain="worker"
                                       port="2222"/>
                </groupManagement>
            </clustering>
    ```

3.  Configure the
    `           <IS Analytics_HOME>/repository/conf/event-processor.xml          `
    file as follows to cluster IS Analytics in the Receiver.

    1.  Enable the `             HA            ` mode by setting the
        following property.

        ``` xml
                <mode name="HA" enable="true">
        ```

    2.  Disable the `             Distributed            ` mode by
        setting the following property.

        ``` xml
                <mode name="Distributed" enable="false">
        ```

    3.  For each node, enter the respective server IP address under the
        `             HA mode            ` Config section as shown in
        the example below.

        When you enable the HA mode for WSO2 IS Analytics, the following
        are enabled by default:

        -   **State persistence:** If there is no real time use case
            that requires any state information after starting the
            cluster, you should disable event persistence by setting the
            `                persistence               ` attribute to
            `                false               ` in the
            `                <IS Analytics_HOME>/repository/conf/event-processor.xml               `
            file as shown below.

            ``` xml
                        <persistence enable="false">
                            <persistenceIntervalInMinutes>15</persistenceIntervalInMinutes>
                            <persisterSchedulerPoolSize>10</persisterSchedulerPoolSize>
                            <persister class="org.wso2.carbon.event.processor.core.internal.persistence.FileSystemPersistenceStore">
                                <property key="persistenceLocation">cep_persistence</property>
                            </persister>
                        </persistence>
            ```

            !!! tip
            
                        When state persistence is enabled for WSO2 IS Analytics, the
                        internal state of IS Analytics is persisted in files. These
                        files are not automatically deleted. Therefore, if you want
                        to save space in your IS Analytics pack, you need to delete
                        them manually.
            
                        These files are created in the
                        `                <IS Analytics_HOME>/cep_persistence/<tenant-id>               `
                        directory. This directory has a separate sub-directory for
                        each execution plan. Each execution plan can have multiple
                        files. The format of each file name is
                        `                <TIMESTAMP>_<EXECUTION_PLAN_NAME>               `
                        (e.g,
                        `                1493101044948_MyExecutionPlan               `
                        ). If you want to clear files for a specific execution plan,
                        you need to leave the two files with the latest timestamps
                        and delete the rest.
            

        -   **Event synchronization** : However, if you set the
            `                               event.duplicated.in                              .cluster=true              `
            property for an event receiver configured in a node, IS
            Analytics does not perform event synchronization for that
            receiver.

        ``` xml
            <!-- HA Mode Config -->
            <mode name="HA" enable="true">
               ...
                <eventSync>
                    <hostName>[Server_IP_Address]</hostName>
        ```

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to view the complete event-processor.xml file with the changes
    mentioned above.

    ``` xml
        <eventProcessorConfiguration>
            <mode name="SingleNode" enable="false">
                <persistence enable="false">
                    <persistenceIntervalInMinutes>15</persistenceIntervalInMinutes>
                    <persisterSchedulerPoolSize>10</persisterSchedulerPoolSize>
                    <persister class="org.wso2.carbon.event.processor.core.internal.persistence.FileSystemPersistenceStore">
                        <property key="persistenceLocation">cep_persistence</property>
                    </persister>
                </persistence>
            </mode>
    
            <!-- HA Mode Config -->
            <mode name="HA" enable="true">
                <nodeType>
                    <worker enable="true"/>
                    <presenter enable="false"/>
                </nodeType>
                <checkMemberUpdateInterval>10000</checkMemberUpdateInterval>
                <eventSync>
                    <hostName>172.18.1.217</hostName>
                    <port>11224</port>
                    <reconnectionInterval>20000</reconnectionInterval>
                    <serverThreads>20000</serverThreads>
                    <!--Size of TCP event publishing client's send buffer in bytes-->
                    <publisherTcpSendBufferSize>5242880</publisherTcpSendBufferSize>
                    <!--Character encoding of TCP event publishing client-->
                    <publisherCharSet>UTF-8</publisherCharSet>
                    <publisherBufferSize>1024</publisherBufferSize>
                    <publisherConnectionStatusCheckInterval>30000</publisherConnectionStatusCheckInterval>
                    <!--Number of events that could be queued at receiver before they are synced between CEP/DAS nodes-->
                    <receiverQueueSize>1000000</receiverQueueSize>
                    <!--Max total size of events that could be queued at receiver before they are synced between CEP/DAS nodes-->
                    <receiverQueueMaxSizeMb>10</receiverQueueMaxSizeMb>
                    <!--Number of events that could be queued at publisher to sync output between CEP/DAS nodes-->
                    <publisherQueueSize>1000000</publisherQueueSize>
                    <!--Max total size of events that could be queued at publisher to sync output between CEP/DAS nodes-->
                    <publisherQueueMaxSizeMb>10</publisherQueueMaxSizeMb>
                </eventSync>
                <management>
                    <hostName>172.18.1.217</hostName>
                    <port>10005</port>
                    <tryStateChangeInterval>15000</tryStateChangeInterval>
                    <stateSyncRetryInterval>10000</stateSyncRetryInterval>
                </management>
                <presentation>
                    <hostName>0.0.0.0</hostName>
                    <port>11000</port>
                    <!--Size of TCP event publishing client's send buffer in bytes-->
                    <publisherTcpSendBufferSize>5242880</publisherTcpSendBufferSize>
                    <!--Character encoding of TCP event publishing client-->
                    <publisherCharSet>UTF-8</publisherCharSet>
                    <publisherBufferSize>1024</publisherBufferSize>
                    <publisherConnectionStatusCheckInterval>30000</publisherConnectionStatusCheckInterval>
                </presentation>
            </mode>
    
            <!-- Distributed Mode Config -->
            <mode name="Distributed" enable="false">
                <nodeType>
                    <worker enable="true"/>
                    <manager enable="true">
                        <hostName>0.0.0.0</hostName>
                        <port>8904</port>
                    </manager>
                    <presenter enable="false">
                        <hostName>0.0.0.0</hostName>
                        <port>11000</port>
                    </presenter>
                </nodeType>
                <management>
                    <managers>
                        <manager>
                            <hostName>localhost</hostName>
                            <port>8904</port>
                        </manager>
                        <manager>
                            <hostName>localhost</hostName>
                            <port>8905</port>
                        </manager>
                    </managers>
                    <!--Connection re-try interval to connect to Storm Manager service in case of a connection failure-->
                    <reconnectionInterval>20000</reconnectionInterval>
                    <!--Heart beat interval (in ms) for event listeners in "Storm Receivers" and "CEP Publishers" to acknowledge their
                    availability for receiving events"-->
                    <heartbeatInterval>5000</heartbeatInterval>
                    <!--Storm topology re-submit interval in case of a topology submission failure-->
                    <topologyResubmitInterval>10000</topologyResubmitInterval>
                </management>
                <transport>
                    <!--Port range to be used for events listener servers in "Storm Receiver Spouts" and "CEP Publishers"-->
                    <portRange>
                        <min>15000</min>
                        <max>15100</max>
                    </portRange>
                    <!--Connection re-try interval (in ms) for connection failures between "CEP Receiver" to "Storm Receiver" connections
                    and "Storm Publisher" to "CEP Publisher" connections-->
                    <reconnectionInterval>20000</reconnectionInterval>
                    <!--Size of the output queue of each "CEP Receiver" which stores events to be published into "Storm Receivers" .
                    This must be a power of two-->
                    <cepReceiverOutputQueueSize>8192</cepReceiverOutputQueueSize>
                    <!--Size of the output queue of each "Storm Publisher" which stores events to be published into "CEP Publisher" .
                    This must be a power of two-->
                    <stormPublisherOutputQueueSize>8192</stormPublisherOutputQueueSize>
                    <!--Size of TCP event publishing client's send buffer in bytes-->
                    <tcpEventPublisherSendBufferSize>5242880</tcpEventPublisherSendBufferSize>
                    <!--Character encoding of TCP event publishing client-->
                    <tcpEventPublisherCharSet>UTF-8</tcpEventPublisherCharSet>
                    <!--Size of the event queue in each storm spout which stores events to be processed by storm bolts -->
                    <stormSpoutBufferSize>10000</stormSpoutBufferSize>
                    <connectionStatusCheckInterval>20000</connectionStatusCheckInterval>
                </transport>
                <presentation>
                    <presentationOutputQueueSize>1024</presentationOutputQueueSize>
                    <!--Size of TCP event publishing client's send buffer in bytes-->
                    <tcpEventPublisherSendBufferSize>5242880</tcpEventPublisherSendBufferSize>
                    <!--Character encoding of TCP event publishing client-->
                    <tcpEventPublisherCharSet>UTF-8</tcpEventPublisherCharSet>
                    <connectionStatusCheckInterval>20000</connectionStatusCheckInterval>
                </presentation>
                <statusMonitor>
                    <lockTimeout>60000</lockTimeout>
                    <updateRate>60000</updateRate>
                </statusMonitor>
                <stormJar>org.wso2.cep.storm.dependencies.jar</stormJar>
                <distributedUIUrl></distributedUIUrl>
                <memberUpdateCheckInterval>20000</memberUpdateCheckInterval>
            </mode>
        </eventProcessorConfiguration>
    ```

    The following node types are configured for the HA deployment mode
    in the
    `            <IS Analytics_HOME>/repository/conf/event-processor.xml           `
    file.

    -   **`               eventSync              `** : Both the active
        and the passive nodes in this setup are event synchronizing
        nodes as explained in the introduction. Therefore, each node
        should have the host and the port on which it is operating
        specified under the `              <eventSync>             `
        element.

        Note that the `               eventSync              ` port is
        not automatically updated to the port in which each node
        operates via port offset.

    -   **`               management              `** : In this setup,
        both the nodes carry out the same tasks, and therefore, both
        nodes are considered manager nodes. Therefore, each node should
        have the host and the port on which it is operating specified
        under the `              <management>             ` element.

        Note that the `               management              ` port is
        not automatically updated to the port in which each node
        operates via port offset.

    -   **`              presentation             `** : You can
        optionally specify only one of the two nodes in this setup as
        the presenter node. The dashboards in which processed
        information is displayed are configured only in the presenter
        node. Each node should have the host and the port on which the
        assigned presenter node is operating specified under the
        `             <presentation>            ` element. The host and
        the port as well as the other configurations under the
        `             <presentation>            ` element are effective
        only when the `             presenter enable="false            `
        property is set under the
        `             <!-- HA Mode Config -->            ` section.

4.  Update the
    `           <IS Analytics_HOME>/repository/conf/analytics/spark/spark-defaults.conf          `
    file as follows to use the Spark cluster embedded within
    IS Analytics.

    -   Keep the `            carbon.spark.master           `
        configuration as `            local           ` . This instructs
        Spark to create a Spark cluster using the Hazelcast cluster.
    -   Enter `             2            ` as the value for the
        `             carbon.spark.master.count            `
        configuration. This specifies that there should be two masters
        in the Spark cluster. One master serves as an active master and
        the other serves as a stand-by master.

    The following example shows the
    `           <IS Analytics_HOME>/repository/conf/analytics/spark/spark-defaults.conf          `
    file with changes mentioned above.

    ``` java
        carbon.spark.master local
        carbon.spark.master.count 2
    ```

    For more information, see [Spark Configurations in DAS
    documentation](https://docs.wso2.com/display/DAS300/Spark+Configurations)
    .

    !!! warning
    
        **Important** : If the path to
        `           <IS Analytics_HOME>          ` is different in the two
        nodes, please do the following.
    
        -   [**UNIX environment**](#1dd1c10f00514b47b0ae4e3292b60fab)
        -   [**Windows environment**](#bc7bd9393e6641a1be80827aa43f33a4)
    
        Create a symbolic link to
        `              <IS Analytics_HOME>             ` in both nodes,
        where paths of those symbolic links are identical. This ensures that
        if we use the symbolic link to access IS Analytics, we can use a
        common path. To do this, set the following property in the  
        `              <IS Analytics_HOME>/repository/conf/analytics/spark/spark-defaults.conf             `
        file.
    
        `              carbon.das.symbolic.link /home/ubuntu/das/das_symlink/             `
    
        In the Windows environment there is a strict requirement to have
        both IS Analytics distributions in a common path.
    

5.  In order to share the C-Apps deployed among the nodes, configure the
    SVN-based deployment synchronizer. For detailed instructions, see
    [Configuring SVN-Based Deployment
    Synchronizer](https://docs.wso2.com/display/CLUSTER44x/Configuring+SVN-Based+Deployment+Synchronizer)
    .

    !!! tip
    
        IS Analytics Minimum High availability Deployment set up does not
        use a manager and a worker. For the purpose of configuring the
        deployment synchronizer, you can add the configurations relevant to
        the manager for the node of your choice, and add the configurations
        relating to the worker for the other node.
    

    If you do not configure the deployment synchronizer, you are
    required to deploy any C-App you use in the IS Analytics Minimum
    High Availability Deployment set up to both the nodes.

6.  If the physical IS Analytics server has multiple network interfaces
    with different IPs, and if you want Spark to use a specific
    Interface IP, open either the
    `           <IS Analytics_HOME>/bin/load-spark-env-vars.sh          `
    file (for Linux) or
    `           <IS Analytics_HOME>/bin/load-spark-env-vars.bat          `
    file (for Windows), and add the following parameter to configure the
    Spark IP address.

    ``` java
    export  SPARK_LOCAL_IP=<IP_Address>
    ```

### Starting the cluster

Once you complete the configurations mentioned above, start the two IS
Analytics nodes. If the cluster is successfully configured, the
following CLI logs are generated.

-   The following is displayed in the CLIs of both nodes, and it
    indicates that the registry mounting is successfully done.

    ``` text
        [2016-01-28 14:20:53,596]  INFO {org.wso2.carbon.registry.core.jdbc.EmbeddedRegistryService} -  Configured Registry in 107ms
        [2016-01-28 14:20:53,631]  INFO {org.wso2.carbon.registry.core.jdbc.EmbeddedRegistryService} -  Connected to mount at govregistry in 7ms
        [2016-01-28 14:20:53,818]  INFO {org.wso2.carbon.registry.core.jdbc.EmbeddedRegistryService} -  Connected to mount at govregistry in 0ms
    ```

-   A CLI log similar to the following is displayed for the first node
    you start to indicate that it has successfully started.

    ``` text
        [2016-01-28 14:32:40,283]  INFO {org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent} -  Using wka based membership management scheme
        [2016-01-28 14:32:40,284]  INFO {org.wso2.carbon.core.clustering.hazelcast.util.MemberUtils} -  Added member: Host:10.100.0.46, Remote Host:null, Port: 4000, HTTP:-1, HTTPS:-1, Domain: null, Sub-domain:null, Active:true
        [2016-01-28 14:32:40,284]  INFO {org.wso2.carbon.core.clustering.hazelcast.util.MemberUtils} -  Added member: Host:10.100.0.46, Remote Host:null, Port: 4001, HTTP:-1, HTTPS:-1, Domain: null, Sub-domain:null, Active:true
        [2016-01-28 14:32:41,665]  INFO {org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent} -  Hazelcast initialized in 1379ms
        [2016-01-28 14:32:41,728]  INFO {org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent} -  Local member: [9c7619a9-8460-465d-8fd0-7eab1c464386] - Host:10.100.0.46, Remote Host:null, Port: 4000, HTTP:9763, HTTPS:9443, Domain: wso2.carbon.domain, Sub-domain:worker, Active:true
        [2016-01-28 14:32:41,759]  INFO {org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent} -  Elected this member [9c7619a9-8460-465d-8fd0-7eab1c464386] as the Coordinator node
        [2016-01-28 14:32:41,847]  INFO {org.wso2.carbon.event.processor.manager.core.internal.HAManager} -  CEP HA Snapshot Server started on 0.0.0.0:10005
        [2016-01-28 14:32:41,850]  INFO {org.wso2.carbon.event.processor.manager.core.internal.HAManager} -  Became CEP HA Active Member
        [2016-01-28 14:32:41,885]  INFO {org.wso2.carbon.core.clustering.hazelcast.HazelcastClusteringAgent} -  Cluster initialization completed
    ```

-   Once you start the second node, a CLI log similar to the following
    will be displayed for the first node to indicate that another node
    has joined the cluster.

    ``` text
        [2016-01-28 14:34:13,252]  INFO {org.wso2.carbon.core.clustering.hazelcast.wka.WKABasedMembershipScheme} -  Member joined [504bceff-4a08-46fe-83e6-b9561d3fff81]: /10.100.0.46:4001
        [2016-01-28 14:34:15,963]  INFO {org.wso2.carbon.event.processor.manager.commons.transport.client.TCPEventPublisher} -  Connecting to 10.100.0.46:11224
        [2016-01-28 14:34:15,972]  INFO {org.wso2.carbon.event.processor.manager.core.internal.EventHandler} -  CEP sync publisher initiated to Member '10.100.0.46:11224'
    ```

-   A CLI log similar to the following is displayed for the second node
    once it joins the cluster.

    ``` text
        [2016-01-28 14:34:27,086]  INFO {org.wso2.carbon.analytics.spark.core.internal.SparkAnalyticsExecutor} -  Spark Master map size after starting masters : 2
    ```

Following are some exceptions you may view in the start up log when you
start the cluster.

-   When you start the passive node of the HA cluster, the following
    errors are displayed.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to view the errors

    ``` text
        ERROR {org.wso2.carbon.event.processor.manager.core.internal.HAManager} -  CEP HA State syncing failed, No execution plans exist for tenant  -1234
        org.wso2.carbon.event.processor.manager.core.exception.EventManagementException: No execution plans exist for tenant  -1234
            at org.wso2.carbon.event.processor.core.internal.CarbonEventProcessorManagementService.restoreState(CarbonEventProcessorManagementService.java:83)
            at org.wso2.carbon.event.processor.manager.core.internal.HAManager.syncState(HAManager.java:336)
            at org.wso2.carbon.event.processor.manager.core.internal.HAManager.access$100(HAManager.java:49)
            at org.wso2.carbon.event.processor.manager.core.internal.HAManager$2.run(HAManager.java:276)
            at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
            at java.util.concurrent.FutureTask.run(FutureTask.java:266)
            at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$201(ScheduledThreadPoolExecutor.java:180)
            at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:293)
            at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
            at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
            at java.lang.Thread.run(Thread.java:745)
    ```

    This is because the artifacts are yet to be deployed in the passive
    node even though it has received the sync message from the active
    node. This error is no longer displayed once the start up for the
    passive node is complete.

-   When the Apache Spark Cluster is not properly instantiated, the
    following errors are displayed.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to view the errors

    ``` text
        [2016-09-13 13:59:34,000]  INFO {org.wso2.carbon.event.processor.manager.core.internal.CarbonEventManagementService} -  Starting polling event receivers
        [2016-09-13 14:00:05,018] ERROR {org.wso2.carbon.analytics.spark.core.CarbonAnalyticsProcessorService} -  Error while executing query :         CREATE TEMPORARY TABLE isSessionAnalyticsPerMinute USING CarbonAnalytics OPTIONS (tableName "org_wso2_is_analytics_stream_SessionStatPerMinute", schema "meta_tenantId INT -i, bucketId LONG, bucketStart LONG -i, bucketEnd LONG -i, year INT, month INT, day INT, hour INT, minute INT, activeSessionCount LONG, newSessionCount LONG, terminatedSessionCount LONG, _timestamp LONG -i", primaryKeys "meta_tenantId, bucketId, bucketStart, bucketEnd", incrementalParams "isSessionAnalyticsPerHour, HOUR", mergeSchema "false")
        org.wso2.carbon.analytics.spark.core.exception.AnalyticsExecutionException: Exception in executing query CREATE TEMPORARY TABLE isSessionAnalyticsPerMinute USING CarbonAnalytics OPTIONS (tableName "org_wso2_is_analytics_stream_SessionStatPerMinute", schema "meta_tenantId INT -i, bucketId LONG, bucketStart LONG -i, bucketEnd LONG -i, year INT, month INT, day INT, hour INT, minute INT, activeSessionCount LONG, newSessionCount LONG, terminatedSessionCount LONG, _timestamp LONG -i", primaryKeys "meta_tenantId, bucketId, bucketStart, bucketEnd", incrementalParams "isSessionAnalyticsPerHour, HOUR", mergeSchema "false")
            at org.wso2.carbon.analytics.spark.core.internal.SparkAnalyticsExecutor.executeQueryLocal(SparkAnalyticsExecutor.java:764)
            at org.wso2.carbon.analytics.spark.core.internal.SparkAnalyticsExecutor.executeQuery(SparkAnalyticsExecutor.java:721)
            at org.wso2.carbon.analytics.spark.core.CarbonAnalyticsProcessorService.executeQuery(CarbonAnalyticsProcessorService.java:201)
            at org.wso2.carbon.analytics.spark.core.CarbonAnalyticsProcessorService.executeScript(CarbonAnalyticsProcessorService.java:151)
            at org.wso2.carbon.analytics.spark.core.AnalyticsTask.execute(AnalyticsTask.java:60)
            at org.wso2.carbon.ntask.core.impl.TaskQuartzJobAdapter.execute(TaskQuartzJobAdapter.java:67)
            at org.quartz.core.JobRunShell.run(JobRunShell.java:213)
            at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
            at java.util.concurrent.FutureTask.run(FutureTask.java:266)
            at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
            at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
            at java.lang.Thread.run(Thread.java:745)
        Caused by: org.wso2.carbon.analytics.spark.core.exception.AnalyticsExecutionException: Spark SQL Context is not available. Check if the cluster has instantiated properly.
            at org.wso2.carbon.analytics.spark.core.internal.SparkAnalyticsExecutor.executeQueryLocal(SparkAnalyticsExecutor.java:755)
            ... 11 more
        [2016-09-13 14:00:05,018] ERROR {org.wso2.carbon.analytics.spark.core.CarbonAnalyticsProcessorService} -  Error while executing query :         CREATE TEMPORARY TABLE activeSessionTable USING CarbonAnalytics OPTIONS (tableName "ORG_WSO2_IS_ANALYTICS_STREAM_ACTIVESESSIONS", schema "meta_tenantId INT -i -f, sessionId STRING -i -f, startTimestamp LONG -i, renewTimestamp LONG -i, terminationTimestamp LONG -i, year INT, month INT, day INT, hour INT, minute INT, action INT -i -f, username STRING -i -f, userstoreDomain STRING -i -f, remoteIp STRING -i -f, region STRING -i -f, tenantDomain STRING -i -f, serviceProvider STRING -i -f, identityProviders STRING -i -f, rememberMeFlag BOOLEAN, userAgent STRING -i -f, usernameWithTenantDomainAndUserstoreDomain STRING -i -f, _timestamp LONG -i", primaryKeys "meta_tenantId, sessionId", mergeSchema "false")
        org.wso2.carbon.analytics.spark.core.exception.AnalyticsExecutionException: Exception in executing query CREATE TEMPORARY TABLE activeSessionTable USING CarbonAnalytics OPTIONS (tableName "ORG_WSO2_IS_ANALYTICS_STREAM_ACTIVESESSIONS", schema "meta_tenantId INT -i -f, sessionId STRING -i -f, startTimestamp LONG -i, renewTimestamp LONG -i, terminationTimestamp LONG -i, year INT, month INT, day INT, hour INT, minute INT, action INT -i -f, username STRING -i -f, userstoreDomain STRING -i -f, remoteIp STRING -i -f, region STRING -i -f, tenantDomain STRING -i -f, serviceProvider STRING -i -f, identityProviders STRING -i -f, rememberMeFlag BOOLEAN, userAgent STRING -i -f, usernameWithTenantDomainAndUserstoreDomain STRING -i -f, _timestamp LONG -i", primaryKeys "meta_tenantId, sessionId", mergeSchema "false")
            at org.wso2.carbon.analytics.spark.core.internal.SparkAnalyticsExecutor.executeQueryLocal(SparkAnalyticsExecutor.java:764)
            at org.wso2.carbon.analytics.spark.core.internal.SparkAnalyticsExecutor.executeQuery(SparkAnalyticsExecutor.java:721)
            at org.wso2.carbon.analytics.spark.core.CarbonAnalyticsProcessorService.executeQuery(CarbonAnalyticsProcessorService.java:201)
            at org.wso2.carbon.analytics.spark.core.CarbonAnalyticsProcessorService.executeScript(CarbonAnalyticsProcessorService.java:151)
            at org.wso2.carbon.analytics.spark.core.AnalyticsTask.execute(AnalyticsTask.java:60)
            at org.wso2.carbon.ntask.core.impl.TaskQuartzJobAdapter.execute(TaskQuartzJobAdapter.java:67)
            at org.quartz.core.JobRunShell.run(JobRunShell.java:213)
            at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
            at java.util.concurrent.FutureTask.run(FutureTask.java:266)
            at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
            at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
            at java.lang.Thread.run(Thread.java:745)
        Caused by: org.wso2.carbon.analytics.spark.core.exception.AnalyticsExecutionException: Spark SQL Context is not available. Check if the cluster has instantiated properly.
            at org.wso2.carbon.analytics.spark.core.internal.SparkAnalyticsExecutor.executeQueryLocal(SparkAnalyticsExecutor.java:755)
            ... 11 more
    ```

    All the nodes in the Spark cluster should be started in order to
    stop this exception from occurring.

### Testing the HA deployment

The HA deployment you configured can be tested as follows.

1.  Access the Spark UIs of the active master and the stand-by master
    using \< `          node ip>:8081         ` in each node.
    -   Information relating to the active master is displayed as shown
        in the example below.  
        ![](attachments/103329489/103329497.png)
    -   Information relating to the stand-by master is displayed as
        shown in the example below.  
        ![](attachments/103329489/103329498.png)
2.  Click the links under **Running Applications** in the Spark UI of
    the active master to check the Spark application UIs of those
    applications. A working application is displayed as shown in the
    following example.  
    ![](attachments/103329489/103329490.png)
3.  Click the **Environment** tab of a Spark application UI to check
    whether all the configuration parameters are correctly set. You can
    also check whether the class path variables in this tab can be
    accessed manually.  
    ![](attachments/103329489/103329491.png)
4.  Check the Spark UIs of workers to check whether they have running
    executors. If a worker UI does not have running executors or if it
    is continuously creating executors, it indicates an issue in the
    Spark cluster configuration. The following example shows a worker UI
    with a running executor.  
    ![](attachments/103329489/103329492.png)
5.  Check the symbolic parameter, and check if you could manually access
    it via a `          cd <directory>         ` command in the CLI.
6.  [Log into the IS Analytics Management
    Console](https://docs.wso2.com/display/DAS300/Running+the+Product)
    and navigate to **Main** =\> **Manage** =\> **Batch Analytics** =\>
    **Console** to open the **Interactive Analytics Console**. Run a
    query in this console.
