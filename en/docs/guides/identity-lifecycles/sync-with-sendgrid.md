# Exporting WSO2 Identity Server User Information to Sendgrid

SendGrid is a cloud-based service that assists businesses with email delivery. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to Sendgrid Email Delivery
platform.

Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/identity-lifecycles/sync-account-overview).

## Try it Out

1. Login to [Sendgrid](https://sendgrid.com/).
2. Click **Contacts** under **Marketing**.
    <!--![contacts-in-sendgrid]({{base_path}}/assets/img/tutorials/contacts-in-sendgrid.png) -->
3. Click **Upload CSV** under **Add Contacts**.
    <!--![data-import-in-sendgrid]({{base_path}}/assets/img/tutorials/data-import-in-sendgrid.png) -->
4. Select the **Add Contacts and include in existing list**(ie. This may change according to your requirement) 
radio button and select the CSV file with user data.
    <!--![import-from-spread-sheet-sendgrid]({{base_path}}/assets/img/tutorials/import-from-spread-sheet-sendgrid.png) -->
5. Map **CSV data fields** with **Sendgrid data fields**. **Skip** unwanted data fields.
6. Click **Next: Add Contacts**.
7. Click **Done**. 
8. Now you can view the uploaded user list in the **Contacts** section.
