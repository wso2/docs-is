# Setting Up An LDAP User Store

This tutorial guides you through creating an LDAP user store using
Apache Directory Studio and connecting the user store to WSO2 Identity
Server.

!!! tip
    
    Before you begin
    
    -   [Download and install Apache Directory
        Studio](https://directory.apache.org/studio/downloads.html).
    -   [Download and install WSO2 Identity
        Server](https://wso2.com/identity-and-access-management).
    

### Creating a new LDAP server

1.  Open Apache Directory Studio.
2.  In the **LDAP Servers** tab found on the bottom left corner, click
    **New Server**.  
    ![add-new-ldap](../../assets/img/tutorials/add-new-ldap.png)
3.  Select **LDAP server ApacheDS 2.0.0** and click **Finish**.  
    ![](../../assets/img/tutorials/add-new-ldap-2.png)
4.  Right-click on the newly created server and click **Open
    Configuration**.  
    ![open-ldap-configuration](../../assets/img/tutorials/open-ldap-configuration.png)

5.  Port offset the LDAP and LDAP server ports by changing the LDAP port
    to 10390 and the LDAP server port to 10637. 
    
    This ensures that the
    embedded LDAP server running in the prior installation of WSO2 IS
    does not conflict with the current installation.  
    ![enable-ldap-server](../../assets/img/tutorials/enable-ldap-server.png)

6.  Right-click on the new server and click **Create a Connection**.  
    ![create-ldap-connection](../../assets/img/tutorials/create-ldap-connection.png)
7.  Right-click on the server and click **Run** to start the server.   
    ![run-ldap-server](../../assets/img/tutorials/run-ldap-server.png)

### Configuring the user store

1.  Log in to the management console.
2.  Click **Add** under **User Stores** on the **Main** tab and add a
    new secondary user store named "EMPLOYEES".  
    ![add-ldap-user-store](../../assets/img/tutorials/add-ldap-user-store.png)

3.  Configure the user store properties as follows.

    ![configure-ldap-user-store](../../assets/img/tutorials/configure-ldap-user-store.png)

    1.  **Connection URL** - <ldap://localhost:10390> 
        
        Right-click on the connection in ApacheDS and click **Open
        Configuration**. Since the LDAP server will run on your local
        machine, you can use the connection URL
        `             localhost:10390            ` according to the
        configured port.

        ![enable-ldap-server](../../assets/img/tutorials/enable-ldap-server.png)
        

    2.  **Connection Name** -
        `             uid=admin,ou=system            `  
        
        Right-click on the connection, click **Properties** and then
        click **Authentication.** The connection name is the username
        given as the **Bind DN or user** value.  

        The user is used to connect to the database and perform various
        operations. This user does not have to be an administrator in
        the user store or have an administrator role in the WSO2 product
        that you are using, but this user MUST have permissions to read
        the user list and users' attributes and to perform search
        operations on the user store. This value is the DN (Distinguish
        Name) attribute of the user.

        ![configure-connection-to-ldap](../../assets/img/tutorials/configure-connection-to-ldap.png)

    3.  **Connection Password** - secret  
        
        This is the password for the user entered in the **Connection
        Name** field. Click on the admin user that is created by default
        to open up the related details.  
        ![ldap-connection-password](../../assets/img/tutorials/ldap-connection-password.png)

        Double-click on **user password** and select the **Show Current
        Password Details** check box. The current password is
        displayed.  
        ![ldap-connection-password-2](../../assets/img/tutorials/ldap-connection-password-2.png)

    4.  **User Search Base** - ou=users,ou=system  
        
        This is the DN of the context or object under which the user
        entries are stored in the user store. i.e. the "users"
        container. Double-click on
        `                           ou=users                         `
        on the LDAP Browser to view the DN value.  
        ![ldap-dn](../../assets/img/tutorials/ldap-dn.png)

    5.  **User Entry Object Class** - intetOrgPerson  
        
        To find a suitable User Entry Object Class, see the
        documentation on the directory service. For ApacheDS, see
        [Schema
        Elements](https://directory.apache.org/apacheds/basic-ug/2.3.1-adding-schema-elements.html)
        .

    6.  **Group Search Base** - ou=groups,ou=system  
        
        On the **Add New User Store** screen of the management console,
        expand the **Optional** tab and edit the **Group Search Base**
        field. This is the DN of the context under which the user
        entries are stored in the user store. Double-click on
        `                           ou=users                         `
        on the LDAP Browser of ApacheDS to view the DN value.

        ![ldap-dn-group](../../assets/img/tutorials/ldap-dn-group.png)

4.  In order to reduce the complexity constraints of adding a username
    and password, disable the password quality check.

    1.  Right-click on the connection in ApacheDS and click **Open
        Configuration**.

    2.  Click on the **Password Policies** tab of the configuration
        window.

    3.  Change the **Check Quality** field under the **Quality** section
        to **Disabled** and save the configuration.

        ![ldap-disable-quality-check](../../assets/img/tutorials/ldap-disable-quality-check.png)

5.  Click **Update** to save the configurations.
