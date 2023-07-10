# Workflow Management

The workflow feature enables you to add more control and constraints to the tasks executed within it. For instance, with the workflow feature, you can add another constraint to the `User Add` operation in the WSO2 Identity Server.

For example, you may require that manager approval when adding a user account.

!!! note
    Any defined workflow does not get applied to the tenant admin user creation process during the tenant creation.

This topic demonstrates how you can work with workflows in the WSO2 Identity Server.

## Sample use case

Consider a company where new employees are created by HR team but will be added to the system only after it goes through an approval process.

A senior HR manager has to approve new user additions. Once this is done, the users can log in to the system and continue their work.

![sample-for-workflow]({{base_path}}/assets/img/guides/workflows/sample-for-workflow.png)

!!! info
    An embedded Business Process Management engine is included in WSO2 Identity Server to execute this feature. However, if you need more flexibility and more extensibility with this feature than what is currently provided, it is advisable to integrate WSO2 Identity Server with [WSO2 Enterprise Integrator](https://ei.docs.wso2.com/en/latest/).
