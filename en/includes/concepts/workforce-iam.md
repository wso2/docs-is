# Manage employees, their access and SSO 

Whether you are a large enterprise, startup, or medium-sized business, one of the key software components you need to invest in is an employee identity solution. This system helps you efficiently provision and deprovision users, while managing their access across your organization. Too relaxed employee identity practices increase both security and business risks, while overly strict employee identity practices can lead to inefficiencies and frustration among staff. Therefore, it is important to choose an employee identity solution that aligns with your security requirements and increase productivity. A well-implemented identity solution offers several benefits, including:

- **Improved Efficiency and Productivity** - Employee identity solutions improve efficiency and productivity by automating user provisioning and deprovisioning, ensuring that staff members have the correct system access without the need for manual intervention. Enterprise Single-Sign-On (SSO) allows seamless access to multiple applications, both on-premise and cloud-based, without the need to relogin. Additionally, the group and role-based capabilities make it easier to manage access based on job roles.

- **Enhanced Security** - Employee identity solutions enhance security by offering advanced authentication methods like security keys, passkeys, and push notifications. Risk-based adaptive authentication evaluates access based on factors like location, device, and behavior, while access control limits permissions to what's necessary for job duties. Automated provisioning and deprovisioning ensure prompt removal of access when employees leave or change roles, also helping enforce security policies

- **Cost Reduction** - Adopting an employee identity solution leads to significant cost reductions by reducing administrative burdens. These solutions save valuable time and resources by minimizing tedious tasks such as manual password resets and manual registration of security devices. By consolidating user accounts and access management, organizations can eliminate or reduce expenses associated with managing identities across multiple applications

- **Improved Compliance** - Employee identity solutions play a crucial role in maintaining regulatory compliance. They provide organizations with control over access rights, helping meet various data protection and privacy regulations such as GDPR. Centralized management of user identities and access enables better transparency in security policies, configurations, and privileges, ensuring that organizations can effectively uphold compliance standards. 

## On-board workforce, provisioning them to systems and manage access  

Automate and create unified onboarding experiences for your workforce by integrating various on-boarding channels such as HRM systems, existing AD and LDAP directories with {{product_name}} to create a unified view of your workforce that enables centralized workforce management. Different provisioning and deprovisioning policies can be implanted as per workforce variance based on their employment such as full-time, contractual and outsourced and based on their job roles.  
 
- Use SCIM 2.0 industry standard to provision and deprovision workforce user accounts 

- Use {{product_name}} console to create and invite workforce users 

- Define and manage workforce access to your business applications using roles and user groups available with [{{product_name}} RBAC]({{base_path}}/guides/authorization/api-authorization/api-authorization/).

## Secure workforce and business with strong authentication  

Secure user accounts of your workforce and business applications by enforcing MFA options. {{product_name}} offers secure MFA options including SMS and Email OTP, TOTP using authenticator apps, FIDO-based Passkeys, Duo-based push notifications and hardware tokens and facial biometrics such as iProov.   

Get rid of passwords completely and offer secure passwordless authentication for your workforce using Magic Link, Passkeys, biometrics and Email/SMS OTPs. 

- Configure Email OTP for your workforce 
- Configure SMS OTP for your workforce
- Configure TOTP for your workforce 
- Configure Passkey for your workforce
- Configure Magic Link for your workforce 
- Configure Duo push notifications and hardware tokens for your workforce
- Configure iProov facial biometrics for your workforce 
- Configure HYPR biometric for your workforce
 
{{product_name}} automatically configures a default login flow for you to get started. You can design your desired login flow by adding social providers or MFA options using {{product_name}}'s visual login flow designer, where you can drag and drop the required elements. Alternatively, you can use the Login Flow AI feature to generate the desired login flow based on your plain text instructions.
   
Make workforce authentication adaptive by adjusting authentication options such as adaptive MFA , adaptive access control and passkey enrollment as per the current risk level assessed using contextual parameters such as location, device and behavior. {{product_name}} offers a set of ready to use templates that can be configured for your workforce requirements and you can also develop your own adaptive authentication scripts. 

- Configure group-based access control 
- Configure concurrent sessions based access control
- Configure MFA based on user sign-in option 
- Configure MFA based on user device 
- Configure MFA based on user group
- Configure MFA based on IP address 
- Configure progressive passkey enrolment  
- Write your own adaptive authentication script 

## Provide Single-Sign-On (SSO) across your application 

Make your workforce experience frictionless and efficient when accessing the cloud-based and on-premise applications by enabling enterprise SSO. The SSO templates provided by {{product_name}} make it easy for you to integrate with cloud applications. 

- Configure SSO for Office365 
- Configure SSO for Google Workspace
- Configure SSO for Salesforce  
- Configure SSO for OpenID Connect supported applications 
- Configure SSO for SAML 2.0 supported applications 

## Enable self-care account management capabilities for your workforce  

Let your workforce manage their profiles, protect their accounts, and handle recovery on their own. {{product_name}} offers all the required self-management features for your application out of the box, your application can be integrated with {{product_name}} user self-care portal components with your own branding. 

Add self-manage features for your application users: 

- Allow users to update their user profiles
- Allow users to update their passwords 
- Allow users to recover forgotten password 
- Allow users to login with multiple login identifies 
- Allow users to associate social accounts 
- Allow users to enable MFA 
- Allow users to enroll passkeys 
- Allow users to review consents 
- Allow users to export their user profile