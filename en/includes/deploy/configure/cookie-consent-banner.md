# Configure cookie consent banner

{{ product_name }} displays a cookie consent banner on the Console and MyAccount portals by default. This banner informs users about cookie usage and allows them to accept or manage their cookie preferences.

You can control the visibility of the cookie consent banner at different levels:

- **Globally**: Enable or disable the banner across all applications
- **Per application**: Control the banner visibility for specific applications (Console or MyAccount)

## Enable/Disable cookie consent banner globally

To enable/disable the cookie consent banner globally across all applications, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[ui.cookie_consent_banner]
enabled=false
```

!!! note
    By default, the cookie consent banner is enabled. Set `enabled=false` to disable it globally.

## Enable/Disable cookie consent banner per application

You can control the cookie consent banner visibility for specific applications without affecting the global configuration. This allows you to disable the banner for the Console or MyAccount portal independently.

### For Console

To control the visibility of the cookie consent banner only for the Console application, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

```toml
[console.ui]
is_cookie_consent_banner_enabled=false
```

### For My Account

To control the visibility of the cookie consent banner only for the MyAccount portal, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

```toml
[myaccount.ui]
is_cookie_consent_banner_enabled=false
```

!!! note "Important"
    - These configurations do not affect the authentication or recovery portals. They only determine whether the banner is shown within the respective applications.
    - Per-application settings override the global configuration for that specific application.
    - By default, the cookie consent banner is enabled for both Console and MyAccount applications.

## Priority order for configurations

When determining whether to display the cookie consent banner, {{ product_name }} follows this priority order:

1. **Per-application configuration**: If a global and a per-application setting are present, the per-application configuration takes precedence for that application.

2. **Global configuration**: If no per-application configuration exists, the global setting applies.

3. **Default behavior**: If no configuration is specified, the cookie consent banner is enabled by default.
