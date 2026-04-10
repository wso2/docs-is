# Set up

The following guide explains how you can install and set up Password Reset Enforcer in {{product_name}}.

## Prerequisites

- A running {{product_name}} instance.
- Access to the {{product_name}} installation directory (referred to as `IS_HOME`).

## Step 1: Install the Password Reset Enforcer connector

1. From the WSO2 Identity Server [Connector Store](https://store.wso2.com/connector/identity-outbound-auth-passwordPolicy){: target="_blank"}, download the Password Reset Enforcer and its artifacts.

2. Copy the `jar` file into the `<IS_HOME>/repository/components/dropins` directory of your WSO2 Identity Server installation.

3. Copy `pwd-reset.jsp` from the extracted artifacts package to the `IS_HOME/repository/deployment/server/webapps/authenticationendpoint/` directory (Not required in WSO2 Identity Server 7.3 and later).

## Step 2: Configure password expiry event handling

Add the following configuration to the `IS_HOME/repository/conf/deployment.toml` file.

```toml
[[event_handler]]
name = "passwordExpiry"
subscriptions = [
  "POST_UPDATE_CREDENTIAL",
  "POST_UPDATE_CREDENTIAL_BY_ADMIN",
  "POST_ADD_USER"
]

[event_handler.properties]
passwordExpiryInDays = "30"
enableDataPublishing = false
priorReminderTimeInDays = "0"
```

## Step 3: Enable the authenticator (WSO2 Identity Server 7.0 and later)

To make the authenticator available in application step configurations, add the following configuration to the `IS_HOME/repository/conf/deployment.toml` file.

```toml
[authentication.authenticator.password-reset-enforcer]
name = "password-reset-enforcer"
enable = true
```

## Step 4: Enable the password reset enforcement scope configuration (WSO2 Identity Server 7.3 and later)

```toml
[console.ui]
is_password_reset_enforcement_scope_enabled = true
```

## Step 5: Restart {{product_name}}

Restart {{product_name}} to apply the configuration and deploy the artifacts.
