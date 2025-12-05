# Configure cookie consent banner

{{ product_name }} displays a cookie consent banner on the Console and MyAccount portals by default. This banner informs users about cookie usage and allows them to accept or manage their cookie preferences.

You can control the visibility of the cookie consent banner at different levels:

- **Globally**: Enable or disable the banner across all applications
- **Per application**: Control the banner visibility for specific applications (Console or MyAccount)

## Disable cookie consent banner globally

To disable the cookie consent banner globally across all applications, add the following configuration to the `deployment.toml` file located in the `<IS_HOME>/repository/conf/` directory.

```toml
[ui.cookie_consent_banner]
enabled=false
```

!!! note
    By default, the cookie consent banner is enabled. Set `enabled=false` to disable it globally.

## Disable cookie consent banner per application

You can control the cookie consent banner visibility for specific applications without affecting the global configuration. This allows you to disable the banner for the Console or MyAccount portal independently.

### Disable for Console

To disable the cookie consent banner only for the Console application, add the following configuration to the `deployment.toml` file:

```toml
[console.ui]
is_cookie_consent_banner_enabled=false
```

### Disable for MyAccount

To disable the cookie consent banner only for the MyAccount portal, add the following configuration to the `deployment.toml` file:

```toml
[myaccount.ui]
is_cookie_consent_banner_enabled=false
```

!!! note "Important"
    - These configurations do not affect the authentication or recovery portals. They only determine whether the banner is shown within the respective applications.
    - Per-application settings override the global configuration for that specific application.
    - By default, the cookie consent banner is enabled for both Console and MyAccount applications.

## Configuration priority

When multiple configurations are present, {{ product_name }} follows this priority order:

1. **Per-application configuration**: If `is_cookie_consent_banner_enabled` is set for a specific application (Console or MyAccount), that setting takes precedence for that application.
2. **Global configuration**: If no per-application configuration exists, the global `[ui.cookie_consent_banner]` setting applies.
3. **Default behavior**: If no configuration is specified, the cookie consent banner is enabled by default.

## Example configurations

### Example 1: Disable globally

To disable the cookie consent banner for all applications:

```toml
[ui.cookie_consent_banner]
enabled=false
```

### Example 2: Enable globally, disable for Console only

To keep the banner enabled globally but disable it for the Console application:

```toml
[console.ui]
is_cookie_consent_banner_enabled=false
```

### Example 3: Disable globally, enable for MyAccount only

To disable the banner globally but keep it enabled for the MyAccount portal:

```toml
[ui.cookie_consent_banner]
enabled=false

[myaccount.ui]
is_cookie_consent_banner_enabled=true
```

!!! tip
    After updating the `deployment.toml` file, restart the {{ product_name }} server for the changes to take effect.
