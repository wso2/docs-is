The `SignInButton` component provides a flexible sign-in button for browser-based Next.js applications using Asgardeo authentication. It supports both render props and traditional children, and can be customized with preferences such as internationalization (i18n).

## Overview

The `SignInButton` component initiates the sign-in flow when clicked. It automatically handles loading state, error handling, and supports custom UI via render props or direct children. You can customize its behavior and appearance using the `preferences` prop, including i18n overrides.

## Usage

You can use the `SignInButton` in two main ways: as a simple button or with render props for more control over the UI and behavior.

### Basic Usage

Use `SignInButton` as a simple button to trigger sign-in.

```javascript title="SignInButton Example"
import { SignInButton } from '@asgardeo/nextjs'

<SignInButton>Sign In</SignInButton>
```

!!! info "Note"

    You can simply use the `SignInButton` component without any children `<SignInButton />` to render a default button with the text "Sign In".

## Props

The `SignInButton` component accepts all props from `BaseSignInButton`, plus:

| Prop         | Type                         | Required | Description |
|--------------|-----------------------------|----------|-------------|
| `children`   | `ReactNode` or `function`    | ❌       | Render prop function or ReactNode for button content |
| `preferences`| `Preferences`                | ❌       | Customization options for i18n, theming, etc. |
| `onClick`    | `function`                   | ❌       | Callback after sign-in is triggered |

??? info "Preferences"

    The `preferences` prop allows you to customize UI and internationalization.

    ??? info "Internationalization Preferences (`preferences.i18n`)"

        | Property         | Type     | Default     | Description |
        |------------------|----------|-------------|-------------|
        | `language`       | `string` | Browser default | Language code for UI text (e.g., `'en-US'`) |
        | `fallbackLanguage` | `string` | `'en-US'` | Fallback language when translations aren't available |
        | `bundles`        | `object` | `{}`        | Custom translation bundles to override default text |

## Customization

The `SignInButton` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<SignInButton className="btn btn-primary">
  Sign In
</SignInButton>
```

#### Default CSS Classes

The button includes a default vendor-prefixed class for targeting:

- `.asgardeo-sign-in-button` – Main sign-in button element

### CSS Custom Properties (CSS Variables)

You can theme the button and other SDK components using CSS variables:

```css
:root {
  --asgardeo-primary-color: #007bff;
  --asgardeo-primary-hover: #0056b3;
  --asgardeo-border-radius: 8px;
  --asgardeo-font-family: 'Inter', sans-serif;
  --asgardeo-button-padding: 12px 24px;
}
```

### Internationalization (i18n)

Override button text and translations using the `preferences` prop:

{% raw %}

```javascript
<SignInButton
  preferences={{
    i18n: {
      language: 'fr-FR',
      fallbackLanguage: 'en-US',
      bundles: {
        'fr-FR': {
          translations: {
            'elements.buttons.signIn': 'Connexion personnalisée'
          }
        }
      }
    }
  }}
>
  Connexion personnalisée
</SignInButton>
```

{% endraw %}

### Render Props for Custom UI

You can customize the button UI and behavior using render props. This allows you to access the `signIn` function and loading state directly giving you the flexibility to use any library like `Tailwind CSS`, `Shadcn UI`, `Material-UI`, etc.

{% raw %}

```javascript
<SignInButton>
  {({ signIn, isLoading }) => (
    <button
      onClick={signIn}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M16 17l5-5m0 0l-5-5m5 5H9" />
        <path d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {isLoading ? 'Signing in...' : 'Sign In'}
    </button>
  )}
</SignInButton>
```

{% endraw %}

## Error Handling

If sign-in fails, an `AsgardeoRuntimeError` is thrown with a descriptive message.

## Notes

- Automatically disables the button and shows loading state during sign-in.
- Supports both render props and traditional children for maximum flexibility.
