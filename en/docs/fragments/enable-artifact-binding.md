### Configure SAML artifact binding

1.  Expand the **Inbound Authentication configuration** > **SAML2 Web SSO
    configuration** section, and click **Edit**.

2.  Select **Enable SAML2 Artifact Binding** to enable SAML2 artifact
   binding. Once this is enabled, WSO2 Identity Server responds to each
   SAML SSO authentication request with an artifact.

    ![Enable SAML2 Artifact Binding configuration](../../assets/img/fragments/enable-artifact-binding.png)

3.  You can also enable signature validation by selecting **Enable
    Signature Validation in Artifact Resolve Request**. Once this is
    enabled, WSO2 IS expects to receive signed artifact resolve requests
    and validates that signature against the service provider
    certificate. For more information, see the [Resolving SAML2 artifacts with WSO2 IS](../../quick-starts/use-artifact-binding-sample/#resolve-artifacts-with-wso2-is) section.

4.  Leave the rest of the default configurations as it is and click
    **Register**.