---
template: templates/complete-guide.html
heading: Register an application
read_time: 2 min
---

If you have not already done so, you will need to create an organization in Asgardeo and register your application as given below.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select **Traditional Web Application** (*Make sure that the protocol remains set to OpenID Connect (OIDC)*)

![Select Traditional Page Application]({{base_path}}/complete-guides/app-native/assets/img/image1.png){: width="800" style="display: block; margin: 0;"}  

Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example

    **Name**: asgardeo-nextjs

    **Authorized redirect URL**: http://localhost:3000

![Register a new application]({{base_path}}/complete-guides/app-native/assets/img/image2.png){: width="800" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use `http://localhost:3000`, as the sample application will be accessible at this URL

Make a note of the following values from the **Protocol** tab of the registered application. You will need them to configure Asgardeo provider for Auth.js.

- **`Client ID`**
- **`Client Secret`**

![Protocol tab]({{base_path}}/complete-guides/app-native/assets/img/image3.png){: width="800" style="display: block; margin: 0;"}

In this step, we have ve registered our Next.js app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a Next.js app.