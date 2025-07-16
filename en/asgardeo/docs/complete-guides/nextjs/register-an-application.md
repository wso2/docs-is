---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First unless you already have done that, you need to create an organization in {{product_name}} and register your application as a Next Application.

* Sign up for a [free {{product_name}} account]({{ base_path }}/get-started/create-asgardeo-account/){:target="_blank"}
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select **Next.js**

![Select Traditional Page Application]({{base_path}}/assets/img/complete-guides/nextjs/image1.png){: width="600" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    name: {{product}}-nextjs

    Authorized redirect URL: http://localhost:3000

![Register a new application]({{base_path}}/assets/img/complete-guides/nextjs/image2.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use http://localhost:3000, as the sample application will be accessible at this URL

Make a note of the following values from the **Guide** tab of the registered application. You will need them to configure the Asgardeo provider.

```bash
NEXT_PUBLIC_ASGARDEO_BASE_URL="https://api.asgardeo.io/t/<your-org-name>"
NEXT_PUBLIC_ASGARDEO_CLIENT_ID="<your-app-client-id>"
ASGARDEO_CLIENT_SECRET="<your-app-client-secret>"
```

{% include "../../../../includes/complete-guides/nextjs/register-an-application.md" %}
