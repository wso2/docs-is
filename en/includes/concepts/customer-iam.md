# ​​Onboard Business customers, delegate administration and customize login

It is a common and critical requirement to develop applications that serve business customers and partners, and ultimately enable you to cater to their (consumer) customer bases too. In some cases, rather than business customers and partners, the application may need to accommodate multiple business units or groups of related organizations. These types of applications are generally known as B2B (business-to-business) applications, and the B2B model is particularly prevalent in cloud-based Software as a Service (SaaS) businesses.

## Overview

B2B identity specifically addresses use cases associated with B2B applications, such as onboarding and managing business customers and partners (also referred to as organization management), delegated administration, and providing custom login flows for the end-users of business customers and partners. 

Use of the right B2B identity capabilities offers significant advantages, including:

- **Efficient business customer onboarding** - Manual and ad-hoc onboarding methods slow down the process, causing delays and missed business opportunities. B2B identity solutions streamline onboarding through automation and APIs, enabling self-onboarding or administrative control, fostering smoother engagement with customers and partners.

- **Delegated control** - Managing staff accounts for customers and partners places a burden on IT teams, requiring continuous provisioning and deprovisioning,  and also leads into administrative overhead . B2B identity solutions offer delegated administration, allowing partner administrators to handle user management and their access control reducing IT support overhead.

- **Frictionless user experiences** - Duplicate accounts and separate credential creation for end users from business customers and partners, complicating the user experience and damaging brand loyalty. B2B identity solutions enable partners to integrate their customer identity providers and customize login flows as per their security expectations. 

- **Return of Investment (RoI)** - Manual processes increase operational expenses due to the need for additional IT support. B2B identity solutions improve ROI by automating processes, minimizing administrative tasks, and stabilizing costs as the business grows, enabling investment in growth-focused initiatives.

- **Risk Management** - Relying on manual processes introduces security vulnerabilities and privacy risks, such as managing multiple credentials and user accounts. B2B identity solutions reduce risks through automated onboarding, end-to-end auditing, and letting business customers and partners to bring their own customer and employed identity providers (IdPs)  

## On-board business customers and partners   

Just as you allow your B2C consumers to self-sign up for your application, you can extend the same capability to business customers and partners. Achieve this by integrating {{product_name}} Organization APIs into your business customer and partner-facing applications, whether developed in-house or using bespoke solutions like CMS or ERP systems. {{product_name}} provides flexibility to map any complex business organization with complex hierarchies and manage their interactions and bounders.  
 
!!! tip
    
    Download and explore the Postman collection to better understand how to integrate [{{product_name}} Organization APIs]({{base_path}}/apis/organization-apis/) with your application.

In cases where you need more control over the onboarding process and prefer to initiate it yourself, you can integrate [{{product_name}} organization APIs]({{base_path}}/apis/organization-apis/) with your existing business customer and partner management applications.

If you don’t have dedicated onboarding applications to integrate with [{{product_name}} Organization APIs]({{base_path}}/apis/organization-apis/), you can simply use the {{product_name}} console to initiate the onboarding process and invite your business customers and partners.

## Delegate administrative tasks 

Delegate and let business customers and partners on-board their staff members,  manage their access in your applications, on-board their customer identity providers (IdPs) and customize the login experience to meet their own security requirements.   

- Enable business customers and partners to onboard their staff 
    - Create user accounts for their staff 
    - Invite staff to setup user accounts 
    - Plug employee-IdP 
 
- Enable business customers and partners to manage their stuff as user groups
  
- Enable business customers and partners to assign roles to their staff and manage their access in your B2B application

## On-board consumers from business customers and  define their experience     

Enable business customers and partners to plug their customer-IdPs to enable friction-less login experience for their customers (consumers) accessing your applications. Consumers can be on-boarded to match with your organizational business structure. 

<table> 
<tr>
<td>
Manage staff and consumers of each organization at their own organizational level, ensuring fully isolated user onboarding and management experience. Ideal for organization  with business customers and partners.  Organizations can be provided the flexibility to onboard their own business customers and partners forming a hierarchical business ecosystem. 

[ Diagram] 

</td>
<td>

Manage all the staff and customers centrally at the root-organization level and assign them to sub-organizations with different roles and access based on business needs. This approach is ideal for representing entities within the same corporate group or divisions of a larger organization. Organizations can be represented hierarchically to represent complex organizational structures.    

[Diagram]
</td>
</tr>
</table>
   

!!! tip

    Depending on your requirement you can have a mixture of both strategies allowing you represent complex organizational hierarchies. 

- Let business customers and partners customize and define login experience for their customers using visual login flow editor and enable MFA to secure user accounts.   

- Let business customers and partners rebrand all human-touch points with their own brandings. 

    - Rebrand user sign-up and sign-in screens 
    - Rebrand MFA screens such as SMS/EMail OTP and TOTP. 
    - Rebrand account management password reset and recovery interfaces 
    - Customize EMail templates  
    - My account portal 

- Let business customers and partners enable their customers to access what user profile information are stored by you and manage them by leveraging self-care my account portal and integrating my account API with their own applications.







