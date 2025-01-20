---
template: templates/complete-guide.html
heading: Display logged-in user details
read_time: 5 min
---

## Displaying User Information

In this guide, we will display user information in two different places:

1. On the home page to greet the user.
2. To list down the user claims retrieved from the ID token.

### Displaying User Info on the Home Page

Let's first navigate to the `Home.razor` file under the `/Components/Pages` directory and add the following code including the imports inside the C# section (i.e., Razor syntax: `@code`).

```csharp title="Home.razor"
@using System.Security.Claims
@using Microsoft.AspNetCore.Authorization

private IEnumerable<Claim> claims = [];

[CascadingParameter]
private Task<AuthenticationState>? AuthState { get; set; }

protected override async Task OnInitializedAsync()
{
    if (AuthState == null)
    {
        return;
    }

    var authState = await AuthState;
    claims = authState.User.Claims;
}
```

This code retrieves the authentication state and obtains the user claims from it to display in the HTML section of the Razor file.

Next, add the following in the HTML section of the file. This will retrieve the user attribute “name” from the list of claims and display a greeting with the given details if the user is logged in.

```csharp title="Home.razor"
@if (claims.Any())
{
    @foreach (var claim in claims)
    {
        @if (claim.Type == "name") 
        {
            <h1>Welcome @claim.Value!</h1>
            <p>You can now access the Counter, Weather, and User Claims tab.</p>
        }
    }
}
```

It is also possible to retrieve properties such as the name of the user from the context. In this case, we will display the user's name in the logout button by adding `@context.User.Identity?.Name` to the logout button as highlighted below.

```html title="Home.razor" hl_lines="6"
<form action="authentication/logout" method="post">
    <AntiforgeryToken />
    <input type="hidden" name="ReturnUrl" value="@currentUrl" />
    <button type="submit" class="btn btn-primary">
        <span class="bi bi-arrow-bar-left-nav-menu" aria-hidden="true"></span> Logout
        @context.User.Identity?.Name
    </button>
</form>
```

### Listing User Claims

Next, create a new page named `UserClaims.razor` and add the following code to display the user claims.

```csharp title="UserClaims.razor"
@page "/user-claims"
@using System.Security.Claims
@using Microsoft.AspNetCore.Components.Authorization

<PageTitle>User Claims</PageTitle>

<h1>User Claims</h1>

@if (claims.Any())
{
    <ul>
        @foreach (var claim in claims)
        {
            <li><b>@claim.Type:</b> @claim.Value</li>
        }
    </ul>
}

@code {
    private IEnumerable<Claim> claims = [];

    [CascadingParameter]
    private Task<AuthenticationState>? AuthState { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (AuthState == null)
        {
            return;
        }

        var authState = await AuthState;
        claims = authState.User.Claims;
    }
}
```

The C# code block is similar to the one used in `Home.razor`. The HTML above will list all of the user’s claims retrieved from the ID token, looping through the list one by one.

In this step we have successfully displayed the logged-in user details on the home page and listed the user claims in a separate page. In the next steps we will secure routes within the app.
