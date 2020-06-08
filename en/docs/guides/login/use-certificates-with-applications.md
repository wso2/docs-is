# Use Certificates with Applications
Follow the steps given below if you wish to configure your application to use a public certificate instead of the default JWKS endpoint. This configuration is required to follow the scenarios mentioned below. 

1.  OIDC Token Encryption
2.  Request Object flow

---

{! fragments/create-certificate.md !}

1.  Navigate to the **Advanced** tab. 

2.  In the **certificate** section, choose **Provide certificate**. 

3.  Paste the public certificate you obtained in the X509 format above in the **Value** text area. 

    ![oidc-certificate](../../assets/img/guides/oidc-certificate.png)

4.  Click **Update**.

---

!!! info "What's next?" 
    -   [Generate and Encrypt ID Tokens](../../../guides/login/oidc-token-encryption)

    -   [Try our sample](../../../quick-starts/oidc-token-encryption-sample)

    -   [Call the JSON Web Key Set (JWKS) Endpoint](../../../guides/login/using-jwks)

    -   [Pass Parameters as a Request Object](../../../guides/login/request-object)