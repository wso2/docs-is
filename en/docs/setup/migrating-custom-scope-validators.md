# Migrating Custom Scope Validators

!!! warning
    
    This section is only applicable if you are migrating from WSO2 Identity server 5.4.1 or older, 
    and only if you have added a custom scope validator in that version.
    

WSO2 Identity Server 5.5.0 and later versions support configuring scope
validators for a service provider. If you take a look at support for
configuring scope validators in previous versions of WSO2 Identity
Server (WSO2 IS), you will understand that,

-   WSO2 Identity Server 5.4.0 and 5.4.1 supported setting JDBC Scope
    validators as a global configuration, but did not support
    configuring scope validators for a service provider. WSO2 Identity
    Server 5.4.0 and 5.4.1 also allowed you to create custom scope
    validators depending on your requirement.
-   Versions older that WSO2 Identity Server 5.4.0 did not support
    configuring scope validators, but allowed you to create custom scope
    validators depending on your requirement.

Therefore, if you have added any custom scope validators to your
existing version of WSO2 IS, and you want to migrate those custom scope
validators to IS 5.11.0, follow the instructions below:

!!! tip
    
    The instructions you need to follow to migrate your custom scope
    validators can vary depending on your implementation. You may not need
    to follow all the steps below in the same order. Be sure to follow the
    appropriate steps depending on your implementation.
    

1.  If you have extended the `           OAuth2ScopeValidator          `
    and implemented your own scope validator, implement a new method
    called `           getValidatorName()          ` . The name that you
    specify as the new method will be used in the database and the
    Management Console user interface.

    !!! note
    
        Note
    
        If you do not implement a new method, the canonical name of the
        class will be used in the database and the Management Console user
        interface.
    

2.  If you have custom scope validators that you have configured
    globally, and you want to configure those scope validators in all
    service providers in WSO2 IS 5.11.0, add the following snippet to the
    appropriate migration script in the
    `           <IS5.11.0_MIGRATION_TOOL_HOME>/migration-resources/migration-resources/5.5.0/dbscripts/step2/identity          `
    directory.

    ``` sql
    INSERT INTO IDN_OAUTH2_SCOPE_VALIDATORS (APP_ID, SCOPE_VALIDATOR)
     SELECT IDN_OAUTH_CONSUMER_APPS.ID, '<scopeValidatorName>'
       FROM IDN_OAUTH_CONSUMER_APPS;
    ```

      
    !!! note
    
        Note
    
        -   If you have configured JDBC scope validators in IS 5.4.x, and
            you want to configure those JDBC scope validators in all service
            providers in latest version, replace the
            `            <scopeValidatorName>           ` place holder in
            the above snippet with
            `            Role based scope validator           ` .
        -   If you have specified a name for the scope validator in step 1,
            then replace the `            <scopeValidatorName>           `
            place holder in the above snippet with that name. If you have
            not specified a name for the scope validator, you can use the
            canonical name of your custom scope validator class to replace
            the `            <scopeValidatorName>           ` place holder
            in the above snippet.
    

3.  If you want to use the XACML based scope validator introduced in
    WSO2 IS 5.5.0 together with your custom scope validators, add the
    following configuration to the ` deployment.toml ` file in the `
    <IS_HOME>/repository/conf/ ` folder:

    ``` toml
    [oauth.scope_validator.xacml]
    enable = true
    ```
