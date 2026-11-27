`<AsgardeoSignUp>` renders an embedded sign-up form of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`), so users register inside your app.

## Overview

`<AsgardeoSignUp>` starts the registration flow that you configured for your application and renders each of its steps. Each step goes through the module's `POST /api/auth/signup` route.

The component starts the flow with the `applicationId` from the module configuration. If that isn't set, it uses the `applicationId` query parameter of the current URL.

When the registration flow completes, the SDK navigates to `afterSignInUrl`.

## Usage

The component is auto-registered, so you don't need to import it. Create a sign-up page that renders it:

```vue title="pages/sign-up.vue"
<template>
  <AsgardeoSignUp />
</template>
```

Then point `<AsgardeoSignUpButton>` at that page:

```bash title=".env"
NUXT_PUBLIC_ASGARDEO_SIGN_UP_URL="/sign-up"
```

### Handle events

```vue title="pages/sign-up.vue"
<script setup lang="ts">
const onComplete = (response: unknown) => {
  console.log('Sign-up completed:', response);
};

const onError = (error: Error) => {
  console.error('Sign-up failed:', error);
};
</script>

<template>
  <AsgardeoSignUp :show-subtitle="false" @complete="onComplete" @error="onError" />
</template>
```

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterSignUpUrl` | `string` | – | URL to navigate to after sign-up, when the flow response isn't a redirection. Defaults to the configured `afterSignInUrl`. |
| `shouldRedirectAfterSignUp` | `boolean` | `true` | Whether to navigate after sign-up completes. |
| `onComplete` | `(response: EmbeddedFlowExecuteResponse) => void` | – | Called when the flow completes. Use `@complete` in templates. |
| `onError` | `(error: Error) => void` | – | Called when a step fails. Use `@error` in templates. |
| `showTitle` | `boolean` | `true` | Whether to show the form title. |
| `showSubtitle` | `boolean` | `true` | Whether to show the form subtitle. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the form and its controls. |
| `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'outlined'` | Card style of the form. |
| `className` | `string` | `''` | CSS class for the root element. |
| `buttonClassName` | `string` | `''` | CSS class for the buttons. |
| `inputClassName` | `string` | `''` | CSS class for the inputs. |
| `errorClassName` | `string` | `''` | CSS class for error messages. |
| `messageClassName` | `string` | `''` | CSS class for flow messages. |
<!-- markdownlint-enable MD056 -->

## Slots

| Slot | Description |
|------|-------------|
| `default` | Replaces the built-in form. Receives `components`, `values`, `errors`, `touched`, `isLoading`, `isValid`, `messages`, `title`, `subtitle`, `handleInputChange`, and `handleSubmit`. |
