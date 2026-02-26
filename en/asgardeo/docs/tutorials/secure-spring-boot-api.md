# Secure Your Spring Boot API with Asgardeo

Spring Boot is a Java framework that simplifies the development of robust applications by offering a production-ready environment with minimal configurations. Spring security provides comprehensive tools to facilitate authentication and authorization for REST APIs. Spring Security seamlessly integrates with Spring Boot and allows developers to focus on business logic rather than boilerplate code.

The goal of this tutorial is to explore how we can enhance API security by integrating Asgardeo, a comprehensive identity and access management solution, with Spring Security. This combination will handle authentication and authorization processes effectively.

Let's look at the following example scenario.

## Scenario

Issue Management Application is a REST API service built using Spring Boot and Spring Security. The application allows the following CRUD operations to be performed.

- list issues
- create issues
- update issues
- delete issues  

The application users are divided into the following two roles with different levels of permissions.

- `Reporters` can create and list issues.
- `Fix-Verifiers` have full access to the application and can perform all operations.

You are tasked with delegating access to the application so that users are given appropriate levels of access based on their roles. Let's use Asgardeo to achieve this.

## Step 1: Create a simple CRUD API

Create a simple issue management REST API which provides create, view, update and delete operations to issues.

You can find a sample implementation in the following [repository](https://github.com/asgardeo-samples/asgardeo-java-samples).

<!-- To use the above implementation, clone the repository and configure the values in the src/main/resources/application.properties. You can configure these values after the following steps.  -->

## Step 2: Integrate your service with Asgardeo

 Follow the instructions below to connect your Issue Management service with Asgardeo.

### Step 2.1: Register your API resources in Asgardeo

First, let's register your issue management REST API with Asgardeo. To do so,

1. Go to your organization from the [Asgardeo Console](https://console.asgardeo.io/).

2. [Register your API in Asgardeo]({{base_path}}/guides/api-authorization/#register-an-api-resource).

3. [Define permissions for the API resource]({{base_path}}/guides/api-authorization/#define-permissions-for-an-api-resource) with the following permissions.

    - <code>issues:view</code>
    - <code>issues:create</code>
    - <code>issues:update</code>
    - <code>issues:delete</code>

### Step 2.2 Register your application in Asgardeo

You need to register your application in Asgardeo and connect your API resources to it. To do so,

1. [Create a standard-based application in Asgardeo]({{base_path}}/guides/applications/register-standard-based-app/) by selecting the grant type as `Code` and the access token type as `JWT`.

2. [Connect the API resources]({{base_path}}/guides/api-authorization/#authorize-the-api-resources-for-an-app) with the application that you created in Step 1 above.

### Step 2.3 Create roles in your application

Let's define the various roles of your application and give each role appropriate permissions.

To do so, [create roles and associate to the application]({{base_path}}/guides/api-authorization/#associate-roles-to-the-application) with the following details:

- Reporter - Assign `create:isses` and `view:issues` permissions.
- Fix-Verifier - Assign all permissions.

### Step 2.4 Assign roles to user groups in Asgardeo

For the application roles defined in Step 2.3 above to take effect, we need to assign those roles to users in Asgardeo. The best way to do this is to create user groups and assign the relevant roles to each group.

To do so,

1. [Create user groups in Asgardeo]({{base_path}}/guides/users/manage-groups/). For this scenario, let's create two groups and name them `Reporter` and `Fix-Verifier`.

2. [Assign application roles]({{base_path}}/guides/api-authorization/#assign-roles-to-groups) created in step 2.3 above to the relevant groups.

### Step 2.5 Assign users to groups in Asgardeo

Now that you have assigned the application roles to the relevant user groups in Asgardeo, let's add users to these groups so that they can access the API resources.

To do so,

1. [Onboard users to Asgardeo]({{base_path}}/guides/users/manage-users/#onboard-a-user).

2. [Assign users to relevant groups]({{base_path}}/guides/users/manage-users/#assign-groups).

## Step 3: Configure Spring Security

In your Spring project, do the following configurations so that it is correctly integrated with Asgardeo.:

1. Create a security configuration file and include the following JWT decoder to validate Asgardeo issued tokens.

    !!! note
        Asgardeo issues access tokens of `at+jwt` type.

    ``` java
    NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).jwtProcessorCustomizer(customizer -> {
    customizer.setJWSTypeVerifier(new DefaultJOSEObjectTypeVerifier<>(new JOSEObjectType("at+jwt")));
    })
    .build();
    ```

2. Add the following annotation to each endpoint that needs to be restricted with a scope.

    ``` java
    @PreAuthorize("hasAuthority('<scope>’)")
    ```

    For example, if the endpoint requires the `issues:view` scope, add the following annotation.

    ``` java
    @PreAuthorize("hasAuthority('issues:view')")
    ```

## Step 4: Try it out

Let's try to access the API resources of the sample application as a `Reporter` user and a `Fix-Verifer` user. Follow the steps below to try out the scenario.

1. Use a web browser to obtain an authorization code using the URL shown below.

    !!! note
        Refer the documentation to learn about the [authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/).

    ``` curl
    https://api.asgardeo.io/t/{organization_name}/oauth2/authorize?response_type=code
    &client_id={client_id}
    &redirect_uri={redirect_uri}
    &scope=issues:create+issues:delete+issues:update+issues:view
    ```

2. Log in as a `Reporter` user to Asgardeo and provide consent to the application to access the shown scopes.

    ![Consent page of the Spring boot app]({{base_path}}/assets/img/tutorials/springboot-app/request-scopes-spring-tutorial.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Once you retrieve the authorization code from the browser response, use the following cURL command to request for an access token.

    ``` curl
    curl --location --request POST 'https://api.asgardeo.io/t/{organization_name}/oauth2/token'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'code={authorization_code}'
    --data-urlencode 'grant_type=authorization_code'
    --data-urlencode 'client_id={client_id}'
    --data-urlencode 'client_secret={client_secret}'  
    --data-urlencode 'redirect_uri={redirect_uri}'
    ```

4. Observe the scopes calim in the access token and verify that the `Reporter` user has access to only `issues:view` and `issues:create` scopes.

5. Repeat steps 1-4 for a `Fix-Verifier` user and observe that this user has access to all scopes.

6. Start the sample application and invoke a restricted API using each of the tokens you obtained above.
    - The `Reporter` token will only allow viewing and creating issues in the system.
    - The `Fix-Verifier` token will enable viewing, creating, updating, and deleting issues in the system.