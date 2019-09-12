# Rule Based Provisioning

Under [Outbound Provisioning](../../using-wso2-identity-server/outbound-provisioning), in general, we
have discussed how to provision users to trusted identity providers. In
this document, we discuss how to provision users based on defined
[XACML](../../getting-started/access-control-and-entitlement-management) rules. This is the
rule-based method of role-based provisioning

To get a better understanding of rule-based provisioning, let's look a
sample scenario where you provision users in the finance role from WSO2
Identity Server to the GoogleIDP. To implement this scenario, we define
a XACML policy which permits the provisioning operation if the
provisioning users is within the finance role.

Follow the steps given below:

#### Step 1: Configure outbound provisioning in WSO2 Identity Server

1.  [Start the WSO2 Identity
    Server](../../setup/running-the-product#starting-the-server)
    and log in to the management console.
2.  On the Main tab, click **Add** under **Identity Providers**
    to create a new Identity Provider (IdP).  
    For more information on creating identity providers, see [Adding an
    Identity
    Provider](../../using-wso2-identity-server/adding-and-configuring-an-identity-provider#adding-an-identity-provider)
    .
3.  Provide a preferred name for your IdP.
4.  Expand the **Outbound Provisioning Connectors** section and
    configure Google for outbound provisioning connector.

    ??? note "Click here to know the detailed steps on configuring Google for outbound provisioning."
         This configuration involves setting up the Identity Server to send
         provisioning requests to Google applications.

         Expand the **Google Provisioning Configuration** form and fill in
         the following fields where relevant.

         <table>
         <thead>
         <tr class="header">
         <th>Field</th>
         <th>Description</th>
         <th>Sample value</th>
         </tr>
         </thead>
         <tbody>
         <tr class="odd">
         <td>Enable Connector</td>
         <td>Selecting this enables identity provisioning through the Google domain.</td>
         <td>Selected</td>
         </tr>
         <tr class="even">
         <td>Google Domain</td>
         <td>The name of the Google domain used to provision users.</td>
         <td><code>                    mygoogledomain.com                   </code></td>
         </tr>
         <tr class="odd">
         <td>Primary Email</td>
         <td>Claim URI which will be used to retrieve primary email address for the account to be created. This must be a claim that is available and local in the Identity Server.</td>
         <td><code>                                         http://wso2.org/claims/emailaddress                                       </code></td>
         </tr>
         <tr class="even">
         <td>Given Name</td>
         <td>Claim URI which will be used to retrieve given name attribute for the user. This must be a claim that is available and local in the Identity Server.</td>
         <td><code>                                         http://wso2.org/claims/givenname                                       </code></td>
         </tr>
         <tr class="odd">
         <td>Family Name</td>
         <td>Claim URI which will be used to retrieve family name attribute for the user. This must be a claim that is available and local in the Identity Server.</td>
         <td><code>                                         http://wso2.org/claims/lastname                                       </code></td>
         </tr>
         <tr class="even">
         <td>Service Account Email</td>
         <td>This email is used for authentication purposes.</td>
         <td><code>                    d343s86gf@developer.gserviceaccount.com                   </code></td>
         </tr>
         <tr class="odd">
         <td>Private Key</td>
         <td>Browse and attach the private key from your local machine. This is the PKCS12 private key generated at the service account creation</td>
         <td><code>                    &lt;uploaded_file&gt;                   </code></td>
         </tr>
         <tr class="even">
         <td>Administrator's Email</td>
         <td>This is the email of the administrator who owns the service account in the Google Domain specified. Provisioning takes place using this email, so specifying this here serves as a means for authentication.</td>
         <td><code>                    om@mygoogledomain.com                   </code></td>
         </tr>
         <tr class="odd">
         <td>Application Name</td>
         <td>This is the name of the application which is used to represent the Google connector.</td>
         <td><code>                    Domain                   </code></td>
         </tr>
         <tr class="even">
         <td>Google Outbound Provisioning pattern</td>
         <td><p>This pattern is used to build the user id of Google domain. Combination of attributes UD (User Domain), UN (Username), TD (Tenant Domain) and IDP (Identity Provider) can be used to construct a valid pattern.</p>
         <p>This is a way to differentiate following scenarios:<br />
         If there are several tenants and you must configure Google outbound provisioning for same Google domain in those tenants.<br />
         If there are several user stores and you must configure the specific user store that needs to be provisioned.<br />
         If there are multiple identity providers configured for same Google domain.</p></td>
         <td><code>                    {UD, UN, TD, IDP}                   </code></td>
         </tr>
         <tr class="odd">
         <td>Google Provisioning Separator</td>
         <td>This is used to separate the values that you configure in the Google Outbound Provisioning pattern.</td>
         <td>For this, it is better to use a character that is not normally used in the user domain/username/tenant domain/idp name. For example: "_"</td>
         </tr>
         </tbody>
         </table>

         ![google-prrovisioning-config](../../assets/img/using-wso2-identity-server/google-prrovisioning-config.png) 

    For this scenario your are configuring Google but if you prefer you
    can use Salesforce, SCIM or SPML too.

5.  Click **Register** to save configurations.
6.  Navigate to **Add** under **Service Providers** on the **Main** tab
    and create a new service provider. For more information on creating
    service providers, see [Adding a Service
    Provider](../../using-wso2-identity-server/adding-and-configuring-a-service-provider#adding-a-service-provider)
    .
7.  Expand the **Outbound Provisioning Configuration** section and
    select the provisioning connector you just configured above. Let's
    say we have configured an IDP named "wso2IDP" which used Google
    outbound provisioning connector.
8.  Click on the **+** button and add **wso2IDP**,  then select the
    ****Enable Rules**** in order to enable rules during provisioning.
    Click **Update** to save.  
    ![enable-rules](../../assets/img/using-wso2-identity-server/enable-rules.png)  
    If you wish to configure outbound provisioning under Resident
    Service Provider configurations, Click **Resident** under **Service
    Providers** and expand the **Outbound Provisioning Configuration**
    section. Select the **Enable Rules** and **Blocking** checkboxes and
    click **Update**. Blocking will block the provisioning(user
    creation in the second IDP) till the rule completely evaluate and
    get the response back to the WSO2 IDP.

    ![expand-outbound-provisioning-config](../../assets/img/using-wso2-identity-server/expand-outbound-provisioning-config.png)

Now you are done with configuring outbound provisioning. Since we are
enabling rules here, we have to enforce some XACML rules. To do that,
you can follow the below steps.

#### Step2: Set up XACML rules

After setting up the Identity provider, follow the below steps to set up
the policy according to our requirement.

1.  Click on **Policy Administration** under the **Entitlement\>PAP**
    section on the **Main** tab of the management console.
2.  Since this sample scenario is based on role, we select the policy
    `                       provisioing_role_based_policy_template.                     `

    !!! info 
         XACML template policies provide a pre-configured template with
         placeholders for different types of policies. For a full list of the
         available XACML policy templates, see [Writing an XACML Policy using
         a Policy
         Template](../../tutorials/writing-a-xacml-policy-using-a-policy-template).

    ![xacml-policy-templates](../../assets/img/using-wso2-identity-server/xacml-policy-templates.png) 

3.  Once you click **Edit**, the XML based policy will appear in the
    policy editor. There are placeholders in capitals for entering the
    service provider and role names.

4.  Edit the placeholders accordingly with the relevant values.
    1.  Change the `             PolicyId            ` as follows:

        ``` java
        PolicyId="provisioning_role_based_policy"
        ```

    2.  Edit the `             <Description>            ` tag and enter
        a description relevant to your custom policy.

        ``` java
         <Description>This template policy provides ability to authorize provisioning requests initiated from a given service provider(defined by SP_NAME) to a given identity provider(defined by IDP_NAME) in the outbound provisioning flow based on the roles of the user (ROLE_1, ROLE_2). Provisioning attempts to the users with given role(s) will be allowed and all others will be denied.</Description>
        ```

    3.  Locate the IDP `            _NAME           ` placeholder and
        replace it with the identity provider name "WSO2IDP".
    4.  Locate the placeholder `            ROLE_1           ` and
        replace it with the role name "finance".
    5.  In this example, this policy authenticates users to the
        specified service provider based on
        `            ROLE_1           ` or
        `            ROLE_2           ` . However, you can authenticate
        using only one role as well. To do this, remove the other role
        by removing that entire section from the start of the
        `            <Apply>           ` tag to the ending
        `            </Apply>           ` tag.  This should be edited in
        both POST and PUT sections as the provisioning is initiated when
        creating the user and when updating the user as well.
    6.  Also for this example, we do not need a service provider.
        Therefore we need to remove the service provider
        `            SP_NAME           ` match block as well.

5.  Once the changes have been made, the policy should be similar to the
    following.

    **Access control policy**

    ``` xml
      <Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"  PolicyId="provisioning_role_based_policy" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" Version="1.0">
         <Description>This template policy provides ability to authorize provisioning requests initiated from a given  identity provider(defined by IDP_NAME) in the outbound provisioning flow based on the roles of the user (finace). Provisioning attempts to the users with given role will be allowed and all others will be denied.</Description>
         <Target>
            <AnyOf>
               <AllOf>
                  <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                     <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">WSO2IDP</AttributeValue>
                     <AttributeDesignator AttributeId="http://wso2.org/identity/idp/idp-name" Category="http://wso2.org/identity/idp" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"></AttributeDesignator>
                  </Match>
                  <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                     <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">provisioning</AttributeValue>
                     <AttributeDesignator AttributeId="http://wso2.org/identity/identity-action/action-name" Category="http://wso2.org/identity/identity-action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"></AttributeDesignator>
                  </Match>
               </AllOf>
            </AnyOf>
         </Target>
         <Rule Effect="Permit" RuleId="permit_by_role_when_create">
            <Target>
               <AnyOf>
                  <AllOf>
                     <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">POST</AttributeValue>
                        <AttributeDesignator AttributeId="http://wso2.org/identity/provisioning/provision-operation" Category="http://wso2.org/identity/provisioning" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                     </Match>
                  </AllOf>
               </AnyOf>
            </Target>
            <Condition>
               <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:or">
                  <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-is-in">
                     <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">finance</AttributeValue>
                     <AttributeDesignator AttributeId="http://wso2.org/identity/provisioning/claim-group" Category="http://wso2.org/identity/provisioning" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                  </Apply>
               </Apply>
            </Condition>
         </Rule>
         <Rule Effect="Permit" RuleId="permit_by_role_when_update">
            <Target>
               <AnyOf>
                  <AllOf>
                     <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">PUT</AttributeValue>
                        <AttributeDesignator AttributeId="http://wso2.org/identity/provisioning/provision-operation" Category="http://wso2.org/identity/provisioning" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                     </Match>
                  </AllOf>
               </AnyOf>
            </Target>
            <Condition>
               <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:or">
                  <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-is-in">
                     <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">finance</AttributeValue>
                     <AttributeDesignator AttributeId="http://wso2.org/claims/role" Category="http://wso2.org/identity/user" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                  </Apply>
               </Apply>
            </Condition>
         </Rule>
         <Rule Effect="Deny" RuleId="deny_others"></Rule>
      </Policy>               
    ```

6.  Click **Save Policy** to save the changes. You can see the policy
    you just created on the policy list (the original template policy
    will remain unchanged for later use).  
    ![save-created-policy](../../assets/img/using-wso2-identity-server/save-created-policy.png) 

7.  Click on the **Publish to My PDP** link corresponding to the new
    policy.  
    ![publish-to-my-pdp](../../assets/img/using-wso2-identity-server/publish-to-my-pdp.png)
8.  On the UI that appears, leave the default selected values as they
    are and click **Publish**.  
    ![publish-policy](../../assets/img/using-wso2-identity-server/publish-policy.png)

    !!! note
    
        For more information on Publishing an XACML policy, click
        [here](../../tutorials/publishing-a-xacml-policy)
        .
    

9.  Click on **Policy View** under the **Entitlement\>PDP** section on
    the **Main** tab of the management console.
10. To ensure that the policy has been published successfully, check if
    the policy is listed.  
      
    ![policy-view](../../assets/img/using-wso2-identity-server/policy-view.png)
11. To test out whether the policy works, follow the **Step3: Try it
    out** section.

!!! info
      If you want to write a more complicated policy, you can use the XACML
      policy editors available. For more information, read [How to create
      XACML
      Policy](../../tutorials/creating-a-xacml-policy)

#### Step3: Try it out

Once the policies are published to PDP, they are ready to execute during
outbound provisioning. You can test rule-based provisioning by creating
a user in the WSO2 Identity Server side that matches the rules you
enforced. That means you can create a user with the role "finance" in
the WSO2IDP and it will provision to the Google IDP as well. All the
other users will not be provisioned.
