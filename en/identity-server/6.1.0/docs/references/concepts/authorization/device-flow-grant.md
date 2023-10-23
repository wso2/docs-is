# Device Authorization Grant (Device Flow)

Device flow is an OAuth 2.0 extension that lets clients sign in to applications in,

* Input constrained devices
* Devices without a browser

Such devices include smart TVs, printers, and gaming consoles. Device flow instructs the user to review the authorization request on a secondary device, such as a smartphone.

### The flow

The device flow does not require two-way communication between the OAuth client and the device. It guides the end user to another device to complete the sign in process.
 
The diagram below illustrates the device flow.

![device-authorization-grant-diagram]({{base_path}}/assets/img/using-wso2-identity-server/deviceflow.png)

(A) — The client sends an access request including its client identifier to the authorization server.

(B) — The authorization server issues a device code, an end user code, and an end user verification URI.

(C) — The client instructs the user to access the provided URI using a secondary device (e.g., a mobile device
). The client provides the user with the end user code.
 
(D) — The authorization server prompts the user to enter the end user code. The authorization server validates the code and asks the end user to accept or decline the authorization request.

(E) — While the end user reviews the authorization request, the client polls the authorization server with the device code and client identifier to check if the user has completed the authorization step.

(F) — If the user grants access, the authorization server validates the verification code and responds with the access token.

!!! info "Support for refresh token grant - Yes"
	This grant type issues a refresh token which can be used to obtain new access tokens using the [refresh token grant]({{base_path}}/learn/refresh-token-grant).

!!! info "Related Topics"
    See the [Try Device Authorization Grant]({{base_path}}/guides/access-delegation/try-device-flow/) topic to try out a sample with WSO2 Identity Server.