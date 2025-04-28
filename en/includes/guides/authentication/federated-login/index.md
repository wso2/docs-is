# Add federated login

{{product_name}} lets you add and configure external Identity Providers (IdP) so that users can bring their identities in these external IdPs and log in to applications. Follow the guides below to learn how you can integrate the external IdP of your choice with {{product_name}}.

## Create a connection

You can register an external IdP in {{product_name}} by creating a connection. {{product_name}} supports a variety of connections for your convenience. Select your preferred connection and follow the guide to learn how to configure it.

<div class="center-all">
  <div class="cards-container">
    <a href="{{base_path}}/guides/authentication/social-login/add-facebook-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/facebook-logo.svg" alt="Facebook" />
      <span>Facebook</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-github-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/github-logo.svg#only-light" alt="Github" />
      <img src="{{base_path}}/assets/img/logo/github-logo-dark.svg#only-dark" alt="Github" />
      <span>Github</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-google-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/google-logo.svg" alt="Google" />
      <span>Google</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-apple-login/" class="card square">
      <img src="{{base_path}}/assets/img/logo/apple-logo.svg#only-light" alt="Apple" />
      <img src="{{base_path}}/assets/img/logo/apple-logo-dark.svg#only-dark" alt="Apple" />
      <span>Apple</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-microsoft-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/microsoft-logo.svg" alt="Microsoft" />
      <span>Microsoft</span>
    </a>
    {% if product_name == "WSO2 Identity Server" %}
    <a href="{{base_path}}/guides/authentication/enterprise-login/add-microsoft-365-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/microsoft-logo.svg" alt="Microsoft 365" />
      <span>Microsoft 365</span>
    </a>
    <a href="{{base_path}}/guides/authentication/enterprise-login/add-iwa-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/microsoft-logo.svg" alt="Microsoft IWA" /></br>
      <span>IWA</span>
    </a>
    <a href="{{base_path}}/guides/authentication/enterprise-login/add-ad-fs-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/microsoft-logo.svg" alt="Microsoft AD FS" /></br>
      <span>AD FS</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-x-login/" class="card square">
      <img src="{{base_path}}/assets/img/logo/x-logo.svg#only-light" alt="X" /></br>
      <img src="{{base_path}}/assets/img/logo/x-logo-dark.svg#only-dark" alt="X" /></br>
      <span>X</span>
    </a>
    {% endif %}
    <a href="{{base_path}}/guides/authentication/standard-based-login/add-oidc-idp-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/oidc-logo.svg" alt="OIDC" />
      <span>OpenID Connect</span>
    </a>
    <a href="{{base_path}}/guides/authentication/standard-based-login/add-saml-idp-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/saml-logo.svg" alt="SAML" />
      <span>SAML</span>
    </a>
    {% if product_name == "WSO2 Identity Server" %}
    <a href="{{base_path}}/guides/authentication/standard-based-login/add-ws-federation" class="card square">
      <img src="{{base_path}}/assets/img/logo/ws-fed.svg" alt="WS-Fed" /></br></br></br>
      <span>WS-Federation</span>
    </a>
    {% endif %}
    {% if product_name == "Asgardeo" %}
    <a href="{{base_path}}/guides/authentication/decentralized-login/sign-in-with-ethereum" class="card square">
      <img src="{{base_path}}/assets/img/logo/ethereum.svg" alt="Ethereum" /></br>
      <span>Sign-in with Ethereum</span>
    </a>
    {% endif %}
  </div>
</div>

## Configure JIT provisioning

{% include "../../../guides/fragments/manage-connection/jit-provisioning.md" %}

## Map groups with {{ product_name }}

{% include "../../fragments/manage-connection/add-groups.md" %}

{% if product_name == "WSO2 Identity Server" %}
## Add connections to federation hub

{% include "../../fragments/manage-connection/federation-hub.md" %}
{% endif %}

## Delete a connection

{% include "../../fragments/manage-connection/delete-connection.md" %}