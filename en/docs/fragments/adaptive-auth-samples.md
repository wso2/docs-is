## Set up the samples

{!fragments/pickup-dispatch-saml.md!}

### Deploy sample authenticators

1.  Download the [the sample authenticators](../../assets/attachments/org.wso2.carbon.identity.sample.extension.authenticators-5.10.0.jar) file and paste it inside the `<IS_HOME>/repository/components/dropins` directory.

    This `.jar` file contains an implementation of a Demo HardwareKey authenticator, Demo Fingerprint authenticator, and Demo FaceID authenticator.
            
2.  Download the [sample-auth.war](https://github.com/wso2/samples-is/releases/download/ v4.3.0/sample-auth.war) file and paste it inside the `<IS_HOME>/repository/deployment/server/webapps` folder.  

3. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. 

    ``` toml
    [[resource.access_control]]
    context = "/sample-auth(.*)"
    secure = false
    http_method = "all"
    ```
    