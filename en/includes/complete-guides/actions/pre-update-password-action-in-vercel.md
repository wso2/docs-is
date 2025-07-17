## Using Vercel

In this section, we will walk through how to implement and deploy the Pre-Update Profile Action using Vercel, based on
the scenario discussed earlier.

This implementation is done using Node.js and follows the logic of validating user passwords against the Have I Been
Pwned (HIBP) service to prevent users from setting passwords that have been exposed in known data breaches.

The deployment is handled through Vercel’s serverless functions capability, which makes it very easy to expose APIs
without needing to manage your own servers.

### Set Up Your Node.js Project

First, create a new project folder on your local machine by opening your terminal or command prompt and executing:

```bash
mkdir password-update-validator
cd password-update-validator
```

This creates a folder named `password-update-validator` and moves you into it.

Initialize a new Node.js project by running:

```bash
npm init -y
```

This will generate a `package.json` file, which manages your project’s metadata and dependencies. The `-y` flag
automatically accepts all default settings, so you don't have to manually answer prompts. Please make sure to open the
generated `package.json` file and set the value of `type` to `module`.

Install required dependencies. We will use the following libraries:

* express — To create and manage the HTTP server and define API routes 
* validator — To perform validation checks such as ensuring valid JSON payloads 
* axios — To make HTTP requests to external services like the HIBP API

Run the following command to install the libraries:

```bash
npm install express validator axios
```

These libraries will be downloaded into a `node_modules` directory, and your `package.json` will update with these new
dependencies under `dependencies`.

### Create the API Structure for Vercel

Inside the project folder, create a new folder called api.

```bash
mkdir api
```

This api folder will contain the serverless function file — in Vercel, any file inside `api/` becomes a separate API
endpoint automatically.

Inside the api folder, create a new file named `index.js` to expose the API.

```bash
touch api/index.js
```

### Add the Profile Update Validation Logic

Implement the following basic structure to the `api/index.js` file. This will serve as the foundation for implementing 
the password update validation logic:

```JavaScript
import express from "express";
import crypto from "node:crypto";
import validator from "validator";
import axios from "axios";
import { json } from "express";
import util from "util";

const app = express();

const PORT = 3000;

app.use(json({limit: "100kb"}));
```

Implement the `/passwordcheck` API endpoint by creating a POST API that listens for user password update requests from 
{{product_name}}.

```JavaScript
app.post("/passwordcheck", async (req, res) => {
    logRequest(req);
    try {
        if (!validator.isJSON(JSON.stringify(req.body))) {
            const response = {
                actionStatus: "ERROR",
                error: "invalid_request",
                errorDescription: "Invalid JSON payload."
            };
            logResponse(req, response);
            return res.status(400).json(response);
        }

        const cred = req.body?.event?.user?.updatingCredential;
        if (!cred || cred.type !== "PASSWORD") {
            const response = {
                actionStatus: "ERROR",
                error: "invalid_credential",
                errorDescription: "No password credential found."
            };
            logResponse(req, response);
            return res.status(400).json(response);
        }

        // Handle encrypted (base64-encoded) or plain text passwords
        let plain = cred.value;
        if (cred.format === "HASH") {
            try {
                plain = Buffer.from(cred.value, "base64").toString("utf8");
            } catch {
                const response = {
                    actionStatus: "ERROR",
                    error: "invalid_credential",
                    errorDescription: "Expects the encrypted credential."
                };
                logResponse(req, response);
                return res.status(400).json(response);
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
            const response = {
                actionStatus: "FAILED",
                failureReason: "password_compromised",
                failureDescription: "The provided password is compromised."
            };
            logResponse(req, response);
            return res.status(200).json(response);
        }

        const response = { actionStatus: "SUCCESS" };
        logResponse(req, response);
        return res.status(200).json(response);
    } catch (err) {
        console.error("Service Error: ", err);
        const status = err.response?.status || 500;
        const msg =
            status === 429
                ? "External HIBP rate limit hit—try again in a few seconds."
                : err.message || "Unexpected server error";
        const response = { error: msg };
        logResponse(req, response);
        res.status(status).json(response);
    }
});
```

The above source code includes the following embedded logic that is honored during execution.

* JSON Validation: Ensures the incoming request body is valid JSON before proceeding with further checks. 
* Credential Extraction: Extracts the password credential from the request and verifies that the type is PASSWORD. 
* Password Decoding: Handles both plain text and base64-encoded (hashed) passwords by decoding if necessary. 
* HIBP Check: Uses the Have I Been Pwned (HIBP) API to check if the SHA-1 hash of the password appears in known data breaches. 
* Compromised Password Handling: If the password is found in HIBP data, the request is marked as failed and the user is notified that the password is compromised. 
* Success Response: If the password is not found in HIBP records, a success status is returned indicating the password is safe. 
* Error Handling: Gracefully handles unexpected errors or rate-limiting from the HIBP API and responds with a meaningful error message.
* Logging: Logs the request and response for debugging purposes.

The final source code should look similar to the following.

```JavaScript
import express from "express";
import crypto from "node:crypto";
import validator from "validator";
import axios from "axios";
import { json } from "express";
import util from "util";

const app = express();

const PORT = 3000;

app.use(json({limit: "100kb"}));

const logRequest = (req) => {
    console.log("Request Received", {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: util.inspect(req.body, { depth: null })
    });
};

const logResponse = (req, resBody) => {
    console.log("Response Sent", {
        url: req.originalUrl,
        responseBody: util.inspect(resBody, { depth: null })
    });
};

app.get("/", (req, res) => {
    logRequest(req);
    const response = { message: "Pre-password update service up and running!", status: "OK" };
    logResponse(req, response);
    res.json(response);
});

app.post("/passwordcheck", async (req, res) => {
    logRequest(req);
    try {
        if (!validator.isJSON(JSON.stringify(req.body))) {
            const response = {
                actionStatus: "ERROR",
                error: "invalid_request",
                errorDescription: "Invalid JSON payload."
            };
            logResponse(req, response);
            return res.status(400).json(response);
        }

        const cred = req.body?.event?.user?.updatingCredential;
        if (!cred || cred.type !== "PASSWORD") {
            const response = {
                actionStatus: "ERROR",
                error: "invalid_credential",
                errorDescription: "No password credential found."
            };
            logResponse(req, response);
            return res.status(400).json(response);
        }

        // Handle encrypted (base64-encoded) or plain text passwords
        let plain = cred.value;
        if (cred.format === "HASH") {
            try {
                plain = Buffer.from(cred.value, "base64").toString("utf8");
            } catch {
                const response = {
                    actionStatus: "ERROR",
                    error: "invalid_credential",
                    errorDescription: "Expects the encrypted credential."
                };
                logResponse(req, response);
                return res.status(400).json(response);
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
            const response = {
                actionStatus: "FAILED",
                failureReason: "password_compromised",
                failureDescription: "The provided password is compromised."
            };
            logResponse(req, response);
            return res.status(200).json(response);
        }

        const response = { actionStatus: "SUCCESS" };
        logResponse(req, response);
        return res.status(200).json(response);
    } catch (err) {
        console.error("Service Error: ", err);
        const status = err.response?.status || 500;
        const msg =
            status === 429
                ? "External HIBP rate limit hit—try again in a few seconds."
                : err.message || "Unexpected server error";
        const response = { error: msg };
        logResponse(req, response);
        res.status(status).json(response);
    }
});

app.listen(PORT, () => {
    console.log(
        `Pre-password update service started on http://localhost:${PORT}` +
        "\npress Ctrl+C to stop"
    );
});

export default app;
```

### Configure Vercel Settings

Create a vercel.json file at the root of the project which instructs Vercel to route all incoming traffic to the
`api/index.js` where your logic resides:

```bash
touch vercel.json
```

Add the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

#### Install Vercel CLI (Optional for Local Testing)

If you want to test the API locally using Vercel’s CLI, install it globally:

```bash
npm install -g vercel
```

Now you can use the vercel command to deploy or test locally. To run the project locally:

```bash
vercel dev
```

This will simulate the Vercel environment locally and allow you to access your API on `http://localhost:3000/<endpoint-name>`.

### Push Your Code to GitHub

First, initialize a Git repository in your project folder:

```bash
git init
```

Then, add all your project files to the Git repository. Make sure not to commit files containing sensitive information
or unnecessary files, you can use the `.gitignore` file to exclude them.

```bash
git add .
```

Commit your changes with a message:

```bash
git commit -m "Initial commit for Vercel deployment"
```

Finally, link your local Git repository to a remote repository (e.g., on GitHub) and push your code:

```bash
git remote add origin https://github.com/yourusername/yourrepository.git
git push -u origin master
```

This makes your code available in the cloud and allows easy collaboration or version control.

### Deploy to Vercel

Log in to the Vercel Dashboard, click on **Add New > Project**, and import the GitHub repository you pushed earlier.

![Vercel Add Project]({{base_path}}/assets/img/complete-guides/actions/image19.png)

During the setup:

* Confirm that Vercel detects the correct root folder structure (API functions).

Finally, deploy the project. Vercel will automatically build and host your serverless functions. Once deployed, you'll
receive a live endpoint URL that you can use under Domains.

![Vercel Deployed Project]({{base_path}}/assets/img/complete-guides/actions/image20.png)

### Test Deployed Service

To test the deployed service, you will need the URL (extracted from Domains). A sample request for a successful 
scenario is shown below.

```cURL
curl --location 'https://<domains_url>/passwordcheck' \
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

Add an action name, the endpoint extracted from the deployment, and the appropriate authentication mechanism. For
Vercel, append the endpoint name defined in the source code to the generated Vercel domain URL and set the
authentication mechanism to `None`. For the password sharing mechanism, you can use either SHA-256 hashed or plain text,
as the implementation supports both formats.
