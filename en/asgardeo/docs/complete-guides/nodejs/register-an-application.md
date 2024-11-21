---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First unless you already have done that, you need to create an organization in {{product_name}} and register your application as a Traditional Web Application.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select Traditional Web Application

![Select Traditional Web Application]({{base_path}}/complete-guides/nodejs/assets/img/image5.png){: width="600" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and an authorized redirect URL. Keep OpenID Connect selected as the protocol.

!!! Example
    **name:** is-nodejs
    
    **Authorized redirect URL:** http://localhost:3000*

![Register a new application]({{base_path}}/complete-guides/nodejs/assets/img/image8.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:3000](http://localhost:3000){:target="_blank"}, as the sample app will be accessible at this URL.


    
You will need the following information available in the Quick Start tab of your app.

* Client ID
* Base URL
* Redirect URL

![Quick start guide]({{base_path}}/complete-guides/nodejs/assets/img/image9.png){: width="600" style="display: block; margin: 0;"}

In this step, we have registered our Node.js app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a Node.js app using the Express.js framework.
