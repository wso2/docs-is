## Using Vercel

In this section, we will walk through how to implement and deploy the Pre-Update Profile Action using Vercel, based on
the scenario discussed earlier.

This implementation is done using Node.js and follows the logic of validating user department updates and notifying the
security team when sensitive user attributes are changed.

The deployment is handled through Vercel’s serverless functions capability, which makes it very easy to expose APIs
without needing to manage your own servers.

### Set Up Your Node.js Project

First, create a new project folder on your local machine by opening your terminal or command prompt and executing:

```bash
mkdir profile-update-validator
cd profile-update-validator
```

This creates a folder named `profile-update-validator` and moves you into it.

Initialize a new Node.js project by running:

```bash
npm init -y
```

This will generate a `package.json` file, which manages your project’s metadata and dependencies. The `-y` flag
automatically accepts all default settings, so you don't have to manually answer prompts.

Install required dependencies. We will use the following libraries:

* nodemailer — To send email notifications
* dotenv — To securely load sensitive environment variables from a `.env` file

Run the following command to install the libraries:

```bash
npm install nodemailer dotenv
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

Inside the api folder, create a new file named `validate-user-profile-update.js` to expose the API.

```bash
touch api/validate-user-profile-update.js
```

### Add the Profile Update Validation Logic

Implement the following basic structure to the `api/validate-user-profile-update.js` file. This will serve as the foundation
for implementing the profile update validation logic:

```JavaScript
const nodemailer = require('nodemailer');
require("dotenv").config();

const VALID_API_KEY = process.env.API_KEY; // Replace with your actual key
```

Add a helper function that looks through the incoming user data (claims) and picks out specific information like
department, email, or phone number based on the provided field name.

```JavaScript
// Helper to extract claim values
const getClaimValue = (claims, uri) => {
  const claim = claims.find(c => c.uri === uri);
  return claim ? claim.value : null;
};
```

Create a list of departments that are considered valid for your organization. Also, set up an email service (using
Nodemailer) to send notifications when sensitive user profile updates happen. We will use a service like Mailtrap for
development testing.

```JavaScript
// Mock: valid department list (simulating a directory check)
const validDepartments = ["Engineering", "HR", "Sales", "Finance"];

// Email transporter config using environment variables
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // The hostname should be smtp.gmail.com if Gmail is used.
  port: 2525, // The port should be 465 smtp.gmail.com if Gmail is used.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

Implement the `/validate-user-profile-update` API endpoint by creating a POST API that listens for user profile update
requests from {{product_name}}.

```JavaScript
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Validate API key from headers
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== VALID_API_KEY) {
    return res.status(401).json({
      actionStatus: 'FAILED',
      failureReason: 'unauthorized',
      failureDescription: 'Invalid or missing API key.',
    });
  }

  const payload = req.body;

  if (payload.actionType !== "PRE_UPDATE_PROFILE") {
    return res.status(200).json({
      actionStatus: "FAILED",
      failureReason: "invalid_input",
      failureDescription: "Invalid actionType provided."
    });
  }

  const claims = payload?.event?.request?.claims || [];
  const userId = payload?.event?.user?.id || "Unknown User";

  const department = getClaimValue(claims, "http://wso2.org/claims/department");
  const email = getClaimValue(claims, "http://wso2.org/claims/emailaddress");
  const phone = getClaimValue(claims, "http://wso2.org/claims/mobile");

  // Department validation
  if (department && !validDepartments.includes(department)) {
    return res.status(200).json({
      actionStatus: "FAILED",
      failureReason: "invalid_department_input",
      failureDescription: "Provided user department value is invalid."
    });
  }

  // Send security alert email if sensitive attributes are being updated
  const changes = [];
  if (department) changes.push(`Department: ${department}`);
  if (email) changes.push(`Email: ${email}`);
  if (phone) changes.push(`Phone: ${phone}`);

  if (changes.length > 0) {
    try {
      await transporter.sendMail({
        from: '"Security Alert" <security-notifications@test.com>',
        to: "security-team@test.com", // Replace with actual security email
        subject: "Sensitive Attribute Update Request",
        text: `User ${userId} is attempting to update:\n\n${changes.join("\n")}`
      });
    } catch (error) {
      console.error("Failed to send security email:", error);
      return res.status(200).json({
        actionStatus: "FAILED",
        failureReason: "email_error",
        failureDescription: "Failed to notify security team about sensitive data update."
      });
    }
  }

  return res.status(200).json({actionStatus: "SUCCESS"});
};
```

The above source code includes the following embedded logic that is honored during execution.

* API Key Validation: Ensures that only requests with a valid API key (passed in headers) are processed.
* Department Validation: Checks if the department field in the user’s updated profile belongs to an allowed list.
* Security Notification: If sensitive fields like email, phone, or department are changed, an email alert is sent to the
  security team.
* Error Handling: If email sending fails, the service responds with an appropriate failure status.

The final source code should look similar to the following.

```JavaScript
const nodemailer = require('nodemailer');
require("dotenv").config();

// Mock: valid department list (simulating a directory check)
const validDepartments = ["Engineering", "HR", "Sales", "Finance"];
const VALID_API_KEY = process.env.API_KEY; // Replace with your actual key

// Email transporter config using environment variables
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper to extract claim values
const getClaimValue = (claims, uri) => {
  const claim = claims.find(c => c.uri === uri);
  return claim ? claim.value : null;
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Validate API key from headers
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== VALID_API_KEY) {
    return res.status(401).json({
      actionStatus: 'FAILED',
      failureReason: 'unauthorized',
      failureDescription: 'Invalid or missing API key.',
    });
  }

  const payload = req.body;

  if (payload.actionType !== "PRE_UPDATE_PROFILE") {
    return res.status(200).json({
      actionStatus: "FAILED",
      failureReason: "invalid_input",
      failureDescription: "Invalid actionType provided."
    });
  }

  const claims = payload?.event?.request?.claims || [];
  const userId = payload?.event?.user?.id || "Unknown User";

  const department = getClaimValue(claims, "http://wso2.org/claims/department");
  const email = getClaimValue(claims, "http://wso2.org/claims/emailaddress");
  const phone = getClaimValue(claims, "http://wso2.org/claims/mobile");

  // Department validation
  if (department && !validDepartments.includes(department)) {
    return res.status(200).json({
      actionStatus: "FAILED",
      failureReason: "invalid_department_input",
      failureDescription: "Provided user department value is invalid."
    });
  }

  // Send security alert email if sensitive attributes are being updated
  const changes = [];
  if (department) changes.push(`Department: ${department}`);
  if (email) changes.push(`Email: ${email}`);
  if (phone) changes.push(`Phone: ${phone}`);

  if (changes.length > 0) {
    try {
      await transporter.sendMail({
        from: '"Security Alert" <security-notifications@test.com>',
        to: "security-team@test.com", // Replace with actual security email
        subject: "Sensitive Attribute Update Request",
        text: `User ${userId} is attempting to update:\n\n${changes.join("\n")}`
      });
    } catch (error) {
      console.error("Failed to send security email:", error);
      return res.status(200).json({
        actionStatus: "FAILED",
        failureReason: "email_error",
        failureDescription: "Failed to notify security team about sensitive data update."
      });
    }
  }

  return res.status(200).json({actionStatus: "SUCCESS"});
};

```

Create a .env file at the root of your project to keep your sensitive data secure instead of hardcoding it into your
source code. The file is primarily used for local testing, but these are included separately in the Vercel deployment.

```bash
touch .env
```

Add the following content:

```bash
EMAIL_USER=your-smtp-username
EMAIL_PASS=your-smtp-password
API_KEY=your-secure-api-key
```

### Configure Vercel Settings

Create a vercel.json file at the root of the project which instructs Vercel to route all incoming traffic to the `api/`
folder where your logic resides:

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

Then, add all your project files to the Git repository:

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

![Vercel Add Project]({{base_path}}/assets/img/complete-guides/actions/image7.png)

During the setup:

* Set your environment variables (`EMAIL_USER`, `EMAIL_PASS`, `API_KEY`) securely via the Vercel dashboard.
* Confirm that Vercel detects the correct root folder structure (API functions).

Finally, deploy the project. Vercel will automatically build and host your serverless functions. Once deployed, you'll
receive a live endpoint URL that you can use under Domains.

![Vercel Deployed Project]({{base_path}}/assets/img/complete-guides/actions/image8.png)

### Configure {{product_name}} for Pre-Update Profile Action Workflow

First, sign in to your {{product_name}} account using your admin credentials, click on "Actions" and then select the
action type Pre Update Profile.

Add an action name, the endpoint extracted from the deployment, and the appropriate authentication mechanism. For
Vercel, append the endpoint name defined in the source code to the generated Vercel domain URL, and set the
authentication mechanism to use an API key with the header name `api-key` and the value defined in the environment
variables.
