# Get started with flows

A **flow** defines the sequence of steps a user goes through during a specific interaction with your application. {{product_name}} supports building fully customizable builds for the following flows.

- Self-registration
- Password recovery
- Invited user registration

This guide introduces the **Flow Builder**, a visual environment with all the necessary elements to build flows that meet both security requirements and user experience goals.

## Access the flow builder

You can access the flow builder by following the steps below:

1. On the {{product_name}} Console, go to **Flows**.

2. Click on the card corresponding to the flow you want to build.

3. [Build the flow](#build-a-flow) and [enable](#enable-a-flow) it.

## Build a flow

The **Flow builder** provides all the building blocks you need to create seamless user journeys. For a selected flow, you can start building it using one of the methods below and use [flow elements](#reference-flow-elements) to customize it to your requirements.

{% if product_name == "Asgardeo" %}

### Generate with AI

The **Generate with AI** feature converts plain-language instructions into a complete flow, allowing you to start quickly and customize components as needed.

![Flow builder AI]({{base_path}}/assets/img/guides/flows/flow-builder-generate-with-ai.png){: width="auto" style="display: block; margin: 0;"}

{% endif %}

### Use a starter template

Starter templates give you a quick start with predefined flows that are easily customizable. Click the `+` button next to a template to add it to the flow.

![Starter Templates]({{base_path}}/assets/img/guides/flows/flow-builder-starter-templates.png){: width="auto" style="display: block; margin: 0;"}

### Build from scratch

Begin with a blank canvas and use the drag-and-drop interface to add steps, widgets, and components. This option gives you full control over the sequence, UI elements, and logic in the flow.

![Custom Flow]({{base_path}}/assets/img/guides/flows/flow-builder-custom-flow.png){: width="auto" style="display: block; margin: 0;"}

## Enable a flow

{{product_name}} provides default sequences for every flow in the flow builder. You can design and refine your customized flow at your own pace, keeping it disabled until you’re ready to share it. While your customized flow is disabled, users continue to experience the default flow. Once enabled, your users will seamlessly change to the customized experience you’ve created.

To enable a flow,

1. On the {{product_name}} Console, go to **Flows**.

2. Select the flow you want to enable.

3. On the top-right corner of the screen, turn the toggle ON to enable the flow.

!!! Note

    If you disable a customized flow, your users will automatically continue with the default experience until you’re ready to publish it again.

## Reference: Flow elements

Flow elements work together to create the user journey. They define the structure, functionality, and appearance of each step in the flow.

### Widgets

Widgets are reusable components that enhance the flow. Drag and drop widgets into your desired view to build a flow.

![Widgets]({{base_path}}/assets/img/guides/flows/flow-builder-widgets.gif){: width="auto" style="display: block; margin: 0;"}

### Steps

Steps are the core building blocks of a flow. Drag and drop steps to create a multi‑step user journey.

![Steps]({{base_path}}/assets/img/guides/flows/flow-builder-steps.gif){: width="auto" style="display: block; margin: 0;"}

### Components

Components are atomic UI elements that you can add to a step. Drag and drop components inside a step.

!!! Note

    Field components such as **Text Input** and **Email Input** etc. have the following contraints:

       - Only a **Form** component can contain them.
       
       - Must map to a user attribute. To do so,
        
         - Click the pencil icon on the element action panel.
  
         - From the **Attribute** dropdown, select the relevant attribute. Only attributes **displayed in user profiles** are available for mapping. Learn how to [display attributes in user profiles]({{base_path}}/guides/users/attributes/manage-attributes/#configure-attributes).

![Components]({{base_path}}/assets/img/guides/flows/flow-builder-components.gif){: width="auto" style="display: block; margin: 0;"}
