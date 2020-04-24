# Revoke OAuth Tokens

This page guides you through revoking an OAuth 2.0 access token using either the REST endpoint or the SOAP endpoint. This functionality follows the [OAuth 2.0 Token Revocation specification](https://tools.ietf.org/html/rfc7009).

----

## Revoke using REST endpoint

The REST endpoint is exposed at `/oauth2/revoke`. 

The REST endpoint is for OAuth 2.0 clients who want to revoke any access granted to them by a resource owner. This could be at the discretion of the resource owner or otherwise. In other words, this endpoint is meant for OAuth 2.0 clients only in order to authenticate themselves using Client ID and Client Secret and revoke the authorization granted to them. Once it is revoked, the client cannot access the user’s resource again until the user explicitly provides a grant by authorizing the client at the OAuth 2.0 authorization server.

The following curl command shows the request that should be sent to the revocation REST endpoint using the OAuth 2.0 client to revoke a token. 

```tab="Request Format"
curl -X POST --basic -u "<client id>:<client secret>" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "token=<token to revoke>&token_type_hint=access_token" https://localhost:9443/oauth2/revoke
```

```tab="Sample Request"
curl -X POST --basic -u "YmxD0jDOIfiBkD8TPLYOfxNSIg4a:FJdj7G956wqKw3d4X0BWONMIu00a" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "token=f4839307-c5a3-3d09-8452-af56b0d70491&token_type_hint=access_token" https://localhost:9443/oauth2/revoke
```

**token** - The `token` parameter here can contain the value of either the access token or the refresh token. 

**token_type_hint** - This parameter is optional and can be either `access_token` or `refresh_token`. This parameter is used to speed up the process of looking up the token by searching first in the set of tokens the client specifies (`access_token` or `refresh_token`). If the token is not found in the set the client claims it to be in, then the server looks for the token in the other set.

-----

## Revoke using SOAP endpoint

The SOAP endpoint is exposed at `/services/OAuthAdminService` with the `revokeAuthzForAppsByResourceOwner` operation.

The SOAP endpoint is for the resource owners to directly interact with the Authorization server and revoke authorization grants for applications they previously granted access to - without the OAuth 2.0 application/client being an intermediary in the process. The use of this SOAP endpoint is demonstrated by the WSO2 Identity Server’s User Portal where resource owners can login and revoke the application authorization.


1. Access the [user portal](https://localhost:9443/user-portal).

2.Click the **Security** tab on the side panel.

3. Under the **Manage consent** section, click on the **Revoke** button aligning with the application for which your consent needs to be revoked.


-----

The token revocation end-point also supports CORS (Cross-Origin Resource Sharing) specification and JSONP (Remote JSON – JSONP).

**CORS**

CORS is supported through the [CORS-Filter](http://software.dzhuvinov.com/cors-filter.html) which is designed to be plugged to a webapp using its deployment descriptor (web.xml). Since the OAuth 2.0 endpoints in WSO2 Identity Server have been written as JAX-RS endpoints, you can add the required CORS configurations to its deployment descriptor. 

You can find this webapp at `<IS_HOME>/repository/deployment/server/webapps/oauth2.war`. Rather than editing the `web.xml` directly in the deployed directory, it is easier to copy the `oauth2.war` file into another location, edit the `web.xml`, and copy it back into the webapps folder. It will get hot deployed. 


**JSON-P**

An example of a JSON-P revocation request is shown below. Note that the `callback` parameter is optional. 

```
curl -X POST --basic -u "<client id>:<client secret>" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "token=<token to revoke>&token_type_hint=access_token&callback=package.myCallback" https://localhost:9443/oauth2/revoke
```

