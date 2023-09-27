# Rate limits

Asgardeo endpoints are subjected to rate limits to maintain smooth and reliable processing of requests, preventing system failures and slowdowns. These rate limits are applied globally across all tiers of Asgardeo subscriptions.

Rate limits are calculated on a per IP address basis. For example, if the rate limit for an endpoint is 200, it means that the maximum number of requests you can make to this endpoint from a single IP address is 200 per minute.

Exceeding the rate limit results in a [429 Too Many Requests error code](https://datatracker.ietf.org/doc/html/rfc6585#section-4).

Listed below are the endpoints and the rate limits that apply to each endpoint.

<table>
<thead>
    <th>Endpoint</th>
    <th>Rate limit per IP</br>
    (per minute)</th>
</thead>

<tbody>
    <tr>
        <td>/api/identity/recovery/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/me/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/scim2/Me</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/api/users/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/scim2/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/api/asgardeo-associate/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/api/asgardeo-guest/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/api/cloud/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/api/identity/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/api/server/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/.well-known/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/api/identity/auth/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/identity/extend-session</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/logincontext</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/oauth2/token</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/oauth2/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/oidc/</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/samlartresolve</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/samlsso</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/acs</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/authenticationendpoint</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/accountrecoveryendpoint</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/commonauth</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/emailotpauthenticationendpoint</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/smsotpauthenticationendpoint</td>
        <td>200</td>
    </tr>
    <tr>
        <td>/totpauthenticationendpoint</td>
        <td>200</td>
    </tr>

</tbody>
</table>