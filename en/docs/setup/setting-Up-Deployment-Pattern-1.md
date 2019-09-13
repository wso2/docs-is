# Setting Up Deployment Pattern 1

This page guides you through setting up deployment pattern 1, which is a
HA clustered deployment of WSO2 Identity Server. For more information
about deployment pattern 1 and its high level architecture, see
[Deployment Patterns - Pattern
1](Deployment-Patterns_103329471.html#DeploymentPatterns-Pattern1-HAclustereddeploymentofWSO2IdentityServer)
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

  

------------------------------------------------------------------------

-   [Configuring the user
    store](#SettingUpDeploymentPattern1-Configuringtheuserstore)
-   [Configuring the
    datasources](#SettingUpDeploymentPattern1-Configuringthedatasources)
-   [Mounting the
    registry](#SettingUpDeploymentPattern1-Mountingtheregistry)
-   [Clustering Identity Server for high
    availability](#SettingUpDeploymentPattern1-ClusteringIdentityServerforhighavailability)
-   [Changing hostnames and
    ports](#SettingUpDeploymentPattern1-Changinghostnamesandports)
-   [Enabling artifact
    synchronization](#SettingUpDeploymentPattern1-Enablingartifactsynchronization)
-   [Setting up the
    dashboard](#SettingUpDeploymentPattern1-Settingupthedashboard)
-   [Fronting with a load balancer
    (Nginx)](#SettingUpDeploymentPattern1-Frontingwithaloadbalancer(Nginx))
    -   [Configuring
        Nginx](#SettingUpDeploymentPattern1-ConfiguringNginx)
    -   [Create SSL
        certificates](#SettingUpDeploymentPattern1-CreateSSLcertificates)
    -   [Configure the Proxy Port in IS
        Nodes](#SettingUpDeploymentPattern1-ConfiguretheProxyPortinISNodes)
-   [Running the
    cluster](#SettingUpDeploymentPattern1-Runningthecluster)
-   [Starting up and verifying product
    nodes](#SettingUpDeploymentPattern1-Startingupandverifyingproductnodes)

------------------------------------------------------------------------

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
    
        See [Configuring User Stores](../../using-wso2-identity-server/configuring-user-stores) for more
        information on how to set up other types of user stores.
    

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
    Database](../../admin-guide/setting-up-the-physical-database)
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
        Clustering](_Setting_Up_Separate_Databases_for_Clustering_) topic.
    

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
        datasources](#SettingUpDeploymentPattern1-Configuringthedatasources)
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
    

    -   [**nginx Community Version**](#75567c86df1e4dfab04068421c7a048f)
    -   [**NGINX Plus**](#1a708bb594964267b11827e97f138300)

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

    -   [**Linux/Unix**](#052502cddc7e4af990673c1e15d7000e)
    -   [**Windows**](#0fb1fb13439e4818bcf82b0e12f9ad40)

    ``` java
        sh wso2server.sh
    ```

    ``` java
        .\wso2server.bat
    ```
