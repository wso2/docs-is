## Using AWS Lambda

This section describes how to implement the Pre-Update Password Action scenario using AWS Lambda with Node.js. In this
approach, the validation logic is implemented in a Lambda function that checks whether a user’s password is compromised
using the Have I Been Pwned (HIBP) API. If the password has been compromised, the user is disallowed from setting it.

The Lambda function queries the HIBP API to verify if the provided password appears in the database of known compromised
passwords.

### Set Up Your Node.js Project

Create a folder to hold your Lambda source code and its dependencies, so it can be packaged as a ZIP file to be uploaded
as a Lambda function.

```bash
mkdir password-update-validator
cd password-update-validator
```

Run the following command to generate a `package.json` file which helps manage your project dependencies:

```bash
npm init -y
```

This creates a basic `package.json` with default values. The `-y` flag automatically accepts all default settings, so 
you don't have to manually answer prompts.

Install required dependencies for the use case. The Lambda function requires the following packages:

* axios – Enables the function to make HTTP requests to external services like the Have I Been Pwned (HIBP) API. 
* validator – Enables the function to validate input, such as checking if a string is in valid JSON format.

```bash
npm install axios validator
```

### Create the Lambda Source Files for Deployment

Create a new file named `index.js`, which will contain the implementation of the Lambda function.

```bash
touch index.js
```

Define the initial structure in the `index.js` file as shown below; this will lay the groundwork for building the
password update validation logic.

```JavaScript
const crypto = require("crypto");
const validator = require("validator");
const axios = require("axios");
```

Implement the Lambda function that listens for user password update requests from {{product_name}}.

```JavaScript
module.exports = async (req, res) => {
  try {
    if (req.method === "GET" && req.path === "/") {
      return res.status(200).json({
        message: "Pre-password update service up and running!",
        status: "OK",
      });
    }

    if (req.method === "POST" && req.path === "/passwordcheck") {
      if (!validator.isJSON(JSON.stringify(req.body))) {
        return res.status(400).json({
          actionStatus: "ERROR",
          error: "invalid_request",
          errorDescription: "Invalid JSON payload."
        });
      }

      const cred = req.body?.event?.user?.updatingCredential;
      if (!cred || cred.type !== "PASSWORD") {
        return res.status(400).json({
          actionStatus: "ERROR",
          error: "invalid_credential",
          errorDescription: "No password credential found."
        });
      }

      // Handle encrypted (base64-encoded) or plain text passwords
      let plain = cred.value;
      if (cred.format === "HASH") {
        try {
          plain = Buffer.from(cred.value, "base64").toString("utf8");
        } catch {
          return res.status(400).json({
            actionStatus: "ERROR",
            error: "invalid_credential",
            errorDescription: "Expects the encrypted credential."
          });
        }
      }

      const sha1 = crypto.createHash("sha1").update(plain).digest("hex").toUpperCase();
      const prefix = sha1.slice(0, 5);
      const suffix = sha1.slice(5);

      const hibpResp = await axios.get(
              `https://api.pwnedpasswords.com/range/${prefix}`,
              {
                headers: {
                  "Add-Padding": "true",
                  "User-Agent": "hibp-demo"
                }
              }
      );

      const hitLine = hibpResp.data
              .split("\n")
              .find((line) => line.startsWith(suffix));

      const count = hitLine ? parseInt(hitLine.split(":")[1], 10) : 0;

      if (count > 0) {
        return res.status(200).json({
          actionStatus: "FAILED",
          failureReason: "password_compromised",
          failureDescription: "The provided password is compromised."
        });
      }

      return res.json({
        actionStatus: "SUCCESS",
        message: "Password is not compromised."
      });
    }

    return res.status(404).json({
      error: "Not Found",
      message: "Invalid route or method."
    });
  } catch (err) {
    console.error("🔥", err);
    const status = err.response?.status || 500;
    const msg =
            status === 429
                    ? "External HIBP rate limit hit—try again in a few seconds."
                    : err.message || "Unexpected server error";
    return res.status(status).json({error: msg});
  }
};
```

The above source code performs the following key tasks to help fulfill the use case defined earlier in this document:

* It exposes a simple health check endpoint (`GET /`) that returns a `200 OK` response, confirming the service is
  running.
* It defines a `POST /passwordcheck` endpoint to process password credential validation requests.
* It validates that the request payload is a valid JSON structure, returning an error if not.
* It extracts the credential object from the event payload, and checks whether a password credential is present; returns
  an error response if the credential is missing or not of type `PASSWORD`.
* It handles both plain text and encrypted (Base64-encoded SHA-1 hash) passwords, decoding the credential value if it's
  in hashed format.
* It calculates the SHA-1 hash of the password and uses the Have I Been Pwned (HIBP) API’s k-anonymity model to check
  whether the password has been exposed in known data breaches.
* It sends only the first 5 characters of the SHA-1 hash to the HIBP API and then searches the returned suffixes for a
  match with the rest of the hash.
* If the password has been compromised, it returns an actionStatus: `FAILED` response with an appropriate reason and
  description.
* If the password is not found in any known breaches, it returns an actionStatus: `SUCCESS` response.
* It handles unexpected errors (e.g., HTTP errors from HIBP) and returns a relevant message, including handling HIBP
  rate limits (`429 Too Many Requests`).

The final source code should look similar to the following.

```JavaScript
const crypto = require("crypto");
const validator = require("validator");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    if (req.method === "GET" && req.path === "/") {
      return res.status(200).json({
        message: "Pre-password update service up and running!",
        status: "OK",
      });
    }

    if (req.method === "POST" && req.path === "/passwordcheck") {
      if (!validator.isJSON(JSON.stringify(req.body))) {
        return res.status(400).json({
          actionStatus: "ERROR",
          error: "invalid_request",
          errorDescription: "Invalid JSON payload."
        });
      }

      const cred = req.body?.event?.user?.updatingCredential;
      if (!cred || cred.type !== "PASSWORD") {
        return res.status(400).json({
          actionStatus: "ERROR",
          error: "invalid_credential",
          errorDescription: "No password credential found."
        });
      }

      // Handle encrypted (base64-encoded) or plain text passwords
      let plain = cred.value;
      if (cred.format === "HASH") {
        try {
          plain = Buffer.from(cred.value, "base64").toString("utf8");
        } catch {
          return res.status(400).json({
            actionStatus: "ERROR",
            error: "invalid_credential",
            errorDescription: "Expects the encrypted credential."
          });
        }
      }

      const sha1 = crypto.createHash("sha1").update(plain).digest("hex").toUpperCase();
      const prefix = sha1.slice(0, 5);
      const suffix = sha1.slice(5);

      const hibpResp = await axios.get(
              `https://api.pwnedpasswords.com/range/${prefix}`,
              {
                headers: {
                  "Add-Padding": "true",
                  "User-Agent": "hibp-demo"
                }
              }
      );

      const hitLine = hibpResp.data
              .split("\n")
              .find((line) => line.startsWith(suffix));

      const count = hitLine ? parseInt(hitLine.split(":")[1], 10) : 0;

      if (count > 0) {
        return res.status(200).json({
          actionStatus: "FAILED",
          failureReason: "password_compromised",
          failureDescription: "The provided password is compromised."
        });
      }

      return res.json({
        actionStatus: "SUCCESS",
        message: "Password is not compromised."
      });
    }

    return res.status(404).json({
      error: "Not Found",
      message: "Invalid route or method."
    });
  } catch (err) {
    console.error("🔥", err);
    const status = err.response?.status || 500;
    const msg =
            status === 429
                    ? "External HIBP rate limit hit—try again in a few seconds."
                    : err.message || "Unexpected server error";
    return res.status(status).json({error: msg});
  }
};

```

### Create the Deployment Package

Since this project includes external libraries, the Lambda function needs to be packaged as a ZIP archive before
uploading:

```bash
zip -r validate-user-password-update.zip .
```

This command includes all necessary files (`index.js`, `node_modules`) required by AWS Lambda.

### Deploy the Function on AWS Lambda

Log in to the AWS Dashboard and navigate to the AWS Lambda Console. Once there, click Create function and choose Author
from scratch.

![AWS Create Function]({{base_path}}/assets/img/complete-guides/actions/image10.png)

Then, fill in the following details and create the function:

* Function name: validate-user-password-update
* Runtime: Node.js 22.x
* Architecture: x86
* Permissions: Choose an existing role or create a new one with basic Lambda permissions.

Once the function is created, go to the Code tab, upload the ZIP file (validate-user-password-update.zip) that was
created earlier, and click Save to upload the source code.

![AWS Upload Source Code]({{base_path}}/assets/img/complete-guides/actions/image11.png)

Next, configure the Function URL:

* Navigate to the Configuration tab, then to the Function URL section.
* Click Create function URL and set the Auth type to None.

![AWS Configure Function URL]({{base_path}}/assets/img/complete-guides/actions/image12.png)

The generated function URL will be displayed in the Function overview section of the dashboard. Make sure to note this
URL, as it will be used to expose the function to external services.

### Test Deployed Service

To test the deployed service, you will need the function URL. A sample request for a successful scenario is shown below.

```cURL
curl --location '<function_url>' \
--header 'Content-Type: application/json' \
--data '{
  "actionType": "PRE_UPDATE_PASSWORD",
  "event": {
    "tenant": {
      "id": "2210",
      "name": "testwso2"
    },
    "user": {
      "id": "18b6b431-16e9-4107-a828-33778824c8af",
      "updatingCredential": {
        "type": "PASSWORD",
        "format": "HASH",
        "value": "ec4Zktg/dqruY3ZHVjwTCZ9422Bu0Xi3F56ZcFxkcjU=",
        "additionalData": {
          "algorithm": "SHA256"
        }
      }
    },
    "userStore": {
      "id": "REVGQVVMVA==",
      "name": "DEFAULT"
    },
    "initiatorType": "ADMIN",
    "action": "UPDATE"
  }
}'
```

### Configure {{product_name}} for Pre-Update Password Action Workflow

First, sign in to your {{product_name}} account using your admin credentials, click on "Actions" and then select the
action type Pre Update Password.

Add an action name, the endpoint extracted from the deployment, and the appropriate authentication mechanism. For AWS
Lambda, use the generated function URL directly, and set the authentication mechanism to None, as no authentication is
required. For the password sharing mechanism, you can use either SHA-256 hashed or plain text, as the implementation 
supports both formats.
