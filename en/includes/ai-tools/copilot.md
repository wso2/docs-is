# AI Copilot

The {{product_name}} Copilot is an AI assistant built into the {{product_name}} Console. Ask it questions in plain language to learn how to use {{product_name}}, look up resources in your organization, review your security settings, and prepare changes that you review and confirm before they take effect.

!!! note
    The Copilot can make mistakes. Always review its answers and proposals before you act on them.

## Open the Copilot

To open the Copilot:

1. On the {{product_name}} Console, click **Ask AI** at the top of the page.

2. In the **Ask AI** panel, type your question or request and press enter. You can also select one of the suggested questions to get started.

    ![Ask AI panel in the Console]({{base_path}}/assets/img/guides/ai-tools/ask-ai-copilot.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## What the Copilot can do

The Copilot can help you with the following tasks.

- [Get answers from the documentation](#get-answers-from-the-documentation)
- [Look up resources in your organization](#look-up-resources-in-your-organization)
- [Review your security settings](#review-your-security-settings)
- [Propose changes to your organization](#propose-changes-to-your-organization)
- [Map user store attributes](#map-user-store-attributes)

!!! note
    The Copilot works with the permissions of the signed-in administrator. It can only view or propose what you can already do in the Console. Looking up resources and proposing changes may not be available for all organizations.

## Get answers from the documentation

Ask the Copilot how to use any {{product_name}} feature, such as single sign-on, multi-factor authentication, identity federation, or application integration. The Copilot answers using the {{product_name}} documentation and, when you ask how to do something, gives step-by-step instructions for the Console.

Sample questions:

- `How do I add MFA to my application?`
- `What is the difference between organization roles and application roles?`
- `Walk me through setting up Google login.`

!!! note
    The Copilot doesn't write scripts, such as conditional authentication scripts. It can show code examples that are available in the documentation.

## Look up resources in your organization

Ask the Copilot about the resources in your organization, such as applications, roles, groups, users, and user stores. It reads the data directly from your organization and answers from the results.

Sample questions:

- `Which applications do I have?`
- `What permissions does the Order Manager role have?`
- `Who are the members of the Support group?`
- `Which user stores are enabled?`

## Review your security settings

Ask the Copilot how secure your organization or an application is, and it reviews the settings against security best practices. It reports only the settings that need attention, with a recommendation for each.

The Copilot reviews the following settings:

- **OAuth2 and OpenID Connect applications** - password grant, implicit grant, MFA, PKCE, hybrid flow, redirect URLs, refresh token renewal, and the lifetimes of user access tokens, application access tokens, and refresh tokens.
- **Account protection** - account lock, bot detection, and password history.
- **Login and registration** - password length, password character types, idle session timeout, remember me, and maximum session timeout.

Sample questions:

- `How secure is my organization?`
- `Is my password policy strong enough?`
- `Review the security of <app name> application.`

The Copilot reviews one application at a time. It doesn't change any settings. Use its recommendations to update the settings in the Console.

## Propose changes to your organization

Ask the Copilot to create a resource for you. The Copilot doesn't make the change itself. Instead, it shows a proposal as a card in the Console. Review the details on the card and confirm it to apply the change, or cancel it.

The Copilot supports creating common resources in your organization, such as applications, roles, and groups, as well as mapping user store attributes. Tell the Copilot what you want to create and the details you have.

Sample requests:

- `Create a single-page application named Store Front with the redirect URL https://localhost:3000.`
- `Create a group named Support with the users alex and sam.`
- `Register an API resource named Orders API with the identifier https://api.example.com/orders and the scopes read_orders and write_orders.`

If a required detail is missing, the Copilot asks for it instead of guessing.

Keep the following in mind when you review proposals:

- A change is made only when you confirm the card. Until then, nothing in your organization changes.
- A proposal expires if it isn't confirmed in time. If it expires, ask the Copilot again.
- For sensitive changes, the card asks you to confirm that you reviewed it before you can apply it.

## Map user store attributes

When you connect a secondary user store, such as an LDAP, Active Directory, or JDBC user store, its attribute names may differ from the defaults that {{product_name}} uses. The Copilot helps you map {{product_name}} claims to the attributes in your user store.

### Map attributes from a schema

Give the Copilot the name of your user store and the attributes in its schema, along with each attribute's data type.

1. Send the user store name and the schema. For example:

    `Map the attributes of my CorpLDAP user store: mobile (Directory String), departmentNumber (Directory String), employeeType (Directory String), whenChanged (Generalized Time)`

    !!! tip
        Messages to the Copilot have a length limit. If your schema is long, send a few attributes at a time. The Copilot maps each part separately.

2. The Copilot compares the schema with the claims of your organization and shows the result grouped as follows:

    - **New mappings** - attributes that will be mapped to a claim.
    - **Already mapped (no change)** - attributes that are already mapped to the correct claim.
    - **Keeps the store's own mapping** - claims that the user store already maps to another attribute.
    - **Not mapped** - attributes the Copilot couldn't match, with the reason. The Copilot asks which claim each of these holds, if any.

    Claims that are not in the schema keep their default mappings.

3. Review the result. Tell the Copilot what to change, or confirm the mappings.

4. The Copilot proposes the mappings as a card. Review the card and confirm it to apply the mappings.

### Change an attribute mapping

Ask the Copilot to change the attribute that a claim is mapped to. For example:

- `In CorpLDAP, map the Telephone claim to ipPhone.`
- `In CorpLDAP, map departmentNumber to the Department claim.`

The Copilot proposes the change as a card. If another claim already uses the same attribute, the card shows a warning. If you ask for several changes, the Copilot proposes them one at a time.

!!! note
    The Copilot only works with secondary user stores. It can't remove mappings or change other user store settings. To do these, go to **User Attributes & Stores** in the Console.
