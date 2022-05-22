# Logging in to Office365 Using WSO2 Identity Server

This topic provides instructions on how to configure and integrate
Office365 with WSO2 Identity Server (WSO2 IS) for authentication and provisioning.

Microsoft Office 365 requires users in on-premise user stores to be synced to Microsoft Azure Active Directory (Azure AD) in the cloud. WSO2 IS Office365 integration allows the users to be provisioned to the Azure AD without using any external tools or additional effort. WSO2 IS is integrated with Office365 using federated identity, which means the password or password hash is not synchronized to the Azure AD because the user authentication is provided by the on-premise WSO2 IS.

<!-- ![log-in-to-office365](../assets/img/tutorials/log-in-to-office365.jpg) -->

## Group-based license management

In Azure AD, administrators can define licenses to security groups. Licenses are assigned or removed at the time a user joins or leaves the user group. Using WSO2 IS for user synchronization allows the users to have a special attribute that qualifies them to join a specific user group in Azure AD at the time of provisioning via the IS. Thus, the users are dynamically added to groups and assigned with licenses without any administration overheads.

!!! info
    For instructions to try out this fow, see [Configuring Microsoft Azure
    AD Outbound Provisioning
    Connector](https://github.com/wso2-extensions/identity-office365/blob/master/components/org.wso2.carbon.identity.outbound.provisioning.connector.office365/doc/README.md)
    .

<!-- The diagram below demonstrates the flow.

![group-based-license-management](../assets/img/tutorials/group-based-license-management.jpg) -->

### Role-based provisioning

Role based provisioning to Microsoft Office365 can be done by
configuring the Office365 Outbound Provisioning Connector in WSO2 IS.
The WSO2 IS Office 365 Outbound Provisioning Connector supports two ways
of provisioning users based on role:

- **Manually assign users to a role named "Office365" in WSO2 IS**  
    An identity admin assigns a user to the "Office365" role and WSO2 IS
    provisions the user to Azure AD.

    !!! info
        For instructions, see [Configuring Microsoft Azure AD Outbound
        Provisioning
        Connector](https://github.com/wso2-extensions/identity-office365/blob/master/components/org.wso2.carbon.identity.outbound.provisioning.connector.office365/doc/README.md)
        .

- **On-demand provisioning**  
    When a user first attempts to log in to Microsoft Office365 Online,
    WSO2 IS assigns the user to the "Office365" role using a
    pre-configured adaptive authentication script and then provisions
    the user to Azure AD. The user is authenticated using WSO2 IS and
    logged in to Microsoft Office365 Online.

    !!! info
        For instructions, see one of the following (depending on which
        protocol you wish to use):

        -   [Configuring Office365 SAML2 with WSO2 Identity
            Server](../../learn/configuring-office365-saml2-with-wso2-identity-server)
        -   [Configuring Office365 WS-Federation with WSO2
            IS](../../learn/configuring-office365-ws-federation-with-wso2-is)