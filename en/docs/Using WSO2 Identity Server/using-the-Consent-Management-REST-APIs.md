# Using the Consent Management REST APIs

The consent management APIs in WSO2 Identity Server collect and manage
end user consents when user information is shared with external parties.
The following sections guide you through the consent management concepts
and the APIs you can invoke.

-   [Definitions for consent
    management](#UsingtheConsentManagementRESTAPIs-Definitionsforconsentmanagement)
-   [APIs and supported
    operations](#UsingtheConsentManagementRESTAPIs-APIsandsupportedoperations)
-   [Extension
    points](#UsingtheConsentManagementRESTAPIs-Extensionpoints)

### Definitions for consent management

This section defines and explains commonly used terms in consent
management.

-   **Personally Identifiable Information (PII)**  
    Any information that can be used to identify the PII Principal to
    whom the information relates to.

<!-- -->

-   **PII Principal  
    ** The natural person to whom the personally identifiable
    information (PII) relates to.

<!-- -->

-   **Consent  
    ** A Personally identifiable information (PII) Principal’s freely
    given, specific and informed agreement to the processing of their
    PII.

<!-- -->

-   **Purpose**  
    The business, operational or regulatory requirement for the
    collection, use and/or disclosure of a PII Principal's data. In
    other words, it is the reason personal information is collected by
    the entity.

<!-- -->

-   **Consent Receipt  
    ** A record of a consent interaction (or consent record summary
    linked to the record of consent) provided by a PII Principal to a
    PII Controller to collect, use and disclose the PII Principal’s PII
    in accordance to an agreed set of terms.

<!-- -->

-   **PII Controller  
    ** A private stakeholder that determines the purposes and means for
    processing personally identifiable information (PII) other than the
    natural persons who use data for personal purposes.  
    You can configure a default PII controller in the
    `            consent-mgt-config.xml           ` file found in the
    `            <IS_HOME>/repository/conf           ` folder.

    For more information on how to extend or customize this, see
    [Extension
    points](#UsingtheConsentManagementRESTAPIs-Extensionpoints) .

    ``` java
    <PIIController>
        <PiiController>Kim</PiiController>
        <Contact>Kim</Contact>
        <Email>kim@abc.com</Email>
        <Phone>+01433444333</Phone>
        <OnBehalf>false</OnBehalf>
        <PiiControllerUrl>https://sample.piicontroller.url</PiiControllerUrl>
        <Address>
            <Country>USA</Country>
            <Locality>Mountain View</Locality>
            <Region>CA</Region>
            <PostOfficeBoxNumber>233</PostOfficeBoxNumber>
            <PostalCode>94043</PostalCode>
            <StreetAddress>1600 Amphitheatre Pkwy</StreetAddress>
        </Address>
    </PIIController>
    ```

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information about each property

    | Property             | Type    | Required/Optional | Description                                                                                                                            |
    |----------------------|---------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------|
    | \<PIIController\>    | string  | Required          | Name of the first PII controller who collects the data.                                                                                |
    | \<Contact\>          | string  | Required          | Contact name of the PII controller.                                                                                                    |
    | \<Email\>            | string  | Required          | Contact email address of the PII Controller. The direct email to contact the PII Controller regarding the consent or privacy contract. |
    | \<Phone\>            | string  | Required          | Contact phone number of the PII Controller. The business phone number to contact the PII Controller regarding the consent.             |
    | \<OnBehalf\>         | boolean | Optional          | A PII Processor acting on behalf of a PII Controller or PII Processor.                                                                 |
    | \<PiiControllerUrl\> | string  | Optional          | A URL for contacting the PII Controller.                                                                                               |
    | \<Address\>          | object  | Required          | The physical address of the PII controller.                                                                                            |

<!-- -->

-   **PII Processor**  
    A private stakeholder that processes personally identifiable
    information (PII) on behalf of and in accordance with the
    instructions of a PII controller.

### APIs and supported operations

!!! tip
    
    For information on the REST APIs, supported operations and sample
    requests/responses, see [Consent Management APIs Swagger
    Documentation](https://docs.wso2.com/display/IS580/apidocs/Consent-management-apis/)
    .
    

### Extension points

You can customize the REST APIs using the following extension points:

-   [PIIController connector
    extension](https://github.com/wso2/samples-is/tree/product-is3289/consent-mgt/piicontroller/org.wso2.carbon.identity.piicontroller) -
    A sample implementation that demonstrates registering a PII
    controller and providing PII controller information for consent
    receipts.  
-   [Interceptor
    extension](https://github.com/wso2/samples-is/tree/product-is3289/consent-mgt/interceptor) -
    A sample implementation that demonstrates registering a consent
    management interceptor and intercepting consent management related
    operations.
