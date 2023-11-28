# Configure the user store preference order

From WSO2 Identity server 5.9.0 onwards, admins can configure the user store preference order for a service provider during the authentication.

This guide helps you to configure the user store preference order for a service provider.

## Initial set up

To set up the WSO2 identity Server to configure the user store preference order:

1. Implement the `UserStorePreferenceOrderSupplier` interface with your own logic to retrieve the user store order.

    Use the provided template to implement the [UserStorePreferenceOrderSupplier interface](https://github.com/wso2/carbon-kernel/blob/feeae3e4668b805c8d6d5e8c115897fa93b8a856/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/config/UserStorePreferenceOrderSupplier.java?source=post_page-----cdadf43f9366--------------------------------).

2. Extend ​the `CallBackHandlerFactory` ​interface and create an object of your custom `UserStorePreferenceOrderSupplier`.

    Use the provided template to extend the [CallBackHandlerFactory interface](https://github.com/wso2/carbon-identity-framework/blob/master/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/handler/request/CallBackHandlerFactory.java?source=post_page-----cdadf43f9366--------------------------------).

3. Add the following configuration to the `<IS-HOME>/repository/conf/deployment.toml` file to configure the `CallBackHandlerFactory` ​interface.

    ```
    [authentication.framework.extensions]
    callback_factory = "org.wso2.carbon.identity.custom.callback.userstore.CustomUserStoreOrderCallbackFactory"
    ```

4. Restart the WSO2 Identity Server if it's already running.

## Update the preference order

To update the preference order:

1. On the WSO2 Identity Server Management Console, go to **Main** > **Registry** > **Browse**
2. Navigate to **_system** > **config** and click on `userstore-metadata.xml` file.
3. Go to **Properties** and click `+`. The table shows the values obtained from the Following are the details represented in the table.

    | Parameter | Description   |
    |-----------|---------------|
    | Name      | Name of the service provider to which the user store preference order is applied.    |
    | Value     | The user store preference order in which the WSO2 Identity Server will authenticate the users logging into the specified service provider.   |

4. Click **Edit** to modify the values.