# Sending Custom Error Codes

This page guides you through a mechanism you can use to send custom
error codes to the client side in case of defined/identified errors,
using a custom grant handler.

This simply uses the mobile grant sample and adds the specific error
codes/messages to it. See the [Writing a Custom OAuth 2.0 Grant
Type](../../learn/writing-a-custom-oauth-2.0-grant-type) topic for instructions on
how to implement and use the mobile grant sample before adding the
custom error codes to it.

### Resources

The following Maven buildable source is compatible with WSO2 Identity
Server 5.1.0 onwards. The attached `         .jar        ` file can be
directly used as well.

| Buildable Source   | [custom-grant.zip](../../assets/attachments/custom-grant.zip)           |
|--------------------|-------------------------------------------------------------------|
| **Built Jar File** | [custom-grant-1.0.0.jar](../../assets/attachments/custom-grant-1.0.0.jar)|

### Sample Code

The following code segment in the sample class
`         org         .wso2.sample.identity.oauth2.grant.mobile.MobileGrant        `
inside `         validateGrant()        ` method is the relevant code
used for this mechanism.

``` java
if(mobileNumber != null) {
    //validate mobile number
    authStatus =  isValidMobileNumber(mobileNumber);

    if(authStatus) {
        // if valid set authorized mobile number as grant user
        AuthenticatedUser mobileUser = new AuthenticatedUser();
        mobileUser.setUserName(mobileNumber);
        oAuthTokenReqMessageContext.setAuthorizedUser(mobileUser);
        oAuthTokenReqMessageContext.setScope(oAuthTokenReqMessageContext.getOauth2AccessTokenReqDTO().getScope());
    } else{
        ResponseHeader responseHeader = new ResponseHeader();
        responseHeader.setKey("SampleHeader-999");
        responseHeader.setValue("Provided Mobile Number is Invalid.");
        oAuthTokenReqMessageContext.addProperty("RESPONSE_HEADERS", new ResponseHeader[]{responseHeader});
    }

}
```

!!! note
    
    The code within lines 71-75 sets a custom response header in case an
    invalid mobile number is sent.
    

### Try out Scenario

**Happy Path**

``` powershell
curl --user <Client_id>:<Client_secret> -k -d "grant_type=mobile&mobileNumber=0333444" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

**Erroneous** **Path**

``` powershell
curl -v --user vSfeQ9jfNodY1tv9KLNNxLOw7kwa:CEUWu7fDNy_RYg5lO_mp8PLf7nQa -k -d "grant_type=mobile&mobileNumber=0363444" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

!!! info 
    This is erroneous according to the mobile custom grant sample because
    the mobile number does not start with '003'. You can use the -v option
    in the cURL command to see the header of the response which should be as
    seen in the code block below.


``` powershell
> POST /oauth2/token HTTP/1.1
> Authorization: Basic dlNmZVE5amZOb2RZMXR2OUtMTk54TE93N2t3YTpDRVVXdTdmRE55X1JZZzVsT19tcDhQTGY3blFh
> User-Agent: curl/7.29.0
> Host: localhost:9443
> Accept: */*
> Content-Type: application/x-www-form-urlencoded
> Content-Length: 38
> 
* upload completely sent off: 38 out of 38 bytes
< HTTP/1.1 400 Bad Request
< Date: Wed, 13 Jan 2016 06:05:33 GMT
< SampleHeader-999: Provided Mobile Number is Invalid.
< Content-Type: application/json
< Content-Length: 87
< Connection: close
< Server: WSO2 Carbon Server
< 
* Closing connection 0
* SSLv3, TLS alert, Client hello (1):
{"error":"invalid_grant","error_description":"Provided Authorization Grant is invalid"}
```

!!! info 
    Line 12 shows the custom header appearing in the headers.

Similarly this can be used to transfer any custom information to the
client, in a flexible manner.
