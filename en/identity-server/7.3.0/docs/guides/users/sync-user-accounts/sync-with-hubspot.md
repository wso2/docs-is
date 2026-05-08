# Exporting WSO2 Identity Server User Information to HubSpot

HubSpot is a customer relationship management solution that brings companies and customers together. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to the 
HubSpot platform. 

Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/users/sync-user-accounts/sync-account-overview)).
    
## Try it Out

1. Log in into [HubSpot](https://app.hubspot.com/) and access the [contact](https://app.hubspot.com/contacts) section.
2. Click **Import** on the dashboard.
3. Select **Start an import**.
4. Select **File from computer**.
7. Select **Contacts**.
8. Upload the `users.csv` file.
9. Map the file columns to contact properties. You can skip columns that do not match.
10. Finish the import.
11. Once the import is complete, you can check the contacts dashboard to see the imported users.

For more information on HubSpot data import, see [HubSpot Data Import](https://www.hubspot.com/products/sales/crm-import).
