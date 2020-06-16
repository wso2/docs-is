# Configure Adaptive Authentication for an Application

This page guides you through setting up [adaptive authentication](insertlink) for an application. 

-----

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/adaptive-auth-overview"   rel="nofollow noopener">Try it with the sample</a>

!!! note
    The following scenarios are available as samples.

     - Role-Based Adaptive Authentication
     - User Age-Based Adaptive Authentication
     - Tenant-Based Adaptive Authentication
     - User Store-Based Adaptive Authentication
     - IP-Based Adaptive Authentication
     - Device-Based Adaptive Authentication
     - Login Attempts-Based Adaptive Authentication
     - ACR-Based Adaptive Authentication
     - Adaptive Authentication Using Function Library
     - Limit Active User Sessions

----

{!fragments/register-application-portal!}

{!fragments/add-adaptive-script-portal.md!}

## Customizing the authentication script

1. Modify the template accordingly if required on the script editor.

2. Click **Update** to save changes. 

If required, you can also use the script editor to introduce new functions and fields to an authentication script based on your requirement, and then engage the script to the service provider’s authentication step configuration. 

A sample authentication script is shown below 

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

- To learn about the functions and fields related to authentication scripts, see [Adaptive Authentication JS API Reference](insertlink).

- To learn about the guidelines on writing custom functions for adaptive authentication, see [Writing Custom Functions for Adaptive Authentication](insertlink).


!!! info "Related Topics"
    - [Concept: Adaptive-Authentication](TODO:insert-link-to-concept)
    - [Guide: Ensure Assurance with ACR and AMR](../../adaptive-auth/work-with-acr-amr)
    - [Guide: Adaptive Authentication Using Function Library](../../adaptive-auth/adaptive-auth-with-function-lib)
    - [Demo: Adaptive Authentication Scenarios](../../../quick-starts/adaptive-auth-overview)