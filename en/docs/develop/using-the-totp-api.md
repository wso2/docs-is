# Using the TOTP API

!!! warning
    **Note** : This is a draft version of this document.
    
This page guides you through using the TOTP API to enable TOTP
authenticator and generate QR-Code url and the different operations you
can use to work with it. See the following sections for more
information.

### Configuring user claims

Add the claims ' **Enable TOTP** ', ' **Encoding** ', and ' **Secret Key** ' as described in [Configuring user
claims](https://docs.wso2.com/display/ISCONNECTORS/Configuring+TOTP+Authenticator#ConfiguringTOTPAuthenticator-ConfiguringUserClaimsConfiguringuserclaims)
.

### Deploying TOTP artifacts

The artifacts can be obtained by downloading them from the
[store](https://store.wso2.com/store/assets/isconnector/bbd7a86e-820d-41a8-b03d-f070fd85b4f7)
.

1.  Place the `          totpauthenticationendpoint.war         ` file
    into the
    `          <IS_HOME>/repository/deployment/server/webapps         `
    directory.
2.  Place the
    org.wso2.carbon.extension.identity.authenticator.totp.connector-1.0.2.jar
    into the
    `          <IS_HOME>/repository/components/dropins         `
    directory.
3.  Place the
    `                     googleauth-0.6.0.jar                   ` into
    the `          <IS_HOME>/repository/components/lib         `
    directory.
4.  Place the authenticator .properties file (
    `          totp.properties         ` ) into the
    `          <IS_HOME>/repository/conf         ` directory. An admin
    can change the priority of the TOTP authenticator by changing the
    `          enableTOTP         ` values ( `          true         `
    or `          false         ` ) in the
    `          totp.properties         ` file.
    1.  If the admin specifies that the TOTP is mandatory (
        `            enableTOTP=true           ` ) in the second factor,
        the user should enable the TOTP in the user’s profile in order
        to authenticate the system. If this is not done, the TOTP error
        page.
    2.  If the admin specifies that the TOTP as optional (
        `            enableTOTP=false           ` ) and the user enables
        TOTP in the user's profile, the authenticator will allow the
        user to login with TOTP authentication as a second step
        (multi-step authentication. If the admin specifies that
        the TOTP as optional and user does not enable TOTP in user's
        profile, TOTP authenticator will proceed to log the user in as
        the first step (basic authentication).
5.  Create a directory with the name of the patch (for example,
    patch001) inside the
    `          <IS_HOME>/repository/components/patches         `
    directory and copy the
    `          commons-codec_1.4.0.wso2v1.jar(         ` You should use
    the jar given in `          other_artifacts)         ` to the
    created folder.

### Enable TOTP admin service

1.  Set the `          <HideAdminServiceWSDLs>         ` element to
    false in the
    `          <IS_HOME>/repository/conf/carbon.xml         ` file.
2.  Restart the server.
3.  The service contract of this admin service can be found at
    https://\<IS\_HOST\>:\<IS\_PORT\>/services/TOTPAdminService?wsdl.
    Replace the tag \<IS\_HOST\>:\<IS\_PORT\> with the relevant host and
    port number, for example:
    <https://localhost:9443/services/TOTPAdminService?wsdl>

### Enable TOTP

TOTP Authenticator can be enabled by calling the
`         initTOTP        ` function given in the
`         TOTPAdminService        ` as seen in the sample request below.

``` java
curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded'  -H 'Authorization:Basic <base64Encoded string of USERNAME:PASSWORD>' https://localhost:9443/services/TOTPAdminService/initTOTP -k -d 'username=<USERNAME>'
```

Note that for the tenant users, username must always end with the domain
name (e.g., <admin@abc.com> ).

This function will enable TOTP authenticator and returns the base64
encoded QR-Code URL, which is in the format that can be scanned with
Google Authenticator Mobile Application. You can decode the QR-Code URL
and use any QR-Code generator library to generate the QR-Code.

!!! info "Using TOTP Authenticator"
    You can scan the QR-Code with the Google Authenticator Mobile App and
    get the code to authenticate the user using TOTP authenticator. Follow
    [Configuring the service provider](../../develop/totp-authenticator#configuring-the-service-provider)
    and [Testing the sample](../../develop/totp-authenticator#testing-the-sample) to continue the authentication using TOTP.

### Disable TOTP

TOTP Authenticator can be disabled by calling the
`         resetTOTP        ` function as seen in the sample request
below.

``` java
curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded'  -H 'Authorization:Basic <base64Encoded string of USERNAME:PASSWORD>' https://localhost:9443/services/TOTPAdminService/resetTOTP -k -d 'username=<USERNAME>'
```

This function will return true on success.

### Refresh Secret Key

Secret key can be refreshed by calling the
`         refreshSecretKey        ` function as seen in the sample
request below.

``` java
curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded'  -H 'Authorization:Basic <base64Encoded string of USERNAME:PASSWORD>' https://localhost:9443/services/TOTPAdminService/refreshSecretKey -k -d 'username=<USERNAME>'
```

This function will return encrypted secret key on success. You need to
call `         initTOTP        ` function to regenerate the QR-Code URL
and sync it with the Google Authenticator Mobile Application so that new
secret key can be stored into the device.
