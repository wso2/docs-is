# Adaptive Authentication Overview

Adaptive authentication is a secure and flexible form of authentication.
It enables validating multiple factors to determine the authenticity of
a login attempt before granting access to a resource. The factors that
are used for validation can depend on the risk probability associated
with the particular user access request. This enables adjusting the
authentication strength based on the context at hand.

![](../../assets/img/tutorials/adaptive-authentication-overview-diagram.png)

WSO2 Identity Server (WSO2 IS) supports script-based adaptive
authentication, which allows you to use a script to set up appropriate
authentication factors depending on your scenario. This enables ensuring
security without impacting usability at the time of authentication.

The following section provides a detailed description of how WSO2 IS
supports adaptive authentication.

!!! tip
    
    To learn more about adaptive authentication, see the following articles:
    
    -   [Four reasons to upgrade your MFA to adaptive
        authentication](https://wso2.com/library/article/2018/10/4-reasons-to-upgrade-your-mfa-to-adaptive-authentication/)
    -   [Five instances to use adaptive
        authentication](https://wso2.com/library/article/2018/10/5-instances-to-use-adaptive-authentication/)
    -   [Four reasons to use WSO2 Identity Server for adaptive
        authentication](https://wso2.com/library/article/2018/10/four-reasons-to-use-wso2-is-for-adaptive-authentication/)
    
---
## Adaptive Authentication with WSO2 Identity Server

The WSO2 IS management console provides an **authentication script
editor** that allows you to define authentication scripts using
JavaScript . The script editor provides a set of **predefined
templates** that you can use to easily set up adaptive
authentication for some of the most common authentication scenarios. You
can define scripts that can consider the following evaluation criteria:

-   User attributes

-   User behaviour

-   Level of assurance of the access request

-   Risk analysis statistics

-   Machine learning algorithms

You can define dynamic authentication sequences that can perform actions
similar to the following:

-   Control the authentication step selection
-   Change user attributes
-   Send email notifications
-   Redirect users to an error page etc.

If necessary you can use the script editor to introduce new functions
and fields to an authentication script based on your requirement, and
then engage the script to the service provider’s authentication step
configuration.

Following is a sample authentication script.

``` java
function onLoginRequest(context) {
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

---
## What's Next?

-   To try out adaptive authentication, see [Configuring a Service
    Provider for Adaptive
    Authentication](_Configuring_a_Service_Provider_for_Adaptive_Authentication_)
    .
-   To set up common adaptive authentication scenarios, see [Adaptive
    Authentication Scenarios](_Adaptive_Authentication_Scenarios_) .
-   To learn about the functions and fields related to authentication
    scripts, see [Adaptive Authentication JS API
    Reference](https://docs.wso2.com/display/IS570/Adaptive+Authentication+JS+API+Reference)
    .
-   To learn about the guidelines on writing custom functions for
    adaptive authentication, see [Writing Custom Functions for Adaptive
    Authentication](https://docs.wso2.com/display/IS570/Writing+Custom+Functions+for+Adaptive+Authentication)
    .

---
