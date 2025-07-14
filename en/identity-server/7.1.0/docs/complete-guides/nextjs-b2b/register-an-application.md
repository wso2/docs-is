---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First, unless you already have done that, you need to download and run {{product_name}} and register the Teamspace app.

1. Setup [{{product_name}}](https://is.docs.wso2.com/en/7.1.0/get-started/quick-set-up/){:target="_blank"}
2. Sign into {{product_name}} console and navigate to **Applications > New Application.**
3. Select **Traditional Web Application**

    ![Select Traditional Page Application]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image3.png){: width="800" style="display: block; margin: 0;"}  

4. Select OpenID Connect (OIDC) as the protocol and provide a suitable name and an authorized redirect URL

    !!! Example
        Name: Teamspace

        Authorized redirect URL: `http://localhost:3000`

    ![Register a new application]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image4.png){: width="800" style="display: block; margin: 0;"}

    !!! Info

        The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where Teamspace is hosted. For this guide, we'll use `http://localhost:3000`, as the app will be accessible at this URL

5. Allow sharing the application with organizations and click "Create".

    !!! Note
        You can also do this later from the “Advanced” tab of the created application as-well.

    ![Allow sharing app]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image5.png){: width="800" style="display: block; margin: 0;"}

6. Once you create the application, you will be directed to the Quick Start tab of the created application.

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them to configure the app in later steps.

- **`Client ID`** from the **Protocol** tab.
- **`Client Secret`** from the **Protocol** tab.
- **`Issuer`** from from the **Info** tab.
- **`Logout`** from from the **Info** tab.

{% include "../../../../../includes/complete-guides/nextjs-b2b/register-an-application.md" %}
