# Configure unique attributes

{{product_name}} can be configured to retain the uniqueness of user attributes. This allows you to keep a user attribute value as a unique value within or across all userstores.

Follow the steps below to configure:

1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder and add the following configurations.

    ``` toml
    [identity_mgt.user_claim_update.uniqueness]
    enable = true
    scope_within_userstore = false # Optional.
    ```

    !!! note
        To keep the uniqueness within a userstore, set `scope_within_userstore` as `true`.

2.  Restart the {{product_name}}.
3. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Click **Edit** for the attribute you want to update.
4. Go to the **Additional Properties** tab and add the following property to configure the attribute's uniqueness.
 
    <table>
        <thead>
        <tr class="header">
        <th>Property Name</th>
        <th>Property Value</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd">
        <td>isUnique</td>
        <td>true</td>
        </tr>
        </tbody>
    </table>

    ![additional-properties]({{base_path}}/assets/img/guides/users/additional-properties.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6.  Finally, click `+` button and `Update` to save the additional property.

You can now verify the functionality by attempting to add users with an existing attribute value or updating the user attribute value of an existing user.