# Track deleted users

WSO2 Identity Server (WSO2 IS) allows you to track details related to
user deletion by writing the following information to a log file each
time a user is deleted:

-   The user name of the deleted user.
-   The user store domain name of the deleted user.
-   The tenant domain name of the deleted user.
-   The tenant ID of the deleted user.
-   The timestamp that the user was deleted.

You can use this log file as an input to the Identity Anonymization tool
that is packaged with WSO2 Identity Server, to ensure that you [remove
references to all deleted user
identities]({{base_path}}/deploy/configure/databases/remove-references-to-deleted-user-identities).

## Write details to a CSV file

Follow the steps below to configure WSO2 Identity Server to log details
related to user deletion each time you delete a user:

1.  Add the following property to the 
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file, and set it to
    `           true          `

    ``` toml
    [event.default_listener.user_deletion]
    priority= "98"
    enable = true 
    ```

2.  Add the 
    `<IS_HOME>/repository/conf/deployment.toml`
    file, and set `           enable          ` to
    `           true          ` in the following event recorder:

    ``` toml
	[event.default_recorder.user_delete_event]
	name= "org.wso2.carbon.user.mgt.recorder.DefaultUserDeletionEventRecorder"
	enable = false
    ```

    This writes details related to user deletion in the CSV format to
    the
    `           <IS_HOME>/repository/logs/delete-event.log          `
    file.

    !!! note

         If necessary you can write user delete event details to a custom CSV
         file that you specify. To do this, add the following property in
          the `<IS_HOME>/repository/conf/deployment.toml         `
         file, and be sure to specify the custom CSV file path.

         ``` java
         [event.default_recorder.user_delete_event]
         write_to_separate_csv.path = "${carbon.home}/repository/logs/delete-records.csv"
         ```

## Write details to a custom file

By default all logs related to user deletion are written in CSV format
    to a specified log file. You can extend this functionality to log the
    details in any other format that you want, and you can also extend the
    functionality to write the details to a text file, database, or any
    other file depending on your requirement.

Follow the steps below if you want to extend the functionality of the
    event recorder:
    
1.  Implement the UserDeletionEventRecorder interface.
2.  Register the implemented class as an OSGi service.
3.  Replace the name of the
    `          [event.default_recorder.user_delete_event]        ` element in the
    `          <IS_HOME>/repository/conf/deployment.toml         `
    file with the fully qualified class name of the
    `          User Deletion Event Recorder         ` interface that you
    implemented.
    