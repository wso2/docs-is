

At this point, we’ve successfully implemented login and logout capabilities by integrating your Angular app with {{product_name}}. The next step is to access and display the logged-in user details within the application. The SDK provides a way to retrieve the authenticated user’s basic information.

To do this, you can leverage the `getIdentityClaims` method to fetch the user’s profile information. The following code example demonstrates how to access and display the user's profile information in your Angular component. 

Add the `username()` function to the `app.component.ts` file to access the username attribute. 

```javascript title="app.component.ts"


  get username() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['username'];
  }


```


Next, modify the `app.component.html` file with the following code. 

```html title="app.component.html" hl_lines="2"

<button *ngIf="!isAuthorized" (click)="login()">Login</button>
<h1 *ngIf="username">Hello {{ username }}!</h1>
<button *ngIf="isAuthorized" (click)="logout()">Logout</button>

```


## Getting additional user attributes

In the above code, we have rendered only the username of the logged-in user. Similarly, you can access other user attributes, such as given_name and and country. The following code snippet illustrates how to access these attributes in your app. The Angular OAuth2 OIDC SDK is responsible for processing the ID token and decoding these attributes. 

1. Log in to the {{product_name}} console and select the application you created.
2. Go to the **User Attributes** tab.
3. Select the **given_name** attribute.
4. Click Update to save the changes.

Add the `username()` function to the `app.component.ts` file to access the username attribute. 

```javascript title="app.component.ts" hl_lines="7-11" 
  get username() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['username'];
  }

  get givenName() {
  var claims = this.oAuthService.getIdentityClaims();
  if (!claims) return null;
  return claims['given_name'];
  }

```


Now, we can display the given_name attribute by modify the `app.component.html` file with the following code. 

```html title="app.component.html" hl_lines="3"

<button *ngIf="!isAuthorized" (click)="login()">Login</button>
<h1 *ngIf="username">Hello {{ username }}!</h1>
<h1 *ngIf="givenName">Your given name :  {{ givenName }}!</h1>
<button *ngIf="isAuthorized" (click)="logout()">Logout</button>

```


In this step, we further improved our Angular app to display the user attributes. As the next step, we will try to secure routes within the app.
