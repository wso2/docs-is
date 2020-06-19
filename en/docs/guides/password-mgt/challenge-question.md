# Manage Challenge Questions

## Configure challenge questions using the user portal 

{!TODO: insert-fragment!} 

---

## Manage challenge questions using REST APIs

There are a number of operations related to challenge questions that you can perform using REST APIs. To manage the challenge questions and answers of a user using REST APIs, see [Manage Challenge Questions](TODO:insert-link).

---

## Manage challenge questions using SOAP APIs

The following are some of the operations related to challenge questions that you can perform using SOAP APIs.

### getAllChallengeQuestions

This is used to retrieve all the challenge questions at once. 

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


### getUserChallengeQuestion

This is used to retrieve a particular question using the question ID. 

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
                  <li><code>questionId</code> <code>[String]</code>: This is the question ID.</li>
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

This is used to retrieve all the question IDs. 

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the challenge question IDs.</td>
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


### verifyUserChallengeAnswer

This is used to validate the responses given by the user against the existing values to confirm that they have been correctly answered. 

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
                  <li><code>questionId</code> <code>[String]</code>: This is the question ID.</li>
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
