# A/B Testing with WSO2 Identity Server

A/B testing is a method used for comparing two variants of a web page to determine which one performs better. When you integrate WSO2 Identity Server with your application, for example, to implement a login page, you can verify its usability using an A/B test.

Imagine your login page allows [self-registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration). You may want to test alternate registration page layouts to understand which one will result in more user registrations. You may also want to test whether asking for fewer information from users during registration would result in more registrations.

WSO2 Identity Server allows you to easily perform A/B testing using [VWO](https://vwo.com/).


## Setting up A/B Testing with VWO

Follow the steps below to set up A/B Testing for {{product_name}} with VWO.

1.  Create an A/B test in VWO. To do so, refer to its [knowledge base](https://help.vwo.com/hc/en-us/articles/360021171954-How-to-Create-an-A-B-Test-in-VWO-) for instructions.

2.  Get the **smart code** provided for the test.

3.  Enable VWO for your website by adding the smart code to the appropriate web pages of your application.

## Examples

A sample test configured for the self-registration page would look like this in VWO:
![vwo-settings]({{base_path}}/assets/img/guides/analytics/ab-testing/vwo-settings.png)

A report like the one below will be available with the test results:
![vwo-report]({{base_path}}/assets/img/guides/analytics/ab-testing/vwo-report.png)

