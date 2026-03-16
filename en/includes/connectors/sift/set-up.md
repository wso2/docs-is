# Set up

The following guide explains how you can install and set up Sift in {{product_name}}.

## Prerequisites

You need to have a Sift account. If you don't have an account, create one by visiting the [Sift website](https://sift.com/).

## Step 1: Install the Sift connector

Follow the steps below to install Sift in {{product_name}}.

1. Download the following artifacts from the {{product_name}} [connector store](https://store.wso2.com/connector/identity-fraud-detection-sift){: target="_blank"}.
    - `org.wso2.carbon.identity.fraud.detection.sift-<version>.jar` - The Sift connector jar file.
    - `sift-java-<version>.jar` - The Sift Java SDK jar file.
2. Copy the `org.wso2.carbon.identity.fraud.detection.sift-<version>.jar` file to the `<IS_HOME>/repository/components/dropins` directory.
3. Copy the `sift-java-<version>.jar` file to the `<IS_HOME>/repository/components/lib` directory.
4. Restart {{product_name}}.

## Step 2: Add the API key

To work with Sift, you need to register your Sift API key in {{product_name}}. To do so,

1. On the {{product_name}} Console, go to **Login & Registration**.
2. Click **Sift Configuratioin** and enter the API key.
    ![Configuring Sift in WSO2 Console]({{base_path}}/assets/img/connectors/sift/sift-configs.png)
3. Click **Update** to save the changes.

## Step 3: Configure fraud detection settings

After adding the API key, you can further configure how {{product_name}} interacts with Sift.

### Information to include in the event payload

- Enable **Include user profile information in the event payload** to include the user's `email`, `mobile`, and `name` in events sent to Sift.
- Enable **Include user device metadata in the event payload** to include the user's `IP address` and `User Agent` in events sent to Sift.

### Events to publish

You can select which user events are published to Sift for fraud analysis:

| Event | Description |
|---|---|
| **Registrations** | Publishes user registration events. |
| **Credential Updates** | Publishes user credential update events. |
| **User Profile Updates** | Publishes user profile update events. |
| **Logins** | Publishes user login events. |
| **Logouts** | Publishes user logout events. |
| **User Verifications** | Publishes notification-based user verification events. |

!!! note
    User self-registration and password reset related Sift events are only published when using the legacy self-registration and password recovery flows.

### Diagnostic logging

Enable **Log event payloads locally** to log the event payloads sent to Sift as diagnostic logs in {{product_name}}. This is useful for troubleshooting your Sift integration.
