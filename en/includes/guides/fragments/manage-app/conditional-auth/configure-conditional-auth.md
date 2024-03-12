<!-- markdownlint-disable-next-line -->
Follow the steps given below.

1. On the {{ product_name }} Console, click **Applications**.
2. Select the application for which you wish to apply a conditional login flow and go to its **Login Flow** tab.
3. Click **Start with default configuration** to define the login flow starting with the `username and password` login.
4. Turn on **Conditional Authentication** by switching the toggle on. You can define your conditional authentication script in the editor.

    ![Enable conditional auth]({{base_path}}/assets/img/guides/conditional-auth/enable-conditional-auth.png)


    !!! warning Important
        As a security measure, {{ product_name }} does not allow the usage of two consecutive periods (`..`) in authentication scripts.