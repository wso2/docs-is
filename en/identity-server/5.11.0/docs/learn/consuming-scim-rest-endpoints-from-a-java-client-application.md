# Consuming SCIM Rest Endpoints from a JAVA Client Application

### Running the sample

1.  Start the Identity Server, using the startup script found in the
    `          <IS_HOME>/bin         ` directory.
    -   `              wso2server.sh             ` for Linux
    -   `              wso2server.bat             ` for Windows

2.  Download and Install [Apache
    Ant](https://ant.apache.org/bindownload.cgi), if you have not
    already done so.
3.  Refer the `          client.properties         ` file for SCIM user
    endpoint, group endpoint URLs, username and password. Modify it if
    the default configuration to run the sample are different.
4.  Copy the `          scim-provisioning         ` folder to the
    Identity Server's samples directory
    `          <IS_HOME>/samples/.         `
5.  Using the command line, navigate inside the
    `          scim-provisioning         ` directory
    `          <IS_HOME>/samples/scim-provisioning         ` and run the
    ` ant` command.

### Users

##### Creating a user

1.  Run the `ant create-user` command at this
    directory level in the command line and observe the JSON message
    sent to the SCIM endpoint, the response status and the SCIM response
    printed in the command line output.
2.  [Log in to the Identity
    Server](../../setup/running-the-product)and
    go to **Users and Roles\>List** in the **Main** menu in the
    [management
    console](../../setup/getting-started-with-the-management-console).
3.  Click **Users** and you can now view a new user created in the list
    using the sample.

!!! note
    
    To add more attributes to the create user method, you can modify the
    `                   org.wso2.scim.sample.user.CreateUser                 `
    class accordingly and observe the output in the command line.
    

##### Updating a user

1.  Run the `ant update-user` command at this
    directory level in the command line and observe the JSON message
    sent to the SCIM endpoint, the response status and the SCIM response
    are printed in the command line output.

    !!! note 
        You will notice that the user created above, is updated
        with new attribute values for:display name and work email. If you
        wish, you can modify the
        `org.wso2.scim.sample.user.UpdateUser`
        class to add more attributes to a user and observe the output in the

2.  Go to **Users and Roles\>List** in the **Main** menu in the
    management console of IS.
3.  Click **Users** and select the user created in the first step. You
    will notice that the user is updated with new attribute values for
    display name and work email.

    !!! note
        To add more attributes to the create user method, you can modify the
        `org.wso2.scim.sample.user.UpdateUser` class
        accordingly and observe the output in the command line.
    

### Groups

##### Creating a group

1.  Run the `ant create-group` command at this
    directory level in the command line and observe the JSON message
    sent to the SCIM endpoint, the response status and the SCIM response
    printed in the command line output.
2.  Go to **Users and Roles\>List** in the **Main** menu in the
    management console of IS.
3.  Click **Roles** and you can now view a new group created in the
    list, and the new user that was assigned to that role using the
    sample.
