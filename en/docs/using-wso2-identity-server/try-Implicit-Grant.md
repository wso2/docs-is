# Try Implicit Grant

The Implicit Grant is one of the four grant types in the OAuth 2.0
specification. For more information about this grant type, see [Implicit
Grant](https://docs.wso2.com/display/IS530/Implicit+Grant).

#### **Running the application**

!!! note
    
    Before you begin, you must first [set up the sample
    webapp.](https://docs.wso2.com/display/IS530/Setting+Up+the+Sample+Webapp)
    

1.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.
2.  Enter the following details and click **Authorize**.

    Authorization Grant Type: Implicit  
    Client ID: (the client id received at the application
    registration)  
    Callback URL: <http://wso2is.local:8080/playground2/oauth2client>  
    Authorize Endpoint: <https://localhost:9443/oauth2/authorize>

    ![]( ../../assets/img/103329935/103329938.png) 

3.  Log in with the user.  
    ![2.png](https://lh3.googleusercontent.com/lpIx7mjc8_V6mLfJNg2RFxSXWEcrrVHPHto6bBxCYqsxnYsavveiBfaE4_AQ0Gq0wfwKFba4F25li8P6aaAp9sEBSCX5tBxIsn5b0NqNBy27VV94BcTSHJlRPLI3FOsSmVsWAVM2){width="340"
    height="297"}
4.  Click Approve to consent to this action.  
    ![3.png](https://lh5.googleusercontent.com/dpfRmmoe097JTIVOqEZHYwXrgX9j9q7wOvOe_Rq2WB48qnr6k937maFlZkF8iqP2yAELMkvclM-7y08EcQyTpAyJqyZ56P1t1JyPsEQUNjoHuuYin3Tu6KgpP1GSU_OIX-FI5B7v){width="434"
    height="203"}
5.  At this point the application receives the Access Token. Enter the
    introspection endpoint (i.e,
    <https://localhost:9443/oauth2/introspect> ) and click **Get
    TokenInfo** to get the token information.

    ![]( ../../assets/img/103329935/103329937.png){height="250"}

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information on OAuth 2.0 Token Introspection

    OAuth 2.0 Token Introspection defines a protocol that allows
    authorized protected resources to query the authorization server to
    determine the set of metadata for a given token that was presented
    to them by an OAuth Client. This metadata includes whether or not
    the token is currently active (or if it has expired or otherwise
    been revoked), what rights of access the token carries (usually
    conveyed through OAuth 2.0 scopes), and the authorization context in
    which the token was granted (including who authorized the token and
    which client it was issued to). Token introspection allows a
    protected resource to query this information regardless of whether
    or not it is carried in the token itself, allowing this method to be
    used along with or independently of structured token values.

6.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  
    ![]( ../../assets/img/103329935/103329936.png) 

**Related Topics**

-   See [Invoke the OAuth Introspection
    Endpoint](https://docs.wso2.com/display/IS530/Invoke+the+OAuth+Introspection+Endpoint)
    to invoke the OAuth introspection endpoint using cURL commands.
