# Kerberos Security

**Kerberos** is an authentication protocol which can be used to secure
communications in web services. Kerberos enables you to exchange user
credentials securely. Thus, it also provides mutual authentication in
which the server can also authenticate itself to the client.

The Kerberos protocol uses a trusted third party called “Key
Distribution Center” (KDC). KDC consists of two logical parts. They are:

-   **Authentication Server**
-   **Ticket Granting Server**

The actual user credentials are stored within the Authentication Server.
The communicating parties will retrieve a Kerberos ticket from the
Ticket Granting Server. TGS validates the ticket-requesting users'

### Kerberos Security within WSO2 Identity Server

To use WSO2 Identity Server as a KDC we need to configure are Identity
server to a user store which can act as a KDC.

With default configurations WSO2 Identity Server uses an ApacheDS-based
LDAP server user store. It also has an ApacheDS based on KDC
implementation. Users can use WSO2 Identity Server as a KDC and
implement Kerberos security to secure communications between services
and clients.  
Enable KDC within WSO2 Identity Server.

To use KDC in Identity Server, you need to use the embedded LDAP which
ships with WSO2 Identity Server. Thus, by default, the KDC server is
disabled. To enable the KDC server, go to the Identity Server home
directory and navigate to the
`         <PRODUCT_HOME>/repository/conf/identity        ` folder. There
you will find a file named `         embedded-ldap.xml        ` . Open
`         embedded-ldap.xml        ` and find the
`         <KDCServer/>        ` XML tag. You will configure the XML
element named `         enabled        ` . Set its value to
`         true        ` . After modifying it, the XML configuration
should look like this:

``` java
<KDCServer>
<Property name="name">defaultKDC</Property>
<Property name="enabled">true</Property>
<Property name="protocol">UDP</Property>
<Property name="host">localhost</Property>
<Property name="port">${Ports.EmbeddedLDAP.KDCServerPort}</Property>
<Property name="maximumTicketLifeTime">8640000</Property>
<Property name="maximumRenewableLifeTime">604800000</Property>
<Property name="preAuthenticationTimeStampEnabled">true</Property>
</KDCServer>
```

### Service Principals

The KDC Server issues tickets to access a particular service. Thus, each
type of service is associated with a particular service name. In the
case of Kerberos, we call the service name “Service Principal Name”
(SPN). Before we assign an SPN to a service, we need to define the
“Service Principal Name” in KDC.

### Adding Service Principals

In order to configure a service principal, you must first [register a service provider for inbound authentication](../../using-wso2-identity-server/configuring-inbound-authentication-for-a-service-provider).

1.  Expand the **Kerberos KDC** and click **Configure**.
2.  Specify the required information on the "Add Service Principal"
    page.
    -   **Service Principal Name** – Name of the service principal. This
        usually takes following format:
        `            <Service Name>/<Host where service is running>           `
        . This field is mandatory.
    -   **Password** – The password given to the service principal. You
        would use this password in the appropriate service's rampart
        configuration. Thus, the appropriate service will provide a
        password, given in rampart configuration, to KDC when it needs
        to authenticate itself to KDC. This field is mandatory.
    -   **Re-Type Password** – Re-type password provided in the
        "Password" section to make sure the given password is accurate.
        This field is mandatory.
    -   **Description** – Brief description of the service principal.
        This field is not mandatory.

    ![]( ../../assets/img/103329549/103329550.png) 

  
