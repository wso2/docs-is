# OAuth transaction logs

OAuth transaction logs allow you to audit and monitor OAuth 2.0 activities in {{product_name}}, such as token generation and token introspection operations. While optional, these logs provide support for auditing, troubleshooting failed requests, or tracking OAuth activity across different clients and users.

## Enable OAuth transaction logging

To enable logging for OAuth endpoints:

1. Add the following event lister to the `<IS_HOME>/repository/conf/deployment.toml` file:

    !!! tip
        You can disable logging at any time by setting the `enable` property to **false**.

    ```toml
    [event.default_listener.oauth_listener]
    priority = 12
    enable = true
    ```

2. Restart WSO2 Identity Server. Once the changes apply, a new file named `transaction.log` gets created in the `<IS_HOME>/repository/logs/` folder.

## Understand transaction logs

The following examples illustrate sample entries in the OAuth transaction logs logged in the `transaction.log` file.

### OAuth token generation log

```text
[2018-10-17 19:05:35,578] - Type: OAUTH TOKEN | Info: {
  "expires_in_seconds": 3126,
  "grant_type": "client_credentials",
  "success": true,
  "time_taken_in_millis": 38,
  "type": "oauth",
  "issued_time": 1539782861654,
  "user": "admin@carbon.super",
  "client_id": "WImdsCviCHTXVjjef7VVMiYDxJAa"
}
```

### OAuth token introspection log

```text

[2018-10-17 19:05:48,654] - Type: OAUTH INTROSPECTION | Info: {
  "expires_in_seconds": 3113,
  "success": true,
  "time_taken_in_millis": 2,
  "issued_time": 1539782861,
  "type": "introspection",
  "user": "admin@carbon.super",
  "client_id": "WImdsCviCHTXVjjef7VVMiYDxJAa",
  "token": "6cc57770-a51c-3d6d-be62-49caa0c1217b"
}
```
