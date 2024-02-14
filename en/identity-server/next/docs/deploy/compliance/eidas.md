# Electronic Identification, Authentication and Trust Services Regulation

eIDAS (electronic IDentification, Authentication and Trust Services) is an EU regulation on electronic identification and trust services for electronic transactions in the internal market. For a set of eIDAS-compliant technical specifications that the member states of the EU need to refer to, see [here](https://ec.europa.eu/cefdigital/wiki/display/CEFDIGITAL/2016/12/16/eIDAS+Technical+Specifications+v.+1.1).

If there are cross-border connections within the member states of the EU, an eIDAS network that consists of a series of eIDAS nodes implemented at the member state level can be used. An eIDAS node consists of an eIDAS connector and an eIDAS proxy service or eIDAS middleware service.

An eIDAS node can request a cross-border authentication through the eIDAS connector and provide a cross-border authentication through the eIDAS service (an eIDAS service can operate either in an eIDAS proxy service or eIDAS middleware service).

Following is an example eIDAS network with proxy to proxy-to-proxy connection between two "member states" (MS).

![eIDAS diagram]({{base_path}}/assets/img/setup/compliance/eidas-diagram.png){: width="700" style="display: block; margin: 0;"}

Following is what happens in the illustration given above.

1. The user (citizen) of MS A requests access to a service provider in MS B.

2. The service provider in MS B sends the request to its own connector.

3. On receipt of the request, the connector asks the user for the country of origin (TLS protocol).

4. When the user selects the country of origin, the SAML request is forwarded by the connector to the eIDAS-node proxy service of the user's member state.

5. The eIDAS-node proxy service sends the SAML request to the identity provider for authentication, and a user authenticates using the electronic identity. Once authenticated, this identity is returned to the eIDAS-node proxy service.

6. The eIDAS-node proxy service sends a SAML assertion to the requesting connector, which forwards the response to the service provider.

7. The service provider grants access to the user.

For more information on how eIDAS works, see [How does eIDAS work?](https://ec.europa.eu/cefdigital/wiki/pages/viewpage.action?pageId=82773030).