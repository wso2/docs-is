The `SignUp` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders a self-registration form inside your app, so users create an account without leaving it.

!!! note
    Self-registration must be enabled in your {{product_name}} organization. The component runs the registration flow through the {{product_name}} flow execution API (`/api/server/v1/flow/execute`).

## Overview

When it mounts, `SignUp` starts a registration flow with {{product_name}} and renders the fields and steps that the flow returns. It validates the input, submits each step and shows the errors that {{product_name}} returns.

To identify your application, `SignUp` sends the `applicationId` set on `<AsgardeoProvider>`, or the `applicationId` query parameter of the current URL.

When the flow completes, `SignUp` calls `onComplete`. Then, unless you set `should-redirect-after-sign-up` to `false`, it redirects the browser to the redirect URL returned by the flow, or to `afterSignUpUrl` if you set it.

## Usage

The following examples show how to use `SignUp`.

### Basic usage

Render `SignUp` on your registration page, for example a `/signup` route.

```vue title="SignUp example"
<script setup>
import { SignUp } from '@asgardeo/vue'
</script>

<template>
  <SignUp after-sign-up-url="/welcome" />
</template>
```

To send users to this page from `<SignUpButton>`, set `sign-up-url` on `<AsgardeoProvider>` to the page's URL.

### Handling completion and errors

```vue title="SignUp with callbacks"
<script setup>
import { SignUp } from '@asgardeo/vue'

const onComplete = (response) => {
  console.log('Registration complete', response)
}

const onError = (error) => {
  console.error('Registration failed:', error)
}
</script>

<template>
  <SignUp
    :should-redirect-after-sign-up="false"
    :on-complete="onComplete"
    :on-error="onError"
  />
</template>
```

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `afterSignUpUrl` | `string` | ❌ | Where to redirect the user after sign-up when the flow doesn't return a redirect URL. |
| `shouldRedirectAfterSignUp` | `boolean` | ❌ | Whether to redirect after the flow completes. Defaults to `true`. |
| `onComplete` | `(response: EmbeddedFlowExecuteResponse) => void` | ❌ | Called when the registration flow completes. |
| `onError` | `(error: Error) => void` | ❌ | Called when the flow fails. |
| `showTitle` | `boolean` | ❌ | Whether to show the title. Defaults to `true`. |
| `showSubtitle` | `boolean` | ❌ | Whether to show the subtitle. Defaults to `true`. |
| `size` | `'small'`, `'medium'` or `'large'` | ❌ | Size of the form. Defaults to `'medium'`. |
| `variant` | `'elevated'`, `'outlined'` or `'flat'` | ❌ | Style of the card that wraps the form. Defaults to `'outlined'`. |
| `className` | `string` | ❌ | CSS class to add to the component. |
| `buttonClassName` | `string` | ❌ | CSS class to add to the buttons. |
| `inputClassName` | `string` | ❌ | CSS class to add to the inputs. |
| `errorClassName` | `string` | ❌ | CSS class to add to error messages. |
| `messageClassName` | `string` | ❌ | CSS class to add to flow messages. |
<!-- markdownlint-enable MD056 -->

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | See below | Replaces the built-in form with your own UI. |

The default slot receives the state of the flow and the functions to drive it:

| Slot prop | Type | Description |
|-----------|------|-------------|
| `title` | `string` | Title of the current step. |
| `subtitle` | `string` | Subtitle of the current step. |
| `components` | `any[]` | The components (fields, buttons, text) of the current step, as returned by {{product_name}}. |
| `values` | `Record<string, string>` | Current values of the fields. |
| `errors` | `Record<string, string>` | Validation errors, by field name. |
| `touched` | `Record<string, boolean>` | Fields that the user has changed, by field name. |
| `isValid` | `boolean` | Whether the current values are valid. |
| `isLoading` | `boolean` | Whether a request is in progress. |
| `messages` | `{ message: string; type: string }[]` | Messages returned by the flow. |
| `handleInputChange` | `(name: string, value: string) => void` | Updates the value of a field. |
| `handleSubmit` | `(component: any, data?: Record<string, any>) => Promise<void>` | Submits the step using the given action component. |
