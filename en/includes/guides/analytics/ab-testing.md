{% if product_name == "WSO2 Identity Platform" %}

# A/B testing

A/B testing compares two or more versions of a user journey to find out which one performs better. For example, you can test whether asking for fewer details during registration results in more registrations, or how adding a second authentication step affects successful logins.

{{product_name}} lets you send users down different versions of the following journeys:

- [Registration and recovery flows](#ab-test-registration-and-recovery-flows) - Use a **Decision** step in the flow, which branches on the built-in `abTestingKey` value.
- [Login flow](#ab-test-the-login-flow) - Use a conditional authentication script, which picks a version for each login.

## A/B test registration and recovery flows

Every flow has a built-in runtime value, `abTestingKey`. It's a number from 0 to 99 that each browser gets at random and keeps, so a returning user sees the same version. You can use it in the [Self registration]({{base_path}}/guides/flows/self-registration/), [Password recovery]({{base_path}}/guides/flows/password-recovery/) and [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/) flows.

The following steps split self-registration evenly between the current version, A, and a new version, B.

1. On the {{product_name}} Console, go to **Flows** and open **Self Registration**.

2. Add the steps of version B to the canvas.

3. From the **Steps** panel, drag and drop a **Decision** step onto the canvas, and connect the **Start** node to it.

4. Click the **Decision** step, select **Branch 1**, and set its condition to **Runtime values** `abTestingKey` **less than** `50`.

5. Connect **Branch 1** to the first step of version B, and the **Default** branch to the first step of version A.

6. Click **Save Draft** and turn the toggle **ON** to publish the flow.

About half of the browsers now see version B, and the rest see version A. To split users differently or to test more versions, see [A/B testing in conditional branching]({{base_path}}/guides/flows/conditional-branching/#ab-testing).

!!! note
    The key belongs to a browser, not a user. A user may see a different version on another device or after clearing browser data.

## A/B test the login flow

You can use a [conditional authentication script]({{base_path}}/guides/authentication/conditional-auth/) to send users down different login paths. The script uses one of the following values to choose the version:

- An `abTestingKey` value that your application sends as a query parameter in the authorization request.
- A random number that the script generates during the login, when the request doesn't include a valid `abTestingKey` value.

The following example tests whether adding Email OTP as a second step affects logins. Users with a value above 50 log in with a password and Email OTP, and the rest log in with a password only.

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Go to the **Login Flow** tab and set up the following steps:

    - **Step 1** - Username & Password
    - **Step 2** - Email OTP

3. Turn on **Conditional Authentication** and add the following script.

    ```javascript
    var onLoginRequest = function (context) {
        var abValue = null;
        var params = context.request.params;

        // Use abTestingKey from the query string if it is present and numeric.
        if (params && params.abTestingKey && params.abTestingKey.length > 0) {
            var parsed = parseInt(params.abTestingKey[0], 10);
            if (!isNaN(parsed)) {
                abValue = parsed;
            } else {
                Log.debug('abTestingKey is not a number: ' + params.abTestingKey[0] + '. Using a random value.');
            }
        }

        // Otherwise, pick a random number from 1 to 100.
        if (abValue === null) {
            abValue = Math.floor(Math.random() * 100) + 1;
        }

        Log.debug('A/B testing value for this login: ' + abValue);

        if (abValue > 50) {
            // Group B: password, then Email OTP.
            executeStep(1);
            executeStep(2);
        } else {
            // Group A: password only.
            executeStep(1);
        }
    };
    ```

4. Click **Update** to save the login flow.

To try out each version, add the `abTestingKey` query parameter to the authorization request of your application. For example, the following request shows version B, because its value is `76`. Change the value to `32` to see version A.

```bash
https://api.asgardeo.io/t/{organization_name}/oauth2/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=openid&response_type=code&abTestingKey=76
```

!!! note
    When the request doesn't include `abTestingKey`, the script picks a new random value for every login, so the same user may see a different version each time. To keep users on the same version, have your application send the same `abTestingKey` value for each user.

!!! warning
    Users can change the query parameters of the authorization request and pick their version. In this example, a user can skip Email OTP by sending a value of 50 or lower. Use A/B tests to compare optional steps, and don't rely on them to enforce security requirements.

## Measure the results

Use the following options to compare how each version performs:

- [Moesif analytics]({{base_path}}/guides/insights/data-published-to-moesif/) - {{product_name}} publishes an event for each step of a login, registration or recovery flow. Build a funnel on these events and group it by the first step of each version.
- [Web analytics]({{base_path}}/guides/analytics/web-analytics-solutions/) - Send login and account recovery page events to Google Analytics or Mixpanel, and compare the events of each version.

{% else %}

# A/B Testing with WSO2 Identity Server

A/B testing is a method used for comparing two variants of a web page to determine which one performs better. When you integrate WSO2 Identity Server with your application, for example, to implement a login page, you can verify its usability using an A/B test.

Imagine your login page allows [self-registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration). You may want to test alternate registration page layouts to understand which one will result in more user registrations. You may also want to test whether asking for fewer information from users during registration would result in more registrations.

WSO2 Identity Server allows you to easily perform A/B testing using [VWO](https://vwo.com/).

## Setting up A/B Testing with VWO

Follow the steps below to set up A/B Testing for {{product_name}} with VWO.

1. Create an A/B test in VWO. To do so, refer to its [knowledge base](https://help.vwo.com/hc/en-us/articles/360021171954-How-to-Create-an-A-B-Test-in-VWO-) for instructions.

2. Get the **smart code** provided for the test.

3. Enable VWO for your website by adding the smart code to the appropriate web pages of your application.

## Examples

A sample test configured for the self-registration page would look like this in VWO:
![vwo-settings]({{base_path}}/assets/img/guides/analytics/ab-testing/vwo-settings.png)

A report like the one below will be available with the test results:
![vwo-report]({{base_path}}/assets/img/guides/analytics/ab-testing/vwo-report.png)

{% endif %}
