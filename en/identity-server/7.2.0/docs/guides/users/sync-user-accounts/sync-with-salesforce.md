# Exporting WSO2 Identity Server User Information to Salesforce

Salesforce is a customer relationship management solution that brings companies and customers together. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to the Salesforce marketing 
platform. 

Let's get started!

!!! tip "Before you begin!"
    Create the `users.csv` file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server]({{base_path}}/guides/users/sync-user-accounts/sync-account-overview)).

## Try it Out

1. Login to [Salesforce](https://developer.salesforce.com/).

2. Go to **Setup -> Platform tools > Integration > Data Import Wizard**.
3. Click on **Import My Data** and then click on **Start**.
4. Select user kind.
    - Leads
    - Contacts
    - Accounts
5. Select user type.
    - Other Companies
    - Individuals
6. Select **I have a .csv file**.
7. Upload the created `users.csv` file.
8. Review your  import and click on **Import**.
9. Upon successful import, click on **Done**.

For more information on Salesforce data import, see [Salesforce Data Import](https://help.salesforce.com/s/articleView?id=sf.importing.htm&type=5).
