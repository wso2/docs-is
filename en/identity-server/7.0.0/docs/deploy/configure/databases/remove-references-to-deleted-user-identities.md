# Remove References to Deleted User Identities

A key requirement outlined in the General Data Protection Regulation
(GDPR) is the right of the data subject to be forgotten, which gives
individuals the right to request an organization to remove their
personal information from a system.  
To comply with this requirement, WSO2 Identity Server (WSO2 IS) supports
removing references to personally identifiable information (PII) of a
user when a user is deleted from the system.  
You can use the Identity Anonymization tool packaged with WSO2 IS to
remove references to a user’s PII that can generally be stored in
metadata database tables, access logs, audit logs as well as any other
log files in WSO2 IS.

!!! note 
    
    -   The purpose of this tool is to remove references to personally
        identifiable information of a user that can persist in RDBMS tables
        and log files of WSO2 IS after the user is deleted. Therefore, it is
        the responsibility of the WSO2 IS system administrator of an
        organization to run the tool appropriately when required. For
        example, the system administrator should not attempt to run the tool
        to remove references to a user who has not been deleted from the
        system. Although it is practically possible to run the tool to
        remove references to a user who has not been deleted from the
        system, a ttempting to do so can cause unexpected system errors.
    
    -   This tool is designed to replace all occurrences of a deleted user’s
        identity with either a randomly generated UUID value, or a pseudonym
        that you specify when you run the tool. Therefore, running the tool
        does not mean that all data related to a deleted user is completely
        removed from the WSO2 IS when the tool is run. What actually happens
        is that the same pseudonym replaces each record that belongs to a
        deleted user in order to preserves the connection integrity of user
        records. Hence, even after removing all references to a deleted
        user's identity, the system administrator is able to track all
        events performed by a particular user without having any reference
        to the user's identity.
    

The following sections guide you through configuring and running the
Identity Anonymization tool in WSO2 IS.

---
### Building the Identity Anonymization tool

Follow the steps below to build the tool:

1.  Clone the <https://github.com/wso2/identity-anonymization-tool>
    repository to a required location.
2.  In the source that you checked out, navigate to
    `          identity-anonymization-tool         `, and run
    `          mvn clean install         ` . This downloads all
    dependencies and builds the tool in your local repository. You can
    find the
    `          org.wso2.carbon.privacy.forgetme.tool-SNAPSHOT.zip         `
    file created in the
    `          identity-anonymization-tool/components/org.wso2.carbon.privacy.forgetme.tool/target         `
    directory.
3.  Unzip the
    `           org.wso2.carbon.privacy.forgetme.tool-SNAPSHOT.zip          `
    file. This creates the
    `           identity-anonymization-tool-SNAPSHOT          `
    directory with a directory. The path to the
    `           identity-anonymization-tool-SNAPSHOT          `
    directory will be referred to as `           <TOOL_HOME>          `
    throughout this section.

    The following table describes the purpose of the most important
    configuration related directories and files of the tool, which are
    in the `           <TOOL_HOME>/conf          ` directory:

    <table>
    <thead>
    <tr class="header">
    <th>Directory/File name</th>
    <th>Purpose</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>               config.json              </code></td>
    <td>This is the master configuration file.<br />
    You can configure this file depending on the metadata database tables, access logs, audit logs, or any other log
     files on which you want the Identity Anonymization tool to run. For information on how to configure this file
     , see <a href="#configuring-the-master-configuration-file">
     Configuring the master configuration file</a> .</td>
    </tr>
    <tr class="even">
    <td><code>               datasources              </code></td>
    <td><p>This is the default directory where configured datasources are searched for when you run the Identity Anonymization tool.<br />
    If necessary, you can define your own datasource configurations depending on the databases that you want to connect to, and specify the defined datasource configuration location using command line arguments.</p></td>
    </tr>
    <tr class="odd">
    <td><code>               log-config/patterns.xml              </code></td>
    <td>This file should contain all the regex patterns that can be used to find and replace references to deleted user identities in log file entries.</td>
    </tr>
    <tr class="even">
    <td><code>               sql              </code></td>
    <td>This directory should include all the SQL files that contain required queries to replace or delete references to deleted user identities.</td>
    </tr>
    </tbody>
    </table>



## Change the default configurations of the tool

All configurations related to this tool can be found inside the
`         <TOOL_HOME>/conf        `
directory.

The master configuration file of the Identity Anonymization tool is the
`         config.json        ` file. Following is a sample config.json
file:

``` java

  "processors" : [
    "log-file", "rdbms"
  ],
  "directories": [
    {
      "dir": "log-config",
      "type": "log-file",
      "processor" : "log-file",
      "log-file-path" : "<IS_HOME>/repository/logs",
      "log-file-name-regex" : "^(wso2carbon(.)*\\.log|audit(.)*\\.log)$"
    },
    {
      "dir": "sql",
      "type": "rdbms",
      "processor" : "rdbms"
    }
  ],
  "extensions": [
    {
      "dir": "<IS_HOME>/repository/conf/datasources/",
      "type": "datasource",
      "processor" : "rdbms",
      "properties" : [
        {"identity": "WSO2_CARBON_DB"}
      ]
    }
  ]
}
```

You can configure the following in the `         config.json        `
file based on your requirement:

-   `          processors         ` - A list of processors on which you
    want the tool run. The processors that you can specify are
    pre-defined. Possible values are `          RDBMS         ` and
    `          log-file         ` .
-   `          directories         ` - The definitions of directories on
    which you want the tool to run. When you specify a directory
    definition, be sure to either specify the directory path relative to
    the location of the `          config.json         ` file, or
    specify the absolute path to the directory.
-   `          processor         ` - The type of processor to use to
    process instructions in the corresponding directory.
-   `          extensions         ` - The extensions to be initialized
    prior to starting a processor.


The configurations of the tool need to be set up to search
for references of the deleted user from the following file paths. You need to change the config.json file accordingly.

-   **Read Logs** : `          <IS_HOME>/repository/logs         `
-   **Read Data sources** :
    `          <IS_HOME>/repository/conf/datasources         `
-   **Default data source name** : `          WSO2_CARBON_DB         `
-   **Log file name regex** : `          ^(wso2carbon(.)*\\.log|audit(.)*\\.log)$         `

<!--For information on changing these configurations, see [Configuring the
config.json file](TBD:{{base_path}}/setup/removing-references-to-deleted-user-identities-in-wso2-products#configuring-the-master-configuration-file)
in the Product Administration Guide.-->

---

## Run the tool in WSO2 IS

This tool has independent runtime. From IS 6.0.0 onwards, this tool is externalised.

!!! note    
    -   This tool is designed to run in offline mode (i.e., the server
        should be shut down or run on another machine) to prevent
        unnecessary load to the server. If you run the tool in online mode
        (i.e., when the server is running), DB lock situations on the H2
        databases may occur.
    
    -   If you configure any JDBC database other than the H2 database
        provided by default, copy the relevant JDBC driver to the
        `            <TOOL_HOME>/lib           `
        directory.
    
1. Modify the config.json file with the logs directory location and datasources directory location.
2. Open a new terminal window and navigate to the
    `           <TOOL_HOME>/bin          ` directory.
3. Execute one of the following commands depending on your operating
    system:

    -   On Linux/Mac OS:
        `             ./forgetme.sh -U <username>            `
    -   On Windows:
        `             forgetme.bat -U <username>            `

    !!! tip
    
        WSO2 IS allows you to track users that you delete from the system.
        When you configure WSO2 IS to track deleted users, the following
        details of a deleted user are written to a log file:

        <ul>
            <li>User name of the deleted user.</li>
            <li>User store domain name of the deleted user.</li>
            <li>Tenant domain name of the deleted user.</li>
            <li>Tenant ID of the deleted user.</li>
            <li>The time stamp that the user was deleted.</li>
        </ul>
    
        You can use information from this log file when you specify various
        command line options to run the identity anonymization tool to
        remove references to a specific deleted user.  
        For information on how to enable tracking deleted users, see
        [Track user deletion]({{base_path}}/references/user-management/track-deletion).
          

    !!! Note
        The commands specified above use only the
        `              -U <username>             ` option, which is the only
        mandatory option to run the tool. There are several other optional
        command line options that you can specify based on your requirement.
        The supported options are described in detail below.

    Following are details of all possible command line options that you
    can use when you run the tool:

    <table>
    <col width="10%">
    <col width="50%">
    <col width="10%">
    <col width="30%">    
    <thead>
    <tr class="header">
    <th>Command Line Option</th>
    <th>Description</th>
    <th>Required</th>
    <th>Sample Command</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>U</td>
    <td>The user name of the user whose identity references you want to remove.</td>
    <td>Yes</td>
    <td><p>On Linux/Mac OS: <code>                  ./forgetme.sh -U Sam                 </code><br />
    <br />
    On Windows: <code>                  forgetme.bat -U Sam                 </code></p></td>
    </tr>
    <tr class="even">
    <td>d</td>
    <td>The configuration directory to use when the tool is run.<br />
    If you do not specify a value for this option, the default configuration directory of the tool will be used.</td>
    <td>No</td>
    <td><p>On Linux/Mac OS: <code>                  ./forgetme.sh -U Sam -d &lt;TOOL_HOME&gt;/conf                 </code></p>
    <p>On Windows: <code>                  forgetme.bat -U Sam                  -d &lt;TOOL_HOME&gt;/conf                 </code></p></td>
    </tr>
    <tr class="odd">
    <td>T</td>
    <td><div class="content-wrapper">
    <p>The tenant domain of the user whose identity references you want to remove. The default value is <code>carbon.super</code>.</p>
    <p>
    <div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>If you specify the tenant domain as a command line option, it is mandatory to specify the tenant ID of the particular user.
    </p>
    </div> 
    </p>    
    </div></td>
    <td>No</td>
    <td><p>On Linux/Mac OS: <code>                  ./forgetme.sh -U Sam                  -T sam.com -TID 1                 </code></p>
    <p><br />
    On Windows: <code>                  forgetme.bat -U Sam                  -T sam.com -TID 1                 </code></p></td>
    </tr>
    <tr class="even">
    <td>TID</td>
    <td><div class="content-wrapper">
    <p>The tenant ID of the user whose identity references you want to remove .</p>
    <p>
    <div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>If you specify the tenant domain as a command line option, it is mandatory to specify the tenant ID of the particular user.</p>
    </div> 
    </p>
    </div></td>
    <td>No</td>
    <td><p>On Linux/Mac OS: <code>                  ./forgetme.sh -U Sam -T sam.com -TID 1                 </code></p>
    <p><br />
    On Windows: <code>                  forgetme.bat -U Sam -T sam.com -TID 1                 </code></p></td>
    </tr>
    <tr class="odd">
    <td>D</td>
    <td>The user store domain name of the user whose identity references you want to remove . The default value is <code>                 PRIMARY                </code> .</td>
    <td>No</td>
    <td><p>On Linux/Mac OS: <code>                  ./forgetme.sh -U Sam -D Finance-Domain                 </code></p>
    <p><br />
    On Windows: <code>                  forgetme.bat -U Sam                  -D Finance-Domain                 </code></p>
    <p><br />
    </p></td>
    </tr>
    <tr class="even">
    <td>pu</td>
    <td><div class="content-wrapper">
    <p>The pseudonym with which you want to replace references to a deleted user’s identity. If you do not specify a pseudonym when you run the tool, a random UUID value is generated as the pseudonym by default to anonymize references to the deleted user’s identity.</p>
    <p>
    <div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>A valid pseudonym can contain the following characters:
    <ul>
    <li>Uppercase characters {A-Z}</li>
    <li>Lowercase characters {a-z}</li>
    <li><p>Numbers {0-9}</p></li>
    </ul>
    </p>
    </div> 
    </p>
    <p>Following is a sample scenario where it is useful to specify a pseudonym:<br />
    Let's say you run the tool to replace all references to a particular deleted user’s identity, and then you add the same user back to the system for some reason, and later you want to delete the user again and replace all references to the user with the same pseudonym that was used the first time. To do this you need to specify a pseudonym when you run the tool the first time and ensure that you use that same pseudonym when you run the tool the second time.<br />
    </p>
    </div></td>
    <td>No</td>
    <td><p>On Linux/Mac OS: <code>                  ./forgetme.sh -U Sam -pu 123-343-435-545-dfd-4                 </code></p>
    <p><br />
    On Windows: <code>                  forgetme.bat -U Sam                  -pu 123-343-435-545-dfd-4                 </code></p></td>
    </tr>
    <tr class="odd">
    <td>carbon</td>
    <td><p>The CARBON HOME directory path on which you want to run the tool. You should replace this with the variable <code>                  $CARBON_HOME                 </code> used in directories you have configured in the master configuration file.</p></td>
    <td>No</td>
    <td><p>On Linux/Mac OS: <code>                  ./forgetme.sh -U Sam -carbon /usr/bin/wso2is/wso2is5.5.0                 </code></p>
    <p><br />
    On Windows: <code>                  forgetme.bat -U Sam                  -carbon /usr/bin/wso2is/wso2is5.5.0                 </code></p></td>
    </tr>
    </tbody>
    </table>

    Once the tool is run, it creates copies of all log files that are
    defined via the `            log-file-name-regex           ` value
    in the
    `            <IS_HOME>/repository/components/tools/forget-me/conf/config.json           `
    file, and removes references to a specified deleted user’s identity
    in those log file copies. You will see that the log file copies are
    created with the
    `            anon-<TIME_STAMP>-<OROGINAL_FILENAME>.log           `
    naming convention in the
    `            <IS_HOME>/repository/logs           ` directory.

    !!! warning    
        The tool removes references to a deleted user’s identity from all
        RDBMS tables as well as from all log file copies that are created at
        the time the tool is run. It is the responsibility of the system
        administrator of an organization to manually remove the original log
        files that contain a deleted users information at the right time.
    

    Once all the references to a deleted user’s identity are removed,
    the tool generates relevant execution reports in the
    `            <IS_HOME>/repository/components/tools/forget-me/conf           `
    directory with the
    `            Report-<PROCESSOR>-<TIMESTAMP>.txt           ` naming
    convention.

---
 

### Run the standalone version of the tool

If you are using multiple WSO2 products and you want to remove
references to a particular deleted user from all the products at once,
you can use the [standalone version of the Identity Anonymization
tool](https://github.com/wso2/identity-anonymization-tool).

To remove references to a particular deleted user from multiple WSO2
products at once, you have to do necessary configuration changes in the
standalone version of the tool depending on the products that you want
to run the tool on.

For information on how to build, configure and run the standalone
version of the Identity Anonymization tool to run on multiple WSO2
products, see [Remove References to Deleted User Identities]({{base_path}}/deploy/configure/databases/remove-references-to-deleted-user-identities)
in the WSO2 Administration Guide.
