# Quick Setup

Follow the steps given below to set up and install {{ product_name }} (WSO2 IS) on your computer in quick time.

!!! info
    For detailed instructions on other installation options and deployments, see the [installation guide]({{base_path}}/deploy/get-started/install/).

## Install the {{ product_name }}

Follow the steps given below.

1. Download and install Oracle Java SE Development Kit (JDK) version 11 or 17.
2. Go to [{{ product_name }} official website](https://wso2.com/identity-server/) and click on **Download**.
3. Install {{ product_name }} by downloading the **LATEST RELEASE**.

    !!! info
        The installation location of {{ product_name }} is referred to as `{IS_HOME}`.

<!-- The {{ product_name }} installation location can vary depending on the operating system as given below:

|OS     |Home Directory                                |
|:------|:---------------------------------------------|
|Mac OS | `/Library/WSO2/IdentityServer/<IS_HOME>`         |
|Windows| `C:\Program Files\WSO2\IdentityServer\<IS_HOME>` |
|Ubuntu | `/usr/lib/wso2/IdentityServer/<IS_HOME>`         |
|CentOS | `/usr/lib64/IdentityServer/<IS_HOME>`           |

-->

## Start the {{ product_name }}

To start WSO2 IS, open a terminal, navigate to the `<IS_HOME>/bin` folder, and execute one of the following commands:

- On Linux/MacOS

    ``` bash
    sh wso2server.sh
    ```

- On Windows

    ``` bash
    wso2server.bat
    ```

Note that the following log appears in the command prompt when the server starts:

![QSG start server]({{base_path}}/assets/img/get-started/qsg-start-server.png)

!!! tip "Shutting down the server"
    To shutdown the server, press `Ctrl + C`.
    Note that the following log appears in the command prompt on server shutdown.

    ![QSG stop server]({{base_path}}/assets/img/get-started/qsg-stop-server.png)

## Access the Console

Once the server has started, you can access the {{ product_name }} console by navigating to the following URL.

`https://{Server Host}:{Port}/console`

For example, if you are using default settings, the console URL will be `https://localhost:9443/console`.

You will then be presented with the login screen for the {{ product_name }}. Enter `admin` for both username and password fields to login as the admin user.

![Login screen of IS]({{base_path}}/assets/img/get-started/login-to-is.png){: width="400" style="display: block; margin: 0;"}

## What's next?

Add login to your application using {{ product_name }} or try it on a sample application. [Try integrating IS into apps]({{base_path}}/get-started/try-samples).

