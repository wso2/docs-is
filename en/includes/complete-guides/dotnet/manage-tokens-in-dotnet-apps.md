

In a .NET Blazor Web Application, managing access tokens is critical for maintaining secure and seamless user sessions. There are several strategies to manage tokens in a Blazor app, each serving different purposes depending on whether you are building a client-side Blazor WebAssembly app or a Blazor Server app.

Overall, managing tokens in a .NET Blazor web app is essential for handling user authentication, session management, and securing API calls.

For the purpose of this guide and to keep the token management process as simple as possible, we have utilized `SaveTokens = true` when passing the options parameter into the `AddOpenIdConnect` method in the `Program.cs` file.

Setting the `SaveTokens` property to `true` stores the tokens in a cookie alongside the user's claims (e.g., `AuthenticationProperties`). Although this cookie may be stored in the browser, it is protected so that only the application can read it. Client-side code or the browser itself cannot access the cookie's contents.
