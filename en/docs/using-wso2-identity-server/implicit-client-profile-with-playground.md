# Implicit Client Profile with Playground

This section provides information about the expected requests and the
relevant responses that the WSO2 Identity Server would generate for the
OpenID Connect Implicit Client flow.

### Response\_type=id\_token

##### Request

<table>
<tbody>
<tr class="odd">
<td><pre><code>https://wso2is.local:9443/oauth2/authorize?response_type=id_token&amp;client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&amp;redirect_uri=http://localhost:8080/playground2/oauth2client&amp;nonce=abc&amp;scope=openid </code></pre></td>
</tr>
</tbody>
</table>

##### Response

<table>
<tbody>
<tr class="odd">
<td><pre><code>http://wso2is.local:8080/playground2/oauth2client#token_type=Bearer&amp;expires_in=60&amp;id_token=eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE0NTMxODQyNTcsImV4cCI6MTQ1MzE4Nzg1Nywic3ViIjoiYWRtaW5AY2FyYm9uLnN1cGVyIiwiYXpwIjoiVzJPb1N4UURDVnJCazFsbmZmbzFOR0NLWmJRYSIsImF0X2hhc2giOiJRMXdwcURSOVpvV2NjQjNUbUl0Q0x3Iiwibm9uY2UiOiJhYmMiLCJhdWQiOlsiVzJPb1N4UURDVnJCazFsbmZmbzFOR0NLWmJRYSJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJpYXQiOjE0NTMxODQyNTd9.iZSsb9PGC6lK0_fZe6R46BuiJs029F2NpA7GFv5NtI9T4h8p64qwBX-A0LEqOxg3H02OHIV22zKti8WoPsruFZmeAT75__kUHij_b3JM34kUuus478c1qBWFFKzR1EIReEj7Rf2UxYAPixgmPhuutQjJhAXqSwSiRlOR_tDp1Do</code></pre></td>
</tr>
</tbody>
</table>

!!! note
    The nonce value is a mandatory parameter and it is not
    provided, you will not receive an Id Token.
    

**Base64 decoded value of Id Token**

``` java
{"auth_time":1453184484,"exp":1453188084,"sub":"admin@carbon.super","azp":"W2OoSxQDCVrBk1lnffo1NGCKZbQa","at_hash":"DoxjyXzmrL6Z_kWRzmBdCA","nonce":"abc","aud":["W2OoSxQDCVrBk1lnffo1NGCKZbQa"],"iss":"https:\/\/playground.local:9443\/oauth2\/token","iat":1453184484}
```

!!! info
    The Id Token does not contain the `          at_hash         ` value
    because no access token is generated and an access token is required to
    calculate the `          at_hash         ` value.

### Response\_type : id\_token token

##### Request

<table>
<tbody>
<tr class="odd">
<td><pre><code>https://wso2is.local:9443/oauth2/authorize?response_type=id_token%20token&amp;client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&amp;redirect_uri=http://wso2is.local:8080/playground2/oauth2client&amp;nonce=abc&amp;scope=openid</code></pre></td>
</tr>
</tbody>
</table>

##### Response

<table>
<tbody>
<tr class="odd">
<td><pre><code>http://wso2is.local:8080/playground2/oauth2client#access_token=bb2157fce1266331c7802a8a1f6a33e1&amp;id_token=eyJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiWHRhdktnTGtBT18zVUFfMmstay1YUSIsInN1YiI6ImFkbWluQGNhcmJvbi5zdXBlciIsImF1ZCI6WyJOZ1RJQ1hGUFludDdFVFVtNkZjOE5NVThLMzhhIl0sImF6cCI6Ik5nVElDWEZQWW50N0VUVW02RmM4Tk1VOEszOGEiLCJhdXRoX3RpbWUiOjE0NTI5NjkwNDUsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTQ1Mjk3MzU1OSwibm9uY2UiOiJhYmMiLCJpYXQiOjE0NTI5Njk5NTl9.PNJl3gkC85zxZVclbaSR_5rFPUApBLD1vWQ1nkQUwzSNxA3A0SU2VJOLfGK-R1FQ_xQaC_MaZsfAvxm5h5o9_KTxWvYY8KuGEvqSz5uecE0ykArBBmLf1Sk0nT5MxVGcVvTRx6swkWZRtxIlcofnMoQKuephwXASPWdcJIhoJH0&amp;token_type=Bearer&amp;expires_in=2386</code></pre></td>
</tr>
</tbody>
</table>

!!! note
    The access token and the IDToken are both returned to the client.
    
