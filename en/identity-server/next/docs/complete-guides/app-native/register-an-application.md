---
template: templates/complete-guide.html
heading: Register an application
read_time: 2 min
---

First unless you already have done that, you need to register your application as a Traditional Web Application.

* Download and [setup WSO2 Identity Server](https://is.docs.wso2.com/en/latest/get-started/quick-set-up/){:target="_blank"}
* Sign in to {{product_name}} console and navigate to **Applications > New Application.**
* Select **Traditional Web Application** (*Make sure that the protocol remains set to OpenID Connect (OIDC)*)

![Select Traditional Page Application]({{base_path}}/assets/img/complete-guides/app-native/image1.png){: width="800" style="display: block; margin: 0;"}

Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example

    **Name**: {{product}}-nextjs

    **Authorized redirect URL**: http://localhost:3000

![Register a new application]({{base_path}}/assets/img/complete-guides/app-native/image2.png){: width="800" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{ base_path }} should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use `http://localhost:3000`, as the sample application will be accessible at this URL

Make a note of the following values from the **Protocol** tab of the registered application. You will need them to configure Asgardeo provider for Auth.js.

* **`Client ID`**
* **`Client Secret`**

![Protocol tab]({{base_path}}/assets/img/complete-guides/app-native/image3.png){: width="800" style="display: block; margin: 0;"}

{% include "../../../../../includes/complete-guides/app-native/register-an-application.md" %}
