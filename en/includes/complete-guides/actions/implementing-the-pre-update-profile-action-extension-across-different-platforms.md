## Using Choreo

In this section, we will walk through how to implement and deploy the Pre-Update Profile Action using Choreo based on
the scenario discussed earlier.

This implementation is done using Node.js and follows the logic of validating user department updates and notifying the
security team when sensitive user attributes are changed.

### Set Up Your Node.js Project

Create a new project folder on your local machine. Open your terminal or command prompt and create a new directory where
your project files will be stored. You can do this by running:

```bash
mkdir profile-update-validator
```

This command creates a new folder named profile-update-validator. Then, move inside that folder by running:

```bash
cd profile-update-validator
```

Now, any new files or commands you use will be applied inside this project folder. Once you're inside the folder, run:

```bash
npm init -y
```

This will create a file named package.json automatically. The package.json file is very important, it keeps track of
your project details (like name, version, and dependencies) and will help others (or platforms like Choreo) understand
how to run your project.

The -y flag automatically fills in default values for you, so you don’t need to answer any setup questions manually.

Install required dependencies. We will use express for building the service and nodemailer for sending emails. Still
inside your project folder, install the necessary libraries by running:

```bash
npm install express nodemailer
```

express: A fast, lightweight framework that makes building web servers in Node.js very simple and structured.

nodemailer: A library that makes it easy to send emails from your application.

This command will download the libraries and save them inside a folder called node_modules and also update your
package.json file under "dependencies", showing that your project uses these libraries.

Create a file named index.js and add the following basic structure: In your project folder, create a new file called
index.js. (You can right-click and choose “New File” if using a code editor like VS Code, or create it via terminal.)

```JavaScript
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

After saving this file, you will have a basic server ready that you can expand by adding routes (like
/validate-user-profile-update) in the next steps.

### Implement the Profile Update Validation Logic

Add a helper function that looks through the incoming user data (claims) and picks out specific information like
department, email, or phone number based on the provided field name.

```JavaScript
function getClaimValue(claims, uri) {
    const claim = claims.find(c => c.claimUri === uri);
    return claim ? claim.value : null;
}
```

Create a list of departments that are considered valid for your organization. Also, set up an email service (using
Nodemailer) to send notifications when sensitive user profile updates happen. We will use a service like Mailtrap for
development testing.

```JavaScript
const validDepartments = ["Engineering", "Sales", "HR", "Finance"]; // Example departments
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

Implement the /validate-user-profile-update API endpoint by creating a POST API that listens for user profile update
requests from Asgardeo or WSO2 IS.

Inside this API:

* Check if the request is for a profile update.
* Extract the user’s department, email, and phone details from the request.
* Validate if the department is within the allowed list.
* If sensitive fields are being updated, send an email notification to the security team.
* Send a success or failure response back depending on the validation and email sending outcome.

```JavaScript
app.post("/validate-user-profile-update", async (req, res) => {
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
                from: '"Security Alert" <security-notifications@wso2.com>',
                to: "security-team@wso2.com", // Replace with actual security team email
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
});
```

### Prepare for Choreo Deployment

Create a .env file to store sensitive information by adding a new file named .env in your project folder. The file is
primarily used for local testing, but these are included separately in the Choreo deployment.

```bash
touch .env
```

In this file, save your email service login details (like username and password) securely, instead of putting them
directly in your code.

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

Update your code to read environment variables by installing the dotenv package, which helps your app load the
information from the .env file easily:

```bash
npm install dotenv
```

At the top of your index.js file, add the following line so that your app can access the email credentials:

```bash
require('dotenv').config();
```

#### Run an Express Node Project Locally

Navigate to the root of your project and install all required dependencies using npm:

```bash
npm install
```

Once dependencies are installed, you can start the Express server using:

```bash
npm start
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

Then, add all your project files to the Git repository:

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

![Create Choreo Project]({{base_path}}/assets/img/complete-guides/actions/image1.png){: width="600" style="display:
block; margin: 0;"}

Within the created project, go to the "Components" section and create a new component. Select 'API Service' as the
component type.

Link your GitHub account and select the profile-update-validator repository that contains your code. Choreo will use
this to build the project.

![Create Choreo Service]({{base_path}}/assets/img/complete-guides/actions/image2.png){: width="600" style="display:
block; margin: 0;"}

After the build is complete, navigate to the "Deploy" tab, click 'Configure and Deploy', and provide values for any
required environment variables (like email credentials) so that they will be available during execution.

![Setup Choreo Environment_Variables]({{base_path}}/assets/img/complete-guides/actions/image3.png){: width="600" style="
display: block; margin: 0;"}

For security, make sure to enable the API Key protection mechanism. This will ensure that only authorized users can
access your API.

![Add Choreo API Key Protection]({{base_path}}/assets/img/complete-guides/actions/image4.png){: width="600" style="
display: block; margin: 0;"}

After deployment is complete, Choreo will provide a URL for your API. Make sure to copy this URL for future reference.
Additionally, Go to Manage > Lifecycle and click 'Publish' to move your API from the "Created" state to the "Published"
state.

![Choreo API Lifecycle Update]({{base_path}}/assets/img/complete-guides/actions/image5.png){: width="600" style="
display: block; margin: 0;"}

Once the API is published, navigate to the Dev portal (via the "Go to Devportal" link in the top right corner). In the
Dev portal, go to Credentials > Sandbox and generate a new API key. This key is required for accessing the API securely.

![Create Choreo API Key]({{base_path}}/assets/img/complete-guides/actions/image6.png){: width="600" style="display:
block; margin: 0;"}

The API key will be generated along with an application in Asgardeo. Copy and save the key securely for later use in
your API calls.

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
mkdir profile-update-validator-vercel
cd profile-update-validator-vercel
```

This creates a folder named profile-update-validator-vercel and moves you into it.

Initialize a new Node.js project by running:

```bash
npm init -y
```

This will generate a package.json file, which manages your project’s metadata and dependencies. The `-y` flag
automatically accepts all default settings, so you don't have to manually answer prompts.

Install required dependencies. We will use the following libraries:

* nodemailer — To send email notifications
* dotenv — To securely load sensitive environment variables from a .env file

Run the following command to install the libraries:

```bash
npm install nodemailer dotenv
```

These libraries will be downloaded into a node_modules directory, and your package.json will update with these new
dependencies under "dependencies".

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

Open api/validate-user-profile-update.js and add the following code:

```JavaScript
const nodemailer = require('nodemailer');
require("dotenv").config();

// Mock: valid department list (simulating a directory check)
const validDepartments = ["Engineering", "HR", "Sales", "Finance"];
const VALID_API_KEY = process.env.API_KEY; // API key for authorization

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helper to extract claim values based on URI
const getClaimValue = (claims, uri) => {
    const claim = claims.find(c => c.uri === uri);
    return claim ? claim.value : null;
};

module.exports = async (req, res) => {
    // Allow only POST requests
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    // Validate API Key
    const apiKey = req.headers['api-key'];
    if (!apiKey || apiKey !== VALID_API_KEY) {
        return res.status(401).json({
            actionStatus: 'FAILED',
            failureReason: 'unauthorized',
            failureDescription: 'Invalid or missing API key.',
        });
    }

    const payload = req.body;


    // Validate the actionType
    if (payload.actionType !== "PRE_UPDATE_PROFILE") {
        return res.status(200).json({
            actionStatus: "FAILED",
            failureReason: "invalid_input",
            failureDescription: "Invalid actionType provided."
        });
    }


    // Extract claims and user information
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


    // Track sensitive attribute changes
    const changes = [];
    if (department) changes.push(`Department: ${department}`);
    if (email) changes.push(`Email: ${email}`);
    if (phone) changes.push(`Phone: ${phone}`);


    // Send security notification if changes are detected
    if (changes.length > 0) {
        try {
            await transporter.sendMail({
                from: '"Security Alert" <security-notifications@wso2.com>',
                to: "security-team@wso2.com", // Replace with actual email
                subject: "Sensitive Attribute Update Request",
                ext: `User ${userId} is attempting to update:\n\n${changes.join("\n")}`
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

Create a .env file at the root of your project to keep your sensitive data secure instead of hardcoding it into your
source code. The file is primarily used for local testing, but these are included separately in the Vercel deployment.

```bash
touch .env
```

Add the following content:

```bash
EMAIL_USER=your-mailtrap-username
EMAIL_PASS=your-mailtrap-password
API_KEY=your-secure-api-key
```

### Configure Vercel Settings

Create a vercel.json file at the root of the project which instructs Vercel to route all incoming traffic to the api/
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

This will simulate the Vercel environment locally and allow you to access your API on `http://localhost:3000/<
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

Log in to the Vercel Dashboard, click on Add New > Project, and import the GitHub repository you pushed earlier.

![Vercel Add Project]({{base_path}}/assets/img/complete-guides/actions/image7.png){: width="600" style="display: block;
margin: 0;"}

During the setup:

* Set your environment variables (`EMAIL_USER`, `EMAIL_PASS`, `API_KEY`) securely via the Vercel dashboard.
* Confirm that Vercel detects the correct root folder structure (API functions).

Finally, deploy the project. Vercel will automatically build and host your serverless functions. Once deployed, you'll
receive a live endpoint URL that you can use under Domains.

![Vercel Deployed Project]({{base_path}}/assets/img/complete-guides/actions/image8.png){: width="600" style="display:
block; margin: 0;"}

## Using AWS Lambda

This section describes how to implement the same Pre-Update Profile Action scenario discussed above using AWS Lambda
with Node.js. In this approach, the validation logic is implemented in a Lambda function for department validation, and
a notification email is sent to the security team when sensitive user profile data (like email address, phone number, or
department) is being updated.

The Lambda function uses the SMTP service to simulate email sending. Deployment is done using a ZIP package because
external Node.js modules are used.

### Set Up Your Node.js Project

Create a folder to hold your Lambda source code and its dependencies, so it can be packaged as a ZIP file to be uploaded
as a Lambda function.

```bash
mkdir validate-user-profile-update
cd validate-user-profile-update
```

Run the following command to generate a package.json file which helps manage your project dependencies:

```bash
npm init -y
```

This creates a basic package.json with default values. The -y flag automatically accepts all default settings, so you
don't have to manually answer prompts.

Install required dependencies for the use case. The Lambda function requires the following packages:

* nodemailer – Enables the function to send emails.
* dotenv – Enables the function to send emails.Enables the function to send emails.

```bash
npm install nodemailer dotenv
```

In the root directory, create a .env file and add your SMTP credentials. The file is primarily used for local testing,
but these are included separately in the AWS Lambda deployment.

```bash
touch .env
```

Add the following content:

```bash
EMAIL_USER=your-mailtrap-username
EMAIL_PASS=your-mailtrap-password
```

### Create the Lambda Source Files for Deployment

Create a file named index.js and add the following code:

```JavaScript
const nodemailer = require('nodemailer');
require("dotenv").config();

const validDepartments = ["Engineering", "HR", "Sales", "Finance"];

const getClaimValue = (claims, uri) => {
    const claim = claims.find(c => c.uri === uri);
    return claim ? claim.value : null;
};

exports.handler = async (event) => {
    const payload = JSON.parse(event.body || '{}');
    if (payload.actionType !== "PRE_UPDATE_PROFILE") {
        return {
            statusCode: 200,
            body: JSON.stringify({
                actionStatus: "FAILED",
                failureReason: "invalid_input",
                failureDescription: "Invalid actionType provided."
            })
        };
    }

    const claims = payload?.event?.request?.claims || [];
    const userId = payload?.event?.user?.id || "Unknown User";

    const department = getClaimValue(claims, "http://wso2.org/claims/department");
    const email = getClaimValue(claims, "http://wso2.org/claims/emailaddress");
    const phone = getClaimValue(claims, "http://wso2.org/claims/mobile");
    if (department && !validDepartments.includes(department)) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                actionStatus: "FAILED",
                failureReason: "invalid_department_input",
                failureDescription: "Provided user department value is invalid."
            })
        };
    }

    const changes = [];
    if (department) changes.push(`Department: ${department}`);
    if (email) changes.push(`Email: ${email}`);
    if (phone) changes.push(`Phone: ${phone}`);

    if (changes.length > 0) {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        try {
            await transporter.sendMail({
                from: '"Security Alert" <security-notifications@wso2.com>',
                to: "security-team@wso2.com",
                subject: "Sensitive Attribute Update Request",
                text: `User ${userId} is attempting to update:\n\n${changes.join("\n")}`
            });
        } catch (error) {
            console.error("Failed to send security email:", error);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    actionStatus: "FAILED",
                    failureReason: "email_error",
                    failureDescription: "Failed to notify security team about sensitive data update."
                })
            };
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({actionStatus: "SUCCESS"})
    };
};
```

The above source code performs the following key tasks to help fulfill the use case defined earlier in this document:

* It validates that the action type is PRE_UPDATE_PROFILE.
* It extracts claims from the event payload and checks whether the department is among a predefined list of valid
  values,
  returning an error response if it is not.
* If the email, phone number, or department is being updated, it triggers an email alert to the security team.

### Create the Deployment Package

Since this project includes external libraries, the Lambda function needs to be packaged as a ZIP archive before
uploading:

```bash
zip -r validate-user-profile-update.zip .
```

This command includes all necessary files (index.js, .env, node_modules) required by AWS Lambda.

### Deploy the Function on AWS Lambda

Log in to the AWS Dashboard and navigate to the AWS Lambda Console. Once there, click Create function and choose Author
from scratch.

![AWS Create Function]({{base_path}}/assets/img/complete-guides/actions/image9.png){: width="600" style="display: block;
margin: 0;"}

Then, fill in the following details and create the function:

* Function name: validate-user-profile-update
* Runtime: Node.js 22.x
* Architecture: x86
* Permissions: Choose an existing role or create a new one with basic Lambda permissions.

Once the function is created, go to the Code tab, upload the ZIP file (validate-user-profile-update.zip) that was
created earlier, and click Save to upload the source code.

![AWS Upload Source Code]({{base_path}}/assets/img/complete-guides/actions/image10.png){: width="600" style="display:
block; margin: 0;"}

Next, configure the Function URL:

* Navigate to the Configuration tab, then to the Function URL section.
* Click Create function URL and set the Auth type to None.

![AWS Configure Function URL]({{base_path}}/assets/img/complete-guides/actions/image11.png){: width="600" style="
display: block; margin: 0;"}

The generated function URL will be shown in the dashboard under the function overview tab and please keep note of it
since it will be the URL exposing the function to the external services.

The generated function URL will be displayed in the Function overview section of the dashboard. Make sure to note this
URL, as it will be used to expose the function to external services.

Since the source code uses environment variables to manage sensitive information, you must configure the corresponding
environment variables in AWS. To do this:

* Go to the Configuration tab, then Environment variables.
* Add the values for the SMTP username and password, and save the changes.

![AWS Configure Environment Variables]({{base_path}}/assets/img/complete-guides/actions/image12.png){: width="600"
style="display: block; margin: 0;"}
