# OAuth 2.0 token introspection

## Usage of OAuth 2.0 Token Introspection
OAuth 2.0 Token Introspection defines a method that allows authorized protected resources to query the authorization server
to determine the set of metadata for a given token (access token, authorization code or a refresh token) that was presented to them by 
an OAuth Client. Based on the metadata of the particular token, it will allow the resource server to consume the 
protected resource.
 

This metadata includes:

- Whether the token is currently active (or if it has expired or otherwise been revoked)
- The rights of accessing the token carries (usually conveyed through OAuth 2.0 scopes)
- The authorization context in which the token was granted (including who authorized the token and which client it was issued to)

Token introspection allows a protected resource to query this information regardless of whether it is carried in the token itself.

## The states and descriptions of tokens

**- Authorization codes:**


a. `ACTIVE - ` Valid and yet to be exchanged for an access token.


b. `INACTIVE -` Invalid and already being exchanged for an access token.


c. `EXPIRED -`  Invalid as it got expired before being exchanged to an access token.


**- Access tokens:**

a. `ACTIVE - ` Valid access token. Although the state is ACTIVE, the timestamp calculation may reveal it to be EXPIRED, 
               but this happens only during the first access token request or token validation request after expiration.
               
b. `INACTIVE -` Refreshed using refresh_token grant type before expiration. Also, this state is used in cases when users 
               and user stores are deleted, user passwords are updated, etc.
               
c. `EXPIRED - ` Invalid and expired access token. Refresh token can still be valid though.

d. `REVOKED - ` Revoked access token. Refresh token also gets revoked along with access token.
               Access token could have been in ACTIVE or EXPIRED state while revoking.


