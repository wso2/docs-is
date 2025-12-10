# Configure External Authentication Service for On-demand Silent Password Migration with Choreo

{{ product_name }} supports on-demand silent password migration, where a migrated user's password can be seamlessly migrated to {{ product_name }} on-the-fly without forcing the user to reset the password. This involves configuring an external authentication service that communicates with the legacy IdP to authenticate users. This guide explains how you can configure the external authentication service in WSO2's integration platform, [Choreo](https://wso2.com/choreo/){target="_blank"}.

!!! note
    Learn more on [on-demand silent password migration]({{base_path}}/guides/users/migrate-users/migrate-passwords/).

### Prerequisites

Before you begin, ensure the following are fulfilled.

- Ensure your legacy IdP provides means to perform basic user authentication (i.e. username and password authentication). For example, a SCIM2/Me REST API endpoint that could be authenticated with username and password.
- You need to have a Github repository to host the authentication service.
- Download [Ballerina](https://ballerina.io/downloads/){target="_blank"}, the programming language used to define the external authentication service.

{% include "../../../../../includes/guides/fragments/migrate-users/configure-choreo-for-password-migration.md" %}
