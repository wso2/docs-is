# Angular Quickstart

Welcome to the Angular Quickstart guide! In this document, you will learn to build an Angualr app, add user login and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application.**
- Select **Single Page Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    **name:** {{ product }}-angular
    
    **Authorized redirect URL:** http://localhost:4200

Note down the following values from the **Protocol** and the **Info** tabs of the registered application. You will need them to configure the SDK.

- **`client-id`** from the **Protocol** tab. 
- **`issuer`** from the **Info** tab. 

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use`http://localhost:4200`, as the sample app will be accessible at this URL.

## Create an Angular app 

Create an Angular app using Angular CLI.

``` bash
ng new {{ product }}-angular
```

!!! tip "Tip"
    To run the command above, you need to have Angular CLI installed. You can install it using the following command.
    
    === "npm"

        ``` bash
        npm install -g @angular/cli@17
        ```
    === "yarn"

        ``` bash
        yarn global add @angular/cli@17
        ```

    === "pnpm"

        ``` bash
        pnpm add -g @angular/cli@17 
        ```

## Install angular-oauth2-oidc

The [Angular OAuth2 OIDC SDK](https://www.npmjs.com/package/angular-oauth2-oidc){:target="_blank"} is a production-ready OIDC SDK that simplifies integrating {{product_name}} into your Angular applications. To get started, simply add the Angular OAuth2 OIDC SDK to the project. Make sure to stop the dev server started in the previous step. 

=== "npm"

    ``` bash
    npm install angular-oauth2-oidc
    ```

=== "yarn"

    ``` bash
    yarn add angular-oauth2-oidc
    ```

=== "pnpm"

    ``` bash
    pnpm add angular-oauth2-oidc
    ```

## Configure `AuthConfig` in your app

The `AuthConfig` object holds the configuration necessary for connecting your app to {{product_name}}. 

Replace the content of `app.config.ts` file with the following code. 

!!! Important

    Make sure to replace the placeholders in the following code with the **`client-id`** and **`issuer`** values you copied in **Step-1** during the application registration in the {{product_name}} console. 

    - `<your-app-client-id>`
    - `<your-app-issuer-url>`

```javascript title="app.config.ts"

import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient, OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { routes } from './app.routes';

export const authConfig: AuthConfig = {
  issuer: '<your-app-issuer-url>',
  redirectUri: 'http://localhost:4200',
  clientId: '<your-app-client-id>',
  responseType: 'code',
  scope: 'openid profile email internal_login',
  strictDiscoveryDocumentValidation: false,
};

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => { });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideOAuthClient(),
  {
    provide: APP_INITIALIZER,
    useFactory: initializeOAuth,
    deps: [OAuthService],
    multi: true
  }
  ]
};

```

!!! Important

    **Make sure to add `strictDiscoveryDocumentValidation: false` parameter.**
    The configuration parameter `strictDiscoveryDocumentValidation` is set to `true` by default. This ensures that all endpoints provided in the Identity Provider discovery document share the same base URL as the issuer parameter. However, several Identity Providers, including {{ product_name }}, may use different domains or path parameters for various endpoints in the discovery document. While these providers may still comply with the OpenID Connect Provider Configuration specification, they will fail this library's discovery document validation. To resolve this, you need to set `strictDiscoveryDocumentValidation` to `false`.

## Add login and logout link to your app

Angular uses services to access authentication data, and you can inject the `OAuthService` into your components to manage user authentication.

The `OAuthService` provides methods for logging in and out, checking the authentication status, and retrieving access tokens. 

Replace the existing content of the `app.component.ts` file with following content.

```javascript title="app.component.ts"  hl_lines="16-28"

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = '{{ product }}-angular';
  isAuthorized = this.oAuthService.hasValidAccessToken();

  constructor(private oAuthService: OAuthService) {

  }

  login() {
    this.oAuthService.initLoginFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
  }
}

```

Next, replace the existing content of the `app.component.html` file with following content to add login and logout URLs.  

```html title="app.component.html" 

<button *ngIf="!isAuthorized" (click)="login()">Login</button>

<button *ngIf="isAuthorized" (click)="logout()">Logout</button>

```

Visit your app's homepage at [http://localhost:4200](http://localhost:4200).

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features.

## Display logged in user details

Modified the code as below to see logged in user details.


Add the `username()` function to the `app.component.ts` file to access the username attribute. 

```javascript title="app.component.ts" hl_lines="3-6"


  get username() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['username'];
  }


```

Modify the `app.component.html` file with the following code. 

```html title="app.component.html" hl_lines="2"

<button *ngIf="!isAuthorized" (click)="login()">Login</button>
<h1 *ngIf="username">Hello {{ username }}!</h1>
<button *ngIf="isAuthorized" (click)="logout()">Logout</button>

```

[//] STEPS_END
