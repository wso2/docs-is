# Configuring Multi-Tenancy

The goal of multitenancy is to maximize resource sharing by allowing multiple users (tenants) to log in and use a single server/cluster at the same time, in a tenant-isolated manner. For more information, see [Introduction to Multitenancy](../../administer/introduction-to-multitenancy).

## Scenario

A taxi company called "Pickup" is expanding into the food delivery business and opening a new segment called "PickupEats". Pickup now has two separate business models; one for PickupEats and one for PickupTaxis. Employees and customers will still be using the same Pickup application for both services, but Pickup wishes to manage their users in two isolated environments and have different settings/policies for each. 

In order to do this, Pickup can set up two tenants that share access to the same application but are isolated, so that PickupEats and PickupTaxis can function as two separate segments. This concept is called **multi-tenancy**.  This tutorial demonstrates multi-tenancy in WSO2 Identity Server. 

## Create a tenant

1. [Download WSO2 Identity Server](https://wso2.com/identity-and-access-management/).

2. Navigate to `<IS_HOME>/bin` directory via a command prompt and start the server by executing one of the following commands.

    ``` java tab="Linux/MacOS"
    sh wso2server.sh
    ```

    ``` java tab="Windows"
    wso2server.bat run
    ```

3. Access the [WSO2 Identity Server Management Console] (https://localhost:9443/carbon) as an administrator (credentials: admin/admin).

4. On the **Configure** tab of the Management Console, click **Add New Tenant**. 

5. Enter the following tenant details.
    1. `Domain`: pickup-eats.com
    2. `Usage plan for the tenant` - Demo
    3. `First Name` - Jane
    4. `Last Name` - Doe
    5. `Admin Username` - jane@pickup-eats.com
    6. `Admin Password` - jane123
    7. `Email` - janedoe@gmail.com

You have now successfully created a tenant for PickupEats. 
    
Repeat steps 4-5 and create a tenant called "pickup-taxis.com" with different admin credentials. 

## Add users

You can now log in to each tenant using the relevant tenant admin's credentials and create users and roles in the tenant. Note that you are managing two separate sets of users and roles for each tenant using one instance of WSO2 Identity Server.

1. Sign out of the Management Console and sign in using the `pickup-eats` admin credentitals.

    - `Username:` jane@pickup-eats.com
    - `Password:` jane123

2. Create a new user called **Cameron**. For instructions on how to create a user, see [Adding Users and Roles](../../learn/adding-users-and-roles#create-a-user). 

You have succesfully created a user in the `pickup-eats` tenant. Now repeat step 1-2 and create a user in the `pickup-taxis` tenant as well. 

## Try it out

1. Log in to the [WSO2 Identity Server User Dashboard](https://localhost:9443/dashboard) using the pickup-eats user credentials.

    - `Username:` cameron@pickup-eats.com
    - `Password:` cameron123

2. Next, log out and log in using the `pickup-taxis` user credentials. 

    - `Username:` alex@pickup-taxis.com
    - `Password:` alex123

Note the relevant tenant domain appended to the user name of each user. You have successfully configured two separate tenants for PickupEats and PickupTaxis with shared access to the dashboard application.






