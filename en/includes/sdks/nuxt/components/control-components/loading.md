`<AsgardeoLoading>` renders its content while the authentication state of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) is loading.

## Overview

`<AsgardeoLoading>` reads `isLoading` from `useAsgardeo()`. While `isLoading` is `true`, it renders its `default` slot. Once loading finishes, it renders the `fallback` slot, or nothing if you don't provide one.

!!! note
    The server resolves the authentication state before it renders the page, and the client marks it as loaded during hydration. In most apps, `isLoading` is `false` by the time your page renders, so `<AsgardeoLoading>` shows its `fallback` slot.

## Usage

The component is auto-registered, so you don't need to import it.

```vue
<template>
  <AsgardeoLoading>
    <p>Loading…</p>
    <template #fallback>
      <NuxtPage />
    </template>
  </AsgardeoLoading>
</template>
```

## Props

`<AsgardeoLoading>` has no props.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content to render while the authentication state is loading. |
| `fallback` | Content to render after loading finishes. |
