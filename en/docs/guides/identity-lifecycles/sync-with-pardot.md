# Exporting WSO2 Identity Server User Information to Pardot

Pardot is a software as a service (SaaS) marketing automation platform by SalesForce offering email automation,
targeted email campaigns, and lead management for B2B sales and marketing organizations. This topic provides 
instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to the Pardot. 

Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/identity-lifecycles/sync-account-overview).

## Try it Out

1. Login to [Pardot](https://pi.pardot.com/).
2. Navigate to **Admin > Import > Prospects**.
    <!--![import-prospect-in-paradot]({{base_path}}/assets/img/tutorials/import-prospect-in-paradot.png) -->
3. Click **+ Upload File** and choose the created `users.csv` file.
    <!--![upload-file-in-paradot]({{base_path}}/assets/img/tutorials/upload-file-in-paradot.png) -->
4. Once the file gets uploaded successfully, Click **Next**.
   <!-- ![proceed-after-file-uploading-paradot]({{base_path}}/assets/img/tutorials/proceed-after-file-uploading-paradot.png) -->
5. Map the column headers to the Pardot fields. Pardot suggests some field mappings.
   <!-- ![map-fields-in-pardot]({{base_path}}/assets/img/tutorials/map-fields-in-pardot.png) -->
6. Complete the **Campaign and Add Tags** and **Action** sections according to your requirement.
7. Confirm user import.
