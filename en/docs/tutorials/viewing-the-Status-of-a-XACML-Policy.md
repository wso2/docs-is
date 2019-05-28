# Viewing the Status of a XACML Policy

You can view the current status of an XACML policy using the
instructions in this topic.

1.  Sign in. Enter your username and password to log in to the
    [Management Console](_Getting_Started_with_the_Management_Console_)
    .
2.  Navigate to the **Main** menu to access the **Entitlement** menu.
    Click **Policy Administration** under **PAP** .
3.  The policies that you created are listed in the **Available
    Entitlement Policies** table. Click **View Status** to check the
    current status of the policy you require.  
    ![](attachments/103331210/103331211.png){width="750"}
4.  The resulting page lists out the following information as follows.  
    ![](attachments/103331210/103331213.png?effects=border-simple,blur-border){width="750"}  
    The following are the status details of the policy:  
    -   **Time Stamp** - This is the timestamp of the action performed.
    -   **Action** - The action performed by the user.
    -   **Performed By** - User or tenant that performed the action
    -   **Target** - Where the policy is located.
    -   **Target Action** - The action that is performed to the policy.
    -   **Status** - Indicates whether the action was successful or not.
    -   **Details** - Provides details on certain actions.

!!! note
    
    **Note** : The **Policy Status Type** lists out all the possible actions
    that can be performed by a user. This is available so that you can
    filter out the status details according to the action performed by the
    user.
    
    ![](attachments/103331210/103331212.png?effects=border-simple,blur-border){height="250"}
    
    Currently available policy status types:
    
    -   **ADD\_POLICY** : This is the action done by the user when adding a
        new policy.
    -   **UPDATE\_POLICY** : This is the action done by the user when
        editing a policy.
    -   **GET\_POLICY** : This is the action done by the user when viewing a
        policy.
    -   **DELETE\_POLICY** : This is the action done by the user when
        deleting a policy.
    -   **ENABLE\_POLICY** : This is the action done by the user to enable
        the policy from the PDP.
    -   **PUBLISH\_POLICY** : This is the action done by the user when
        publishing to the PDP.
    
