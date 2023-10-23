# Workflow Management

The workflow feature enables you to add more control and constraints to the tasks executed within it. For instance, with the workflow feature, you can add another constraint to the ‘User Add’ operation in the WSO2 Identity Server, that requires manager approval when adding a user account. These are workflows where the operations go through a predefined path.

!!! note
    
    Any defined workflow does not get applied to tenant admin user creation process during the tenant creation.
    

These types of tasks can be done through the WSO2 Business Process Management (BPM) component of WSO2 Enterprise Integrator but this new feature adds that capability to the Identity Server as well. This topic demonstrates how you can work with workflows in Identity Server.

Let's consider a sample use case.

## Sample use case

Consider a company where new employees are added to the system by HR but only after it goes through an approval process. For example, a senior HR manager has to approve new user additions. Once this is done, the users can log in to the system and continue their work. The following pre-requisites are necessary to implement this sample use case:

![sample-for-workflow](../assets/img/using-wso2-identity-server/sample-for-workflow.png) 

!!! info 
    An embedded Business Process Management engine is included in WSO2 Identity Server to execute this feature. However, if you need more flexibility and more extensibility with this feature than what is
    currently provided, it is advisable to integrate WSO2 Identity Server with [WSO2 Enterprise Integrator](https://ei.docs.wso2.com/en/latest/).

## What's Next

The following sections will guide you through the process of implementing this sample use case. Follow them in the given order.

-   [Adding a New Workflow Definition](../../learn/adding-a-new-workflow-definition/)
-   [Engaging a Workflow in an Operation](../../learn/engaging-a-workflow-in-an-operation/)
-   [Managing Human Tasks](../../learn/managing-human-tasks/)
-   [Monitoring Workflow Requests](../../learn/monitoring-workflow-requests/)  
