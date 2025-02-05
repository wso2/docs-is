---
template: templates/complete-guide.html
heading: Register an application
read_time: 2 min
---

If you have not already done so, you will need to create an organization in Asgardeo and register your application as given below.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select **Traditional Web Application** (*Make sure that the protocol remains set to OpenID Connect (OIDC)*)

![Select Traditional Web Application]({{base_path}}/complete-guides/dotnet/assets/img/image1.png){: width="800" style="display: block; margin: 0;"}

Next, complete the wizard popup by providing a suitable name, a suitable protocol, and the authorized redirect URLs. You also have the option to share the application across all organizations, which can be set according to your preference. 

!!! Example

    Name: `asgardeo-dotnet`

    Protocol: `OIDC`

    Authorized redirect URLs:

    `https://localhost:5001/signout-callback-oidc`
    
    `https://localhost:5001/signin-oidc`

![Register a new application]({{base_path}}/complete-guides/dotnet/assets/img/image2.png){: width="800" style="display: block; margin: 0;"}


!!! Info

    The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `https://localhost:5001/signin-oidc` and `https://localhost:5001/signout-callback-oidc`. You would need to allow CORS for these URLs accordingly (which will be prompted).



You will need the following information available in the `Quick Start` tab of your application or the `Protocol` tab to configure in the .NET application.

- Client ID
- Client Secret

![Quick Start Page]({{base_path}}/complete-guides/dotnet/assets/img/image3.png){: width="800" style="display: block; margin: 0;"}


Additionally, please take a note of the following endpoints that are available in the `Info` tab of your application.

- Issuer
- Authorize
- JWKS
- Logout

![Info Page]({{base_path}}/complete-guides/dotnet/assets/img/image4.png){: width="800" style="display: block; margin: 0;"}


In this step, we have registered our .NET app as an application in the Asgardeo console and generated the required metadata. Next, we will create a .NET Blazor Web Application.
