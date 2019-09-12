# Upgrading an Authenticator

This topic provides instructions on how to upgrade a connector and it's
artifacts to the latest version in WSO2 Identity Server.

!!! tip
    
    Before you begin
    
    Stop WSO2 Identity Server if the server is already running.
    

1.  Download and extract the latest version of the connector
    artifacts (.jar, .war, gadgets etc.,) from the [connector
    store](https://store.wso2.com/store/assets/isconnector/list).
2.  Replace the old `          .jar         ` file found in the
    `          <IS_HOME>/repository/components/dropins         ` folder
    with the new `          .jar         ` file that you downloaded.
3.  For some connectors such as SMSOTP, EmailOTP, TOTP, X509Certificate
    etc., you are required to deploy `          .war         ` files. To
    do this,
    1.  Navigate to the
        `            <IS_HOME>/repository/deployment/server/webapps/           `
        directory, and remove the existing `            .war           `
        file and the extracted folder of the
        `            .war           ` of the specific authenticator that
        you want to upgrade.
    2.  Copy the latest `            .war           ` file that you
        downloaded in step 1 to the
        `            <IS_HOME>/repository/deployment/server/webapps/           `
        directory.
4.  For some authenticators such as EmailOTP, you are required to do
    specific configurations in the
    `          <IS_HOME>/repository/conf/identity/application-authentication.xml         `
    file under the \< `          AuthenticatorConfigs         ` \>
    section. Update these configurations with the latest values
    according to the specific connector that you are upgrading.

!!! note
    
    **Note:** If you are upgrading the TOTP authenticator, replace the
    `         user_profile        ` folder found in the
    `         <IS_HOME>/repository/deployment/server/jaggeryapps/portal/gadgets        `
    directory with the relevant `         user_profile        ` folder
    provided in the artifacts folder you downloaded in step 1.
    
