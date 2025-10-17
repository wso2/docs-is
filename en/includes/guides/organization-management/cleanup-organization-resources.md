# Resources Cleanup for Deleted Organizations

When you delete an organization in WSO2 Identity Server, its associated data remains in the database. To permanently remove this data, use the cleanup scripts provided by WSO2.

## Run the cleanup

1. Clone the organization resource cleanup [repository](https://github.com/wso2-extensions/identity-organization-resource-cleanup).
2. Navigate to the `{{is_version}}` folder in the cloned repository.
3. Open the `README.md` in that folder.
4. Follow the instructions in the README to run the cleanup script.

!!! note
    Make sure to run the cleanup script on off-peak hours, as it may take some time to complete depending on the amount of data to be cleaned up.
