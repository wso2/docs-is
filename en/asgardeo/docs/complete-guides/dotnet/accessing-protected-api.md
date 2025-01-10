---
template: templates/complete-guide.html
heading: Accessing protected API from your .NET app
read_time: 2 min
---

In this section, we'll focus on how to securely call an API from your .NET Blazor Web application.

Previously, we've covered the essential steps for implementing user login and managing authentication in your .NET Blazor app. To recap, during the user login process, your authentication service provides both an ID token and an access token. So far, you've likely been using the ID token to establish the logged-in user's context, ensuring secure access to protected routes. Now, we'll shift our focus to the access token, which is critical for making authenticated API calls in your application.

The access token is used when your application needs to interact with a secure backend API. This token contains the required permissions or "scopes" that allow the application to make API requests on behalf of the authenticated user. In this section, we’ll walk through how to use this access token to securely call your backend API from your Blazor app.

For simplicity, let’s assume the APIs you're calling are secured by the same Identity Provider (IdP) and share the same issuer — in this case, the same Asgardeo organization. This is common when your Blazor app interacts with internal APIs within the same organization. However, if your Blazor app needs to call APIs secured by a different IdP, you will need to exchange your current access token for a new one issued by that IdP. This can be done using the OAuth2 token exchange flow or other supported grant types, which we’ll cover in a separate guide.

By leveraging the access token for API requests, your Blazor Web application can securely communicate with your backend, respecting the scopes and permissions granted during authentication.

The goal is to create a page that:
- Ensures the user is authenticated using an access token.
- Calls a protected API with that token.
- Displays the API response in a user-friendly, formatted manner.

We will use the `/scim2/Me` endpoint as the protected endpoint in this guide. In Asgardeo, the SCIM2 REST API implements the SCIM 2.0 Protocol according to the SCIM 2.0 specification. The `/scim2/Me` endpoint returns the user details of the currently authenticated user.

To access this endpoint, define it under `environmentVariables` in the `launchSettings.json` file as follows. Make sure to replace the `org` placeholder with the correct organization name.

```csharp
"SCIM2_ME_ENDPOINT": "https://api.asgardeo.io/t/<org>/scim2/Me"
```

> **Note**: To invoke the `/scim2/Me` endpoint, the `internal_login` scope must be present in the access token.

To check the current scopes being requested upon login, analyze the `scope` parameter in the request payload of the initial authorization request during login.

![Default scopes]({{base_path}}/complete-guides/dotnet/assets/img/image8.png){: width="600" style="display: block; margin: 0;"}

By default, the requested scopes are `openid` and `profile`. To add the `internal_login` scope, navigate to the `Program.cs` file and insert the following within the `oidcOptions` configurations in the `AddOpenIdConnect` method:

```csharp
oidcOptions.Scope.Add("internal_login");
```

Since we are utilizing the `SaveTokens` option to persist tokens for a given session, we can use `HttpContext` to retrieve the access token, provided the user is already authenticated. This can be ensured by using the `[Authorize]` attribute.

Let’s create a file named `Scim2Me.razor` under the `/Components/Pages` directory and include the following content.

```csharp
@page "/scim2-me"
@inject HttpClient Http
@inject IHttpContextAccessor HttpContextAccessor
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Authentication;
@using System.Text.Json
@attribute [Authorize]

<PageTitle>Protected API</PageTitle>

<h1>Protected API response - /scim2/Me</h1>

<!-- Displaying the formatted JSON response -->
@if (!string.IsNullOrEmpty(apiResponse))
{
    <pre>@apiResponse</pre>
}

@code {
    private string token;
    private string apiResponse;

    protected override async Task OnInitializedAsync()
    {
        var httpContext = HttpContextAccessor.HttpContext;

        if (httpContext != null)
        {
            // Now, safely call GetTokenAsync
            var accessToken = await httpContext.GetTokenAsync("access_token");

            if (!string.IsNullOrEmpty(accessToken))
            {
                token = accessToken;
                await CallApi();
            }
            else
            {
                apiResponse = "Access token was not found. Protected API invocation failed.";
                Console.WriteLine("No token found in HttpContext.");
            }
        }
        else
        {
            apiResponse = "Protected API invocation failed due to invalid authentication state.";
            Console.WriteLine("HttpContext is null.");
        }
    }

    private async Task CallApi()
    {
        Console.WriteLine("CallApi invoked.");
        @* string accessToken = await HttpContextAccessor.HttpContext.GetTokenAsync("access_token"); *@
        if (string.IsNullOrEmpty(token))
        {
            // Token is not available, handle the case where the user is not authenticated
            Console.WriteLine("Token is null or empty.");
            return;
        }

        // Set the Authorization header with the Bearer token
        Http.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

        // Make the API call
        var response = await Http.GetAsync(Environment.GetEnvironmentVariable("SCIM2_ME_ENDPOINT"));

        if (response.IsSuccessStatusCode)
        {
            // Process the response
            var data = await response.Content.ReadAsStringAsync();
            // Format the JSON response into a pretty string for display
            apiResponse = FormatJson(data);
            Console.WriteLine("token: " + data);
            // Do something with the data
        }
        else
        {
            apiResponse = "Error invoking protected API.";
            // Handle error (unauthorized, forbidden, etc.)
            Console.WriteLine("Error invoking protected API. Recieved an unsuccessful response: " + response.StatusCode);
        }
    }

    // Method to format JSON response for pretty display
    private string FormatJson(string json)
    {
        try
        {
            // Parse the JSON string into an object
            var jsonObject = JsonSerializer.Deserialize<JsonElement>(json);
            
            // Convert the object back into a nicely formatted JSON string
            return JsonSerializer.Serialize(jsonObject, new JsonSerializerOptions { WriteIndented = true });
        }
        catch (Exception ex)
        {
            return $"Error formatting JSON: {ex.Message}";
        }
    }
}
```

In the above code, we utilize the `OnInitializedAsync` method to retrieve the `HttpContext` from the `HttpContextAccessor` that we added in the `Program.cs` file in a previous step. Then, we invoke the `callApi` function if the access token is successfully extracted from it. The response is formatted using the `FormatJson` method before being displayed on the page. The `[Authorize]` attribute is also used to ensure that only authenticated users can access this page.

Additionally, we need to navigate to the `NavMenu.razor` file and add the `Scim2Me` page as a menu item.

```html
<div class="nav-item px-3">
    <NavLink class="nav-link" href="scim2-me">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Protected API
    </NavLink>
</div>
```

Now starting the application and clicking on the `Protected API` menu item after authentication will invoke the protected API with the token containing the required scopes and return a response as shown below.

![Protected API]({{base_path}}/complete-guides/dotnet/assets/img/image9.png){: width="600" style="display: block; margin: 0;"}

