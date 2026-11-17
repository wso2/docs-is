# Flows

Design and customize key user journeys in your application with Flows. A flow defines the step-by-step journey a user takes during a specific interaction, such as registering for your service or recovering a password.

{{product_name}} lets you build fully customizable flows for the following user interactions.

- **Self registration** - Create seamless registration experiences for new users, with support for multi-step forms, data validation, and identity verification checks. Users can also sign up through a supported connection such as Google, Apple, Facebook, Microsoft, or GitHub.

- **Password recovery** - Build secure recovery processes to help users regain access, using steps such as email verification or one-time passwords (OTP).

- **Invited user registration** - Let new users complete creating their accounts when administrators invite them. Design secure flows to verify their identities and set their passwords.

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version not in ["7.0.0", "7.1.0", "7.2.0", "7.3.0"]) %}

- **Profile update** - Let users manage their own profile information. Build secure flows that verify their identities before they update their profiles.

{% endif %}

Use starter templates, widgets, and other components to control how users interact with your application. No complex coding required.

{% if product_name == "WSO2 Identity Platform" %}
Use [conditional branching]({{base_path}}/guides/flows/conditional-branching/) to send users down different paths, and [A/B testing]({{base_path}}/guides/flows/conditional-branching/#ab-testing) to try a new version of a flow on a share of your users.
{% endif %}

## Start building flows

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version not in ["7.0.0", "7.1.0", "7.2.0", "7.3.0"]) %}
For specific examples of building flows, refer to [Self-registration]({{base_path}}/guides/flows/self-registration/), [Password recovery]({{base_path}}/guides/flows/password-recovery/), [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/), and [Profile update]({{base_path}}/guides/flows/profile-update/).
{%- else %}
For specific examples of building flows, refer to [Self-registration]({{base_path}}/guides/flows/self-registration/), [Password recovery]({{base_path}}/guides/flows/password-recovery/), and [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/).
{%- endif %}
To execute the flows from a custom client application, see [Use the Flow Execution API]({{base_path}}/guides/flows/flow-execution-api/) and explore the view schema in [Understand Flow Execution Components]({{base_path}}/guides/flows/flow-execution-components/).

- To learn the fundamentals of building a flow, refer to the [get started]({{base_path}}/guides/flows/build-a-flow/) guide.
{%- if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version not in ["7.0.0", "7.1.0", "7.2.0", "7.3.0"]) %}
- For detailed examples of specific use cases, see the guides on [Self registration]({{base_path}}/guides/flows/self-registration/), [Password recovery]({{base_path}}/guides/flows/password-recovery/), [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/) and [Profile update]({{base_path}}/guides/flows/profile-update/).
{%- else %}
- For detailed examples of specific use cases, see the guides on [Self registration]({{base_path}}/guides/flows/self-registration/), [Password recovery]({{base_path}}/guides/flows/password-recovery/) and [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/).
{%- endif %}

![Flows]({{base_path}}/assets/img/guides/flows/flow-builder-overview.png){: width="auto" style="display: block; margin: 0;"}
