# Exporting WSO2 Identity Server User Information to Zoho CRM

Zoho is a web-based online office suite containing word processing, spreadsheets, presentations, databases, note-taking, 
wikis, web conferencing, customer relationship management, project management, invoicing, and other applications. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to Zoho. 

Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/users/sync-user-accounts/sync-account-overview).
    
## Try it Out

1. Login to [Zoho](https://www.zoho.com/crm/).
2. Click on **Contacts**.
3. Click **Import > Import Contacts**.
4. Click **Browse** in the **From File** section.
5. Select the created `users.csv` file and click **Next**.
6. Select upload method out of the following and click **Next**.
    - Add as new Contacts
    - Update existing Contacts only
    - Both
7. Map **CSV data fields** with **Zoho data fields**.
8. Click **Next** and then finally, click on **Finish**.

For more information on Zoho CRM data import, see [Importing Data to Zoho CRM](https://help.zoho.com/portal/en/kb/crm/data-administration/import-data/articles/import-data)
