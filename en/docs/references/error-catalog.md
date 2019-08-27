# Error Catalog
This document describes all the REST API error codes that are used in WSO2 Identity Server. 

## Common Errors

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
    <td>Server encountered an error while serving the request.This is the default response for all the unhandled server errors, (ex:NullPointer). It is handled globally at API dispatcher.</td>
  </tr>
  </tbody>
</table>
</div>

## Challenge Question Management

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
    <td>Server encountered an error while retrieving challenges for the user.</td>
  </tr>
  <tr>
    <td>CQM-10003</td>
    <td>500</td>
    <td>Unable to retrieve all user challenge answers</td>
    <td>Server encountered an error while retrieving challenge answers of the user.</td>
  </tr>
  <tr>
    <td>CQM-10004</td>
    <td>500</td>
    <td>Unable to retrieve the user challenge answer of a specific challenge</td>
    <td>Server encountered an error while retrieving the challenge answer of a specific challenge.</td>
  </tr>
  <tr>
    <td>CQM-10005</td>
    <td>500</td>
    <td>Unable to set user challenge answers.</td>
    <td>Server encountered an error while setting answers to the user challenges.</td>
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
    <td>Server encountered an error while updating the answers to the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-10007</td>
    <td>500</td>
    <td>Unable to remove user challenge answers.</td>
    <td>Server encountered an error while removing answers of the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-10008</td>
    <td>500</td>
    <td>Unable to update user challenge answer.</td>
    <td>Server encountered an error while updating the answer of a specific user challenge.</td>
  </tr>
  <tr>
    <td>CQM-10009</td>
    <td>500</td>
    <td>Unable to update user challenge answer.</td>
    <td>Server encountered an error while updating the answer of the user challenge.</td>
  </tr>
  <tr>
    <td>CQM-10010</td>
    <td>500</td>
    <td>Unable to remove user challenge answer.</td>
    <td>Server encountered an error while removing answer of the user challenge.</td>
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
    <td>Invalid Locale value provided : <locale>.</td>
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
    <td>Server encountered an error while retrieving a specific challenge.</td>
  </tr>
  <tr>
    <td>CQM-50003</td>
    <td>500</td>
    <td>Unable to get the challenges</td>
    <td>Server encountered an error while retrieving all challenges.</td>
  </tr>
  <tr>
    <td>CQM-50004</td>
    <td>500</td>
    <td>Unable to add challenge set</td>
    <td>Server encountered an error while setting answers to the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-50005</td>
    <td>500</td>
    <td>Unable to update challenge set</td>
    <td>Server encountered an error while updating answers to the user challenges.</td>
  </tr>
  <tr>
    <td>CQM-50006</td>
    <td>500</td>
    <td>Unable to add a new challenge question</td>
    <td>Server encountered an error while adding a new question to the set.</td>
  </tr>
  <tr>
    <td>CQM-50007</td>
    <td>500</td>
    <td>Unable to remove challenges</td>
    <td>Server encountered an error while removing the challenge set.</td>
  </tr>
  <tr>
    <td>CQM-50008</td>
    <td>500</td>
    <td>Unable to remove challenge question</td>
    <td>Server encountered an error while removing a specific challenge question.</td>
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
    <td>Attributes of hallenge question to be set cannot be empty.</td>
  </tr>
  </tbody>
</table>
</div>
