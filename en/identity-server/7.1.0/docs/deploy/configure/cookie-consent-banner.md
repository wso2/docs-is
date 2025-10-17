# Configure Cookie Consent Banner

The Cookie Consent Banner feature allows you to control the visibility of cookie consent notifications across different applications in WSO2 Identity Server.

## Overview

You can configure the cookie consent banner at different levels:

-   **Global level**: Controls the banner across all applications.
-   **Application-specific level**: Controls the banner for specific applications (Console and MyAccount).

??? Note "Affected Applications"
    These configurations do not affect the authentication or recovery portals. Instead, they only determine whether the banner is shown within the respective applications.

## Configuration

All configurations are made in the `deployment.toml` file located in `<IS_HOME>/repository/conf/`.

### Global Configuration

To enable or disable the cookie consent banner globally across all applications, add the following configuration:

```toml
[ui.cookie_consent_banner]
enabled = true # Set to 'false' to disable globally
```

By default, this is set to `true`.

### Console Application Configuration

To enable or disable the cookie consent banner specifically for the Console application:

```toml
[console.ui]
is_cookie_consent_banner_enabled = false # Set to 'true' to enable for Console
```

### MyAccount Application Configuration

To enable or disable the cookie consent banner specifically for the MyAccount application:

```toml
[myaccount.ui]
is_cookie_consent_banner_enabled = false # Set to 'true' to enable for MyAccount
```

### Configuration Priority

Application-specific configurations take precedence over global configurations. For example:

*   If global is disabled but Console is enabled, the banner will **show** in Console.
*   If global is enabled but MyAccount is disabled, the banner will **not show** in MyAccount.