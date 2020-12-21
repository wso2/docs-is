# Downloading a Sample

To be able to deploy a sample of WSO2 Identity Server, download
it onto your machine first.

Follow the instructions below to download a sample from GitHub.

1.  Create a folder in your local machine and navigate to it using your
    command line.
2.  Execute the following commands.
    ``` bash
    mkdir is-samples
    cd is-samples/
    git init
    git remote add -f origin https://github.com/wso2/product-is.git
    ```

    ``` bash
    git config core.sparseCheckout true
    ```

3.  Navigate into the . `           git/info/          ` directory and
    list out the folders/files you want to check out using the
    `           echo          ` command below.

    ``` bash
    cd .git/info
    echo "modules/samples/" >> sparse-checkout
    echo "/pom.xml" >> sparse-checkout
    ```

4.  Navigate out of `           .git/info          ` directory and
    checkout the `           v5.5.0          ` tag to update the empty
    repository with the remote one.

    ``` bash
    cd ../..
    git checkout -b v5.11.0 v5.11.0
    ```

    Access the samples by navigating to the ` is-samples/modules/samples
    ` directory. This location will be referred as `<Sample_Home>`.
