In WSO2 Identity Server, we need to promote configuration changes such as applications, identity providers, claims and user stores from one environment to another. To handle this, we can use [IAM-CTL](https://github.com/wso2-extensions/identity-tools-cli), which is a tool developed to manage the WSO2 Identity Server configurations from the command line. It is written in [GO](https://go.dev/) and uses the management REST APIs of WSO2 Identity Server to manage configurations. Follow the instructions given [here](https://github.com/wso2-extensions/identity-tools-cli/tree/master) to setup and use the tool.

The IAM CTL can be used in two basic modes.

- [CLI Mode](#cli-mode)
- [Interactive Mode](#interactive-mode)

## CLI Mode

The CLI mode can be used to handle bulk configurations in the target environment. This can be used to promote resources across multiple environments, deploy new configurations to target environments, and act as a backup of each environment's configurations.

This mode consists of the `exportAll` and `importAll` commands that can be used to export and import all configurations of the supported resource types from or to a target environment.

Currently, the supported resource types are:

- Applications
- Identity Providers
- Claims
- User Stores

## Interactive Mode

The interactive mode can be used to handle application configurations in an interactive manner. This can be used to add, list, export, and import applications in the target environment.

!!! note
        This mode does not provide support for bulk resource export or import.
