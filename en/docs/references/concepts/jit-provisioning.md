# Just In Time Provisioning

## What is JIT provisioning?

Just-in-Time (JIT) provisioning is a method of automating user account creation in real-time at the point of [federated authentication]({{base_path}}/guides/identity-federation/identity-federation-overview/).
This means that when a user attempts to log in to an application for the first time via a trusted identity provider, JIT provisioning can be triggered to communicate the user's information from the identity provider to the application where the user account needs to be created. 

JIT provisioning happens in the middle of an authentication flow. You can create users on the fly, without having to create user accounts in advance. This can be configured using an identity and access management mediator such as WSO2 Identity Server (WSO2 IS). 

---

## How it works

Once JIT provisioning is configured for a particular application, the following process takes place.

1. User attempts to log in to the application although they do not already have a user account dedicated to that application. 

2. The application initiates the authentication request. 

3. The user gets redirected to WSO2 IS.

4. WSO2 IS redirects the user to a trusted external identity provider for authentication. 

5. If the user is successfully authenticated, the identity provider returns a successful authentication response including user attributes to WSO2 IS.

6. Upon receiving a successful authentication response, WSO2 IS creates (provisions) the user to the internal userstore using the user attributes received with the authentication response. A user account for that user is now created in WSO2 IS as well. 

Using JIT provisioning saves time and cost as the provisioning is automated and identity admins do not need to manually set up accounts for each new user.

!!! info
    Optionally, you can also set up JIT provisioning to provision the new users persisted in WSO2 IS to the external system as well using [outbound provisioning]({{base_path}}/references/concepts/provisioning-framework/#outbound-provisioning). 

JIT provisioning is configured for a particular identity provider. Whenever you associate an identity provider with an application for outbound authentication, if JIT provisioning is enabled for that particular identity provider, the users from the external identity provider will be provisioned into WSO2 Identity Server's internal userstore. You can also pick the provisioning userstore that the users are created in.

!!! info "Related topics"
    - [Concept: Introduction to Provisioning]({{base_path}}/references/concepts/identity-provisioning-intro)
    - [Concept: Provisioning Framework]({{base_path}}/references/concepts/provisioning-framework)
    - [Guide: JIT Inbound Provisioning]({{base_path}}/guides/identity-federation/jit-workflow)
    <!-- - [Guide: JIT Outbound Provisioning](TODO:link-to-guide)-->
