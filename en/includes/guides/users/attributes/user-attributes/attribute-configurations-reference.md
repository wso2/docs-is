# Attribute configurations reference

This reference provides details on all attribute data types and the input formats they can hold.

The **Data Type** and **Input Format** properties of an attribute determine how the attribute gets displayed in the following UIs:

- User's profile on the Console and the self-service portal.
- User creation wizard

For example, if you set data type to **Options** and select **Dropdown** as the input format, the configured values appear as a list in the user creation wizard as shown below.

![User creation wizard - dropdown input]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-input-format-user-add-view.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


## Data types

An attribute supports one of the following data types:

<table>
    <tbody>
        <tr>
            <td><b>Text</b></td>
            <td>A plain string value.</td>
        </tr>
        <tr>
            <td><b>Options</b></td>
            <td>A pre-defined list of selectable values.</td>
        </tr>
        <tr>
            <td><b>Integer</b></td>
            <td>Whole numbers (for example <code>1</code>, <code>42</code>, <code>-7</code>).</td>
        </tr>
        <tr>
            <td><b>Decimal</b></td>
            <td>Numbers that include decimals (for example <code>3.14</code>, <code>-0.5</code>).</td>
        </tr>
        <tr>
            <td><b>Boolean</b></td>
            <td>A true or false value.</td>
        </tr>
        <tr>
            <td><b>Object</b></td>
            <td>A structured object that can include several sub-attributes.</td>
        </tr>
        <tr>
            <td><b>Date</b></td>
            <td>Calendar date without time. Use ISO 8601 <code>YYYY-MM-DD</code> (for example <code>2025-10-01</code>).</td>
        </tr>
        <tr>
            <td><b>DateTime</b></td>
            <td>Date and time with timezone. Use ISO 8601 <code>YYYY-MM-DDTHH&#58;mm&#58;ssZ</code> or offset <code>YYYY-MM-DDTHH&#58;mm&#58;ss±HH&#58;mm</code> (for example <code>2025-10-01T14:30:00+05:30</code>).<td>
        </tr>
        <tr>
            <td><b>Epoch</b></td>
            <td>Unix time since 1970-01-01 UTC. Use seconds or milliseconds as integers (for example <code>1730399400</code> or <code>1730399400000</code>).</td>
        </tr>
        </tbody>
</table>

- The **Options** data type allows you to define selectable values for an attribute using Label–Value pairs, where:

  - **Label** is what the user sees in the UI.
  - **Value** is what's stored internally.

    ![Options for attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-options.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- The **Object** data type allows you to hold a structured object. If chosen, you need to configure its **sub-attributes**.

    ![SubAttributes for attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-addtribute-sub-attributes.png){:   width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    The following constraints apply if there is a mapped SCIM attribute for the attribute:

    1. Each sub-attribute of the mapped SCIM attribute must start with the main attribute name followed by a period (`.`) 
                and a descriptive sub-attribute name.

    2. You can't assign another attribute of type **Object** as a sub-attribute.

## Input formats

The input format determines how attributes appear in the user interface. The available formats depend on the data type:

![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-input-format.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

<table>
    <tbody>
        <tr>
            <td><b>Data Type</b></td>
            <td><b>Available Input Formats</b></td>
        </tr>
        <tr>
            <td><b>Boolean</b></td>
            <td>Checkbox, Toggle</td>
        </tr>
        <tr>
            <td><b>Options (Single)</b></td>
            <td>Dropdown, Radio Group</td>
        </tr>
        <tr>
            <td><b>Options (Multiple)</b></td>
            <td>Multi-select Dropdown, Checkbox Group</td>
        </tr>
        <tr>
            <td><b>Integer</b></td>
            <td>Text Input, Number Picker</td>
        </tr>
        <tr>
            <td><b>Date</b></td>
            <td>Text Input, Date Picker. Store dates in ISO 8601 `YYYY-MM-DD`. If the existing value uses another format, render a Text Input.</td>
        </tr>
    </tbody>
</table>
