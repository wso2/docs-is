# Configure unique attributes

{{product_name}} can be configured to enforce the uniqueness of user attributes, ensuring that a specific attribute
value remains unique either within a single userstore or across all userstores.

Follow the steps below to configure:

{{ steps }}

    !!! note
        The uniqueness validation options available are as follows:

        - **None**: No validation is applied. Users can have duplicate values for the selected attribute both within and across all userstores.
        - **Within Userstore**: Ensures the selected attribute's value is unique within the specific userstore where the user resides. Duplicate values are permitted in other userstores.
        - **Across Userstore**: Ensures the selected attribute's value is unique across all userstores in the system, preventing duplicates system-wide.

    ![additional-properties]({{base_path}}/assets/img/guides/users/configure-attribute-uniqueness-validation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{{ final_step }}

You can now verify the functionality by attempting to add users with an existing attribute value or updating the user attribute value of an existing user.