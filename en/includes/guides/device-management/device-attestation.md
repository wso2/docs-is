# Device attestation

Attestation is how {{product_name}} learns whether a device is genuine rather than an emulator, a modified build, or a repackaged copy of your application. Google (Play Integrity) and Apple (App Attest) each provide an attestation service, and {{product_name}} turns their verdict into a [device attribute]({{base_path}}/guides/device-management/device-attributes/) that you can write policy conditions against:

- `androidIntegrity` (**Android integrity**) for Android devices.
- `iosIntegrity` (**iOS device genuine**) for iOS devices.

{{product_name}} sets these two attributes only from the attestation result. If a device reports values for them itself, those values are discarded, so a modified application can't claim to be genuine.

## Configure attestation

Attestation is configured per application, on the **Advanced** tab of the application under the **Client Attestation** section. For the full steps, including the service account credentials needed for Android and the app ID needed for Apple, see [Secure app-native authentication flows]({{base_path}}/guides/authentication/app-native-authentication/secure-app-native-authentication-flows/#using-client-attestation).

Your application then obtains an integrity token (Android) or an attestation object (iOS) from the platform and sends it to {{product_name}}:

- **At login** - In the `x-client-attestation` header of the authentication request, as described in [Secure app-native authentication flows]({{base_path}}/guides/authentication/app-native-authentication/secure-app-native-authentication-flows/#using-client-attestation).
- **At registration** - As the `attestationToken` attribute of the device data that the application sends at the **Device Registration** step. See [Integrate device management in your app]({{base_path}}/guides/device-management/integrate-device-management-in-your-app/#report-device-attributes).

!!! note
    If the application doesn't send an attestation token, the `androidIntegrity` and `iosIntegrity` attributes aren't set. A policy condition on them is then reported as missing device data, and the device doesn't pass that condition. If attestation is sent but can't be performed, for example because client attestation isn't configured for the application, the verdict is `INTEGRITY_FAILED` for Android and `false` for iOS.

## Android integrity levels

Google returns a list of the integrity levels the device meets. {{product_name}} keeps only the strongest level in that list and sets `androidIntegrity` to one of the following values, strongest first. If the list is empty, the value is `INTEGRITY_FAILED`.

<table>
    <thead>
        <tr>
            <th>Value</th>
            <th>What Google is saying</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>MEETS_STRONG_INTEGRITY</code></td>
            <td>Genuine device, recent security updates, and strong hardware-backed guarantees.</td>
        </tr>
        <tr>
            <td><code>MEETS_DEVICE_INTEGRITY</code></td>
            <td>Genuine Android device running genuine Android software.</td>
        </tr>
        <tr>
            <td><code>MEETS_BASIC_INTEGRITY</code></td>
            <td>The device passes basic checks, but Google cannot fully vouch for it.</td>
        </tr>
        <tr>
            <td><code>MEETS_VIRTUAL_INTEGRITY</code></td>
            <td>An emulator running genuine Android software, rather than a physical device.</td>
        </tr>
        <tr>
            <td><code>INTEGRITY_FAILED</code></td>
            <td>Google could not verify the device, or attestation is not working.</td>
        </tr>
    </tbody>
</table>

The `equals` operator matches one level exactly. Because a device that meets strong integrity is reported as `MEETS_STRONG_INTEGRITY`, a condition such as `Android integrity` `equals` `MEETS_DEVICE_INTEGRITY` would reject it. To require device integrity or stronger, exclude the weaker levels instead, with the following conditions in the same group:

```text
androidIntegrity not equals MEETS_BASIC_INTEGRITY
AND androidIntegrity not equals MEETS_VIRTUAL_INTEGRITY
AND androidIntegrity not equals INTEGRITY_FAILED
```

## iOS device genuine

Attestation from Apple is a simpler yes-or-no verdict. Either the device and the application passed verification (`true`) or they did not (`false`).
