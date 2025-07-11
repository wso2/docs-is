
Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    name: {{product}}-react

    Authorized redirect URL: http://localhost:5173

![Register a new application]({{base_path}}/assets/img/complete-guides/react/image8.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use [http://localhost:5173](http://localhost:5173){:target="_blank"}, as the sample app will be accessible at this URL.

{% if product == "asgardeo"%}
You will need the following information available in the Quick Start tab of your app or the Quickstart guide under the React SDK for the `AuthProvider` config.

* Client ID
* Base URL
* Redirect URL

![Quick start guide]({{base_path}}/assets/img/complete-guides/react/image9.png){: width="600" style="display: block; margin: 0;"}

{% else %}
You need the following information.

* Client ID - You can find this from the application's **Protocol** tab.
* Base URL - `https://localhost:9443`
* Redirect URL - `http://localhost:5173` or the custom redirect URL you specified when creating the application.
{% endif %}

In this step, we have registered our React app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a React app using Vite.
