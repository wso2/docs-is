To test the scenario, update the user's profile with sensitive claim values such as department, email, and phone number.
You can perform this update either through the Console (administrator update) or the My Account application (
self-update) to verify that the department validation is working and that an email is sent via the SMTP server.
Additionally, test with invalid department values to ensure the implementation handles errors as expected.

#### Console (administrator update)

Log in to the Console application using the administrator account, navigate to **User Management > Users**, select a
specific user, and update the profile with sensitive attributes such as department, email address, and phone number.

![User Profile Update Console]({{base_path}}/assets/img/complete-guides/actions/image17.png)

#### My Account (self-update)

Log in to the My Account application using a specific user, navigate to **Personal Info > Change Password**, and update
the profile with sensitive attributes such as department, email address, and phone number.

![User Profile Update My Account]({{base_path}}/assets/img/complete-guides/actions/image18.png)
