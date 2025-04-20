# Manage environments

You can manage the development lifecycle of your applications by setting up the required environments as separate root organizations.

For example, you may require a development environment and a preprod environment in addition to your organization's production environment. These environments will be used during the development and testing phases before you go into production.

## Define your environments

Follow the steps below to create a separate organization (root) to represent each environment you require.

1. Go to the root organization list and click **New**.

2. Enter a name and description for your organization (root) and click **Create**.

    Use unique organization names to identify the environments. For example, if your business organization is Bifrost, you may use the following convention:

    <table>
        <tr>
            <th>Business environment</th>
            <td>Bifrost</td>
        </tr>
        <tr>
            <th>Preprod environment</th>
            <td>BifrostPreProd</td>
        </tr>
        <tr>
            <th>Dev environment</th>
            <td>BifrostDev</td>
        </tr>
    </table>


3. Onboard the required users to each environment.
    - As the owner, you can onboard the required administrators to each environment. Learn more about onboarding administrators.

        !!! note
            Note that some administrators may be needed in multiple environments. They can easily switch between the environments on the {{ product_name }} Console.


    - Business users can be onboarded to each environment depending on the requirements. Learn more about onboarding users.

        !!! note
            Note that your actual business users (consumers) should only be onboarded to the business environment.

## Move artifacts between environments

The applications and other artifacts you develop should be migrated between environments after each phase of the development lifecycle until they are live in the business environment.

![Manage environments](../../../assets/img/guides/organization/manage-organizations/manage-environments.png)

For example, once applications and artifacts are developed and tested in the **BifrostDev** environment, they need to be migrated to the **BifrostPreprod** environment for further testing and then moved to the live business environment.

To streamline this workflow, we recommend using the [IAM-CTL tool]({{base_path}}/guides/your-asgardeo/manage-environments/promote-configurations).

!!! note "Important"
    Some configurations, such as client IDs, secrets, URLs, and connection configurations, will be specific to the business environment, while other functional attributes, such as adaptive authentication scripts, remain the same in all environments. The IAM-CTL tool accommodates this by providing environment-specific keyword mapping.
