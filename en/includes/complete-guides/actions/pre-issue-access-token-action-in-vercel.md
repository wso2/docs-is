## Using Vercel

In this section, we will walk through how to implement and deploy the Pre-Issue Access Token Action using Vercel, based
on the real-world scenario described earlier.

This implementation is built using Node.js and includes logic to check the request’s originating country or region
before issuing an access token. If the location is restricted, the token is blocked immediately. Otherwise, the IP
address is checked against AbuseIPDB to determine its abuse confidence score. Based on the score and context, the
token’s validity may be reduced or blocked altogether.

The deployment is handled through Vercel’s serverless functions capability, which makes it very easy to expose APIs
without needing to manage your own servers.

### Set Up Your Node.js Project

First, create a new project folder on your local machine by opening your terminal or command prompt and executing:

```bash
mkdir token-policy-validator
cd token-policy-validator
```

This creates a folder named `token-policy-validator` and moves you into it.

Initialize a new Node.js project by running:

```bash
npm init -y
```

This will generate a `package.json` file, which manages your project’s metadata and dependencies. The `-y` flag
automatically accepts all default settings, so you don't have to manually answer prompts.

Install required dependencies. We will use the following libraries:

* dotenv — To manage environment variables securely by loading them from a `.env` file 
* geoip-lite — To perform IP geolocation lookups and identify the country or region of incoming requests

Run the following command to install the libraries:

```bash
npm install dotenv geoip-lite
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

Inside the api folder, create a new file named `validate-token-policy.js` to expose the API.

```bash
touch api/validate-token-policy.js
```

### Add the Token Policy Validation Logic

Implement the following basic structure to the `api/validate-token-policy.js` file. This will serve as the foundation 
for implementing the token policy validation logic:

```JavaScript
import https from "https";
import geoiplite from "geoip-lite";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const BLOCKED_COUNTRIES = ["KP", "IR", "RU", "SY", "CN"];
const ABUSEIPDB_API_KEY = process.env.ABUSEIPDB_API_KEY;
const ABUSEIPDB_ENDPOINT = "https://api.abuseipdb.com/api/v2/check";

const EXPIRY_WORKING_HOURS = 900; // 15 minutes
const EXPIRY_NON_WORKING_HOURS = 300; // 5 minutes
```

Add the following helper functions, which allow the `/validate-token-policy` API endpoint to validate the request and
process the response.

* getClientIp — Extracts the client’s IP address from the incoming request headers, specifically looking for the
  `x-client-source-ip` header.
* lookupCountry — Uses the geoip-lite library to determine the country based on the provided IP address.
* callAbuseIPDB — Queries the AbuseIPDB API with the given IP address and returns the associated abuse confidence score.
* isWorkingHours — Checks if the current UTC time falls within typical working hours (9 AM to 5 PM UTC).
* denyResponse — Returns a standardized failure response object indicating that access is denied, along with a reason.
* allowResponse — Returns a success response object indicating the action has been approved.

Implement the `/validate-token-policy` API endpoint by creating a POST API that listens for token issuance requests from 
{{product_name}}.

```JavaScript
module.exports = async (req, res) => {
    console.log("Received request:", JSON.stringify(req.body, null, 2));

    const ip = getClientIp(req);
    if (!ip) {
        console.warn("No IP address found. Denying by default.");
        return res.json(denyResponse("Unable to determine client IP."));
    }

    console.log(`Client IP: ${ip}`);

    const country = lookupCountry(ip);
    console.log(`Resolved country: ${country}`);

    if (BLOCKED_COUNTRIES.includes(country)) {
        console.log(`Blocked due to restricted country: ${country}`);
        return res.json(denyResponse(`Access token issuance is blocked from your region (${country}).`));
    }

    try {
        const abuseScore = await callAbuseIPDB(ip);
        console.log(`Abuse Confidence Score: ${abuseScore}`);

        if (abuseScore > 75) {
            console.log(`Blocked due to high abuse score.`);
            return res.json(denyResponse("Access token issuance is blocked due to high IP risk."));
        }

        if (abuseScore < 25) {
            console.log("Low abuse score. Allowing.");
            return res.json(allowResponse());
        }

        const expiry = isWorkingHours() ? EXPIRY_WORKING_HOURS : EXPIRY_NON_WORKING_HOURS;
        console.log(`Allowing with expiry ${expiry} seconds`);

        return res.json({
            actionStatus: "SUCCESS",
            operations: [
                {
                    op: "replace",
                    path: "/accessToken/claims/expires_in",
                    value: expiry.toString()
                }
            ]
        });
    } catch (err) {
        console.error("Error during AbuseIPDB lookup:", err.message);
        return res.json(denyResponse("Error checking IP reputation."));
    }
};
```

The above source code includes the following embedded logic that is honored during execution:

* Client IP Extraction: Retrieves the client’s IP address from the request headers for location and risk evaluation.
* Geolocation Lookup: Determines the country of origin using the IP address and blocks requests from restricted
  countries.
* AbuseIPDB Check: Queries AbuseIPDB to obtain the abuse confidence score of the IP address to assess its risk level.
* High-Risk IP Handling: Denies token issuance if the abuse score exceeds a defined threshold, indicating suspicious or
  malicious activity.
* Dynamic Token Expiry: Adjusts the token validity period based on working hours and moderate abuse scores to minimize
  potential misuse.
* Success Response: Approves the request if the IP is low risk and from an allowed location.
* Error Handling: Gracefully handles issues during IP resolution or AbuseIPDB lookup and returns a failure response when
  needed.

The final source code should look similar to the following.

```JavaScript
import https from "https";
import geoiplite from "geoip-lite";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const BLOCKED_COUNTRIES = ["KP", "IR", "RU", "SY", "CN"];
const ABUSEIPDB_API_KEY = process.env.ABUSEIPDB_API_KEY;
const ABUSEIPDB_ENDPOINT = "https://api.abuseipdb.com/api/v2/check";

const EXPIRY_WORKING_HOURS = 900; // 15 minutes
const EXPIRY_NON_WORKING_HOURS = 300; // 5 minutes

function getClientIp(req) {
    try {
        const headers = req.body?.event?.request?.additionalHeaders || [];
        const ipHeader = headers.find((h) => h.name.toLowerCase() === "x-client-source-ip");
        return ipHeader?.value?.[0] || null;
    } catch (e) {
        console.warn("Failed to parse client IP:", e.message);
        return null;
    }
}

function lookupCountry(ip) {
    const geo = geoiplite.lookup(ip);
    return geo?.country || "UNKNOWN";
}

function callAbuseIPDB(ip) {
    const url = `${ABUSEIPDB_ENDPOINT}?ipAddress=${ip}`;
    const options = {
        method: "GET",
        headers: {
            Key: ABUSEIPDB_API_KEY,
            Accept: "application/json"
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = "";
            res.on("data", (chunk) => data += chunk);
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    const score = parsed?.data?.abuseConfidenceScore ?? 0;
                    resolve(score);
                } catch (err) {
                    reject(new Error("Failed to parse AbuseIPDB response"));
                }
            });
        });

        req.on("error", (err) => {
            reject(err);
        });

        req.end();
    });
}

function isWorkingHours() {
    const hourUTC = new Date().getUTCHours();
    return (hourUTC >= 9 && hourUTC < 17); // 9 AM - 5 PM UTC
}

function denyResponse(reason) {
    return {
        actionStatus: "FAILED",
        failureReason: "access_denied",
        failureDescription: reason
    };
}

function allowResponse() {
    return {actionStatus: "SUCCESS"};
}

// Main route
module.exports = async (req, res) => {
    console.log("Received request:", JSON.stringify(req.body, null, 2));

    const ip = getClientIp(req);
    if (!ip) {
        console.warn("No IP address found. Denying by default.");
        return res.json(denyResponse("Unable to determine client IP."));
    }

    console.log(`Client IP: ${ip}`);

    const country = lookupCountry(ip);
    console.log(`Resolved country: ${country}`);

    if (BLOCKED_COUNTRIES.includes(country)) {
        console.log(`Blocked due to restricted country: ${country}`);
        return res.json(denyResponse(`Access token issuance is blocked from your region (${country}).`));
    }

    try {
        const abuseScore = await callAbuseIPDB(ip);
        console.log(`Abuse Confidence Score: ${abuseScore}`);

        if (abuseScore > 75) {
            console.log(`Blocked due to high abuse score.`);
            return res.json(denyResponse("Access token issuance is blocked due to high IP risk."));
        }

        if (abuseScore < 25) {
            console.log("Low abuse score. Allowing.");
            return res.json(allowResponse());
        }

        const expiry = isWorkingHours() ? EXPIRY_WORKING_HOURS : EXPIRY_NON_WORKING_HOURS;
        console.log(`Allowing with expiry ${expiry} seconds`);

        return res.json({
            actionStatus: "SUCCESS",
            operations: [
                {
                    op: "replace",
                    path: "/accessToken/claims/expires_in",
                    value: expiry.toString()
                }
            ]
        });
    } catch (err) {
        console.error("Error during AbuseIPDB lookup:", err.message);
        return res.json(denyResponse("Error checking IP reputation."));
    }
};

```

Create a .`env` file at the root of your project to keep your sensitive data secure instead of hardcoding it into your
source code. The file is primarily used for local testing, but these are included separately in the Vercel deployment.

```bash
touch .env
```

Add the following content:

```bash
ABUSEIPDB_API_KEY=your-abuseipdb-api-key

```

### Configure Vercel Settings

Create a vercel.json file at the root of the project which instructs Vercel to route all incoming traffic to the`api/` 
where your logic resides:

```bash
touch vercel.json
```

Add the following configuration:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
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

This will simulate the Vercel environment locally and allow you to access your API on `http://localhost:3000/api/<
endpoint-name>`.

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

![Vercel Add Project]({{base_path}}/assets/img/complete-guides/actions/image8.png)

During the setup:

* Set your environment variables (`ABUSEIPDB_API_KEY`) securely via the Vercel dashboard.
* Confirm that Vercel detects the correct root folder structure (API functions).

Finally, deploy the project. Vercel will automatically build and host your serverless functions. Once deployed, you'll
receive a live endpoint URL that you can use under Domains.

![Vercel Deployed Project]({{base_path}}/assets/img/complete-guides/actions/image9.png)

### Test Deployed Service

To test the deployed service, you will need the URL (extracted from Domains). A sample request for a successful
scenario is shown below.

```cURL
curl --location '<public_url>/validate-token-policy' \
--header 'Content-Type: application/json' \
--data '{
  "actionType": "PRE_ISSUE_ACCESS_TOKEN",
  "event": {
    "request": {
      "additionalHeaders": [
        {
          "name": "x-request-id",
          "value": [
            "b523491ab6c6291325cd5a130bef3c16"
          ]
        },
        {
          "name": "x-client-source-ip",
          "value": [
            "205.210.31.51"
          ]
        },
        {
          "name": "postman-token",
          "value": [
            "71a4ec17-4207-436c-b9b1-e9943154828b"
          ]
        }
      ],
      "clientId": "CCm5aWk4TjKgprfH_fmuMI7edDQa",
      "grantType": "client_credentials"
    },
    "tenant": {
      "id": "2210",
      "name": "testwso2"
    },
    "accessToken": {
      "tokenType": "JWT",
      "claims": [
        {
          "name": "iss",
          "value": "https://api.asgardeo.io/t/testwso2/oauth2/token"
        },
        {
          "name": "client_id",
          "value": "CCm5aWk4TjKgprfH_fmuMI7edDQa"
        },
        {
          "name": "aut",
          "value": "APPLICATION"
        },
        {
          "name": "expires_in",
          "value": 3600
        },
        {
          "name": "aud",
          "value": [
            "CCm5aWk4TjKgprfH_fmuMI7edDQa"
          ]
        },
        {
          "name": "subject_type",
          "value": "public"
        },
        {
          "name": "sub",
          "value": "CCm5aWk4TjKgprfH_fmuMI7edDQa"
        }
      ]
    }
  },
  "allowedOperations": [
    {
      "op": "add",
      "paths": [
        "/accessToken/claims/",
        "/accessToken/scopes/",
        "/accessToken/claims/aud/"
      ]
    },
    {
      "op": "remove",
      "paths": [
        "/accessToken/scopes/",
        "/accessToken/claims/aud/"
      ]
    },
    {
      "op": "replace",
      "paths": [
        "/accessToken/scopes/",
        "/accessToken/claims/aud/",
        "/accessToken/claims/expires_in"
      ]
    }
  ]
}'
```

### Configure {{product_name}} for Pre-Issue Access Token Action Workflow

First, sign in to your {{product_name}} account using your admin credentials, click on "Actions" and then select the
action type Pre Issue Access Token.

Add an action name, the endpoint extracted from the deployment, and the appropriate authentication mechanism. For
Vercel, append the endpoint name defined in the source code to the generated Vercel domain URL and set the
authentication mechanism to `None`.
