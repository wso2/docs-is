# Configuring Multi-factor Authentication using EmailOTP

This section provides the instructions to configure [multi-factor
authentication
(MFA)](https://docs.wso2.com/identity-server/Multi-factor+Authentication+for+WSO2+IS)
using Email One Time Password (Email OTP) in WSO2 Identity Server (WSO2
IS). The Email OTP enables a one-time password (OTP) to be used at the
second step of MFA. For more information on the WSO2 Identity Server
Versions supported by the connector, see the [IS Connector
store](https://store.wso2.com/store/assets/isconnector/details/9edc37f6-873c-408c-a532-bbb386d71e08)
.

Let's take a look at the tasks you need to follow to configure MFA using
Email OTP:

-   [Enabling email configuration on WSO2
    IS](#ConfiguringMulti-factorAuthenticationusingEmailOTP-EnablingemailconfigurationonWSO2IS)
-   [Configure the Email
    OTP provider](#ConfiguringMulti-factorAuthenticationusingEmailOTP-ConfiguringtheEmailOTPproviderConfiguretheEmailOTPprovider)
-   [Deploy the travelocity.com
    sample](#ConfiguringMulti-factorAuthenticationusingEmailOTP-Deployingtravelocity.comsampleDeploythetravelocity.comsample)
-   [Configure the Identity
    Provider](#ConfiguringMulti-factorAuthenticationusingEmailOTP-ConfiguringtheidentityproviderConfiguretheIdentityProvider)
-   [Configure the Service
    Provider](#ConfiguringMulti-factorAuthenticationusingEmailOTP-ConfiguringtheserviceproviderConfiguretheServiceProvider)
-   [Update the email address of the
    user](#ConfiguringMulti-factorAuthenticationusingEmailOTP-Updatetheemailaddressoftheuser)
-   [Configure the user
    claims](#ConfiguringMulti-factorAuthenticationusingEmailOTP-ConfiguringUserClaimConfiguretheuserclaims)
-   [Test the
    sample](#ConfiguringMulti-factorAuthenticationusingEmailOTP-TestingthesampleTestthesample)

!!! tip
    
    Before you begin!
    
    -   To ensure you get the full understanding of configuring Email OTP
        with WSO2 IS, the sample travelocity application is used in this use
        case. The samples run on the Apache Tomcat server and are written
        based on Servlet 3.0. Therefore, download Tomcat 7.x from
        [here](https://tomcat.apache.org/download-70.cgi).
    -   Install Apache Maven to build the samples. For more information, see
        [Installation
        Prerequisites](https://docs.wso2.com/identity-server/Installation+Prerequisites)
        .
    

### Enabling email configuration on WSO2 IS

Follow the steps below to configure WSO2 IS to send emails once the
Email OTP is enabled.

1.  Shut down the server if it is running.
2.  Open the
    `           <IS_HOME>/repository/conf/axis2/axis2.xml          `
    file, uncomment the
    `                       transportSender                                  name                                  =                     `
    "mailto" configurations, and update the following properties:

    |                                                   |                                                |
    |---------------------------------------------------|------------------------------------------------|
    | `               mail.smtp.from              `     | Provide the email address of the SMTP account. |
    | `               mail.smtp.user              `     | Provide the username of the SMTP account.      |
    | `               mail.smtp.password              ` | Provide the password of the SMTP account.      |

    ``` java
    <transportSender  name="mailto"
    class="org.apache.axis2.transport.mail.MailTransportSender">
        <parameter  name="mail.smtp.from">{SENDER'S_EMAIL_ID}</parameter>
        <parameter  name="mail.smtp.user">{USERNAME}</parameter>
        <parameter  name="mail.smtp.password">{PASSWORD}</parameter>
        <parameter  name="mail.smtp.host">smtp.gmail.com</parameter>
        <parameter  name="mail.smtp.port">587</parameter>
        <parameter  name="mail.smtp.starttls.enable">true</parameter>
        <parameter  name="mail.smtp.auth">true</parameter>
    </transportSender>
    ```

3.  Comment out the `           <module ref="addressing"/>          `
    property to avoid syntax errors.

    ``` java
        <!-- <module ref="addressing"/> -->
    ```

4.  Add the following email template to the
    `           <IS_HOME>/repository/conf/email/email-admin-config.xml.          `

    ``` xml
        <configuration type="EmailOTP" display="idleAccountReminder" locale="en_US" emailContentType="text/html">
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

5.  Configure the following properties in the
    `           <PRODUCT_HOME>/repository/conf/identity/identity-mgt.properties          `
    file to `           true          ` .

    ``` xml
        Authentication.Policy.Enable=true
        Authentication.Policy.Check.OneTime.Password=true
    ```

6.  Add the following configuration to the
    `           <IS_HOME>/repository/conf/identity/application-authentication.xml          `
    file under the `           <AuthenticatorConfigs>          `
    section.

    ``` java
        <AuthenticatorConfig name="EmailOTP" enabled="true">      
              <Parameter name="EMAILOTPAuthenticationEndpointURL">https://localhost:9443/emailotpauthenticationendpoint/emailotp.jsp</Parameter>
              <Parameter name="EmailOTPAuthenticationEndpointErrorPage">https://localhost:9443/emailotpauthenticationendpoint/emailotpError.jsp</Parameter>
              <Parameter name="EmailAddressRequestPage">https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp</Parameter>
              <Parameter name="usecase">association</Parameter>
              <Parameter name="secondaryUserstore">primary</Parameter>
              <Parameter name="EMAILOTPMandatory">false</Parameter>
              <Parameter name="sendOTPToFederatedEmailAttribute">false</Parameter>
              <Parameter name="federatedEmailAttributeKey">email</Parameter>
              <Parameter name="EmailOTPEnableByUserClaim">true</Parameter>
              <Parameter name="CaptureAndUpdateEmailAddress">true</Parameter>
              <Parameter name="showEmailAddressInUI">true</Parameter>
        </AuthenticatorConfig>
    ```

    ![](images/icons/grey_arrow_down.png){.expand-control-image} To view
    the parameter definitions, click here

    <table>
    <thead>
    <tr class="header">
    <th>Parameter</th>
    <th>Description</th>
    <th>Sample Values</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>                 usecase                </code></td>
    <td><div class="content-wrapper">
    <p>This parameter defines how the email ID will be retrieved. The default value is <code>                   local                  </code> .</p>
    <div id="expander-835750684" class="expand-container">
    <div id="expander-control-835750684" class="expand-control">
    <img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to view the value definitions
    </div>
    <div id="expander-content-835750684" class="expand-content">
    <div class="table-wrap">
    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Value</th>
    <th>Definition</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>local</td>
    <td>This is the default value and is based on the federated username. You must set the federated username in the local userstore . The federated username must be the same as the local username.</td>
    </tr>
    <tr class="even">
    <td>association</td>
    <td>The federated username must be associated with the local account in advance in the end user dashboard. The local username is retrieved from the association. To associate the user, log into the <a href="https://docs.wso2.com/display/IS530/Using+the+End+User+Dashboard">end user dashboard</a> and go to <strong>Associated Account</strong> by clicking <strong>View details</strong> .</td>
    </tr>
    <tr class="odd">
    <td>subjectUri</td>
    <td>When configuring the federated authenticator, select the attribute in the subject identifier under the service provider section in UI, this is used as the username of the <code>                         EmailOTP                        </code> authenticator.</td>
    </tr>
    <tr class="even">
    <td>userAttribute</td>
    <td><div class="content-wrapper">
    <p>The name of the  federatedauthenticator'suserattribute. That is the local username that is contained in a federated user's attribute. When using this, add the following parameter under the <code>                           &lt;AuthenticatorConfig name="                                                       EmailOTP                           </code> " enabled="true"&gt; section in the <code>                           &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                          </code> file and put the value, e.g., email and screen_name, id.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>If you use OpenID Connect supported authenticators such as LinkedIn and Foursquare or in the case of multiple social login options as the first step and EmailOTP assecondstep, you need to add similar configuration for the specific authenticator in the <code>                           &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                          </code> file under the &lt; <code>                           AuthenticatorConfigs                          </code> &gt; section.</p>
    <p>Examples:</p>
    <p>Fourquare</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;Foursquare&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;EmailOTP-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/foursquare/claims/email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb2-3" title="3">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;federatedEmailAttributeKey&quot;</span><span class="kw">&gt;</span>http://wso2.org/foursquare/claims/email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb2-4" title="4"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>LinkedIn</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;LinkedIn&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb3-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;EmailOTP-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/linkedin/claims/emailAddress<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb3-3" title="3">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;federatedEmailAttributeKey&quot;</span><span class="kw">&gt;</span>http://wso2.org/linkedin/claims/emailAddress<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb3-4" title="4"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>Facebook</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;FacebookAuthenticator&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb4-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;EmailOTP-userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb4-3" title="3">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;federatedEmailAttributeKey&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb4-4" title="4"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>Likewise, you can add the Authenticator Config for Amazon, Google, Twitter, and Instagram with the relevant values.</p>
    </div></td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </div></td>
    <td><ul>
    <li><code>                   local                  </code></li>
    <li><code>                   association                  </code></li>
    <li><code>                   userAttribute                  </code></li>
    <li><code>                   subjectUri                  </code></li>
    </ul></td>
    </tr>
    <tr class="even">
    <td><pre><code>secondaryUserstore</code></pre></td>
    <td><div class="content-wrapper">
    <p>You can define multiple user stores per tenant as comma separated values.</p>
    <p>Example:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1">&lt;<span class="bu">Parameter</span> name=<span class="st">&quot;secondaryUserstore&quot;</span>&gt;jdbc, abc, xyz&lt;/<span class="bu">Parameter</span>&gt;</a></code></pre></div>
    </div>
    </div>
    <div>
    <p>The user store configurations are maintained per tenant:</p>
    <ul>
    <li>If you use a <strong>super tenant,</strong> set all the parameter values into the <code>                     &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                    </code> file under the <code>                     AuthenticatorConfigs                    </code> section.</li>
    </ul>
    <ul>
    <li>If you use a <strong>tenant</strong>,
    <ul>
    <li>Upload the same XML file ( <code>                       application-authentication.xml                      </code> ) into a specific registry location ( <code>                       /_system/governance/EmailOTP                      </code> ).</li>
    <li>Create the collection named <code>                       EmailOTP                      </code>, add the resource and upload the <code>                       application-authentication.                      </code> <code>                       xml                      </code> file into the registry.</li>
    <li>While doing the authentication,thesysetmfirstcheckswhetherthereisanXML file uploaded to the registry. If that is so, it reads it from the registry but does not take the local file. If there is no file in the registry, then it only takes the property values from the local file.</li>
    <li>You can use the registry or local file to get the property values.</li>
    </ul></li>
    </ul>
    </div>
    </div></td>
    <td><p><br />
    </p></td>
    </tr>
    <tr class="odd">
    <td><pre><code>EMAILOTPMandatory</code></pre></td>
    <td>Thisparmeterdefineswhtherthe EmailOTP is enforced as the second step of the 2FA/MFA or not.
    <ul>
    <li><ul>
    <li><p>If the user is not found in the active directory where the parameter is set to <code>                      true                     </code>, the OTP is directly sent to the email address defined in the claims set.</p></li>
    <li><p>If the user is not found in the active directory where the parameter is set to <code>                      false                     </code>, the authentication flow terminates at the first step of the 2FA/MFA.</p></li>
    </ul></li>
    </ul></td>
    <td><ul>
    <li><code>                   true                  </code></li>
    <li><code>                   false                  </code></li>
    </ul></td>
    </tr>
    <tr class="even">
    <td><pre><code>sendOTPToFederatedEmailAttribute</code></pre></td>
    <td><p>When the <code>                  EMAILOTPMandatory                 </code> and this parameter are set to <code>                  true                 </code> and the user is not found in the active directory, the OTPissetn to the mail defined in the federated authenticator claim.</p>
    <p>When the <code>                  EMAILOTPMandatory                 </code> is set to <code>                  false                 </code>, an error page gets displayed.</p>
    <p>When the <code>                  EMAILOTPMandatory                 </code> is set to <code>                  false                 </code> and the user is not found in the active directory, the authentication mechanism terminates at the first step of the 2FA/MFA. This parameter is not required in such a scenario.</p></td>
    <td><ul>
    <li><code>                   true                  </code></li>
    <li><code>                   false                  </code></li>
    </ul></td>
    </tr>
    <tr class="odd">
    <td><pre><code>federatedEmailAttributeKey</code></pre></td>
    <td>This parameter identifies the email attribute of the federated authenticator, e.g. Foursquare. Set this parameter if the <code>                 sendOTPToFederatedEmailAttribute                </code> is set to <code>                 true                </code> . Example: <code>                                                                          http://wso2.org/foursquare/claims/email                                                                      </code></td>
    <td><br />
    </td>
    </tr>
    <tr class="even">
    <td><pre><code>EmailOTPEnableByUserClaim</code></pre></td>
    <td>This parameter enables the user to overidethefunctionalitydefinedatthe <code>                 EMAILOTPMandatory                </code> parameter.
    <ul>
    <li><ul>
    <li>If this parameter and the <code>                     EMAILOTPMandatory                    </code> parameters are set to <code>                     true                    </code>, the user can either enable or disable the EmailOTP functionality.</li>
    <li>If this parameter is set to <code>                     false                    </code> where the <code>                     EMAILOTPMandatory                    </code> parameter is set to <code>                     true                    </code>, the user gets redirected to an error page.</li>
    <li>If this parameter and the <code>                     EMAILOTPMandatory                    </code> parameters are set to <code>                     false                    </code>, the authentication flow terminates at the first step of the 2FA/MFA.</li>
    <li>If the user is not available in the active directory</li>
    </ul></li>
    </ul></td>
    <td><ul>
    <li><code>                   true                  </code></li>
    <li><code>                   false                  </code></li>
    </ul></td>
    </tr>
    <tr class="odd">
    <td><pre><code>CaptureAndUpdateEmailAddress</code></pre></td>
    <td><p>This parameter enables the user to update the email address that is used to send the OTP, at the first login where the email address is not previously set.</p></td>
    <td><ul>
    <li><code>                   true                  </code></li>
    <li><code>                   false                  </code></li>
    </ul></td>
    </tr>
    <tr class="even">
    <td><pre><code>EmailAddressRequestPage</code></pre></td>
    <td><div class="content-wrapper">
    <p>This parameter enables to display a page that requests for an email address where</p>
    <ul>
    <li><ul>
    <li>The user has not registered an email address.</li>
    <li>Sending OTP is defined as the second step of 2FA/MFA.</li>
    <li>The <code>                      CaptureAndUpdateEmailAddress                     </code> parameter is set to <code>                      true                     </code> .</li>
    </ul></li>
    </ul>
    <p>Example: <code>                                                            https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp                                                         </code></p>
    </div></td>
    <td><pre><code>                        

                          </code></pre></td>
    </tr>
    <tr class="odd">
    <td><pre><code>showEmailAddressInUI</code></pre></td>
    <td><div class="content-wrapper">
    <p>This parameter enables to display the email address to which the OTP is sent to on the UI.</p>
    </div></td>
    <td><ul>
    <li><code>                   true                  </code></li>
    <li><code>                   false                  </code></li>
    </ul></td>
    </tr>
    </tbody>
    </table>

7.  [Start WSO2
    IS](https://docs.wso2.com/identity-server/Running+the+Product).

### Configure the Email OTP provider

You can send the One Time Password (OTP) using Gmail APIs or using
SendGrid. Follow the steps given below to configure Gmail APIs as the
mechanisam to send the OTP.

1.  Create a Google account at [https://gmail.com](https://gmail.com/).
2.  Got to
    [https://console.developers.google.com](https://console.developers.google.com/)
    and click **ENABLE APIS AND SERVICES**.
3.  Search for Gmail API and click on it.  
4.  Click **Enable** to enable the Gmail APIs.  

    Why is this needed?

    If you do not enable the Gmail APIs, you run in to a 401 error when
    trying out
    [step13](#ConfiguringMulti-factorAuthenticationusingEmailOTP-copy-URL)
    .

5.  Click **Credentials** a nd click **Create** to create a new project.
6.  Click **Credentials** and click the **Create credentials**
    drop-down.

7.  Select **OAuth client ID** option.

    ![](attachments/50504065/76749378.png) 

8.  Click **Configure consent screen**.  
    ![](attachments/50504065/80728982.png)
9.  Enter the Product name that needs to be shown to users, enter values
    to any other fields you prefer to update, and click **Save**.
10. Select the **Web application** option.  
    Enter `           https://localhost:9443/commonauth          ` as
    the **Authorize redirect URIs** text-box, and click **Create**.  
    ![](attachments/50504065/80728977.png) 

    The `           client ID          ` and the
    `           client secret          ` are displayed.  
    Copy the client ID and secret and keep it in a safe place as you
    require it for the next step.  
    ![](attachments/50504065/76749399.png) 

11. Copy the URL below and replace the
    `           <ENTER_CLIENT_ID>          ` tag with the generated
    `           Client ID          ` . This is required to generate the
    authorization code.

    ``` java
        https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Flocalhost%3A9443%2Fcommonauth&response_type=code&client_id=<ENTER_CLIENT_ID>&scope=http%3A%2F%2Fmail.google.com&approval_prompt=force&access_type=offline
    ```

    ``` java
        https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Flocalhost%3A9443%2Fcommonauth&response_type=code&client_id=854665841399-l13g81ri4q98elpen1i1uhsdjulhp7ha.apps.googleusercontent.com&scope=http%3A%2F%2Fmail.google.com&approval_prompt=force&access_type=offline
    ```

12. Paste the updated URL into your browser.

    1.  Select the preferred Gmail account with which you wish to
        proceed.

    2.  Click **Allow**.
    3.  Obtain the `             authorization code            ` using a
        SAML tracer on your browser.

        ![](attachments/50504065/76749411.png) 

13. To generate the access token, copy the following cURL command and
    replace the following place holders :

    1.  `                         <CLIENT-ID>                       ` :
        Replace this with the `            client ID           `
        obtained in [Step
        10](#ConfiguringMulti-factorAuthenticationusingEmailOTP-client-ID)
        above.
    2.  `                         <CLIENT_SECRET>                       `
        : Replace this with the `            client secret           `
        obtained in [Step
        10](#ConfiguringMulti-factorAuthenticationusingEmailOTP-client-ID)
        above.
    3.  `                           <AUTHORIZATION_CODE>                         `
        : Replace this with the authorization code obtained in [Step
        12](#ConfiguringMulti-factorAuthenticationusingEmailOTP-Auth-code)
        above.  

    ``` java
        curl -v -X POST --basic -u <CLIENT-ID>:<CLIENT_SECRET> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=<AUTHORIZATION_CODE>&redirect_uri=https://localhost:9443/commonauth" https://www.googleapis.com/oauth2/v3/token
    ```

    ``` java
        curl -v -X POST --basic -u 854665841399-l13g81ri4q98elpen1i1uhsdjulhp7ha.apps.googleusercontent.com:MK3h4fhSUT-aCTtSquMB3Vll -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=4/KEDlA2KjGtib4KlyzaKzVNuDfvAmFZ10T82usT-6llY#&redirect_uri=https://localhost:9443/commonauth" https://www.googleapis.com/oauth2/v3/token
    ```

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
    ![](attachments/50504065/76749415.png) 

14. Update the following configurations under the
    `           <AuthenticatorConfigs>          ` section in the
    `           <IS_HOME>/repository/conf/identity/application-authentication.xml          `
    file.

    !!! note
    
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
    <td>Enter the Client ID you got in <a href="#ConfiguringMulti-factorAuthenticationusingEmailOTP-client-ID">step 10</a> .<br />
    Example: <code>               501390351749-ftjrp3ld9da4ohd1rulogejscpln646s.apps.googleusercontent.com              </code></td>
    </tr>
    <tr class="even">
    <td><code>               GmailClientSecret              </code></td>
    <td>Enter the client secret you got in <a href="#ConfiguringMulti-factorAuthenticationusingEmailOTP-client-ID">step 10</a> .<br />
    Example: <code>               dj4st7_m3AclenZR1weFNo1V              </code></td>
    </tr>
    <tr class="odd">
    <td><code>               SendgridAPIKey              </code></td>
    <td>This property is only required if you are using the Sengrid method. Since you are using Gmail APIs, keep the default value.</td>
    </tr>
    <tr class="even">
    <td><code>               GmailRefreshToken              </code></td>
    <td>Enter the refresh token that you got as the response in <a href="#ConfiguringMulti-factorAuthenticationusingEmailOTP-Refresh-token">step 12</a> . Example: <code>               1/YgNiepY107SyzJdgpynmf-eMYP4qYTPNG_L73MXfcbv              </code></td>
    </tr>
    <tr class="odd">
    <td><code>               GmailEmailEndpoint              </code></td>
    <td>Enter your username of your Gmail account in place of the <code>               [userId]              </code> place holder . Example: <code>                               https://www.googleapis.com/gmail/v1/users/alex@gmail.com/messages/send                             </code></td>
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

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to see a sample configuration

    ``` java
    <AuthenticatorConfig name="EmailOTP" enabled="true">
       <Parameter name="GmailClientId">501390351749-ftjrp3ld9da4ohd1rulogejscpln646s.apps.googleusercontent.com </Parameter>
       <Parameter name="GmailClientSecret">dj4st7_m3AclenZR1weFNo1V</Parameter>
       <Parameter name="SendgridAPIKey">sendgridAPIKeyValue</Parameter>
       <Parameter name="GmailRefreshToken">1/YgNiepY107SyzJdgpynmf-eMYP4qYTPNG_L73MXfcbv</Parameter>
       <Parameter name="GmailEmailEndpoint">https://www.googleapis.com/gmail/v1/users/alex@gmail.com/messages/send</Parameter>
       <Parameter name="SendgridEmailEndpoint">https://api.sendgrid.com/api/mail.send.json</Parameter>
       <Parameter name="accessTokenRequiredAPIs">Gmail</Parameter>
       <Parameter name="apiKeyHeaderRequiredAPIs">Sendgrid</Parameter>
       <Parameter name="SendgridFormData">sendgridFormDataValue</Parameter>
       <Parameter name="SendgridURLParams">sendgridURLParamsValue</Parameter>
       <Parameter name="GmailAuthTokenType">Bearer</Parameter>
       <Parameter name="GmailTokenEndpoint">https://www.googleapis.com/oauth2/v3/token</Parameter>
       <Parameter name="SendgridAuthTokenType">Bearer</Parameter>
       <Parameter name="redirectToMultiOptionPageOnFailure">false</Parameter>
    </AuthenticatorConfig>
    ```

\[ [Back to
Top](_Configuring_Multi-factor_Authentication_using_EmailOTP_) \]

------------------------------------------------------------------------

### Deploy the travelocity.com sample

Follow the steps below to deploy the travelocity.com sample application:

#### Download the samples

To be able to deploy a sample of Identity Server, you need to download
it onto your machine first.

Follow the instructions below to download a sample from GitHub.

1.  Create a folder in your local machine and navigate to it using your
    command line.
2.  Run the following commands.

    ``` bash
        mkdir is-samples
        cd is-samples/
        git init
        git remote add -f origin https://github.com/wso2/product-is.git
    ```

    ``` bash
        git config core.sparseCheckout true
    ```

3.  Navigate into the . `            git/info/           ` directory and
    list out the folders/files you want to check out using the
    `            echo           ` command below.

    ``` bash
        cd .git
        cd info
        echo "modules/samples/" >> sparse-checkout
    ```

4.  Navigate out of `            .git/info           ` directory and
    checkout the `            v5.4.0           ` tag to update the empty
    repository with the remote one.

    ``` bash
        cd ..
        cd ..
        git checkout -b v5.4.0 v5.4.0
    ```

    Access the samples by navigating to the
    `            is-samples/modules/samples           ` directory.

#### Deploy the sample web app

Deploy this sample web app on a web container.

1.  Use the Apache Tomcat server to do this. If you have not downloaded
    Apache Tomcat already, download it from
    [here](https://tomcat.apache.org/download-70.cgi).
2.  Copy the .war file into the `           webapps          `
    folder. For example,
    `           <TOMCAT_HOME>/apache-tomcat-<version>/webapps          `
    .
3.  Start the Tomcat server.

To check the sample application, navigate to
`          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
on your browser.

For example,
`                     http://localhost:8080/travelocity.com/index.jsp                    .         `

!!! note
    
    **Note** : It is recommended that you use a hostname that is not
    `          localhost         ` to avoid browser errors. Modify the
    `          /etc/hosts         ` entry in your machine to reflect this.
    Note that `          localhost         ` is used throughout
    thisdocumentation as an example, but you must modify this when
    configuring these authenticators or connectors with this sample
    application.
    

\[ [Back to
Top](_Configuring_Multi-factor_Authentication_using_EmailOTP_) \]

------------------------------------------------------------------------

### Configure the Identity Provider

Follow the steps below to add an [identity
provider](https://docs.wso2.com/identity-server/Adding+and+Configuring+an+Identity+Provider)
:

1.  Click **Add** under **Main \> Identity \> Identity Providers**.  
    ![](attachments/50504065/76749441.png) 
2.  Provide a suitable name for the identity provider.  
    ![](attachments/50504065/76749432.png) 
3.  Expand the **EmailOTPAuthenticator Configuration** under **Federated
    Authenticators**.  

    1.  Select the **Enable** and **Default** check boxes .

    2.  Click **Register**.

        ![](attachments/50504065/76749434.png) 

    You have now added the identity provider.

\[ [Back to
Top](_Configuring_Multi-factor_Authentication_using_EmailOTP_) \]

------------------------------------------------------------------------

### Configure the Service Provider

Follow the steps below add a service provider:

1.  Return to the Management Console home screen.

2.  Click **Add** under **Add** under **Main \> Identity \> Service
    Providers**.  
    ![](attachments/50504065/76749440.png) 

3.  Enter `           travelocity.com          ` as the **Service
    Provider Name**.  
    ![](attachments/50504065/76749442.png) 

4.  Click **Register**.

5.  Expand **SAML2 Web SSO Configuration** under **Inbound
    Authentication Configuration**.

6.  Click **Configure**.

    ![](attachments/50504065/50684302.png) 

7.  Now set the configuration as follows:

    1.  **Issuer** : `             travelocity.com            `

    2.  **Assertion Consumer URL** :
        `             http://localhost:8080/travelocity.com/home.jsp            `

    3.  Select the following check-boxes: **Enable Response Signing**,
        **Enable Single Logout**, **Enable Attribute Profile**, and
        **Include Attributes in the Response Always**.

8.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.

9.  Go to **Claim Configuration** and select the
    **http://wso2.org/claims/emailaddress** claim.

    ![](attachments/50504065/76749444.png) 

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
            Authenticators of Step 2 to add the SMSOTP identity provider
            you created as the second step.  
            SMSOTP is a second step that adds another layer of
            authentication and security.

    ![](attachments/50504065/50684304.png) 

11. Click **Update**.

    You have now added and configured the service provider.

    !!! note
    
        For more information on service provider configuration, see
        [Configuring Single
        Sign-On](https://docs.wso2.com/identity-server/Configuring+Single+Sign-On)
        .
    

\[ [Back to
Top](_Configuring_Multi-factor_Authentication_using_EmailOTP_) \]

------------------------------------------------------------------------

### Update the email address of the user

Follow the steps given below to update the user's email address.

1.  Return to the WSO2 Identity Server Management Console home screen.
2.  Click **List** under **Add** under **Main \> Identity \> Users and
    Roles**.  
    ![](attachments/50504065/76749451.png) 
    1.  Click **Users**.  
        ![](attachments/50504065/76749454.png) 
    2.  Click **User Profile** under **Admin**.  
        ![](attachments/50504065/76749456.png) 
    3.  Update the **email address**.  
        ![](attachments/50504065/50684305.png) 
    4.  Click **Update**.

\[ [Back to
Top](_Configuring_Multi-factor_Authentication_using_EmailOTP_) \]

------------------------------------------------------------------------

### Configure the user claims

Follow the steps below to map the user claims:

!!! note
    
    For more information about claims, see [Adding Claim
    Mapping](https://docs.wso2.com/identity-server/Adding+Claim+Mapping).
    

1.  Click **Add** under **Main \> Identity \> Claims**.  
    ![](attachments/50504065/76749457.png)   
    1.  Click **Add Local Claim**.  
        ![](attachments/50504065/76749458.png) 
    2.  Select the **Dialect** from the drop down provided and enter the
        required information.
    3.  Add the following:

        1.  **Claim URI:**
            `              http://wso2.org/claims/identity/emailotp_disabled             `
        2.  **Display Name** :
            `              DisableEmailOTP             `
        3.  **Description:**
            `              DisableEmailOTP             `
        4.  **Mapped Attribute (s):** `              title             `
        5.  **Supported by Default:** checked

        ![](attachments/50504065/75107402.png) 

    4.  Click **Add**.

        To disable this claim for the admin user, navigate to **Users
        and Roles \> List** and click **Users.** Click on the **User
        Profile** link corresponding to admin account and then click
        **Disable EmailOTP.** This will disable the second factor
        authentication for the admin user.

\[ [Back to
Top](_Configuring_Multi-factor_Authentication_using_EmailOTP_) \]

------------------------------------------------------------------------

### Test the sample

1.  To test the sample, go to the following URL:
    <http://localhost:8080/travelocity.com>

    [![](attachments/50504065/50684306.jpeg) ](http://localhost:8080/travelocity.com)

2.  Click the link to log in with SAML from WSO2 Identity Server.

3.  The basic authentication page appears. Use your WSO2 Identity Server
    credentials.  
    ![](attachments/50504065/50684387.png) 

4.  You receive a token to your email account. Enter the code to
    authenticate. If the authentication is successful, you are taken to
    the home page of the travelocity.com app.

    ![](attachments/50504065/50684386.png) 

    ![](attachments/50504065/50684388.png) 

\[ [Back to
Top](_Configuring_Multi-factor_Authentication_using_EmailOTP_) \]
