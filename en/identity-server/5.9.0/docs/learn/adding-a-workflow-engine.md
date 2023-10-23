# Adding a Workflow Engine

This section demonstrates how to configure the WSO2 Identity Server (IS)
to connect to the [Business Process Management (BPM) component of WSO2
Enterprise
Integrator](https://docs.wso2.com/display/EI650/Working+with+Business+Processes) version 6.5.0
. This can be done by creating a BPM Workflow Engine and configuring it
accordingly. You can have many engines configured in different profiles
and use one of them when creating a workflow.

!!! info 
    An embedded Business Process Management engine is included in WSO2
    Identity Server. However, if you need more flexibility and more
    extensibility with this feature than what is currently provided, it is
    advisable to [integrate the Business Process Management (BPM) component
    of WSO2 Enterprise
    Integrator](../../learn/configuring-the-bpm-profile-of-wso2-ei-as-a-workflow-engine)
    with the WSO2 Identity Server.

1.  To create a BPM profile, click on **Configure \> Workflow Engine
    Profiles \> Add**. The window below will be displayed.

2.  Fill in the details using the descriptions below to guide you and
    click **Add**.  
    ![creating-a-bpm-profile](../assets/img/using-wso2-identity-server/creating-a-bpm-profile.png) 

    | Attribute                     | Description                                                                                                                                                                                                                                       | Sample Value                                                                                                                                                         |
    |-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Profile Name                  | A unique name to identify the profile.                                                                                                                                                                                                            | `               WSO2BPS1              ` (This should only contain letters and numbers.)                                                                              |
    | BPS Manager Host Services URL | The host URL of the BPS manager node.                                                                                                                                                                                                             | `                               https://localhost:9444/services                             ` (This points to the manager node of WSO2 BPS that is already running.) |
    | BPS Worker Host Services URL  | The host URL of the BPS worker node.                                                                                                                                                                                                              | `                               https://localhost:9444/services                             ` (This points to the worker node of WSO2 BPS that is already running.)  |
    | User name                      | The user name that is used to authenticate the user in WSO2 BPS. The requests are sent to BPS as this user. Therefore, the user needs to have permission to deploy and invoke Business Process Execution Languages (BPEL) and perform human tasks. | `               user1              `                                                                                                                                 |
    | Password                      | The password of the user mentioned above.                                                                                                                                                                                                         | `               passwd              `                                                                                                                                |

### What's next?

-   To have more flexibility and extensibility in this feature, see [Integrate the Business Process Management (BPM) component of WSO2 Enterprise Integrator with the Identity Server](../../learn/configuring-the-bpm-profile-of-wso2-ei-as-a-workflow-engine).
-   To create a new workflow definition, see [Adding a New Workflow
    Definition](../../learn/adding-a-new-workflow-definition).

  


