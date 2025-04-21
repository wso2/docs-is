---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 1 min
---

First unless you already have done that, you need to create an organization in {{product_name}} and register your application as a single page application.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="\_blank"}
* Sign into the {{product_name}} console and navigate to **Applications > New Application.**
* Select **Single Page Application**.

![Select Single Page Application]({{base_path}}/complete-guides/react/assets/img/image5.png){: width="600" style="display: block; margin: 0;"}

Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
name: is-vue

    Authorized redirect URL: http://localhost:5173*

![Register a new application]({{base_path}}/complete-guides/react/assets/img/image8.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:5173](http://localhost:5173){:target="_blank"}, as the sample app will be accessible at this URL.



You will need the following information available in the Quick Start tab of your app or the Quickstart guide under the Vue SDK for the `AsgardeoPlugin` config.

- Client ID
- Base URL
- Redirect URL

![Quick start guide]({{base_path}}/complete-guides/vue/assets/img/image9.png){: width="600" style="display: block; margin: 0;"}

In this step, we've registered our Vue.js app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a Vue app using Vite.
