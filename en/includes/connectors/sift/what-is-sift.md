# Sift

[Sift](https://sift.com/){:target="_blank"} helps businesses prevent fraud, abuse, and account takeovers by analyzing user behavior and contextual data in real time. By combining signals like device fingerprinting, IP reputation, and behavioral patterns, Sift creates a dynamic risk score that helps businesses make smarter decisions and reduce false positives.

{{product_name}} uses Sift to calculate risk for each user login based on behavioral and contextual signals. You can then tailor the login flow based on the assessed risk using [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/).

 **You can use Sift connector when**:

- You want to deny login request from a user when the risk level exceeds a threshold value. In this case, Sift calculates the risk score based on the information sent by IS such as x,y,z and external attributes from Sift internals. Based on the risk score returned by Sift, IS can deny login requests and logs the event.

- You want to prompt an additional MFA step for the user when the risk score exceeds a threshold value. In this case, Sift calculates the risk score based on the information sent by IS such as x,y,z and external attributes from Sift internals. Based on the risk score returned by Sift, IS can deny login requests and logs the event.