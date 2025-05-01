
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select Traditional Web Application

![Select Traditional Web Application]({{base_path}}/assets/img/complete-guides/nodejs/image5.png){: width="800" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and following authorized redirect URLs. Keep OpenID Connect selected as the protocol.

!!! Example
    **name:** is-nodejs
    
    **Authorized redirect URLs:** http://localhost:3000/oauth2/redirect, http://localhost:3000

![Register a new application]({{base_path}}/assets/img/complete-guides/nodejs/image8.png){: width="800" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:3000/oauth2/redirect](http://localhost:3000/oauth2/redirect){:target="_blank"} and [http://localhost:3000](http://localhost:3000){:target="_blank"}.
    
You will need the following information available in the Quick Start tab of your app.

* Client ID
* Client Secret

![Quick start guide]({{base_path}}/assets/img/complete-guides/nodejs/image9.png){: width="800" style="display: block; margin: 0;"}

After creating the application, navigate to **User Management > Users** and [create a new user](https://wso2.com/asgardeo/docs/guides/users/manage-users/#onboard-users). We will use this user to log in to the Node.js app.

In this step, we have registered our Node.js app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a Node.js app using the Express.js framework.
