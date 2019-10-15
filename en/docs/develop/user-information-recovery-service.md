# User Information Recovery Service

This section lists out and describes the service methods available in
the user information recovery API.

### confirmUserSelfRegistration

This method is used to confirm the self registered user account and
unlock it.

Permission level: `         /permission/admin/login        `

**Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://beans.mgt.captcha.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:confirmUserSelfRegistration>
         <!--Optional:-->
         <ser:username></ser:username>
         <!--Optional:-->
         <ser:code>?</ser:code>
         <!--Optional:-->
         <ser:captcha>
            <!--Optional:-->
            <xsd:imagePath></xsd:imagePath>
            <!--Optional:-->
            <xsd:secretKey></xsd:secretKey>
            <!--Optional:-->
            <xsd:userAnswer></xsd:userAnswer>
         </ser:captcha>
         <!--Optional:-->
         <ser:tenantDomain></ser:tenantDomain>
      </ser:confirmUserSelfRegistration>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>code</td>
<td>String</td>
<td>Confirmation code send to the user.</td>
</tr>
<tr class="odd">
<td>captcha</td>
<td>Captcha</td>
<td>Captcha code. Includes <code>             imagePath, secretKey and UserAnswer            </code></td>
</tr>
</tbody>
</table>

### getAllChallengeQuestions

This method is used to get all challenge questions.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getAllChallengeQuestions/>
   </soapenv:Body>
</soapenv:Envelope>
```

### getCaptcha

This method is used to get the captcha code.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getCaptcha/>
   </soapenv:Body>
</soapenv:Envelope>
```

### getUserChallengeQuestion

This method is used to get the challenge question for the user.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getUserChallengeQuestion>
         <!--Optional:-->
         <ser:userName></ser:userName>
         <!--Optional:-->
         <ser:confirmation></ser:confirmation>
         <!--Optional:-->
         <ser:questionId></ser:questionId>
      </ser:getUserChallengeQuestion>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>confirmation</td>
<td>String</td>
<td>Confirmation code send to the user.</td>
</tr>
<tr class="odd">
<td>questionId</td>
<td>String</td>
<td>Question ID.</td>
</tr>
</tbody>
</table>

### getUserChallengeQuestionIds

This method is used to get the challenge question IDs.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getUserChallengeQuestionIds>
         <!--Optional:-->
         <ser:username></ser:username>
         <!--Optional:-->
         <ser:confirmation>?</ser:confirmation>
      </ser:getUserChallengeQuestionIds>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>confirmation</td>
<td>String</td>
<td>Confirmation code send to the user.</td>
</tr>
</tbody>
</table>

### getUserIdentitySupportedClaims

This method is used to get the user supported claims.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getUserIdentitySupportedClaims>
         <!--Optional:-->
         <ser:dialect></ser:dialect>
      </ser:getUserIdentitySupportedClaims>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>dialect</td>
<td>String</td>
<td>Claim dialect.</td>
</tr>
</tbody>
</table>

### registerUser

This method is used to register a user in the system. The account will
be locked if the
`         Authentication.Policy.Account.Lock.On.Creation        `
property is set to true, otherwise the user will be able to login after
registration.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://dto.mgt.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:registerUser>
         <!--Optional:-->
         <ser:userName></ser:userName>
         <!--Optional:-->
         <ser:password></ser:password>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimUri></xsd:claimUri>
            <!--Optional:-->
            <xsd:claimValue></xsd:claimValue>
         </ser:claims>
         <!--Optional:-->
         <ser:profileName></ser:profileName>
         <!--Optional:-->
         <ser:tenantDomain></ser:tenantDomain>
      </ser:registerUser>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>password</td>
<td>String</td>
<td>Password of the user.</td>
</tr>
<tr class="odd">
<td><p>claims</p></td>
<td><pre><code>UserIdentityClaim[]</code></pre></td>
<td>User claims. Includes <code>             claimUri            </code> and <code>             claimValue            </code> .</td>
</tr>
<tr class="even">
<td>profileName</td>
<td>String</td>
<td>User profile name.</td>
</tr>
<tr class="odd">
<td>tenantDomain</td>
<td>String</td>
<td>Tenant domain of the user.</td>
</tr>
</tbody>
</table>

### resendSignUpConfirmationCode

This method is used to resend the self sign up confirmation code when
the user has not received the email properly.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:resendSignUpConfirmationCode>
         <!--Optional:-->
         <ser:userName></ser:userName>
         <!--Optional:-->
         <ser:code>?</ser:code>
         <!--Optional:-->
         <ser:profileName></ser:profileName>
         <!--Optional:-->
         <ser:tenantDomain></ser:tenantDomain>
      </ser:resendSignUpConfirmationCode>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>code</td>
<td>String</td>
<td>Confirmation code send to the user.</td>
</tr>
<tr class="odd">
<td>tenantDomain</td>
<td>String</td>
<td>Tenant domain of the user.</td>
</tr>
</tbody>
</table>

### sendRecoveryNotification

This method is used to send the recovery notification.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:sendRecoveryNotification>
         <!--Optional:-->
         <ser:username></ser:username>
         <!--Optional:-->
         <ser:key>?</ser:key>
         <!--Optional:-->
         <ser:notificationType></ser:notificationType>
      </ser:sendRecoveryNotification>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>key</td>
<td>String</td>
<td>Confirmation key send to the user.</td>
</tr>
<tr class="odd">
<td>notificationType</td>
<td>String</td>
<td>Notification type.</td>
</tr>
</tbody>
</table>

### updatePassword

This method is used to update the password in the system for
password recovery process. Before calling this method, the caller needs
to call the `         verifyConfirmationCode()        ` method and get
the newly generated confirmation code.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:updatePassword>
         <!--Optional:-->
         <ser:username></ser:username>
         <!--Optional:-->
         <ser:confirmationCode></ser:confirmationCode>
         <!--Optional:-->
         <ser:newPassword></ser:newPassword>
      </ser:updatePassword>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>confirmationCode</td>
<td>String</td>
<td>Confirmation code send to the user.</td>
</tr>
<tr class="odd">
<td>newPassword</td>
<td>String</td>
<td>New password for the user.</td>
</tr>
</tbody>
</table>

### verifyAccount

Verifies the user against the provided claims and captcha information.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://dto.mgt.identity.carbon.wso2.org/xsd" xmlns:xsd1="http://beans.mgt.captcha.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:verifyAccount>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimUri></xsd:claimUri>
            <!--Optional:-->
            <xsd:claimValue></xsd:claimValue>
         </ser:claims>
         <!--Optional:-->
         <ser:captcha>
            <!--Optional:-->
            <xsd1:imagePath></xsd1:imagePath>
            <!--Optional:-->
            <xsd1:secretKey></xsd1:secretKey>
            <!--Optional:-->
            <xsd1:userAnswer></xsd1:userAnswer>
         </ser:captcha>
         <!--Optional:-->
         <ser:tenantDomain></ser:tenantDomain>
      </ser:verifyAccount>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>claims</td>
<td><code>             UserIdentityClaim[]            </code></td>
<td>User claims. Includes <code>             claimUri            </code> and <code>             claimValue            </code> .</td>
</tr>
<tr class="even">
<td>captcha</td>
<td>Captcha</td>
<td>Captcha code. Includes <code>             imagePath, secretKey and UserAnswer            </code></td>
</tr>
<tr class="odd">
<td>tenantDomain</td>
<td>String</td>
<td>Tenant domain of the user.</td>
</tr>
</tbody>
</table>

### verifyConfirmationCode

This method is used to verify the confirmation code supplied by user.
This invalidates the current code, generates a new code and sends it to
the user.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://beans.mgt.captcha.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:verifyConfirmationCode>
         <!--Optional:-->
         <ser:username></ser:username>
         <!--Optional:-->
         <ser:code>?</ser:code>
         <!--Optional:-->
         <ser:captcha>
            <!--Optional:-->
            <xsd:imagePath></xsd:imagePath>
            <!--Optional:-->
            <xsd:secretKey></xsd:secretKey>
            <!--Optional:-->
            <xsd:userAnswer></xsd:userAnswer>
         </ser:captcha>
      </ser:verifyConfirmationCode>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>code</td>
<td>String</td>
<td>Confirmation code send to the user.</td>
</tr>
<tr class="odd">
<td>captcha</td>
<td>Captcha</td>
<td>Captcha code. Includes <code>             imagePath, secretKey and UserAnswer            </code></td>
</tr>
</tbody>
</table>

### verifyUser

This method is used to verify the user against the captcha code.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://beans.mgt.captcha.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:verifyUser>
         <!--Optional:-->
         <ser:username></ser:username>
         <!--Optional:-->
         <ser:captcha>
            <!--Optional:-->
            <xsd:imagePath></xsd:imagePath>
            <!--Optional:-->
            <xsd:secretKey></xsd:secretKey>
            <!--Optional:-->
            <xsd:userAnswer></xsd:userAnswer>
         </ser:captcha>
      </ser:verifyUser>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>captcha</td>
<td>Captcha</td>
<td>Captcha code. Includes <code>             imagePath, secretKey and UserAnswer            </code></td>
</tr>
</tbody>
</table>

### verifyUserChallengeAnswer

This method is used to verify the user against the challenge question.

Permission level: `         /permission/admin/login        `

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:verifyUserChallengeAnswer>
         <!--Optional:-->
         <ser:userName></ser:userName>
         <!--Optional:-->
         <ser:confirmation></ser:confirmation>
         <!--Optional:-->
         <ser:questionId></ser:questionId>
         <!--Optional:-->
         <ser:answer></ser:answer>
      </ser:verifyUserChallengeAnswer>
   </soapenv:Body>
</soapenv:Envelope>
```

#### Parameters

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>Parameter</p>
</div></th>
<th><div>
<p>Type</p>
</div></th>
<th><div>
<p>Description</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>userName</td>
<td>String</td>
<td>Username of the user.</td>
</tr>
<tr class="even">
<td>confirmation</td>
<td>String</td>
<td>Confirmation code send to the user.</td>
</tr>
<tr class="odd">
<td>questionId</td>
<td>String</td>
<td>Question ID.</td>
</tr>
<tr class="even">
<td>answer</td>
<td>String</td>
<td>Answer to the question.</td>
</tr>
</tbody>
</table>
