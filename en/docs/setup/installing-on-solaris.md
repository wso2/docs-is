# Installing on Solaris

!!! tip "Before you begin"
    See [environment compatibility](../../setup/environment-compatibility)
    to determine whether the current product version is compatible with your operating system.  


Follow the instructions below to install Identity Server on Solaris.

### Installing the required applications

1.  Establish an SSH connection to the Solaris machine or log in on the
    text console.
2.  Be sure your system meets the [Installation Prerequisites](../../setup/installation-prerequisites).  Java Development Kit (JDK) is essential to run the product.

### Installing the Identity Server

1.  Download the latest version of the Identity Server from
    <http://wso2.com/products/identity-server/> .
2.  Extract the archive file to a dedicated directory for the Identity
    Server, which will hereafter be referred to as
    `           <IS_HOME>          ` .

### Setting up JAVA_HOME

You must set your `         JAVA_HOME        ` environment variable to
point to the directory where the Java Development Kit (JDK) is installed
on the computer.

Setting `JAVA_HOME` is a standard practice when you are using Java based programs. You may not need to do this manually depending on your Java Installer, as this variable is usually set by the Java installer itself. This guide is provided in case the `JAVA_HOME variable` has not been set or is incorrectly set on your machine.

!!! info
    Environment variables are global system variables accessible by all the processes running under the operating system.

1.  In your home directory, open the BASHRC file in your favorite text
    editor, such as vi, emacs, pico, or mcedit.
2.  Assuming you have JDK 1.8.0_141 in your system, add the following
    two lines at the bottom of the file, replacing
    `           /usr/java/jdk1.8.0_141          ` with the actual
    directory where the JDK is installed.

    ``` java
    export JAVA_HOME=/usr/java/jdk1.8.0_141
    export PATH=${JAVA_HOME}/bin:${PATH}
    ```

3.  Save the file.

    !!! info
        If you do not know how to work with text editors in an SSH session, run the following command.
        ```
        cat >> .bashrc
        ``` 
        Paste the string from the clipboard and press "Ctrl+D".

4.  To verify that the `          JAVA_HOME         ` variable is set
    correctly, execute the following command.
    ```
    echo $JAVA_HOME
    ```

    ![Echo command](../../assets/img/setup/echo-command.png)

5.  The system returns the JDK installation path.

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
    code and secure the properties file with the [cipher tool](../../setup/encrypting-passwords-with-cipher-tool).

You are now ready to [run the product](../../setup/running-the-product).
