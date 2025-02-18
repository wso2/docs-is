# Manage conflicts in organizations

Now you can manage OAuth2 Applications and Roles inside the organizations. When managing these entities from the 
organizations, organizations can have two types of entities.

- Entities which are created when sharing
- Entities which are managed directly in organizations

## Entities which are created when sharing

Root organizations can share applications with the organizations. This process will create the corresponding applications 
and the associated roles in the organization.

## Entities which are managed directly in organizations

Organizations can have their own OAuth2 applications and roles that can be associated with those OAuth2 applications 
managed in the organization.

Since now both above entity types can be available in the organization level, there can be scenarios where these entities 
might lead to conflicts because of the name of the entities.

## Manage role conflicts in organization

Followings are the scenarios where organizations may face conflicts of role creation.

- Root organization has an application which has the role audience as `organization`. This app has a role `User Manager`. 
A role with the same name is available in the organization. If the root organization application is shared in this situation,
then the application will not be shared with the particular organization since in the organization, there is already a role 
with the name `User Manager` in the organization audience. If there are multiple organizations and if other organizations does 
not have this scenario, then the application sharing will proceed with the role creation.

- Root organization has an application which has the role audience as `organization` and this application is shared with the 
organizations. One of the organizations has a role named as `Group Manager` inside the organization. Root organization creates 
an organization audience role called `Group Manager` and it will be automatically shared to the organizations. Since one of the 
organizations has the `Group Manager` role, the shared role will not be created inside that organization. For other organizations 
which does not have this scenario, this role creation will proceed.

- Root organization has an application which has the role audience as `organization` and this application is shared with the 
organizations. One of the organizations has a role named as `Role Manager` inside the organization. Root organization renaming 
an existing role which is associated with the application to `Role Manager`. Since there is a role with the same name in an 
organization, this renaming will not propagate to that particular organization. If there are multiple organizations and if other organizations does not have this scenario, then the role name renaming will proceed in those organizations.

{% if product_name == "Asgardeo" %}

If any of the above conflicting scenarios occurred, there will be a `AUDIT` log printed to the carbon log file mentioning the 
conflict and other related details. There are several options that can be done to resolve this conflicts.

{% else %}

If any of the above conflicting scenarios occurred, there will be a `WARN` log printed to the carbon log file mentioning the 
conflict and other related details. There are several options that can be done to resolve this conflicts.

{% endif %}

- Change the role name to a non conflicting role name from the root organization.
- Change the role name to a non conflicting role name from the organization which the conflict was occurred.
