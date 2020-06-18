# Delete an existing user 

## Delete a user using the admin portal 

{!fragments/insert-link!}

---

## Delete a user using SCIM 

```curl tab="Request"
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X DELETE https://{IS_IP}:{IS_PORT}/wso2/scim/Users/{SCIM_USER_ID} -H "Accept: application/json"
```

```curl tab="Sample Request"
curl -v -k --user admin:admin -X DELETE https://localhost:9443/wso2/scim/Users/b228b59d-db19-4064-b637-d33c31209fae -H "Accept: application/json"
```

You receive a response with status `200 OK` and the user will be deleted from the user store.

---

## Delete a user using SOAP 

You can also delete a user by calling the `RemoteUserStoreManager` service . If you are new to admin services, see [Calling Admin Services](insert-link).

The following SOAP method will give you the user ID of the relevant username. 

**Request Sample**

```
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:deleteUser>
         <!--Optional:-->
         <ser:userName>user123</ser:userName>
      </ser:deleteUser>
   </soap:Body>
</soap:Envelope>
```

---

## Track user deletion on deleting a user (optional)
TODO : This part should be moved to **monitoring logs** in the **deploy** section and link from here.

WSO2 Identity Server (WSO2 IS) allows you to track details related to
user deletion by writing the following information to a log file each
time a user is deleted:

-   The user name of the deleted user.
-   The user store domain name of the deleted user.

-   The tenant domain name of the deleted user.
-   The tenant ID of the deleted user.
-   The timestamp that the user was deleted.

You can use this log file as an input to the Identity Anonymization tool
that is packaged with WSO2 Identity Server, to ensure that you [remove references to all deleted user identities](insert-link).

Follow the steps below to configure WSO2 Identity Server to log details
related to user deletion each time you delete a user.

1.  Add the following property to the 
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file, and set it to
    `           true          `.

    ``` toml
    [event.default_listener.user_deletion]
    priority= "98"
    enable = true 
    ```

2.  Add the following property to the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file, and set `           enable          ` to
    `           true          `.

    ``` toml
    [event.default_recorder.user_delete_event]
    name= "org.wso2.carbon.user.mgt.recorder.DefaultUserDeletionEventRecorder"
    enable = true
    ```

    This writes details related to user deletion in the `.csv` format to
    the
    `           <IS_HOME>/repository/logs/delete-event.log          `
    file.

    !!! note
         If necessary, you can write user delete event details to a custom `.csv`
         file that you specify. To do this, add the following property in
          the `<IS_HOME>/repository/conf/deployment.toml         `
         file, and make sure to specify the custom `.csv `file path.

         ``` java
         [event.default_recorder.user_delete_event]
         write_to_separate_csv.path = "${carbon.home}/repository/logs/delete-records.csv"
         ```

!!! tip
    By default, all logs related to user deletion are written in `.csv` format
    to a specified log file. You can extend this functionality to log the
    details in any other format that you want, and you can also extend the
    functionality to write the details to a text file, database, or any
    other file depending on your requirement. For more information, see [Writing user deletion logs in other formats](insert-link).
    
!!! info "Related Topics"
    - [Concept: Users](TODO:insert-link-to-concept)
    - [Guide: Ways of User Onboarding](../../identity-lifecycles/onboard-overview)
    - [Guide: Search/List Users](../../identity-lifecycles/search-users)