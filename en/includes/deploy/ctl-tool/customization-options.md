## Customization Options

IAM-CTL provides the following advanced customization options to handle environment-specific needs and streamline configuration management:

### Keyword Mapping

When managing multiple environments, resource configuration files often contain environment-specific variables. IAM-CTL supports **dynamic keyword replacement** to handle these variables during import or export. Keyword mapping can also be defined for specific resources within that environment.

For more details, refer to the [environment-specific variables guide](https://github.com/wso2-extensions/identity-tools-cli/blob/master/docs/env-specific-variables.md){:target="_blank"}.

### Partial Propagation

IAM-CTL supports **partial propagation** of resources using the below properties.

- **`EXCLUDE`**: Exclude specific resource types or a set of individual resources during import or export.
- **`INCLUDE_ONLY`**: Include only specific resource types or a set of individual resources during import or export.

### Resource Deletion

By default, IAM-CTL does not delete any resources during import. It can be configured to either replace all
existing resources with the imported resources or merge the imported resources with the existing ones using the
**`ALLOW_DELETE`** property.

### Secret Handling

IAM-CTL provides options to manage sensitive data securely. By default, secrets fields are masked.
The **`EXCLUDE_SECRETS`** property can be used to override this behavior and include the secrets in the exported resources.

Learn more about these configurations in the [tool configurations documentation](https://github.com/wso2-extensions/identity-tools-cli/blob/master/docs/cli-mode.md#tool-configurations){:target="_blank"}.
