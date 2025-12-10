# Exporting WSO2 Identity Server User Information to Sendgrid

SendGrid is a cloud-based service that assists businesses with email delivery. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to Sendgrid Email Delivery
platform.

Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/users/sync-user-accounts/sync-account-overview).

## Try it Out

1. Login to [Sendgrid](https://sendgrid.com/).
2. Click **Contacts** under **Marketing**.
3. Click **Upload CSV** under **Add Contacts**.
4. Upload the created `users.csv` file with the exported data and click **Next: Review CSV Upload**.
5. Map **CSV data fields** with **Sendgrid data fields**. **Skip** unwanted data fields.
6. Click **Next: Add Contacts**.
7. Click **Done**. 
8. Now you can view the uploaded user list in the **Contacts** section.

For more information on Sendgrid data import, see [Create and Manage Contacts](https://www.twilio.com/docs/sendgrid/ui/managing-contacts/create-and-manage-contacts)
