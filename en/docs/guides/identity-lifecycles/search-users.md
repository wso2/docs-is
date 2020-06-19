# Search for Users

## Search for users using the admin portal
TODO: dev-portal-fragment

---

## Search for users using SCIM

You can search for users using a SCIM request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] --data '{"schemas": ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],"attributes": [attribute names],"filter": [filter query],"domain": [domain name],"startIndex": [value],"count": [value]}' --header "Content-Type:application/scim+json"  'https://localhost:9443/scim2/Users/.search'
```

Below is a sample request and its corresponding response to search for users using SCIM 2.0. 

```tab="Sample Request"
curl -v -k --user admin:admin --data '{"schemas": ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],"attributes": ["name.familyName", "userName"],"filter":"userName sw ki and name.familyName co ack","domain":"PRIMARY","startIndex": 1,"count": 10}' --header "Content-Type:application/scim+json"  'https://localhost:9443/scim2/Users/.search'
```

```tab="Sample Response"
{"totalResults":1,"startIndex":1,"itemsPerPage":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"name":{"familyName":"jackson"},"id":"c8c821ba-1200-495e-a775-79b260e717bd","userName":"kim"}]}
```

---

## Search for users using SOAP

The user also can search user IDs by calling the
`         RemoteUserStoreManager        ` service. If you are new to
admin services, see [Calling Admin Services](insert-calling admin services).

The following SOAP method, `         getUserId()        ` will give
you the user ID of the relevant username. 

**Request: Sample**

``` java
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
   <soap:Header/>
   <soap:Body>
      <ser:getUserId>
         <!--Optional:-->
         <ser:username>user123</ser:username>
      </ser:getUserId>
   </soap:Body>
</soap:Envelope>
```
---

!!! info "Related Topics"
    - [Concept: Users](TODO:insert-link-to-concept)
    - [Guide: Ways of User Onboarding](../onboard-overview)
    - [Guide: Delete Users](../delete-users)