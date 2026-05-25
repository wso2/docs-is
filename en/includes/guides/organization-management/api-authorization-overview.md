# API authorization for organizations

{{ product_name }} allows organizations to authorize user access to an application's API resources based on the API permissions, roles, and groups assigned to the users. See [API authorization]({{base_path}}/guides/api-authorization/) for more information.

API resources are created and authorized for applications on the organization (root). If the application consuming the API resources is shared with the organization, all application-specific configurations of API resources are inherited by the organization.

{% if product_name == "Asgardeo" %}
![The relationship between terms]({{base_path}}/assets/img/guides/authorization/api-authorization/b2b-api-authorization.png){: width="700" style="display: block; margin: 0;"}
{% else %}
![The relationship between terms]({{base_path}}/assets/img/guides/authorization/api-authorization/b2b-api-authorization.png){: width="700" style="display: block; margin: 0;"}
{% endif %}

## Prerequisites

You need to configure your API resources on the organization (root):

1. [Register an API resource]({{base_path}}/guides/api-authorization/#register-an-api-resource)
2. [Authorize the API resource to an app]({{base_path}}/guides/api-authorization/#authorize-the-api-resources-for-an-app)
3. [Create roles and associate to application]({{base_path}}/guides/api-authorization/#associate-roles-to-the-application)
