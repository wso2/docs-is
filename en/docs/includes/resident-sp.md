
1.  In the **Main** menu under the **Identity** section, click
    **Resident** under **Service Providers**.
2.  Expand the **Outbound Provisioning Configuration** on the screen
    that appears.
3.  Select the Google identity provider you configured from the drop
    down and click `+`to add the IdP.
    <!--![outbound-provisioning-icon](../../../../assets/img/guides/outbound-provisioning-icon.png) button.-->
    
    !!! info
        If you enable **Blocking**, Identity Server will wait for the
        response from the Identity Provider to continue.

        If you enable **Enable Rules** and **Blocking,** blocking will block
        the provisioning till the rule completely evaluates and get the
        response back to the WSO2 IdP. Afterwards, you need to enable the
        XACML policy. For more information, see [Rule-Based
        Provisioning](../../../../guides/identity-lifecycles/rule-based-provisioning/)

4.  Click **Update**.
