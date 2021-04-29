# Localization Support in Identity Server

This page describes how WSO2 Identity Server can be configured to
support localization of its UI.

---

## Configure localization for authentication endpoints

WSO2 Identity Server provides internationalization support for the web
apps (such as authentication endpoint which is in
`         <IS_HOME>/repository/deployment/server/webapps/        `
directory). The following steps describe how you can configure this:

1.  Navigate to
    `          <IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/org/wso2/carbon/identity/application/authentication/endpoint/i18n/         `
2.  Take a copy of the `Resources.properties` file to the same location,
    rename it with the required locale suffix as follows:
    - For British English:
    `           Resources_en_GB.properties          `  
    - For French (Standard):
    `           Resources_fr.properties          `

    Refer [Web browser language identification
    codes](https://www.metamodpro.com/browser-language-codes) for more
    information on required locale suffixes.

3.  Update values while keeping the keys as follows,  
     ```
     login=<Value in the required locale> 
     ``` 

4.  Save the file.

5.  Go to the browser setting and add the language you configured above.

6.  Restart the server.  
    To try out, do the following:
    1.  Open up a browser.
    2.  Type the **My Account** application URL. (If you are running the server in your
        localhost, the URL is:
        `                     https://localhost:9443/myaccount/                   `
        ). You will see the login screen having the contents in the
        configured language.

If you want to have internationalization of error messages coming from
`         authentication-framework/oauth-framework        `, follow the below steps:

First, you need to generate a key from the message itself for the
i18n, properties file. following steps below:

1.  Get the message, `oauthErrorMsg` from the URL and decode the URL (URLDecode).
2.  Base64 encode the message, `oauthErrorMsg`.
3.  Replace = with \_ in the base64 encoded message.

Now look for a value in `         Resource.properties        ` file with
the relevant locale. If a match is found, define a value for the
property. Otherwise use add new property entry to the relevant locale
based on the Resource file, as explained above. If you don't specify a
value for the key obtained above, the error message itself will be
displayed in the UI, as default.

---

## Configure localization for recovery endpoints 

Similarly, you can enable localization for `accountrecoveryendpoint` by
applying the same above steps 2 through 6 in the previous section
starting with the following location.

`<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/org/wso2/carbon/identity/mgt/recovery/endpoint/i18n/`
