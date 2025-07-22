Use the `SignUp` component to add a flexible, styled registration flow for browser-based Next.js applications with Asgardeo authentication. The component manages the entire sign-up process, including API calls, error handling, and redirection. Customize it for your application's needs.

## Overview

The `SignUp` component initiates and manages the sign-up flow when rendered. It automatically handles loading state, error handling, and supports custom UI via props. You can customize its behavior and appearance using props such as `variant`, `size`, and callbacks for success, error, and completion handling.

## Usage

You can use the `SignUp` component as a drop-in registration form in your Next.js app.

### Basic Usage

Use `SignUp` as a simple registration form to trigger sign-up.

```javascript title="SignUp Example"
import { SignUp } from '@asgardeo/nextjs'

<SignUp />
```

!!! info "Note"

    You can provide `onSuccess`, `onError`, and `onComplete` callbacks to handle registration results and redirection.  
    For advanced use, provide your own `onInitialize` and `onSubmit` handlers to integrate with custom API endpoints or flows.

## Props

The `SignUp` component accepts all props from `BaseSignUp`, plus:

<!-- markdownlint-disable MD056 -->
| Prop               | Type                                   | Required | Description                                                      |
|--------------------|----------------------------------------|----------|------------------------------------------------------------------|
| `className`        | `string`                               | ❌       | Custom CSS class for the root element                            |
| `onSuccess`        | `(response: Record<string, any>) => void` | ❌       | Callback invoked with registration data on successful sign-up     |
| `onError`          | `(error: any) => void`                 | ❌       | Callback invoked with an error if registration fails              |
| `onComplete`       | `(redirectUrl: string) => void`        | ❌       | Callback invoked when sign-up completes and needs redirection     |
| `variant`          | `'outlined' \| 'solid'`                | ❌       | Card style variant for the UI                                    |
| `size`             | `'small' \| 'medium' \| 'large'`       | ❌       | Size of the sign-up card and controls                            |
| `onInitialize`     | `(payload?) => Promise<any>`           | ❌       | Custom function to initialize the registration flow               |
| `onSubmit`         | `(payload) => Promise<any>`            | ❌       | Custom function to handle registration steps                      |
| `afterSignUpUrl`   | `string`                               | ❌       | URL to redirect to after successful sign-up                      |
| `shouldRedirectAfterSignUp` | `boolean`                     | ❌       | Whether to redirect after sign-up (default: `true`)              |
<!-- markdownlint-enable MD056 -->

You can provide all other props to the underlying `BaseSignUp` component for further customization.

## Customization

The `SignUp` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<SignUp className="my-signup-card" variant="solid" size="large" />
```

#### Default CSS Classes

The component includes a default vendor-prefixed class for targeting:

- `.asgardeo-sign-up` – Main sign-up card element

### CSS Custom Properties (CSS Variables)

You can theme the sign-up card and other SDK components using CSS variables:

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

If your `BaseSignUp` or theme supports i18n, you can override text and translations via props or context.

{% raw %}

```javascript
<SignUp
  i18n={{
    language: 'fr-FR',
    fallbackLanguage: 'en-US',
    bundles: {
      'fr-FR': {
        translations: {
          'elements.buttons.signUp': 'Inscription personnalisée'
        }
      }
    }
  }}
/>
```

{% endraw %}

### Handling Success, Errors & Completion

Provide `onSuccess`, `onError`, and `onComplete` callbacks to handle registration results and redirection:

```javascript
<SignUp
  onSuccess={(response) => {
    // Handle successful sign-up (e.g., show confirmation)
  }}
  onError={(error) => {
    // Show custom error UI
  }}
  onComplete={(redirectUrl) => {
    // Redirect after sign-up (e.g., router.push(redirectUrl))
  }}
/>
```

## Error Handling

If sign-up fails, the `onError` callback is invoked with a descriptive error object.

## Notes

- Automatically disables the UI and shows loading state during sign-up.
- Handles all registration steps, including social sign-up and federated flows, with minimal configuration.
- Requires an Asgardeo context provider (`useAsgardeo`) to function.
