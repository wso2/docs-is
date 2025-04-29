


* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select **Traditional Web Application** (*Make sure that the protocol remains set to OpenID Connect (OIDC)*)

![Select Traditional Web Application]({{base_path}}/assets/img/complete-guides/dotnet/image1.png){: width="800" style="display: block; margin: 0;"}

Next, complete the wizard popup by providing a suitable name, a suitable protocol, and the authorized redirect URLs. You also have the option to share the application across all organizations, which can be set according to your preference. 

!!! Example

    Name: `asgardeo-dotnet`

    Protocol: `OIDC`

    Authorized redirect URLs:

    `https://localhost:5001/signout-callback-oidc`
    
    `https://localhost:5001/signin-oidc`

![Register a new application]({{base_path}}/assets/img/complete-guides/dotnet/image2.png){: width="800" style="display: block; margin: 0;"}


!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `https://localhost:5001/signin-oidc` and `https://localhost:5001/signout-callback-oidc`. You would need to allow CORS for these URLs accordingly (which will be prompted).

Once the application is created, let's configure the `Allowed origins` with the following URL:

```shell
https://localhost:5001
```

You will need the following information available in the `Quick Start` tab of your application or the `Protocol` tab to configure in the .NET application.

- Client ID
- Client Secret

![Quick Start Page]({{base_path}}/assets/img/complete-guides/dotnet/image3.png){: width="800" style="display: block; margin: 0;"}


Additionally, please take a note of the following endpoints that are available in the `Info` tab of your application.

- Issuer
- Authorize
- JWKS
- Logout

![Info Page]({{base_path}}/assets/img/complete-guides/dotnet/image4.png){: width="800" style="display: block; margin: 0;"}

In this step, we have registered our .NET app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a .NET Blazor Web Application.
