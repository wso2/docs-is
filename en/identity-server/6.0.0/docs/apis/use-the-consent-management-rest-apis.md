# Consent Management REST APIs

The consent management APIs in WSO2 Identity Server collect and manage
end user consents when user information is shared with external parties.
The following sections guide you through the consent management concepts
and the APIs you can invoke.

---

## Definitions for consent management

This section defines and explains commonly used terms in consent
management.

-   **Personally Identifiable Information (PII)**: Any information that can be used to identify the PII Principal to whom the information relates to.
-   **PII Principal**: The natural person to whom the personally identifiable information (PII) relates to.
-   **Consent**: A Personally identifiable information (PII) Principal’s freely
    given, specific and informed agreement to the processing of their
    PII.
-   **Purpose**: The business, operational or regulatory requirement for the
    collection, use and/or disclosure of a PII Principal's data. In
    other words, it is the reason personal information is collected by
    the entity.
-   **Consent Receipt**: A record of a consent interaction (or consent record summary
    linked to the record of consent) provided by a PII Principal to a
    PII Controller to collect, use and disclose the PII Principal’s PII
    in accordance to an agreed set of terms.
-   **PII Controller**: A private stakeholder that determines the purposes and means for
    processing personally identifiable information (PII) other  than the
    natural persons who use data for personal purposes.  
Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    !!! info 
        For more information on how to extend or customize this, see
        [Extension points](#extension-points).

    ``` 
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
            
    | Property         | Type    | Required/Optional | Description                                                                                                                            |
    |------------------|---------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------|
    | `name`           | string  | Required          | Name of the first PII controller who collects the data.                                                                                |
    | `contact`        | string  | Required          | Contact name of the PII controller.                                                                                                    |
    | `email`          | string  | Required          | Contact email address of the PII Controller. The direct email to contact the PII Controller regarding the consent or privacy contract. |
    | `phone`          | string  | Required          | Contact phone number of the PII Controller. The business phone number to contact the PII Controller regarding the consent.             |
    | `on_behalf`      | boolean | Optional          | A PII Processor acting on behalf of a PII Controller or PII Processor.                                                                 |
    | `url`            | string  | Optional          | A URL for contacting the PII Controller.                                                                                               |
    | `country`        | string  | Required          | Country of the PII controller.                                                                                                         |
    | `locality`       | string  | Required          | Locality of the PII controller.                                                                                                        |
    | `region`         | string  | Required          | Region of the PII controller.                                                                                                          |
    | `po_box`         | string  | Required          | Post office box number of the PII controller.                                                                                          |
    | `postal_code`    | string  | Required          | Postal code of the PII controller.                                                                                                     |    
    | `street_address` | string  | Required          | Street address of the PII controller.                                                                                                  |

-   **PII Processor**: A private stakeholder that processes personally identifiable
    information (PII) on behalf of and in accordance with the
    instructions of a PII controller.

## Extension points

You can customize the REST APIs using the following extension points:

-   [PIIController connector extension](https://github.com/wso2/samples-is/tree/product-is3289/consent-mgt/piicontroller/org.wso2.carbon.identity.piicontroller) -
    A sample implementation that demonstrates registering a PII
    controller and providing PII controller information for consent
    receipts.  
-   [Interceptor extension](https://github.com/wso2/samples-is/tree/product-is3289/consent-mgt/interceptor) -
    A sample implementation that demonstrates registering a consent
    management interceptor and intercepting consent management related
    operations.
