# Subscribe via Billing Portal

Start your WSO2 Identity Platform journey with the free plan and use it for as long as you want if it fits your requirements. When you're ready, you can upgrade to the **Growth** plan and pay only for the resources you use. For custom needs, you can move to an **Enterprise** plan. You can also adjust your resource commitments or cancel your subscription at any time, as explained below.

See the [pricing details](https://wso2.com/identity-platform/pricing/) and the available resource limits for each subscription plan.

## Upgrade the subscription plan

To upgrade your subscription:

1. Log in to the WSO2 Identity Platform Console.
2. Click **Upgrade** on the upper menu or go to the profile menu and select **Billing Portal** to open the portal.

    ![open the billing portal]({{base_path}}/assets/img/guides/select-upgrade-biling-portal.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. On the **Subscriptions** page, complete the guided steps shown in the progress bar: **Subscription → Usage → Support → Review → Done**.

    !!! note
        Find detailed information about each option in [Plan details](#plan-details).

    1. **Subscription** — Select the plan you want:

        - **Growth** — A self-service, Pay-As-You-Go plan. Click **Upgrade** (or **Configure**, if you're already on Growth and only want to adjust your options) to continue.
        - **Enterprise** — Click **Contact Us** and submit your information. The WSO2 Identity Platform team will get back to you with the next steps.

        ![select subscription plan]({{base_path}}/assets/img/guides/billing/step-select-tier.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    2. **Usage** — Set your monthly commitments for [Monthly Active Users (MAUs)](#resource-commitments), [Machine-to-Machine (M2M) tokens](#resource-commitments), and [AgentID tokens](#resource-commitments) using the sliders.

        ![set resource commitments]({{base_path}}/assets/img/guides/billing/step-usage-commitments.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        Review the included [pay-per-use resources](#pay-per-use-resources) and their overage rates, then click **Next**.

        ![review pay-per-use resources]({{base_path}}/assets/img/guides/billing/step-usage-ppu.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. **Support** — Select a [support plan](#support-plan) (Community, Standard, or Enterprise), then click **Review**.

        ![select support plan]({{base_path}}/assets/img/guides/billing/step-support.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. **Review** — Review the subscription summary and the estimated bill. Select or add a payment method, agree to the [terms of payment](https://wso2.com/asgardeo/terms-of-use/), and click **Confirm**.

        ![review and pay]({{base_path}}/assets/img/guides/billing/step-review.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        In the confirmation dialog, click **Confirm** to apply the changes. Your new plan takes effect immediately.

    5. **Done** — A confirmation screen appears once your subscription is active. Click **Done** to return to the Overview page.

## Plan details

The topics below explain the options available to you when selecting a plan that is right for you.

!!! note
    All subscriptions are billed **monthly**. To compare the different subscription plans, go to [WSO2 Identity Platform pricing](https://wso2.com/identity-platform/pricing/).

### Subscription tiers

WSO2 Identity Platform offers three tiers:

<table>
    <tr>
        <th><b>Free</b></th>
        <td>
          A no-cost plan with capped resource limits, ideal for getting started and evaluation. Usage is capped at the free-tier limits.
        </td>
    </tr>
    <tr>
        <th><b>Growth</b></th>
        <td>
          A self-service, Pay-As-You-Go (PAYG) plan with uncapped resource quotas. You set monthly commitments for each resource to lock in better rates, and any usage above your commitment is billed as overage.
        </td>
    </tr>
    <tr>
        <th><b>Enterprise</b></th>
        <td>
          A custom plan for larger needs, including everything in Growth plus custom resource allocation, a 99.99% uptime SLA and more. Available by contacting the WSO2 Identity Platform team.
        </td>
    </tr>
</table>

### Resource commitments

On the **Growth** plan, you set an upfront monthly commitment for each of the following resources. Committing to a higher volume locks in a better per-unit rate. Usage beyond your commitment is not throttled; instead, the excess usage is billed as overage at the end of the billing cycle.

- **Monthly Active Users (MAUs)**
- **Machine-to-Machine (M2M) tokens**
- **AgentID tokens**

!!! note
    The maximum upfront commitment on the Growth plan is **$2,000/month**. If you need more, click **Contact Us** to discuss a custom plan.

### Pay-per-use resources

Your Growth subscription includes a set number of the following resources out of the box, with any additional usage billed monthly:

- **Organizations** — 2 included; each additional organization is billed at $35/month. (Each extra organization includes 1 enterprise connection free of charge.)
- **Enterprise connections** — 2 included; each additional connection is billed at $35/month.

### Support plan

The support plan you select determines the availability of support services from the WSO2 Identity Platform team. For more information, see [SaaS support plans](https://wso2.com/saas-support-plans).

## Manage billing and payment

Your billing and payment information is saved in the **Billing Details** tab. You can use this tab to edit your billing details or to add or delete a payment method. You can also add a payment method during the **Review** step when subscribing.

![Manage billing and payment]({{base_path}}/assets/img/guides/billing-and-payment-information.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Manage invoices

Once you have upgraded to a paid plan, you can find and download your invoice from the **Invoices** tab that appears.

![Manage invoices]({{base_path}}/assets/img/guides/billing-invoices-tab.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Adjust or cancel your subscription

On the **Growth** plan, you can change your resource commitments or support plan from the **Overview** page. Click **Adjust Commitments** (under Usage) or the **Upgrade** option on the support card. This reopens the subscription wizard at the relevant step.

![subscription overview]({{base_path}}/assets/img/guides/billing/overview.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

To cancel your subscription:

1. Go to the **Overview** page.
2. In the **Cancellation** section, click **Cancel Subscription**.

    ![cancel subscription]({{base_path}}/assets/img/guides/billing/cancel.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Confirm in the dialog that appears.

    !!! warning
        Cancelling this subscription will immediately deactivate the organization, including all applications, authentication flows, and related services. You will no longer be able to access or use this organization after cancellation.

For any other subscription changes or help, contact the WSO2 Identity Platform support team at **asgardeo-help@wso2.com**.
