# Configure Adaptive Authentication for an Application

This page guides you through setting up [adaptive authentication](../../../references/concepts/authentication/adaptive-authentication) for an application. 


## Create a service provider

{!fragments/register-a-service-provider.md!}

---

## Add an adaptive authentication script

Make the following changes to the created service provider.

{!fragments/add-adaptive-script.md!} 

    If required, you can also use the script editor to introduce new functions and fields to an authentication script based on your requirement, and then engage the script to the service provider’s authentication step configuration. 

    !!! note
    
        - To learn about the functions and fields related to authentication scripts, see [Adaptive Authentication JS API Reference](../../../references/adaptive-authentication-js-api-reference).
        
        - To learn about the guidelines on writing custom functions for adaptive authentication, see [Write Custom Functions for Adaptive Authentication](../../../develop/extend/write-custom-functions-for-adaptive-authentication).

    A sample authentication script is shown below. 

    ```java
    var onLoginRequest = function(context) {
        // Some possible initializations...
        executeStep(1, {
            onSuccess: function (context) {
                // Logic to execute if step 1 succeeded
                executeStep(2, {
                    onSuccess: function (context){
                        // Logic to execute if step 2 succeeded
                    },
                    onFail: function (context){
                        // Logic to execute if step 2 failed
                    }
                });
            }
            onFail: function(context){
                // Logic to execute if step 1 failed
                executeStep(3);
            }
        });
    }
    
    function someCommonFunction(context) {
        // Do some common things
    }
    ```

3. Click **Update** to save changes.

!!! info "Related topics"
    - [Concept: Adaptive-Authentication](../../../references/concepts/authentication/adaptive-authentication)
    - [Guide: Ensure Assurance with ACR and AMR](../../adaptive-auth/work-with-acr-amr)
    - [Guide: Adaptive Authentication Using Function Library](../../adaptive-auth/adaptive-auth-with-function-lib)
    - [Quick Start: Adaptive Authentication Scenarios](../../../quick-starts/adaptive-auth-overview)