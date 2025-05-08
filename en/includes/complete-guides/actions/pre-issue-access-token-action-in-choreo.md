## Using Choreo

In this section, we will walk through how to implement and deploy the Pre-Issue Access Token Action using Choreo based
on the scenario discussed below.

This implementation is done using Node.js and showcases how to enhance access control by incorporating geo-location and
IP reputation intelligence into the token issuance workflow.

In this guide, the scenario we will implement demonstrates a real-world use case involving the Pre-Issue Access Token
action:

* Before issuing an access token, the system will check the originating country or region of the request. If the request
  comes from a restricted location, the token issuance will be blocked immediately.
* If the country is allowed, the system will query the IP address against AbuseIPDB to assess its abuse confidence
  score. Based on the risk level (e.g., high abuse score or suspicious access time), the access token’s validity period
  may be reduced—or the token may be blocked altogether.

This use case demonstrates how you can incorporate location and risk-based intelligence into token issuance workflows,
enhancing security posture and minimizing unauthorized access.

### Set Up Your Node.js Project

Create a new project folder on your local machine. Open your terminal or command prompt and create a new directory where
your project files will be stored. You can do this by running:

```bash
mkdir token-policy-validator
```

This command creates a new folder named `token-policy-validator`. Then, move inside that folder by running:

```bash
cd token-policy-validator
```

Now, any new files or commands you use will be applied inside this project folder. Once you're inside the folder, run:

```bash
npm init -y
```

This will create a file named `package.json` automatically. The `package.json` file is very important, it keeps track of
your project details (like name, version, and dependencies) and will help others (or platforms like Choreo) understand
how to run your project.

The `-y` flag automatically fills in default values for you, so you don’t need to answer any setup questions manually. 
Please make sure to open the generated `package.json` file and set the value of `type` to `module`.

Install the required dependencies. In this guide, we use express to build the service, validator for input validation,
axios to make HTTP requests, and Node.js built-in crypto for secure hashing.

Still inside your project folder, install the necessary libraries by running:

```bash
npm install dotenv express geoip-country
```

dotenv: A zero-dependency module that loads environment variables from a `.env` file into `process.env`, helping you
manage configuration settings securely and cleanly.

express: A fast, lightweight framework that makes building web servers in Node.js very simple and structured.

geoip-country: A lightweight Node.js library that uses a local GeoIP database to quickly determine the country
associated with a given IP address. It requires no external API calls, making it fast and suitable for simple
geolocation checks based on IP.

This command will download the libraries and save them inside a folder called `node_modules` and also update your
package.json file under `dependencies`, showing that your project uses these libraries.

Create a file named index.js and add the following basic structure: In your project folder, create a new file called
index.js. (You can right-click and choose “New File” if using a code editor like VS Code, or create it via terminal
using the command `touch index.js`.)

```JavaScript
import express from "express";
import https from "https";
import geoip from "geoip-country";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
const BLOCKED_COUNTRIES = ["KP", "IR", "RU", "SY", "CN"];
const ABUSEIPDB_API_KEY = process.env.ABUSEIPDB_API_KEY;
const ABUSEIPDB_ENDPOINT = "https://api.abuseipdb.com/api/v2/check";

const EXPIRY_WORKING_HOURS = 900; // 15 minutes
const EXPIRY_NON_WORKING_HOURS = 300; // 5 minutes
```

After saving this file, you will have a basic server ready that you can expand by adding routes (like 
`/validate-token-policy`) in the next steps.

### Implement the Token Validation Policy Logic

Several helper functions are used to support the Pre-Issue Access Token logic in this implementation. 

First, a function retrieves the client’s IP address from the incoming request by inspecting a custom header 
(`x-client-source-ip`) included in the request metadata. 

This IP address is then used in two critical checks. One function performs a country lookup using a geo-location 
database to determine the origin of the request; if the country is restricted, token issuance is denied. 

Another function queries AbuseIPDB to retrieve an abuse confidence score for the IP address, helping identify 
potentially malicious sources. In addition, a helper function checks if the request falls within standard working hours 
(9 AM–5 PM UTC), which can be used to detect anomalous behavior based on access time. 

Finally, utility functions are used to construct either a success or failure response, depending on the outcome of these 
evaluations. 

Together, these helpers enable a dynamic, risk-aware decision-making process during access token issuance.

```JavaScript
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
  const geo = geoip.lookup(ip);
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
```

Implement the `/validate-token-policy` API endpoint by creating a POST API that listens for token issuance requests 
from {{product_name}}.

Inside this API:

* Log the incoming request for debugging and traceability.
* Extract the client’s IP address from the request headers.
* If the IP address is missing or cannot be determined, deny the request by default.
* Use the IP address to resolve the originating country.
* If the country is on the restricted list, block the token issuance and return a denial response.
* Query AbuseIPDB to check the abuse confidence score of the IP address.
* If the score is high (indicating suspicious activity), deny the request.
* If the score is low, allow the token to be issued with default settings.
* If the score is moderate, dynamically adjust the token’s expiration based on whether the request was made during
  working hours or not.
* Handle any errors during the AbuseIPDB check gracefully by denying the request and logging the issue.

```JavaScript
app.post("/validate-token-policy", async (req, res) => {
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
});
```

The final source code should look similar to the following.

```JavaScript
import express from "express";
import https from "https";
import geoip from "geoip-country";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

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
  const geo = geoip.lookup(ip);
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
app.post("/validate-token-policy", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```

### Prepare for Choreo Deployment

Create a `.env` file to store sensitive information by adding a new file named `.env` in your project folder. The file
is primarily used for local testing, but these are included separately in the Choreo deployment.

```bash
touch .env
```

In this file, save your AbuseIPDB API key securely, instead of putting them directly in your code.

```env
ABUSEIPDB_API_KEY=your-abuseipdb-api-key
```

#### Run an Express Node Project Locally

Navigate to the root of your project and install all required dependencies using npm:

```bash
npm install
```

Once dependencies are installed, you can start the Express server using:

```bash
node index.js
```

Or, if a custom script is defined (e.g., dev), run:

```bash
npm run dev
```

This will start the server, and your API will be accessible on:

```bash
http://localhost:3000/<endpoint-name>
```

If you're using tools like nodemon for auto-reloading during development, make sure it's installed and used in the dev
script.

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
git commit -m "Initial commit for Choreo deployment"
```

Finally, link your local Git repository to a remote repository (e.g., on GitHub) and push your code:

```bash
git remote add origin https://github.com/yourusername/yourrepository.git
git push -u origin master
```

This makes your code available in the cloud and allows easy collaboration or version control.

### Deploy on Choreo

Log in to your Choreo Console and create a new project by signing in to your Choreo account and creating a new project
from the dashboard.

![Create Choreo Project]({{base_path}}/assets/img/complete-guides/actions/image2.png)

Within the created project, go to the "Components" section and create a new component. Select 'API Service' as the
component type.

Link your GitHub account and select the token-policy-validator repository that contains your code. Choreo will use
this to build the project.

![Create Choreo Service]({{base_path}}/assets/img/complete-guides/actions/image3.png)

After the build is complete, navigate to the "Deploy" tab, click 'Configure and Deploy', and provide values for any
required environment variables (like AbuseIPDB API key) so that they will be available during execution.

![Setup Choreo Environment_Variables]({{base_path}}/assets/img/complete-guides/actions/image4.png)

For security, make sure to enable the API Key protection mechanism. This will ensure that only authorized users can
access your API.

![Add Choreo API Key Protection]({{base_path}}/assets/img/complete-guides/actions/image5.png)

After the deployment is complete, Choreo will provide a 'Public URL' for your API under **Endpoints >
Endpoint Details**. Be sure to copy this URL for future reference.

Additionally, Go to **Manage > Lifecycle** and click 'Publish' to move your API from the "Created" state to the
"Published" state.

![Choreo API Lifecycle Update]({{base_path}}/assets/img/complete-guides/actions/image6.png)

Once the API is published, navigate to the Dev portal (via the "Go to Devportal" link in the top right corner). In the
Dev portal, go to **Credentials > Sandbox** and generate a new API key. This key is required for accessing the API
securely.

![Create Choreo API Key]({{base_path}}/assets/img/complete-guides/actions/image7.png)

The API key will be generated along with an application in Asgardeo. Copy and save the key securely for later use in
your API calls.

### Test Deployed Service

To test the deployed service, you will need the public URL and the API key. A sample request for a successful scenario
is shown below.

```cURL
curl --location '<public_url>/validate-token-policy' \
--header 'Content-Type: application/json' \
--header 'api-key: <api_key>' \
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
Choreo, append the endpoint name defined in the source code to the generated Choreo URL, and set the authentication
mechanism to use an API key with the header name `api-key` and the value generated through the Dev Portal.
