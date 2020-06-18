# Configure SMS OTP for 2-Factor Authentication

This page guides you through configuring [two-factor authentication](../../../concepts/authentication/intro-authentication#two-factor-authentication) for a web application using [SMS OTP](insertlink) as the second factor. 

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application and a sample authenticator, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/mfa-sample"   rel="nofollow noopener">Try it with the sample</a>

----

{!fragments/connect-sms-provider.md!}

----

{!fragments/register-an-identity-provider.md!}

----

## Configure SMS OTP

1.  Expand **SMS OTP Configuration** under **Federated Authenticators**.

2.  Select both check-boxes to **Enable SMSOTP Authenticator** and to
    make it the **Default**.

3. Enter the SMS URL, the HTTP Method used (e.g., GET or POST), and the
    headers and payload if the API uses any.

    !!! info
        - If the text message and the phone number are passed as parameters in any field, include them as $ctx.num and $ctx.msg respectively.

        - Optionally, enter the HTTP response code the SMS service provider sends when the API is successfully called. Nexmo API and  Bulksms API sends 200 as the code, while Clickatell and Plivo send 202. If this value is unknown, leave it blank and the connector checks if the response is 200, 201 or 202.

    ??? Note "Click here to configure Nexmo as the service provider."

		Follow the steps given below if **Nexmo** is used as the SMS provider:

		1.  Go to <https://dashboard.nexmo.com/sign-up> and sign up.
		2.  Once you successfully register, the API **key** and **secret**
			are displayed. Copy and save them as you need them for the next
			step.  
			Example:  
			![nexmo-config](../../../assets/img/guides/nexmo-config.png)
		3.  The Nexmo API requires the parameters to be encoded in the URL,
			so the SMS URL would be as follows.
			<html><table>
			<tbody>
			<tr class="odd">
			<td><strong>SMS URL</strong></td>
			<td><code> https://rest.nexmo.com/sms/json?api_key=&api_secret=&from=NEXMO&to=\$ctx.num&text=\$ctx.msg </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Method</strong></td>
			<td><code>              POST              </code></td>
			</tbody>
			</table></html>
			
    ??? Note "Click here to configure Clickatell as the service provider."

		Follow the steps given below if **Clickatell** is used as the SMS
		provider:

		1.  Go to <https://www.clickatell.com/sign-up/> and create
			an account.
		2.  The Auth token is provided when you register with Clickatell.

		3.  Clickatell uses a POST method with headers and the text message
			and phone number are sent as the payload. So the fields would be
			as follows.
			<html><table>
			<tbody>
			<tr class="odd">
			<td><strong>SMS URL</strong></td>
			<td><code> https://api.clickatell.com/rest/message  </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Method</strong></td>
			<td><code>              POST              </code></td>
			</tr>
			<tr class="odd">
			<td><strong>HTTP Headers</strong></td>
			<td><code> X-Version: 1,Authorization: bearer <ENTER_AUTH_TOKEN>,Accept: application/json,Content-Type: application/json  </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Payload</strong></td>
			<td><code> {"text":" $ctx.msg ","to":[" $ctx.num "]} </code></td>
			</tr>
			</tbody>
			</table></html>

    ??? Note "Click here to configure Plivo as the service provider."

		Follow the steps given below if **Plivo** is used as the SMS provider:

		1.  Sign up for a free [Plivo trial
			account](https://manage.plivo.com/accounts/register/?utm_source=send%bulk%20sms&utm_medium=sms-docs&utm_campaign=internal)
			.
		2.  Phone numbers must be verified at the [Sandbox
			Numbers](https://manage.plivo.com/sandbox-numbers/) page (add at
			least two numbers and verify them).

		3.  The Plivo API is authenticated with Basic Auth using your
			`                AUTH ID               ` and
			`                AUTH TOKEN               ` , Your Plivo
			`                AUTH ID               ` and
			`                AUTH TOKEN               ` can be found when
			you log in to your
			[dashboard.](https://manage.plivo.com/dashboard/)
		4.  Plivo uses a POST method with headers, and the text message and
			phone number are sent as the payload. So the fields would be as
			follows.
			<html><table>
			<tbody>
			<tr class="odd">
			<td><strong>SMS URL</strong></td>
			<td><code> https://api.plivo.com/v1/Account/{auth_id}/Message/  </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Method</strong></td>
			<td><code>              POST              </code></td>
			</tr>
			<tr class="odd">
			<td><strong>HTTP Headers</strong></td>
			<td><code> Authorization: Basic ********,Content-Type: application/json </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Payload</strong></td>
			<td><code> {"src":"+94*********","dst":"$ctx.num","text":"$ctx.msg"} </code></td>
			</tr>
			</tbody>
			</table></html>

    ??? Note "Click here to configure Bulksms as the service provider."

		Follow the steps given below if **Bulksms** is used as the SMS provider:

		1.  Go to <https://www2.bulksms.com/login.mc> and create an account.
		2.  While registering the account, verify your mobile number and
			click **Claim** to get free credit.  
			![mobile-number-claim](../../../assets/img/guides/mobile-number-claim.png)

			Bulksms API authentication is performed by providing the
			username and password request parameters.

		3.  Bulksms uses the POST method and the required parameters are to
			be encoded in the URL. So the fields would be as follows.
			<html><table>
			<tbody>
			<tr class="odd">
			<td><strong>SMS URL</strong></td>
			<td><code> https://bulksms.vsms.net/eapi/submission/send_sms/2/2.0?username=&password=&message=\$ctx.msg&msisdn=\$ctx.num  </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Method</strong></td>
			<td><code>              POST              </code></td>
			</tr>
			<tr class="odd">
			<td><strong>HTTP Headers</strong></td>
			<td><code> Content-Type: application/x-www-form-urlencoded </code></td>
			</tr>
			</tbody>
			</table></html>
			
    ??? Note "Click here to configure Twilio as the service provider."
        
        You will need a Twilio-enabled phone number (a phone number purchased through Twilio) to send SMS using Twilio.

		Follow the steps given below if **Twilio** is used as the SMS provider:

		1.  Go to <https://www.twilio.com/try-twilio> and create an account.
		2.  While registering the account, verify your mobile number and
			click on console home <https://www.twilio.com/console> to get
			free credit (Account SID and Auth Token).

		3.  Twilio uses the POST method with headers, and the text message
			and phone number are sent as the payload. The fields would be as
			follows.
			<html><table>
			<tbody>
			<tr class="odd">
			<td><strong>SMS URL</strong></td>
			<td><code> https://api.twilio.com/2010-04-01/Accounts/{AccountSID}/SMS/Messages.json </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Method</strong></td>
			<td><code>              POST              </code></td>
			</tr>
			<tr class="odd">
			<td><strong>HTTP Headers</strong></td>
			<td><code> Authorization: Basic base64{AccountSID:AuthToken} </code></td>
			</tr>
			<tr class="even">
			<td><strong>HTTP Payload</strong></td>
			<td><code> Body=\$ctx.msg&To=\$ctx.num&From=urlencode{FROM_NUM} </code></td>
			</tr>
			</tbody>
			</table></html>

----

{!fragments/register-a-service-provider.md!}

4. Expand **Claim configuration**.
 
5. Select `http://wso2.org/claims/mobile` as the **Subject Claim URI**.

6. Expand **Local and Outbound Authentication Configuration**.

7. Click the **Advanced Configuration** radio button. 

8. Add the following authentication steps. 
    - **Step 1**
        1. Click **Add Authentication Step**.

        2. Select `basic` under **Local Authenticators** and click **Add Authenticator** to add the basic authentication as the first step.

            Adding basic authentication as a first step ensures that the first step of authentication will be done using the user's credentials that are configured with the WSO2 Identity Server.

    - **Step 2**
        1. Click **Add Authentication Step**.

        2. Select `smsotp` under **Federated Authenticators** and click **Add Authenticator** to add SMSOTP authentication as the second step.

            Adding SMSOTP as a second step adds another layer of authentication and security.
    
        <img name='sms-otp-authentication-steps' src='../../../assets/img/guides/sms-otp-authentication-steps.png' class='img-zoomable'/>

9. Click **Update** to save the changes.

----

## Add/update a user's mobile number

1. Click **Main** > **Identity** > **Users and Roles**.
 
2. Click **List** > **Users** to view existing users.

3. Click **User Profile** of the user you want to edit and update the
    mobile number.  
    
    !!! info
        - Make sure the number is registered with an SMS provider in order to
        send the SMS. 

        - The mobile number needs to be in the following format. If the format is wrong you will not receive the text message.
            ```
            Example:
            94778888888
            ```

An end-user can also update their own mobile number using the WSO2 Identity Server user portal. For more information, see [user portal help](insertlink).

----

## Allow users to disable SMS OTP

1. Click **Main** > **Identity** > **Claims** > **List**.

2. Click `http://wso2.org/claims`. 

3. Find the **Disable SMSOTP** claim and click **Edit**.

4. Select the **Supported by Default** option and click **Update**.

    ![supported-by-default](../../../assets/img/guides/supported-by-default.png)

5. To verify whether the option is available for the users, navigate to a user 
    profile of a user and check whether the **Disable SMSOTP** option is available.
    
    ![user-disable-smsotp](../../../assets/img/guides/user-disable-smsotp.png)
	
----

## Configuring backup codes for SMSOTP

Optionally , you can configure backup codes to be used when SMS OTP is disabled. To configure 
backup codes, follow the steps given below.

1.  Click **Main** > **Identity** > **Claims** > **Add**.

2. Click **Add Local Claim**.

3.  Enter `http://wso2.org/claims/otpbackupcodes`
    as the value for **Claim Uri**.
    
4.  Add a **Display Name** and **Description**. For example, `Backup Code`.
    
5.  Enter `postalcode ` as the value for **Mapped Attribute**.
    
6.  Select **Supported by Default**.

7.  Click **Add**.

    <img name='allow-to-use-back-up-codes' src='../../../assets/img/guides/allow-to-use-back-up-codes.png' class='img-zoomable'/>

**Add backup codes for users**

A backup code can have any number of digits, and you can define many backup codes as comma separated values.
    
1.  Click **Main** > **Identity** > **Users and Roles**.

2. Click **List** under **Users**.

3.  Click **User Profile** of a preferred user and update
    the backup codes so that the user can disable SMS OTP by selecting
    **Disable SMS OTP** if required.		

    ![define-backup-codes](../../../assets/img/guides/define-backup-codes.png)
	
----

## Disable SMSOTP authenticator

The SMS OTP authenticator is enabled by default.

You can disable the SMS OTP authenticator by adding the following configuration to the `deployment.toml` file in the
`<IS_HOME>/repository/conf` folder.

```toml
[authentication.authenticator.sms_otp] 
enable=false
```
