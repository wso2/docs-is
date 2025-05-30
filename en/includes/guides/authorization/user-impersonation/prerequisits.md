
- Enable impersonation. To do so, apply the following configurations in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.

    ```bash
    [[oauth.custom_response_type]]
    name= "subject_token"
    class= "org.wso2.carbon.identity.oauth2.authz.handlers.SubjectTokenResponseTypeHandler"
    validator= "org.wso2.carbon.identity.oauth.common.SubjectTokenResponseValidator"
        
    [[oauth.custom_response_type]]
    name= "id_token subject_token"
    class= "org.wso2.carbon.identity.oauth2.authz.handlers.SubjectTokenResponseTypeHandler"
    validator= "org.wso2.carbon.identity.oauth.common.SubjectTokenResponseValidator"
        
    [[api_resources]]
    name= "User Impersonation"
    identifier= "system:impersonation"
    requiresAuthorization= true
    description= "Resource representation of the User Impersonation"
    type= "TENANT"
        
    [[api_resources.scopes]]
    displayName = "User Impersonation Scope"
    name = "internal_user_impersonate"
    description = "Allows to impersonate another user"
    ```

- Insert a new configuration type into the `IDN_CONFIG_TYPE` table of your database. The relevant DB scripts are shown  below.

    ??? Example "DB2"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "H2"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "MsSQL"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "MYSQL"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "MYSQL-Cluster"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "Oracle"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "OracleRac"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "Postgres"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    Alternatively you can use [Config Management REST API]({{base_path}}/apis/use-the-configuration-management-rest-apis/) to add this configuration as shown below.

    ```curl
    curl --location 'https://<serverUrl>/api/identity/config-mgt/v1.0/resource-type' \
    --header 'accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --data '{"name": "IMPERSONATION_CONFIGURATION", "description": "A resource type to keep the tenant impersonation    preferences.
    ```

- You need to have an application registered in {{product_name}}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).
