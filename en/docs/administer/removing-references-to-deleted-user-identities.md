# Removing References to Deleted User Identities

A key requirement outlined in the General Data Protection Regulation
(GDPR) is the right of the data subject to be forgotten, which gives
individuals the right to request an organisation to remove their
personal information from a system.  
To comply with this requirement, WSO2 Identity Server (WSO2 IS) supports
removing references to personally identifiable information (PII) of a
user when a user is deleted from the system.  
You can use the Identity Anonymization tool packaged with WSO2 IS to
remove references to a user’s PII that can generally be stored in
metadata database tables, access logs, audit logs as well as any other
log files in WSO2 IS.

!!! note "Before you begin, keep the following in mind"
    
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

### Changing default configurations of the tool

All configurations related to this tool can be found inside the
`         <IS_HOME>/repository/components/tools/forget-me/conf        `
directory. The default configurations of the tool are set up to search
for references of the deleted user from the following file paths:

-   **Read Logs** : `          <IS_HOME>/repository/logs         `
-   **Read Data sources** :
    `          <IS_HOME>/repository/conf/datasources/         `
-   **Default data source name** : `          WSO2_CARBON_DB         `
-   **Log file name regex** : `          wso2carbon.log         `

For information on changing these configurations, see [Configuring the
config.json file](../../admin-guide/removing-references-to-deleted-user-identities-in-wso2-products#configuring-the-master-configuration-file)
in the Product Administration Guide.

### Changing the default configuration directory location

You can change the default location of the tool configurations if
desired. You may want to do this if you are working with a multi-product
environment where you want to manage configurations in a single location
for ease of use. Note that this is **optional**.

To change the default configurations location for the embedded tool, do
the following:

1.  Open the `            forgetme.sh           ` file found inside the
    `            <IS_HOME>/bin           ` folder.

2.  The location path is the value given after
    `                         -d                       ` within the
    following line. Modify the value after
    `                         -d                       ` to change the
    location.  
    The default location path is
    `            $CARBON_HOME/repository/components/tools/forget-me/conf.           `

    ``` java
    sh $CARBON_HOME/repository/components/tools/forget-me/bin/forget-me -d $CARBON_HOME/repository/components/tools/forget-me/conf $@
    ```

### Running the tool in WSO2 IS

This tool is packaged with WSO2 Identity Server by default. Follow the
steps below to run the tool:

  

!!! note    
    -   This tool is designed to run in offline mode (i.e., the server
        should be shut down or run on another machine) to prevent
        unnecessary load to the server. If you run the tool in online mode
        (i.e., when the server is running), DB lock situations on the H2
        databases may occur.
    
    -   If you configure any JDBC database other than the H2 database
        provided by default, copy the relevant JDBC driver to the
        `            <IS_HOME>/repository/components/tools/forget-me/lib           `
        directory.
    

1.  Open a new terminal window and navigate to the
    `           <IS_HOME>/bin          ` directory.
2.  Execute one of the following commands depending on your operating
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
        [Tracking user deletion on deleting a
        user](../../using-wso2-identity-server/configuring-users#tracking-user-deletion-on-deleting-a-user).
          

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
    <p>The tenant domain of the user whose identity references you want to remove. The default value is <code>                   carbon.super                  </code> . For information on working with tenants in WSO2 products, see <a href="../../using-wso2-identity-server/working-with-multiple-tenants">Working with Multiple Tenants</a> .</p>
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

### Running the tool in WSO2 IS Analytics

To use this tool with WSO2 IS Analytics, you can configure and run the
tool by following the same steps given in this guide in the
`          <IS_ANALYTICS_HOME>         ` directory (the WSO2 IS
analytics installation directory) instead of the
`          <IS_HOME>         ` directory.

!!! note    
    Before you run the tool, be sure to start the WSO2 IS Analytics server
    at least once to generate the required analytics streams.
    

### Running the standalone version of the tool

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
products, see [Removing References to Deleted User Identities in WSO2
Products](../../admin-guide/removing-references-to-deleted-user-identities-in-wso2-products)
in the WSO2 Administration Guide.
