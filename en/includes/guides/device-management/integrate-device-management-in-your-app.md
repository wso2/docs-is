# Integrate device management in your app

This guide explains what a native mobile or desktop application must do to register a device with {{product_name}} and to present the registered device when the user signs in.

The application is responsible for three things:

- Generating and protecting a device key.
- Registering the device at the **Device Registration** step of a registration flow.
- Sending a signed device token when the user signs in.

## Before you begin

{% if product_name == "WSO2 Identity Server" %}
- [Enable device management]({{base_path}}/guides/device-management/#enable-device-management).
{% endif %}
- [Add the Device Registration step]({{base_path}}/guides/device-management/configure-device-registration/) to a registration flow, and make sure your application can run that flow with the [Flow Execution API]({{base_path}}/guides/flows/flow-execution-api/).
- If your policies use attestation, [configure client attestation]({{base_path}}/guides/device-management/device-attestation/#configure-attestation) for the application.

## Generate a device key

Generate an elliptic curve (EC) key pair on the device, for example on the P-256 curve, and keep the private key in the secure hardware of the device, such as the Android Keystore, the Secure Enclave, or a TPM. The private key must never leave the device. The device uses this key to sign the registration challenge, the device data, and every device token.

## Register the device

When the flow reaches the **Device Registration** step, the Flow Execution API returns a response of type `INTERNAL_PROMPT`.

```json
{
  "flowId": "c8e06de8-7123-44ac-8209-02be5b55387e",
  "flowStatus": "INCOMPLETE",
  "type": "INTERNAL_PROMPT",
  "data": {
    "requiredParams": ["publicKey", "signature", "deviceData"],
    "additionalData": {
      "registrationId": "74070bae-df8c-42bf-8754-5173c237c936",
      "challenge": "q3x3Zp3j0JvFf1m7m3kF5G8W2sV6l9d0QhYp4n1eT0Y"
    }
  }
}
```

- `registrationId` - The ID that the device gets once it is registered. Store it on the device. You need it to [send a device token at login](#send-a-device-token-at-login).
- `challenge` - A one-time, base64url-encoded random value that the device must sign.
- `requiredParams` - The inputs to send back. `deviceData` is required only when a device assurance policy is set on the step.

Continue the flow with the following inputs.

```json
{
  "flowId": "c8e06de8-7123-44ac-8209-02be5b55387e",
  "inputs": {
    "publicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...",
    "signature": "MEUCIQDf3k...",
    "deviceModel": "Pixel 8",
    "deviceData": "eyJhbGciOiJFUzI1NiJ9..."
  }
}
```

<table>
    <thead>
        <tr>
            <th>Input</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>publicKey</code></td>
            <td>The public key of the device, as a base64-encoded X.509 <code>SubjectPublicKeyInfo</code> structure.</td>
        </tr>
        <tr>
            <td><code>signature</code></td>
            <td>A base64-encoded <code>SHA256withECDSA</code> signature, in DER format, over the decoded bytes of <code>challenge</code>, made with the private key of the device.</td>
        </tr>
        <tr>
            <td><code>deviceModel</code></td>
            <td>Optional. The hardware model of the device. It is shown to the user and to administrators, and is used to build the default device name.</td>
        </tr>
        <tr>
            <td><code>deviceData</code></td>
            <td>Required when a policy is set on the step. A JWT signed with the private key of the device that carries the device attributes. See <a href="#report-device-attributes">Report device attributes</a>.</td>
        </tr>
    </tbody>
</table>

If the signature is valid and the device complies with the policy, the flow moves to the next step. The device is registered to the user when the flow completes.

## Report device attributes

The device reports its attributes in a JWT signed with its private key, using an ECDSA algorithm that matches the key, such as `ES256`. Use a standard JWT library to create it. Note that the JWT signature uses the raw format defined by the JWS specification, unlike the DER-encoded registration `signature`. The claims of the JWT are the [device attributes]({{base_path}}/guides/device-management/device-attributes/) that your policies use, plus the following:

<table>
    <thead>
        <tr>
            <th>Claim</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>jti</code></td>
            <td>Required. A unique identifier for the token. {{product_name}} rejects a token whose <code>jti</code> was already used.</td>
        </tr>
        <tr>
            <td><code>iat</code></td>
            <td>Required. The time the token was issued. {{product_name}} accepts the token for five minutes after this time.</td>
        </tr>
        <tr>
            <td><code>platform</code></td>
            <td>The platform of the device: <code>android</code>, <code>ios</code>, <code>macos</code>, or <code>windows</code>. It selects the policy rule that applies.</td>
        </tr>
        <tr>
            <td><code>attestationToken</code></td>
            <td>Optional. The Play Integrity token (Android) or App Attest object (iOS) of the device. See <a href="{{base_path}}/guides/device-management/device-attestation/">Device attestation</a>.</td>
        </tr>
    </tbody>
</table>

The following is an example of the claims for an Android device.

```json
{
  "jti": "1f0c6a52-6a3e-4b7f-9b8e-2f5c3c9d7a10",
  "iat": 1767225600,
  "platform": "android",
  "androidOsVersion": "15",
  "isRooted": "false",
  "lockScreen": "true",
  "diskEncryption": "true",
  "attestationToken": "eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0..."
}
```

## Send a device token at login

When the user signs in, the application sends a device token so that {{product_name}} can identify the registered device and evaluate policies against it. The device token is a JWT with the same claims as the [device data](#report-device-attributes), signed with the private key of the device, with the following header parameter:

- `deviceId` - The `registrationId` that the device received during registration.

```json
{
  "alg": "ES256",
  "typ": "JWT",
  "deviceId": "74070bae-df8c-42bf-8754-5173c237c936"
}
```

Send the token in one of the following ways:

- In the `X-Device-Token` header of the authorization request, when the application uses [app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/).

    ```bash
    curl --location '{{api_base_path}}/oauth2/authorize' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Accept: application/json' \
    --header 'X-Device-Token: <device_token>' \
    --data-urlencode 'client_id=<client_id>' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'redirect_uri=<redirect_uri>' \
    --data-urlencode 'scope=openid' \
    --data-urlencode 'response_mode=direct'
    ```

- In the `device_token` query parameter of the authorization request, when the application opens a browser for a redirect-based sign-in.

!!! note
    Create a new device token, with a new `jti` and a current `iat`, for every sign-in attempt, including retries. A token is accepted only once and only for five minutes. If the token is invalid, expired, or reused, or if the device was deleted or is inactive, the sign-in continues without device data, and any policy check in the login flow reports the device data as unavailable.
