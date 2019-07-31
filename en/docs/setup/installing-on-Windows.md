# Installing on Windows

!!! tip
    
    **Before you begin**, [please see our compatibility
    matrix](https://docs.wso2.com/display/compatibility/Tested+Operating+Systems)
    to find out if this version of the product is fully tested on Windows.
    
    WSO2 Identity Server (WSO2 IS) 5.3.0 and 5.4.0 is
    not supported on Windows 10, due to an issue with Windows 10 and Java.
    We will update the information about Windows 10 support once the
    incompatibility is resolved.
    

Follow the instructions below to install the WSO2 Identity Server on
Windows.

### Installing the required applications

1.  Ensure that your system meets the requirements specified in the
    [Installation Prerequisites](_Installation_Prerequisites_).  Java
    Development Kit (JDK) is essential to run the product.
2.  Ensure that the `          PATH         ` environment variable is
    set to `          C:\Windows\System32         `, because the
    `          findstr         ` Windows.exe file is stored in this
    path.

### Installing the Identity Server

1.  Download the latest version of the Identity Server from
    <http://wso2.com/products/identity-server/> .
2.  Extract the archive file to a dedicated directory for the Identity
    Server, which will hereafter be referred to as
    `           <IS_HOME>          ` .

3.  Set the `          CARBON_HOME         ` environment variable by
    pointing it to the directory where you download WSO2 Identity Server
    into. For more information on how to do this, see
    [here](https://www.java.com/en/download/help/path.xml).

### Setting up JAVA\_HOME

You must set your `         JAVA_HOME        ` environment variable to
point to the directory where the Java Development Kit (JDK) is installed
on the computer. Typically, the JDK is installed in a directory under
`         C:/Program Files/Java        `, such as
`         C:/Program Files/Java/jdk1.8.0_141        ` . If you have
multiple versions installed, choose the latest one, which you can find
by sorting by date.

Environment variables are global system variables accessible by all the
processes running under the operating system. You can define an
environment variable as a system variable, which applies to all users,
or as a user variable, which applies only to the user who is currently
logged in.

You set up JAVA\_HOME using the System Properties, as described below.
Alternatively, if you just want to set JAVA\_HOME temporarily for the
current command prompt window, [set it at the command
prompt](#InstallingonWindows-cmd).

**Setting up JAVA\_HOME using the system properties**

1.  Right-click the **My Computer** icon on the desktop and choose
    **Properties**.  

    ![](attachments/thumbnails/26838941/27042151) 

2.  In the System Properties window, click the **Advanced** tab, and
    then click the **Environment Variables** button.  

    ![](attachments/26838941/27042150.png) 

3.  Click the New button under **System variables** (for all users) or
    under **User variables** (just for the user who is currently logged
    in).  

    ![](attachments/thumbnails/26838941/27042154) 

4.  Enter the following information:  
    -   In the **Variable name** field, enter:
        `            JAVA_HOME           `
    -   In the **Variable value** field, enter the installation path of
        the Java Development Kit, such as:
        `            c:/Program Files/Java           `
        `            jdk1.8.0_141           `

The JAVA\_HOME variable is now set and will apply to any subsequent
command prompt windows you open. If you have existing command prompt
windows running, you must close and reopen them for the JAVA\_HOME
variable to take effect, or manually set the JAVA\_HOME variable in
those command prompt windows as described in the next section. To verify
that the `         JAVA_HOME        ` variable is set correctly, open a
command window (from the **Start** menu, click **Run**, and then type
`         CMD        ` and click **Enter** ) and execute the following
command:

    set JAVA_HOME

The system returns the JDK installation path. You are now ready to [run
the product.](../../setup/running-the-product)

**Setting JAVA\_HOME temporarily using the Windows command prompt
(CMD)**

You can temporarily set the `         JAVA_HOME        ` environment
variable within a Windows command prompt window (CMD). This is useful
when you have an existing command prompt window running and you do not
want to restart it.

1.  In the command prompt window, enter the following command where
    `           <JDK_INSTALLATION_PATH>          ` is the JDK
    installation directory and press **Enter.**

        set JAVA_HOME=<JDK_INSTALLATION_PATH>

    For example:
    `           set JAVA_HOME=c:/Program Files/java/jdk1.8.0_141          `

    The JAVA\_HOME variable is now set for the current CMD session only.

2.  To verify that the `          JAVA_HOME         ` variable is set
    correctly, execute the following command:  

        set JAVA_HOME

3.  The system returns the JDK installation path.

### Setting system properties

If you need to set additional system properties when the server starts,
you can take the following approaches:

-   **Set the properties from a script** : Setting your system
    properties in the startup script is ideal, because it ensures that
    you set the properties every time you start the server. To avoid
    having to modify the script each time you upgrade, the best approach
    is to create your own startup script that wraps the WSO2 startup
    script and adds the properties you want to set, rather than editing
    the WSO2 startup script directly.
-   **Set the properties from an external registry** : If you want to
    access properties from an external registry, you could create Java
    code that reads the properties at runtime from that registry. Be
    sure to store sensitive data such as username and password to
    connect to the registry in a properties file instead of in the Java
    code and secure the properties file with the [secure
    vault](https://docs.wso2.com/display/Carbon420/Carbon+Secure+Vault+Implementation)
    .

You are now ready to [run the product](../../setup/running-the-product).
