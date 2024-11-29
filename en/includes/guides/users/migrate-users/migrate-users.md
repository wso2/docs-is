# Migrate user accounts to {{ product_name }}

This guide explains how you may prepare and execute a user migration from another Identity Provider (IdP) to {{ product_name }}.

## Prepare for migration

Before migrating users to {{ product_name }}, organization owners must adequately plan and prepare for a smooth transition. This ensures that you identify the risks and challenges associated with the migration process. When planning for a migration, be sure to go through with the following steps.

- **Assess company and legal requirements**

    Ensure you are operating within the limits imposed by your company policies and regulations involving Personally Identifiable Information (PII) and other user data.

- **Assess current user data**

    Conduct a comprehensive analysis of the existing user data in the legacy system. Determine the number of users, their roles, attributes and associated permissions. Clearly identify which user attributes are PII and which user attributes should remain confidential.

- **Define migration goals**

    Clearly define the migration objectives and goals. Determine why you are migrating and what outcomes you aim to achieve. Decide on what types of users you will maintain in the new system, and the number of users belonging to each type. Also decide on what attributes you need to migrate to the new system. This will help you estimate the time required for the migration and optimally allocate resources.

- **Evaluate migration strategies**

    {{ product_name }} facilitates one-time migration of user profiles. Once migrated, users' login credentials can be migrated through either a forced password reset or an on-demand silent password migration. Evaluate these strategies and determine the best option for your requirements.

- **Create a migration plan**

    Prepare a comprehensive migration plan by considering the following aspects.

    - Identify how you want your users to experience the migration.
    - Identify the acceptable user impact.
    - Define the attribute mappings between the legacy system and {{ product_name }}. Consider the data types, data lengths, uniqueness, whether each attribute is required or optional and any necessary transformations before migrating to the new system.
    - Identify the risks and challenges associated with the migration process such as data loss, compatibility issues, service disruptions, etc.
    - Establish a clear migration timeline considering milestones, downtime windows and peak usage periods.

- **Test the migration plan**

    Execute the migration plan over a realistic test data set. This will help reveal any issues that may arise during the migration process so that they may be addressed before the actual migration.

With a clear and concise plan in place, you are ready to move on to the implementation.

## Migrate user accounts

{% if product_name == "Asgardeo" %}

Contact the Asgardeo team at **asgardeo-help@wso2.com** for support on migrating your existing user base to Asgardeo. Additionally, inform the team how you would like to [migrate user passwords]({{base_path}}/guides/users/migrate-users/migrate-passwords/).

!!! note
    Make sure to request using the email address registered with an owner account or an administrator account.

{% else %}

{{ product_name }} supports bulk importing multiple users, which can be used for the user migration. See how to [onboard multiple users]({{base_path}}/guides/users/manage-users/#onboard-multiple-users/). However this will ask users to set their own passwords for the new system.

If you need to migrate existing user passwords as well, {{ product_name }} supports [on-demand silent password migration]({{base_path}}/guides/users/migrate-users/migrate-passwords/#migrate-with-on-demand-silent-migration/) which allows users to log in with their existing passwords and silently migrate them to the new system. For this you can use the [SCIM 2.0 Bulk API]({{base_path}}/apis/scim2/scim2-bulk-rest-api/). Below is a sample request to import the users.

```java
curl -i -X POST --location 'https://localhost:9443/scim2/Bulk' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--header 'Content-Type: application/json' \
--data-raw '{
"failOnErrors": 1,
"schemas": [
  "urn:ietf:params:scim:api:messages:2.0:BulkRequest"
],
"Operations": [
  {
    "method": "POST",
    "path": "/Users",
    "bulkId": "ytrewq",
    "data": {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
      ],
      "userName": "jesse",
      "password": "random",
      "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
        "askPassword" : "false"
      }
    }
  }
]
}'
```

!!! note

    This method requires setting a random password for the user accounts initially. We recommend setting a strong random password for each user account that will get updated during the silent password migration process.

{% endif %}
