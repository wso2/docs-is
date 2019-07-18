# Writing a Custom Policy Info Point

According to the XACML reference architecture, PIP (Policy Info Point)
is the system entity that acts as a source of attribute values.
Basically if there are missing attributes in the XACML request sent by
PEP (Policy Enforcement Point), PIP would find them for the PDP (Policy
Decision Point) to evaluate the policy.

This topic provides instructions on how to write a simple PIP attribute
finder module to plug in to the WSO2 Identity Server. There are two ways
that you can write a PIP attribute finder module.

1.  By implementing the “PIPAttributeFinder” interface. You can find the
    latest interface
    [here](https://github.com/wso2/carbon-identity/blob/master/components/entitlement/org.wso2.carbon.identity.entitlement/src/main/java/org/wso2/carbon/identity/entitlement/pip/PIPAttributeFinder.java)
    .
2.  By extending the “AbstractPIPAttributeFinder” abstract class You can
    find the latest abstract class
    [here](https://github.com/wso2/carbon-identity/blob/master/components/entitlement/org.wso2.carbon.identity.entitlement/src/main/java/org/wso2/carbon/identity/entitlement/pip/AbstractPIPAttributeFinder.java)
    .

Of the above methods, it would be easier to extend the
“AbstractPIPAttributeFinder” abstract class and write a PIP attribute
finder module.

### Sample scenario

K-Market is an online trading company that has control over online
trading based on the customer’s privileges and attributes of the
customers. These attributes can be age, email, etc. To achieve
Attribute-based Access Control (ABAC); user attributes that are stored
in a JDBC-based user store must be retrieved by the PDP of the WSO2
Identity Server. This sample project can be downloaded
[here](https://svn.wso2.org/repos/wso2/people/asela/xacml/pip/jdbc/) .

1.  In our sample scenario, the "K-Market attribute store" is a MySQL
    database. See
    [here](https://svn.wso2.org/repos/wso2/people/asela/xacml/pip/jdbc/resources/dbScript/testUserStore.sql)
    for a sample script that is used to create the tables.
2.  Write a PIP module by extending “
    `          AbstractPIPAttributeFinder         ` ”. Download the “
    `          KMarketJDBCAttributeFinder         ` ” class
    [here](https://svn.wso2.org/repos/wso2/people/asela/xacml/pip/jdbc/src/main/org/xacmlinfo/xacml/pip/jdbc/KMarketJDBCAttributeFinder.java)
    . The following are the methods you need to implement in order to
    write this module.
    1.  **init (Properties properties)** : Here you can write the logic
        to initialize your module. Any properties that are defined in
        the
        `            <IS_HOME>/repository/conf/security/            entitlement.properties           `
        file can be accessed here. The JNDI name of the datasource can
        be defined as the property value in the
        **entitlement.properties** file and is read here. Also,
        supported attributes are initialized inside this method.
    2.  **getAttributeValues (String subject, String resource, String
        action, String environment, String attributeId, URI issuer)** :
        Here you can write the logic to find your attribute value.
        -   The subject –\> attribute value can be identified by the
            following attribute value in the request:  
            `              urn:oasis:names:tc:xacml:1.0:subject:subject-id             `
        -   The resource –\> attribute value can be identified by the
            following attribute value in the request:  
            `              urn:oasis:names:tc:xacml:1.0:resource:resource-id             `
        -   The action –\> attribute value can be identified by the
            following attribute value in the request:  
            `              urn:oasis:names:tc:xacml:1.0:action:action-id             `
        -   The environment –\> attribute value can be identified by the
            following attribute value in the request:  
            `              urn:oasis:names:tc:xacml:1.0:environment:environment-id             `
        -   The attributeId –\> attribute id value is defined in the
            policy and must be resolved
        -   The issuer –\> issuer value is related to the attributeId
            and must be resolved
    3.  **getSupportedAttributes()** : Here you can write the logic to
        find all the attribute IDs supported by your module.
    4.  **getModuleName()** : The name of the module.
3.  Create a .jar file from your class. To do this, you can build the
    project using maven 3 and create the .jar file.
4.  Copy the created **org.xacmlinfo.xacml.pip.jdbc-1.0.0.jar** to the
    `          <IS_HOME>/repository/components/lib         ` directory.
5.  Copy any dependency libraries for the PIP module to
    `          <IS_HOME>/repository/components/lib         ` directory.
    This includes the JDBC driver .jar file that helps to create the
    JDBC connection (e.g.,
    `          mysql-connector-java-5.1.10-bin.jar         ` ).
6.  Additionally, you can configure new datasources using
    **master-datasources.xml** file found in the
    `           <IS_HOME>/repository/conf/datasources          `
    directory.

    This only applies if you are defining datasource configurations
    using the master-datasources.xml file.

    The following is a sample datasource configuration for this
    scenario.

    ``` xml
    <datasource>
        <name>KMARKET_USER_DB</name>
        <description>The datasource used for K-Market user store</description>
        <jndiConfig>
            <name>jdbc/KMARKETUSERDB</name>
        </jndiConfig>
        <definition type="RDBMS">
            <configuration>
                <url>jdbc:mysql://localhost:3306/kmarketdb</url>
                <username>root</username>
                <password>asela</password>
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

7.  Open the **entitlement.properties** file found in the
    `           <IS_HOME>/repository/conf/identity          ` directory
    and register your PIP module. The following is a sample
    configuration for this scenario.

    ``` java
        PIP.AttributeDesignators.Designator.2=org.xacmlinfo.xacml.pip.jdbc.KMarketJDBCAttributeFinder
        #Define JNDI datasource name as property value
        org.xacmlinfo.xacml.pip.jdbc.KMarketJDBCAttributeFinder.1=DataSourceName,jdbc/KMARKETUSERDB
    ```

8.  Restart the server if it has been started already.

Now you have successfully registered a PIP attribute finder with WSO2
Identity Server.

### Testing the sample PIP module

Use the following steps to check the PIP module.

1.  [Restart the WSO2 Identity Server](_Running_the_Product_) and log in
    to the [management
    console](../../setup/getting-started-with-the-management-console) .
2.  Go to the **Main** menu of the management console and click
    **Extension** under **PDP**.
3.  You can see that PIP attribute finder has been registered
    successfully and is visible under the **Attribute Finder
    Extensions** list. You can re-initialize this at run time.
4.  To test this attribute finder, you can use
    [this](https://svn.wso2.org/repos/wso2/people/asela/xacml/pip/jdbc/resources/Kmarket-Test-Policy.xml)
    policy and
    [this](https://svn.wso2.org/repos/wso2/people/asela/xacml/pip/jdbc/resources/Test-Request.xml)
    request.

5.  Please [upload the policy](_Creating_a_XACML_Policy_) into the WSO2
    Identity Server, then publish it to PDP and enable it.

6.  You can then [try out the policy with TryIt
    PEP](_Using_the_XACML_TryIt_Tool_) .

    About debugging the sample code

    This sample code can be debugged by starting the WSO2 Identity
    Server in the debug mode as follows.

    **UNIX** : `            wso2server.sh –debug 5005           `

    **Windows** : `            wso2server.bat –debug 5005           `

    Then you can clearly see how methods in the
    “KMarketJDBCAttributeFinder” are called by the PDP.
