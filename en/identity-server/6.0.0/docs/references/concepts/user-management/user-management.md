# Introduction to User Management 

## The importance of user management 

User management, in simple terms, is a process of efficiently managing users within a userstore. User management is vital for any application since a user who is not authenticated and/or authorized properly will not be able to access the application and use it in a way that serves the user's requirements. On the other hand, users might be bombarded with unnecessary features of the application and information if the application cannot provide them with a filtered version as per their needs. 

With regulations like GDPR and CCPA that focus on privacy aspects to a huge extent, users' information should be stored in a secure manner and users who do not have the requirement to handle other users' data should be restricted access to any user data apart from theirs.

Managing users was an admin's task a few years ago. With dynamic cloud applications and on-premise applications that target scalability rising exponentially, this is no longer possible. Most of the applications have thousands of users logging in each day with different requirements and access levels. This is where user management comes into picture. 

WSO2 Identity Server provides the user management functionality which is **role-based**. This will be discussed further in the next section. In a typical organization, there are several employees who are responsible for accomplishing a versatile set of tasks on a daily basis with the help of different applications. Most of the time, even the same application is used in different ways by employees who have different job roles. Managing who accesses which application for what purposes can be an overhead for the administration. This is why user management is important. 

---

## Functions of user management

A user management implementation involves a wide range of functionality such as adding/deleting users, controlling user activity through permissions, and managing user roles. 

User management enables: 

- Defining users
- Managing users 
- Defining roles 
- Managing roles
- Managing access levels of the users


To understand user management, we need to first understand certain terminologies that are elaborated further in this section. 

- [Users]({{base_path}}/references/concepts/user-management/users/)

- [Roles and Permissions]({{base_path}}/references/concepts/user-management/roles-and-permissions/)

- [Userstores]({{base_path}}/references/concepts/user-management/userstores/)

- [Realms]({{base_path}}/references/concepts/user-management/realm)

!!! info "Related topics"
    - [Guide: Onboard Users]({{base_path}}/guides/identity-lifecycles/onboard-overview/)
    - [Guide: Manage Users]({{base_path}}/guides/identity-lifecycles/manage-user-overview/)
    - [Guide: Manage Roles]({{base_path}}/guides/identity-lifecycles/manage-roles-overview/)
    
