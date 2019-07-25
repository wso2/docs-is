# Adding a Workflow Engine

This section demonstrates how to configure the WSO2 Identity Server (IS)
to connect to the [Business Process Management (BPM) component of WSO2
Enterprise
Integrator](https://docs.wso2.com/display/EI611/Business+Process+Management)
. This can be done by creating a BPM Workflow Engine and configuring it
accordingly. You can have many engines configured in different profiles
and use one of them when creating a workflow.

An embedded Business Process Management engine is included in WSO2
Identity Server. However, if you need more flexibility and more
extensibility with this feature than what is currently provided, it is
advisable to [integrate the Business Process Management (BPM) component
of WSO2 Enterprise
Integrator](_Configuring_the_BPM_Profile_of_WSO2_EI_as_a_Workflow_Engine_)
with the Identity Server.

1.  To create a BPM profile click on **Configure \> Workflow Engine
    Profiles \> Add**. The window below will be displayed.

2.  Fill in the details using the descriptions below to guide you and
    click **Add**.  
    ![]( ../../assets/img/103330286/103330287.png) 

    | Attribute                     | Description                                                                                                                                                                                                                                       | Sample Value                                                                                                                                                         |
    |-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Profile Name                  | A unique name to identify the profile.                                                                                                                                                                                                            | `               WSO2BPS1              ` (This should only contain letters and numbers.)                                                                              |
    | BPS Manager Host Services URL | The host URL of the BPS manager node.                                                                                                                                                                                                             | `                               https://localhost:9444/services                             ` (This points to the manager node of WSO2 BPS that is already running.) |
    | BPS Worker Host Services URL  | The host URL of the BPS worker node.                                                                                                                                                                                                              | `                               https://localhost:9444/services                             ` (This points to the worker node of WSO2 BPS that is already running.)  |
    | Username                      | The username that is used to authenticate the user in WSO2 BPS. The requests are sent to BPS as this user. Therefore, the user needs to have permission to deploy and invoke Business Process Execution Languages (BPEL) and perform human tasks. | `               user1              `                                                                                                                                 |
    | Password                      | The password of the user mentioned above.                                                                                                                                                                                                         | `               passwd              `                                                                                                                                |

### What's next?

-   Need more flexibility and more extensibility with this feature?
    [Integrate the Business Process Management (BPM) component of WSO2
    Enterprise Integrator with the Identity
    Server](_Configuring_the_BPM_Profile_of_WSO2_EI_as_a_Workflow_Engine_)
    .
-   Now you need to create a new workflow definition. For more
    information, see [Adding a New Workflow
    Definition](_Adding_a_New_Workflow_Definition_).

  
