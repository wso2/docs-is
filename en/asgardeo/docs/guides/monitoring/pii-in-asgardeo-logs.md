# Potential risks of including PII in query parameters

Including Personally Identifiable Information (PII) in query parameters can pose security and privacy risks. These can be in the form of plain text or embedded in `jwt` tokens. Asgardeo logs these query parameters to uphold security, compliance, and auditing standards, as well as to fulfill other legal obligations.

Therefore, any PII sent as query parameters will be logged in our server access logs. This means that sensitive information, such as names, email addresses, or other personal data, may be recorded and stored as part of routine system operations.

To mitigate the risk of exposing PII, **we strongly recommend encrypting such information when sending as query parameters or consider sending such information in the request body**.

By using Asgardeo, you acknowledge and understand these potential risks, and you are encouraged to follow the guidance provided here to ensure data security and privacy for your data. If you have any questions or require guidance on handling sensitive information securely within our system, reach out to our support team at `asgardeo-help@wso2.com`.