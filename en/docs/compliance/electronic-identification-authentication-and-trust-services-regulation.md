# Electronic Identification, Authentication and Trust Services Regulation

eIDAS (electronic IDentification, Authentication and Trust Services) is
an EU regulation on electronic identification and trust services for
electronic transactions in the internal market. For a set of eIDAS
compliant technical specifications that the member states of EU to
refer, see [eIDAS compliant technical
specifications](https://ec.europa.eu/cefdigital/wiki/display/CEFDIGITAL/2016/12/16/eIDAS+Technical+Specifications+v.+1.1)
.

If you want to have cross border connections within the member states of
EU, you can use an eIDAS network that consists of a series of
eIDAS-nodes implemented at the member state level. An eIDAS-node
consists of an eIDAS connector and an eIDAS proxy service or eIDAS
middleware service.

An eIDAS node can request a cross border authentication through the
eIDAS connector and provide a cross border authentication through the
eIDAS service (an eIDAS service can operate either in an eIDAS proxy
service or eIDAS middleware service).

Following is an example eIDAS network with proxy to proxy connection
between two member states(MS).

![eidas-diagram](../../assets/img/compliance/eidas-diagram.png)
  
What happens here is as follows:

1.  The user (citizen) of MS A requests access to a service provider in
    MS B.

2.  The service provider in MS B sends the request to its own connector.

3.  On receipt of the request, the connector asks the user for the
    country of origin (TLS protocol).

4.  When the user selects the country of origin, the SAML request is
    forwarded by the connector to the eIDAS-node proxy service of the
    user's member state.

5.  The eIDAS-node proxy service sends the SAML request to the identity
    provider for authentication, and a user authenticates using the
    electronic identity. Once authenticated, this identity is returned
    to the eIDAS-node proxy service.

6.  The eIDAS-node proxy service sends a SAML assertion to the
    requesting connector, which forwards the response to the service
    provider.

7.  The service provider grants access to the user.

For more information on how eIDAS works, see [How does eIDAS
work?](https://ec.europa.eu/cefdigital/wiki/pages/viewpage.action?pageId=82773030)

!!! Info
	  For a tutorial that describes how WSO2 Identity Server supports
	  the eIDAS SAML attribute profile, see [eIDAS SAML Attribute Profile Support via WSO2 Identity Server](../../eidas-saml-attribute-profile-support-via-wso2-identity-server).