# Kerberos Grant

Kerberos is a security protocol that has support built into various
operating systems and open-source distributions (e.g.,  Ubuntu, Windows,
RedHat, Open Solaris, etc). Additionally, a majority of browsers support
some Kerberos functions as well. As WSO2 Identity Server (WSO2 IS) uses
the OAuth 2.0 protocol, the Kerberos-OAuth2 grant type allows
organizations to exchange a Kerberos ticket for an OAuth 2.0 token. This
allows organizations to re-use their existing Kerberos infrastructure
and adopt OAuth 2.0.

---

## Kerberos-OAuth2 grant flow

The following section describes the flow involved in exchanging a
Kerberos ticket for an OAuth2 token. 
 
![oauth-kerberos-diagram](/assets/img/concepts/oauth-kerberos-diagram.png)

1.  The Kerberos client requests the Kerberos Service Ticket from the
    Kerberos Key Distribution Center (KDC) to invoke the service.  
    The Kerberos Key Distribution Center can be any Kerberos Server.
2.  The Kerberos Key Distribution Center sends a response with the
    Kerberos Service Ticket.  
    If the client and the requested service is valid, the Key
    Distribution Center (KDC) sends a Kerberos ticket encrypted with the
    service owners private key. The API handles the exchanging of the
    Ticket Granting Ticket (TGT), Service Granting Ticket (SGT), and all
    other low level Kerberos details. <a name="step3"></a>
3.  The Kerberos client requests the OAuth2 token. 
      
    The message format of the OAuth2 token request should be as
    follows:  

    You can use one of the following two cURL commands to request for
    the OAuth2 token.

    ``` java tab="Request 1"
    curl -v -X POST -H "Authorization: Basic <base64 encoded client id:client secret value>" -k -d "grant_type=kerberos&kerberos_realm=<kerberos realm>&kerberos_token=<kerberos token>" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
    ```

    ``` java tab="Request 2"
    curl -u <client id>:<client secret> -k -d "grant_type=kerberos&kerberos_realm=<kerberos realm>&kerberos_token=<kerberos token>" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
    ```

    **Response**
    ``` java
    POST /oauth2/token HTTP/1.1
    Host: idp.example.com:9443
    Content-Type: application/x-www-form-urlencoded
    Authorization: Basic MW91TDJmTzZTeGxmRDJMRHcxMjVjVG8wdlFrYTp1VUV0bTg5dFk2UVp1WlVtcVpmTDkyQkRGZUFh
    grant_type=kerberos&kerberos_realm=example.com&kerberos_token=YII1…
    ```

4.  The Kerberos client receives the OAuth2 token. 

5.  The Kerberos Grant validates the received token with the provided
    Identity Provider (IDP) credentials and if it is a valid token, it
    issues an OAuth2 token to the client.

    **Example**

    ``` java
        {  
           "access_token":"636ce45f-c7f6-3a95-907f-d1f8aca28403",
           "refresh_token":"831271d9-16ba-3bad-af18-b9f6592a8677",
           "scope":"my_scope",
           "token_type":"Bearer",
           "expires_in":521
        }
    ```
