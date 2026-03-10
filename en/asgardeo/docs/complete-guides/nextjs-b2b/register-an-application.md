---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First unless you already have done that, you need to create an organization in {{product_name}} and register your Teamspace application as a Next Application.

1. Sign up for a [free {{product_name}} account]({{ base_path }}/get-started/create-asgardeo-account/){:target="_blank"}
2. Sign into {{product_name}} console and navigate to **Applications > New Application.**
3. Select **Next.js**

    ![Select Traditional Page Application]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image3.png){: width="600" style="display: block; margin: 0;"}  

4. complete the wizard popup by providing a suitable name and an authorized redirect URL.

    !!! Example
        Name: Teamspace

        Authorized redirect URL: http://localhost:3000

    ![Register a new application]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image4.png){: width="600" style="display: block; margin: 0;"}

    !!! Info

        The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use http://localhost:3000, as the sample application will be accessible at this URL

5. Make a note of the following values from the **Guide** tab of the registered application. You will need them to configure the Asgardeo provider.

    ```bash
    NEXT_PUBLIC_ASGARDEO_BASE_URL="https://api.asgardeo.io/t/<your-org-name>"
    NEXT_PUBLIC_ASGARDEO_CLIENT_ID="<your-app-client-id>"
    ASGARDEO_CLIENT_SECRET="<your-app-client-secret>"
    ```

6. Navigate to the 'Shared Access' tab and select 'Share with all organizations'.

    ![Allow sharing app]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image5.png){: width="800" style="display: block; margin: 0;"}

{% include "../../../../includes/complete-guides/nextjs-b2b/register-an-application.md" %}
