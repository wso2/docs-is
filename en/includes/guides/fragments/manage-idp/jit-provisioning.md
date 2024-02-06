{% if product_name == 'Asgardeo' %}
!!! note "Attribute syncing for JIT-provisioned users"
    {{product_name}}, by default, enables Just-In-Time (JIT) user provisioning for your external identity provider.

    When a user logs in with an external identity provider using the same email address registered in a local account, JIT-provisioning overrides the attributes of the local account with the attributes received from the external identity provider.

    You can use the [identity provider APIs]({{base_path}}/apis/idp/#tag/Provisioning/operation/getJITConfig) to customize the attribute syncing behavior between the external identity provider and {{product_name}}.

    Learn more about JIT provisioning and how to disable it in [configure JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/).
{% else %}
!!! note "Attribute syncing for JIT-provisioned users"
    {{product_name}}, by default, disables Just-In-Time (JIT) user provisioning for your external identity provider.

    When a user logs in with an external identity provider using the same email address registered in a local account, JIT-provisioning overrides the attributes of the local account with the attributes received from the external identity provider.

    Learn more about JIT provisioning and how to enable it in [configure JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/).

    You can use the [identity provider APIs]({{base_path}}/apis/idp/#tag/Provisioning/operation/getJITConfig) to customize the attribute syncing behavior between the external identity provider and {{product_name}}.
{% endif %}


