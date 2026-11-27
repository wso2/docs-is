`useFlowMeta()` returns the flow metadata context of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

The SDK's embedded flow components read this context. [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/) mounts it with flow metadata fetching turned off, so `meta` is always `null` and the methods don't fetch anything. The module auto-imports `useFlowMeta()` for compatibility with `@asgardeo/vue`.

!!! note
    Call `useFlowMeta()` only in components that render inside `<AsgardeoRoot>`. Otherwise, it throws an error. To change the UI language, use [`useAsgardeoI18n().setLanguage()`]({{base_path}}/sdks/nuxt/composables/use-asgardeo-i18n/).

## API

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `meta` | `Readonly<Ref<FlowMetadataResponse \| null>>` | The flow metadata. Always `null` in the Nuxt SDK. |
| `isLoading` | `Readonly<Ref<boolean>>` | Whether flow metadata is loading. |
| `error` | `Readonly<Ref<Error \| null>>` | The error from loading flow metadata, if any. |
| `fetchFlowMeta()` | `() => Promise<void>` | Doesn't fetch in the Nuxt SDK. |
| `switchLanguage(language)` | `(language: string) => Promise<void>` | Doesn't do anything in the Nuxt SDK. |
<!-- markdownlint-enable MD056 -->
