# Using Workflows with User Management

The WSO2 Identity Server enables you to have more control over the tasks
that are executed in it by using workflows. This is particularly useful
in a scenario where you are approving user accounts in the Identity
Server. Workflows provide you with the flexibility to configure this
approval process in the way that suits your scenario. For instance, you
can configure workflows to do the following.

-   **User specific approvals** : You can configure a specific user to
    approve the user account. For example, you may want only the user
    named "Bob" to approve accounts.
-   **Multi-step approvals** : You can  configure multiple steps for
    approval, where the approval is first done by one user and then by
    another user. For example, you need "Alex" to approve the accounts
    first and then "Sam" to approve the account creation. So Sam
    gets the approval requests sent once Alex has approved an
    account.
-   **Multiple role approvals** : Here you need multiple levels of
    authority to approve the creation of a user account. To expand,
    suppose you require approval from both a manager and a senior
    manager, this can be set up using workflows. For example, all users
    with the "HR Manager" role can initially act on account approval
    requests before these approval requests are sent to all users with
    the "Senior HR Manager" role as a second step.  

**Related Topics**

-   See [Workflow Management](../../learn/workflow-management) for details on how
    to configure workflows and how to configure the approval process.
