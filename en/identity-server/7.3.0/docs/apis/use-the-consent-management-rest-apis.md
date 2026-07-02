# Consent Management REST APIs

WSO2 Identity Server provides REST APIs for managing user consents. Two versions of the consent management API are available:

| API | Base path | Description |
|-----|-----------|-------------|
| [Consent management API]({{base_path}}/apis/consent-management-api-definition/) | `/api/identity/consent-mgt/v1.0` | Original consent management API based on the ISO/IEC 29184 model with PII controllers, purposes, and consent receipts. |
| [Consent management API v2]({{base_path}}/apis/consent-management-v2-api-definition/) | `/api/identity/consent-mgt/v2.0` | Revised API with a simplified model covering purposes, elements, and consent records. Use this for new integrations. |

For self-service consent management by end users, see the [User consent API]({{base_path}}/apis/user-consent-rest-api/).

## Consent management API (v1)

The v1 API is based on the ISO/IEC 29184 standard for online privacy notices and consent. Key concepts:

- **PII Principal**: The natural person to whom the personally identifiable information (PII) relates.
- **PII Controller**: The entity that determines the purposes and means for processing PII.
- **PII Processor**: A stakeholder that processes PII on behalf of a PII Controller.
- **Purpose**: The business, operational, or regulatory reason for collecting PII.
- **Consent Receipt**: A record of a consent interaction provided by a PII Principal.

### Configure the PII controller

Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[authentication.pii_controller]
name = "Kim"
contact = "Kim"
email = "kim@abc.com"
phone = "01433444333"
on_behalf = "false"
url = "https://sample.piicontroller.url"
country ="USA"
locality = "Mountain View"
region = "CA"
po_box  = "233"
postal_code  = "94043"
street_address = "1600"
```

| Property         | Type    | Required/Optional | Description |
|------------------|---------|-------------------|-------------|
| `name`           | string  | Required          | Name of the first PII controller who collects the data. |
| `contact`        | string  | Required          | Contact name of the PII controller. |
| `email`          | string  | Required          | Contact email address of the PII Controller. |
| `phone`          | string  | Required          | Business phone number to contact the PII Controller. |
| `on_behalf`      | boolean | Optional          | A PII Processor acting on behalf of a PII Controller or PII Processor. |
| `url`            | string  | Optional          | A URL for contacting the PII Controller. |
| `country`        | string  | Required          | Country of the PII controller. |
| `locality`       | string  | Required          | Locality of the PII controller. |
| `region`         | string  | Required          | Region of the PII controller. |
| `po_box`         | string  | Required          | Post office box number of the PII controller. |
| `postal_code`    | string  | Required          | Postal code of the PII controller. |
| `street_address` | string  | Required          | Street address of the PII controller. |

### Extension points

- [PIIController connector extension](https://github.com/wso2/samples-is/tree/product-is3289/consent-mgt/piicontroller/org.wso2.carbon.identity.piicontroller){:target="_blank"} - A sample implementation for registering a PII controller and providing PII controller information for consent receipts.
- [Interceptor extension](https://github.com/wso2/samples-is/tree/product-is3289/consent-mgt/interceptor){:target="_blank"} - A sample implementation for registering a consent management interceptor.

## Consent management API v2

!!! note "Prerequisites"
    Add the following to your `deployment.toml` to enable the v2 API:

    ```toml
    [consent_mgt]
    enable_v2_api = true
    ```

The v2 API provides a simplified consent management model. Key concepts:

- **Purpose**: A consent use case (e.g., "Privacy Policy", "Marketing"). Supports versioning.
- **Element**: A data element subject to consent (e.g., email address, phone number).
- **Consent**: A user consent record linking a subject to one or more purposes and elements.
