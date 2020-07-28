# Configure Rule-Based Provisioning

This page guides you through [provisioning users](TODO:link-to-concept) based on defined XACML rules.

To get a better understanding of rule-based provisioning, consider a scenario where you need to provision users assigned to the finance role from WSO2 Identity Server to the GoogleIDP. To implement this scenario, you can define a XACML policy that permits the provisioning operation if the provisioning user is assigned the finance role.

Follow the steps given below to configure rule-based provisioning in WSO2 Identity Server. 

-----

## Step 1: Configure outbound provisioning in WSO2 Identity Server

(TODO:insert-admin-portal-fragment)

----

## Step2: Set up XACML rules

(TODO: insert-admin-portal-fragment)

----

## Step3: Try it out

Once the policies are published to PDP, they are ready to execute during outbound provisioning. You can test rule-based provisioning by creating a user in WSO2 Identity Server that matches the rules you enforced. For example, when you create a user with the role "finance" in WSO2 Identity Server, it should be provisioned to the external IDP you have configured for outbound provisioning as well. A user who is not assigned the "finance" role should not be provisioned.

----

!!! info "Related Topics"
   - [Concept: Role-Based Provisioning](TODO:link-to-concept)
   - [Guide: Role-Based Provisioning](../role-based-provisioning)