# Creating a Third Party Authenticator or Connector and Publishing in WSO2 Store

### Introduction

This section provides information on the high-level tasks involved in
implementing and publishing IS authenticators and provisioning
connectors in [WSO2 Store](https://store.wso2.com/store).

### Basic implementation requirements

1.  Research the APIs provided by the service for which you want to
    create an authenticator or provisioning connector.
2.  Required template can be created using the maven archetype found
    with following and using the mentioned command.

    -   <https://github.com/wso2-extensions/archetypes/tree/master/is-authenticator-archetype>
        to create an authenticator use following command.
        ```
        mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate
        -DarchetypeGroupId=org.wso2.carbon.extension.archetype
        -DarchetypeArtifactId=
        [org.wso2.carbon.extension.is](http://org.wso2.carbon.extension.is)
        .authenticator-archetype -DarchetypeVersion=2.0.1
        -DgroupId=org.wso2.carbon.extension.identity.authenticator
        -DartifactId=org.wso2.carbon.extension.identity.authenticator.\<Connector\_name\>
        -Dversion=1.0.0 -DarchetypeRepository=
        <http://maven.wso2.org/nexus/content/repositories/wso2-public>
        ```

    !!! note    
        If maven version is 2.x.x, use the following command in the directory
        where you want to create the connector on your local machine:
        ```
        mvn
        archetype:generate -DarchetypeGroupId=org.wso2.carbon.extension.archetype
        -DarchetypeArtifactId=
        [org.wso2.carbon.extension.is](http://org.wso2.carbon.extension.is/)
        .authenticator-archetype -DarchetypeVersion=2.0.4
        -DgroupId=org.wso2.carbon.extension.identity.authenticator
        -DartifactId=org.wso2.carbon.extension.identity.authenticator.\<Connector\_name\>
        -Dversion=1.0.0 -DarchetypeRepository=
        ```
        When prompted, enter a name for the connector. Specify the name in upper camel case, such as `HelloWorld`. Type `y` to confirm.


    -   <https://github.com/wso2-extensions/archetypes/tree/master/is-provisioning-connector-archetype>
        to create a provisioning connector use following command.
        ```
        mvn
        org.apache.maven.plugins:maven-archetype-plugin:2.4:generate -DarchetypeGroupId=org.wso2.carbon.extension.archetype
        -DarchetypeArtifactId=org.wso2.carbon.extension.is.provisioning-connector-archetype
        -DarchetypeVersion=2.0.1 -DgroupId=org.wso2.carbon.is
        -DartifactId=org.wso2.carbon.is.test -Dversion=1.0.0
        -DarchetypeRepository=
        <http://maven.wso2.org/nexus/content/repositories/wso2-public/>
        ```

        !!! note
            If maven version is 2.x.x, use the following command in the directory
            where you want to create the connector on your local machine:
            ```                      
            mvn [archetype:generate](http://archetypegenerate/)
            -DarchetypeGroupId=org.wso2.carbon.extension.archetype
            -DarchetypeArtifactId=
            [org.wso2.carbon.extension.is](http://org.wso2.carbon.extension.is/)
            .provisioning-connector-archetype -DarchetypeVersion=2.0.4 -DgroupId=
            [org.wso2.carbon.is](http://org.wso2.carbon.is/) -DartifactId=
            [org.wso2.carbon.is](http://org.wso2.carbon.is/).test -Dversion=1.0.0
            -DarchetypeRepository=
            ```
        !!! info
            We strongly recommend the non-use of GPL or LGPL licensed libraries in
            the development of connectors. If there is a reason to use these
            licenses, the reason needs to be provided along with the connector
            submission. Hosting connectors that use GPL or LGPL licenses in WSO2
            Store will be done at the sole discretion of WSO2 and provision of a
            reason for the use of GPL LGPL licensed libraries does not guarantee
            hosting such connector.

### Images required for publishing

You need to have PNG images with the following dimensions so that those
can be used in the connector store.

-   580x300
-   220x200

### Publishing the connector

When the connector development is complete, create a
[JIRA](https://wso2.org/jira/browse/ISCONNECT) under the **IS Connectors** project with the following information:

-   Source code can be directly attached to the JIRA or do the
    development in your own git repo.
-   Once we review the code we will create a repo under [https://github.com/wso2-extensions](https://github.com/wso2-extensions), and ask you to send the pull request.
-   If GPL or LGPL licensed connectors are used, specify reasons for the
    use of such libraries.