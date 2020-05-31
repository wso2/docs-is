#Exporting WSO2 Identity Server User Information to Salesforce

Salesforce is a customer relationship management solution that brings companies and customers together. 
This topic provides instructions on exporting user data from WSO2 Identity Server (WSO2 IS) to the Salesforce marketing 
platform. 

Let's get started!

!!! tip "Before you begin!"
    Create **users.csv** file by following the instructions in 
    [Exporting User Data From WSO2 Identity Server](../learn/exporting-user-data-from-wso2-is.md).

##Try it Out

1. Login to [Salesforce](https://developer.salesforce.com/).

2. Go to **Setup -> Platform tools > Integration > Data Import Wizard**. 
   
    ![setup-in-salesforce](../assets/img/tutorials/setup-in-salesforce.png) 
   
    ![data-import-wizard-in-sales-force](../assets/img/tutorials/data-import-wizard-in-salesforce.png)

3. Click on **Launch Wizard**.
    ![launch-wizard-in-salesforce](../assets/img/tutorials/launch-wizard-in-salesforce.png)
   
4. Configure the import and upload the created **users.csv** file and click **Next**.
    ![upload-csv-in-salesforce](../assets/img/tutorials/upload-csv-in-salesforce.png)
   
5. Then you will be directed to the **Edit Field Mapping** page, there you can map CSV file columns to Salesforce data 
fields.
    ![edit-field-mapping-in-salesforce](../assets/img/tutorials/edit-field-mapping-in-salesforce.png)
   
6. After verifying the **Review** page information, click on **Start Import**.

7. You can check the status of your import **Recent Import Jobs** tab in the **Data Import Wizard** page.
