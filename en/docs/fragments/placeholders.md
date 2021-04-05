You can set different placeholders in order to populate custom information such as `{first-name}` and `{user-id}` in the subject, body and footer of the email template.
    
        You can also specify any custom claim URI created in the WSO2 claim dialect:
    
        -   If it is an identity claim, specify the claim accordingly. For example, the claim `http://wso2.org/claims/identity/homeAddress` should be specified as `{{user.claim.identity.homeAddress}}`
    
        -   If it is a normal claim, specify the claim accordingly. For example, for the claim `http://wso2.org/claims/homeAddress`, it should be specified as `{{user.claim.homeAddress}}`.
    
        Before sending the email, WSO2 Identity Server will retrieve the user details from the user store configured for this tenant and replace the placeholders with the corresponding values of the user.
        
        !!! note
            When you are using an identity claim as a placeholder in the **Account Confirmation** template
            for User Self Registration, you need to use the notation `{{claimName}}` instead of using 
            `{{user.claim.identity.claimName}}`. Additionally you need to send the respective value 
            for the placeholder in the API request payload, under the `properties` section. 
            A sample request payload is given below.
            ```
            {
            ...
            "properties": [
            ...
                {
                "key": "claimName",
                "value": "Value for the claim"
                }
            ...
            ]
            }
            ```