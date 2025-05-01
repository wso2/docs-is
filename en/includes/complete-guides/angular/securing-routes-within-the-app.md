

In an Angular application, routes define the paths that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application. In this section, we will explore how to secure routes using the angular-oauth2-oidc library.

In Angular, route guards are used to control access to certain routes. You can implement a route guard that checks whether a user is authenticated before allowing access to specific routes.

#### Step 1: Create an Auth Guard

Create an Auth Guard using Angular CLI:

```bash
ng generate guard auth
```

The above command generates an `auth.guard.ts` file, and update this file with the following content.  

```javascript title="auth.guard.ts" 
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {

  const oAuthService = inject(OAuthService);
  const router = inject(Router);

  if (oAuthService.hasValidAccessToken()) {
    return true;
  } else {
    // Redirect to login if not authenticated
    router.navigate(['/login']);
    return false;
  }
};

```



#### Step 2: Define Routes

Next, define your routes in `app-routing.module.ts` and apply the AuthGuard to secure specific routes. 

```javascript title="app-routing.module.ts" 

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' } // Redirect any unknown paths to home
];


```

The above route definition assumes that you have created components in your application such as `dashboard`. You can create new components a using Angular CLI. The following example code shows how you can create a components called `dashboard`. 

```bash
ng generate component dashboard
```

The `AuthGuard` checks if the user has a valid access token. If not, it redirects the user to the login page. You can customize the logic inside the canActivate method to include additional checks or redirect logic as necessary.



