# Quick Setup

Follow the steps given below to set up and install WSO2 Identity Server (WSO2 IS) on your computer in quick time. 

!!! info
    For detailed instructions on other installation options and deployments, see the [installation guide]({{base_path}}/deploy/get-started/install/).

## Install WSO2 IS

Follow the steps given below.

1. Download and install Oracle Java SE Development Kit (JDK) version 11 or 17.
2. Install WSO2 Identity Server by downloading the [installer](https://wso2.com/identity-and-access-management/install/).

    !!! info
        The installation location of WSO2 Identity Server is referred to as `<IS_HOME>`.

The WSO2 Identity Server installation location can vary depending on the operating system as given below:

|OS     |Home Directory                                |
|:------|:---------------------------------------------|
|Mac OS | `/Library/WSO2/IdentityServer/<IS_HOME>`         |
|Windows| `C:\Program Files\WSO2\IdentityServer\<IS_HOME>` |
|Ubuntu | `/usr/lib/wso2/IdentityServer/<IS_HOME>`         |
|CentOS | `/usr/lib64/IdentityServer/<IS_HOME>`           |

## Configure the server

Open the `deployment.toml` file (stored in the `<IS_HOME>/repository/conf` folder) and add the following configuration to enable CORS:

``` toml
[cors]
allow_generic_http_requests = true
allow_any_origin = true
supported_methods = [
    "POST",
    "HEAD",
    "OPTIONS"
]
supports_credentials = false
max_age = 3600
tag_requests = false
``` 

## Start WSO2 IS

To start WSO2 IS, open a terminal, navigate to the `<IS_HOME>/bin` folder, and execute one of the following commands:

-   On Linux/MacOS

    ``` bash
    sh wso2server.sh
    ```

-   On Windows
    
    ``` bash
    wso2server.bat
    ```

Note that the following log appears in the command prompt when the server starts:
    
![QSG start server]({{base_path}}/assets/img/get-started/qsg-start-server.png)

!!! tip "Shutting down the server"
    To shutdown the server, press `Ctrl + C`.
    Note that the following log appears in the command prompt on server shutdown.
    
    ![QSG stop server]({{base_path}}/assets/img/get-started/qsg-stop-server.png)

## What's next?

Try out the [sample IAM scenarios]({{base_path}}/get-started/sample-use-cases/sample-scenario) to get familiar with WSO2 IS and its capabilities.


