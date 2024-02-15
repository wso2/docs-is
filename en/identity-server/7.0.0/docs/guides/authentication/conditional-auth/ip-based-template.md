{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}

# Add MFA based on IP address

You can secure the login flow based on the user's IP address by applying the **IP-Based** conditional authentication template to your application. This template prompts two-factor authentication for users who log in from outside a given IP range (such as external networks or other geographical locations).

## Scenario

Consider a scenario where the internal IPs of an organization are as follows: `192.168.1.0/24, 10.100.0.0/16`. The login flow should be stepped up with TOTP when users log in from outside this IP range as follows:

1. Username and password
2. TOTP

Users who log in from the internal network should be allowed to simply log in with their username and password.

![IP address based adaptive authentication]({{base_path}}/assets/img/guides/conditional-auth/ip-based-adaptive-auth.png)

## Prerequisites

You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

## Configure the login flow

To enable conditional authentication:

1. On the {{product_name}} Console, click **Applications**.

2. Select the relevant application and go to it's **Sign-in Method** tab.

3. Add IP-based adaptive MFA using your preferred editor:

    ---
    === "Classic Editor"
        To add IP-based adaptive MFA using the classic editor:

        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **Environment > IP-Based** template.

    === "Visual Editor"
        To add IP-based adaptive MFA using the visual editor:

        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Environment**.

        2. Click **+ ADD** next to **IP-Based** to add the IP-based adaptive MFA script.

            ![IP-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/ip-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        3. Click **Confirm** to replace any existing script with the selected predefined script.

    ---

4. Verify that the login flow is now updated with the following two authentication steps:

    - Step 1: Username and Password
    - Step 2: TOTP

5. Update the following parameter in the script.

    <table>
        <thead>
            <tr>
                <th>Parameter</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>corpNetwork</code></td>
                <td>Comma separated list of IP addresses. Two-factor authentication should apply when users log in from outside this range. The default values in the template are <code>192.168.1.0/24</code> and <code>10.100.0.0/16</code>.</td>
            </tr>
        </tbody>
    </table>

6. Click **Update** to confirm.

## How it works

Shown below is the script of the IP-based conditional authentication template.

```js
// This script will step up authentication for any user who are trying to log in outside from the configured network

// Configure the network ranges here
var corpNetwork = ['192.168.1.0/24', '10.100.0.0/16'];

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            var user = context.currentKnownSubject;
            // Extracting the origin IP of the request
            var loginIp = context.request.ip;
            Log.info('User: ' + user.username + ' logged in from IP: ' + loginIp);
            // Checking if the IP is within the allowed range
            if (!isCorporateIP(loginIp, corpNetwork)) {
                executeStep(2);
            }
        }
    });
};

// Function to convert ip address string to long value
var convertIpToLong = function(ip) {
    var components = ip.split('.');
    if (components) {
        var ipAddr = 0, pow = 1;
        for (var i = 3; i >= 0; i -= 1) {
            ipAddr += pow * parseInt(components[i]);
            pow *= 256;
        }
        return ipAddr;
    } else {
        return -1;
    }
};

// Function to check if the ip address is within the given subnet
var isCorporateIP = function(ip, subnets) {
    var subnetLength = subnets.length;
    for (var i = 0; i < subnetLength; i++) {
        var subnetComponents = subnets[i].split('/');
        var minHost = convertIpToLong(subnetComponents[0]);
        var ipAddr = convertIpToLong(ip);
        var mask = subnetComponents[1];
        if (subnetComponents && minHost >= 0) {
            var numHosts = Math.pow(2, 32 - parseInt(mask));
            if ((ipAddr >= minHost) && (ipAddr <= minHost + numHosts - 1)) {
                return true;
            }
        }
    }
    return false;
};
```

Let's look at how this script works.

1. The **convertIpToLong** function converts and returns the provided IP address as a long value.

2. The **isCorporateIP** function returns whether the user's IP address is in the given range. This method accepts two inputs. The
first argument is the IP address that should be validated and the second argument is the allowed IP range.

3. When step 1 of the authentication flow is complete, the **onLoginRequest** function retrieves the IP
address of the user from the context.

4. This IP address is passed to the _isCorporateIP_ function along with the
configured IP address range.

5. If the IP address of the logged-in user is not in the configured IP range, step 2 of the authentication flow is
executed.

!!! note
    Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Try to log in with a user whose IP address is in the configured range. You will successfully log in to the application.

3. Log out of the application.

4. Log in with a user who does not belong to the configured IP address range. TOTP authentication is prompted.

    ![ip-based-2fa-conditional-auth-totp-page]({{base_path}}/assets/img/guides/conditional-auth/totp-step-up.png){: width="300" style="border: 0.3px solid lightgrey;"}
