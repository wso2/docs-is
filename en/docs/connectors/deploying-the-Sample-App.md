# Deploying the Sample App

This topic provides instructions on how to download and deploy the
sample application (travelocity).

-   [Download the samples](#DeployingtheSampleApp-Downloadthesamples)
-   [Deploy the sample web
    app](#DeployingtheSampleApp-Deploythesamplewebapp)

!!! tip
    
    Before you begin!
    
    -   To ensure you get the full understanding of configuring Email OTP
        with WSO2 IS, the sample travelocity application is used in this use
        case. The samples run on the Apache Tomcat server and are written
        based on Servlet 3.0. Therefore, download Tomcat 7.x from
        [here](https://tomcat.apache.org/download-70.cgi).
    -   Install Apache Maven to build the samples. For more information, see
        [Installation
        Prerequisites](https://docs.wso2.com/identity-server/Installation+Prerequisites)
        .
    

#### Download the samples

To be able to deploy a sample of Identity Server, you need to download
it onto your machine first.

Follow the instructions below to download a sample from GitHub.

1.  Create a folder in your local machine and navigate to it using your
    command line.
2.  Run the following commands.

    ``` bash
    mkdir is-samples
    cd is-samples/
    git init
    git remote add -f origin https://github.com/wso2/product-is.git
    ```

    ``` bash
        git config core.sparseCheckout true
    ```

3.  Navigate into the . `            git/info/           ` directory and
    list out the folders/files you want to check out using the
    `            echo           ` command below.

    ``` bash
        cd .git
        cd info
        echo "modules/samples/" >> sparse-checkout
    ```

4.  Navigate out of `            .git/info           ` directory and
    checkout the `            v5.4.0           ` tag to update the empty
    repository with the remote one.

    ``` bash
        cd ..
        cd ..
        git checkout -b v5.4.0 v5.4.0
    ```

    Access the samples by navigating to the
    `            is-samples/modules/samples           ` directory.

#### Deploy the sample web app

Deploy this sample web app on a web container.

1.  Use the Apache Tomcat server to do this. If you have not downloaded
    Apache Tomcat already, download it from
    [here](https://tomcat.apache.org/download-70.cgi).
2.  Copy the .war file into the `           webapps          `
    folder. For example,
    `           <TOMCAT_HOME>/apache-tomcat-<version>/webapps          `
    .
3.  Start the Tomcat server.

To check the sample application, navigate to
`          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
on your browser.

For example,
`                     http://localhost:8080/travelocity.com/index.jsp                    .         `

!!! note
    
    **Note** : It is recommended that you use a hostname that is not
    `          localhost         ` to avoid browser errors. Modify the
    `          /etc/hosts         ` entry in your machine to reflect this.
    Note that `          localhost         ` is used throughout
    thisdocumentation as an example, but you must modify this when
    configuring these authenticators or connectors with this sample
    application.
    
