# Introduction to Identity Provisioning

## What is identity provisioning? 

Identity provisioning is the process of creating, updating, managing, and removing digital identities in a system or application. The main purpose of identity provisioning using an identity management system like WSO2 Identity Server (WSO2 IS), is to automate the process of creating and managing these user identities so that it can be done as efficiently as possible, even on multiple platforms or applications. 

----

## Why do I need provisioning?

Most enterprise solutions adopt products and services from multiple cloud providers to accomplish various business requirements. This makes it insufficient to maintain user identities only in a corporate LDAP. Managing user accounts on multiple applications can be challenging and can lead to outdated information, outdated permissions, data mismatch, and security issues. Identity provisioning plays a key role in propagating user identities across different SaaS providers.

For instance, if an employee leaves an organization, their user account may need to be removed and permissions may need to be revoked from multiple applications within the organization. However, it takes extra effort to ensure that it is properly removed from all applications, and doing this manually opens up the possibility of human error thereby possibly causing security issues. A much cleaner and more efficient approach would be to use identity provisioning to automate this and ensure that the account deletion or permission revoking reflects on the linked user accounts across all applications.

---

## How does it work?

WSO2 IS can ensure that provisioning is made easy. A provisioning request can be sent to WSO2 IS to add or remove a user and this user is provisioned or deprovisioned accordingly across various applications that are configured with WSO2 Identity Server. The diagram below illustrates the process.

<img name='identity-provisioning-diagram' src='../../../assets/img/concepts/identity-provisioning.png' class='img-zoomable'/>

After a user has been provisioned, WSO2 IS can also help maintain the user's updated information across all configured applications. For example, to update a user attribute such as telephone number, you can update the information in one place and WSO2 IS will ensure that it is reflected in all connected user accounts.

----

## Types of identity provisioning

Provisioning is bi-directional, hence there are two main types.

- [Inbound Provisioning](TODO:link-to-concept)
- [Outbound Provisioning](TODO:link-to-concept)

----
 
!!! info "Related Links"
    - [Concept: Provisioning Framework](TODO:link-to-concept)
    - [Concept: Inbound Provisioning](TODO:link-to-concept)
    - [Concept: Outbound Provisioning](TODO:link-to-concept)
    - [Guide: Inbound Provisioning](../../../guides/identity-lifecycles/outbound-provisioning)
    - [Guide: Outbound Provisioning](../../identity-lifecycles/inbound-provisioning)


