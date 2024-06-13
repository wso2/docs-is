# App-native error codes

This document provides a list of error codes for the [authentication API]({{base_path}}/apis/app-native-authentication-api/) that implements app-native authentication.

| Error Code | HTTP status code  | Error message | Possible cause |
|------------|-------------------|---------------|----------------|
|401|401|Unauthorzed|Client authentication failure or client attestation failure.|
|60001|400|Invalid authentication request.|Received authentication request is invalid.|
|60002|400|Authentication failure.|Authentication flow has concluded with a failure.|
|60003|400|Authentication failure.|Authentication failure please retry.|
|60004|400|Invalid authenticatorId.|Provided authenticatorId \{\{authenticator_id\}\} is invalid.|
|60005|400|Unable to find application.|Unable to find application for clientId \{\{client_id\}\} in tenant domain \{\{tenant_domain\}\}.|
|60006|501|Authenticator not supported.|Configured authenticator \{\{authenticator_name\}\} is not supported.|
|60007|400|App native authentication is not enabled for the application.|App native authentication is not enabled for this application with id \{\{client_id\}\}.|
|60008|400|Authentication flow time out.|Authentication flow has timed out as it took too long to complete.|
|60009|400|Invalid flow identifier.|The provided flowId is invalid.|
|60010|400|Invalid logout request.|Received logout request is invalid.|
|65001|500|Unable to proceed with authentication.|Server encountered an error while processing the authentication request.|
|65002|500|Unable to find authenticator.|Authenticator not found for name: \{\{authenticator_name\}\}.|
|65003|500|Unknown authentication flow status.|Unknown authentication flow status: \{\{flow_status\}\}.|
|65004|500|Unable to retrieve application.|Server encountered an error while retrieving application for clientId \{\{client_id\}\} in tenant domain \{\{tenant_domain\}\}.|
|65005|500|Unable to proceed with logout.|Server encountered an error while processing the logout request.|










