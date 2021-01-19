# Manage Claims with APIs

The Claim Management component of WSO2 Carbon allows you to map a set of
attributes from the underlying user store to a set of defined
claims. This section guides you through invoking and working with the
**`          ClaimMetadataManagementService         `** and the
operations you can work within this service.

---

## Invoking the admin service

The `         ClaimMetadataManagementService        ` is an admin
service of the WSO2 Carbon platform. As admin services are secured to
prevent anonymous invocations, you cannot view the WSDL of the admin
service by default. Follow the steps given below to view and invoke the
admin service:

1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and set the `admin_service.wsdl` element to `false`.

    ```toml
    [admin_service.wsdl]
    enable = false
    ```

2.  Restart WSO2 Identity Server.
3.  If you started WSO2 Identity Server using the default configurations, copy the following URL to your browser to see the WSDL of the admin service:
    ```
    https://localhost:9443/services/ClaimMetadataManagementService?wsdl
    ```
    
    !!! tip
        The default hostname of WSO2 Identity Server is `localhost`. If you are using a different hostname, make sure to replace `localhost` with the new hostname.

    !!! info

        For more information on WSO2 admin services and how to invoke an admin service using either SoapUI or any other client program, see [Calling Admin Services](../../apis/calling-admin-services).

---

## API operations

The following operations are available in `ClaimMetadataManagementService`.

### addClaimDialect ()

<table>
  <tr>
    <th>Description</th>
    <td>This operation adds a new claim dialect.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>claimDialectURI</code>: This is the URI that defines the new claim dialect.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://api.user.carbon.wso2.org/xsd"&gt;
&lt;soapenv:Header/&gt;
   &lt;soapenv:Body&gt;
      &lt;xsd:addClaimDialect&gt;
         &lt;!--Optional:--&gt;
         &lt;xsd:claimDialect&gt;
            &lt;!--Optional:--&gt;
            &lt;xsd1:claimDialectURI&gt;new dialect&lt;/xsd1:claimDialectURI&gt;
         &lt;/xsd:claimDialect&gt;
      &lt;/xsd:addClaimDialect&gt;
   &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
&lt;soapenv:Body&gt;
  &lt;ns:addClaimDialectResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
     &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
  &lt;/ns:addClaimDialectResponse&gt;
&lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### getClaimDialects()

<table>
  <tr>
    <th>Description</th>
    <td>This operation lists out all the claim dialects which are used.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd"&gt;
   &lt;soapenv:Header/>
   &lt;soapenv:Body&gt;
      &lt;xsd:getClaimDialects/&gt;
   &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:getClaimDialectsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2333="http://base.identity.carbon.wso2.org/xsd" xmlns:ax2336="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd" xmlns:ax2332="http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI>http://wso2.org/claims&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;http://schemas.xmlsoap.org/ws/2005/05/identity&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI>urn:scim:schemas:core:1.0&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;urn:ietf:params:scim:schemas:core:2.0:User&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return>
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;http://wso2.org/oidc/claim&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;urn:ietf:params:scim:schemas:core:2.0&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;http://schema.openid.net/2007/05/claims&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;http://axschema.org&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
       &lt;ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:claimDialectURI&gt;http://abc.org/claims&lt;/ax2336:claimDialectURI&gt;
       &lt;/ns:return&gt;
    &lt;/ns:getClaimDialectsResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table> 

---

### addExternalClaim()

<table>
  <tr>
    <th>Description</th>
    <td>This operation adds a new external claim.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>externalClaimDialectURI</code>: This is the URI that defines the external claim dialect.</li>
        <li><code>externalClaimUR</code>: This is the URI of the external claim.</li>
        <li><code>mappedLocalClaimURI</code>: This is the URI of the mapped claim.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:addExternalClaim&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:externalClaim&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:externalClaimDialectURI&gt;external cliam dialect&lt;/xsd1:externalClaimDialectURI&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:externalClaimURI&gt;external claim uri&lt;/xsd1:externalClaimURI&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:mappedLocalClaimURI&gt;mapped local claim&lt;/xsd1:mappedLocalClaimURI&gt;
       &lt;/xsd:externalClaim&gt;
    &lt;/xsd:addExternalClaim&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:addExternalClaimResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:addExternalClaimResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### addLocalClaim()

<table>
  <tr>
    <th>Description</th>
    <td>This operation adds a new local claim.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>attributeName</code>: This is the attribute name.</li>
        <li><code>userStoreDomain</code>: This is the user-store domain of the attribute.</li>
        <li><code>propertyName</code>: This is the name of the property.</li>
        <li><code>propertyValue</code>: This is the value of the property.</li>
        <li><code>localClaimURI</code>: This is the URI of the local claim.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:addLocalClaim&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:localClaim&gt;
          &lt;!--Zero or more repetitions:--&gt;
          &lt;xsd1:attributeMappings&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:attributeName&gt;email&lt;/xsd1:attributeName&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:userStoreDomain&gt;primary&lt;/xsd1:userStoreDomain&gt;
          &lt;/xsd1:attributeMappings&gt;
          &lt;!--Zero or more repetitions:--&gt;
          &lt;xsd1:claimProperties&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:propertyName&gt;email&lt;/xsd1:propertyName&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:propertyValue&gt;www.sample@email.com&lt;/xsd1:propertyValue&gt;
          &lt;/xsd1:claimProperties&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:localClaimURI&gt;http://abc.org/email&lt;/xsd1:localClaimURI&gt;
       &lt;/xsd:localClaim&gt;
    &lt;/xsd:addLocalClaim&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:addLocalClaimResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:addLocalClaimResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### getExternalClaims()

<table>
  <tr>
    <th>Description</th>
    <td>This operation returns all the external claims.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>externalClaimDialectURI</code>: This is the URI that defines the external claim dialect.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:getExternalClaims&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:externalClaimDialectURI&gt;external claim dialect uri&lt;/xsd:externalClaimDialectURI&gt;
    &lt;/xsd:getExternalClaims&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:getExternalClaimsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2333="http://base.identity.carbon.wso2.org/xsd" xmlns:ax2336="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd" xmlns:ax2332="http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd"/&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### getLocalClaims()

<table>
  <tr>
    <th>Description</th>
    <td>This operation returns all the local claims available.
 </td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>None
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:getLocalClaims/&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:getLocalClaimsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2333="http://base.identity.carbon.wso2.org/xsd" xmlns:ax2336="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd" xmlns:ax2332="http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
       &lt;ns:return xsi:type="ax2336:LocalClaimDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:attributeMappings xsi:type="ax2336:AttributeMappingDTO"&gt;
             &lt;ax2336:attributeName&gt;unlockTime&lt;/ax2336:attributeName&gt;
             &lt;ax2336:userStoreDomain&gt;PRIMARY&lt;/ax2336:userStoreDomain&gt;
          &lt;/ax2336:attributeMappings&gt;
          &lt;ax2336:claimProperties xsi:type="ax2336:ClaimPropertyDTO"&gt;
             &lt;ax2336:propertyName&gt;Description&lt;/ax2336:propertyName&gt;
             &lt;ax2336:propertyValue&gt;Unlock Time&lt;/ax2336:propertyValue&gt;
          &lt;/ax2336:claimProperties&gt;
          &lt;ax2336:claimProperties xsi:type="ax2336:ClaimPropertyDTO"&gt;
             &lt;ax2336:propertyName&&gt;gt;DisplayName&lt;/ax2336:propertyName&gt;
             &lt;ax2336:propertyValue&gt;Unlock Time&lt;/ax2336:propertyValue&gt;
          &lt;/ax2336:claimProperties&gt;
          &lt;ax2336:localClaimURI&gt;http://wso2.org/claims/identity/unlockTime&lt;/ax2336:localClaimURI&gt;
       &lt;/ns:return&gt;
......
       &lt;ns:return xsi:type="ax2336:LocalClaimDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"&gt;
          &lt;ax2336:attributeMappings xsi:type="ax2336:AttributeMappingDTO"&gt;
             &lt;ax2336:attributeName&gt;email&lt;/ax2336:attributeName&gt;
             &lt;ax2336:userStoreDomain&gt;PRIMARY&lt;/ax2336:userStoreDomain&gt;
          &lt;/ax2336:attributeMappings&gt;
          &lt;ax2336:claimProperties xsi:type="ax2336:ClaimPropertyDTO"&gt;
             &lt;ax2336:propertyName&gt;email&lt;/ax2336:propertyName&gt;
             &lt;ax2336:propertyValue&gt;www.sample@email.com&lt;/ax2336:propertyValue>
          &lt;/ax2336:claimProperties&gt;
          &lt;ax2336:localClaimURI>&gt;http://abc.org/email&lt;ax2336:localClaimURI&gt;
       &lt;/ns:return&gt;
    &lt;/ns:getLocalClaimsResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### removeClaimDialect()

<table>
  <tr>
    <th>Description</th>
    <td>This operation removes an existing claim dialect.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>claimDialectURI</code>: This is the URI that defines the deleting claim dialect.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:removeClaimDialect&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:claimDialect&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:claimDialectURI&gt;claim dialect uri&lt;/xsd1:claimDialectURI>
       &lt;/xsd:claimDialect&gt;
    &lt;/xsd:removeClaimDialect&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:removeClaimDialectResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:removeClaimDialectResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### removeExternalClaim()

<table>
  <tr>
    <th>Description</th>
    <td>This operation removes an existing external claim.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>externalClaimDialectURI</code>: This is the URI that defines the external claim which need to be deleted.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:removeExternalClaim&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:externalClaimDialectURI&gt;http://abc.org/email&lt;/xsd:externalClaimDialectURI&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:externalClaimURI&gt;sample@email.com&lt;/xsd:externalClaimURI&gt;
    &lt;/xsd:removeExternalClaim&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:removeExternalClaimResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:removeExternalClaimResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---
### removeLocalClaim()

<table>
  <tr>
    <th>Description</th>
    <td>This operation removes an existing local claim.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>localClaimURI</code>: This is the URI that defines the local claim.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:removeLocalClaim&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:localClaimURI&gt;local claim uri&lt;/xsd:localClaimURI>
    &lt;/xsd:removeLocalClaim&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:removeLocalClaimResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:removeLocalClaimResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### renameClaimDialect()

<table>
  <tr>
    <th>Description</th>
    <td>This operation renames an existing claim dialect.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>claimDialectURI</code>: This is the URI that defines the claim dialect.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:renameClaimDialect&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:oldClaimDialect&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:claimDialectURI&gt;old claim dialect uri&lt;/xsd1:claimDialectURI&gt;
       &lt;/xsd:oldClaimDialect&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:newClaimDialect&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:claimDialectURI&gt;new claim dialect uri&lt;/xsd1:claimDialectURI&gt;
       &lt;/xsd:newClaimDialect&gt;
    &lt;/xsd:renameClaimDialect&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:renameClaimDialectResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:renameClaimDialectResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### updateExternalClaim()

<table>
  <tr>
    <th>Description</th>
    <td>This operation updates an external claim.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>externalClaimDialectURI</code>: This is the URI that defines the external claim dialect.</li>
        <li><code>externalClaimURI</code>: This is the URI that defines the external claim.</li>
        <li><code>mappedLocalClaimURI</code>: This is the URI which defines the mapped local claim.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:updateExternalClaim&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:externalClaim&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:externalClaimDialectURI&gt;external claim dialect&lt;/xsd1:externalClaimDialectURI&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:externalClaimURI&gt;external claim uri&lt;/xsd1:externalClaimURI&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:mappedLocalClaimURI&gt;mapped local claim value&lt;/xsd1:mappedLocalClaimURI&gt;
       &lt;/xsd:externalClaim&gt;
    &lt;/xsd:updateExternalClaim&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:updateExternalClaimResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:updateExternalClaimResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>

---

### updateLocalClaim()

<table>
  <tr>
    <th>Description</th>
    <td>This operation updates a local claim.</td>
  </tr>
  <tr>
    <th>Input Parameters</th>
    <td>
      <ul>
        <li><code>attributeName</code>: This is the attribute name.</li>
        <li><code>userStoreDomain</code>: This is the user-store domain.</li>
        <li><code>propertyName</code>: This is the property name.</li>
        <li><code>propertyValue</code>: This is the property value.</li>
        <li><code>localClaimURI</code>: This is The URI which defines the local claim.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Request</th>
    <td>
      <div style="width: 100%; display: block; overflow: auto;">
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd"&gt;
 &lt;soapenv:Header/&gt;
 &lt;soapenv:Body&gt;
    &lt;xsd:updateLocalClaim&gt;
       &lt;!--Optional:--&gt;
       &lt;xsd:localClaim&gt;
          &lt;!--Zero or more repetitions:--&gt;
          &lt;xsd1:attributeMappings&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:attributeName&gt;attribute name&lt;/xsd1:attributeName&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:userStoreDomain&gt;userstore domain&lt;/xsd1:userStoreDomain&gt;
          &lt;/xsd1:attributeMappings&gt;
          &lt;!--Zero or more repetitions:--&gt;
          &lt;xsd1:claimProperties&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:propertyName&gt;property name&lt;/xsd1:propertyName&gt;
             &lt;!--Optional:--&gt;
             &lt;xsd1:propertyValue&gt;property value&lt;/xsd1:propertyValue&gt;
          &lt;/xsd1:claimProperties&gt;
          &lt;!--Optional:--&gt;
          &lt;xsd1:localClaimURI&gt;local claim uri&lt;/xsd1:localClaimURI&gt;
       &lt;/xsd:localClaim&gt;
    &lt;/xsd:updateLocalClaim&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </div>
    </td>
  </tr>
  <tr>
    <th>Response</th>
    <td>
      <pre><code>&lt;soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"&gt;
 &lt;soapenv:Body&gt;
    &lt;ns:updateLocalClaimResponse xmlns:ns="http://org.apache.axis2/xsd"&gt;
       &lt;ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/&gt;
    &lt;/ns:rupdateLocalClaimResponse&gt;
 &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;</code></pre>
    </td>
  </tr>
</table>
