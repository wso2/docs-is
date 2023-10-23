# Users

A user is the digital representation of a physical user who interacts with applications. A user can be a digital identity of a human or a machine. A user can be recognized by a number of attributes. These are called **user attributes**. User attributes are data that defines the user, i.e., anything the user is, owned by, or associated with.

A unique **user account** is created for each user. Then they are assigned roles with a certain set of permissions. Roles and permissions will be discussed in the [next section]({{base_path}}/references/concepts/user-management/roles-and-permissions). 

In this section, let's look at the various ways users can be configured and managed. 

---

## Add users

Users can be created and added to a user management console in more than one way. Following are a few ways users can be created or added. 

- Using the user management console - Here, the user is created by the admin using the user management application. 

- Using the ask password option - This option is widely preferred because the admin does not have to remember the passwords of created users. This can be done by prompting the user to create a password for themselves while being onboarded. Alternatively, administrators on-boarding user accounts to the system create a default password, send an email link to the user with the created account, and ask the user to confirm the correctness of the account created by the admin. 

- Using SCIM APIs - Users can be added to the user management system by giving the necessary user details as input values in a SCIM request. 

- Self-registration - Users can register themselves using the self-sign up portal. This is convenient to both the user and the admin.  

- Importing users in bulk - In addition to manually adding individual users, multiple users can be imported in bulk. This is usually done by first exporting all the relevant user details to a comma-separated values (.csv) file or Microsoft Excel (.xls) file, and then importing this file with all the information to the user management system. 

---

## Update users

User details might need to be updated from time to time to maintain the precision of data in the user management system. For example, when the user communicates a change in any of the user profile details such as the user's email address or phone number, it can be updated by the admin using the user management console, or a SCIM request with the new values. It can also be updated by users themselves if there is a My Account application provided by the user management system. 

---

## Search users 

Once users have been added to the system, they can be searched via the console, or using SCIM requests. A number of filters can be used to find a user or multiple users faster. For example, entering a username pattern will provide all the usernames that match that pattern in the search result. 

---

## Delete users 

Employees leave an organization from time to time. When an employee leaves an organization, the admin no longer needs to maintain the user account of that employee. Deleting a user account must be done with care since this can be an irreversible action in most systems. To mitigate risks, most user management systems provide a tracking log for user deletion activities. 


!!! info "Related topics" 
    - [Guide: Add a User]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow)
    - [Guide: View and Update User Profiles]({{base_path}}/guides/identity-lifecycles/update-profile)
    - [Guide: Import Users]({{base_path}}/guides/identity-lifecycles/bulk-import-users)
    - [Guide: Search for Users]({{base_path}}/guides/identity-lifecycles/search-users)
    - [Guide: Delete an Existing User]({{base_path}}/guides/identity-lifecycles/delete-users)
    - [Concept: Roles and permissions]({{base_path}}/references/concepts/user-management/roles-and-permissions)
    - [Concept: Userstores]({{base_path}}/references/concepts/user-management/userstores)
    - [Concept: Realms]({{base_path}}/references/concepts/user-management/realm)
