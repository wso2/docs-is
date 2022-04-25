1. Download and install Oracle Java SE Development Kit (JDK) version version 1.8 or 11).

2. Install WSO2 Identity Server by downloading the [installer](https://wso2.com/identity-and-access-management/install/). 
   The WSO2 Identity Server installation location varies according to the OS as given below.

    |OS     |Home Directory                                |
    |:------|:---------------------------------------------|
    |Mac OS | `/Library/WSO2/IdentityServer/<IS_HOME>`         |
    |Windows| `C:\Program Files\WSO2\IdentityServer\<IS_HOME>` |
    |Ubuntu | `/usr/lib/wso2/IdentityServer/<IS_HOME>`         |
    |CentOS | `/usr/lib64/IdentityServer/<IS_HOME>`           |

    In this guide, the installation location of WSO2 Identity Server is referred to as `<IS_HOME>`.

3. [Download](https://curl.haxx.se/download.html) and install curl. Make
      sure you install the binary type file of the version you choose.

4. Open the `/etc/hosts` file and add the following entry.
    
        127.0.0.1        localhost.com    

    !!! note "Notes"
        * If you are planning to use single sign-on (SSO), do not use `localhost` as it will cause the Tomcat naked host issue. Use `localhost.com` instead. If you are using Windows, `localhost.com` is considered as `127.0.0.1`.<br/>
        * Make sure that this is the only such entry available for this IP address in the `/etc/hosts` file to avoid any conflicts.

5. [Start](../../deploy/get-started/run-the-product/) WSO2 Identity Server. You
   are now ready to deploy the sample.

### Steps to configure and run the samples

1.  Download the samples from [GitHub](https://github.com/wso2/samples-is/releases/download/v4.3.0/is-samples-distribution.zip) and unzip.

    ``` java
    unzip is-samples-distribution.zip
    ```

    !!! note
    
        From this point onwards:
    
        -   `<IS_HOME>` is the directory in which the WSO2 Identity Server is installed.
        -   `<IS_SAMPLE_DISTR>` is the directory where downloaded `is-samples-distribution.zip` archive is extracted.
    

2.  Open the server.properties file in `<IS_SAMPLE_DISTR>/IS-QSG/conf/` and make sure that `wso2is.host.domain` and `wso2is.host.port` are configured as shown below.             
    ```
    #localhost.com is used to resolve naked hostname validation issue
    wso2is.host.domain=localhost.com
    wso2is.host.port=9443
    server.host.domain=localhost.com
    server.host.port=8080
    ```

3.  Navigate to `<IS_HOME>/bin` using the command prompt and start the server.

    ``` java
    Linux   --> sh wso2server.sh
    Windows --> wso2server.bat
    ```
    Note that the following appears in the command prompt after the server start.
    
    ![QSG start server](../../assets/img/get-started/qsg-start-server.png)

    !!! tip "Shutting down the server"
        To shutdown the server, press `Ctrl + C`.
        Note that following log appears in the command prompt after the server shutdown.
        
        ![QSG stop server](../../assets/img/get-started/qsg-stop-server.png)

4.  Navigate to `<IS_SAMPLE_DISTR>/IS-QSG/bin` and execute either of the following commands to start the sample application. 
       
    ``` java
    Linux   --> sh app-server.sh
    Windows --> app-server.bat
    ```

5.  Navigate to `<IS_SAMPLE_DISTR>/IS-QSG/bin` and execute the following commands to start the Quick Start samples accordingly.

    ``` java
    Linux   --> sh qsg.sh 
    Windows --> qsg.bat 
    ```

6.  When prompted, confirm the configurations.
7. Note that a message appears to pick a scenario, which indicates that the samples are deployed and WSO2 Identity Server is up and running.