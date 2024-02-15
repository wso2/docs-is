This section describes the recommended workflow that can be used to promote WSO2 Identity Server resource configurations from one environment to another. 

The [IAM-CTL](https://github.com/wso2-extensions/identity-tools-cli) tool is developed to manage the WSO2 Identity Server configurations from the command line. It is written in [GO](https://go.dev/) and uses the management REST APIs of WSO2 Identity Server to manage configurations of the supported resources. 

Follow the instructions given [here](https://github.com/wso2-extensions/identity-tools-cli/tree/master) to setup and use the tool.


The CLI mode of this tool can be used to handle bulk configurations in the target environment. This can be used to promote resources across multiple environments, deploy new configurations to target environments, and act as a backup of each environment's configurations.

This mode consists of the `exportAll` and `importAll` commands that can be used to export and import all configurations of the supported resource types from or to a target environment.

Currently, the supported resource types are:

- Applications
- Identity Providers
- Claims
- User Stores

Since this tool allows export and import of major resource configurations using the command line, it can be integrated with CI/CD pipelines to automate the deployment process or resource propagation across multiple environments. Refer the [sample workflow](https://github.com/wso2-extensions/identity-tools-cli/blob/master/docs/resource-propagation.md) to find instructions on continuously propagating resources across multiple environments using github workflows.