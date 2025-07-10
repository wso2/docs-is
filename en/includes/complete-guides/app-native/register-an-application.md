
Once the application is created, navigate to the `Protocol` tab and add the following as the redirect URI.

```shell
http://localhost:3000/api/auth/callback/google
```

Then configure `http://localhost:3000` as the `Allowed origin` and click on the `Update` button to save the changes.

![Protocol tab Configurations]({{base_path}}/assets/img/complete-guides/app-native/image4.png){: width="800" style="display: block; margin: 0;"}

Let's also configure a client authentication method for the application. In the Protocol tab, navigate to the `Client Authentication` section and select `Client Secret Basic` from the `Client authentication method` dropdown and click on the `Update` button to save the changes.

![Client Authentication Configuration]({{base_path}}/assets/img/complete-guides/app-native/image5.png){: width="800" style="display: block; margin: 0;"}

Now navigate to the `User Attributes` tab and expand the `Profile` section and mark the `First Name` and `Last Name` attributes as requested and click on `Update` button to save the changes.

![User Attributes tab Configurations]({{base_path}}/assets/img/complete-guides/app-native/image6.png){: width="800" style="display: block; margin: 0;"}

Then navigate to the `Advanced` section and tick the option for `Enable app-native authentication API` and click on the `Update` button to save the changes.

![Advanced tab Configurations]({{base_path}}/assets/img/complete-guides/app-native/image7.png){: width="800" style="display: block; margin: 0;"}

In this step, we have registered our Next.js app as an application with app-native authentication in the {{product_name}} console and generated the required metadata. Next, we will create a Next.js app.
