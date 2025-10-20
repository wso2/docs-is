# Configure Log Masking with Log4j

There can be business-sensitive information that is added to logs in the product console and/or Carbon log files. When these logs are analyzed, the information is exposed to those who check them.

To avoid this potential security pitfall, users can mask sensitive information.

To avoid this potential security pitfall, users can mask sensitive information from the log file at the time of logging. In this feature, you can define patterns that need to be masked from the logs. This is particularly useful in the cases of credit card numbers, access tokens, etc.

To configure this feature, follow the instructions given below.

## Configure log masking

1. Log masking is enabled by default. However, you need to configure the required masking patterns.

2. These patterns are configured in the `<IS-HOME>/repository/conf/wso2-log-masking.properties`. You can change its default configurations in `<IS-HOME>/repository/conf/deployment.toml`.

## The masking pattern file

The masking pattern file is a property file that can contain one or more masking patterns. The following is a sample configuration that showcases how to mask the credit card numbers from the logs.

Navigate to `<IS-HOME>/repository/conf/deployment.toml`. Add the following configuration.

```toml
[masking_pattern.properties]
"CREDIT_CARD_VISA" = "4[0-9]{6,}$"
"CREDIT_CARD_MASTER" = "(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}"
"CREDIT_CARD_AMEX" = "[34|37][0-9]{14}$"
```

With this configuration, each log line is checked for all the configured patterns. If any match is found, it is masked with `*****`.

!!! note
    There can be a performance impact when using this feature with many masking patterns since each log line is matched with each of the patterns. Hence, it is recommended to only use the most necessary patterns.
