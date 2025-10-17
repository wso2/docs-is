# Get started with flows

A **flow** defines the step by step journey a user takes during a specific interaction with your application, like signing up or resetting a password. This guide introduces the **Flow Builder**, a visual canvas where you can design and customize these journeys to meet your security and user experience goals without writing complex code.

The Flow Builder allows full customization of the following user journeys. Click on a flow to view a sample scenario built using the flow builder.

- [Self registration]({{base_path}}/guides/flows/self-registration/)
- [Password recovery]({{base_path}}/guides/flows/password-recovery/)
- [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/)

## Create and Enable a flow

The following sections outline the process for creating and publishing a custom flow.

### Step 1: Navigate to flow builder

You can access the flow builder by following the steps below:

1. On the {{product_name}} Console, navigate to **Flows**.

2. Click on the card corresponding to the flow you want to build.

This will open the Flow Builder canvas for that specific flow.

### Step 2: Build the flow

The **Flow builder** provides all the building blocks you need to create user journeys.

For a selected flow, you can start building it using one of the methods below and use [flow elements](#flow-elements) to customize it to your requirements.

{% if product_name == "Asgardeo" %}

#### Generate with AI

With **Generate with AI**, you can use plain language instructions to build a complete flow, allowing you to start with a minimal effort and customize components as needed.

![Flow builder AI]({{base_path}}/assets/img/guides/flows/flow-builder-generate-with-ai.png){: width="auto" style="display: block; margin: 0;"}

{% endif %}

#### Use a starter template

Select from a list of pre-built templates for common use cases to avoid starting from scratch. Click the `+` icon next to a template to add it to the canvas.

![Starter Templates]({{base_path}}/assets/img/guides/flows/flow-password-recovery-start-from-template.png){: width="auto" style="display: block; margin: 0;"}

#### Build from scratch

For complete control, start with a blank canvas and build the flow by dragging and dropping the required [flow elements](#flow-elements).

![Build flow manually]({{base_path}}/assets/img/guides/flows/flow-builder-build-flow-manually.png){: width="auto" style="display: block; margin: 0;"}

!!! Note

    Save the flow at any point while building. The saved version stays as a draft. Edit the draft later as needed.

### Step 3: Enable the flow

Once the prepared flow is ready to publish for users, enable it.

1. On the top-right corner of the screen, turn the toggle ON to enable the flow.

!!! warning "Immediate Publication"
    Enabling the flow will immediately publish the current configuration on the canvas, making it live for all users.
!!! Note

    If you disable a customized flow, your users will automatically continue with the default experience until you’re ready to publish it again.

## Flow inheritance for sub organizations

If your organization uses sub organizations, flows from the parent are inherited by default. Sub orgs use the parent flow unless you make changes.

!!! Note
    [Connections]({{base_path}}/guides/authentication/#manage-connections) aren't inherited by sub organizations.

**To customize a flow for a sub org:**

- Go to the Flow Builder in the sub org.
- Edit the inherited flow as needed.
- Publish to override the parent flow for this sub org only.

**To undo customizations:**

- Click **Revert** to restore the parent flow and remove all sub org changes.

![Revert flow]({{base_path}}/assets/img/guides/flows/flow-builder-revert.gif){: width="auto" style="display: block; margin: 0;"}

## Flow elements

The Flow Builder provides a library of reusable, no-code elements. These building blocks integrate to facilitate the straightforward creation and customization of any user journey.

### Steps

Steps function as the core building blocks for creating multi-page experiences. A flow contains one or more steps.

![Steps]({{base_path}}/assets/img/guides/flows/flow-builder-steps.gif){: width="auto" style="display: block; margin: 0;"}

### Widgets

Widgets provide powerful functionality through pre-built, reusable modules, like a social login button. Drag and drop widgets directly into a step.

![Widgets]({{base_path}}/assets/img/guides/flows/flow-builder-widgets.gif){: width="auto" style="display: block; margin: 0;"}

### Components

Components represent the individual UI elements placed inside a step, such as input fields, buttons, and paragraphs.

!!! Note

    Field components such as **Text Input** and **Email Input** etc. have the following constraints:

       - Only a **Form** component can contain them.
       
       - Must map to a user attribute. To do so,
        
         - Click the pencil icon on the element action panel.
  
         - From the **Attribute** dropdown, select the relevant attribute. Only attributes **displayed in user profiles** are available for mapping. Learn how to [display attributes in user profiles]({{base_path}}/guides/users/attributes/manage-attributes/#configure-attributes).

![Components]({{base_path}}/assets/img/guides/flows/flow-builder-components.gif){: width="auto" style="display: block; margin: 0;"}