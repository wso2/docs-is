
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select **Single Page Application**

![Select Single Page Application]({{base_path}}/assets/img/complete-guides/angular/image5.png){: width="600" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    name: wso2-angular
    
    Authorized redirect URL: http://localhost:4200

![Register a new application]({{base_path}}/assets/img/complete-guides/angular/image8.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:4200](http://localhost:4200){:target="_blank"}, as the sample app will be accessible at this URL.

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them to configure the authentication SDK

- **`client-id`** from the **Protocol** tab. 
- **`issuer`** from from the **Info** tab.


In this step, we have ve registered our Angular app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a Angular app.
