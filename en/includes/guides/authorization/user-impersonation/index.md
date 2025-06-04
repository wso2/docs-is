# User Impersonation

User impersonation enables an authorized user to act on behalf of another user. This feature proves useful for administrators or support personnel who need to perform tasks without requiring the credentials of the end user.

### User session impersonation

Once you start impersonation from either of the given methods, the user session becomes an impersonated session. This means the impersonating actor can get single sign-on (SSO) into other [impersonation-authorized applications]({{base_path}}/guides/authorization/user-impersonation/via-console/#step-3-configure-business-application-to-perform-impersonation) if the impersonating actor has the [necessary permission to perform impersonation]({{base_path}}/guides/authorization/user-impersonation/via-console/#create-impersonator-application-role) using the application.

This guide explains how to enable user impersonation in {{product_name}}.

You can start user impersonation in two ways:

   1. [Via the Console]({{base_path}}/guides/authorization/user-impersonation/via-console)

   2. [Via a Business Application]({{base_path}}/guides/authorization/user-impersonation/via-business-application)
