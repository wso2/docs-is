# On-demand silent password migration 

This adaptive authentication script is specifically designed for on-demand silent password migration. A migrated user's password can be seamlessly migrated to {{ product_name }} using this method without forcing the user to reset the password.

!!! note
    Learn how to set up [on-demand silent password migration]({{base_path}}/guides/users/migrate-users/migrate-passwords/).

## Conditional template
Shown below is the conditional authentication template for on-demand silent password migration.

!!! note

    Learn more about the conditional authentication functions and objects in its [API reference]({{base_path}}/references/conditional-auth/api-reference/).

{% if product_name == "Asgardeo" %}

```js
var user = null;
var userId = "";
var username = "";
var password = "";
var choreoContextId = "";

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function(context) {
            Log.info("Login successful. Authenticated the user locally!");
        },
        onFail: function(context) {
            resolveAndInitUser(context);

            // If the user is found, proceed with the migration.
            if (user !== null) {
                userId = user.uniqueId;

                // Check whether the user is already migrated.
                if (user.localClaims["http://wso2.org/claims/is_migrated"] === "true") {
                    Log.info("Password is already migrated for the user: " + userId + ".");
                    sendError(null, {
                        'status': 'Login failed!',
                        'statusMsg': 'Please check your username and password and try again.',
                        'i18nkey': 'auth.fail.error'
                    });
                } else {
                    Log.info("Password is not yet migrated for the user: " + userId + ". Starting the external authentication.");

                    // Start the external authentication.
                    authenticateExternally();
                }
            } else {
                sendError(null, {
                    'status': 'Login failed!',
                    'statusMsg': 'Please check your username and password and try again.',
                    'i18nkey': 'auth.fail.error'
                });
            }
        }
    });
};


/**
 * This function will resolve the user using the login identifier and initialize the login variables.
 */
var resolveAndInitUser = function(context) {

    // Retrieve login identifier and password provided by the user.
    var loginIdentifier = context.request.params.username[0];
    password = context.request.params.password[0];

    Log.info("User login initiated for the user: " + loginIdentifier);

    // If your organization has enabled alternative login identifiers, the username has to be resolved using the login identifier.
    // If not, uncomment the immediate next line and comment out rest of the section.
    // username = loginIdentifier;
    Log.info("Resolving username using the login identifier: " + loginIdentifier);
    username = resolveMultiAttributeLoginIdentifier(loginIdentifier, context.tenantDomain);
    Log.info("Username resolved using the login identifier. Resolved username: " + username);
    // End of username resolving section.

    // Retrieve unique user object for the username.
    var claimMap = {};
    claimMap["http://wso2.org/claims/username"] = "DEFAULT/" + username;
    user = getUniqueUserWithClaimValues(claimMap, context);
};


/**
 * This function will authenticate the user with the external service.
 */
var authenticateExternally = function() {

    // Prepare the connection data.
    var connectionMetadata = {
        "url": "<start_authentication_endpoint>",
        "consumerKey": "<consumer_key>",
        "consumerSecret": "<consumer_secret>",
        "asgardeoTokenEndpoint": "<asgardeo_token_endpoint>"
    };

    var requestPayload = {
        id: userId,
        username: username,
        password: password
    };

    Log.info("Invoking the Choreo API to start authentication for the user: " + userId + ".");

    // Invoke the start authentication service hosted in Choreo.
    callChoreo(connectionMetadata, requestPayload, {
        onSuccess: function(context, data) {
            if (data !== null && data.message !== null) {
                if (data.message === "Received") {
                    // Set the context ID to be used in subsequent requests.
                    choreoContextId = data.contextId;

                    Log.info("Started external authentication for the user: " + userId + " with context ID: " + choreoContextId + ". Redirecting to the waiting page.");

                    // Redirect to the waiting page to wait until the external authentication is completed.
                    prompt("internalWait", {
                        "waitingType": "POLLING",
                        "waitingConfigs": {
                            "timeout": "10",
                            "pollingEndpoint": "<polling_endpoint>",
                            "requestMethod": "GET",
                            "requestData": "contextId=" + choreoContextId,
                            "pollingInterval": "2"
                        }
                    }, {
                        onSuccess: function(context) {
                            Log.info("Successfully redirected back from the waiting page.");

                            // Check authentication status, update password and re-authenticate the user.
                            updatePasswordAndReAuthenticate();
                        },
                        onFail: function(context, data) {
                            Log.info("Error occurred while redirecting. Please retry!");
                        }
                    });
                } else {
                    Log.info("External authentication failed for the user: " + userId + ". Message: " + data.message + ".");
                    sendError(null, {
                        'status': 'Authentication failed',
                        'statusMsg': 'Please contact your administrator.',
                        'i18nkey': 'auth.fail.error'
                    });
                }
            } else {
                Log.info("External authentication failed for the user: " + userId + ".");
                sendError(null, {
                    'status': 'Authentication failed',
                    'statusMsg': 'Please contact your administrator.',
                    'i18nkey': 'auth.fail.error'
                });
            }
        },
        onFail: function(context, data) {
            Log.info("Error occurred while invoking the Choreo API to start authentication.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        },
        onTimeout: function(context, data) {
            Log.info("Connection timed out while invoking the Choreo API to start authentication.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        }
    });
};


/**
 * This function will check for the authentication status, update the password and re-authenticate.
 */
var updatePasswordAndReAuthenticate = function() {

    // Prepare the connection data.
    var connectionMetadata = {
        "url": "<authentication_status_endpoint>",
        "consumerKey": "<consumer_key>",
        "consumerSecret": "<consumer_secret>",
        "asgardeoTokenEndpoint": "<asgardeo_token_endpoint>"
    };

    var requestPayload = {
        contextId: choreoContextId,
        username: username
    };

    Log.info("Invoking the Choreo API to check auth status for the user: " + userId + " with context ID: " + choreoContextId + ".");

    // Invoke the external authentication API hosted in Choreo.
    callChoreo(connectionMetadata, requestPayload, {
        onSuccess: function(context, data) {
            if (data.status !== null && data.status === "SUCCESS") {
                Log.info("External authentication is successful for the user: " + userId + ". Proceeding with password update.");

                // Update the user password.
                updateUserPassword(user, password, {
                    onSuccess: function(context) {
                        Log.info("Password updated successfully for the user: " + userId + ".");

                        // Set the password migration flag to true.
                        user.localClaims["http://wso2.org/claims/is_migrated"] = "true";

                        reAuthenticate();
                    },
                    onFail: function(context) {
                        Log.info("Failed to update password of the user: " + userId + ".");
                    }
                });
            } else if (data.status !== null && data.status === "FAIL") {
                var errorMessage = "";
                if (data.message !== null) {
                    errorMessage = data.message;
                }

                Log.info("External authentication failed for the user: " + userId + ". Message: " + errorMessage + ".");

                sendError(null, {
                    'status': 'Authentication failed',
                    'statusMsg': 'External authentication failed with the error: ' + errorMessage + '. Please contact your administrator.',
                    'i18nkey': 'auth.fail.error'
                });
            } else {
                var errorMessage = "";
                if (data.message !== null) {
                    errorMessage = data.message;
                }

                Log.info("Something went wrong during the external authentication for the user: " + userId + ". Message: " + errorMessage + ".");

                sendError(null, {
                    'status': 'Authentication failed',
                    'statusMsg': 'Please contact your administrator.',
                    'i18nkey': 'auth.fail.error'
                });
            }
        },
        onFail: function(context, data) {
            Log.info("Error occurred while invoking the Choreo API to check auth status.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        },
        onTimeout: function(context, data) {
            Log.info("Connection timed out while invoking the Choreo API to check auth status.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        }
    });
};


/**
 * This function will re-authenticate the user with the new password.
 */
var reAuthenticate = function() {

    // Re-authenticate without prompting user input.
    Log.info("Re-authenticating the user: " + userId + " with the new password.");

    executeStep(1, {
        authenticatorParams: {
            common: {
                'username': username,
                'password': password
            }
        },
    }, {
        onSuccess: function(context) {
            Log.info("Re-authentication successful for the user: " + userId + ".");
        },
        onFail: function() {
            Log.info("Re-authentication failed for the user: " + userId + ".");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        }
    });
};
```

Replace the following parameters of the script with values relevant to your setup:

<table>
    <tr>
        <th>start_authentication_endpoint</th>
        <td>URL of the start authentication endpoint deployed in Choreo</td>
    </tr>
    <tr>
        <th>polling_endpoint</th>
        <td>URL of the polling endpoint deployed in Choreo</td>
    </tr>
    <tr>
        <th>authentication_status_endpoint</th>
        <td>URL of the authentication status endpoint deployed in Choreo</td>
    </tr>
    <tr>
        <th>consumer_key</th>
        <td>The consumer key of your Choreo application</td>
    </tr>
    <tr>
        <th>consumer_secret</th>
        <td>The consumer secret of your Choreo application</td>
    </tr>
    <tr>
        <th>asgardeo_token_endpoint</th>
        <td>Token endpoint of your Asgardeo organization. For example: <code>https://api.asgardeo.io/t/{organization_name}/oauth2/token</code>
</td>
    </tr>
</table>

{% else %}

```js
var user = null;
var userId = "";
var username = "";
var password = "";
var contextId = "";

var requestAuthConfig = {
    type: "clientcredential",
    properties: {
        consumerKey: "<consumer_key>",
        consumerSecret: "<consumer_secret>",
        tokenEndpoint: "<token_endpoint>"
    }
}

var requestHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function(context) {
            Log.info("Login successful. Authenticated the user locally!");
        },
        onFail: function(context) {
            resolveAndInitUser(context);

            // If the user is found, proceed with the migration.
            if (user !== null) {
                userId = user.uniqueId;

                // Check whether the user is already migrated.
                if (user.localClaims["http://wso2.org/claims/is_migrated"] === "true") {
                    Log.info("Password is already migrated for the user: " + userId + ".");
                    sendError(null, {
                        'status': 'Login failed!',
                        'statusMsg': 'Please check your username and password and try again.',
                        'i18nkey': 'auth.fail.error'
                    });
                } else {
                    Log.info("Password is not yet migrated for the user: " + userId + ". Starting the external authentication.");

                    // Start the external authentication.
                    authenticateExternally();
                }
            } else {
                sendError(null, {
                    'status': 'Login failed!',
                    'statusMsg': 'Please check your username and password and try again.',
                    'i18nkey': 'auth.fail.error'
                });
            }
        }
    });
};


/**
 * This function will resolve the user using the login identifier and initialize the login variables.
 */
var resolveAndInitUser = function(context) {

    // Retrieve login identifier and password provided by the user.
    var loginIdentifier = context.request.params.username[0];
    password = context.request.params.password[0];

    Log.info("User login initiated for the user: " + loginIdentifier);

    // If your organization has enabled alternative login identifiers, the username has to be resolved using the login identifier.
    // If not, uncomment the immediate next line and comment out rest of the section.
    // username = loginIdentifier;
    Log.info("Resolving username using the login identifier: " + loginIdentifier);
    username = resolveMultiAttributeLoginIdentifier(loginIdentifier, context.tenantDomain);
    Log.info("Username resolved using the login identifier. Resolved username: " + username);
    // End of username resolving section.

    // Retrieve unique user object for the username.
    var claimMap = {};
    claimMap["http://wso2.org/claims/username"] = "PRIMARY/" + username;
    user = getUniqueUserWithClaimValues(claimMap, context);
};


/**
 * This function will authenticate the user with the external service.
 */
var authenticateExternally = function() {

    var requestPayload = {
        id: userId,
        username: username,
        password: password
    };

    Log.info("Invoking the external authentication endpoint for the user: " + userId + ".");

    // Invoke the start authentication API.
    httpPost("<start_authentication_endpoint>", requestPayload, requestHeaders, requestAuthConfig, {
        onSuccess: function(context, data) {
            if (data !== null && data.message !== null) {
                if (data.message === "Received") {
                    // Set the context ID to be used in subsequent requests.
                    contextId = data.contextId;

                    Log.info("Started external authentication for the user: " + userId + " with context ID: " + contextId + ". Redirecting to the waiting page.");

                    // Redirect to the waiting page to wait until the external authentication is completed.
                    prompt("internalWait", {
                        "waitingType": "POLLING",
                        "waitingConfigs": {
                            "timeout": "10",
                            "pollingEndpoint": "<polling_endpoint>",
                            "requestMethod": "GET",
                            "requestData": "contextId=" + contextId,
                            "pollingInterval": "2"
                        }
                    }, {
                        onSuccess: function(context) {
                            Log.info("Successfully redirected back from the waiting page.");

                            // Check authentication status, update password and re-authenticate the user.
                            updatePasswordAndReAuthenticate();
                        },
                        onFail: function(context, data) {
                            Log.info("Error occurred while redirecting. Please retry!");
                        }
                    });
                } else {
                    Log.info("External authentication failed for the user: " + userId + ". Message: " + data.message + ".");
                    sendError(null, {
                        'status': 'Authentication failed',
                        'statusMsg': 'Please contact your administrator.',
                        'i18nkey': 'auth.fail.error'
                    });
                }
            } else {
                Log.info("External authentication failed for the user: " + userId + ".");
                sendError(null, {
                    'status': 'Authentication failed',
                    'statusMsg': 'Please contact your administrator.',
                    'i18nkey': 'auth.fail.error'
                });
            }
        },
        onFail: function(context, data) {
            Log.info("Error occurred while invoking the external API to start authentication.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        },
        onTimeout: function(context, data) {
            Log.info("Connection timed out while invoking the external API to start authentication.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        }
    });
};


/**
 * This function will check for the authentication status, update the password and re-authenticate.
 */
var updatePasswordAndReAuthenticate = function() {

    var requestPayload = {
        contextId: contextId,
        username: username
    };

    Log.info("Invoking the external API to check auth status for the user: " + userId + " with context ID: " + contextId + ".");

    // Invoke the external authentication API.
    httpPost("<authentication_status_endpoint>", requestPayload, requestHeaders, requestAuthConfig, {
        onSuccess: function(context, data) {
            if (data.status !== null && data.status === "SUCCESS") {
                Log.info("External authentication is successful for the user: " + userId + ". Proceeding with password update.");

                // Update the user password.
                updateUserPassword(user, password, {
                    onSuccess: function(context) {
                        Log.info("Password updated successfully for the user: " + userId + ".");

                        // Set the password migration flag to true.
                        user.localClaims["http://wso2.org/claims/is_migrated"] = "true";

                        reAuthenticate();
                    },
                    onFail: function(context) {
                        Log.info("Failed to update password of the user: " + userId + ".");
                    }
                });
            } else if (data.status !== null && data.status === "FAIL") {
                var errorMessage = "";
                if (data.message !== null) {
                    errorMessage = data.message;
                }

                Log.info("External authentication failed for the user: " + userId + ". Message: " + errorMessage + ".");

                sendError(null, {
                    'status': 'Authentication failed',
                    'statusMsg': 'External authentication failed with the error: ' + errorMessage + '. Please contact your administrator.',
                    'i18nkey': 'auth.fail.error'
                });
            } else {
                var errorMessage = "";
                if (data.message !== null) {
                    errorMessage = data.message;
                }

                Log.info("Something went wrong during the external authentication for the user: " + userId + ". Message: " + errorMessage + ".");

                sendError(null, {
                    'status': 'Authentication failed',
                    'statusMsg': 'Please contact your administrator.',
                    'i18nkey': 'auth.fail.error'
                });
            }
        },
        onFail: function(context, data) {
            Log.info("Error occurred while invoking the external API to check auth status.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        },
        onTimeout: function(context, data) {
            Log.info("Connection timed out while invoking the external API to check auth status.");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        }
    });
};


/**
 * This function will re-authenticate the user with the new password.
 */
var reAuthenticate = function() {

    // Re-authenticate without prompting user input.
    Log.info("Re-authenticating the user: " + userId + " with the new password.");

    executeStep(1, {
        authenticatorParams: {
            common: {
                'username': username,
                'password': password
            }
        },
    }, {
        onSuccess: function(context) {
            Log.info("Re-authentication successful for the user: " + userId + ".");
        },
        onFail: function() {
            Log.info("Re-authentication failed for the user: " + userId + ".");

            sendError(null, {
                'status': 'Authentication failed',
                'statusMsg': 'Please contact your administrator.',
                'i18nkey': 'auth.fail.error'
            });
        }
    });
};
```

Replace the following parameters of the script with values relevant to your setup:

<table>
    <tr>
        <th>start_authentication_endpoint</th>
        <td>URL of the start authentication endpoint deployed in an external service</td>
    </tr>
    <tr>
        <th>polling_endpoint</th>
        <td>URL of the polling endpoint deployed in an external service</td>
    </tr>
    <tr>
        <th>authentication_status_endpoint</th>
        <td>URL of the authentication status endpoint deployed in an external service</td>
    </tr>
    <tr>
        <th>requestAuthConfig</th>
        <td>An object containing necessary authentication metadata to invoke the APIs. Refer Conditional authentication - API reference for more information.</td>
    </tr>
</table>

{% endif %}

## How it works

Let's look at how the above conditional authentication script works.

1. The first authentication step (Username & Password) is initiated with the `executeStep(1, ..)` function. Based on its status, one of the following happens.

    - If the entered credentials match, the user's password is already migrated. Hence, the `onSuccess` function will be called and the user will be authenticated.
    
    - If the user's credentials don't match, either the credentials are incorrect or the password may not have be migrated yet. Hence, the `onFail` callback function is called and the script continues.

2. If the `onFail` function is called, the script will next try to locate a unique user in the system using the `resolveAndInitUser` function. 

    !!! note "Adjust script for alternate login identifiers"

        If your organization does not use alternate login identifiers, comment the following lines in the `resolveAndInitUser` function.

        ```js
        Log.info("Resolving username using the login identifier: " + loginIdentifier);
        username = resolveMultiAttributeLoginIdentifier(loginIdentifier, context.tenantDomain);
        Log.info("Username resolved using the login identifier. Resolved username: " + username);
        ```

3. If a unique user is found, the script checks the value of the `is_migrated` attribute of the user and does one of the following. (The `is_migrated` user attribute holds the status of the password migration.)

    - If this is set to `true`, user's password is already migrated. Hence, the entered credentials are incorrect and the flow fails with an error. 
    
    - If it is not set to `true`, the user's password is not yet migrated. Hence, the script calls for external authentication.

4. The script calls for external authentication with the `authenticateExternally` function and it works as follows:

    {% if product_name == "Asgardeo" %}
    - The `connectionMetadata` object holds the start authentication endpoint URL, Choreo application credentials and the Asgardeo token endpoint.
    - The script first calls the `callChoreo()` function along with the `connectionMetaData` and invokes the start authentication endpoint.
    {% else %}
    - The `requestAuthConfig` object holds the necessary authentication metadata to invoke the APIs.
    - The script first calls the `httpPost()` function along with the `requestAuthConfig` and invokes the start authentication endpoint.
    {% endif %}

    - If the API call is successful, the `onSuccess()` callback function is called which in turn calls the `prompt()` function.

    {% if product_name == "Asgardeo" %}
    - The `prompt()` function continuously polls the Choreo polling endpoint and redirects the user to a waiting page until the external authentication completes.
    {% else %}
    - The `prompt()` function continuously polls the external polling endpoint and redirects the user to a waiting page until the external authentication completes.
    {% endif %}

    - Once the authentication is complete, the `onSuccess()` callback function of the `prompt()` function calls the `updatePasswordAndReAuthenticate()` function.

5. The `updatePasswordAndReAuthenticate()` function is responsible for checking the status of the authentication and taking necessary actions as explained below.

    {% if product_name == "Asgardeo" %}
    - The `connectionMetadata` object hold the authentication status endpoint URL, Choreo application credentials and the Asgardeo token endpoint.
    - The script first calls the `callChoreo()` function along with the `connectionMetaData` and invokes the authentication status endpoint.
    {% else %}
    - The `requestAuthConfig` object holds the necessary authentication metadata to invoke the APIs.
    - The script first calls the `httpPost()` function along with the `requestAuthConfig` and invokes the authentication status endpoint.
    {% endif %}

    - If the API call is successful, the `onSuccess()` callback function is called and the response message is checked. If it is `SUCCESS`, the external authentication was successful.
    - The script then calls the `updateUserPassword()` function to update the user password in the {{ product_name }} user store. 
    - Afterwards, the `is_migrated` attribute of the user is set to `true` and the user is re-authenticated.
    - The `reAuthenticate()` function that handles the re-authentication performs a silent authentication. This means that the user is not prompted to enter the credentials again.
