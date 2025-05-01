

In this section, we'll focus on how to securely call an API from your .NET Blazor Web application.

Previously, we've covered the essential steps for implementing user login and managing authentication in your .NET Blazor app. To recap, during the user login process, your authentication service provides both an ID token and an access token. So far, you've likely been using the ID token to establish the logged-in user's context, ensuring secure access to protected routes. Now, we'll shift our focus to the access token, which is critical for making authenticated API calls in your application.

The access token is used when your application needs to interact with a secure backend API. This token contains the required permissions or "scopes" that allow the application to make API requests on behalf of the authenticated user. In this section, we’ll walk through how to use this access token to securely call your backend API from your Blazor app.

For simplicity, let’s assume the APIs you're calling are secured by the same Identity Provider (IdP) and share the same issuer. This is common when your Blazor app interacts with internal APIs within the same organization. However, if your Blazor app needs to call APIs secured by a different IdP, you will need to exchange your current access token for a new one issued by that IdP. This can be done using the OAuth2 token exchange flow or other supported grant types, which we’ll cover in a separate guide.

By leveraging the access token for API requests, your Blazor Web application can securely communicate with your backend, respecting the scopes and permissions granted during authentication.

The goal is to create a page that:

- Ensures the user is authenticated using an access token.
- Calls a protected API with that token.
- Displays the API response in a user-friendly, formatted manner.

We will use the `/scim2/Me` endpoint as the protected endpoint in this guide. In {{product_name}}, the SCIM2 REST API implements the SCIM 2.0 Protocol according to the SCIM 2.0 specification. The `/scim2/Me` endpoint returns the user details of the currently authenticated user.

To access this endpoint, define it under `environmentVariables` in the `Properties/launchSettings.json` file as follows. Make sure to replace the `org` placeholder with the correct organization name.

```csharp hl_lines="20" title="launchSettings.json"
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "inspectUri": "{wsProtocol}://{url.hostname}:{url.port}/_framework/debug/ws-proxy?browser={browserInspectUri}",
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "AUTHORIZATION_ENDPOINT": "https://api.asgardeo.io/t/<org>/oauth2/authorize",
        "TOKEN_ENDPOINT": "https://api.asgardeo.io/t/<org>/oauth2/token",
        "JWKS_URI": "https://api.asgardeo.io/t/<org>/oauth2/jwks",
        "LOGOUT_URI": "https://api.asgardeo.io/t/<org>/oidc/logout",
        "AUTHORITY": "https://api.asgardeo.io/t/<org>/",
        "CLIENT_ID": "<client_id>",
        "CLIENT_SECRET": "<client_secret>",
        "METADATA_ADDRESS": "https://api.asgardeo.io/t/<org>/oauth2/token/.well-known/openid-configuration"
        "SCIM2_ME_ENDPOINT": "https://api.asgardeo.io/t/<org>/scim2/Me"
      }
    },
  }
}
```

To invoke the `/scim2/Me` endpoint, the `internal_login` scope must be present in the access token.

To check the current scopes being requested upon login, analyze the `scope` parameter in the request payload of the initial authorization request during login.

![Default scopes]({{base_path}}/assets/img/complete-guides/dotnet/image12.png){: width="800" style="display: block; margin: 0;"}

By default, the requested scopes are `openid` and `profile`. To add the `internal_login` scope, navigate to the `Program.cs` file and insert this scope within the `oidcOptions` configurations in the `AddOpenIdConnect` method as highlighted below:

```csharp title="Program.cs" hl_lines="73"
using asgardeo_dotnet.Components;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.AspNetCore.Components.Authorization;
using asgardeo_dotnet;

var builder = WebApplication.CreateBuilder(args);

HttpClient httpClient;
if (Environment.GetEnvironmentVariable("HTTPCLIENT_VALIDATE_EXTERNAL_CERTIFICATES") == "false")
{
    var handler = new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
    };
    httpClient = new HttpClient(handler);
}
else
{
    httpClient = new HttpClient();
}

builder.Services.AddSingleton(httpClient);

JsonWebKeySet FetchJwks(string url)
{
    var result = httpClient.GetAsync(url).Result;
    if (!result.IsSuccessStatusCode || result.Content is null)
    {
        throw new Exception(
            $"Getting token issuers (WSO2) JWKS from {url} failed. Status code {result.StatusCode}");
    }

    var jwks = result.Content.ReadAsStringAsync().Result;
    return new JsonWebKeySet(jwks);
}

const string ASGARDEO_OIDC_SCHEME = "AsgardeoOidc";

builder.Services.AddAuthentication(ASGARDEO_OIDC_SCHEME)
.AddOpenIdConnect(ASGARDEO_OIDC_SCHEME, oidcOptions =>
{
    oidcOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

    oidcOptions.Configuration = new ()
    {
        Issuer = Environment.GetEnvironmentVariable("TOKEN_ENDPOINT"),
        AuthorizationEndpoint = Environment.GetEnvironmentVariable("AUTHORIZATION_ENDPOINT"),
        TokenEndpoint = Environment.GetEnvironmentVariable("TOKEN_ENDPOINT"),
        JwksUri = Environment.GetEnvironmentVariable("JWKS_URI"),
        JsonWebKeySet = FetchJwks(Environment.GetEnvironmentVariable("JWKS_URI")!),
        EndSessionEndpoint = Environment.GetEnvironmentVariable("LOGOUT_URI"),
    };
    foreach (var key in oidcOptions.Configuration.JsonWebKeySet.GetSigningKeys())
    {
        oidcOptions.Configuration.SigningKeys.Add(key);
    }

    oidcOptions.Authority = Environment.GetEnvironmentVariable("AUTHORITY");

    oidcOptions.ClientId = Environment.GetEnvironmentVariable("CLIENT_ID");
    oidcOptions.ClientSecret = Environment.GetEnvironmentVariable("CLIENT_SECRET");

    oidcOptions.ResponseType = OpenIdConnectResponseType.Code;

    oidcOptions.MapInboundClaims = false;
    oidcOptions.TokenValidationParameters.NameClaimType = JwtRegisteredClaimNames.Name;
    oidcOptions.TokenValidationParameters.RoleClaimType = "roles";
    oidcOptions.MetadataAddress = Environment.GetEnvironmentVariable("METADATA_ADDRESS");
    oidcOptions.SaveTokens = true;
    oidcOptions.Scope.Add("internal_login");
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme);

builder.Services.AddAuthorization();
builder.Services.AddCascadingAuthenticationState();
builder.Services.AddScoped<AuthenticationStateProvider, PersistingAuthenticationStateProvider>();
builder.Services.AddHttpContextAccessor();

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();


app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.MapGroup("/authentication").MapLoginAndLogout();

app.Run();

```

Since we are utilizing the `SaveTokens` option to persist tokens for a given session, we can use `HttpContext` to retrieve the access token, provided the user is already authenticated. This can be ensured by using the `[Authorize]` attribute. The `[Authorize]` attribute protects the routes by only allowing authenticated users to access them. If an unauthorized user attempts to access these routes, they should be redirected to the login page of the Identity Provider.

Let’s create a file named `Scim2Me.razor` under the `/Components/Pages` directory using the following command.

```shell
touch Components/Pages/Scim2Me.razor
```

Then include the following content.

```csharp title="Scim2Me.razor"
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
    private string? token;
    private string? apiResponse;

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
            }
        }
        else
        {
            apiResponse = "Protected API invocation failed due to invalid authentication state.";
        }
    }

    private async Task CallApi()
    {
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

Additionally, we need to navigate to the `Components/Layout/NavMenu.razor` file and add the `Scim2Me` page as a menu item.

```csharp title="NavMenu.razor" hl_lines="38-42"
@using Microsoft.AspNetCore.Components.Authorization

<div class="top-row ps-3 navbar navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="">asgardeo-dotnet</a>
    </div>
</div>

<input type="checkbox" title="Navigation menu" class="navbar-toggler" />

<div class="nav-scrollable" onclick="document.querySelector('.navbar-toggler').click()">
    <nav class="nav flex-column">
        <div class="nav-item px-3">
            <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
                <span class="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Home
            </NavLink>
        </div>

        <AuthorizeView>
            <div class="nav-item px-3">
                <NavLink class="nav-link" href="user-claims">
                    <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Claims
                </NavLink>
            </div>

            <div class="nav-item px-3">
                <NavLink class="nav-link" href="scim2-me">
                    <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Protected API
                </NavLink>
            </div>
        </AuthorizeView>
    </nav>
</div>

```

Now starting the application and clicking on the `Protected API` menu item after authentication will invoke the protected API with the token containing the required scopes and return a response as shown below.

![Protected API]({{base_path}}/assets/img/complete-guides/dotnet/image13.png){: width="800" style="display: block; margin: 0;"}

In this guide, we successfully implemented a secure API call from a .NET Blazor Web application using the access token. This ensures that the application can securely interact with the backend API, respecting the scopes and permissions granted during authentication. We will look into how we can manage tokens in .NET applications, especially for Blazor Web applications in the next step.
