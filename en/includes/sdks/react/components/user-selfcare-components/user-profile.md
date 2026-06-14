The `UserProfile` component displays the authenticated user's profile information in a structured and styled format. It automatically retrieves user data from the WSO2 Identity Platform authentication context if not provided, and supports profile editing with error handling.

## Overview

The `UserProfile` component shows user details such as display name, email, username, and other available profile information from WSO2 Identity Platform. It supports both read-only and editable modes, and can be shown as a card, popup, or inline. Profile updates are handled with built-in error feedback.

## Usage

You can use the `UserProfile` in several ways: with default behavior, explicit user data, or custom layout and fallback.

### Basic Usage

Show the current user's profile using data from WSO2 Identity Platform context.

```javascript title="UserProfile Example"
import { UserProfile } from '@asgardeo/react'

<UserProfile />
```

### With Explicit User Data

Provide a specific user object to display:

```javascript title="Explicit User"
<UserProfile user={specificUser} />
```

### With Card Layout and Custom Fallback

Display the profile in a card layout and show fallback content if not signed in:

```javascript title="Card Layout & Fallback"
<UserProfile
  cardLayout={true}
  fallback={<div>Please sign in to view your profile</div>}
/>
```

### In Popup Mode

Show the profile as a popup dialog:

```javascript title="Popup Mode"
<UserProfile mode="popup" open={isOpen} onOpenChange={setIsOpen} />
```

## Props

<!-- markdownlint-disable MD056 -->
| Prop             | Type        | Required | Description                                         |
|------------------|-------------|----------|-----------------------------------------------------|
| `user`           | `any`       | ❌       | User object to display (defaults to WSO2 Identity Platform user)  |
| `cardLayout`     | `boolean`   | ❌       | Show profile in a card layout                       |
| `fallback`       | `ReactNode` | ❌       | Content to show when no user is signed in           |
| `mode`           | `'inline' | 'popup'` | ❌ | Display mode for the profile (inline or popup)      |
| `open`           | `boolean`   | ❌       | Whether the popup is open (for `mode="popup"`)      |
| `onOpenChange`   | `(open: boolean) => void` | ❌ | Callback when popup open state changes              |
| `onUpdate`       | `(payload: any) => Promise<void>` | ❌ | Callback after profile update                       |
| `attributeMapping` | `object`  | ❌       | Map custom profile fields (e.g. firstName, picture) |
| `editable`       | `boolean`   | ❌       | Allow editing profile fields                        |
| `title`          | `string`    | ❌       | Custom profile title                                |
| `error`          | `string`    | ❌       | Error message to display                            |
<!-- markdownlint-enable MD056 -->

## Customization

The `UserProfile` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<UserProfile className="user-card shadow-lg" />
```

#### Default CSS Classes

The profile includes vendor-prefixed classes for targeting:

- `.asgardeo-user-profile` – Profile container
- `.asgardeo-user-profile__alert` – Error alert
- `.asgardeo-user-profile__header` – Avatar and header
- `.asgardeo-user-profile__info` – Info row
- `.asgardeo-user-profile__field` – Field row
- `.asgardeo-user-profile__label` – Field label
- `.asgardeo-user-profile__value` – Field value

### CSS Custom Properties (CSS Variables)

You can theme the profile and other SDK components using CSS variables:

```css
:root {
  --asgardeo-primary-color: #007bff;
  --asgardeo-primary-hover: #0056b3;
  --asgardeo-border-radius: 8px;
  --asgardeo-font-family: 'Inter', sans-serif;
  --asgardeo-button-padding: 12px 24px;
}
```

### Attribute Mapping

Customize which user profile fields are used for display:

{% raw %}

```javascript
<UserProfile
  attributeMapping={{
    firstName: ['customFirstName'],
    lastName: ['customLastName'],
    picture: ['customPictureUrl'],
    username: ['customUsername']
  }}
/>
```

{% endraw %}

## Profile Editing & Error Handling

- Supports editing profile fields if allowed (`editable={true}`).
- Errors during profile update are shown using built-in error feedback.
- Error messages are localized using i18n.

## Notes

- Automatically retrieves user data from WSO2 Identity Platform context if not provided.
- Supports both read-only and editable modes.
- Can be used inline, as a card, or as a popup dialog.
