# Sample Scenario

**Pickup** is a cab company that has many employees who use different
credentials to sign in to different internal enterprise applications.
Following are two such applications:

-   **Pickup Dispatch** : This application helps manage the overall
    operations at Pickup.
-   **Pickup Manager** : This application helps allocate vehicles to
    drivers.

**Cameron** is a senior manager. **Alex** is a junior manager
attending day-to-day tasks and **Rowan** is the HR manager.

## Use cases

You are **Cameron** and you are tasked with the following.

- Employees need to remember multiple credentials when logging in to the many applications of **Pickup**. Unify logins for employees with <a href="single-sign-on">**Single Sign-on**</a> so that employees will only have to remember a single password.

- Secure applications with an additional layer of security using <a href="multi-factor-authentication">**Multi-Factor Authentication**</a>

- External consultants have to work on **Pickup** apps on a temporary basis. It is a hassle to create and delete accounts for them in the database. Log them in with their own accounts in an external identity provider using <a href="federated-authentication">**Federated authentication**</a>.

- With the expansion of **Pickup**, Rowan is having a hard time creating accounts for each and every employee joining the organization. Let new employees create their own accounts to speed up the process using <a href="self-sign-up">**Self Sign-up**</a>

![QSG overall scenario](/../assets/img/get-started/qsg-overall-scenario.png)
