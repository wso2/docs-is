{% set token_request = "``` curl
    curl -X POST
    -u \"<client_id>:<client_secret>\"
    -H \"Content-Type: application/x-www-form-urlencoded\"
    -d \"grant_type=password
    &username=<user_name>
    &password=<user_password>
    &tokenBindingId=uniqueId\"
    https://api.asgardeo.io/t/<organization_name>/oauth2/token
    ```" %}

{% set introspection = "``` curl
    curl -X POST
    -u \"client_id:client_secret\"
    -H \"Content-Type: application/x-www-form-urlencoded\"
    -d \"token=<your_access_token>\"
    https://api.asgardeo.io/t/<organization_name>/oauth2/introspect
    ```" %}

{% include "../../../../includes/references/token-binding/client-request.md" %}