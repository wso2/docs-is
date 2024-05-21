# Configure custom domains
<Badge text="Paid subscription required" type="warn" />

!!! warning
    You need a paid {{ product_name }} subscription to use this feature. If you don't already have one, view the available [subscription plans](https://wso2.com/asgardeo/pricing/){:target="_blank"} and contact the {{ product_name }} sales team.

By default, the {{ product_name }} interfaces presented to your users (during the login, sign-up, and account recovery flows), as well as the back-end services (such as APIs), are served by {{ product_name }} on the following domains:

- **User interfaces**: `https://accounts.asgardeo.io/t/<org_name>`
- **Services**: `https://api.asgardeo.io/t/<org_name>`

With domain branding, you can customize the above endpoints to have hostnames specific to your organization. For example, if your organization is **Foo**, you can have the following custom domains:

- **User interfaces**: `https://accounts.foo.com`
- **Services**: `https://api.foo.com`

!!! note "Custom domain branding for B2B applications"
    If you have configured [organizations]({{base_path}}/guides/organization-management/manage-organizations/), note that the custom domain you configure for your organization (root) also applies to your organizations.

If you have a paid {{ product_name }} subscription and wish to implement a custom domain for your organization, contact {{ product_name }} support through the [WSO2 cloud support portal](https://cloud-support.wso2.com/){:target="_blank"} or send a request email to `asgardeo-help@wso2.com` and the team will get back to you with instructions.
Note that email and support portal requests should be sent from the respective account of an administrator.
