# Exporting WSO2 Identity Server User Information to Zoho CRM

Zoho is a web-based online office suite containing word processing, spreadsheets, presentations, databases, note-taking, 
wikis, web conferencing, customer relationship management, project management, invoicing, and other applications. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to Zoho. 

Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/identity-lifecycles/sync-account-overview).
    
## Try it Out

1. Login to [Zoho](https://accounts.zoho.com/signin?servicename=ZohoHome&signupurl=https://www.zoho.com/signup.html).
2. Click on **Contacts**.

    <!--![contacts-on-zoho-tool-bar]({{base_path}}/assets/img/tutorials/contacts-on-zoho-tool-bar.png) -->
    
3. Click **Import > Import Contacts**.

    <!--![import-contacts-in-zoho]({{base_path}}/assets/img/tutorials/import-contacts-in-zoho.png)-->
    
4. Click **Browse** in the **From File** section.

    <!--![browse-in-from-file-section]({{base_path}}/assets/img/tutorials/browse-in-from-file-section.png)-->
    
5. Select the created `users.csv` file and click **Next**.
6. Configure **What do you want to do with the records in the file?** section accordingly.
7. In the next section, map **Field Names** in the file with **Fields in Zoho CRM**. 

    <!--![map-import-fields-to-zoho-crm]({{base_path}}/assets/img/tutorials/map-import-fields-to-zoho-crm.png)-->
    
8. Click **Next**.

Now you have successfully imported the user data into Zoho CRM. 
    <!--![imported-data-to-zoho-crm]({{base_path}}/assets/img/tutorials/imported-data-to-zoho-crm.png)-->
