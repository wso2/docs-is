`useFlow()` returns the UI state of the embedded authentication flows of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`), such as the current step, title, and messages.

## Overview

[`<AsgardeoSignIn>`]({{base_path}}/sdks/nuxt/components/authentication/sign-in/) and [`<AsgardeoSignUp>`]({{base_path}}/sdks/nuxt/components/authentication/sign-up/) use this state to render their headings and messages. Use `useFlow()` when you build custom UI around those components. The module auto-imports `useFlow()`.

!!! note
    Call `useFlow()` only in components that render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/). Otherwise, it throws an error.

## Usage

{% raw %}

```vue
<script setup lang="ts">
const { title, messages, removeMessage } = useFlow();
</script>

<template>
  <h2>{{ title }}</h2>
  <div v-for="message in messages" :key="message.id">
    {{ message.message }}
    <button v-if="message.dismissible" @click="removeMessage(message.id)">Dismiss</button>
  </div>
</template>
```

{% endraw %}

## API

`useFlow()` returns the following values.

### State

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `currentStep` | `Readonly<Ref<FlowStep>>` | The current step, with `id`, `type`, `title`, and optional `subtitle`, `canGoBack`, and `metadata`. `type` is one of `'signin'`, `'signup'`, `'organization-signin'`, `'forgot-password'`, `'reset-password'`, `'verify-email'`, or `'mfa'`. |
| `title` | `Readonly<Ref<string>>` | The title of the current step. |
| `subtitle` | `Readonly<Ref<string \| undefined>>` | The subtitle of the current step. |
| `messages` | `Readonly<Ref<FlowMessage[]>>` | Messages to show. Each has `message`, `type` (`'success'`, `'error'`, `'warning'`, or `'info'`), and optional `id` and `dismissible`. |
| `error` | `Readonly<Ref<string \| null>>` | The current error. |
| `isLoading` | `Readonly<Ref<boolean>>` | Whether the flow is loading. |
| `showBackButton` | `Readonly<Ref<boolean>>` | Whether to show a back button. |
| `onGoBack` | `Readonly<Ref<(() => void) \| undefined>>` | The handler of the back button. |
<!-- markdownlint-enable MD056 -->

### Methods

| Method | Description |
|--------|-------------|
| `navigateToFlow(flowType, options?)` | Moves to a flow step of the given type. `options` can set `title`, `subtitle`, and `metadata`. |
| `setCurrentStep(step)` | Sets the current step. |
| `setTitle(title)` / `setSubtitle(subtitle?)` | Sets the title or subtitle. |
| `addMessage(message)` / `removeMessage(id)` / `clearMessages()` | Adds, removes, or clears messages. |
| `setError(error)` | Sets or clears the error. |
| `setIsLoading(loading)` | Sets the loading state. |
| `setShowBackButton(show)` / `setOnGoBack(callback?)` | Controls the back button. |
| `reset()` | Resets the flow state. |
