## Configure artifact binding

1.  Click **Applications** and edit the application you registered. 

2.  Click **Access** and then click **SAML** to edit the SAML configurations. 

3. Select **Artifact** under **Single SignOn Profile > Bindings**. Once this is enabled, WSO2 Identity Server responds to each SAML SSO authentication request with an artifact.

    ![enable-artifact-binding](../../../assets/img/fragments/enable-artifact-binding.png)

4.  You can also enable signature validation by selecting **Enable signature validation for artifact binding**. Once this is enabled, WSO2 IS expects to receive signed artifact resolve requests and validates that signature against the service provider certificate. For more information, see the [Resolving SAML2 artifacts with WSO2 IS](#resolve-saml2-artifacts-with-wso2-is) section.

5.  Leave the rest of the default configurations as it is and click **Update**.