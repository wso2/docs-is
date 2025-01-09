---
template: templates/complete-guide.html
heading: Add login and logout to your app
read_time: 10 min
---

In this guide, we will go through how the login and logout functionality will be implemented, where we will not be utilizing any third-party SDKs.

Several classes are required to handle tasks such as:
- Persisting the authentication state.
- Building the route for both login and logout.
- Maintaining the authenticated user information.

## Authentication State Management

The `AuthenticationStateProvider` class must be extended to manage the authentication state for a Blazor Web Application. In this case, we use the `PersistingAuthenticationStateProvider` class. This ensures that:
- The authentication state is persisted across interactions.
- The authentication state is rehydrated correctly.

This approach is particularly useful in scenarios where the application depends on server-side data persistence for authentication state.

```csharp
@using Microsoft.AspNetCore.Components;
@using Microsoft.AspNetCore.Components.Authorization;
@using Microsoft.AspNetCore.Components.Web;

namespace AsgardeoDotNetSample;

internal sealed class PersistingAuthenticationStateProvider : AuthenticationStateProvider, IHostEnvironmentAuthenticationStateProvider, IDisposable
{
    private readonly PersistentComponentState persistentComponentState;
    private readonly PersistingComponentStateSubscription subscription;
    private Task<AuthenticationState>? authenticationStateTask;

    public PersistingAuthenticationStateProvider(PersistentComponentState state)
    {
        persistentComponentState = state;
        subscription = state.RegisterOnPersisting(OnPersistingAsync, RenderMode.InteractiveWebAssembly);
    }

    public override Task<AuthenticationState> GetAuthenticationStateAsync() => authenticationStateTask ??
            throw new InvalidOperationException($"Do not call {nameof(GetAuthenticationStateAsync)} outside of the DI scope for a Razor component.");

    public void SetAuthenticationState(Task<AuthenticationState> task)
    {
        authenticationStateTask = task;
    }

    private async Task OnPersistingAsync()
    {
        var authenticationState = await GetAuthenticationStateAsync();
        var principal = authenticationState.User;

        if (principal.Identity?.IsAuthenticated == true)
        {
            persistentComponentState.PersistAsJson(nameof(UserInfo), UserInfo.FromClaimsPrincipal(principal));
        }
    }

    public void Dispose()
    {
        subscription.Dispose();
    }
}
```

## Login and Logout Route Builder

The Login and Logout route builder adds the `/login` and `/logout` routes to the specified endpoint builder.

- **/login**: Configured as a GET endpoint that triggers an authentication challenge using the OIDC scheme.
- **/logout**: Configured as a POST endpoint that signs the user out of both the cookie and OIDC schemes.

```csharp
@using Microsoft.AspNetCore.Authentication;
@using Microsoft.AspNetCore.Authentication.Cookies;
@using Microsoft.AspNetCore.Authentication.OpenIdConnect;
@using Microsoft.AspNetCore.Mvc;

namespace Microsoft.AspNetCore.Routing;

internal static class LoginLogoutEndpointRouteBuilderExtensions
{
internal static IEndpointConventionBuilder MapLoginAndLogout(this IEndpointRouteBuilder endpoints)
{
var group = endpoints.MapGroup("");

        group.MapGet("/login", (string? returnUrl) => TypedResults.Challenge(GetAuthProperties(returnUrl)))
            .AllowAnonymous();

        group.MapPost("/logout", ([FromForm] string? returnUrl) => TypedResults.SignOut(GetAuthProperties(returnUrl),
            [CookieAuthenticationDefaults.AuthenticationScheme, "MicrosoftOidc"]));

        return group;
    }

    private static AuthenticationProperties GetAuthProperties(string? returnUrl)
    {
        const string pathBase = "/";

        if (string.IsNullOrEmpty(returnUrl))
        {
            returnUrl = pathBase;
        }
        else if (!Uri.IsWellFormedUriString(returnUrl, UriKind.Relative))
        {
            returnUrl = new Uri(returnUrl, UriKind.Absolute).PathAndQuery;
        }
        else if (returnUrl[0] != '/')
        {
            returnUrl = $"{pathBase}{returnUrl}";
        }

        return new AuthenticationProperties { RedirectUri = returnUrl };
    }
}
```

## UserInfo Class

The `UserInfo` class represents information about an authenticated user and provides methods to map between a `ClaimsPrincipal` and this strongly typed representation. It serves as a way to expose more structured and manageable user information in an ASP.NET Core application.

The class encapsulates key user attributes such as:

- **UserId**
- **Name**
- **UserName**

These attributes are derived from claims associated with the authenticated user's `ClaimsPrincipal`.

> **Note:** You need to ensure that additional attributes such as `UserName` are configured as “Requested” in the **Attributes** tab of the application created in **Asgardeo**.

```csharp
@using System.Security.Claims;

namespace AsgardeoDotNetSample;

public sealed class UserInfo
{
    public required string UserId { get; init; }
    public required string Name { get; init; }

    public required string UserName { get; init; }

    public const string UserIdClaimType = "sub";
    public const string NameClaimType = "name";

    public const string UserNameClaimType = "username";

    public static UserInfo FromClaimsPrincipal(ClaimsPrincipal principal) =>
        new()
        {
            UserId = GetRequiredClaim(principal, UserIdClaimType),
            Name = GetRequiredClaim(principal, NameClaimType),
            UserName = GetRequiredClaim(principal, UserNameClaimType),
        };

    public ClaimsPrincipal ToClaimsPrincipal() =>
        new(new ClaimsIdentity(
            [new(UserIdClaimType, UserId), new(NameClaimType, Name), new(UserNameClaimType, UserName)],
            authenticationType: nameof(UserInfo),
            nameType: NameClaimType,
            roleType: null));

    private static string GetRequiredClaim(ClaimsPrincipal principal, string claimType) =>
        principal.FindFirst(claimType)?.Value ?? throw new InvalidOperationException($"Could not find required '{claimType}' claim.");
}
```

## Home Page Setup

The classes implemented up to now lay the foundation for the home page where we will be adding the login and logout buttons.

Navigate to the `Home.razor` file under the `/Components/Pages` directory and add the following code, including the imports.

```csharp
@implements IDisposable
@inject NavigationManager Navigation

@code {
private string? currentUrl;

    protected override void OnInitialized()
    {
        currentUrl = Navigation.Uri;
        Navigation.LocationChanged += OnLocationChanged;
    }

    private void OnLocationChanged(object? sender, LocationChangedEventArgs e)
    {
        currentUrl = Navigation.Uri;
        StateHasChanged();
    }

    public void Dispose() => Navigation.LocationChanged -= OnLocationChanged;
}
```

The above code implements the `IDisposable` interface to manage lifecycle events related to navigation changes within the Blazor application.

The current URL (`currentUrl`) is tracked by subscribing to the `LocationChanged` event from `NavigationManager`. When the URL changes, it updates `currentUrl` and triggers a re-render using `StateHasChanged()`, while the `Dispose` method unsubscribes from `LocationChanged`.

## Conditional Rendering of Login/Logout Buttons

The login and logout buttons can now be added above the code that was previously added.

```html
<div class="nav-item px-3">
    <AuthorizeView>
        <Authorized>
            <form action="authentication/logout" method="post">
                <AntiforgeryToken />
                <input type="hidden" name="ReturnUrl" value="@currentUrl" />
                <button type="submit" class="btn btn-primary">
                    <span class="bi bi-arrow-bar-left-nav-menu" aria-hidden="true"></span> Logout
                </button>
            </form>
        </Authorized>
        <NotAuthorized>
            <button type="submit" class="btn btn-primary" onclick="window.location.href='/authentication/login';">
                <span class="bi bi-person-badge-nav-menu" aria-hidden="true"></span> Login
            </button>
        </NotAuthorized>
    </AuthorizeView>
</div>
```

The above code conditionally renders a **Logout** or **Login** button based on whether the user is authorized (i.e., logged in) or not authorized (i.e., logged out).

- The **logout** button contains a form that submits a POST request to the `/authentication/logout` endpoint.
- The **login** button redirects the user to the `/authentication/login` page when clicked.

This code block uses the `AuthorizeView` component, which is part of Blazor's built-in authorization features.

## Configure Authentication in Program.cs

Once this is done, we can configure the `Program.cs` file to enable the authentication functionality.

Since we will be adding OpenID Connect to the `AuthenticationBuilder` using the `AddOpenIdConnect` method, make sure the following package is installed in the project directory based on the version of .NET you are using (in this case, it is 8.0):

```bash
dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect --version 8.0.0
```

Then add the following code, which will create a new instance of an `HttpClient`, which we will be using to retrieve the `JsonWebKeySet` from Asgardeo.

```csharp
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
```

The below `FetchJwks` method will perform the invocation of the endpoint passed as a parameter in order to parse the `JsonWebKeySet`.

```csharp
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
```

We can now register the services required for the authentication services as given below.

```csharp
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
    })
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme);
```

The environment variables that were added in a prior step are utilized to create a new configuration for the relevant endpoints and also configure the client ID and secret of the application created in Asgardeo.

> **Note:** For the purpose of this guide, the `SaveTokens` property is set to `true`, so the application will store the access token, refresh token, and ID token in the authentication properties and simplify the token persistence.

The following `WebApplicationBuilder` services need to be configured in order to enable authorization and also add the custom `AuthenticationStateProvider` class previously created as a scoped service:

```csharp
builder.Services.AddAuthorization();
builder.Services.AddCascadingAuthenticationState();
builder.Services.AddScoped<AuthenticationStateProvider, PersistingAuthenticationStateProvider>();
builder.Services.AddHttpContextAccessor();
```

In the next steps we will implement retrieving the user details and set up the routes including for the login and logout functionality.
