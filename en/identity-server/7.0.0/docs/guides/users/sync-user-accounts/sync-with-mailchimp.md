# Exporting WSO2 Identity Server User Information to MailChimp


MailChimp is an all‑in‑one Marketing Platform. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to MailChimp. 


Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/identity-lifecycles/sync-account-overview).
    
## Try it Out

1. Log in to your [MailChimp](https://mailchimp.com/) account and click **Audience** section.

2. Under **Add Contacts** click on **Import Contacts**.
<!--![]({{base_path}}/assets/img/tutorials/mailChimp-user-provisioning/step-2.png)-->

3. Select **CSV or tab-delimited test file**
<!--![]({{base_path}}/assets/img/tutorials/mailChimp-user-provisioning/step-3.png)-->

4. Browse the exported `users.csv` where all the users in WSO2 Identity Server are listed and proceed with the wizard.
<!--![]({{base_path}}/assets/img/tutorials/mailChimp-user-provisioning/step-4.png)-->

5. Map each attribute in the .csv file to corresponding fields that match the MailChimp user attributes. 
If you wish to exclude some attributes, click **Skip**.
<!--![]({{base_path}}/assets/img/tutorials/mailChimp-user-provisioning/step-5.png)-->

6. Follow the import wizard to continue with importing user accounts.

7. Once the import is complete, you can see the created users under the MailChimp **Audience** tab.
<!--![]({{base_path}}/assets/img/tutorials/mailChimp-user-provisioning/step-7.png)-->
