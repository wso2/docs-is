---
template: templates/complete-guide.html
heading: Register an application
read_time: 2 min
---

If you have not already done so, you will need to create an organization in Asgardeo and register your application as given below.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
* Sign in to {{product_name}} console and navigate to **Applications > New Application.**
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

Once the application is created, navigate to the `Protocol` tab and add the following as the redirect URI.

```shell
http://localhost:3000/api/auth/callback/google
```

Then configure `http://localhost:3000` as the `Allowed origin` and click on the `Update` button to save the changes.

![Protocol tab Configurations]({{base_path}}/complete-guides/app-native/assets/img/image4.png){: width="800" style="display: block; margin: 0;"}

Let's also configure a client authentication method for the application. In the Protocol tab, navigate to the `Client Authentication` section and select `Client Secret Basic` from the `Client authentication method` dropdown and click on the `Update` button to save the changes.

![Client Authentication Configuration]({{base_path}}/complete-guides/app-native/assets/img/image5.png){: width="800" style="display: block; margin: 0;"}

Now navigate to the `User Attributes` tab and expand the `Profile` section and mark the `First Name` and `Last Name` attributes as requested and click on `Update` button to save the changes.

![User Attributes tab Configurations]({{base_path}}/complete-guides/app-native/assets/img/image6.png){: width="800" style="display: block; margin: 0;"}

Then navigate to the `Advanced` section and tick the option for `Enable app-native authentication API` and click on the `Update` button to save the changes.

![Advanced tab Configurations]({{base_path}}/complete-guides/app-native/assets/img/image7.png){: width="800" style="display: block; margin: 0;"}

In this step, we have registered our Next.js app as an application with app-native authentication in the {{product_name}} console and generated the required metadata. Next, we will create a Next.js app.
