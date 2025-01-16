---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First unless you already have done that, you need to create an organization in {{product_name}} and register your application as a single page application.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select **Single Page Application.**

![Select Single Page Application]({{base_path}}/complete-guides/javascript/assets/img/image5.png){: width="600" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    name: asgardeo-javascript
    
    Authorized redirect URL: http://localhost:5173

![Register a new application]({{base_path}}/complete-guides/javascript/assets/img/image8.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:5173](http://localhost:5173){:target="_blank"}, as the sample app will be accessible at this URL.

    
Note down the following values from the **Protocol** tab of the registered application. You will need them to configure  Asgardeo JavaScript SDK.

- **`client-id`** from the **Protocol** tab. 
- **The name of your Asgardeo organization**


In this step, we have ve registered our JavaScript app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a JavaScript app using Vite.
