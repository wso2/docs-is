{% if product_name == 'Asgardeo' %}
When a user logs in with an external identity provider using the same email address registered in a local account, JIT-provisioning overrides the attributes of the local account with the attributes received from the external identity provider.

{{product_name}}, by default, enables Just-In-Time (JIT) user provisioning for your external identity provider.

To disable JIT-provisioning,

1. On the {{ product_name }} Console, click **Connections** and select the relevant connection.

2. Go to the **Just-in-Time Provisioning** tab of the selected connection.

3. Check/Uncheck the **Just-in-Time (JIT) User Provisioning** checkbox to enable/disable it.

    ![enable/disable JIT user provisioning]({{base_path}}/assets/img/guides/jit-provisioning/jit-enabled.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

!!! note
        
    - Learn more about JIT provisioning configurations in [configure JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/).

    - You can use the [identity provider APIs]({{base_path}}/apis/idp/#tag/Provisioning/operation/getJITConfig) to customize the attribute syncing behavior between the external identity provider and {{product_name}}.
{% else %}

#### JIT user provisioning
    
When a user logs in with an external identity provider using the same email address registered in a local account, JIT-provisioning overrides the attributes of the local account with the attributes received from the external identity provider.

{{product_name}}, by default, disables Just-In-Time (JIT) user provisioning for your external identity provider.

To enable JIT-provisioning,

1. On the {{ product_name }} Console, click **Connections** and select the relevant connection.

2. Go to the **Just-in-Time Provisioning** tab of the selected connection.

3. Check/Uncheck the **Just-in-Time (JIT) User Provisioning** checkbox to enable/disable it.

    ![enable/disable JIT user provisioning]({{base_path}}/assets/img/guides/jit-provisioning/jit-enabled.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

!!! note
    
    - Learn more about JIT provisioning configurations in [configure JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/).

    - You can use the [identity provider APIs]({{base_path}}/apis/idp/#tag/Provisioning/operation/getJITConfig) to customize the attribute syncing behavior between the external identity provider and {{product_name}}.
{% endif %}