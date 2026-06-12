## Internationalization (i18n)

Internationalization (i18n) is the process of designing your application to support multiple languages and regions. The Asgardeo SDKs provide built-in i18n support with English (US) included by default, helping you create multilingual authentication experiences for your users.

## Default Language Support

The Asgardeo SDKs come with **English (US)** translations built-in by default. You don't need to install any additional packages to use English translations in your application.

## Adding Additional Languages

If you need to support languages other than English, you can install the `@asgardeo/i18n` package which provides additional language packs:

=== "npm"

    ```bash
    npm install @asgardeo/i18n
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/i18n
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/i18n
    ```

## Supported Languages

The Asgardeo SDKs support multiple languages with different levels of availability:

| Language | Locale Code | Bundle Name | Availability |
|----------|-------------|-------------|--------------|
| English (United States) | `en-US` | `en_US` | Built-in (Default) |
| Français (France) | `fr-FR` | `fr_FR` | Via `@asgardeo/i18n` package |
| हिन्दी (भारत) | `hi-IN` | `hi_IN` | Via `@asgardeo/i18n` package |
| සිංහල (ශ්‍රී ලංකාව) | `si-LK` | `si_LK` | Via `@asgardeo/i18n` package |

More languages will be added in future releases based on community feedback and requirements.

## Configuration Options

The Asgardeo SDKs provide i18n configuration through the `I18nPreferences` interface. You can configure internationalization by setting the `i18n` property in your provider preferences.

### I18nPreferences Interface

The `I18nPreferences` interface supports the following options:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `language` | `string` | Browser default or `'en-US'` | The language locale code to use for translations |
| `fallbackLanguage` | `string` | `'en-US'` | The fallback language to use if translations are not available |
| `bundles` | `Record<string, I18nBundle>` | `{}` | Additional language bundles for non-English languages |

### Basic Configuration

English translations are included by default. For additional languages, you'll need to install the `@asgardeo/i18n` package and configure the language bundles.

For languages other than English, install the `@asgardeo/i18n` package and include the language bundles:

```javascript title="main.tsx"  hl_lines="6"
{% raw %}
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {AsgardeoProvider} from '@asgardeo/react';
import {fr_FR} from '@asgardeo/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AsgardeoProvider
      // ... other configuration
      preferences={{
        i18n: {
          language: 'fr-FR',
          fallbackLanguage: 'en-US',
          bundles: {
            'fr-FR': fr_FR,
          },
        },
      }}
    >
      <App />
    </AsgardeoProvider>
  </StrictMode>,
);
{% endraw %}
```

#### Supporting Multiple Languages

Configure multiple language bundles for dynamic language switching:

## Language Bundle Structure

Each language bundle contains metadata and translations:

### Bundle Metadata

| Property | Type | Description |
|----------|------|-------------|
| `localeCode` | `string` | Full locale code (e.g., `'en-US'`, `'hi-IN'`) |
| `countryCode` | `string` | Country code (e.g., `'US'`, `'IN'`) |
| `languageCode` | `string` | Language code (e.g., `'en'`, `'hi'`) |
| `displayName` | `string` | Human-readable language name |
| `direction` | `'ltr' \| 'rtl'` | Text direction for the language |

### Bundle Translations

The translation bundle contains keys for various UI elements including:

- Authentication buttons (Sign In, Sign Out, Sign Up)
- Social login buttons (Google, Facebook, GitHub, etc.)
- Form field placeholders and labels
- Error messages and validation text
- Loading states and status messages

## Custom Translations

You can extend or override the default translations by providing custom bundles in the `I18nPreferences` configuration.

### Overriding Default Translations

```javascript title="main.tsx"  hl_lines="16-28"
{% raw %}
<AsgardeoProvider
  preferences={{
    i18n: {
      language: 'en-US',
      bundles: {
        'en-US': {
          metadata: {
            localeCode: 'en-US',
            displayName: 'English (US)',
            direction: 'ltr',
            // ... other metadata
          },
          translations: {
            'signin.title': 'Please Sign In', // Override default
            'elements.buttons.signIn': 'Log In', // Custom button text
            // ... other custom translations
          }
        }
      },
    },
  }}
>
  <App />
</AsgardeoProvider>
{% endraw %}
```

### Adding Custom Translation Keys

You can add your own translation keys alongside the built-in ones:

```javascript
{% raw %}
<AsgardeoProvider
  preferences={{
    i18n: {
      bundles: {
        'en-US': {
          translations: {
            'custom.welcome': 'Welcome to Our App',
            'custom.logout': 'Sign Out',
            // ... your custom keys
          }
        }
      },
    },
  }}
>
  <App />
</AsgardeoProvider>
{% endraw %}
```

## Right-to-Left (RTL) Support

The Asgardeo SDKs automatically handle text direction based on the language bundle metadata. Each language bundle includes a `direction` property that indicates whether the language should be displayed left-to-right (`'ltr'`) or right-to-left (`'rtl'`).

Currently supported languages:

- English (US): `ltr`
- Hindi (India): `ltr`

For languages that require RTL support, the bundle metadata will include `direction: 'rtl'`, and the SDK components will automatically adjust their layout accordingly.

## Best Practices

1. **Start with English**: Use the built-in English support during development and testing, then add additional languages as needed.

2. **Install i18n package only when needed**: Only install `@asgardeo/i18n` if you need languages other than English to keep bundle size minimal.

3. **Configure fallback language**: Always set a `fallbackLanguage` in your `I18nPreferences` to handle missing translations gracefully.

4. **Test with different languages**: Test your UI with different languages to ensure proper layout and text overflow handling.

5. **Consider text expansion**: Some languages require more space than others. Design your UI to accommodate text expansion.

6. **Use appropriate locale codes**: Always use the correct locale codes from the supported languages table to ensure proper language loading.

## Troubleshooting

Here are common issues you might encounter and their solutions:

### Language not loading

If a language is not loading correctly, verify:

- The locale code matches the supported languages table
- The language bundle is properly imported and configured in `I18nPreferences`
- The `@asgardeo/i18n` package is installed for non-English languages

### Fallback language not working

Ensure the `fallbackLanguage` is properly set in your `I18nPreferences`:

```javascript
{% raw %}
preferences: {
  i18n: {
    language: 'hi-IN',
    fallbackLanguage: 'en-US', // This should always be set
    bundles: {
      'hi-IN': hi_IN_bundle
    }
  }
}
{% endraw %}
```

### Layout issues with different languages

- Ensure your CSS can handle text expansion
- Test with longer translations
- Use flexible layouts that adapt to content length
- Consider the text direction (`ltr` vs `rtl`) for your target languages

!!! tip "Tip"
    The Asgardeo i18n package is continuously evolving. Check the package documentation and release notes for updates on new languages and features.
