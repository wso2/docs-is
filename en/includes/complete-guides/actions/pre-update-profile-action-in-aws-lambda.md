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

![AWS Create Function]({{base_path}}/assets/img/complete-guides/actions/image9.png)

Then, fill in the following details and create the function:

* Function name: validate-user-profile-update
* Runtime: Node.js 22.x
* Architecture: x86
* Permissions: Choose an existing role or create a new one with basic Lambda permissions.

Once the function is created, go to the Code tab, upload the ZIP file (validate-user-profile-update.zip) that was
created earlier, and click Save to upload the source code.

![AWS Upload Source Code]({{base_path}}/assets/img/complete-guides/actions/image10.png)

Next, configure the Function URL:

* Navigate to the Configuration tab, then to the Function URL section.
* Click Create function URL and set the Auth type to None.

![AWS Configure Function URL]({{base_path}}/assets/img/complete-guides/actions/image11.png)

The generated function URL will be shown in the dashboard under the function overview tab and please keep note of it
since it will be the URL exposing the function to the external services.

The generated function URL will be displayed in the Function overview section of the dashboard. Make sure to note this
URL, as it will be used to expose the function to external services.

Since the source code uses environment variables to manage sensitive information, you must configure the corresponding
environment variables in AWS. To do this:

* Go to the Configuration tab, then Environment variables.
* Add the values for the SMTP username and password, and save the changes.

![AWS Configure Environment Variables]({{base_path}}/assets/img/complete-guides/actions/image12.png)

### Configure {{product_name}} for Pre-Update Profile Action Workflow

First, sign in to your {{product_name}} account using your admin credentials, click on "Actions" and then select the
action type Pre Update Profile.

Add an action name, the endpoint extracted from the deployment, and the appropriate authentication mechanism. For AWS
Lambda, use the generated function URL directly, and set the authentication mechanism to None, as no authentication is
required.
