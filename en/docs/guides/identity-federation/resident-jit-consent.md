# Configuring Just-In-Time Provisioning Consent Purposes

The provisioning framework of WSO2 Identity Server supports just-in-time (JIT) provisioning, which allows you to provision users to the identity
server at the time of federated authentication. If necessary, you can
also configure purposes, and appropriate user attributes to obtain the user consent at the time of JIT provisioning, depending on your requirement.  

For example, if you want to obtain a user's phone number and email
address for account recovery, You have to get the user's
consent to collect those attributes at the time of JIT provisioning.

To configure JIT provisioning consent purposes and appropriate user attributes:

1. On WSO2 Identity Server management console, go to **Main > Identity > Resident**

2. Expand **User Onboarding > Ask Password** section.

3. Click on the link next to **Manage JIT provisioning purposes** to display the **Consent Purposes** screen.
    ![jit-provisioning]( {{base_path}}/assets/img/guides/jit-consent-purposes.png)

4. Click **Add New Purpose**.
5. Enter values for **Purpose** and **Description**, and then click **Add PII Category** to add the user attributes for the purpose.

    !!! tip

        You can add one or more user attributes to obtain consent for a
        particular purpose.

    ![purpose-consent]( {{base_path}}/assets/img/guides/purpose-consent.png)

    !!! info "Add mandatory attributes"
        If it is mandatory to obtain consent for a specific user attribute, select the **Mandatory** check box corresponding to that attribute.

6. Click **Finish**.

    !!! info "Add more purposes"
        Depending on your requirement, you can either add another new purpose and related user attributes or click **Finish** if you have added all the necessary purposes.

??? tip "Tips on JIT consent purposes."

    -   When you configure purposes for JIT provisioning, the attributes that you specify for a specific purpose are the only attributes for which users are requested to provide consent.
    -   If mandatory user attributes are set as **Mandatory**, JIT provisioning will happen if the user consented to the attribute.
    -   If a user does not provide consent for any of the non-mandatory attributes, WSO2 Identity Server will not store those attributes.