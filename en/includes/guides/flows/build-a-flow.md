# Get started with flows

A **flow** defines the sequence of steps a user goes through during a specific interaction with your application. {{product_name}} supports building fully customizable flows for,

- Self-registration
- Password recovery

This guide introduces the **Flow Builder**, a visual environment with all the necessary elements to build flows that meet both security requirements and user experience goals.

## Enable a flow

{{product_name}} provides default sequences for every flow in the flow builder. You can design and refine your customized flow at your own pace, keeping it disabled until you’re ready to share it. While your customized flow is disabled, users continue to experience the default flow. Once enabled, your users will seamlessly change to the customized experience you’ve created.

To enable a flow,

1. On the {{product_name}} Console, go to **Flows**.

2. Select the flow you want to enable.

3. On the top-right corner of the screen, turn the toggle ON to enable the flow.

!!! Note

    If you disable a customized flow, your users will automatically continue with the default experience until you’re ready to publish it again.

## Build a flow

The **Flow builder** provides all the building blocks you need to create seamless user journeys. To get started, go to **Flows** in the {{product_name}} Console and select the flow you want to customize.

You can begin building in one of the following ways:

### Generate with AI

The **Generate with AI** feature converts plain-language instructions into a complete flow, allowing you to start quickly and customize components as needed.

![Flow builder AI]({{base_path}}/assets/img/guides/flows/flow-builder-generate-with-ai.png){: width="auto" style="display: block; margin: 0;"}

### Use Starter Templates

Starter templates give you a quick start with predefined flows that are easily customizable. Click the `+` button next to a template to add it to the flow.

![Starter Templates]({{base_path}}/assets/img/guides/flows/flow-builder-starter-templates.png){: width="auto" style="display: block; margin: 0;"}

### Build from Scratch

Begin with a blank canvas and use the drag-and-drop interface to add steps, widgets, and components. This option gives you full control over the sequence, UI elements, and logic in the flow.

![Custom Flow]({{base_path}}/assets/img/guides/flows/flow-builder-custom-flow.png){: width="auto" style="display: block; margin: 0;"}

## Flow Elements

Flows are made up of different types of elements that work together to create the user journey. These elements let you control the structure, functionality, and appearance of each step in the flow.

### Widgets

Widgets are reusable components that enhance the flow. Drag and drop widgets into your desired `view` to build a flow.

![Widgets]({{base_path}}/assets/img/guides/flows/flow-builder-widgets.gif){: width="auto" style="display: block; margin: 0;"}

### Steps

Steps are the core building blocks of a flow. Drag and drop steps to create a multi‑step user journeys.

![Steps]({{base_path}}/assets/img/guides/flows/flow-builder-steps.gif){: width="auto" style="display: block; margin: 0;"}

### Components

Components are atomic UI elements added to steps. Drag and drop components inside a step.

!!! Note
    Field components such as **Text Inputs**, **Email Inputs**, etc. have the following constraints:
    - They must be added inside a **Form** component.
    - They must be mapped to a user attribute. Do this by clicking the pencil icon on the element action panel and selecting the relevant attribute from the `Attribute` dropdown. Only attributes set to display on the respective user profile in the [Attribute Configurations]({{base_path}}/guides/users/attributes/manage-attributes) will be available for mapping.

![Components]({{base_path}}/assets/img/guides/flows/flow-builder-components.gif){: width="auto" style="display: block; margin: 0;"}
