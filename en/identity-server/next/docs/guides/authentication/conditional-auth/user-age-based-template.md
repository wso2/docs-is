{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add user age-based access control

To control access to your application based on the user's age, you can apply the **Age-Based** conditional authentication template. The age of the user is calculated using the `date of birth` attribute in the user's profile. Users are redirected to an error page if the date of birth is not specified in the user profile or if the user's age is below the minimum age configured in the template.

## Scenario

Consider a scenario where users who are younger than 18 years should be prevented from signing in to an application and redirected to an error message.

![Age based access control]({{base_path}}/assets/img/guides/conditional-auth/age-based-access-control.png)

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Go to the user's profile and update the date of birth so that the current age is below 18 years. For instructions, see [Manage user profiles]({{base_path}}/guides/user-self-service/update-profile-info/).

## Configure the login flow

1. On the {{ product_name }} Console, click **Applications**.
2. Select the relevant application and go to its **Sign-in Method** tab.
3. Add user-age-based access control using your preferred editor:

    ---
    === "Classic Editor"
        To add user-age-based access control using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **User** > **User-Age-Based** template.

    === "Visual Editor"
        To add age-based access control using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **User**.

        2. Click **+ ADD** next to **User-Age-Based** to add the user-age-based access control script.

            ![Age-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/age-based-access-control-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

4. Update the following parameter in the script.

    <table>
        <thead>
            <tr>
                <th>Parameter</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>ageLimit</code></td>
                <td><p>Minimum age required for the user to log in to the application.</p>For this example scenario, enter <code>18</code> as the value.</td>
            </tr>
            <tr>
                <td><code>errorPage</code></td>
                <td>The error page to which users are redirected if the age limit is below age limit. The default error page is used if this parameter is not configured.</td>
            </tr>
            <tr>
                <td><code>errorPageParameters</code></td>
                <td>Parameters to be passed to the error page. This information will display on the error page.</td>
            </tr>
        </tbody>
    </table>

5. Click **Update** to confirm.

## How it works

Shown below is the user age-based conditional authentication template.

```js
// This script will only allow login to application if the user's age is over configured value
// The user will be redirected to an error page if the date of birth is not present or user is below configured value

var ageLimit = 18;

// Error page to redirect unauthorized users,
// can be either an absolute url or relative url to server root, or empty/null
// null/empty value will redirect to the default error page
var errorPage = '';

// Additional query params to be added to the above url.
// Hint: Use i18n keys for error messages
var errorPageParameters = {
    'status': 'Unauthorized',
    'statusMsg': 'You need to be over ' + ageLimit + ' years to login to this application.'
};

// Date of birth attribute at the client side
var dateOfBirthClaim = 'http://wso2.org/claims/dob';

// The validator function for DOB. Default validation check if the DOB is in YYYY-MM-dd format
var validateDOB = function (dob) {
    return dob.match(/^(\d{4})-(\d{2})-(\d{2})$/);
};

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            var underAge = true;
            // Extracting user store domain of authenticated subject from the first step
            var dob = context.currentKnownSubject.localClaims[dateOfBirthClaim];
            Log.debug('DOB of user ' + context.currentKnownSubject.identifier + ' is : ' + dob);
            if (dob && validateDOB(dob)) {
                var birthDate = new Date(dob);
                if (getAge(birthDate) >= ageLimit) {
                    underAge = false;
                }
            }
            if (underAge === true) {
                Log.debug('User ' + context.currentKnownSubject.identifier + ' is under aged. Hence denied to login.');
                sendError(errorPage, errorPageParameters);
            }
        }
    });
};

var getAge = function(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
```

Let's look at how this script works.

1. The **validateDOB** function validates whether the provided date of birth is correct.
2. The **getAge** function calculates the age based on the configured birth date.
3. When step 1 of the authentication flow is complete, the **onLoginRequest** function checks whether the
age of the user is above the configured age limit.
4. If the age is below the configured limit, the user is directed to the
configured error page.

!!! note
    Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Try to log in as a user who is above 18 years of age. This user will successfully log in to the application.
3. Log out of the application.
4. Log in again with a user who is below 18 years. The user will see the following error.

    ![authentication failed]({{base_path}}/assets/img/guides/conditional-auth/auth-failure.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
