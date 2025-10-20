# REST API Error Catalog
This document describes all the REST API error codes that are used in WSO2 Identity Server.

## General errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
  <tr>
    <td>UE-10000</a></td>
    <td>400</td>
    <td>Invalid Request</td>
    <td>Provided request body content is not in the expected format.</td>
  </tr>
    <tr>
    <td>SE-50000</td>
    <td>500</td>
    <td>Unexpected processing error</td>
    <td>The server encountered an error while serving the request.</td>
  </tr>
  </tbody>
</table>
</div>

## Challenge question management errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
  <tr>
    <td>CQM-10002</td>
    <td>500</td>
    <td>Unable to retrieve challenges for the user</td>
    <td>The server encountered an error while retrieving challenges for the user.</td>
  </tr>
  <tr>
    <td>CQM-10003</td>
    <td>500</td>
    <td>Unable to retrieve all user challenge answers</td>
    <td>The server encountered an error while retrieving challenge answers of the user.</td>
  </tr>
  <tr>
    <td>CQM-10004</td>
    <td>500</td>
    <td>Unable to retrieve the user challenge answer of a specific challenge</td>
    <td>The server encountered an error while retrieving the challenge answer of a specific challenge.</td>
  </tr>
  <tr>
    <td>CQM-10005</td>
    <td>500</td>
    <td>Unable to set user challenge answers.</td>
    <td>The server encountered an error while setting answers to the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-20053</td>
    <td>400</td>
    <td>Unable to set user challenge answers.</td>
    <td>Validation error. Cannot answer two questions from the same question set claim uri.</td>
  </tr>
  <tr>
    <td>CQM-10006</td>
    <td>500</td>
    <td>Unable to update user challenge answer.</td>
    <td>The server encountered an error while updating the answers to the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-10007</td>
    <td>500</td>
    <td>Unable to remove user challenge answers.</td>
    <td>The server encountered an error while removing answers of the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-10008</td>
    <td>500</td>
    <td>Unable to update user challenge answer.</td>
    <td>The server encountered an error while updating the answer of a specific user challenge.</td>
  </tr>
  <tr>
    <td>CQM-10009</td>
    <td>500</td>
    <td>Unable to update user challenge answer.</td>
    <td>The server encountered an error while updating the answer of the user challenge.</td>
  </tr>
  <tr>
    <td>CQM-10010</td>
    <td>500</td>
    <td>Unable to remove user challenge answer.</td>
    <td>The server encountered an error while removing answer of the user challenge.</td>
  </tr>
  <tr>
    <td>CQM-10011</td>
    <td>400</td>
    <td>Invalid Request.</td>
    <td>Challenge question is missing in the user challenge answer request.</td>
  </tr>
  <tr>
    <td>CQM-10012</td>
    <td>409</td>
    <td>Challenge questions are already answered.</td>
    <td>User has already answered some challenges. Hence, the system is unable to add new answers.</td>
  </tr>
  <tr>
    <td>CQM-10013</td>
    <td>404</td>
    <td>Challenge answers not set</td>
    <td>User has not answered any challenges. Hence, the system is unable to process.</td>
  </tr>
  <tr>
    <td>CQM-10014</td>
    <td>409</td>
    <td>Challenge answer already set</td>
    <td>User has already answered this challenge. Hence, the system is unable to add a new challenge answer.</td>
  </tr>
  <tr>
    <td>CQM-10015</td>
    <td>404</td>
    <td>Challenge answer not set </td>
    <td>User has not answered this challenge. Hence, the system is unable to process.</td>
  </tr>
  <tr>
    <td>CQM-20054</td>
    <td>400</td>
    <td>Unable to set user challenge answer(s).</td>
    <td>Invalid Locale value provided : {{'{{locale}}'}}.</td>
  </tr>
  <tr>
    <td>CQM-20056</td>
    <td>400</td>
    <td>Unable to add challenge set.</td>
    <td>ChallengeSetId contains non alpha-numeric characters.</td>
  </tr>
  <tr>
    <td>CQM-18017</td>
    <td>400</td>
    <td>Unable to set user challenge answers.</td>
    <td>No challenge question found. Error persisting user challenge answers for user. Challenge question answered is not registered with <tenant> domain.</td>
  </tr>
  <tr>
    <td>CQM-20057</td>
    <td>500</td>
    <td></td>
    <td>Error when deleting challenge question sets.</td>
  </tr>
  <tr>
    <td>CQM-50002</td>
    <td>500</td>
    <td>Unable to get challenge</td>
    <td>The server encountered an error while retrieving a specific challenge.</td>
  </tr>
  <tr>
    <td>CQM-50003</td>
    <td>500</td>
    <td>Unable to get the challenges</td>
    <td>The server encountered an error while retrieving all challenges.</td>
  </tr>
  <tr>
    <td>CQM-50004</td>
    <td>500</td>
    <td>Unable to add challenge set</td>
    <td>The server encountered an error while setting answers to the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-50005</td>
    <td>500</td>
    <td>Unable to update challenge set</td>
    <td>The server encountered an error while updating answers to the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-50006</td>
    <td>500</td>
    <td>Unable to add a new challenge question</td>
    <td>The server encountered an error while adding a new question to the set.</td>
  </tr>
  <tr>
    <td>CQM-50007</td>
    <td>500</td>
    <td>Unable to remove challenges</td>
    <td>The server encountered an error while removing the challenge set.</td>
  </tr>
  <tr>
    <td>CQM-50008</td>
    <td>500</td>
    <td>Unable to remove challenge question</td>
    <td>The server encountered an error while removing a specific challenge question.</td>
  </tr>
  <tr>
    <td>CQM-50009</td>
    <td>400</td>
    <td>Patch operation not supported</td>
    <td>Operation is not supported on the challenge set patch API.</td>
  </tr>
  <tr>
    <td>CQM-50010</td>
    <td>404</td>
    <td>Challenge set does not exist</td>
    <td>Specified challenge set does not exist in the system, hence unable to proceed.</td>
  </tr>
  <tr>
    <td>CQM-20055</td>
    <td>400</td>
    <td>Unable to add challenge set</td>
    <td>Attributes of a challenge question to be set cannot be empty.</td>
  </tr>
  </tbody>
</table>
</div>

## Claim management errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
      <tr>
        <td>CMT-50001</a></td>
        <td>500</td>
        <td>Unable to add claim dialect</td>
        <td>The server encountered an error while adding the claim dialect, {{'{{claim dialect}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50002</a></td>
        <td>500</td>
        <td>Unable to add external claim</td>
        <td>The server encountered an error while adding the external claim, {{'{{external claim}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50003</a></td>
        <td>500</td>
        <td>Unable to add local claim</td>
        <td>The server encountered an error while adding the local claim, {{'{{local claim}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50004</a></td>
        <td>500</td>
        <td>Unable to delete claim dialect</td>
        <td>The server encountered an error while deleting the claim dialect for identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50005</a></td>
        <td>500</td>
        <td>Unable to delete external claim.</td>
        <td>The server encountered an error while deleting the external claim for identifier, {{'{{identifier}}'}} in dialect identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50006</a></td>
        <td>500</td>
        <td>Unable to delete local claim</td>
        <td>The server encountered an error while deleting the local claim for identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50007</a></td>
        <td>500</td>
        <td>Unable to retrieve claim dialects</td>
        <td>The server encountered an error while retrieving the claim dialects.</td>
      </tr>
      <tr>
        <td>CMT-50008</a></td>
        <td>500</td>
        <td>Unable to retrieve claim dialects</td>
        <td>The server encountered an error while retrieving the claim dialects.</td>
      </tr>
      <tr>
        <td>CMT-50009</a></td>
        <td>500</td>
        <td>Unable to retrieve external claim</td>
        <td>The server encountered an error while retrieving the external claim for identifier, {{'{{identifier}}'}} in dialect identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50010</a></td>
        <td>500</td>
        <td>Unable to retrieve external claims</td>
        <td>The server encountered an error while retrieving the external claims for dialect identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50011</a></td>
        <td>500</td>
        <td>Unable to retrieve local claim</td>
        <td>The server encountered an error while retrieving the local claim for identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50012</a></td>
        <td>500</td>
        <td>Unable to retrieve local claims</td>
        <td>The server encountered an error while retrieving the local claims.</td>
      </tr>
      <tr>
        <td>CMT-50013</a></td>
        <td>500</td>
        <td>Unable to update claim dialect</td>
        <td>The server encountered an error while updating the claim dialect for identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50014</a></td>
        <td>500</td>
        <td>Unable to update external claim</td>
        <td>The server encountered an error while updating the external claim for identifier, {{'{{identifier}}'}} in dialect identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50015</a></td>
        <td>500</td>
        <td>Unable to update local claim</td>
        <td>The server encountered an error while updating the local claim for identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50016</a></td>
        <td>404</td>
        <td>Resource not found</td>
        <td>Unable to find a resource matching the provided claim dialect identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50017</a></td>
        <td>404</td>
        <td>Resource not found</td>
        <td>Unable to find any claims matching the provided claim dialect identifier, {{'{{identifier}}'}}</td>
      </tr>
      <tr>
        <td>CMT-50018</a></td>
        <td>404</td>
        <td>Resource not found</td>
        <td>Unable to find a resource matching the provided external claim identifier, {{'{{identifier}}'}} in dialect identifier, {{'{{identifier}}'}}.</td>
      </tr>
      <tr>
        <td>CMT-50019</a></td>
        <td>404</td>
        <td>Resource not found</td>
        <td>Unable to find a resource matching the provided local claim identifier, {{'{{identifier}}'}}</td>
      </tr>
      <tr>
        <td>CMT-50020</a></td>
        <td>409</td>
        <td>Unable to update external claim</td>
        <td>The existing external claim uri, {{'{{external claim}}'}} in dialect identifier, {{'{{identifier}}'}} cannot be changed.</td>
      </tr>
      <tr>
        <td>CMT-50021</a></td>
        <td>409</td>
        <td>Unable to update local claim</td>
        <td>The existing local claim uri, {{'{{local claim}}'}} cannot be changed.</td>
      </tr>
      <tr>
        <td>CMT-50022</a></td>
        <td>501</td>
        <td>Pagination not supported</td>
        <td>Pagination capabilities are not supported in this version of the API.</td>
      </tr>
      <tr>
        <td>CMT-50023</a></td>
        <td>501</td>
        <td>Filtering not supported</td>
        <td>Filtering capability is not supported in this version of the API.</td>
      </tr>
      <tr>
        <td>CMT-50024</a></td>
        <td>501</td>
        <td>Sorting not supported</td>
        <td>Sorting capability is not supported in this version of the API.</td>
      </tr>
      <tr>
        <td>CMT-50025</a></td>
        <td>501</td>
        <td>Attribute filtering not supported</td>
        <td>Attribute filtering capability is not supported in this version of the API.</td>
      </tr>
      <tr>
        <td>CMT-50026</a></td>
        <td>400</td>
        <td>Invalid attribute mapping</td>
        <td>Invalid userstore, {{'{{userstore}}'}} provided in attribute mapping</td>
      </tr>
      <tr>
        <td>CMT-50027</a></td>
        <td>400</td>
        <td>Invalid dialect identifier</td>
        <td>The used dialect identifier, {{'{{identifier}}'}} does not exist.</td>
      </tr>
      <tr>
        <td>CMT-50028</a></td>
        <td>400</td>
        <td>Empty claim dialect URI</td>
        <td>The claim dialect URI cannot be empty.</td>
      </tr>
      <tr>
        <td>CMT-50029</a></td>
        <td>400</td>
        <td>Empty local claim URI</td>
        <td>The claim URI cannot be empty.</td>
        <td></td>
      </tr>
      <tr>
        <td>CMT-50030</a></td>
        <td>400</td>
        <td>Empty mapped attributes</td>
        <td>The mapped attributes cannot be empty.</td>
      </tr>
      <tr>
        <td>CMT-50031</a></td>
        <td>400</td>
        <td>Unable to remove local claim</td>
        <td>Unable to remove local claim while having associations with external claims</td>
      </tr>
      <tr>
        <td>CMT-50032</a></td>
        <td>400</td>
        <td>Empty external claim URI</td>
        <td>The external claim URI cannot be empty.</td>
      </tr>
      <tr>
        <td>CMT-50033</a></td>
        <td>400</td>
        <td>Invalid external claim dialect</td>
        <td>The provided claim dialect is the local claim dialect and cannot be used as an external dialect.</td>
      </tr>
      <tr>
        <td>CMT-50034</a></td>
        <td>400</td>
        <td>Empty external claim dialect URI</td>
        <td>The external dialect URI cannot be empty.</td>
      </tr>
      <tr>
        <td>CMT-50035</a></td>
        <td>400</td>
        <td>Empty mapped local claim URI</td>
        <td>The mapped local claim URI cannot be empty.</td>
      </tr>
      <tr>
        <td>CMT-50036</a></td>
        <td>400</td>
        <td>Invalid mapped local claim URI</td>
        <td>The mapped local claim URI is invalid.</td>
      </tr>
      <tr>
        <td>CMT-50037</a></td>
        <td>400</td>
        <td>Invalid input</td>
        <td>One of the given inputs is invalid.</td>
      </tr>
  </tbody>
</table>
</div>

## Email template management errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
    <tr>  
      <td>ETM-55002</td>
      <td>500</td>
      <td>Unable to retrieve email template types.</td>
      <td>The server encountered an error while retrieving email template types.</td>
    </tr>
    <tr>
      <td>ETM-55003</td>
      <td>500</td>
      <td>Unable to retrieve the email template type</td>
      <td>The server encountered an error while retrieving the email template type identified by the given template-type-id.</td>
    </tr>
    <tr>
      <td>ETM-55004</td>
      <td>500</td>
      <td>Unable to retrieve the email template</td>
      <td>The server encountered an error while retrieving the email template identified by the given template-type-id and the template-id</td>
    </tr>
    <tr>
      <td>ETM-55005</td>
      <td>500</td>
      <td>Unable to add the email template type</td>
      <td>The server encountered an error while adding the email template type.</td>
    </tr>
    <tr>
      <td>ETM-55006</td>
      <td>500</td>
      <td>Unable to add the email template</td>
      <td>The server encountered an error while adding the email template to the system.</td>
    </tr>
    <tr>
      <td>ETM-55007</td>
      <td>500</td>
      <td>Unable to delete the email template type</td>
      <td>The server encountered an error while deleting the email template type.</td>
    </tr>
    <tr>
      <td>ETM-55008</td>
      <td>500</td>
      <td>Unable to delete the email template</td>
      <td>The server encountered an error while deleting the email template.</td>
    </tr>
    <tr>
      <td>ETM-55009</td>
      <td>500</td>
      <td>Unable to update the email template type</td>
      <td>The server encountered an error while updating the email template type.</td>
    </tr>
    <tr>
      <td>ETM-55010</td>
      <td>500</td>
      <td>Unable to update the email template</td>
      <td>The server encountered an error while updating the email template.</td>
    </tr>
    <tr>
      <td>ETM-55011</td>
      <td>501</td>
      <td>Pagination is not yet supported.</td>
      <td>Please remove the 'limit' and 'offset' parameters from the request and try again.</td>
    </tr>
    <tr>
      <td>ETM-55012</td>
      <td>501</td>
      <td>Sorting is not yet supported.</td>
      <td>Please remove the 'sortOrder' and 'sortBy' parameters from the request and try again.</td>
    </tr>
    <tr>
      <td>ETM-50001</td>
      <td>400</td>
      <td>Provided email template-type-id is invalid</td>
      <td>The server encountered an error while processing the given template-type-id.</td>
    </tr>
    <tr>
      <td>ETM-50002</td>
      <td>404</td>
      <td>Email Template Type does not exist</td>
      <td>The specified email template type does not exist in the system.</td>
    </tr>
    <tr>
      <td>ETM-50003</td>
      <td>404</td>
      <td>Email Template does not exist</td>
      <td>The specified email template does not exist in the system.</td>
    </tr>
    <tr>
      <td>ETM-50004</td>
      <td>409</td>
      <td>Email Template already exists in the system.</td>
      <td>An email template for the provided template ID already exists in the system.</td>
    </tr>
    <tr>
      <td>ETM-50005</td>
      <td>409</td>
      <td>Email Template Type already exists in the system</td>
      <td>An email template type for the provided template display name already exists in the system.</td>
    </tr>
  </tbody>
</table>
</div>

## Human task approval errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
      <tr>
        <td>HTA-10001</a></td>
        <td>403</td>
        <td>Access denied</td>
        <td>You are not authorized to perform this task.</td>
      </tr>
      <tr>
        <td>HTA-10002</a></td>
        <td>400</td>
        <td>Invalid input provided</td>
        <td>The provided Task ID is not in the correct format.</td>
      </tr>
      <tr>
        <td>HTA-10003</a></td>
        <td>404</td>
        <td>Task does not exist.</td>
        <td>The selected task does not exist.</td>
        <td> </td>
      </tr>
      <tr>
        <td>HTA-10004</a></td>
        <td>400</td>
        <td>Invalid input data provided</td>
        <td>Invalid input data provided</td>
        <td> </td>
      </tr>
      <tr>
        <td>HTA-10005</a></td>
        <td>400</td>
        <td>Unacceptable input provided</td>
        <td>Only [CLAIM, RELEASE, APPROVED, REJECTED] are acceptable.</td>
      </tr>
      <tr>
        <td>HTA-10006</a></td>
        <td>400</td>
        <td>Unable to change the approval status</td>
        <td>Invalid state change is requested for the given task.</td>
      </tr>
      <tr>
        <td>HTA-10007</a></td>
        <td>400</td>
        <td>Unable to update the approval status</td>
        <td>Invalid state change is requested for the given task.</td>
      </tr>
      <tr>
        <td>HTA-15002</a></td>
        <td>500</td>
        <td>Unable to retrieve approvals for the user</td>
        <td>The server encountered an error while retrieving approvals for user.</td>
      </tr>
      <tr>
        <td>HTA-15003</a></td>
        <td>500</td>
        <td>Unable to retrieve the user approval</td>
        <td>The server encountered an error while retrieving information on the approval task.</td>
      </tr>
      <tr>
        <td>HTA-15004</a></td>
        <td>500</td>
        <td>Unable to update the approval status</td>
        <td>The server encountered an error while updating the approval task status.</td>
      </tr>
  </tbody>
</table>
</div>

## Identity governance errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
    <tr>  
      <td>IDG-50001</td>
      <td>500</td>
      <td>Unable to get the identity governance categories</td>
      <td>The server encountered an error while retrieving identity governance categories.</td>
    </tr>
    <tr>  
      <td>IDG-50002</td>
      <td>500</td>
      <td>Unable to get the identity governance category</td>
      <td>The server encountered an error while retrieving identity governance category.</td>
    </tr>
    <tr>  
      <td>IDG-50003</td>
      <td>500</td>
      <td>Unable to get the identity governance connector</td>
      <td>The server encountered an error while retrieving identity governance connector.</td>
    </tr>
    <tr>  
      <td>IDG-50004</td>
      <td>500</td>
      <td>Unable to update the identity governance connector property</td>
      <td>The server encountered an error while updating the identity governance connector property.</td>
    </tr>
    <tr>  
      <td>IDG-50005</td>
      <td>501</td>
      <td>Pagination not supported</td>
      <td>Pagination capabilities are not supported in this version of the API.</td>
    </tr>
    <tr>  
      <td>IDG-50006</td>
      <td>501</td>
      <td>Filtering not supported</td>
      <td>Filtering capability is not supported in this version of the API.</td>
    </tr>
    <tr>  
      <td>IDG-50007</td>
      <td>501</td>
      <td>Sorting not supported</td>
      <td>Sorting capability is not supported in this version of the API.</td>
    </tr>
    <tr>  
      <td>IDG-50008</td>
      <td>400</td>
      <td>Resource not found</td>
      <td>Unable to find any category with the provided identifier, {{'{{category identifier}}'}}.</td>
    </tr>
    <tr>  
      <td>IDG-50009</td>
      <td>400</td>
      <td>Resource not found.</td>
      <td>Unable to find any connector with the provided identifier, {{'{{connector identifier}}'}}.</td>
    </tr>
  </tbody>
</table>
</div>

## Identity provider errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
      <tr>
        <td>IDP-65001</a></td>
        <td>500</td>
        <td>Unexpected Error</td>
        <td>The server encountered an unexpected error.</td>
      </tr>
      <tr>
        <td>IDP-65002</a></td>
        <td>500</td>
        <td>An error occurred while adding the Identity Provider</td>
        <td>The server encountered an error while adding the Identity Provider, {{'{{identity-provider-name}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60001</a></td>
        <td>409</td>
        <td>Identity Provider exists</td>
        <td>Identity Provider with the name, {{'{{identity-provider-name}}'}} already exists.</td>
      </tr>
      <tr>
        <td>IDP-6500</a></td>
        <td>500</td>
        <td>An error occurred while getting the Identity Provider</td>
        <td>The server encountered an error while getting the Identity Provider, {{'{{identity-provider-id}}'}}.</td>
      </tr>  
      <tr>
        <td>IDP-60002</a></td>
        <td>404</td>
        <td>Identity Provider does not exist</td>
        <td>Identity Provider with resource ID, {{'{{identity-provider-id}}'}} does not exist.</td>
      </tr>
      <tr>
        <td>IDP-65004</a></td>
        <td>500</td>
        <td>An error occurred while deleting Identity Provider</td>
        <td>The server encountered an error while deleting Identity Provider, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65005</a></td>
        <td>500</td>
        <td>An error occurred while updating Identity Provider</td>
        <td>The server encountered an error while updating Identity Provider, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60003</a></td>
        <td>400</td>
        <td>Identity Provider add request validation failed</td>
        <td>Identity Provider add request validation failed for the identitiy provider, {{'{{identity-provider-name}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60004</a></td>
        <td>400</td>
        <td>Identity Provider get request validation failed</td>
        <td>Identity Provider get request validation failed for the identity provider ID, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60005</a></td>
        <td>400</td>
        <td>Identity Provider delete request validation failed</td>
        <td>Identity Provider delete request validation failed for the identity provider ID, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60007</a></td>
        <td>400</td>
        <td>Search request validation failed.</td>
        <td>Search request validation failed since search filter, {{'{{search-filter}}'}} is invalid.</td>
      </tr>
      <tr>
        <td>IDP-60021</a></td>
        <td>500</td>
        <td>Unable to list existing identity providers</td>
        <td>The server encountered an error while listing the identity providers.</td>
      </tr>
      <tr>
        <td>IDP-65003</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider</td>
        <td>The server encountered an error while retrieving the identity provider for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65021</a></td>
        <td>500</td>
        <td>Unable to retrieve meta federated authenticator list</td>
        <td>The server encountered an error while retrieving the meta federated authenticators.</td>
      </tr>
      <tr>
        <td>IDP-65022</a></td>
        <td>500</td>
        <td>Unable to retrieve meta outbound connector list</td>
        <td>The server encountered an error while retrieving the meta outbound connector list.</td>
      </tr>
      <tr>
        <td>IDP-65023</a></td>
        <td>500</td>
        <td>Unable to retrieve meta federated authenticator</td>
        <td>The server encountered an error while retrieving the meta federated authenticator with identifier, {{'{{federated-authenticator-identifier}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65024</a></td>
        <td>500</td>
        <td>Unable to retrieve meta outbound connector</td>
        <td>The server encountered an error while retrieving the meta outbound connector with identifier, {{'{{outbound-connector-identifier}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65025</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider's federated authenticator list</td>
        <td>The server encountered an error while retrieving the federated authenticators of identity provider, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65026</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider's outbound connector list</td>
        <td>The server encountered an error while retrieving the outbound connectors of identity provider, {identity-provider-id}.</td>
      </tr>
      <tr>
        <td>IDP-65027</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider's federated authenticator</td>
        <td>The server encountered an error while retrieving the federated authenticator with identifier, {{'{{federated-authenticator-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65028</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider's outbound connector</td>
        <td>The server encountered an error while retrieving the outbound connector with identifier, {{'{{outbound-connector-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65029</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider's provisioning config</td>
        <td>The server encountered an error while retrieving the provisioning config of identity provider, {identity-provider-id}.</td>
      </tr>
      <tr>
        <td>IDP-65030</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider claim config</td>
        <td>The server encountered an error while retrieving the identity provider claim config for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65031</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider role config</td>
        <td>The server encountered an error while retrieving the identity provider role config for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65032</a></td>
        <td>500</td>
        <td>Unable to retrieve identity provider JIT config</td>
        <td>The server encountered an error while retrieving the identity provider JIT config for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65033</a></td>
        <td>500</td>
        <td>Unable to update identity provider federated authenticator</td>
        <td>The server encountered an error while updating the identity provider federated authenticator for identifier, {{'{{federated-authenticator-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65034</a></td>
        <td>500</td>
        <td>Unable to update identity provider outbound connector</td>
        <td>The server encountered an error while updating the identity provider outbound connector for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65035</a></td>
        <td>500</td>
        <td>Unable to update identity provider claims</td>
        <td>The server encountered an error while updating the identity provider claim config for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65036</a></td>
        <td>500</td>
        <td>Unable to update identity provider roles</td>
        <td>The server encountered an error while updating the identity provider role config for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65037</a></td>
        <td>500</td>
        <td>Unable to update identity provider Just-In-Time provisioning</td>
        <td>The server encountered an error while updating the identity provider Just-In-Time provisioning config for identifier, {{'{{identity-provider-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60022</a></td>
        <td>404</td>
        <td>Resource not found</td>
        <td>Unable to find federated authenticator with identifier, {{'{{federated-authenticator-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60023</a></td>
        <td>404</td>
        <td>Resource not found</td>
        <td>Unable to find outbound provisioning connector identifier, {{'{{outbound-connector-id}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-65041</a></td>
        <td>500</td>
        <td>Attribute filtering not supported</td>
        <td>Attribute filtering capability is not supported in this version of the API.</td>
      </tr>
      <tr>
        <td>IDP-60024</a></td>
        <td>400</td>
        <td>Invalid claim uri</td>
        <td>Invalid claim uri, {{'{{claim-uri}}'}} provided in claim config.</td>
      </tr>
      <tr>
        <td>IDP-60025</a></td>
        <td>400</td>
        <td>Invalid input</td>
        <td>One of the given inputs is invalid. {{'{{Optional Details, if any}}'}}.</td>
      </tr>
      <tr>
        <td>IDP-60026</a></td>
        <td>400</td>
        <td>Invalid SAML metadata</td>
        <td>SAML metadata is invalid/empty.</td>
      </tr>
      <tr>
        <td>IDP-65050</a></td>
        <td>500</td>
        <td>Unable to list existing identity provider templates</td>
        <td>An error occurred while listing identity provider templates.</td>
      </tr>
      <tr>
        <td>IDP-65051</a></td>
        <td>500</td>
        <td>Unable to add IDP template.</td>
        <td>An error occurred while trying to add the IDP template.</td>
      </tr>
      <tr>
        <td>IDP-65052</a></td>
        <td>500</td>
        <td>Unable to delete IDP template</td>
        <td>An error occurred while trying to delete the IDP template.</td>
      </tr>
      <tr>
        <td>IDP-65053</a></td>
        <td>500</td>
        <td>Unable to update IDP template</td>
        <td>An error occurred while trying to update the IDP template.</td>
      </tr>
      <tr>
        <td>IDP-65054</a></td>
        <td>500</td>
        <td>Unable to retrieve IDP template</td>
        <td>An error occurred while trying to retrieve the IDP template.</td>
      </tr>
      <tr>
        <td>TMM_00001</a></td>
        <td>500</td>
        <td>Unable to list existing identity provider templates</td>
        <td>An error occurred while listing identity provider templates.</td>
      </tr>
      <tr>
        <td>TMM_00006</a></td>
        <td>500</td>
        <td>Unable to update identity provider template</td>
        <td>An error occurred while updating identity provider template with id, {{'{{template-id}}'}}.</td>
      </tr>
      <tr>
        <td>TMM_00007</a></td>
        <td>400</td>
        <td>Unable to add/update IDP template</td>
        <td>A template name is required.</td>
      </tr>
      <tr>
        <td>TMM_00008</a></td>
        <td>400</td>
        <td>Unable to add/update IDP template</td>
        <td>A template script is required.</td>
      </tr>
      <tr>
        <td>TMM_00009</a></td>
        <td>401</td>
        <td>Unauthorized access</td>
        <td>No authenticated user is found to perform action.</td>
      </tr>
      <tr>
        <td>TMM_00011</a></td>
        <td>401</td>
        <td>Unauthorized access</td>
        <td>The user is not authorized to perform the action.</td>
      </tr>
      <tr>
        <td>TMM_00014</a></td>
        <td>409</td>
        <td>Unable to add/update IdP template</td>
        <td>A template with name, {{'{{template-name}}'}} already exists.</td>
      </tr>
      <tr>
        <td>TMM_00017</a></td>
        <td>500</td>
        <td>Unable to list existing identity provider templates</td>
        <td>An error occurred while listing identity provider templates.</td>
      </tr>
      <tr>
        <td>TMM_00018</a></td>
        <td>500</td>
        <td>Unable to delete IDP template</td>
        <td>An error occurred while trying to delete the IDP template.</td>
      </tr>
      <tr>
        <td>TMM_00019</a></td>
        <td>500</td>
        <td>Unable to retrieve IDP template</td>
        <td>An error occurred while trying to retrieve the IDP template.</td>
      </tr>
      <tr>
        <td>TMM_00021</a></td>
        <td>404</td>
        <td>Template not found</td>
        <td>Template with given id, {{'{{template-id}}'}} is not found.</td>
      </tr>
      <tr>
        <td>TMM_00022</a></td>
        <td>400</td>
        <td>Invalid template Id.</td>
        <td>The provided template ID, {{'{{template-id}}'}} is not valid.</td>
      </tr>
  </tbody>
</table>
</div>

## Keystore management errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
    <tr>  
      <td>KSS-60001</td>
      <td>400</td>
      <td>Provided certificate already exists with the alias: {{'{{alias}}'}}.</td>
      <td>An error while importing the certificate with alias, {{'{{alias}}'}} to the keystore.</td>
    </tr>
    <tr>  
      <td>KSS-60002</td>
      <td>400</td>
      <td>Provided alias {{'{{alias}}'}} is already available in the keystore.</td>
      <td>An error while importing the certificate with alias, {{'{{alias}}'}} to the keystore.</td>
    </tr>
    <tr>  
      <td>KSS-60003</td>
      <td>400</td>
      <td>Unsupported filter: {{'{{filter}}'}}.</td>
      <td>An error while retrieving the list of certificates from keystore.</td>
    </tr>
    <tr>  
      <td>KSS-60004</td>
      <td>400</td>
      <td>Unsupported filter operation {{'{{filter operation}}'}}.</td>
      <td>An error while retrieving the list of certificates from keystore.</td>
    </tr>
    <tr>  
      <td>KSS-60010</td>
      <td>400</td>
      <td>There exists no certificate with alias: {{'{{alias}}'}}.</td>
      <td>Couldn't find a certificate with alias, {{'{{alias}}'}} from the keystore.</td>
    </tr>
    <tr>  
      <td>KSS-65001</td>
      <td>500</td>
      <td>Unable to retrieve the keystore for tenant: {{'{{tenant domain}}'}}.</td>
      <td>The server encountered an error while retrieving the keystore.</td>
    </tr>
    <tr>  
      <td>KSS-65002</td>
      <td>500</td>
      <td>Unable to retrieve keystore information for keystore: {{'{{keystore name}}'}}.</td>
      <td>The server encountered an error whie retrieving the keystore information.</td>
    </tr>
    <tr>  
      <td>KSS-65003</td>
      <td>500</td>
      <td>Unable to retrieve client truststore for tenant: {{'{{tenent domain}}'}}.</td>
      <td>The server encountered an error while retrieving the client truststore.</td>
    </tr>
    <tr>  
      <td>KSS-65004</td>
      <td>500</td>
      <td>Unable to retrieve the client truststore aliases for tenant: {{'{{tenant domain}}'}}.</td>
      <td>The server encountered an error while retrieving the aliases from client truststore.</td>
    </tr>
    <tr>  
      <td>KSS-65005</td>
      <td>500</td>
      <td>Unable to retrive the client truststore certificate for alias: {{'{{alias}}'}}.</td>
      <td>The server encountered an error while retriving the certificate from client truststore.</td>
    </tr>
    <tr>  
      <td>KSS-65006</td>
      <td>500</td>
      <td>Unable to add certificate with alias: {{'{{alias}}'}}.</td>
      <td>The server encountered an error while adding a certificate.</td>
    </tr>
    <tr>  
      <td>KSS-65007</td>
      <td>500</td>
      <td>Unable to delete certificate with alias: {{'{{alias}}'}}.</td>
      <td>The server encountered an errorwhile removing a certificate.</td>
    </tr>  
    <tr>  
      <td>KSS-65008</td>
      <td>500</td>
      <td>An error occurred while validating the certificate</td>
      <td>The server encountered an error while adding a certificate.</td>
    </tr>
    <tr>  
      <td>KSS-65010</td>
      <td>500</td>
      <td>Unable to create file: {{'{{filename}}'}}.</td>
      <td>The server encountered an error while creating a file to return the certificate.</td>
    </tr>
    <tr>  
      <td>KSS-65011</td>
      <td>500</td>
      <td>Unable to encode the certificate with alias: {{'{{alias}}'}}.</td>
      <td>The server encountered an error while encoding the certificate.</td>
    </tr>
  </tbody>
</table>
</div>

## OAuth authorized apps errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
      <tr>
        <td>OAA-10001</a></td>
        <td>404</td>
        <td>Invalid application ID</td>
        <td>An application with the provided ID cannot be found for the user.</td>
      </tr>
      <tr>
        <td>OAA-10002</a></td>
        <td>500</td>
        <td>Error retrieving authorized application</td>
        <td>A system error occurred while retrieving the provided authorized application for the user.</td>
      </tr>
      <tr>
        <td>OAA-10003</a></td>
        <td>500</td>
        <td>Error retrieving authorized applications</td>
        <td>A system error occurred while retrieving authorized applications for the provided user.</td>
      </tr>
      <tr>
        <td>OAA-10004</a></td>
        <td>500</td>
        <td>Error revoking authorized application</td>
        <td>A system error occurred while revoking the provided authorized application for the user.</td>
      </tr>
      <tr>
        <td>OAA-10005</a></td>
        <td>500</td>
        <td>Error revoking authorized application</td>
        <td>A system error occurred while revoking authorized applications for the provided user.</td>
      </tr>
  </tbody>
</table>
</div>

## Secondary userstore errors

  <div class="errorcode">
  <table>
    <thead>
      <th>Error Code</th>
      <th>HTTP Status Code</th>
      <th>Error Message</th>
      <th>Possible Cause</th>
    </thead>
    <tbody>
        <tr>
          <td>SUS-50001</a></td>
          <td>500</td>
          <td>Unable to add the secondary userstore</td>
          <td>The server encountered an error while adding the secondary userstore.</td>
        </tr>
        <tr>
          <td>SUS-50002</a></td>
          <td>500</td>
          <td>Unable to delete the secondary user store</td>
          <td>The server encountered an error while deleting the secondary user store.</td>
        </tr>
        <tr>
          <td>SUS-50003</a></td>
          <td>500</td>
          <td>Unable to get the configured user stores</td>
          <td>The server encountered an error while retrieving secondary user stores.</td>
        </tr>
        <tr>
          <td>SUS-50004</a></td>
          <td>500</td>
          <td>Unable to update the secondary user store configurations</td>
          <td>The server encountered an error while updating the secondary user store configurations.</td>
        </tr>
        <tr>
          <td>SUS-50005</a></td>
          <td>501</td>
          <td>Pagination not supported</td>
          <td>Pagination capabilities are not supported in this version of the API.</td>
        </tr>
        <tr>
          <td>SUS-50006</a></td>
          <td>501</td>
          <td>Filtering not supported</td>
          <td>Filtering capability is not supported in this version of the API.</td>
        </tr>
        <tr>
          <td>SUS-50007</a></td>
          <td>501</td>
          <td>Sorting not supported</td>
          <td>Sorting capability is not supported in this version of the API.</td>
        </tr>
        <tr>
          <td>SUS-50008</a></td>
          <td>404</td>
          <td>Resource not found</td>
          <td>Unable to find any userstore's id with the provided identifier, %s.</td>
        </tr>
        <tr>
          <td>SUS-50009</a></td>
          <td>500</td>
          <td>Unable to check RDBMS connection health</td>
          <td>The server encountered an error while checking the data source connection.</td>
        </tr>
        <tr>
          <td>SUS-50010</a></td>
          <td>500</td>
          <td>Unable to retrieve the user store implementations</td>
          <td>The server encountered an error while retrieving the userstore types.</td>
        </tr>
        <tr>
          <td>SUS-50011</a></td>
          <td>400</td>
          <td>Invalid Input</td>
          <td>The provided input is not valid.</td>
        </tr>
        <tr>
          <td>SUS-50012</td>
          <td>404</td>
          <td>Resource not found</td>
          <td>Unable to find a required resource for this request.</td>
        </tr>
        <tr>
          <td>SUS-50013</td>
          <td>500</td>
          <td>Unable to get the userstore by its domain id.</td>
          <td>The server encountered an error while retrieving the userstore by its domain id.</td>
         </tr>
    </tbody>
</table>
</div>

## Session management errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
      <tr>
        <td>USM-15001</a></td>
        <td>500</td>
        <td>Unable to retrieve session information</td>
        <td>The server encountered an error while retrieving session information.</td>
      </tr>
      <tr>
        <td>USM-15002</a></td>
        <td>500</td>
        <td>Unable to retrieve sessions</td>
        <td>The server encountered an error while retrieving session list of user, {userid/username}.</td>
      </tr>
      <tr>
        <td>USM-10003</a></td>
        <td>501</td>
        <td>Pagination not supported</td>
        <td>Pagination capabilities are not supported in this version of the API.</td>
      </tr>
      <tr>
        <td>USM-10004</a></td>
        <td>501</td>
        <td>Filtering not supported</td>
        <td>Filtering capability is not supported in this version of the API.</td>
      </tr>  
      <tr>
        <td>USM-10005</a></td>
        <td>501</td>
        <td>Sorting not supported</td>
        <td>Sorting capability is not supported in this version of the API.</td>
      </tr>
      <tr>
        <td>USM-15006</a></td>
        <td>500</td>
        <td>Unable to validate user</td>
        <td>The server encountered an error while authorizing user, {userid/username}.</td>
      </tr>
      <tr>
        <td>USM-10007</a></td>
        <td>403</td>
        <td>Action forbidden</td>
        <td>User is not authorized to terminate this session.</td>
      </tr>
      <tr>
        <td>USM-10008</a></td>
        <td>400</td>
        <td>Invalid user</td>
        <td>User is not provided to perform session management tasks.</td>
      </tr>
      <tr>
        <td>USM-10009</a></td>
        <td>400</td>
        <td>Invalid session</td>
        <td>Session ID is not provided to perform session tasks.</td>
      </tr>  
      <tr>
        <td>USM-10010</td>
        <td>403</td>
        <td>Action Forbidden</td>
        <td>User is not authorized to terminate the session/s.</td>
      </tr>
      <tr>
        <td>USM-10011</td>
        <td>400</td>
        <td>Invalid data.</td>
        <td>Data validation has failed, {details}</td>
      </tr>
  </tbody>
</table>
</div>

## Script libraries errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
      <tr>
        <td>SCL-65001</a></td>
        <td>500</td>
        <td>Unexpected Error</td>
        <td>The server encountered an unexpected error.</td>
      </tr>
      <tr>
        <td>SCL-65002</a></td>
        <td>500</td>
        <td>Unable to add Script library</td>
        <td>An error occurred while creating the script library, {{'{{script-library-name}}'}}.</td>
      </tr>
      <tr>
         <td>SCL-65003</a></td>
         <td>500</td>
         <td>Unable to add Script library</td>
         <td>An error occurred while processing content stream of script library script, {{'{{script-library-name}}'}}.</td>
       </tr>
      <tr>
        <td>SCL-65005</a></td>
        <td>500</td>
        <td>Unable to update Script library</td>
        <td>An error occurred while getting the script library, {{'{{script-library-name}}'}}.</td>
      </tr>
      <tr>
        <td>SCL-65006</a></td>
        <td>500</td>
        <td>Unable to list existing script libraries</td>
        <td>An error occurred while reading script libraries.</td>
      </tr>  
      <tr>
        <td>SCL-65007</a></td>
        <td>500</td>
        <td>Unable to update script library</td>
        <td>Failed to update Script library, {{'{{script-library-name}}'}}</td>
      </tr>
      <tr>
        <td>SCL-65008</a></td>
        <td>500</td>
        <td>Unable to delete script library</td>
        <td>An error occurred while deleting script library, {{'{{script-library-name}}'}}.</td>
      </tr>
      <tr>
        <td>SCL-60002</a></td>
        <td>400</td>
        <td>Unable to add Script library</td>
        <td>The script library script of {{'{{script-library-name}}'}} contains errors.</td>
      </tr>
      <tr>
        <td>SCL-60006</a></td>
        <td>400</td>
        <td>Script library not found</td>
        <td>The script library cannot be found for the provided name, {{'{{script-library-name}}'}} in the tenantDomain, {tenat
        -domain}.</td>
      </tr>
      <tr>
        <td>SCL-60007</a></td>
        <td>409</td>
        <td>Script library already exist</td>
        <td>The script library already exist for the provided name, {{'{{script-library-name}}'}} in the tenantDomain, {tenant
        -domain}. </td>
      </tr>  
      <tr>
        <td>SCL-60008</a></td>
        <td>400</td>
        <td>Invalid script library name</td>
        <td>The script library name should include the .js extension.</td>
      </tr>
      <tr>
        <td>SCL-60009</a></td>
        <td>400</td>
        <td>Invalid offset</td>
        <td>Offset should be greater than or equal to 0.</td>
      </tr>
  </tbody>
</table>
</div>

## Tenant management errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
  <tr>
    <td>TM-60000</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>The provided email is empty.</td>
  </tr>
  <tr>
    <td>TM-60001</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>The email contains wrong characters.</td>
  </tr>
  <tr>
    <td>TM-60002</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>An invalid email address is provided.</td>
  </tr>
  <tr>
    <td>TM-60003</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>You cannot use a registry reserved word as a tenant domain. Please choose a different one.</td>
  </tr>
  <tr>
    <td>TM-60004</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>The provided domain name is empty.</td>
  </tr>
  <tr>
    <td>TM-60005</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>You should have an extension to your domain.</td>
  </tr>
  <tr>
    <td>TM-60006</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>Invalid domain. Domain should not start with '.'.</td>
  </tr>
  <tr>
    <td>TM-60007</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>The tenant domain, {{'{{tenant-domain}}'}} contains one or more illegal characters. The valid characters are lowercase letters, numbers, '.', '-' and '_'.</td>
  </tr>
  <tr>
    <td>TM-60008</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>Username, {{'{{username}}'}} exists in the system. Please pick another username for tenant administrator.</td>
  </tr>
  <tr>
    <td>TM-60009</td>
    <td>400</td>
    <td>Unable to add tenant</td>
    <td>A tenant with same domain {{'{{tenant-domain}}'}} already exists. Please use a different domain name.</td>
  </tr>
  <tr>
    <td>TM-60010</td>
    <td>400</td>
    <td>Invalid Request</td>
    <td>Limit should not be negative.</td>
  </tr>
  <tr>
    <td>TM-60011</td>
    <td>400</td>
    <td>Invalid Request</td>
    <td>Offset should not be negative.</td>
  </tr>
  <tr>
    <td>TM-60012</td>
    <td>400</td>
    <td>Invalid Request</td>
    <td>Required parameter owner is not specified.</td>
  </tr>
  <tr>
    <td>TM-60013</td>
    <td>400</td>
    <td>Invalid Request</td>
    <td>Required parameter, {{'{{required-parameter}}'}} is not specified.</td>
  </tr>
  <tr>
    <td>TM-60014</td>
    <td>400</td>
    <td>Unable to retrieve tenant</td>
    <td>Tenant cannot be found for the provided id, {{'{{tenant-unique-id}}'}}.</td>
  </tr>
  <tr>
    <td>TM-60015</td>
    <td>400</td>
    <td>Unable to retrieve tenant</td>
    <td>Tenant cannot be found for the provided domain, {{'{{tenant-domain}}'}}.</td>
  </tr>
  <tr>
    <td>TM-60016</td>
    <td>400</td>
    <td>An error occurred while deleting the tenant metadata.</td>
    <td>Tenant deletion property, {Tenant.TenantDelete} is not enabled in carbon.xml file.</td>
  </tr>
  <tr>
    <td>TM-65001</td>
    <td>500</td>
    <td>Unable to list existing tenants</td>
    <td>The server encountered an error while listing the tenants.</td>
  </tr>
  <tr>
    <td>TM-65002</td>
    <td>500</td>
    <td>Unable to add tenant</td>
    <td>The server encountered an error while adding the tenant.</td>
  </tr>
  <tr>
    <td>TM-65003</td>
    <td>500</td>
    <td>Unable to retrieve tenant</td>
    <td>The server encountered an error while retrieving the tenant for identifier, {{'{{tenant-unique-id}}'}}.</td>
  </tr>
  <tr>
    <td>TM-65004</td>
    <td>500</td>
    <td>An error occurred while updating the tenant.</td>
    <td>The server encountered an error while the tenant life cycle status activated: {{'{{status-of-lifecycle}}'}}.</td>
  </tr>
  <tr>
    <td>TM-65005</td>
    <td>500</td>
    <td>Error building page links</td>
    <td>An error occurred during building page links.</td>
  </tr>
  <tr>
    <td>TM-65006</td>
    <td>501</td>
    <td>Filtering not supported</td>
    <td>Filtering capability is not supported in this version of the API.</td>
  </tr>
  <tr>
    <td>TM-65007</td>
    <td>500</td>
    <td>Unable to add tenant</td>
    <td>An error occurred in validating the code.</td>
  </tr>
  <tr>
    <td>TM-65008</td>
    <td>500</td>
    <td>Unable to check availability of domain</td>
    <td>The server encountered an error while checking for tenant domain.</td>
  </tr>
  <tr>
    <td>TM-65009</td>
    <td>500</td>
    <td>An error occurred while deleting the tenant metadata.</td>
    <td>The server encountered an error while deleting the tenant metadata identified by {{'{{tenant-unique-id}}'}}.</td>
  </tr>
  </tbody>
</table>
</div>

## User associations errors

<div class="errorcode">
<table>
  <thead>
    <th>Error Code</th>
    <th>HTTP Status Code</th>
    <th>Error Message</th>
    <th>Possible Cause</th>
  </thead>
  <tbody>
      <tr>
        <td>UAA-8500</a></td>
        <td>400</td>
        <td>An error occurred while adding associations of user</td>
        <td>A valid username and password must be provided.</td>
      </tr>
      <tr>
        <td>UAA-8501</a></td>
        <td>500</td>
        <td>An error occurred while adding associations of user</td>
        <td>An error occurred while associating the user account.</td>
      </tr>
      <tr>
        <td>UAA-8503</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>A database error occurred while deleting user account association.</td>
      </tr>
      <tr>
        <td>UAA-8504</a></td>
        <td>500</td>
        <td>An error occurred while adding associations of user</td>
        <td>A database error occurred while creating user account association.</td>
      </tr>
      <tr>
        <td>UAA-8505</a></td>
        <td>500</td>
        <td>An error occurred while adding associations of user</td>
        <td>A database error occurred while updating user account association.</td>
      </tr>
      <tr>
        <td>UAA-8506</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>A database error occurred while validating user association.</td>
      </tr>
      <tr>
        <td>UAA-8507</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>A database error occurred while deleting user account associations.</td>
      </tr>
      <tr>
        <td>UAA-8508</a></td>
        <td>500</td>
        <td>An error occurred while getting/creating/deleting associations of user</td>
        <td>An error occurred while getting the RealmService.</td>
      </tr>
      <tr>
        <td>UAA-8509</a></td>
        <td>500</td>
        <td>An error occurred while getting/creating/deleting associations of user</td>
        <td>An error occurred while accessing the RealmService.</td>
      </tr>
      <tr>
        <td>UAA-8510</a></td>
        <td>500</td>
        <td>An error occurred while getting/creating/deleting associations of user</td>
        <td> An error occurred while getting the RealmService.</td>
      </tr>
      <tr>
        <td>UAA-8511</a></td>
        <td>500</td>
        <td>An error occurred while getting associations of user</td>
        <td>An error occurred while getting tenant name from tenant id.</td>
      </tr>
      <tr>
        <td>UAA-8512</a></td>
        <td>500</td>
        <td>An error occurred while getting/creating/deleting associations of user</td>
        <td>An error occurred while getting tenant id from tenant name.</td>
      </tr>
      <tr>
        <td>UAA-8513</a></td>
        <td>500</td>
        <td>An error occurred while creating associations of user</td>
        <td>An error occurred while authenticating user.</td>
      </tr>
      <tr>
        <td>UAA-8514</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>An error occurred while deleting user account association for user, {{'{{user}}'}}.</td>
      </tr>
      <tr>
        <td>UAA-8517</a></td>
        <td>500</td>
        <td>An error occurred while creating associations of user</td>
        <td>An error occurred while executing pre/post user authenticators.</td>
      </tr>
      <tr>
        <td>UAA-8524</a></td>
        <td>400</td>
        <td>An error occurred while getting/creating/deleting associations of user</td>
        <td>The tenant domain is invalid or inactivated.</td>
      </tr>
      <tr>
        <td>UAA-8525</a></td>
        <td>409</td>
        <td>An error occurred while adding associations of user</td>
        <td>The provided user account is already associated to the logged in user.</td>
      </tr>
      <tr>
        <td>UAA-8526</a></td>
        <td>400</td>
        <td>An error occurred while adding associations of user</td>
        <td>The username or password you entered is incorrect.</td>
      </tr>
      <tr>
        <td>UAA-8527</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>An error occurred while deleting the user account association.</td>
      </tr>
      <tr>
        <td>UAA-8528</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>An error occurred while deleting the user account associations for tenant id, {{'{{tenant Id}}'}}.</td>
      </tr>
      <tr>
        <td>UAA-8533</a></td>
        <td>400</td>
        <td>An error occurred while adding associations of user</td>
        <td>A user cannot associate the logged in user account to itself.</td>
      </tr>
      <tr>
        <td>UAA-8535</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>A database error occurred while deleting user association from the {{'{{user store domain}}'}} domain in the tenant,
         {{'{{tenant}}'}}.</td>
      </tr>
      <tr>
        <td>UAA-8536</a></td>
        <td>500</td>
        <td>An error occurred while adding associations of user</td>
        <td>An error occurred while updating a user domain of account associations with domain, {{'{{user store domain}}'}}.</td>
      </tr>
      <tr>
        <td>UAA-8537</a></td>
        <td>500</td>
        <td>An error occurred while deleting user association</td>
        <td>An error occurred while deleting user account associations with domain, {{'{{user store domain}}'}}.</td>
      </tr>
      <tr>
        <td>UAA-8538</a></td>
        <td>500</td>
        <td>An error occurred while getting associations of user</td>
        <td>A database error occurred while retrieving account associations of user, {{'{{user}}'}}.</td>
      </tr>
      <tr>
        <td>UAA-8539</a></td>
        <td>500</td>
        <td>An error occurred while getting/creating/deleting associations of user</td>
        <td>An error occurred while retrieving the tenant ID of user, {{'{{user}}'}}.</td>
      </tr>
  </tbody>
</table>
</div>
