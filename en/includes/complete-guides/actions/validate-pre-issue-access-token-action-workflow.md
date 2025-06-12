To test the scenario, you can obtain an access token using the previously registered application with the
`client_credentials` grant, as shown in the cURL command below.

```curl
curl --location 'https://<hostname>/t/<tenant_domain>/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic <base64_encoded_client_id_and_client_secret>' \
--header 'x-client-source-ip: <client_ip>' \
--data-urlencode 'grant_type=client_credentials'
```

Please note that this works similarly with the `authorization_code` grant as well. You will need to obtain the
authorization code by signing in through the authorize URL, and then obtain the token using a cURL command similar to
the one shown below.

```curl
curl -X POST https://<hostname>/t/<tenant-domain>/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "x-client-source-ip: <client_ip>" \
  -u "<client_id>:<client_secret>" \
  -d "grant_type=authorization_code" \
  -d "code=<authorization_code>" \
  -d "redirect_uri=<redirect_uri>"
```

Some scenarios you can try out are as follows:

* Restricted Country: The IP `175.45.176.0` belongs to a restricted country (North Korea). The request will be blocked.
* High Abuse Score: The IP `103.159.198.178` has an abuse confidence score greater than 75. The request will be blocked
  due to high risk.
* Moderate Abuse Score (Working Hours): The IP `14.102.69.58` has an abuse confidence score between `25` and `75`.
  During working hours (9 AM–5 PM UTC), the token will be issued with a 15-minute expiry.
* Moderate Abuse Score (Outside Working Hours): The IP `14.102.69.58` has an abuse confidence score between `25` and
  `75`. Outside working hours, the token will be issued with a 5-minute expiry.
* Low Abuse Score: The IP `205.210.31.51` has an abuse confidence score below `25`. The token will be issued with a
  1-hour expiry.
