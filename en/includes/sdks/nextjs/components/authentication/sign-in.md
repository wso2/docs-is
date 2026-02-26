Use the `SignIn` component to add a flexible, styled authentication flow for browser-based Next.js applications with Asgardeo authentication. The component manages the entire sign-in process, including API calls, error handling, and redirection. Customize it for your application's needs.

!!! info "Note"

    Underneath, the component uses the [App-native Authentication API]({{base_path}}/references/app-native-authentication/) to handle the sign-in flow, which includes support for passkeys and federated authentication.

## Overview

The `SignIn` component initiates and manages the sign-in flow when rendered. It automatically handles loading state, error handling, and supports custom UI via props. You can customize its behavior and appearance using props such as `variant`, `size`, and callbacks for success and error handling.

## Usage

You can use the `SignIn` component as a drop-in authentication form in your Next.js app.

### Basic Usage

Use `SignIn` as a simple authentication form to trigger sign-in.

```javascript title="SignIn Example"
import { SignIn } from '@asgardeo/nextjs'

<SignIn />
```

!!! info "Note"

    You can provide `onSuccess` and `onError` callbacks to handle authentication results.  
    For advanced use, provide your own `onInitialize` and `onSubmit` handlers to integrate with custom API endpoints or flows.

## Props

The `SignIn` component accepts all props from `BaseSignIn`, plus:

<!-- markdownlint-disable MD056 -->
| Prop             | Type                                   | Required | Description                                                      |
|------------------|----------------------------------------|----------|------------------------------------------------------------------|
| `className`      | `string`                               | ❌       | Custom CSS class for the root element                            |
| `onSuccess`      | `(authData: Record<string, any>) => void` | ❌       | Callback invoked with authentication data on successful sign-in   |
| `onError`        | `(error: any) => void`                 | ❌       | Callback invoked with an error if authentication fails            |
| `variant`        | `'outlined' \| 'solid'`                | ❌       | Card style variant for the UI                                    |
| `size`           | `'small' \| 'medium' \| 'large'`       | ❌       | Size of the sign-in card and controls                            |
| `onInitialize`   | `() => Promise<any>`                   | ❌       | Custom function to initialize the authentication flow             |
| `onSubmit`       | `(payload, request) => Promise<any>`   | ❌       | Custom function to handle authentication steps                    |
| `afterSignInUrl` | `string`                               | ❌       | URL to redirect to after successful sign-in                      |
<!-- markdownlint-enable MD056 -->

You can provide all other props to the underlying `BaseSignIn` component for further customization.

## Customization

The `SignIn` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<SignIn className="my-signin-card" variant="solid" size="large" />
```

#### Default CSS Classes

The component includes a default vendor-prefixed class for targeting:

- `.asgardeo-sign-in`–Main sign-in card element

### CSS Custom Properties (CSS Variables)

You can theme the sign-in card and other SDK components using CSS variables:

```css
:root {
  --asgardeo-primary-color: #007bff;
  --asgardeo-primary-hover: #0056b3;
  --asgardeo-border-radius: 8px;
  --asgardeo-font-family: 'Inter', sans-serif;
  --asgardeo-card-padding: 24px 32px;
}
```

### Internationalization (i18n)

If your `BaseSignIn` or theme supports i18n, you can override text and translations via props or context.

{% raw %}

```javascript
<SignIn
  i18n={{
    language: 'fr-FR',
    fallbackLanguage: 'en-US',
    bundles: {
      'fr-FR': {
        translations: {
          'signin.title': 'Se connecter'
        }
      }
    }
  }}
/>
```

{% endraw %}

### Handling Success & Errors

Provide `onSuccess` and `onError` callbacks to handle authentication results:

```javascript
<SignIn
  onSuccess={(authData) => {
    // Redirect, store tokens, etc.
  }}
  onError={(error) => {
    // Show custom error UI
  }}
/>
```

## Error Handling

If sign-in fails, the `onError` callback is invoked with a descriptive error object.

## Notes

- Automatically disables the UI and shows loading state during sign-in.
- Handles all authentication steps, including passkey and federated flows, with minimal configuration.
- Requires an Asgardeo context provider (`useAsgardeo`) to function.
