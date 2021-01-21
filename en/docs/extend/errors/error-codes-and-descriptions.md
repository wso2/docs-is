# Error Codes and Descriptions

The following topic provides a list of error codes in the WSO2 Identity Server. 

| Error Code | Description                                                                                                                                                              |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 17001      | This occurs if the user does not exist.                                                                                                                                  |
| 17002      | This error occurs when invalid credentials are provided.                                                                                                                 |
| 17003      | This error occurs when an [account is locked](TODO:../../../learn/account-locking-by-failed-login-attempts) after multiple incorrect login attempts and the user attempts to log in again. |
| 17004      | This error occurs when the user account is disabled.                                                                                                                     |
| 18001      | Invalid validation code                                                                                                                                                 |
| 18002      | The key/confirmation code provided has expired.                                                                                                                          |
| 18003      | Invalid user (invalid username).                                                                                                                                         |
| 18004      | Captcha answer is invalid.                                                                                                                                               |
| 18013      | Unexpected error                                                                                                                                                        |
| 18015      | This error occurs when sending a recovery notification fails.                                                                                                            |
| 18016      | Invalid tenant                                                                                                                                                          |
| 18017      | Challenge question not found.                                                                                                                                            |
| 20001      | Registry exception while getting challenge question.                                                                                                                     |
| 20002      | Registry exception while setting challenge question.                                                                                                                     |
| 20003      | Error when getting challenge question URIs.                                                                                                                              |
| 20004      | Error while getting challenge question.                                                                                                                                  |
| 20005      | Error while setting challenge question.                                                                                                                                  |
| 20006      | Error while setting challenge question of user.                                                                                                                          |
| 20007      | Error while hashing the security answer.                                                                                                                                 |
| 20008      | Invalid answe                                                                                                                                                          |
| 20009      | Invalid answer for security question                                                                                                                                    |
| 20010      | Need to answer more security questions.                                                                                                                                  |
| 20011      | Error while triggering notifications for user.                                                                                                                           |
| 20012      | Need to answer all requested security questions.                                                                                                                         |
| 20013      | No valid username found for recovery.                                                                                                                                    |
| 20014      | No fields found for username recovery.                                                                                                                                   |
| 20015      | No valid user found.                                                                                                                                                     |
| 20016      | Error loading recovery configurations.                                                                                                                                   |
| 20017      | Notification-based password recovery is not enabled.                                                                                                                     |
| 20018      | Security-question based password recovery is not enabled.                                                                                                                |
| 20019      | Error adding self-sign up user.                                                                                                                                          |
| 20020      | Error while locking user.                                                                                                                                                |
| 20021      | Self sign up feature is disabled.                                                                                                                                        |
| 20022      | Error while locking user account.                                                                                                                                        |
| 20023      | Error while unlocking user.                                                                                                                                              |
| 20024      | Old confirmation code not found.                                                                                                                                         |
| 20025      | Failed to retrieve user realm from tenant ID.                                                                                                                            |
| 20026      | Failed to retrieve user store manager.                                                                                                                                   |
| 20027      | Error occurred while retrieving user claims.                                                                                                                             |
| 20028      | Error occurred while retrieving account lock connector configuration.                                                                                                    |
| 20029      | Multiple challenge questions not allowed for this operation.                                                                                                             |
| 20030      | Users already exist in the system, please use a different username.                                                                                                      |
| 20031      | Username recovery is not enabled.                                                                                                                                        |
| 20032      | Multiple users found.                                                                                                                                                    |
| 20033      | Error loading signup configurations.                                                                                                                                     |
| 20034      | Error occurred while updating user claims.                                                                                                                               |
| 20035      | Password policy violation                                                                                                                                              |
| 20036      | Provided confirmation code is not valid.                                                                                                                                 |
| 20037      | No confirmation code is provided for user.                                                                                                                               |
| 20038      | No recovery scenario is provided for user.                                                                                                                               |
| 20039      | No recovery step is provided for user.                                                                                                                                   |
| 20040      | Notification type is not provided for user.                                                                                                                              |
| 20041      | Error while validating account lock status of user.                                                                                                                      |
| 20042      | Error while adding consent for user.                                                                                                                                     |
| 22001      | This password has been used in the recent password history. Choose a different password.                                                                                 |
| 22002      | Error while loading history data source.                                                                                                                                 |
| 22003      | Error while validating password history.                                                                                                                                 |
| 22004      | Error while storing password history.                                                                                                                                    |
| 22005      | Error while removing password history from users.                                                                                                                        |
| 40001      | Error occurred while loading password policies.                                                                                                                          |
| 40002      | Error while validating password policy.                                                                                                                                  |
| 41001      | Scope name is not specified.                                                                                                                                             |
| 41002      | Scope display name is not specified.                                                                                                                                     |
| 41003      | Scope name is not found.                                                                                                                                                 |
| 41004      | Scope with the name %s already exists in the system. Please use a different scope name.<br> <div class="admonition info"><p class="admonition-title">Info</p> <p>Alternatively if the existing scope is an OIDC scope, the error message will be as follows;<br>"Scope with the name %s already exists as an OIDC scope in the system. Please use a different scope name."</p></div>                                                                                 |
| 41005      | Scope is not specified.                                                                                                                                                  |
| 51001      | Error occurred while registering scope.                                                                                                                                  |
| 51002      | Error occurred while retrieving all available scopes.                                                                                                                    |
| 51003      | Error occurred while retrieving scope.                                                                                                                                   |
| 51004      | Error occurred while deleting scope.                                                                                                                                     |
| 51005      | Error occurred while updating scope.                                                                                                                                     |
| 51007      | Unexpected Error                                                                                                                                                        |
