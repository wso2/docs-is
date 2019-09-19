# Workflow Management

The workflow feature enables you to add more control and constraints to
the tasks executed within it. For instance, with the workflow feature,
you can add another constraint to the ‘User Add’ operation in the WSO2
Identity Server, that requires manager approval when adding a user
account. These are workflows where the operations go through a
predefined path.

!!! tip
    
    Any defined workflow does not get applied to tenant admin user
    creation process during the tenant creation.
    

These types of tasks can be done through the WSO2 Business Process
Management (BPM) component of WSO2 Enterprise Integrator but this new
feature adds that capability to the Identity Server as well. This topic
demonstrates how you can work with workflows in Identity Server.

The following is a sample use case.

Consider a company where new employees are added to the system by HR,
but only after it goes through an approval process. For example, a
senior HR manager has to approve new user additions. Once this is done,
the user can login to the system and continue his work. The following
pre-requisites are necessary to implement this sample use case:

![sample-for-workflow](../assets/img/using-wso2-identity-server/sample-for-workflow.png) 

!!! tip
    
    For more information about workflow usecases and a demo of workflow
    management using the WSO2 IS management console, watch the screencast
    video below.

<iframe width="800" height="500" src="https://www.youtube.com/embed/2MM-0B3SI7A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Prerequisites

-   [WSO2 Identity Server](http://wso2.com/products/identity-server/)

!!! info 
    An embedded Business Process Management engine is included in WSO2
    Identity Server to execute this feature. However, if you need more
    flexibility and more extensibility with this feature than what is
    currently provided, it is advisable to integrate the [Business Process
    Management (BPM) component of WSO2 Enterprise
    Integrator](https://docs.wso2.com/display/EI611/Business+Process+Management)
    with the Identity Server.

The following sections will guide you through the process of
implementing this sample use case. Follow them in the given order.

  
