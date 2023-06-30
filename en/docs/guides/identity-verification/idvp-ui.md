# Onboarding the UI of an IDV Provider to the Identity Server

The UI of an IDV provider is a combination of static and dynamically generated sections. 
The static sections are already baked into the UI implementation, while the metadata for the dynamic sections is pulled from the extensions implementation in the Identity Server.

The following sections of the console and the management console are generated dynamically.

**Console**

- IDV Provider templates page.
- Configuration section in the IDV Provider creation wizard.
- Settings section in the IDV Provider edit page.

**Management Console**

- Configuration Properties section in the Add page of the IDV Provider.
- Configuration Properties section in the edit page of the IDV Provider.

## Steps to onboard an IDV Provider UI

This section provides a step-by-step guide on onboarding an IDV provider UI.

### Step 1: Create an info.json file.

The `info.json` file contains the information about a particular IDV Provider type and will be used when:

- Deciding which IDV Providers are available for configuration in both the console and management console.
- Rendering the IDV Provider templates page in the console.
- Rendering the thumbnail image for each IDV provider in the console.

**Structure**

The following fields should be available on the `info.json`.

| Field        | Description                                                                                                                     | 
|--------------|---------------------------------------------------------------------------------------------------------------------------------| 
| id           | Unique id for the identity verification provider type.                                                                          |
| name         | Name of the identity verification provider type.                                                                                |
| description  | A short description of the identity verification provider type.                                                                 |
| image        | An image URL for the identity verification provider.                                                                            |
| displayOrder | Not utilized in the IDV provider UI. But an integer needs to be included for compatibility with extensions APIs.                |
| tags         | Tags associated with the identity verification provider. Can be used to filter providers based on the tags from the console UI. |
| category     | Not utilized in the IDV provider UI. But a string needs to be included for compatibility with extensions APIs.                  |
| type         | Extension resource type. “identity-verification-provider” should be used as the value.                                          |

**Example**

```json
{
  "id": "ONFIDO",
  "name": "Onfido",
  "description": "Enable identity verification through Onfido",
  "image": "https://example.com/icon.png",
  "tags": ["Enterprise"],
  "category": "DEFAULT",
  "displayOrder": 1,
  "type": "identity-verification-provider"
}
```

### Step 2: Create a metadata.json file

The `metadata.json` file contains the UI metadata that is required for rendering the dynamically generated content. Currently, this file is used when rendering the follwing:

- Configuration section in the IDV Provider creation wizard in the console.
- Settings section in the IDV Provider edit page in the console.
- Configuration Properties section in the IDV Provider add/edit pages in the management console.

The UI metadata defines what content needs to be rendered, how it should be structured, and what validations need to be performed.

**Structure**

The `metadata.json` file should contain the following structure.

```
{
    "common": {
    "configProperties": [ <An array of input fields> ]
    }
}
```

**Supported Input Types**

Currently, the following input field types are supported.

| Input Field Type | Description                                                                          | Supported In                |
|------------------|--------------------------------------------------------------------------------------|-----------------------------|
| identifier       | Renders a text input field that performs validations for identifiers by default.     | Console, Management Console |
| number           | Renders a numeric input field.                                                       | Console, Management Console |
| resource_name    | Renders a text input field that performs validations for resource names by default.  | Console, Management Console | 
| client_id        | Renders a text input field that performs validations for client ids by default.      | Console, Management Console |
| description      | Renders a text area field that performs validations for descriptions by default.     | Console, Management Console |
| email            | Renders a text input field that performs validations for email addresses by default. | Console, Management Console |
| url              | Renders a text input field that performs validations for URLs by default.            | Console, Management Console |     
| password         | Renders a password input field with a show/hide button.                              | Console, Management Console |
| text_area        | Renders a text area field.                                                           | Console, Management Console |
| checkbox         | Renders a checkbox.                                                                  | Console, Management Console |
| toggle           | Renders a toggle button.                                                             | Console                     |
| dropdown         | Renders a dropdown.                                                                  | Console, Management Console |
| default          | Renders a text input field.                                                          | Console, Management Console |

Refer [validation.ts](https://github.com/wso2/identity-apps/blob/master/modules/validation/src/validation.ts) and 
[dynamic-ui-helper.tsx](https://github.com/wso2/identity-apps/blob/master/apps/console/src/features/identity-verification-providers/components/forms/helpers/dynamic-ui-helper.tsx#L269) for more details on how the validations are performed.

**Supported Attributes**

Common Attributes - All Input Fields

The following attributes are supported by every input field type.

| Attribute       | Description                                                                                                                                                                        | Example                           |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| name            | Name of the input field. The name of the input field is used as the key of the configuration property.                                                                             | “token”                           |
| type            | Input field type out of one of the supported input field types specified above. The “default” input type is used if the specified input type is not supported.                     | “password”                        | 
| label           | The label that should be displayed with the input field.                                                                                                                           | “Token”                           |
| hint            | The hint associated with the input field.                                                                                                                                          | “The token obtained from Onfido”  |
| required        | Whether the input field is required or not.                                                                                                                                        | true                              |
| defaultValue    | Default value for the input field.                                                                                                                                                 | “default value”                   |
| displayOrder    | Defines the display order the configuration properties. If the attribute is not defined, elements are ordered according to the order they are defined in the `metadata.json`.      | 1                                 |
| dataComponentId | The data component id of the input field which can be used in test automation.                                                                                                     | “idvp-config-settings-token”      |


Common Attributes - Text and Numeric Input Field Types
Apart from the above-mentioned attributes, the following attributes are supported by every textual and numeric input field type.

| Attribute            | Description                                                     | Example                        |
|----------------------|-----------------------------------------------------------------|--------------------------------|
| Placeholder          | A placeholder value for the input field.                        | “Enter the token from Onfido.” |
| validationRegex      | A regex pattern to be validated against the input field value.  | /^https?:\/\//                 |
| regexValidationError | An error message to display if the regex validation failed.     | “The URL is not secure”        | 
| maxLength            | Maximum number of characters that can be included in the field. | 1024                           |
| minLength            | minimum number of characters that can be included in the field. | 1                              |


Specific Attributes of Input Field Types

**Number**

| Attribute  | Description                                            | Example |
|------------|--------------------------------------------------------|---------|
| minValue   | The minimum value that can be used in the input field. | 1       |
| maxValue   | The maximum value that can be used in the input field. | 100     |

**Dropdown**

| Attribute  | Description                                                                                       | Example                                |
|------------|---------------------------------------------------------------------------------------------------|----------------------------------------|
| Options    | An array of options to be used in the drop-down. Each option has a value and an associated label. | ```[{"value":"nic", "label":"NIC"}]``` |

!!! tip "Important"
> The “defaultValue” attribute of the dropdown type should also be in the above format.

Example
```
{
    "common": {
        "configProperties": [
            {
                "name": "token",
                "displayOrder": 1,
                "hint": "The token obtained from Onfido.",
                "placeholder": "Enter the token from Onfido.",
                "label": "Token",
                "type": "password",
                "required": true,
                "dataComponentId": "idvp-config-settings-token"
            },
            {
                "name": "base_url",
                "displayOrder": 6,
                "hint": "The base url of the Onfido endpoint",
                "placeholder": "Enter the Onfido base url",
                "label": "Base URL",
                "type": "url",
                "validationRegex": "https",
                "regexValidationError": "The URL is not secure",
                "required": false,
                "dataComponentId": "idvp-config-settings-base-url",
                "defaultValue": "https://default-url.com/test"
            },
            {
                "name": "verification_method",
                "displayOrder": 3,
                "hint": "The method of identity verification",
                "placeholder": "Enter the method of identity verification",
                "label": "Verification Method",
                "type": "dropdown",
                "required": true,
                "dataComponentId": "idvp-config-settings-v-method",
                "options": [
                    { "value":"nic", "label":"NIC"},
                    { "value": "passport","label": "PASSPORT"},
                    { "value": "drivingLicense", "label": "DRIVING LICENSE"}
                ],
                "defaultValue": {"value": "nic", "label": "NIC"}
            },
            {
                "name": "timeout",
                "displayOrder": 2,
                "hint": "A timout value in seconds",
                "placeholder": "Enter the timeout value in seconds",
                "label": "Timeout",
                "type": "number",
                "required": true,
                "dataComponentId": "idvp-edit-config-settings-timeout",
                "defaultValue": "100",
                "minValue": 2,
                "maxValue": 120
            },
            {
                "name": "enableSSL",
                "displayOrder": 4,
                "hint": "Check the box to enable SSL",
                "label": "Enable SSL",
                "type": "checkbox",
                "dataComponentId": "idvp-config-settings-enable-ssl",
                "defaultValue": false
            },
            {
                "name": "enableEncryption",
                "displayOrder": 5,
                "hint": "Enables or disables the encryption",
                "label": "Enable Encryption",
                "type": "toggle",
                "dataComponentId": "idvp-config-settings-enable-encryption",
                "defaultValue": true
            },
            {
                "name": "description",
                "displayOrder": 7,
                "hint": "The description of the Onfido IDVP",
                "placeholder": "Enter the description",
                "label": "Description",
                "type": "text_area",
                "required": false,
                "dataComponentId": "idvp-config-settings-description",
                "defaultValue":"A test description"
            }
        ]
    }
}
```

### Step 3: Create a template.json file

The template.json file contains the template that is used to create the IDV provider. When making an API call to create the IDV provider, the template is used as the base of the request body. The relevant fields of the template are then overwritten by the inputs received from the user through the UI.

**Structure**

The template.json should have the following structure.
```
{
    "Type": "< IDV Provider type >",
    "Name": "< A default name for the IDV Provider >",
    "description": "< A default description for the IDV Provider >",
    "isEnabled": < Should the IDV Provider be enabled by default >,
    "claims": [
        {
            "localClaim": "< Local claim that should be mapped to IDVP claim >",
            "idvpClaim": "< Extenal claim >"
        },
        .... other default claim mappings ...
    ],
    "configProperties": [
    {
        "key": "< key of the config property >",
        "value": "< default value for the config property >",
        "isSecret": < should the property be stored as a secret  >
    },
    .... other default config properties ...
    ]
}
```

Example

```
{
    "Type": "ONFIDO",
    "Name": "Onfido IDVP",
    "description": "ONFIDO Identity Verification Provider",
    "isEnabled": true,
    "claims": [
        {
            "localClaim": "http://wso2.org/claims/givenname",
            "idvpClaim": "first_name"
        },
        {
            "localClaim": "http://wso2.org/claims/lastname",
            "idvpClaim": "last_name"
        }
    ],
    "configProperties": [
        {
            "key": "token",
            "value": "",
            "isSecret": true
        },
        {
            "key": "base_url",
            "value": "https://api.eu.onfido.com/v3.6",
            "isSecret": false
        }
    ]
}
```

### Step 4: Copy the created JSON files into the Identity Server

To apply the changes to the WSO2 Identity Server:

1. Create an empty directory in the following path using the name of the particular IDV provider
   `<IS_HOME>/repository/resources/identity/extensions/identity-verification-providers`

2. Copy the created `info.json`, `metadata.json`, and `template.json` files into the directory.

3. Restart the server to apply the changes.

