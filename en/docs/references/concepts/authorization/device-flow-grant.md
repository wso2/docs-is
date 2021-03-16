# Device Authorization Grant (Device Flow)

## Recommended use

This is an OAuth 2.0 extension that enables OAuth clients to request user authorization from applications on:

- Input-constrained devices
- Devices without a browser

Such devices include smart TVs, printers and play-stations. This authorization flow is defined as the “device flow”.
This specification instructs the user to review the authorization request on a secondary device, such as a smartphone.

## The flow

The device flow does not require two-way communication between the OAuth client and the device. Instead of directly
contacting the end user's user-agent, it guides the end user to connect to the authorization server through another device,
and then approves the access request.

The diagram below illustrates the device flow.

![device-flow](../../assets/img/concepts/deviceflow.png)


(A) — The client sends an access request including it's client identifier to the authorization server.

(B) — The authorization server issues a device code, end user code, and an end user verification URI.

(C) — The client instructs the end user to access the provided URI using a secondary device (e.g., a mobile device ). The client then provides the end user code that is used to review the authorization request, to the user.

(D) — The authorization server prompts the end user to approve granting access via the user-agent and also prompts the user to enter the end user code.

(E) — While the end user reviews user credentials and consents, the device starts polling along with client ID and verification code to check the status of user authorization.

(F) — Once the user provides authorization, the authorization server validates the verification code and responds back to the device with an access token.




!!! info "Support for refresh token grant - Yes"
	This grant type issues a refresh token which can be used to obtain new access tokens using the (refresh token grant)[refresh-token-grant.md].

