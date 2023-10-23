# Microprofile JWT 1.0

[Microprofile JWT](https://www.eclipse.org/community/eclipse_newsletter/2017/september/article2.php)
is a specification focused on providing role-based access control for microservices. The focus of the MP-JWT 
specification is the definition of the required format of the JWT used as the basis for interoperable authentication 
and authorization.

The MP-JWT specification introduces two new claims which need to be present in the issued JWT token in order to be 
usable as an authentication and authorization token.

These claims are:

- **upn:** A human-readable claim that uniquely identifies the subject or user principal of the token, across the 
MicroProfile services the token will be accessed with.
- **groups:** The token subject's group memberships that will be mapped to Java EE style application-level roles in the 
MicroProfile service container.

The set of minimum required claims in a compatible JWT token is listed
below:

<table style="width:100%;">
<colgroup>
<col style="width: 7%" />
<col style="width: 75%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Claim name</th>
<th>Description</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>alg</td>
<td>This JOSE header parameter identifies the cryptographic algorithm used to secure the JWT. MP-JWT requires the use of the RSASSA-PKCS1-v1_5 SHA-256 algorithm and must be specified as "RS256".</td>
<td><a href="https://tools.ietf.org/html/rfc7515#section-4.1.1">RFC7515, Section 4.1.1</a></td>
</tr>
<tr class="even">
<td>kid</td>
<td>This JOSE header parameter is a hint indicating which key was used to secure the JWT.</td>
<td><a href="https://tools.ietf.org/html/rfc7515#section-4.1.4">RFC7515, Section-4.1.4</a></td>
</tr>
<tr class="odd">
<td>iss</td>
<td>The token issuer.</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.1">RFC7519, Section 4.1.1</a></td>
</tr>
<tr class="even">
<td>sub</td>
<td>Identifies the principal that is the subject of the JWT. See the "upn" claim for how this relates to the runtime <code>java.security.Principal</code>.</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.2">RFC7519, Section 4.1.2</a></td>
</tr>
<tr class="odd">
<td>aud</td>
<td>Identifies the recipients that the JWT is intended for.</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.3">RFC7519, Section 4.1.3</a></td>
</tr>
<tr class="even">
<td>exp</td>
<td>Identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.4">RFC7519, Section 4.1.4</a></td>
</tr>
<tr class="odd">
<td>iat</td>
<td>Identifies the time at which the issuer generated the JWT.</td>
<td><a href="https://tools.ietf.org/html/rfc7519#section-4.1.6">RFC7519, Section 4.1.6</a></td>
</tr>
<tr class="even">
<td>jti</td>
<td>Provides a unique identifier for the JWT.</td>
<td><p><a href="https://tools.ietf.org/html/rfc7519#section-4.1.7">RFC7519, Section 4.1.7</a></p></td>
</tr>
<tr class="odd">
<td>upn</td>
<td>Provides the user principal name in the <code>java.security.Principal</code> interface.</td>
<td><p><a href="https://ftp.fau.de/eclipse/microprofile/microprofile-jwt-auth-1.1/microprofile-jwt-auth-spec.pdf">MP-JWT 1.0 specification</a></p></td>
</tr>
<tr class="even">
<td>groups</td>
<td>Provides the list of group names that have been assigned to the principal of the MP-JWT. This typically will require a mapping at the application container level to application deployment roles, but a one-to-one between group names and application role names is required to be performed in addition to any other mapping.</td>
<td><p><a href="https://ftp.fau.de/eclipse/microprofile/microprofile-jwt-auth-1.1/microprofile-jwt-auth-spec.pdf">MP-JWT 1.0 specification</a></p></td>
</tr>
</tbody>
</table>
