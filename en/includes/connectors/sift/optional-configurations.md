# Optional configurations

You can configure the following options when creating a conditional authentication script using Sift-related functions.

## Customize the data sent to Sift

To assess risk of a login event, {{product_name}} sends the following data to Sift:

- user ID (mandatory)
- session ID
- IP address
- user agent

You can override the default values that {{product_name}} sends by passing these as additional parameters in the functions. You can also exclude any optional parameter from being sent, by setting the value to an empty string as shown below.

```javascript
var additionalParams = {
    "$ip": "",
    "$user_agent": "",
    "$session_id": ""
}
```

## Enable logging

You can enable logging by sending `"loggingEnabled": true` as an additional parameter in the functions.

- If sent with `getSiftRiskScoreForLogin()` function, it logs the payload sent to Sift and the risk score that Sift returns.

- If sent with, `publishLoginEventToSift()`, it logs the payload sent to Sift.