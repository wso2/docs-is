# Managing Claims with APIs

The Claim Management component of WSO2 Carbon allows you to map a set of
attributes from the underlying user store to a set of defined
claims. This section guides you through invoking and working with the
**`          ClaimMetadataManagementService         `** and the
operations you can work within this service.


## Invoking the admin service

The `         ClaimMetadataManagementService        ` is an admin
service of the WSO2 Carbon platform. As admin services are secured to
prevent anonymous invocations, you cannot view the WSDL of the admin
service by default. Follow the steps given below to view and invoke the
admin service:

1.  Set the element `           admin_service.wsdl         ` to
    `           false          ` in
    `           <IS_HOME>/repository/conf/deployment.toml         ` file.

    ```toml
    [admin_service.wsdl]
    enable = true
    ```

2.  Restart WSO2 Identity Server.
3.  If you started the server using the default configurations, copy the
    following URL to your browser to see the WSDL of the admin service:
    `                       https://localhost:9443/services/ClaimMetadataManagementService?wsdl                     `
    .

    The default hostname of WSO2 IS is
    `            localhost           ` . If you are using a different
    hostname, make sure to replace `            localhost           `
    with the new hostname.

For more information on WSO2 admin services and how to invoke an admin
service using either SoapUI or any other client program, see [Calling
Admin Services from
Apps](../../develop/calling-admin-services).

## API operations

The following operations are available in the
ClaimMetadataManagementService.

### addClaimDialect ()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new claim dialect.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>claimDialectURI</code></pre></td>
<td>The URI which defines the new claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://api.user.carbon.wso2.org/xsd">
    <soapenv:Header/>
       <soapenv:Body>
          <xsd:addClaimDialect>
             <!--Optional:-->
             <xsd:claimDialect>
                <!--Optional:-->
                <xsd1:claimDialectURI>new dialect</xsd1:claimDialectURI>
             </xsd:claimDialect>
          </xsd:addClaimDialect>
       </soapenv:Body>
    </soapenv:Envelope>    
    ```
    </td>
</tr>
<tr class="even">
<td>Response</td>
<td>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <ns:addClaimDialectResponse xmlns:ns="http://org.apache.axis2/xsd">
             <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
          </ns:addClaimDialectResponse>
       </soapenv:Body>
    </soapenv:Envelope>
    ```
</td>
</tr>
</tbody>
</table>

### getClaimDialects()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Lists out all the claim dialects which are used.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><p>None</p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <xsd:getClaimDialects/>
       </soapenv:Body>
    </soapenv:Envelope>
    ```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <ns:getClaimDialectsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2333="http://base.identity.carbon.wso2.org/xsd" xmlns:ax2336="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd" xmlns:ax2332="http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>http://wso2.org/claims</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>http://schemas.xmlsoap.org/ws/2005/05/identity</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>urn:scim:schemas:core:1.0</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>urn:ietf:params:scim:schemas:core:2.0:User</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>http://wso2.org/oidc/claim</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>urn:ietf:params:scim:schemas:core:2.0</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>http://schema.openid.net/2007/05/claims</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>http://axschema.org</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User</ax2336:claimDialectURI>
             </ns:return>
             <ns:return xsi:type="ax2336:ClaimDialectDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2336:claimDialectURI>http://abc.org/claims</ax2336:claimDialectURI>
             </ns:return>
          </ns:getClaimDialectsResponse>
       </soapenv:Body>
    </soapenv:Envelope>
    ```
</td>
</tr>
</tbody>
</table>

### addExternalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new claim claim</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim dialect.</td>
</tr>
<tr class="even">
<td><pre><code>externalClaimUR</code></pre></td>
<td>The URI of the external claim</td>
</tr>
<tr class="odd">
<td><pre><code>mappedLocalClaimURI</code></pre></td>
<td>The URI of the mapped claim.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:addExternalClaim>
         <!--Optional:-->
         <xsd:externalClaim>
            <!--Optional:-->
            <xsd1:externalClaimDialectURI>external cliam dialect</xsd1:externalClaimDialectURI>
            <!--Optional:-->
            <xsd1:externalClaimURI>external claim uri</xsd1:externalClaimURI>
            <!--Optional:-->
            <xsd1:mappedLocalClaimURI>mapped local claim</xsd1:mappedLocalClaimURI>
         </xsd:externalClaim>
      </xsd:addExternalClaim>
   </soapenv:Body>
</soapenv:Envelope>       
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:addExternalClaimResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:addExternalClaimResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### addLocalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new local claim.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>attributeName</code></pre></td>
<td>The attribute name</td>
</tr>
<tr class="even">
<td><pre><code>userStoreDomain</code></pre></td>
<td>The user-store domain of the attribute</td>
</tr>
<tr class="odd">
<td><pre><code>propertyName</code></pre></td>
<td>Name of the property</td>
</tr>
<tr class="even">
<td><pre><code>propertyValue</code></pre></td>
<td>Value of the property</td>
</tr>
<tr class="odd">
<td><pre><code>localClaimURI</code></pre></td>
<td>The URI of the local claim</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:addLocalClaim>
         <!--Optional:-->
         <xsd:localClaim>
            <!--Zero or more repetitions:-->
            <xsd1:attributeMappings>
               <!--Optional:-->
               <xsd1:attributeName>email</xsd1:attributeName>
               <!--Optional:-->
               <xsd1:userStoreDomain>primary</xsd1:userStoreDomain>
            </xsd1:attributeMappings>
            <!--Zero or more repetitions:-->
            <xsd1:claimProperties>
               <!--Optional:-->
               <xsd1:propertyName>email</xsd1:propertyName>
               <!--Optional:-->
               <xsd1:propertyValue>www.sample@email.com</xsd1:propertyValue>
            </xsd1:claimProperties>
            <!--Optional:-->
            <xsd1:localClaimURI>http://abc.org/email</xsd1:localClaimURI>
         </xsd:localClaim>
      </xsd:addLocalClaim>
   </soapenv:Body>
</soapenv:Envelope>         
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:addLocalClaimResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:addLocalClaimResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### getExternalClaims()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Returns all the external claims.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getExternalClaims>
         <!--Optional:-->
         <xsd:externalClaimDialectURI>external claim dialect uri</xsd:externalClaimDialectURI>
      </xsd:getExternalClaims>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:getExternalClaimsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2333="http://base.identity.carbon.wso2.org/xsd" xmlns:ax2336="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd" xmlns:ax2332="http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd"/>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### getLocalClaims()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Returns all the local claims available.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><p>None</p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getLocalClaims/>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:getLocalClaimsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2333="http://base.identity.carbon.wso2.org/xsd" xmlns:ax2336="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd" xmlns:ax2332="http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
         <ns:return xsi:type="ax2336:LocalClaimDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ax2336:attributeMappings xsi:type="ax2336:AttributeMappingDTO">
               <ax2336:attributeName>unlockTime</ax2336:attributeName>
               <ax2336:userStoreDomain>PRIMARY</ax2336:userStoreDomain>
            </ax2336:attributeMappings>
            <ax2336:claimProperties xsi:type="ax2336:ClaimPropertyDTO">
               <ax2336:propertyName>Description</ax2336:propertyName>
               <ax2336:propertyValue>Unlock Time</ax2336:propertyValue>
            </ax2336:claimProperties>
            <ax2336:claimProperties xsi:type="ax2336:ClaimPropertyDTO">
               <ax2336:propertyName>DisplayName</ax2336:propertyName>
               <ax2336:propertyValue>Unlock Time</ax2336:propertyValue>
            </ax2336:claimProperties>
            <ax2336:localClaimURI>http://wso2.org/claims/identity/unlockTime</ax2336:localClaimURI>
         </ns:return>
......
         <ns:return xsi:type="ax2336:LocalClaimDTO" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ax2336:attributeMappings xsi:type="ax2336:AttributeMappingDTO">
               <ax2336:attributeName>email</ax2336:attributeName>
               <ax2336:userStoreDomain>PRIMARY</ax2336:userStoreDomain>
            </ax2336:attributeMappings>
            <ax2336:claimProperties xsi:type="ax2336:ClaimPropertyDTO">
               <ax2336:propertyName>email</ax2336:propertyName>
               <ax2336:propertyValue>www.sample@email.com</ax2336:propertyValue>
            </ax2336:claimProperties>
            <ax2336:localClaimURI>http://abc.org/email</ax2336:localClaimURI>
         </ns:return>
      </ns:getLocalClaimsResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### removeClaimDialect()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Remove an existing claim dialect.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>claimDialectURI</code></pre></td>
<td>The URI which defines the deleting claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:removeClaimDialect>
         <!--Optional:-->
         <xsd:claimDialect>
            <!--Optional:-->
            <xsd1:claimDialectURI>claim dialect uri</xsd1:claimDialectURI>
         </xsd:claimDialect>
      </xsd:removeClaimDialect>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:removeClaimDialectResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:removeClaimDialectResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### removeExternalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Remove an existing external claim</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim which need to be deleted.</td>
</tr>
</tbody>
</table>
</div>
<p><strong></strong></p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:removeExternalClaim>
         <!--Optional:-->
         <xsd:externalClaimDialectURI>http://abc.org/email</xsd:externalClaimDialectURI>
         <!--Optional:-->
         <xsd:externalClaimURI>sample@email.com</xsd:externalClaimURI>
      </xsd:removeExternalClaim>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:removeExternalClaimResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:removeExternalClaimResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### removeLocalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Remove an existing local claim.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>localClaimURI</code></pre></td>
<td>The URI which defines the local claim.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:removeLocalClaim>
         <!--Optional:-->
         <xsd:localClaimURI>local claim uri</xsd:localClaimURI>
      </xsd:removeLocalClaim>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:removeLocalClaimResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:removeLocalClaimResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### renameClaimDialect()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Renaming an existing claim dialect.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>claimDialectURI</code></pre></td>
<td>The URI which defines the claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:renameClaimDialect>
         <!--Optional:-->
         <xsd:oldClaimDialect>
            <!--Optional:-->
            <xsd1:claimDialectURI>old claim dialect uri</xsd1:claimDialectURI>
         </xsd:oldClaimDialect>
         <!--Optional:-->
         <xsd:newClaimDialect>
            <!--Optional:-->
            <xsd1:claimDialectURI>new claim dialect uri</xsd1:claimDialectURI>
         </xsd:newClaimDialect>
      </xsd:renameClaimDialect>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:renameClaimDialectResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:renameClaimDialectResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### updateExternalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Update an external claim.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim dialect.</td>
</tr>
<tr class="even">
<td><pre><code>externalClaimURI</code></pre></td>
<td>The URI which defines the external claim.</td>
</tr>
<tr class="odd">
<td><pre><code>mappedLocalClaimURI</code></pre></td>
<td>The URI which defines the mapped local claim.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateExternalClaim>
         <!--Optional:-->
         <xsd:externalClaim>
            <!--Optional:-->
            <xsd1:externalClaimDialectURI>external claim dialect</xsd1:externalClaimDialectURI>
            <!--Optional:-->
            <xsd1:externalClaimURI>external claim uri</xsd1:externalClaimURI>
            <!--Optional:-->
            <xsd1:mappedLocalClaimURI>mapped local claim value</xsd1:mappedLocalClaimURI>
         </xsd:externalClaim>
      </xsd:updateExternalClaim>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:updateExternalClaimResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:updateExternalClaimResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>

### updateLocalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Update a local claim</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>attributeName</code></pre></td>
<td>The attribute name</td>
</tr>
<tr class="even">
<td><pre><code>userStoreDomain</code></pre></td>
<td>The user-store domain</td>
</tr>
<tr class="odd">
<td><pre><code>propertyName</code></pre></td>
<td>The property name</td>
</tr>
<tr class="even">
<td><pre><code>propertyValue</code></pre></td>
<td>The property value</td>
</tr>
<tr class="odd">
<td><pre><code>localClaimURI</code></pre></td>
<td>The URI which defines the local claim</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:updateLocalClaim>
         <!--Optional:-->
         <xsd:localClaim>
            <!--Zero or more repetitions:-->
            <xsd1:attributeMappings>
               <!--Optional:-->
               <xsd1:attributeName>attribute name</xsd1:attributeName>
               <!--Optional:-->
               <xsd1:userStoreDomain>userstore domain</xsd1:userStoreDomain>
            </xsd1:attributeMappings>
            <!--Zero or more repetitions:-->
            <xsd1:claimProperties>
               <!--Optional:-->
               <xsd1:propertyName>property name</xsd1:propertyName>
               <!--Optional:-->
               <xsd1:propertyValue>property value</xsd1:propertyValue>
            </xsd1:claimProperties>
            <!--Optional:-->
            <xsd1:localClaimURI>local claim uri</xsd1:localClaimURI>
         </xsd:localClaim>
      </xsd:updateLocalClaim>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
<tr class="even">
<td>Response</td>
<td>
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:updateLocalClaimResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:rupdateLocalClaimResponse>
   </soapenv:Body>
</soapenv:Envelope>
```
</td>
</tr>
</tbody>
</table>
