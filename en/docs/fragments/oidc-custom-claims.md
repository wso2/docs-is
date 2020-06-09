## Configure claims

1. Add two new external claims as follows for the `http://wso2.org/oidc/claim` dialect.

    **customClaim1**
    - Dialect URI: `http://wso2.org/oidc/claim`
    - Claim URI: customClaim1
    - Mapped Local Claim: http://wso2.org/oidc/claims/challengeQuestion1

    **customClaim2**
    - Dialect URI: `http://wso2.org/oidc/claim`
    - Claim URI: customClaim2
    - Mapped Local Claim: http://wso2.org/oidc/claims/challengeQuestion2

    !!! info
        Here, **customClaim1** and **customClaim2** are selected as claim URIs because they are not configured as requested claims in the OIDC scope. For the purpose of testing, these claims are mapped to existing local claims `http://wso2.org/claims/challengeQuestion1` and `http://wso2.org/claims/challengeQuestion2`. If necessary, you can [create two new local claims](insertlink) for this purpose.

2. Make sure you select **Supported by default** for the mapped local claims to ensure that the claims will be prompted during user registration.

3. Click **Service Providers > List** and **Edit** the service provider you created for the playground application.

4. Expand **Claim Configuration**.

5. Enter the following as requested claims.
    - http://wso2.org/claims/challengeQuestion1
    - http://wso2.org/claims/challengeQuestion2
    - http://wso2.org/claims/country
    - http://wso2.org/claims/emailaddress

6. If a user has already consented once to the requested claims that are configured on the service provider, any further changes/additions to the requested claims will not apply. If you are facing this issue, do one of the following.

    -   Mark the claims given above as **Mandatory Claims**. This will ensure that the user will be prompted once again to provide consent for the newly added/changed claims.

    -   Log in to the user portal and revoke the consent reciept for the application.  When you attempt to log in to the application again, you will be prompted to provide consent for all requested claims, including the newly added/changed claims. For more information on revoking/accepting user consent, see [Consent management](insertlink).

7. Click **Update**.