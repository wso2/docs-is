# Understand Flow Execution components

When the Flow Execution API returns `type: "VIEW"`, the response includes a `data.components` array. Each entry describes how your client should render the current step in the flow.

## Component structure

Every component shares the following core properties:

| Field | Description |
|-------|-------------|
| `id` | Stable identifier of the component within the current step. |
| `type` | The UI element category (for example, `FORM`, `INPUT`, `BUTTON`, `TYPOGRAPHY`, or `RICH_TEXT`). |
| `variant` | Optional modifier that distinguishes subtypes (for example, `EMAIL` or `PASSWORD` for inputs). |
| `config` | A map of properties specific to the component type, such as labels, placeholders, validation rules, or button text. |
| `components` | (For container types such as `FORM` or `SECTION`) Children that should be rendered inside the container. |

## Inputs and identifiers

Input components expose an `identifier` in `config`. Use this value as the key when you send user data back to `/flow/execute`. The server lists the expected keys under `data.requiredParams`.

```json
{
  "id": "email",
  "type": "INPUT",
  "variant": "EMAIL",
  "config": {
    "identifier": "email",
    "label": "Email",
    "required": true
  }
}
```

## Actions and `actionId`

Interactive components, such as primary buttons, provide an `actionId`. Echo this value in the `actionId` field when you continue the flow.

```json
{
  "id": "submit",
  "type": "BUTTON",
  "actionId": "submit-registration",
  "variant": "PRIMARY",
  "config": {
    "text": "Continue"
  }
}
```

If multiple actions are available, the response can contain more than one component with an `actionId`. Present them to the user and pass the matching identifier depending on the option selected.

## Validation rules

Some inputs include a `validations` array within `config`. Each entry describes a rule the client can use to provide early feedback before calling the API.

```json
{
  "type": "RULE",
  "name": "LengthValidator",
  "conditions": [
    { "key": "min.length", "value": "8" },
    { "key": "max.length", "value": "64" }
  ]
}
```

Your client can choose to enforce these rules locally or rely on server-side validation. Regardless of local handling, always submit the user input back to the Flow Execution API to progress the flow.
