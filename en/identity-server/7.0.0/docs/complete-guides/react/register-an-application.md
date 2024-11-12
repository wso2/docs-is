---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First unless you already have done that, you need to setup {{product_name}} and register your application as a single page application.

* Download and [setup WSO2 Identity Server](https://is.docs.wso2.com/en/latest/get-started/quick-set-up/){:target="_blank"} 
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select Single Page Application

![Select Single Page Application]({{base_path}}/complete-guides/react/assets/img/image5.png){: width="600" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    name: is-react
    
    Authorized redirect URL: http://localhost:5173*



![Register a new application]({{base_path}}/complete-guides/react/assets/img/image8.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:5173](http://localhost:5173){:target="_blank"}, as the sample app will be accessible at this URL.


    
You will need the following information for the `AuthProvider` config.

* Client ID
* Redirect URL

![Quick start guide]({{base_path}}/complete-guides/react/assets/img/image9.png){: width="600" style="display: block; margin: 0;"}

In this step, we have ve registered our React app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a React app using Vite.
