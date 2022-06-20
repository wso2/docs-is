# JSON Web Key Set Endpoint

The JSON Web Key Set (JWKS) endpoint is a read-only endpoint that
returns the Identity Server's public key set in the JWKS format. This
contains the signing key(s) that the Relying Party (RP) uses to validate
signatures from the Identity Server. For more information on this
endpoint, see the [OpenID Connect Discovery
specification](http://openid.net/specs/openid-connect-discovery-1_0.html)
.


!!! tip "Before you begin!"
    Start WSO2 IS before you try out the endpoints.
    

### The endpoint URL for the super tenant

<table>
<tbody>
<tr class="odd">
<td>Endpoint URL</td>
<td><div class="content-wrapper">
<p>Copy the following URL to your browser: <code>               https://&lt;IS_HOST&gt;:&lt;IS_HTTPS_PORT&gt;/oauth2/jwks              </code></p>
<div>
<ul>
<li>By default, <code>                 &lt;IS_HOST&gt;                </code> is <code>                 localhost.                </code> However, if you are using a public IP, the respective IP address or domain needs to be specified.</li>
<li>By default, <code>                 &lt;IS_HTTPS_PORT&gt;                </code> has been set to 9443. However, if the port offset has been incremented by <code>                 n                </code>, the default port value needs to be incremented by <code>                 n                </code> .</li>
</ul>
</div>
<p>Example: <code>               https://localhost:9443/oauth2/jwks              </code></p>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
<a class="sourceLine" id="cb1-2" title="2">  <span class="st">&quot;keys&quot;</span>: [</a>
<a class="sourceLine" id="cb1-3" title="3">    {</a>
<a class="sourceLine" id="cb1-4" title="4">      <span class="st">&quot;kty&quot;</span>: <span class="st">&quot;RSA&quot;</span>,</a>
<a class="sourceLine" id="cb1-5" title="5">      <span class="st">&quot;e&quot;</span>: <span class="st">&quot;AQAB&quot;</span>,</a>
<a class="sourceLine" id="cb1-6" title="6">      <span class="st">&quot;use&quot;</span>: <span class="st">&quot;sig&quot;</span>,</a>
<a class="sourceLine" id="cb1-7" title="7">      <span class="st">&quot;kid&quot;</span>: <span class="st">&quot;NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ_RS256&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">      <span class="st">&quot;alg&quot;</span>: <span class="st">&quot;RS256&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">      <span class="st">&quot;n&quot;</span>: <span class="st">&quot;luZFdW1ynitztkWLC6xKegbRWxky-5P0p4ShYEOkHs30QI2VCuR6Qo4Bz5rTgLBrky03W1GAVrZxuvKRGj9V9-PmjdGtau4CTXu9pLLcqnruaczoSdvBYA3lS9a7zgFU0-s6kMl2EhB-rk7gXluEep7lIOenzfl2f6IoTKa2fVgVd3YKiSGsyL4tztS70vmmX121qm0sTJdKWP4HxXyqK9neolXI9fYyHOYILVNZ69z_73OOVhkh_mvTmWZLM7GM6sApmyLX6OXUp8z0pkY-vT_9-zRxxQs7GurC4_C1nK3rI_0ySUgGEafO1atNjYmlFN-M3tZX6nEcA6g94IavyQ&quot;</span></a>
<a class="sourceLine" id="cb1-10" title="10">    }</a>
<a class="sourceLine" id="cb1-11" title="11">  ]</a>
<a class="sourceLine" id="cb1-12" title="12">}</a></code></pre></div>
</div>
</div>
<div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Property value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>                   kty                  </code></td>
<td>The public key type.</td>
</tr>
<tr class="even">
<td><code>                   e                  </code></td>
<td>The exponent value of the public key.</td>
</tr>
<tr class="odd">
<td><code>                   use                  </code></td>
<td><p>Implies how the key is being used. The value <code>                    sig                   </code> represents signature.</p></td>
</tr>
<tr class="even">
<td><code>                   kid                  </code></td>
<td>The thumbprint of the certificate. This value is used to identify the key that needs to be used to verify the signature.</td>
</tr>
<tr class="odd">
<td><code>                   alg                  </code></td>
<td><p>The algorithm used to secure the JSON Web Signature.</p></td>
</tr>
<tr class="even">
<td><code>                   n                  </code></td>
<td>The modulus value of the public key.</td>
</tr>
</tbody>
</table>
</div>
<div>
<p>For more information, see the <a href="https://tools.ietf.org/html/rfc7515#section-4">JWS specification</a> .</p>
</div>
</div></td>
</tr>
</tbody>
</table>

### The endpoint URL for tenants

<table>
<tbody>
<tr class="odd">
<td>Endpoint URL</td>
<td><div class="content-wrapper">
<p>Copy the following URL to your browser: <code>               https://&lt;IS_HOST&gt;:&lt;IS_PORT&gt;/t/&lt;TENANT_DOMAIN&gt;/oauth2/jwks              </code></p>
<div>
<ul>
<li>By default, <code>                 &lt;IS_HOST&gt;                </code> is <code>                 localhost.                </code> However, if you are using a public IP, the respective IP address or domain needs to be specified.</li>
<li>By default, <code>                 &lt;IS_HTTPS_PORT&gt;                </code> has been set to 9443. However, if the port offset has been incremented by <code>                 n                </code>, the default port value needs to be incremented by <code>                 n                </code> .</li>
<li>Enter your tenant domain for <code>                 &lt;TENANT_DOMAIN&gt;                </code> .</li>
</ul>
</div>
<p>Example: <code>               https://localhost:9443/t/foo.com/oauth2/jwks              </code></p>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
<a class="sourceLine" id="cb1-2" title="2">  <span class="st">&quot;keys&quot;</span>: [</a>
<a class="sourceLine" id="cb1-3" title="3">    {</a>
<a class="sourceLine" id="cb1-4" title="4">      <span class="st">&quot;kty&quot;</span>: <span class="st">&quot;RSA&quot;</span>,</a>
<a class="sourceLine" id="cb1-5" title="5">      <span class="st">&quot;e&quot;</span>: <span class="st">&quot;AQAB&quot;</span>,</a>
<a class="sourceLine" id="cb1-6" title="6">      <span class="st">&quot;use&quot;</span>: <span class="st">&quot;sig&quot;</span>,</a>
<a class="sourceLine" id="cb1-7" title="7">      <span class="st">&quot;kid&quot;</span>: <span class="st">&quot;MTk5NjA3YjRkNGRmZmI4NTYyMzEzZWFhZGM1YzAyZWMyZTg0ZGQ4Yw_RS256&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">      <span class="st">&quot;alg&quot;</span>: <span class="st">&quot;RS256&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">      <span class="st">&quot;n&quot;</span>: <span class="st">&quot;0OA-yiyn_pCKnldZBq2KPnGplLuTEtGU7IZP66Wf7ElhFJ-kQ87BMKvZqVNDV84MSY3XQg0t0yL6gITg-W8op61PWO2UrEcxhhMHN_rra22Ae2OCaUfOr43cW1YFc54cYj5p7v-HSVvjTuNLGMMrNfTGAOCPzuLxbSHfq62uydU&quot;</span></a>
<a class="sourceLine" id="cb1-10" title="10">    }</a>
<a class="sourceLine" id="cb1-11" title="11">  ]</a>
<a class="sourceLine" id="cb1-12" title="12">}</a></code></pre></div>
</div>
</div>
<div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Property value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>                   kty                  </code></td>
<td>The public key type.</td>
</tr>
<tr class="even">
<td><code>                   e                  </code></td>
<td>The exponent value of the public key.</td>
</tr>
<tr class="odd">
<td><code>                   use                  </code></td>
<td><p>Implies how the key is being used. The value <code>                    sig                   </code> represents signature.</p></td>
</tr>
<tr class="even">
<td><code>                   kid                  </code></td>
<td>The thumbprint of the certificate. This value is used to identify the key that needs to be used to verify the signature.</td>
</tr>
<tr class="odd">
<td><code>                   alg                  </code></td>
<td><p>The algorithm used to secure the JSON Web Signature.</p></td>
</tr>
<tr class="even">
<td><code>                   n                  </code></td>
<td>The modulus value of the public key.</td>
</tr>
</tbody>
</table>
</div>
<div>
<p>For more information, see the <a href="https://tools.ietf.org/html/rfc7515#section-4">JWS specification</a> .</p>
</div>
</div></td>
</tr>
</tbody>
</table>
