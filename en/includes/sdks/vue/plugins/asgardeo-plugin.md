`AsgardeoPlugin` is the Vue plugin of the {{product_name}} Vue SDK (`@asgardeo/vue`). Install it once on your Vue application, before you mount it.

## Usage

```javascript title="src/main.js"
import { createApp } from 'vue'
import { AsgardeoPlugin } from '@asgardeo/vue'
import App from './App.vue'

createApp(App).use(AsgardeoPlugin).mount('#app')
```

When installed, the plugin:

- Adds the SDK's component styles to the page.
- Registers [`<AsgardeoProvider>`]({{base_path}}/sdks/vue/contexts/asgardeo-provider/) as a global component, so you can use it in any template without importing it.

The plugin does not take your application's configuration. Pass `client-id`, `base-url` and the other settings as props of `<AsgardeoProvider>`.

!!! note
    The plugin only registers `<AsgardeoProvider>` globally. Import the other components, such as `SignInButton` or `SignedIn`, from `@asgardeo/vue` in the components that use them.

## Options

`app.use(AsgardeoPlugin, options)` accepts the following optional object (`AsgardeoPluginOptions`):

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `mode` | `'browser'` or `'delegated'` | ❌ | `'browser'` (the behavior when you omit it) registers `<AsgardeoProvider>`. `'delegated'` only adds the styles and leaves it to a host framework to provide the authentication context. It exists for framework integrations such as the Nuxt SDK. Vue apps don't need to set it. |
