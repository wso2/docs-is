---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First unless you already have done that, you need to create an organization in {{product_name}} and register your application as a Traditional Web Application.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select Traditional Web Application

![Select Traditional Web Application]({{base_path}}/complete-guides/nodejs/assets/img/image5.png){: width="800" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and following authorized redirect URLs. Keep OpenID Connect selected as the protocol.

!!! Example
    **name:** is-nodejs
    
    **Authorized redirect URLs:** http://localhost:3000/oauth2/redirect, http://localhost:3000

![Register a new application]({{base_path}}/complete-guides/nodejs/assets/img/image8.png){: width="800" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:3000/oauth2/redirect](http://localhost:3000/oauth2/redirect){:target="_blank"} and [http://localhost:3000](http://localhost:3000){:target="_blank"}.
    
You will need the following information available in the Quick Start tab of your app.

* Client ID
* Client Secret

![Quick start guide]({{base_path}}/complete-guides/nodejs/assets/img/image9.png){: width="800" style="display: block; margin: 0;"}

After creating the application, navigate to **User Management > Users** and [create a new user](https://wso2.com/asgardeo/docs/guides/users/manage-users/#onboard-users). We will use this user to log in to the Node.js app.

In this step, we have registered our Node.js app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a Node.js app using the Express.js framework.
