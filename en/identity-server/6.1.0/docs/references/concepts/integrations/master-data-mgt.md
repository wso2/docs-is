# Ability to connect a Master Data Management solution with IS

## What is MDM?

Master Data Management (MDM) is a solution to compact the data that is accurate and consistent, 
in a unified location. This MDM solution helps the organization with avoiding redundancy, better 
decision making, regulatory compliance, improved efficiency, etc.

## How WSO2 IS consolidates user information

WSO2 IS acts as a central place to create, maintain, and operate user identities and it is enriched 
with user information. This user information helps MDM solutions to improve their 360 view of customers
 and hence, improve the quality of data.  WSO2 IS gathers user information in different ways. 

Authentication the users with external identity providers helps to enrich customer information in several ways. 
Providing the social login capabilities can help the organization to learn the interests and activities of users. In addition 
to default connectors such as Facebook, Google, Microsoft, Yahoo, generic Open ID providers, generic 
SAML providers, Twitter, and Office365, IS also provides the flexibility to write custom authenticators 
based on the providers. 

Furthermore, WSO2 IS has user stores that store the details of local users. It provides the flexibility 
of plugging different user stores according to your requirements thereby improving the 360 view of 
customers in different ways. Since WSO2 IS is consolidated with user information, MDM solutions can 
take more accurate and cleansed data when this data is integrated with MDM.

## How to integrate an MDM with WSO2 IS

### How data can be pushed to an MDM

<!-- ![how-to-push-data-to-mda]({{base_path}}/assets/img/tutorials/push-data-to-mda.png) -->

Outbound provisioning talks about provisioning users to external systems. 
There are different outbound provisioning connectors supported by IS to push
 the user data from WSO2 IS to an MDM solution. This is an effort that helps an 
 organization to create a primary data source in a single location and manage it.   

#### Support outbound provisioning connectors

WSO2 IS supports the following outbound provisioning connectors by default.
- SCIM
- SPML
- SOAP
- Google Apps provisioning API
- Salesforce provisioning API

In addition to this, WSO2 IS provides the capability to write custom provisioning 
connectors according to specific use cases.


The SCIM (System for Cross-domain Identity Management) 2.0 provisioning connector enables 
you to provision users using SCIM REST calls to the WSO2 Identity Server. Since it is a 
standard protocol, user information can be provisioned to the MDM via SCIM APIs as long as the 
MDM supports SCIM calls. 

Since WSO2 IS provides the flexibility of configuring a custom provisioning connector, 
we can write custom outbound provisioning connectors based on the MDM.
 
In case the MDM does not support the data format of the request sent by IS, we can use some 
 mediators such as ESB to mediate and transform the data. 


##### Provision data and events using ESB

<!-- ![how-to-trasform-data-using-esb]({{base_path}}/assets/img/tutorials/push-data-to-mda-with-esb.png) -->


In case MDM does not support the data format pushed by IS or if IS and MDM does not support any 
common protocols, we can plug ESB as a mediator to push the data from IS to MDM and map the data
 between IS and MDM. 

ESB has built-in support for data mapping (JSON -> JSON, JSON -> XML etc) and has a dedicated mediator 
for that purpose. For each event, we can have an endpoint in ESB to pass the IS data to the ESB. Using ESB, 
we can map the data into the desired format of the MDM vendor and call it. We can also switch protocols within
 ESB if needed.  


### How data can be extracted by MDM from WSO2 IS

<!-- ![how-to-extract-data-from-is]({{base_path}}/assets/img/tutorials/extract-data-by-mda.png)-->


WSO2 IS supports SCIM (v1,v2) APIs, other REST APIs, and SOAP APIs. If MDMs have any SCIM connectors, 
they can extract the user data from IS using SCIM. When MDM sends any standard SCIM request, IS can
 respond with the user information.

Since WSO2 IS supports REST and SOAP APIs to get user information, MDMs can easily get the user 
information as a JSON or XML response. WSO2 IS has user management SOAP APIs, and if the MDM has the
capability to call the SOAP APIs to extract user data, then IS can respond to the user information as an
 XML response. Most of the MDM solutions have REST API support and can call the user management REST api 
 to extract/get and manage the user information.
