# Understand Flow Execution components

When the Flow Execution API returns `type: "VIEW"`, the response includes a `data.components` array. 
Each entry describes how the client should render the current step in the flow.

## Component structure

Every component shares the following core properties:

| Field | Description |
|-------|-------------|
| `id` |  Identifier of the component within the current step. |
| `type` | The UI element category (for example, `FORM`, `INPUT`, `BUTTON`, `TYPOGRAPHY`, or `RICH_TEXT`). |
| `variant` | Optional modifier that distinguishes subtypes (for example, `EMAIL` or `PASSWORD` for inputs). |
| `config` | A map of properties specific to the component type, such as labels, placeholders, validation rules, or button text. |
| `components` | Children that should be rendered inside the current container. |

## Inputs and identifiers

Input components expose an `identifier` in `config`. Use this value as the key when you send user data back to `/flow/execute`. 
If `config.required` is `true` for an input, you must provide a value for that field to continue the flow. 
Send only the expected fields to the server to prevent validation errors.

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

Interactive components, such as primary buttons, provide an `actionId`. Use this value in the `actionId` field when you continue the flow.

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

If a step includes multiple actions, the response contains multiple components with `actionId`. 
Render these components and pass the corresponding `actionId` based on the user's selection.

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
