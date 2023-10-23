# Configuring Just-In-Time Provisioning Consent Purposes

The provisioning framework of WSO2 Identity Server supports just-in-time
(JIT) provisioning, which allows you to provision users to the identity
server at the time of federated authentication. If necessary you can
also configure purposes and appropriate user attributes to obtain user
consent at the time of JIT provisioning depending on your requirement.  
For example, if you want to obtain a user's phone number and email
address for the purpose of account recovery, You have to get the user's
consent to collect those attributes at the time of JIT provisioning.

Follow the instructions below to configure JIT provisioning consent
purposes and appropriate user attributes via the management console of
WSO2 Identity Server:

!!! tip " Before you begin"
    
        Download and install WSO2 Identity Server. For detailed information on
        how to install, see [Installing the Product](../../setup/installing-the-product).
    

1.  Start WSO2 Identity Server and access the management console via
    `           https://localhost:9443/carbon/          ` .

2.  Click the **Main** tab, go to **Identity** -\> **Identity
    Providers** and then click **Resident**. This displays the
    **Resident Identity Provider** screen.
3.  Expand the **Account Management Policies** section, and then expand
    the **User Onboarding** section. Under **User Onboarding** you will
    see **Manage just-in-time provisioning purposes**.

4.  Click to configure JIT provisioning purposes and user attributes.  
    ![jit-provisioning]( ../assets/img/using-wso2-identity-server/jit-provisioning.png)   
    This displays the **Consent Purposes** screen where you can add
    consent purposes.

5.  Click **Add New Purpose**. This displays the **Add New Purpose**
    screen.
6.  Specify appropriate values for the **Purpose** and **Description**
    fields, and then click **Add PII Category** to add a user attribute
    required to obtain consent for the specified purpose.

    !!! tip
    
        You can add one or more user attributes to obtain consent for a
        particular purpose.
      
    ![purpose-consent]( ../assets/img/using-wso2-identity-server/purpose-consent.png) 

    If you want consent on a specific user attribute to be mandatory,
    select the **Mandatory** check box for that attribute.

    !!! tip
    
        -   When you configure purposes for JIT provisioning, the attributes
            that you specify for a specific purposes are the only attributes
            for which users are requested to provide consent.
        -   If a user attribute is set as **Mandatory**, JIT provisioning
            will not happen if a user does not provide consent for the
            attribute.
        -   If a user does not provide consent for any of the non-mandatory
            attributes, WSO2 Identity Server will not store those
            attributes.
    

7.  Click **Finish**. This displays details related to the purpose that
    you added.

8.  Depending on your requirement, you can either add another new
    purposes and related user attributes, or click **Finish** if you
    have added all the purposes you need.

9.  Click **Update**.

Now you have configured the required JIT provisioning purposes and user
attributes for which you require users to provide consent.
