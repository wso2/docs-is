# Just-in-Time User Inbound Provisioning

This page guides you through configuring [Just-in-Time (JIT) provisioning](TODO:insert-link-to-concept) users from external identity providers into WSO2 Identity Server at the point of federated authentication. 

-----

{!fragments/register-an-identity-provider.md!}

----

(TODO: dev-portal-fragment?)

## Enable JIT provisioning

1. Navigate to the **Just-in-Time Provisioning** tab.

2. Select **Enable Just-in-Time Provisioning** and select which user store domain to provision users to from the dropdown list. 

    ![enable-jit-provisioning](../../assets/img/guides/enable-jit-provisioning.png)

3. Select one of the following provisioning options. **Provision silently** is selected by default. 

    - **Prompt for username, password and consent**

    Prompts the user to enter a username and password, and provide consent at the point of federated authentication. 

    - **Prompt for password and consent**

    Prompts the user to enter a password and provide consent at the point of federated authentication. 

    - **Prompt for consent**

    Prompts the user to provide consent to be provisioned to WSO2 IS, at the point of federated authentication. 

    - **Provision silently**

    Silently provisions the user to WSO2 IS without prompting credentials or consent. 

----

!!! info "Related Topics"
    - [Concept: Just-in-Time Provisioning](TODO:link-to-concept)
    - [Guide: Outbound Just-in-Time Provisioning](TODO:link-to-guide)
    