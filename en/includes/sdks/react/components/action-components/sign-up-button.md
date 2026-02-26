The `SignUpButton` component provides a flexible sign-up button for browser-based React applications using Asgardeo authentication. It supports both render props and traditional children, and can be customized with preferences such as internationalization (i18n).

## Overview

The `SignUpButton` component initiates the sign-up flow when clicked. It automatically handles loading state, error handling, and supports custom UI via render props or direct children. You can customize its behavior and appearance using the `preferences` prop, including i18n overrides.

## Usage

You can use the `SignUpButton` in two main ways: as a simple button or with render props for more control over the UI and behavior.

### Basic Usage

Use `SignUpButton` as a simple button to trigger sign-up.

```javascript title="SignUpButton Example"
import { SignUpButton } from '@asgardeo/react'

<SignUpButton>Create Account</SignUpButton>
```

!!! info "Note"

    You can simply use the `SignUpButton` component without any children `<SignUpButton />` to render a default button with the text "Create Account".

## Props

The `SignUpButton` component accepts all props from `BaseSignUpButton`, plus:

| Prop         | Type                         | Required | Description |
|--------------|-----------------------------|----------|-------------|
| `children`   | `ReactNode` or `function`    | ❌       | Render prop function or ReactNode for button content |
| `preferences`| `Preferences`                | ❌       | Customization options for i18n, theming, etc. |
| `onClick`    | `function`                   | ❌       | Callback after sign-up is triggered |

??? info "Preferences"

    The `preferences` prop allows you to customize UI and internationalization.

    ??? info "Internationalization Preferences (`preferences.i18n`)"

        | Property         | Type     | Default     | Description |
        |------------------|----------|-------------|-------------|
        | `language`       | `string` | Browser default | Language code for UI text (e.g., `'en-US'`) |
        | `fallbackLanguage` | `string` | `'en-US'` | Fallback language when translations aren't available |
        | `bundles`        | `object` | `{}`        | Custom translation bundles to override default text |

## Customization

The `SignUpButton` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<SignUpButton className="btn btn-success">
  Create Account
</SignUpButton>
```

#### Default CSS Classes

The button includes a default vendor-prefixed class for targeting:

- `.asgardeo-sign-up-button` – Main sign-up button element

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
<SignUpButton
  preferences={{
    i18n: {
      language: 'fr-FR',
      fallbackLanguage: 'en-US',
      bundles: {
        'fr-FR': {
          translations: {
            'elements.buttons.signUp': 'Créer un compte personnalisé'
          }
        }
      }
    }
  }}
>
  Créer un compte personnalisé
</SignUpButton>
```

{% endraw %}

### Render Props for Custom UI

You can customize the button UI and behavior using render props. This allows you to access the `signUp` function and loading state directly, giving you the flexibility to use any library like `Tailwind CSS`, `Shadcn UI`, `Material-UI`, etc.

{% raw %}

```javascript
<SignUpButton>
  {({ signUp, isLoading }) => (
    <button
      onClick={signUp}
      disabled={isLoading}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M12 4v16m8-8H4" />
      </svg>
      {isLoading ? 'Creating Account...' : 'Create Account'}
    </button>
  )}
</SignUpButton>
```

{% endraw %}

## Error Handling

If sign-up fails, an `AsgardeoRuntimeError` is thrown with a descriptive message.

## Notes

- Automatically disables the button and shows loading state during sign-up.
- Supports both render props and traditional children for maximum flexibility.
