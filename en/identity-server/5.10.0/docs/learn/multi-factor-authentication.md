# Multi-factor Authentication (MFA)

This section describes multi-factor authentication (MFA) and guides you on how to enable MFA for the WSO2 Identity Server Management Console. By default, WSO2 Identity Server is shipped with username-and-password-based authentication. You can further strengthen the security of this authentication by adding an additional authentication step to authenticate with basic authentication, FIDO, TOTP, etc.

## About MFA

### Shortcomings in traditional authentication
Due to increasing digital crimes and internet fraud in the world, people are highly concerned about the topic of online security. It is obvious that traditional user Id and password are not enough to
secure the authentication. Processing speeds of CPUs have increased, so brute force attacks are a reality and dictionary attacks have become a common threat. GPGPU password cracking and rainbow tables have provided similar advantages to attackers.

### Benefits of MFA
MFA creates a layered defence and makes it more difficult for an unauthorized person to access a target such as a physical location, computing device, web service, network, or database. If one factor is compromised or broken, the attacker still has at least one more barrier to breach before successfully breaking into the target.


### Authentication factors
Authentication factors in MFA rely on two or more independent credentials of the three categories.    

-   **Knowledge factors**: Things only the user knows, such as passwords.  

-   **Possession factors**: Things only the user has, such as ATM cards.  

-   **Inherence factors**: Things only the user is, such as a fingerprint.  

With a combination of two or more factors from the above three, the user is authenticated. 

!!! example
    When withdrawing money with an ATM card; the card is the possession factor and the PIN is the knowledge factor.   

### MFA with WSO2 Identity Server

WSO2 Identity Server allows configuring multi-step authentication where you can define an authentication chain containing different authenticators in different steps. This chain can also be converted to a multi-factor authentication chain by adding different factors of authentication to each step. For example, you can configure user name-password-based authentication as the first factor (knowledge factors) and then FIDO authentication as the second factor (possession factors).

![mfa-with-is](../assets/img/using-wso2-identity-server/mfa-with-is.png)

WSO2 Identity Server has comprehensive support for MFA, with authenticators available for **SMSOTP, FIDO, MEPin** and more.

!!! info 
    For a complete list of readily available authenticators, click [here](https://store.wso2.com/store/assets/isconnector/list).

!!! note    
    There are certain second-factor authenticators that should be followed by a Knowledge-factor authenticators to figure out the user first, e.g., when you configure FIDO authenticator, it should not be  onfigured as the first step. Instead, it should be followed by a first factor authenticator. 


### MFA with federated authenticators

WSO2 Identity Server enables configuring MFA in the following ways when a federated identity provider (IdP) is configured as the first factor. 

-   Configuring MFA based on the claims that are provided by the locally provisioned/associated user of the federated IdP in the first factor. (Recommended)   

-   Configuring the second factor based on the claims that are provided by the federated IdP in the first factor. (Not recommended)    

!!! warning

    When the second factor is based on a claim that is provided by a federated IdP in the first step, if the federated IdP gets compromised, the execution of the second MFA step will be solely dependent on the claims that are provided by the compromised federated IdP. Hence, the second MFA step that is based on a locally provisioned/associated federated user is recommended as it will act as a guard step when the federated IdP get compromised, as the claims that are used for MFA are dependant on the locally provisioned/associated user rather than claims provided by the compromised federated IdP.


!!! Tip "Try it out" 
    Try [authenticating with FIDO](../../learn/multi-factor-authentication-using-fido)
    as a second factor and [configuring MFA for management console](../../learn/multi-factor-authentication-for-wso2-is-management-console).
       
