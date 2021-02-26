# Managing Challenge Questions

A main part of account recovery is setting up challenge or security
questions for user accounts. With the WSO2 Identity Server, you can set
up challenge questions in different languages using one of the following
methods:

The following tutorial guides you through a sample scenario of setting
up a set of challenge questions for password recovery. Follow the
instructions to set up.

### Adding a challenge question set

1.  Start the Identity Server and log in to the management console using
    admin/admin credentials.
2.  Navigate to the **Main** tab and click on **Add** under **Challenge
    Questions.**
3.  Click **Add New Challenge Question Set** and fill in the following
    fields to add a new set of challenge questions.

    !!! info 
        When adding a new challenge question set, you have to add the first
        challenge question of the set along with it.

    | Field                     | Description                                                                                                                              | Sample Value    |
    |---------------------------|------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
    | Challenge Question Set Id | This is a text field that enables you to specify the question set Id. This Id can only contain alpha numeric characters.                 | Set1            |
    | Challenge Question Id     | This text field allows you to enter the question Id of the first question in the set. This Id can only contain alpha numeric characters. | Q1              |
    | Challenge Question Locale | This dropdown field enables you to select the language the challenge question will appear in.                                            | Spanish         |
    | Add Challenge Question    | Add the first challenge question of the set.                                                                                             | Place of birth? |

    ![new-challenge-question-set](../assets/img/using-wso2-identity-server/new-challenge-question-set.png)

4.  Click **Add** and you will be redirected to the following screen,
    which displays the newly added question set.  
    ![add-new-questions](../assets/img/using-wso2-identity-server/add-new-questions.png)

#### Claim mapping for the challenge question set

For each challenge question set that you create, create claims to store
the answers to the questions in the set. To do this, follow the steps
below.

1.  After clicking the **Add** button, the screen that appears will
    contain the fully qualified name of the challenge question set. In
    the example above, the **Set Id** is **"Set1",** therefore the fully
    qualified name of the set is http://wso2.org/claims/Set1.
2.  Navigate to **Claims\>Add** and click **Add Local Claim**.
3.  Enter the following details and select the **Supported by Default**
    checkbox to map the challenge question set to a claim in the user
    store. Click **Add**.

    !!! tip
    
        **Tip:** Since the first challenge question of the set was "Place of
        birth?", in this example the mapped attribute of the PRIMARY user
        store is "location".
    

    -   **Claim URI:** http://wso2.org/claims/Set1
    -   **Display Name:** Challenge Question Set 1
    -   **Description:** xxx
    -   **Mapped Attribute-User Store Domain Name:** PRIMARY
    -   **Mapped Attribute-Mapped Attribute:** location

    ![adding-local-claim](../assets/img/using-wso2-identity-server/adding-local-claim.png)

### Adding a challenge question

1.  Click on **Add** under **Challenge Questions** and then click **Add
    Challenge Question**.
2.  Fill in the following details and click **Add**.

    | Field                            | Description                                                                                                                                  | Sample Value                |
    |----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|
    | Challenge Question Set Id        | This is a dropdown field that allows you to select the Id of the challenge question set to which the new challenge question should be added. | http://wso2.org/claims/Set1 |
    | Add Locale Mapping to a question | Select **Yes** if you are adding an existing challenge question in another language.                                                         | No                          |
    | Challenge Question Id            | This text field enables you to enter a unique Id for the challenge question.                                                                 | Q2                          |
    | Challenge Question Locale        | Select the language that the challenge question is in using the dropdown.                                                                    | English                     |
    | Add Challenge Question           | The challenge question.                                                                                                                      | Favourite food?             |

    ![challenge-question-details](../assets/img/using-wso2-identity-server/challenge-question-details.png)

3.  Click **Add** to add the challenge questions

### Add locale mapping to a question

The first challenge question added in the example above is in English.
To add the same challenge question in another language (e.g., French),
follow the steps below.

1.  Login to the management console using admin/admin credentials.
2.  Click on **Add** under **Challenge Questions** and then click **Add
    Challenge Question**.
3.  Select the relevant challenge question set, e.g.,
    http://wso2.org/claims/Set1, and select **Yes** for the **Add
    Locale Mapping to a question** field.

4.  Enter the same **Challenge Question Id** (Q1) and select the
    **Challenge Question Locale** as **French**.
5.  Enter the Q1 challenge question in French, click **Add**, and click
    **Finish**.  
    ![q1-challenge-question](../assets/img/using-wso2-identity-server/q1-challenge-question.png)
6.  Click on the **Edit** button corresponding to the relevant set (
    http://wso2.org/claims/Set1). You will see Q1 listed twice in the
    two different languages as seen below.  
    ![q1-in-different-languages](../assets/img/using-wso2-identity-server/q1-in-different-languages.png)
7.  Click **Finish**.
8.  Click on **List** under **Claims** and select
    <http://wso2.org/claims.>
9.  Select the **Locality** claim and click **Edit**. Select the
    **Supported by Default** checkbox and click **Update**.
10. Logout as admin and login as a user with user profile management
    permissions.
11. Click on **List** under **Users and Roles** and then select
    **Users**.
12. Click on the **User Profile** button corresponding to the logged in
    user.  
    ![click-on-user-profile](../assets/img/using-wso2-identity-server/click-on-user-profile.png)
13. Enter the language code as **fr\_fr** to set language as French for
    the **Locality** field and click **Update**.

!!! info "Try it out!"

    Login to the my account ( https://localhost:9443/myaccount ) as the user
    you configured in step 12 above, e.g.,kim, and click **View Details**
    under **Account Recovery**. Only the questions matching the locale set
    in the user profile appears (in this example, only the French question
    will appear).  
    Example:  
    ![verify-locale-question](../assets/img/using-wso2-identity-server/verify-locale-question.png) 

### Editing/updating a challenge question

1.  Log in to the management console using admin credentials.
2.  Click on **List** under **Challenge Questions** and click on the
    **Edit** button corresponding to the relevant challenge question set
    ( <http://wso2.org/claims/Set1)>.
3.  Click on the **Edit** button corresponding to the challenge question
    you want to edit.
4.  The field will turn yellow. Edit the question and click **Update**
    to save changes.
5.  Click **Finish**.  
    ![update-question](../assets/img/using-wso2-identity-server/update-question.png) 

### Making challenge questions mandatory

As an Identity Server administrator, you can make it mandatory for your
identity management solution to have challenge questions as an
additional form of security and account management.

1.  Log in to the management console using admin credentials.
2.  In the **Identity** section of the **Main** menu, click **Resident**
    under **Identity Providers**.
3.  Navigate to **Account Management Policies>Account Recovery**.
    Select the **Enable forced challenge questions** setting to
    make this mandatory.
4.  Provide **Minimum Number of Forced Challenge Questions to be Answered**.
    ![enable-challenge-questions-in-login-flow.png](../assets/img/using-wso2-identity-server/enable-challenge-questions-in-login-flow.png)
    
After enabling the above setting, users are redirected during the login
process to the following page (redirection happens only if the user has
not given answers for the minimum number of forced challenge questions).
    ![answering-challenge-questions.png](../assets/img/using-wso2-identity-server/answering-challenge-questions.png)

### Validating challenge question answers

Configuring a regex pattern for challenge question answers will ensure the uniqueness of an answer and can ensure that more than one question does not have the same answer. To configure a regex pattern for challenge questions answers and validate the answers based on the given regex, follow the instructions below. 

1. Log in to the management console using admin credentials.
2. Under the **Identity** section of the **Main** menu, click **Resident** under **Identity Providers**.
3. Navigate to **Account Management Policies>Account Recovery**.
4. Add the required challenge answer regex under the **Challenge question answer regex** field.
5. Select **Enforce challenge question answer uniqueness** to validate the challenge answer's uniqueness.

![validating-challenge-question-answers.png](../assets/img/using-wso2-identity-server/validating-challenge-question-answers.png)

Alternatively, you can enable this server-wide instead of tenant-wise by adding the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

``` toml
[identity_mgt.password_reset_challenge_questions]
answer_regex = “$answer_regex”
enforce_answer_uniqueness = true
```
