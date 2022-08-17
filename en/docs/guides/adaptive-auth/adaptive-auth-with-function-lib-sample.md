# Adaptive authentication using function library

This page guides you through configuring adaptive authentication using the function library for a sample web application.

## Scenario

The instructions below guide you through adding an adaptive authentication function using the function library that specifies authentication based on the user's age. In this example, any underage user below the specified age limit (i.e., under 18 years) is restricted access and prevented from logging in to the application.

----
## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.
- You need to add a function library
    1. On the Management Console, go to **Manage** > **Function Libraries** >  **Add**.
    2. Enter the following values:

        <table>
            <tr>
                <th>Field name</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Function Library Name</td>
                <td>age_based</td>
            </tr>
            <tr>
                <td>Description</td>
                <td>getAge of the user</td>
            </tr>
            <tr>
                <td>Function Library Script</td>
                <td>
                    ```json
                    function getAge(birthDate) {
                        var today = new Date();
                        var age = today.getFullYear() - birthDate.getFullYear();
                        var m = today.getMonth() - birthDate.getMonth();
                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    return age;
                    }
                    module.exports.getAge = getAge;
                    ```
                </td>
            </tr>
        </table>
    
    3. Click **Register** to add the function library.

- You need to [update claims]({{base_path}}/guides/dialects/edit-claim-mapping) to support `BirthDate` by default.
    1. On the management console, go to **Claims > List**, select `http://wso2.org/claims`.
    2. Click on **Edit** corresponding to the **BirthDate** claim
    3. Select the **Supported By Default** checkbox to enable the birthdate claim.
- You need to [add two users]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) with login permissions, and [update the age]({{base_path}}/guides/identity-lifecycles/update-profile) as specified:

    1. Username: `Alex`; Age: `< 18 years`
    2. Username: `Kim`; Age: `> 18 years`

----

## Configure authentication script

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. Add the following script under the script-based adaptive authentication editor:
    ```js
    var ageModule = require('age_based.js');

    //This script provides access to the application only if the user's age is greater than the configured value

    //The user will be redirected to an error page if the date of birth is not present or the user's age is below the configured value
    
    var ageLimit = 18;
    
    // Error page to redirect unauthorized users.
    // Can either be an absolute URL or a relative URL to the server root. The value can be empty or null as well.
    // null/empty value will redirect to the default error page
    var errorPage = '';
    
    // Additional query params to be added to the above URL.
    // Hint: Use i18n keys for error messages
    
    var errorPageParameters = {
        'status': 'Unauthorized',
        'statusMsg': 'You need to be over ' + ageLimit + ' years to login to this application.'
    };
    
    // Date of birth attribute at the client side
    var dateOfBirthClaim = 'http://wso2.org/claims/dob';
    
    function onLoginRequest(context) {
        executeStep(1, {
            onSuccess: function (context) {
                var underAge = true;
                // Extracting user store domain of authenticated subject from the first step
                var dob = context.currentKnownSubject.localClaims[dateOfBirthClaim];
                Log.debug('DOB of user ' + context.currentKnownSubject.identifier + ' is : ' + dob);
                if (dob && ageModule.validateDOB(dob)) {
                    var birthDate = new Date(dob);
                    if (ageModule.getAge(birthDate) >= ageLimit) {
                        underAge = false;
                    }
                }
                if (underAge === true) {
                    Log.debug('User ' + context.currentKnownSubject.identifier + ' is under aged. Hence denied to login.');
                    sendError(errorPage, errorPageParameters);
                }
            }
        });
    }

    ```

    !!! info
        - The authentication script grants access only to users who are 18 years or above and restricts underage users. Underage users are redirected to an error page.

    !!! note
        Add `var ageModule=require('age_based.js');` before `ageModule.getAge(birthDate)` and `ageModule.validateDOB(dob)` functions’ usage.

4. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        If you have two authentication steps configured, delete the second step as the above script does not specify a second authentication step.

5. Click **Update** to save your configurations.

## Try it out

1. Access the following sample Pickup Dispatch application URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter Kim's credentials. You are successfully logged in to the application.

3. Log out and log in as Alex. Note that you are now restricted from logging in because Alex is underage.  

    ![Error message based on age validation]({{base_path}}/assets/img/samples/age-validation.png)
