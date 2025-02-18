Follow the steps given below to enable **Push Notification** login for your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add Push Notification.

3. Go to the **Login Flow** tab of the application and add Push Notification from your preferred editor:

    {% if product_name == 'Asgardeo' %}
    
    {% else %}
    1. Click **+** to add a second step to the login flow.

    2. Click **Add Sign In Option**, select **Push Notification** and click **Add**.

    3. Click **Confirm** to add login with push notifications to the sign-in flow.

        ![Configuring push notification login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/push/add-push-notification-using-visual-editor.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    {% endif %}

4. Click **Update** to save your changes.
