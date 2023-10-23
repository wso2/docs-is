# Configure Email Masking Pattern

This page guides you through configuring the email masking regex pattern to mask the user's email address returned in the HTTP response body when initiating the password recovery API where notification-based password recovery is enabled.

Follow the instructions below to make the email masking regex pattern configurable.

1. Log in to the management console using admin/admin credentials.

2. Navigate to **Main > Identity > Claims > List**.

3. Click "http://wso2.org/claims".

4. Under **Email**, click **Edit**.

5. Click **Add Claim Property**. 

6. Enter `MaskingRegEx` as the **Property Name** and enter a suitable masking regex pattern as the **Property Value**. Ensure that the regex pattern is XML encoded.

Alternatively, you can also add a claim mapping using the configuration file instead of via the management console to configure it server-wide. Follow the steps below to do this. 

!!! note 
    Note that claims configured in `<IS_HOME>/repository/conf/claim-config.xml` file get applied only when you start the product for the first time, or for any newly created tenants.

1. Open the `claim-config.xml` file found in the `<IS_HOME>/repository/conf/` folder.

2. Add the **MaskingRegEx** property for http://wso2.org/claims/emailaddress claim URI under the `http://wso2.org/claims` claim dialect. A sample is given below. 

    ```xml
    <Claim>
    <ClaimURI>http://wso2.org/claims/emailaddress</ClaimURI>
    <DisplayName>Email</DisplayName>
    <AttributeID>mail</AttributeID>
    <Description>Email Address</Description>
    <Required />
    <DisplayOrder>6</DisplayOrder>
    <SupportedByDefault />
    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
    <MaskingRegEx>
    (?&lt;=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?&lt;=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)
    (?&lt;=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?&lt;=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)
    </MaskingRegEx>
    </Claim>
    ```

    !!! tip
        Ensure that the regex pattern is XML encoded.

3. Save the file and restart the server.

---

!!! info "Related Topics"
    - 


