

We’ve covered most of the key activities for adding user login to your Angular app. To recap, during user login, the Angular OAuth2 OIDC SDK provides both an ID token and an access token. We’ve been using the ID token in the previous sections to establish the logged-in user context and enable secure access. In this section, we’ll focus on how to call a secure API from your Angular app using the other token—the access token.

For simplicity, let's assume that the APIs we’re calling are secured by the same Identity Provider (IdP) and use the same issuer. This is typical when Angular apps are interacting with internal APIs within the same organization. However, if your app needs to call APIs secured by a different IdP, you’ll need to exchange your current access token for a new one issued by the IdP securing those APIs. This can be done using the OAuth2 token exchange grant type or other supported grant types. We will cover these scenarios in a separate guide. 

## Using SDK Built-in HTTP client

You can utilize Angular's `HttpClient` to make HTTP requests to secure endpoints. You don't need to manually attach the access token to requests if you use the Angular OAuth2 OIDC SDK correctly, as it will handle that automatically.
The following is a simple example of how you might use the Angular OAuth2 OIDC SDK’s `HttpClient` to call a protected API endpoint, such as `/scim2/me` (to get the user profile details after signing in). In this case, the SCIM 2 endpoint is secured by the same Identity Provider (IdP) - {{product_name}}. {{product_name}} provides a SCIM 2 API for managing users within your organization. While user management with SCIM 2 is a topic for a different guide, we will use the API as part of our current guide.

### Step 1: Import Required Modules

Update the `app.config.ts` file as follows to configure the allowed URLs and include the access token in API requests. Ensure you refer to the domains of your API server under `allowedUrls` and set `sendAccessToken` to `true` so that the access token is included in the requests made to these endpoints:


```javascript title="src/main.jsx" hl_lines="5-11"
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({
      resourceServer: {
          allowedUrls: ['<base-url>'],
          sendAccessToken: true
      }
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService],
      multi: true
    }
  ]
};

```
!!! tip "Tip"

    You need to constrct the '<base-url>' value as per the followng instructions: 

    For Asgardeo: 

    `<base-url> = https://api.asgardeo.io/t/<your_Asgardeo_org_name>`

    For WSO2 Idenity Server: 

    `<base-url> =https://localhost:9443`


### Step 2: Make HTTP Requests

In your component, you can use Angular's `HttpClient` to call secure APIs. Here's how to do it:

```javascript title="src/main.jsx" hl_lines="16"

import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private http = inject(HttpClient);
  data: any;

  constructor() {
    this.http.get('<base-url>/scim2/Me')
      .subscribe(response => this.data = response);
  }
}


```

!!! tip "Tip"

    You need to constrct the '<base-url>' value as per the followng instructions: 

    For Asgardeo: 

    `<base-url> = https://api.asgardeo.io/t/<your_Asgardeo_org_name>`

    For WSO2 Idenity Server: 

    `<base-url> =https://localhost:9443`

In the above code, the access token is automatically attached to the `Authorization` header by the Angular OAuth2 OIDC SDK when you make requests to the specified allowed URLs.


## Manually Managing Access Tokens in API Requests

If you are not using the built-in access token management, you can manually fetch the access token and attach it to your requests. Here’s how to do that:


```javascript title="src/main.jsx"

import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private http = inject(HttpClient);
  data: any;

  constructor(private oAuthService : OAuthService) {
    const token = this.oAuthService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('<base-url>/scim2/Me', { headers })
      .subscribe(response => this.data = response);
  }
}



```
!!! tip "Tip"

    You need to constrct the '<base-url>' value as per the followng instructions: 

    For Asgardeo: 

    `<base-url> = https://api.asgardeo.io/t/<your_Asgardeo_org_name>`

    For WSO2 Idenity Server: 

    `<base-url> =https://localhost:9443`