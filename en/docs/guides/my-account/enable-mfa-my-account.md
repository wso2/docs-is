# Enroll Multi-Factor Authentication

MFA creates a layered defense and makes it more difficult for an unauthorized person to access a target such as a physical location, computing device, web service, network, or database. If one factor is compromised or broken, the attacker still has at least one more barrier to breach before successfully breaking into the target. WSO2 Identity Server allows configuring multi-step authentication where you can define an authentication chain containing different authenticators in different steps. For more information on MFA, see [Multi-factor Authentication]({{base_path}}/guides/mfa/configure-authentication-journey/).

Using the latest **My Account** application, users can update their mobile numbers through which they can authenticate themselves using the one-time verification code. Also, they can add inherent factors like Security Key/Biometrics (FIDO) devices and fingerprint sensors. The following section will provide instructions on how to configure MFA options in WSO2 IS using **My Account**. 

## Via SMS

1. Access **My Account** (https://<IS_HOST>:<PORT>/myaccount).
2. Click the **Security** tab on the side panel.
3. Under the **Multi-factor authentication** section, click on the edit icon aligning with the **SMS Number** section.
4. Enter the mobile number that needs to be added as the MFA factor and click **update**.

    !!! info
        This will also update the mobile number in the user profile.

## Via security device

!!! info
    This is supported by only a few browsers namely Chrome, Mozilla Firefox, and Microsoft Edge.

### Add security device

1. Access **My Account** (https://<IS_HOST>:<PORT>/myaccount).
2. Click the **Security** tab on the side panel.
3. Under the **Multi-factor authentication** section, click on the add icon aligning with the **via security device** section.
4. Select an option depending on whether to add a USB security key or a built-in sensor.

    ![fido-options-list]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-options-list.png)

5. Click on **Continue**. Alternatively, click on the **Choose another option** dropdown to switch your option.

    ![fido-option-confirm]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-option-confirm.png)
 
6. Click on **Continue**. Alternatively, click on the **Choose another option** dropdown to switch your option.

    ![fido-option-allow]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-option-allow.png)
    
7. Add the preferred device name.

    ![fido-option-device-name]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-option-device-name.png)

8. Once the device is successfully added, the registered device will be listed along with its name.

    ![fido-devices-list]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-devices-list.png)
    
!!! info "Using an older FIDO device"
    If an older FIDO device is used when registering the device, an error message mentioning that the device cannot be used will be displayed. 
    This means the device is not capable of performing passwordless authentication <!--(TO-DO:{{base_path}}/learn/passwordless-authentication-using-fido2.md)--> and can only be used as a [second factor]({{base_path}}/guides/mfa/2fa-fido/). The device will have to be added as an **"Older Device"**.

    Follow the steps given below to add the device as an older device.
    
    1. Click **close**.
    
        ![fido-device-old]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-device-old.png)
    
    
    2. Click **Try with an older Device**.
    
        ![fido-device-old-error]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-device-old-error.png)
    
    
    3. From this point onwards, the steps to register the device are the same as the steps given in [Add security device](#add-security-device).

### Delete security device

Any security device registered under MFA can be simply removed by clicking the delete icon.

![fido-device-delete]({{base_path}}/assets/img/guides/my-account/account-recovery/fido-device-delete.png)

