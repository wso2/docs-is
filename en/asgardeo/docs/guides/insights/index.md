{% set product_name = "WSO2 Identity Platform" %}

# Insights

**Insights** is the analytics section of the {{ product_name }} Console. It shows what is happening in your organization: who is logging in, how many people are signing up, and how often logins fail. It also covers token consumption and more.

Nothing needs to be installed, and you do not run an analytics platform yourself. {{ product_name }} already collects the identity activity of your organization; Insights turns it into dashboards.

## Two levels of Insights

Every organization starts with a basic set of charts in the **Insights** section. Turning on **Advanced Analytics** replaces them with a much richer set of interactive dashboards, powered by [Moesif](https://www.moesif.com/){:target="_blank"}, an analytics platform in the WSO2 product family.

Advanced Analytics is a one-time switch that an administrator makes for the whole organization. Once enabled, the dashboards appear directly in the Console - there is no separate account to create, no key to configure, and no billing to set up.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Basic insights</th>
      <th>Advanced Analytics</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Setup</b></td>
      <td>Available by default.</td>
      <td>Turn on once, from the Console.</td>
    </tr>
    <tr>
      <td><b>Dashboards</b></td>
      <td>A fixed set of summary charts.</td>
      <td>Multiple interactive dashboards. How many depends on your subscription tier.</td>
    </tr>
    <tr>
      <td><b>Data</b></td>
      <td>Login, registration, and machine-to-machine (M2M) token counts.</td>
      <td>Logins, sign-ups, sessions, tokens, flows, organization switches, and agent activity.</td>
    </tr>
  </tbody>
</table>

## Before you turn on advanced analytics

Four things are worth knowing, because the switch applies to your whole organization:

- **Your analytics history starts fresh.** Data collected before the switch does not carry over. The dashboards begin filling from the moment you enable Advanced Analytics.
- **It applies to everyone in your organization**, not just to you.
- **You cannot switch back from the Console.** Take a moment to be sure before you enable it.
- **Some end-user personal data is shared with Moesif** to generate the insights, including user identifiers and IP addresses. Moesif is a WSO2-owned company, and your data is published to the Moesif workspace in the same region you selected when you onboarded. See [Data published to Moesif]({{base_path}}/guides/insights/data-published-to-moesif/) for the full list, and [Data residency]({{base_path}}/references/data-residency-in-asgardeo/#analytics-data) for where the data resides.

## Turn on advanced analytics

1. On the {{ product_name }} Console, go to **Insights**.

2. At the top of the page you will see the **Switch to Advanced Analytics** banner. Click **Enable Advanced Analytics**.

    ![The Switch to Advanced Analytics banner]({{base_path}}/assets/img/guides/insights/advanced-analytics-banner.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Read the summary in the confirmation dialog. It links to the {{ product_name }} Terms of Service and the Moesif Terms of Service.

4. Select the checkbox to confirm you understand the change applies to your whole organization, then click **Enable**.

    ![The Advanced Analytics confirmation dialog]({{base_path}}/assets/img/guides/insights/advanced-analytics-dialog.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

That is the whole setup. The **Insights** section now shows your Advanced Analytics dashboards.

!!! note
    Dashboards populate as activity happens. If you have just enabled Advanced Analytics, wait for your organization to generate events before the charts become useful.

## View your insights

1. On the {{ product_name }} Console, go to **Insights**.

2. Use the tabs to move between dashboards.

3. Use the duration selector to change the time range the dashboards cover.

![The Insights dashboards]({{base_path}}/assets/img/guides/insights/insights-dashboard.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## What's next

- [Insights dashboards]({{base_path}}/guides/insights/insights-dashboards/) - what each dashboard shows, what your subscription tier includes, and how to go further with your own Moesif subscription.
- [Data published to Moesif]({{base_path}}/guides/insights/data-published-to-moesif/) - the complete reference of the events and attributes behind the dashboards.
