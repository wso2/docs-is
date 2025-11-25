---
template: templates/quick-start.html
heading: Securing APIs with AWS API Gateway and Asgardeo
description: This guide walks you through securing a Pharmacy User API using AWS API Gateway and Asgardeo. You'll deploy a Lambda function, expose it via an HTTP API, and secure the endpoint using JWT tokens issued by Asgardeo and validated by API Gateway.
what_you_will_learn:
  - Deploy a serverless endpoint using AWS Lambda
  - Secure your API with AWS API Gateway’s JWT authorizer
  - Configure an OAuth2 application and define API scopes in Asgardeo
  - Protect and test your API using JWT-based access control
prerequisites:
  - About 20 minutes
  - AWS Account with CLI access
  - An <a href="https://asgardeo.io" target="_blank" rel="noopener noreferrer">Asgardeo account</a>
  - Tools: <code>curl</code> and <code>jq</code>
  - Familiarity with shell and JSON
---

## Step 1: Create and Deploy the Lambda Function

In this step, you’ll create a simple backend Lambda function for the Pharmacy User API. First, set up an IAM role with the required permissions. Then, write a Node.js function and deploy it using the AWS CLI. The function will return a welcome message, including the user’s name if it’s available in the JWT claims.

### 1. Create IAM Role for Lambda Execution

```bash
cat > trust-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

aws iam create-role \
  --role-name LambdaExecutionRole \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name LambdaExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

sleep 15
ROLE_ARN=$(aws iam get-role --role-name LambdaExecutionRole --query 'Role.Arn' --output text)
echo "Created Lambda IAM Role ARN: $ROLE_ARN"
```

### 2. Write the Lambda Function Code

```bash
cat > index.js << 'EOF'
exports.handler = async (event) => {
    const claims = event?.requestContext?.authorizer?.jwt?.claims || {};
    const userName = claims.name || claims.preferred_username || claims.email || "User";
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Welcome ${userName}!` })
    };
};
EOF

zip function.zip index.js
```

### 3. Deploy the Lambda Function

```bash
aws lambda create-function \
  --function-name PharmacyUserFunction \
  --runtime nodejs18.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role $ROLE_ARN

echo "Lambda function 'PharmacyUserFunction' deployed."
```

## Step 2: Configure API Gateway Integration

Set up an HTTP API in API Gateway and connect it to the Lambda function using a Lambda proxy integration. This allows the API to trigger the Lambda when the `/user` endpoint is called.

### 1. Create HTTP API

```bash
API_ID=$(aws apigatewayv2 create-api \
  --name "PharmacyUserAPI" \
  --protocol-type HTTP \
  --query 'ApiId' --output text)
echo "Created API Gateway with ID: $API_ID"
```

### 2. Integrate Lambda with API

```bash
FUNCTION_ARN=$(aws lambda get-function --function-name PharmacyUserFunction --query 'Configuration.FunctionArn' --output text)

INTEGRATION_ID=$(aws apigatewayv2 create-integration \
  --api-id $API_ID \
  --integration-type AWS_PROXY \
  --integration-method POST \
  --integration-uri $FUNCTION_ARN \
  --payload-format-version 2.0 \
  --query 'IntegrationId' --output text)
echo "Created API integration with ID: $INTEGRATION_ID"
```

### 3. Create API Route

```bash
ROUTE_ID=$(aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key "GET /user" \
  --target "integrations/$INTEGRATION_ID" \
  --authorization-type NONE \
  --query 'RouteId' --output text)
echo "Created route GET /user with ID: $ROUTE_ID"
```

### 4. Grant Permission to API Gateway

```bash
REGION=$(aws configure get region)
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws lambda add-permission \
  --function-name PharmacyUserFunction \
  --statement-id AllowInvokeByApiGateway \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_ID/*/GET/user"
```

### 5. Deploy the API

```bash
aws apigatewayv2 create-stage --api-id $API_ID --stage-name dev --auto-deploy
echo "API deployed to stage 'dev'"
```

## Step 3: Configure Asgardeo to Secure the API

In this step, you'll set up everything needed in Asgardeo to secure your Pharmacy User API. This includes getting a bearer token, registering the API as a protected resource, creating an OAuth2 application, linking the app to the API, and configuring role handling.

### 1. Obtain a Bearer Token for Asgardeo Manage App

You will need a Client ID and Client Secret from an Asgardeo application that is authorized to invoke Asgardeo management APIs. You can use an existing application or create a new application in the Asgardeo console with the Client Credentials grant enabled. Make sure the application has the scope `internal_application_mgt_create` (this scope is required to create a new application via the API).

```bash
curl -X POST "https://api.asgardeo.io/t/<YOUR_ASGARDEO_ORG_NAME>/oauth2/token" \
  -u "<YOUR_ADMIN_APP_CLIENT_ID>:<YOUR_ADMIN_APP_CLIENT_SECRET>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&scope=internal_application_mgt_create" 2>/dev/null | jq -r .access_token
```
Use the obtained token in all subsequent Asgardeo API calls:

```bash
-H "Authorization: Bearer $ACCESS_TOKEN"
```

### 2. Register the API Resource in Asgardeo

In this step, you’ll register the Pharmacy User API as a protected resource in Asgardeo. This allows you to define access scopes that control which operations clients can perform on the API.

```bash
curl -X POST "https://api.asgardeo.io/t/<ORG_NAME>/api/server/v1/api-resources" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
        "identifier": "https://<API_ID>.execute-api.<REGION>.amazonaws.com/dev/user",
        "name": "dev/user",
        "description": "Pharmacy User API",
        "requiresAuthorization": true,
        "scopes": [
          { "name": "get_pharmacy_user", "displayName": "getPharmacyUser", "description": "" },
          { "name": "create_pharmacy_user", "displayName": "createPharmacyUser", "description": "" },
          { "name": "update_pharmacy_user", "displayName": "updatePharmacyUser", "description": "" }
        ]
      }'
```

### 3. Register an OAuth2 Application in Asgardeo

Create an application in Asgardeo that will request access tokens to call your API. This app represents the client, and you’ll configure it to use the Client Credentials grant type with JWT access tokens.

```bash
curl -X POST "https://api.asgardeo.io/t/<ORG_NAME>/api/server/v1/applications" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
        "name": "pharmacyApp",
        "description": "Pharmacy API Client Application",
        "isManagementApp": false,
        "inboundProtocolConfiguration": {
          "oidc": {
            "grantTypes": ["client_credentials"],
            "publicClient": false,
            "accessToken": {
              "type": "JWT",
              "userAccessTokenExpiryInSeconds": 3600,
              "applicationAccessTokenExpiryInSeconds": 3600
            }
          }
        }
      }'
```

### 4. Authorize the Application to Access the API

```bash
curl -X POST "https://api.asgardeo.io/t/<ORG_NAME>/api/server/v1/applications/<APP_ID>/authorized-apis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
        "id": "<API_RESOURCE_ID>",
        "policyIdentifier": "RBAC",
        "scopes": ["get_pharmacy_user", "create_pharmacy_user", "update_pharmacy_user"]
      }'
```

### 5. Set Role Audience for the Application

Configure the application to recognize roles assigned at the organization level. This ensures that any roles you assign to users can be included in the issued JWTs.

```bash
curl -X PATCH "https://api.asgardeo.io/t/<ORG_NAME>/api/server/v1/applications/<APP_ID>" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{"associatedRoles": { "allowedAudience": "ORGANIZATION" }}'
```

## Step 4: Secure the API Route with JWT Authorizer

In this step, you’ll configure API Gateway to validate JWT tokens issued by Asgardeo. This includes creating a JWT authorizer, attaching it to the /user route, and deploying the changes.

### 1. Configure JWT Authorizer

```bash
ISSUER="https://api.asgardeo.io/t/<ORG_NAME>/"
AUDIENCE="<CLIENT_ID>"

AUTHORIZER_ID=$(aws apigatewayv2 create-authorizer \
  --api-id $API_ID \
  --name "AsgardeoJWTAuthorizer" \
  --authorizer-type JWT \
  --identity-source '$request.header.Authorization' \
  --jwt-configuration "Issuer=$ISSUER,Audience=$AUDIENCE" \
  --query 'AuthorizerId' --output text)

echo "Created JWT Authorizer with ID: $AUTHORIZER_ID"
```

### 2. Secure the /user Route

```bash
aws apigatewayv2 update-route \
  --api-id $API_ID \
  --route-id $ROUTE_ID \
  --authorization-type JWT \
  --authorizer-id $AUTHORIZER_ID \
  --authorization-scopes get_pharmacy_user
```

### 3. Redeploy the API (Optional)

```bash
aws apigatewayv2 create-stage \
  --api-id $API_ID \
  --stage-name dev \
  --auto-deploy
```

## Step 5: Try Out the Secured API

In this step, you’ll verify that the Pharmacy User API only allows access when a valid JWT with the correct scope is provided. The required scope in this setup is get_pharmacy_user, and it must be included in the access token issued by Asgardeo.

### 1. Create a User in Asgardeo

Create a user in Asgardeo to simulate a real-world client accessing the API.

```bash
curl -X POST "https://api.asgardeo.io/t/<ORG_NAME>/scim2/Users" \
  -H "Content-Type: application/scim+json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
        "name": { "givenName": "Kim", "familyName": "Henry" },
        "userName": "kim@gmail.com",
        "password": "aBcd!23#",
        "emails": [ { "value": "kim@gmail.com", "primary": true } ]
      }'
```

### 2. Create a Role and Assign It to the User

Assign a role that grants the get_pharmacy_user scope. This ensures the user can access the secured API endpoint.

```bash
# Replace <USER_ID> with the ID returned from the user creation response
curl -X POST "https://api.asgardeo.io/t/<ORG_NAME>/scim2/Roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
        "displayName": "PharmacyUser",
        "users": [ { "value": "<USER_ID>" } ],
        "permissions": [ { "value": "get_pharmacy_user" } ]
      }'
```

### 3. Test the secured API with the bearer token:

Use an access token that includes the get_pharmacy_user scope in the Authorization header to access the /user endpoint.

```bash
curl -i -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://${API_ID}.execute-api.${REGION}.amazonaws.com/dev/user"
```
You should receive a 200 OK response.

```json
{ "message": "Welcome User!" }
```

Your Pharmacy User API is now secured with JWT authorization via Asgardeo 
