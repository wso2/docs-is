# Localization Support in Identity Server

This page describes how WSO2 Identity Server can be configured to
support localization of its UI.

### Configuring Localization for Authentication Endpoints

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
    2.  Type the dashboard URL. (If you are running the server in your
        localhost, the URL is:
        `                     https://localhost:9443/dashboard/                   `
        ). You will see the login screen having the contents in the
        configured language.

If you want to have internationalization of error messages coming from
`         authentication-framework/        ` oauth
`         -framework        `, Follow the below steps:

First, you need to generate a key from the message itself for the
i18n, properties file. following steps below:

1.  Get the message "oauthErrorMsg" from URL and do URLDecode
2.  Base64 Encode the message "oauthErrorMsg"
3.  Replace = with \_ in the base64 encoded message

Now look for a value in `         Resource.properties        ` file with
the relevant locale. If a match is found, define a value for the
property. Otherwise use add new property entry to the relevant locale
based on the Resource file, as explained above. If you don't specify a
value for the key obtained after \#03, the error message itself will be
displayed in the UI, as default.

### Configuring Localization for Recovery Endpoints 

Similarly, you can enable localization for accountrecoveryendpoint by
applying the same above steps 1 through 7 in the previous section
starting with the following location.

`<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/org/wso2/carbon/identity/mgt/recovery/endpoint/i18n/`