# Configuring Email OTP

This section provides the instructions to configure [multi-factor
authentication (MFA)](Multi-factor_Authentication_for_WSO2_IS) using
Email One Time Password (Email OTP) in WSO2 Identity Server (WSO2
IS). The Email OTP enables a one-time password (OTP) to be used at the
second step of MFA.

Follow the instructions in the sections below to configure MFA using
Email OTP:

!!! tip "Before you begin"
    
    -   To ensure you get the full understanding of configuring Email OTP
        with WSO2 IS, the sample travelocity application is used in this use
        case. Therefore, make sure to [download the
        samples](../../learn/downloading-a-sample)
        before you begin.
    -   The samples run on the Apache Tomcat server and are written based on
        Servlet 3.0. Therefore, download Tomcat 7.x from
        [here](https://tomcat.apache.org/download-70.cgi) .
    -   Install Apache Maven to build the samples. For more infomation, see
        [Installation Prerequisites](../../setup/installation-prerequisites).
    
### Configure the email OTP provider

You can use WSO2 Identity Server as the email OTP provider or you can
configure Gmail or SendGrid as the email OTP provider using Gmail or
SendGrid APIs. Follow the instructions in **one** of these sections to
set up the email OTP provider.

#### Option1: Configure WSO2 IS as the email OTP provider

Follow the steps below to configure WSO2 IS to send emails once the
Email OTP is enabled.

1.  Shut down the server if it is running.
2.  Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure the email server.

    ```toml
    [output_adapter.email]
    from_address= "wso2iamtest@gmail.com"
    username= "wso2iamtest"
    password= "Wso2@iam70"
    hostname= smtp.gmail.com
    port= 587
    enable_start_tls= true
    enable_authentication= true
    ```
    
    |                                                   |                                                |
    |---------------------------------------------------|------------------------------------------------|
    | `               from_address                `     | Provide the email address of the SMTP account. |
    | `               username                    `     | Provide the username of the SMTP account.      |
    | `               password                        ` | Provide the password of the SMTP account.      |

    !!! Note
        If you are using Gmail account you have to on "Allow less secure
        apps" in your account respective to the above email sending configurations.

3.  Add the following email template to the
    `           <IS_HOME>/repository/conf/email/email-admin-config.xml.          `

    ``` xml
	<configuration type="EmailOTP" display="EmailOTP" locale="en_US" emailContentType="text/html">
	   <targetEpr></targetEpr>
	   <subject>WSO2 IS Email OTP</subject>
	   <body>
		  Hi,
		  Please use this one time password {OTPCode} to sign in to your application.
	   </body>
	   <footer>
		  Best Regards,
		  WSO2 Identity Server Team
		  http://www.wso2.com
	   </footer>
	   <redirectPath></redirectPath>
	</configuration>
    ```
    
    !!! Tip
        You can add email template from the management console also as described in [this document](
        ../../administer/email-templates) 

4.  Configure the following properties in the `<IS_HOME>/repository/conf/identity/identity-mgt.properties` file to `true`.

    ```toml
    Authentication.Policy.Enable=true
    Authentication.Policy.Check.OneTime.Password=true
    ```

5.  Add the following configuration to the `application-authentication.xml` file in the `<IS_HOME>/repository/conf/identity` directory. 
    
    ```xml
    <AuthenticatorConfig name="EmailOTP" enabled="true">
        <Parameter name="EMAILOTPAuthenticationEndpointURL">https://localhost:9443/emailotpauthenticationendpoint/emailotp.jsp</Parameter>
        <Parameter name="EmailOTPAuthenticationEndpointErrorPage">https://localhost:9443/emailotpauthenticationendpoint/emailotpError.jsp</Parameter>
        <Parameter name="EmailAddressRequestPage">https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp</Parameter>
        <Parameter name="usecase">association</Parameter>
        <Parameter name="useEventHandlerBasedEmailSender">true</Parameter>
        <Parameter name="secondaryUserstore">primary</Parameter>
        <Parameter name="EMAILOTPMandatory">false</Parameter>
        <Parameter name="sendOTPToFederatedEmailAttribute">false</Parameter>
        <Parameter name="federatedEmailAttributeKey">email</Parameter>
        <Parameter name="EmailOTPEnableByUserClaim">true</Parameter>
        <Parameter name="useEventHandlerBasedEmailSender">true</Parameter>
        <Parameter name="CaptureAndUpdateEmailAddress">true</Parameter>
        <Parameter name="showEmailAddressInUI">true</Parameter>
    </AuthenticatorConfig>
    ``` 


    ??? info "Click to view the parameter definitions"    
        <table>
            <thead>
                <tr>
                    <th width="10%">Parameter</th>
                    <th width="55%">Description</th>
                    <th width="35%">Sample Values</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>usecase</code></td>
                    <td>This parameter defines how the email ID will be retrieved.
                        <ul>
                            <li><code>local</code>: This is the default value and is based on the federated username. You must set the federated username in the local userstore . The federated username must be the same as the local username.</li>
                            <li><code>assocication</code>: The federated username must be associated with the local account in advance in the end user dashboard. The local username is retrieved from the association. To associate the user, log into the  [end user dashboard](../../learn/using-the-end-user-dashboard)  and go to  **Associated Account**  by clicking  **View details**.</li>
                            <li><code>subjectUri</code>: When configuring the federated authenticator, select the attribute in the subject identifier under the service provider section in UI, this is used as the username of the  <code>EmailOTP</code> authenticator.</li>
                            <li>
                                <p><code>userAttribute </code>: The name of the  federatedauthenticator'suserattribute. That is the local username that is contained in a federated user's attribute. When using this, add the following parameter under the  <code><AuthenticatorConfig name="EmailOTP" enabled="true"></code>  section in the <code><IS_HOME>/repository/conf/identity/application-authentication.xml</code> file and put the value, e.g., email and screen_name, id.</p>
                                ```
                                <Parameter name="userAttribute">email</Parameter>
                                ```
                                <p>If you use OpenID Connect supported authenticators such as LinkedIn and Foursquare or in the case of multiple social login options as the first step and EmailOTP assecondstep, you need to add similar configuration for the specific authenticator in the <code><IS_HOME>/repository/conf/identity/application-authentication.xml</code> file under the <code><AuthenticatorConfigs></code> section.</p>
                                <details class="example">
                                    <summary>Click here to view examples</summary>
                                            <p><b>Foursquare</b></p>
                                            ```xml
                                            <AuthenticatorConfig name="Foursquare" enabled="true">
                                                <Parameter name="EmailOTP-userAttribute">http://wso2.org/foursquare/claims/email</Parameter>
                                                <Parameter name="federatedEmailAttributeKey">http://wso2.org/foursquare/claims/email</Parameter>
                                            </AuthenticatorConfig>
                                            ```
                                            <p><b>LinkedIn</b></p>
                                            ```xml
                                            <AuthenticatorConfig name="LinkedIn" enabled="true">
                                                <Parameter name="EmailOTP-userAttribute">http://wso2.org/linkedin/claims/emailAddress</Parameter>
                                                <Parameter name="federatedEmailAttributeKey">http://wso2.org/linkedin/claims/emailAddress</Parameter>
                                            </AuthenticatorConfig>
                                            ```
                                            <p><b>Facebook</b></p>
                                            ```xml
                                            <AuthenticatorConfig name="FacebookAuthenticator" enabled="true">
                                                <Parameter name="EmailOTP-userAttribute">email</Parameter>
                                                <Parameter name="federatedEmailAttributeKey">email</Parameter>
                                            </AuthenticatorConfig>
                                            ```
                                        Likewise, you can add the Authenticator Config for Amazon, Google, Twitter, and Instagram with the relevant values.
                                    </p>
                                </details>
                            </li>
                        </ul>    
                    </td>
                    <td>
                        <ul>
                            <li><code>local</code></li>
                            <li><code>association</code></li>
                            <li><code>userAttribute</code></li>
                            <li><code>subjectUri</code></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td><code>secondaryUserstore</code></td>
                    <td>
                        <p>You can define multiple user stores per tenant as comma separated values.</p>
                        <p>Example:</p>
                        ```
                        <Parameter name="secondaryUserstore">jdbc, abc, xyz</Parameter>
                        ```
                        <p>The user store configurations are maintained per tenant:</p>
                        <ul>
                            <li>If you use a <b>super tenant</b>, set all the parameter values into the <code><IS_HOME>/repository/conf/identity/application-authentication.xml</code> file under the <code>AuthenticatorConfigs</code> section.</li>
                            <li>If you use a tenant,
                                <ul>
                                    <li>Upload the same XML file (<code>application-authentication.xml</code>) into a specific registry location (<code>/_system/governance/EmailOTP</code>).</li>
                                    <li>Create the collection named <code>EmailOTP</code>, add the resource and upload the <code>application-authentication.xml</code> file into the registry.</li>
                                    <li>While doing the authentication,thesysetmfirstcheckswhetherthereisanXML file uploaded to the registry. If that is so, it reads it from the registry but does not take the local file. If there is no file in the registry, then it only takes the property values from the local file.</li>
                                    <li>You can use the registry or local file to get the property values.</li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>EMAILOTPMandatory</code></td>
                    <td>
                        <p>Thisparmeterdefineswhtherthe EmailOTP is enforced as the second step of the 2FA/MFA or not.</p>
                        <ul>
                            <li>If the user is not found in the active directory where the parameter is set to <code>true</code>, the OTP is directly sent to the email address defined in the claims set.</li>
                            <li>If the user is not found in the active directory where the parameter is set to <code>false</code>, the authentication flow terminates at the first step of the 2FA/MFA.</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li><code>true</code></li>
                            <li><code>false</code></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td><code>sendOTPToFederatedEmailAttribute</code></td>
                    <td>
                        <p>When the <code>EMAILOTPMandatory</code> and this parameter are set to true and the user is not found in the active directory, the OTPissetn to the mail defined in the federated authenticator claim.</p>
                        <p>When the <code>EMAILOTPMandatory</code> is set to <code>false</code>, an error page gets displayed.</p>
                        <p>When the <code>EMAILOTPMandatory</code> is set to false and the user is not found in the active directory, the authentication mechanism terminates at the first step of the 2FA/MFA. This parameter is not required in such a scenario.</p>
                    </td>
                    <td>
                        <ul>
                            <li><code>true</code></li>
                            <li><code>false</code></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td><code>federatedEmailAttributeKey</code></td>
                    <td>This parameter identifies the email attribute of the federated authenticator, e.g. Foursquare. Set this parameter if the <code>sendOTPToFederatedEmailAttribute</code> is set to <code>true</code>. Example: <code>http://wso2.org/foursquare/claims/email</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>EmailOTPEnableByUserClaim</code></td>
                    <td>
                        <p>This parameter enables the user to overide the functionality defined at the <code>EMAILOTPMandatory</code> parameter.</p>
                        <ul>
                            <li>If this parameter and the <code>EMAILOTPMandatory</code> parameters are set to <code>true</code>, the user can either enable or disable the EmailOTP functionality.</li>
                            <li>If this parameter is set to <code>false</code> where the <code>EMAILOTPMandatory</code> parameter is set to <code>true</code>, the user gets redirected to an error page.</li>
                            <li>If this parameter and the <code>EMAILOTPMandatory</code> parameters are set to <code>false</code>, the authentication flow terminates at the first step of the 2FA/MFA.</li>
                            <li>If the user is not available in the active directory</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li><code>true</code></li>
                            <li><code>false</code></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td><code>CaptureAndUpdateEmailAddress</code></td>
                    <td>This parameter enables the user to update the email address that is used to send the OTP, at the first login where the email address is not previously set.</td>
                    <td>
                        <ul>
                            <li><code>true</code></li>
                            <li><code>false</code></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td><code>EmailAddressRequestPage</code></td>
                    <td>
                        <p>This parameter enables to display a page that requests for an email address where</p>
                        <ul>
                            <li>The user has not registered an email address.</li>
                            <li>Sending OTP is defined as the second step of 2FA/MFA.</li>
                            <li>The <code>CaptureAndUpdateEmailAddress</code> parameter is set to <code>true</code>.</li>
                        </ul>
                        <p>Example: <code>https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp</code></p>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>showEmailAddressInUI</code></td>
                    <td>This parameter enables to display the email address to which the OTP is sent to on the UI.</td>
                    <td>
                        <ul>
                            <li><code>true</code></li>
                            <li><code>false</code></li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>

6.  [Start WSO2 IS](../../setup/running-the-product#starting-the-server).

#### Option2: Configure Gmail as the email OTP provider

You can send the One Time Password (OTP) using Gmail APIs or using
SendGrid. Follow the steps given below to configure Gmail APIs as the
mechanism to send the OTP.

1.  Create a Google account at [https://gmail.com](https://gmail.com/).
2.  Go to
    [https://console.developers.google.com](https://console.developers.google.com/)
    and click **ENABLE APIS AND SERVICES**.
3.  Search for Gmail API and click on it.
4.  Click **Enable** to enable the Gmail APIs.

    !!! info "Why is this needed?"
		If you do not enable the Gmail APIs, you will run in to a 401 error when
		trying out [step13](#configuring-emailotp-copy-url).

5.  Click **Credentials** and click **Create** to create a new project.
6.  Click **Credentials** and click the **Create credentials**
    drop-down.

7.  Select **OAuth client ID** option.

    ![oauth-client-id](../assets/img/tutorials/oauth-client-id.png)

8.  Click **Configure consent screen**.  
    ![configure-consent-screen](../assets/img/tutorials/configure-consent-screen.png)
    
9.  Enter the Product name that needs to be shown to users, enter values
    to any other fields you prefer to update, and click **Save**.
    
10. <a name="ConfiguringEmailOTP-client-ID">Select the **Web application** option.  
    Enter
    `                       https://localhost:9443/commonauth                     `
    as the **Authorize redirect URIs** text-box, and click **Create**.
      
    ![authorize-redirect-uris](../assets/img/tutorials/authorize-redirect-uris.png)

    The `           client ID          ` and the
    `           client secret          ` are displayed.  
    Copy the client ID and secret and keep it in a safe place as you
    require it for the next step.  
    ![client-id-client-secret](../assets/img/tutorials/client-id-client-secret.png)

11. Copy the URL below and replace the
    `           <ENTER_CLIENT_ID>          ` tag with the generated
    `           Client ID          ` . This is required to generate the
    authorization code.
	
	**Format**
    ``` java
    https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Flocalhost%3A9443%2Fcommonauth&response_type=code&client_id=<ENTER_CLIENT_ID>&scope=http%3A%2F%2Fmail.google.com&approval_prompt=force&access_type=offline
    ```
    
	**Example**
    ``` java
    https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Flocalhost%3A9443%2Fcommonauth&response_type=code&client_id=854665841399-l13g81ri4q98elpen1i1uhsdjulhp7ha.apps.googleusercontent.com&scope=http%3A%2F%2Fmail.google.com&approval_prompt=force&access_type=offline
    ```

12. <a name="ConfiguringEmailOTP-Auth-code"> Paste the updated URL into your browser.

    1.  Select the preferred Gmail account with which you wish to
        proceed.

    2.  Click **Allow**.
    3.  Obtain the `             authorization code            ` using a
        SAML tracer on your browser.

        ![authorization-code](../assets/img/tutorials/authorization-code.png)

13. <a name="configuring-emailotp-copy-url"></a>To generate the access token, copy the following cURL command and
    replace the following place holders:

    1.  `                         <CLIENT-ID>                       ` :
        Replace this with the `            client ID           `
        obtained in [Step 10](#ConfiguringEmailOTP-client-ID) above.
    2.  `                         <CLIENT_SECRET>                       `
        : Replace this with the `            client secret           `
        obtained in [Step 10](#ConfiguringEmailOTP-client-ID) above.
    3.  `                           <AUTHORIZATION_CODE>                         `
        : Replace this with the authorization code obtained in [Step
        12](#ConfiguringEmailOTP-Auth-code) above.  

	**Format**
    ``` java
    curl -v -X POST --basic -u <CLIENT-ID>:<CLIENT_SECRET> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=<AUTHORIZATION_CODE>&redirect_uri=https://localhost:9443/commonauth" https://www.googleapis.com/oauth2/v3/token
    ```

	**Example**
    ``` java
    curl -v -X POST --basic -u 854665841399-l13g81ri4q98elpen1i1uhsdjulhp7ha.apps.googleusercontent.com:MK3h4fhSUT-aCTtSquMB3Vll -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=4/KEDlA2KjGtib4KlyzaKzVNuDfvAmFZ10T82usT-6llY#&redirect_uri=https://localhost:9443/commonauth" https://www.googleapis.com/oauth2/v3/token
    ```

	**Sample Response**
    ``` java
	> POST /oauth2/v3/token HTTP/1.1
	> Host: www.googleapis.com
	> Authorization: Basic OTk3NDE2ODczOTUwLWY4Y2N1YnJobW1ramdkYXNkNnZkZ2tzOGxoaWExcnRhLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tOkJkNlBoY3ZVWXFrM1BhdnA4ZjBZcUQtMw==
	> User-Agent: curl/7.54.0
	> Accept: */*
	> Content-Type: application/x-www-form-urlencoded;charset=UTF-8
	> Content-Length: 127
	> 
	< HTTP/1.1 200 OK
	< Cache-Control: no-cache, no-store, max-age=0, must-revalidate
	< Pragma: no-cache
	< Expires: Mon, 01 Jan 1990 00:00:00 GMT
	< Date: Wed, 10 Jan 2018 08:29:57 GMT
	< Vary: X-Origin
	< Content-Type: application/json; charset=UTF-8
	< X-Content-Type-Options: nosniff
	< X-Frame-Options: SAMEORIGIN
	< X-XSS-Protection: 1; mode=block
	< Server: GSE
	< Alt-Svc: hq=":443"; ma=2592000; quic=51303431; quic=51303339; quic=51303338; quic=51303337; quic=51303335,quic=":443"; ma=2592000; v="41,39,38,37,35"
	< Accept-Ranges: none
	< Vary: Origin,Accept-Encoding
	< Transfer-Encoding: chunked
	< 
	{
	 "access_token": "ya29.Gls-BbTUseE2f-Lrc9q0QtdlvIoYFTg2zkYPsXHwgob4pHAFlE66GMgJjwTHT9eHfivhVcATROzU8FaUgt0wVL1sz-7IsC2Slfpdm6i3uFcurNTFbTlABk3jKJ--",
	 "token_type": "Bearer",
	 "expires_in": 3600,
	 "refresh_token": "1/8pMBx_lrUyitknmGzzH-yOcvoPIZ1OqhPeWvcYJOd0U"
	}
    ```

    Paste the updated cURL command in your terminal to generate the
    OAuth2 access token, token validity period, and the refresh token.  
    ![oauth2-access-refresh](../assets/img/tutorials/oauth2-access-refresh.png)

14. Update the following configurations  in the
    `           <IS_HOME>/repository/conf/identity/deployment.toml          ` file.

    !!! Note "Sample configuration when using Identity Server as Email OTP Provider"
		``` toml
        [authentication.authenticator.email_otp]
        name = "EmailOTP"
        enable= true
        [authentication.authenticator.email_otp.parameters]
        EMAILOTPAuthenticationEndpointURL = "https://localhost:9443/emailotpauthenticationendpoint/emailotp.jsp"
        EmailOTPAuthenticationEndpointErrorPage = "https://localhost:9443/emailotpauthenticationendpoint/emailotpError.jsp"
        EmailAddressRequestPage = "https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp"
        usecase = "association"
        secondaryUserstore = "primary"
        EMAILOTPMandatory = false
        sendOTPToFederatedEmailAttribute = false
        federatedEmailAttributeKey = "email"
        EmailOTPEnableByUserClaim = true
        CaptureAndUpdateEmailAddress = true
        showEmailAddressInUI = true
        useEventHandlerBasedEmailSender = true
		```
		
    ??? Tip
    
        -   If you need to send the content in a payload, you can introduce
            a property in a format \<API\> Payload and define the value.
            Similarly, you can define the Form
            Data.FormdataforSendgridAPIisgivenasan example.
        -   You can use \<API\> URLParams, \<API\>AuthTokenType,
            \<API\>Failure and \<API\>TokenEndpoint property formats to
            specify the URL parameters, Authorization token type, Message to
            identify failure and Endpoint to get access token from refresh
            token respectively.
        -   Value of \<API\> URLParams should be like;
            api\_user=\<API\_USER\>&api\_key=\<API\_KEY\>&data=\<DATA\>&list\<LIST\>
    

    <table>
    <thead>
    <tr class="header">
    <th>Property</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>               GmailClientId              </code></td>
    <td>Enter the Client ID you got in <a href="#ConfiguringEmailOTP-client-ID">step 10</a> .<br />
    Example: <code>                               501390351749-ftjrp3ld9da4ohd1rulogejscpln646s.apps.googleusercontent.com                             </code></td>
    </tr>
    <tr class="even">
    <td><code>               GmailClientSecret              </code></td>
    <td>Enter the client secret you got in <a href="#ConfiguringEmailOTP-client-ID">step 10</a> .<br />
    Example: <code>               dj4st7_m3AclenZR1weFNo1V              </code></td>
    </tr>
    <tr class="odd">
    <td><code>               SendgridAPIKey              </code></td>
    <td>This property is only required if you are using the Sengrid method. Since you are using Gmail APIs, keep the default value.</td>
    </tr>
    <tr class="even">
    <td><code>               GmailRefreshToken              </code></td>
    <td>Enter the refresh token that you got as the response in <a href="#configuring-emailotp-copy-url">step 13</a> . Example: <code>               1/YgNiepY107SyzJdgpynmf-eMYP4qYTPNG_L73MXfcbv              </code></td>
    </tr>
    <tr class="odd">
    <td><code>               GmailEmailEndpoint              </code></td>
    <td>Enter your username of your Gmail account in place of the <code>               [userId]              </code> place holder. Example: <code>                                                https://www.googleapis.com/gmail/v1/users/alex@gmail.com/messages/send                                             </code></td>
    </tr>
    <tr class="even">
    <td><code>               SendgridEmailEndpoint              </code></td>
    <td>This property is only required if you are using the Sengrid method. Since you are using Gmail APIs, keep the default value.</td>
    </tr>
    <tr class="odd">
    <td><code>               accessTokenRequiredAPIs              </code></td>
    <td><p>Use the default value.</p></td>
    </tr>
    <tr class="even">
    <td><code>               apiKeyHeaderRequiredAPIs              </code></td>
    <td><p>This property is only required if you are using the Sengrid method. Since you are using Gmail APIs, keep the default value.</p></td>
    </tr>
    <tr class="odd">
    <td><code>               SendgridFormData=to              </code></td>
    <td>This property is only required if you are using the Sengrid method. Since you are using Gmail APIs, keep the default value.</td>
    </tr>
    <tr class="even">
    <td><code>               SendgridURLParams              </code></td>
    <td>This property is only required if you are using the Sengrid method. Since you are using Gmail APIs, keep the default value.</td>
    </tr>
    <tr class="odd">
    <td><code>               GmailAuthTokenType              </code></td>
    <td>Use the default value.</td>
    </tr>
    <tr class="even">
    <td><code>               GmailTokenEndpoint              </code></td>
    <td>Use the the deafult value.</td>
    </tr>
    <tr class="odd">
    <td><code>               SendgridAuthTokenType              </code></td>
    <td>This property is only required if you are using the Sengrid method. Since you are using Gmail APIs, keep the default value.</td>
    </tr>
    </tbody>
    </table>

    	
------------------------------------------------------------------------

### Deploy the travelocity.com sample

Now that you have set up WSO2 IS or Gmail as the Email OTP provider,
follow the steps below to deploy the travelocity.com sample application,
which you can use to try out the Email OTP scenario.

To obtain and configure the single sign-on travelocity sample, follow
the steps below.

1.  Add the following entry to the `            /etc/hosts           `
    file of your machine to configure the hostname.

    !!! info "Why is this step needed?"

		Some browsers do not allow creating cookies for a naked hostname,
		such as `             localhost            ` . Cookies are required
		when working with SSO. Therefore, to ensure that the SSO
		capabilities work as expected in this tutorial, you need to
		configure the `             etc/host            ` file as explained
		in this step.

		The `             etc/host            ` file is a read-only file.
		Therefore, you won't be able to edit it by opening the file via a
		text editor. To avoid this, edit the file using the terminal
		commands.  
		For example, use the following command if you are working on a
		Mac/Linux environment.

		``` java
		sudo nano /etc/hosts
		```

    ``` bash
    127.0.0.1  wso2is.local
    ```

2.  Open the `            travelocity.properties           ` file found
    in the
    `            is-samples/modules/samples/sso/sso-agent-sample/src/main/resources           `
    directory of the samples folder you just checked out. Configure the
    following property with the hostname (
    `            wso2is.local           ` ) that you configured above.

    ``` text
	#The URL of the SAML 2.0 Assertion Consumer
	SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp
    ```

3.  In your terminal, navigate to
    `            is-samples/modules/samples/sso/sso-agent-sample           `
    folder and build the sample using the following command. You must
    have Apache Maven installed to do this

    ``` java
    mvn clean install
    ```

4.  After successfully building the sample, a
    `            .war           ` file named **travelocity.com** can be
    found inside the
    `            is-samples/sso/sso-agent-sample/           `
    `            target           ` directory. Deploy this sample web
    app on a web container. To do this, use the Apache Tomcat server.

    !!! note
    
        Since this sample is written based on Servlet 3.0 it needs to be
        deployed on [Tomcat 7.x](https://tomcat.apache.org/download-70.cgi)
        .
    

    Use the following steps to deploy the web app in the web container:

    1.  Stop the Apache Tomcat server if it is already running.
    2.  Copy the
        `                           travelocity.com.war                         `
        file to the `             <TOMCAT_HOME>/webapps            `
        directory.
    3.  Start the Apache Tomcat server.

!!! tip
    
    If you wish to change properties like the issuer ID, consumer URL, and
    IdP URL, you can edit the **travelocity.properties** file found in the
    `          travelocity.com/WEB-INF/classes         ` directory. If the
    service provider is configured in a tenant you can use the
    `          QueryParams         ` property to send the tenant domain.
    For  example, `          QueryParams=tenantDomain=wso2.com         ` .
    
    This sample uses the following default values.
    
    | Properties                                                                                                  | Description                                                         |
    |-------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
    | `              SAML2.SPEntityId=travelocity.com             `                                               | A unique identifier for this SAML 2.0 Service Provider application. |
    | `               SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp              ` | The URL of the SAML 2.0 Assertion Consumer.                         |
    | `               SAML2.IdPURL=https://localhost:9443/samlsso              `                                  | The URL of the SAML 2.0 Identity Provider.                          |
    
    If you edit the
    `                     travelocity.properties                   ` file,
    you must restart the Apache Tomcat server for the changes to take
    effect.
    

Now the web application is successfully deployed on a web container.

------------------------------------------------------------------------

### Configure the Identity Provider

Follow the steps below to add an [identity
provider](../../learn/adding-and-configuring-an-identity-provider):

1.  Click **Add** under **Main \> Identity \> Identity Providers**.  
    ![adding-an-identity-provider](../assets/img/tutorials/adding-an-identity-provider.png)
    
2.  Provide a suitable name for the identity provider.  
    ![name-the-identity-provider](../assets/img/tutorials/name-the-identity-provider.png)
    
3.  Expand the **EmailOTPAuthenticator Configuration** under **Federated
    Authenticators**.  

    1.  Select the **Enable** and **Default** check boxes(If you are
        using Gmail or Sendgrid as the email OTP provider, provide
        values for Email API and Email fields as well).

    2.  Click **Register**.

        ![registering-an-identity-provider](../assets/img/tutorials/registering-an-identity-provider.png)

    You have now added the identity provider.

------------------------------------------------------------------------

### Configure the Service Provider

Follow the steps below add a service provider:

1.  Return to the Management Console home screen.

2.  Click **Add** under **Add** under **Main \> Identity \> Service
    Providers**.  
    ![add-service-provider](../assets/img/tutorials/add-service-provider.png)

3.  Enter `                       travelocity.com                     `
    as the **Service Provider Name**.  
    ![](attachments/103331027/name-the-service-provider.png)

4.  Click **Register**.

5.  Expand **SAML2 Web SSO Configuration** under **Inbound
    Authentication Configuration**.

6.  Click **Configure**.

    ![configuring-the-service-provider](../assets/img/tutorials/configuring-the-service-provider.png)

7.  Now set the configuration as follows:

    1.  **Issuer** : `             travelocity.com            `

    2.  **Assertion Consumer URL** :
        `                           http://localhost:8080/travelocity.com/home.jsp                         `

    3.  Select the following check-boxes: **Enable Response Signing** ,
        **Enable Single Logout** , **Enable Attribute Profile** , and
        **Include Attributes in the Response Always** .

8.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.

9.  Go to **Claim Configuration** and select the
    **http://wso2.org/claims/emailaddress** claim.

    ![claim-configuration](../assets/img/tutorials/claim-configuration.png)

10. Go to **Local and Outbound Authentication Configuration** section.

    1.  Select the **Advanced configuration** radio button option.

    2.  Creating the first authentication step:

        1.  Click **Add Authentication Step**.

        2.  Click **Add Authenticator** that is under Local
            Authenticators of Step 1 to add the basic authentication as
            the first step.  
            Adding basic authentication as a first step ensures that the
            first step of authentication will be done using the user's
            credentials that are configured with the WSO2 Identity
            Server

    3.  Creating the second authentication step:

        1.  Click **Add Authentication Step**.

        2.  Click **Add Authenticator** that is under Federated
            Authenticators of Step 2 to add the EMAIL OTP identity
            provider you created as the second step.  
            EMAIL OTP is a second step that adds another layer of
            authentication and security.

    ![add-authenticator](../assets/img/tutorials/add-authenticator.png)

11. Click **Update**.

    You have now added and configured the service provider.

    !!! note
    
        For more information on service provider configuration, see
        [Configuring Single Sign-On](../../learn/configuring-single-sign-on).
    
------------------------------------------------------------------------

### Update the email address of the user

Follow the steps given below to update the user's email address.

1.  Return to the WSO2 Identity Server Management Console home screen.
2.  Click **List** under **Add** under **Main \> Identity \> Users and
    Roles**.  
    ![management-console](../assets/img/tutorials/management-console.png)
    1.  Click **Users**.  
        ![console-users-options](../assets/img/tutorials/console-users-options.png)
    2.  Click **User Profile** under **Admin**.  
        ![console-user-profile](../assets/img/tutorials/console-user-profile.png)
    3.  Update the **email address**.  
        ![console-email-address](../assets/img/tutorials/console-email-address.png)
    4.  Click **Update**.

------------------------------------------------------------------------

### Configure the user claims

Follow the steps below to map the user claims:

!!! note
    
    For more information about claims, see [Adding Claim
    Mapping](../../learn/adding-claim-mapping).
    

1.  Click **Add** under **Main \> Identity \> Claims**.  
    ![adding-claims](../assets/img/tutorials/adding-claims.png) 
     
    1.  Click **Add Local Claim**.  
        ![add-local-claim](../assets/img/tutorials/add-local-claim.png)
        
    2.  Select the **Dialect** from the drop down provided and enter the
        required information.
        
    3.  Add the following:

        1.  **Claim URI:**
            `                             http://wso2.org/claims/identity/emailotp_disabled                           `
        2.  **Display Name** :
            `              DisableEmailOTP             `
        3.  **Description:**
            `              DisableEmailOTP             `
        4.  **Mapped Attribute (s):** `              title             `
        5.  **Supported by Default:** checked

        ![filling-claim-fields](../assets/img/tutorials/filling-claim-fields.png)

    4.  Click **Add**.

        To disable this claim for the admin user, navigate to **Users
        and Roles \> List** and click **Users.** Click on the **User
        Profile** link corresponding to admin account and then click
        **Disable EmailOTP.** This will disable the second factor
        authentication for the admin user.

------------------------------------------------------------------------

### Test the sample

1.  To test the sample, go to the following URL:
    <http://localhost:8080/travelocity.com>

    ![testing-travelocity-sample](../assets/img/tutorials/testing-travelocity-sample.jpeg)

2.  Click the link to log in with SAML from WSO2 Identity Server.

3.  The basic authentication page appears. Use your WSO2 Identity Server
    credentials.  
    ![basic-authentication-credentials](../assets/img/tutorials/basic-authentication-credentials.png)

4.  You receive a token to your email account. Enter the code to
    authenticate. If the authentication is successful, you are taken to
    the home page of the [travelocity.com](http://travelocity.com) app.

    ![email-otp-authenticating](../assets/img/tutorials/email-otp-authenticating.png)

    ![travelocity-home](../assets/img/tutorials/travelocity-home.png)

------------------------------------------------------------------------

## What's next?

-   Want to see more federated authenticators? See, [Configuring
    Federated Authentication](../../learn/configuring-federated-authentication).
-   [Try out enabling multi factor authentication using the SMSOTP
    feature of WSO2
    IS](../../learn/configuring-sms-otp).
