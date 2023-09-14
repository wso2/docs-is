# Pushed authorization requests (PAR)

Generally, when a user logs in to a web application using a user agent, such as a web browser, an OAuth 2.0 authorization request is initiated from the front-channel. This introduces two major challenges,

- The request data is sent in a URL using a query string. Therefore the data is exposed to malicious users and the authorization server cannot guarantee whether the data has not been tampered by a malicious user.

- Complex authorization requests can sometimes be too large for browsers to process.

PAR defines the `/par` endpoint in an authorization server to mitigate these issues. When a user logs in, the back-channel sends the authorization payload directly to the authorization server using the `/par` endpoint.  The `/par` endpoint, in response, returns a `request_uri`.

Consequently, the conventional authorization request takes place in the user agent with a single difference: instead of the request data, the URL contains the `client_id` and the `request_uri` which acts as a reference to the authorization payload.

Therefore, using PAR with an OAuth authorization request,

- ensures integrity of the request is protected.
- ensures confidentiality of the request.
- enables complex requests to be passed without browser limitations.
- avoids leakage of query strings to third-party sites and web server logs.

## How does it work?

The diagram below illustrates the PAR authorization flow.

![The PAR authorization flow]({{base_path}}/assets/img/concepts/oauth2-par.png)

1. The client makes a POST request to the `/par` endpoint containing all the parameters required for authorization.

    !!! abstract ""

        **Request Format**
        ```
        curl --location 'https://<IS_HOST>:<IS_PORT>/oauth2/par' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --header 'accept: application/json' \
        --header 'Authorization: Basic -u <CLIENT_ID>:<CLIENT_SECRET>' \
        --data-urlencode 'client_id=<CLIENT_ID>'\
        --data-urlencode 'redirect_uri=<REDIRECT_URI>' \
        --data-urlencode 'response_type=code' \
        --data-urlencode 'scope=<SCOPES>'
        ```
        ---

        **Sample Request**
        ```
        curl --location 'https://localhost:9443/oauth2/par' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --header 'accept: application/json' \
        --header 'Authorization: Basic -u YWRtaW46YWRtaW4=' \
        --data-urlencode 'client_id=DUBCMGolTZQNg6mmE9GvfQ3qfq8a' \
        --data-urlencode 'redirect_uri=http://localhost:8080/playground2' \
        --data-urlencode 'response_type=code' \
        --data-urlencode 'scope=openid email'
        ```

2. The authorization server authenticates the client.
3. The endpoint validates the pushed authorization request.
4. If the validation is successful, the endpoint returns a response containing the request_uri. The `request_uri` functions as the reference for the authorization payload submitted during the initial authorization request.

    !!! abstract ""

        **Sample response**
        ```
        {
        "expires_in": 60,
        "request_uri": "urn:ietf:params:oauth:par:request_uri:a0cf571e-fe97-411a-8f33-3c01913c0e5f"
        }
        ```
5. The client makes an authorization request to the authorization endpoint with the client_id and the request_uri.

    !!! abstract ""

        **Sample request**
        ```
        https://localhost:9443/oauth2/authorize?client_id=Cx4LKFNObeuXocx7xgOpz5vfzFoa&request_uri=urn:ietf:params:oauth:par:request_uri:a0cf571e-fe97-411a-8f33-3c01913c0e5f
        ```

6. The `/authorize` endpoint validates the request.
7. If the validation is successful, the client receives the authorization code (or the access token based on the chosen grant type).