## Flow inheritance

In {{product_name}}, child organizations inherit flow configurations from their parent by default. Child organizations can also apply their own customizations to inherited flows.

Organization administrators open the Flow Builder in the {{product_name}} Console to manage flows for a specific organization.

## How it works

- **Default inheritance**: Child organizations inherit flows from their parent organization.
- **Local customizations**: A child organization can edit and publish its own flow. After publishing, the child uses its customized flow instead of the parent's flow.
- **Revert to parent**: A child organization can revert its customizations and restore the inherited parent flow.

!!! Note
    [Connections]({{base_path}}/guides/authentication/#manage-connections) used in flows aren't inherited by child organizations.

## Customize a flow

To learn more about how to customize the flows, see the [Flow]({{base_path}}/guides/flows/) guides.

## Revert customizations

To undo customizations and restore the parent flow:

1. In the child organization, open the Flow Builder for the customized flow.
2. Click Revert to restore the inherited parent flow.
3. Confirm the revert to remove all local changes.

After reverting, the child organization immediately inherits and uses the flow configuration from its parent organization.
