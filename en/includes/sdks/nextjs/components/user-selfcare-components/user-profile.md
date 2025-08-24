The `UserProfile` component displays the authenticated user's profile information in a structured and styled format. It automatically retrieves user data from the Asgardeo authentication context if not provided, and supports profile editing with error handling.

## Overview

The `UserProfile` component shows user details such as display name, email, username, and other available profile information from Asgardeo. It supports both read-only and editable modes, and can be shown as a card, popup, or inline. Profile updates are handled with built-in error feedback.

## Usage

You can use the `UserProfile` in several ways: with default behavior, explicit user data, or custom layout and fallback.

### Basic Usage

Show the current user's profile using data from Asgardeo context.

```javascript title="UserProfile Example"
import { UserProfile } from '@asgardeo/nextjs'

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

| Prop             | Type        | Required | Description                                         |
|------------------|-------------|----------|-----------------------------------------------------|
| `user`           | `any`       | ❌       | User object to display (defaults to Asgardeo user)  |
| `cardLayout`     | `boolean`   | ❌       | Show profile in a card layout                       |
| `fallback`       | `ReactNode` | ❌       | Content to show when no user is signed in           |
| `mode`           | `'inline' or 'popup'` | ❌ | Display mode for the profile (inline or popup)      |
| `open`           | `boolean`   | ❌       | Whether the popup is open (for `mode="popup"`)      |
| `onOpenChange`   | `(open: boolean) => void` | ❌ | Callback when popup open state changes              |
| `onUpdate`       | `(payload: any) => Promise<void>` | ❌ | Callback after profile update                       |
| `attributeMapping` | `object`  | ❌       | Map custom profile fields (e.g. firstName, picture) |
| `editable`       | `boolean`   | ❌       | Allow editing profile fields                        |
