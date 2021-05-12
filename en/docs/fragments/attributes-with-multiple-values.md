If your userstore supports having multiple values for attributes, the
WSO2 Identity Server can view, add, update or delete them (normally
LDAP/AD offer support for this). The following are the different ways
you can do this.

1.  In WSO2 Identity Server Management Console, multiple attribute values are separated by commas. If you want to update two email addresses
    using the user profile UI, you must provide it as follows.


    ``` java
    asela@soasecurity.com,aselapathberiya@soasecurity.com
    ```

    See the following screen for how this will look in the user
    interface of the Identity Server Management Console.  
    ![is-user-interface](/assets/img/fragments/is-user-interface.png)

2.  When using the `           RemoteUserStoreManagerService          `
    API, call it as follows.

    ``` java
    setUserClaimValue("username", "http://wso2.org/claims/emailaddress", "asela@soasecurity.org,aselapathberiya@gmail.com", null)
    ```

    The GET results are returned in the form of comma separated values
    for the attribute.

    ``` java
    "asela@soasecurity.org,aselapathberiya@gmail.com"
    ```

    The following screen shows how this looks in the LDAP.  
    ![ldap-interface](/assets/img/fragments/ldap-interface.png) 