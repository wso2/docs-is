# Configuring WS-Trust Security Token Service

WSO2 Identity Server uses the security token service (STS) as the
[WS-Trust](_WS-Trust_) implementation. The STS is capable of issuing
SAML 1.1 and 2.0 security tokens and has a SOAP/XML API for token
issuance. This API can be secured with the
`         UserNameToken        ` or with any other WS-Security mechanism
as explained below.

#### Securing the Security Token Service

According to the Trust Brokering model defined in the WS-Trust
specification, the users should authenticate themselves to the STS
before obtaining a token. STS may use this authentication information
when constructing the security token. For example, STS may populate the
required claims based on the user name provided by the subject.
Therefore, the STS service needs to be secured.

STS is configured under the **Resident Identity Provider** section of
the WSO2 Identity Server [Management
Console](_Getting_Started_with_the_Management_Console_) .

To secure the Security Token Service:

1.  On the **Main** tab, click **Identity \> Identity Providers \>
    Resident** .  
    ![](attachments/103330821/112392547.png){width="200"}  
    The Resident Identity Provider page appears.  
    ![](attachments/103330821/112392548.png){width="800"}

2.  Enter the required values as given below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Home Realm Identifier</strong></td>
    <td>This is the domain name of the identity provider. If you do not enter a value here, when an authentication request comes to WSO2 Identity Server, a user will be prompted to specify a domain. You can enter multiple identifiers as a comma-separated list.</td>
    <td><code>               localhost              </code></td>
    </tr>
    <tr class="even">
    <td><strong>Idle Session Time Out</strong></td>
    <td>This is the duration in minutes for which an SSO session can be idle for. If WSO2 Identity Server does not receive any SSO authentication requests for the given duration, a session time out occurs. The default value is <code>               15              </code> .</td>
    <td><code>               15              </code></td>
    </tr>
    <tr class="odd">
    <td><strong>Remember Me Period</strong></td>
    <td><div class="content-wrapper">
    <p>This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that the <strong>Remember Me</strong> option is selected in the WSO2 Identity Server login screen.</p>
    <p>The default value is <code>                 2                </code> weeks.</p>
    </div></td>
    <td><code>               2              </code></td>
    </tr>
    </tbody>
    </table>

3.  Under the **Inbound Authentication Configuration** section, click
    **Security Token Service Configuration \> Apply Security Policy**
    .  
    ![](attachments/103330821/112392550.png){width="750"}
4.  Select **Yes** in the **Enable Security?** drop down and  select a
    pre-configured security scenario according to your requirements. For
    this tutorial, use **UsernameToken** under the **Basic Scenarios**
    section.  
    ![](attachments/103330821/103330825.png){width="750"}

    !!! note
    
        You can find further details about security policy scenarios from
        the **view scenario** option **.**
    
        **![](attachments/103330821/103330822.png){width="900"}**
    

5.  Click **Next** . The user domain and user group selection appears.

    Next steps may vary as per the security scenario that you have
    chosen under point (5) above. Below is for **UsernameToken**
    scenario **.**

6.  Provide the required details as follows:
    1.  Select **ALL-USER-STORE-DOMAINS** .
    2.  Select the role you created to grant permission to access
        secured service. In this example, the admin role is used **.**
        Next, click **Finish** .

        !!! note
        
                The **Select Domain** drop-down lists many domains. The listed
                **User Groups** can vary depending on the domain selected.
        

        ![](attachments/103330821/112392552.png){width="750"}

7.  Click **Finish** .
8.  Click **Ok** on the confirmation dialog window that appears.
9.  Click **Update** to complete the process.

Now STS is configured and secured with a username and password. Only
users with the Admin role can consume the service.

The next step is to add a service provider to consume the STS.

#### Adding a service provider for the STS client

Do the following steps if you are using a Holder of Key **subject
confirmation method** . For more information, see [Configuring STS for
Obtaining Tokens with Holder-Of-Key Subject
Confirmation](_Configuring_STS_for_Obtaining_Tokens_with_Holder-Of-Key_Subject_Confirmation_)
.

The **Subject confirmation methods** define how a relying party (RP),
which is the end service can make sure a particular security token
issued by an STS is brought by the legitimate subject. If this is not
done, a third party can take the token from the wire and send any
request it wants including that token. The RP trusts that illegitimate
party.

1.  Under the **Inbound Authenticatino Configuration** section, click
    **WS-Trust Security Token Service Configuration** **\>**
    **Configure** . The STS Configuration page appears.  
    ![](attachments/103330821/112392555.png){width="750"}
2.  Enter the required details as given below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Endpoint Address</strong></td>
    <td><div class="content-wrapper">
    <p><br />
    </p>
    <div>
    <p>Enter the trusted relying party's <strong>endpoint address,</strong> which is the <strong></strong> endpoint address of the Security Token Service. For more information, see <a href="_Broker_Trust_Relationships_with_WSO2_Identity_Server_">Broker Trust Relationship with WSO2 Identity Server</a> .</p>
    <p>The endpoint must be used as the service <code>                  URL                 </code> to which the token gets delivered by the STS client. Then select the public certificate imported. Tokens issued are encrypted using the public certificate of the trusted relying party. Therefore, the consumer who obtains this token, to invoke the RP service, will not be able to see the token.</p>
    !!! note
        <p>Make sure to upload the certificate of the relying party to the truststore. For instructions, see <a href="https://docs.wso2.com/display/ADMIN44x/Creating+New+Keystores#CreatingNewKeystores-ca_certificateAddingCA-signedcertificatestokeystores">Adding CA-signed ceritificates to keystores</a> .</p>
    <p><br />
    </p>
    </div>
    <p><br />
    </p>
    </div></td>
    <td><code>               https://localhost:9444/services/echo              </code></td>
    </tr>
    <tr class="even">
    <td><strong>Certificate Alias</strong></td>
    <td>This is the alias of the certificate.</td>
    <td><code>               wso2carbon              </code></td>
    </tr>
    </tbody>
    </table>

    ![](attachments/103330821/112392557.png){width="750"}

3.  Click **Update** to save the changes made to the service provider.

    **Related Topics**

    Run the STS client after configuring the service provider. For
    instructions on trying out a sample STS client, see [Running an STS
    Client](_Running_an_STS_Client_) .

  
