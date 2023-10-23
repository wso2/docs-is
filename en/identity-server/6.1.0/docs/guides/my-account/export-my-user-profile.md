# Export User Profile

Using the **export user profile** feature in **My Account**, a JSON file can be downloaded. This file includes the user's personal information, consents, and other claims allowing the user to extract the information that is being is recorded about them in WSO2 IS.

!!! tip
    The consent receipts in the
    `           userInfo.json          ` file contain the PII controller information 
    as it is, at the time that the receipt is generated. If the PII controller has 
    changed after the receipt was generated, this change will not be reflected in the 
    existing receipts. To get an updated consent receipt that reflects the change, 
    generate a new consent receipt by doing one of the following:

    1.  Revoke the consent via **My Account** and go through the flow that prompts 
        the relevant consent again (i.e., revoke the given consent for an application 
        in WSO2 IS, log out, then log back in. Now approve the consent again. A new consent 
        receipt will be generated for that application consent).

    2.  Use the [Consent Management REST APIs]({{base_path}}/apis/use-the-consent-management-rest-apis) to revoke the
        existing consent and add a new consent.

You can export your profile by following the instructions given below.

1. Access **My Account** (`https://<IS_HOST>:<PORT>/myaccount`).
2. Click the **Personal info** tab on the side panel.
3. Under the **Export profile** sub section, click on the **Download as JSON** button. All the profile details will be downloaded to your local machine as a JSON file.

    ![profile-export]({{base_path}}/assets/img/guides/my-account/user-profile/profile-export.png)
