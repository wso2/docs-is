# User Information Recovery

!!! warning

    The functionalities enabled by this SOAP API are available with the [Account Recovery REST APIs](../../using-the-account-recovery-rest-apis/) 
    with better performance. Note that it is recommended to use REST APIs wherever possible.

This section lists out and describes the operations that are available in the **User Information Recovery API**. 

## About User Information Recovery API

The **User Information Recovery API** enables recovering user information during user authentication through various features such as captcha and challenge questions.

## API operations

### confirmUserSelfRegistration

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation confirms the self registered user account and unlocks it.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <li><code>userName</code> <code>[String]</code>: This the user name of the user.</li>
               <li><code>code</code> <code>[String]</code>: This is the confirmation code send to the user.</li>
               <li><code>captcha</code> <code>[Captcha]</code>: This the captcha code. It uncludes <code>imagePath</code>, <code>secretKey</code>, and <code>UserAnswer</code>.</li>
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
                  <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://beans.mgt.captcha.carbon.wso2.org/xsd"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:confirmUserSelfRegistration&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:username&gt;&lt;/ser:username&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:code>?&lt;/ser:code&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:captcha&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:imagePath&gt;&lt;/xsd:imagePath&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:secretKey&gt;&lt;/xsd:secretKey&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:userAnswer&gt;>&lt;/xsd:userAnswer&gt;
      &lt;/ser:captcha&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:tenantDomain&gt;&lt;/ser:tenantDomain&gt;
   &lt;/ser:confirmUserSelfRegistration&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
               </div>
            </td>
        </tr>
    </tbody>    
</table>


### getAllChallengeQuestions

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves all the challenge questions.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:getAllChallengeQuestions/&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
            </td>
        </tr>        
    </tbody>    
</table>

### getCaptcha

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the captcha code.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:getCaptcha/&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
            </td>
        </tr>
    </tbody>    
</table>

### getUserChallengeQuestion

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the challenge question for the user.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name of the user.</li>
                  <li><code>confirmation</code> <code>[String]</code>: This is the confirmation code that is sent to the user.</li>
                  <li><code>questionId</code> <code>[String]</code>: This is the question Id.</li>
               </ul>
            </td>           
        </tr>
        <tr class="odd">
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:getUserChallengeQuestion&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:userName&gt;&lt;/ser:userName&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:confirmation&gt;&lt;/ser:confirmation&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:questionI&gt;&lt;/ser:questionId&gt;
   &lt;/ser:getUserChallengeQuestion&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
            </td>
        </tr>        
    </tbody>    
</table>


### getUserChallengeQuestionIds

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the challenge question Ids.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name of the user.</li>
                  <li><code>confirmation</code> <code>[String]</code>: This is the confirmation code send to the user.</li>
               </ul>                        
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:getUserChallengeQuestionIds&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:username&gt;&lt;/ser:username&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:confirmation&gt;?&lt;/ser:confirmation&gt;
   &lt;/ser:getUserChallengeQuestionIds&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>
        </tr>        
    </tbody>    
</table>


### getUserIdentitySupportedClaims

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the the user-supported claims.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>dialect</code> <code>[String]</code>: This is the claim dialect.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:getUserIdentitySupportedClaims&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:dialect&gt;&lt;/ser:dialect&gt;
   &lt;/ser:getUserIdentitySupportedClaims&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>
        </tr>        
    </tbody>    
</table>

### registerUser

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation registers a user in the system. The account will be locked if the <code>Authentication.Policy.Account.Lock.On.Creation</code> property is set to <code>true</code>, otherwise the user will be able to login after registration.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name of the user.</li>
                  <li><code>password</code> <code>[String]</code>: This is the user password.</li>
                  <li><code>claims</code> <code>[UserIdentityClaim[]]</code>: These are user claims. Includes <code>claimUri</code> and <code>claimValue</code>.</li>
                  <li><code>profileName</code> <code>[String]</code>: This is the user profile name.</li>
                  <li><code>tenantDomain</code> <code>[String]</code>: This is the user's tenant domain.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://dto.mgt.identity.carbon.wso2.org/xsd"&gt;
   &lt;soapenv:Header/&gt;
   &lt;soapenv:Body&gt;
      &lt;ser:registerUser&gt;
         &lt;!--Optional:--&gt;
         &lt;ser:userName&gt;&lt;/ser:userName&gt;
         &lt;!--Optional:--&gt;
         &lt;ser:password&gt;&lt;/ser:password&gt;
         &lt;!--Zero or more repetitions:--&gt;
         &lt;ser:claims&gt;
            &lt;!--Optional:--&gt;
            &lt;xsd:claimUri&gt;&lt;/xsd:claimUri&gt;
            &lt;!--Optional:--&gt;
            &lt;xsd:claimValue&gt;&lt;/xsd:claimValue&gt;>
         &lt;/ser:claims&gt;
         &lt;!--Optional:--&gt;
         &lt;ser:profileName&gt;&lt;/ser:profileName&gt;
         &lt;!--Optional:--&gt;
         &lt;ser:tenantDomain&gt;&lt;/ser:tenantDomain&gt;
      &lt;/ser:registerUser&gt;
   &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>        
    </tbody>    
</table>

### resendSignUpConfirmationCode

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation resend the self sign up confirmation code when the user has not received the email properly.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name.</li>
                  <li><code>code</code> <code>[String]</code>: This is the confirmation code that is sent to the user.</li>
                  <li><code>tenantDomain</code> <code>[String]</code>: This is user's tenant domain.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:resendSignUpConfirmationCode&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:userName&gt;&lt;/ser:userName&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:code>?&lt;/ser:code&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:profileName&gt;&lt;/ser:profileName&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:tenantDomain&gt;&lt;/ser:tenantDomain&gt;
   &lt;/ser:resendSignUpConfirmationCode&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>        
    </tbody>    
</table>

### sendRecoveryNotification

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation sends the recovery notification.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name.</li>
                  <li><code>key</code> <code>[String]</code>: This is the confirmation key that is sent to the user.</li>
                  <li><code>notificationType</code> <code>[String]</code>: This is the notification type.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:sendRecoveryNotification&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:username&gt;&lt;/ser:username&gt;
      &lt;!--Optional:--&gt;>
      &lt;ser:key>?&lt;/ser:key&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:notificationType&gt;&lt;/ser:notificationType&gt;
   &lt;/ser:sendRecoveryNotification&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>        
    </tbody>    
</table>

### updatePassword

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation updates the password in the system for password recovery process. <br>Before calling this method, the caller needs to call the <code>verifyConfirmationCode()</code> method and get the newly generated confirmation code.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name.</li>
                  <li><code>confirmationCode</code> <code>[String]</code>: This is the confirmation code that is sent to the user.</li>
                  <li><code>newPassword</code> <code>[String]</code>: This is the user's new password.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:updatePassword&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:username&gt;&lt;/ser:username&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:confirmationCode&gt;&lt;/ser:confirmationCode&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:newPassword&gt;&lt;/ser:newPassword&gt;
   &lt;/ser:updatePassword&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>
        </tr>        
    </tbody>    
</table>

### verifyAccount

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation verifies the user against the provided claims and captcha information.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>claims</code> <code>[UserIdentityClaim[] ]</code>: These are user claims. Includes <code>claimUri</code> and <code>claimValue</code>.</li>
                  <li><code>captcha</code> <code>[Captcha]</code>: This is the captcha code. Includes <code>imagePath</code>, <code>secretKey</code>, and <code>UserAnswer</code>.</li>
                  <li><code>tenantDomain</code> <code>[String]</code>: This is the user's tenant domain.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://dto.mgt.identity.carbon.wso2.org/xsd" xmlns:xsd1="http://beans.mgt.captcha.carbon.wso2.org/xsd"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:verifyAccount&gt;
      &lt;!--Zero or more repetitions:--&gt;
      &lt;ser:claims&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:claimUri&gt;&lt;/xsd:claimUri&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:claimValue&gt;&lt;/xsd:claimValue&gt;
      &lt;/ser:claims&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:captcha&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd1:imagePath&gt;&lt;/xsd1:imagePath&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd1:secretKey&gt;&lt;/xsd1:secretKey&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd1:userAnswer&gt;&lt;/xsd1:userAnswer&gt;
      &lt;/ser:captcha&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:tenantDomain&gt;&lt;/ser:tenantDomain&gt;
   &lt;/ser:verifyAccount&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>        
    </tbody>    
</table>

### verifyConfirmationCode

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation verifies the confirmation code supplied by user. This invalidates the current code, generates a new code and sends it to the user.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name.</li>
                  <li><code>code</code> <code>[String]</code>: This is the confirmation code that is sent to the user.</li>
                  <li><code>captcha</code> <code>[Captcha]</code>: This is the captcha code. Includes <code>imagePath</code>, <code>secretKey</code>, and <code>UserAnswer</code>.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://beans.mgt.captcha.carbon.wso2.org/xsd"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:verifyConfirmationCode&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:username&gt;&lt;/ser:username&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:code>?&lt;/ser:code&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:captcha&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:imagePath&gt;&lt;/xsd:imagePath&gt;>
         &lt;!--Optional:--&gt;
         &lt;xsd:secretKey&gt;&lt;/xsd:secretKey&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:userAnswer&gt;&lt;/xsd:userAnswer&gt;
      &lt;/ser:captcha&gt;
   &lt;/ser:verifyConfirmationCode&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>
        </tr>
        <tr>
            <th>Response</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>

### verifyUser

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation verifies the user against the captcha code.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name.</li>
                  <li><code>captcha</code> <code>[Captcha]</code>: This is the captcha code. Includes <code>imagePath</code>, <code>secretKey</code>, and <code>UserAnswer</code>.</li>
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org" xmlns:xsd="http://beans.mgt.captcha.carbon.wso2.org/xsd"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:verifyUser&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:username&gt;&lt;/ser:username&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:captcha&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:imagePath&gt;&lt;/xsd:imagePath&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:secretKey&gt;&lt;/xsd:secretKey&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:userAnswer&gt;&lt;/xsd:userAnswer&gt;
      &lt;/ser:captcha&gt;
   &lt;/ser:verifyUser&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>
        </tr>        
    </tbody>    
</table>

### verifyUserChallengeAnswer

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation verifies the user against the challenge question.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin/login</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
               <ul>
                  <li><code>userName</code> <code>[String]</code>: This is the user name.</li>
                  <li><code>confirmation</code> <code>[String]</code>: This is the confirmation code that is sent to the user.</li>
                  <li><code>questionId</code> <code>[String]</code>: This is the question Id.</li>
                  <li><code>answer</code> <code>[String]</code>: This is the answer to the question.</li>                  
               </ul>             
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>
               <div style="width: 100%; display: block; overflow: auto;">
               <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.identity.carbon.wso2.org"&gt;
&lt;soapenv:Header/&gt;
&lt;soapenv:Body&gt;
   &lt;ser:verifyUserChallengeAnswer&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:userName&gt;&lt;/ser:userName&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:confirmation&gt;&lt;/ser:confirmation&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:questionId&gt;&lt;/ser:questionId&gt;
      &lt;!--Optional:--&gt;
      &lt;ser:answer&gt;&lt;/ser:answer&gt;
   &lt;/ser:verifyUserChallengeAnswer&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
             </div>
         </td>
        </tr>        
    </tbody>    
</table>
