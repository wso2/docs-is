# Basic Concepts

## Authentication ( log-in, sign-in)

Authentication, in simple terms, is the process of proving that you are who you say you are. Authentication plays an important role whenever you access an application or data whether you are logging into your email account, unlocking your phone with your fingerprint/face, or logging into your workstation at the office. In most common contexts, the terms 'user login' and 'user sign-in' are often used interchangeably to refer to this process of user authentication.

The process of authentication can be break down into several steps: 

- **Identification**: You tell the system or application who you are (e.g., by entering a username).

- **Proof**: You provide evidence to back up your claim (e.g., by entering a password).

- **Verification**: The system checks if your proof matches its records and determines if additional verification is necessary (e.g., comparing the stored password hash with the provided password).

- **Session**: If the verification is successful, you are authenticated, often resulting in the creation of a user session. From this point, the system decides whether access to the application or data is granted (e.g., viewing your emails).

The authentication process generally begins by identifying yourself to the system using a unique identifier linked to your user account. Traditionally, this identifier is a pre-registered easy to remember string called a username, but today, email addresses and phone numbers are also commonly used. Depending on the capabilities of your authentication system, you may be able to modify your identifier later or even use multiple identifiers. For example, most social media platforms allow you to log in using either your email address or phone number.

Authentication can be based on several factors, mainly three: 

- **Knowledge (Something you know)** - This factor is based on information that you know and can provide when prompted. The most common example is a password or PIN. Other forms can include answers to security questions or personal identification numbers.

- **Possession (Something you have)** - This factor involves something that you physically possess. Examples include a smartphone for receiving one-time passwords or using an authenticator app, a hardware token, smart card.  It relies on you having the item in your control.


- **Inherence (Something you are)** - This factor is based on your biological traits, commonly referred to as biometrics. Examples include fingerprints, facial recognition, retina scans, or voice recognition. This type of authentication verifies identity based on who you inherently are.

It's important to note that, despite still being widely used, password-based authentication is increasingly considered a bad practice due to security vulnerabilities and usability challenges like password fatigue. Some of the most critical cybersecurity breaches have been linked to password use. Fortunately, there are many passwordless alternatives available today, making it easier to move away from password-based authentication. If passwords are still used, it's crucial to enforce a strong password policy with adequate complexity and other best practices. Using two-factor authentication (2FA) alongside passwords is a popular method to reduce risks. If you are starting from scratch, adopting passwordless is one of the best security investments that you can make. There are a wide range of passwordless options available today including biometrics (fingerprint, face recognition), magic links, one time passwords and Passkey.

Another effective way to eliminate the need for managing your own password system is to rely on an existing identity provider for user authentication. Social media giants such as Facebook and Google, enterprise software like Microsoft and developer tools like GitHub, can serve as trusted identity systems. Additionally, some countries offer digital identity platforms that are available for use by commercial applications. If your organization has its own identity platform, it’s advisable to leverage that instead of implementing a separate authentication process.

In industries like finance, healthcare, and e-government, you'll often encounter the term "strong authentication". This refers to an authentication mechanism that is resilient against attacks and scams that could compromise system security.

### Multi-factor Authentication (MFA) and Two-factor Authentication(2FA) 

You can authenticate a user by combining more than one factor from the above-mentioned three primary categories:

- knowledge (something you know)
- possession (something you have)
- inherence (something you are). 
    
This is known as multi-factor authentication (MFA). Each factor introduces an additional layer of security, as the authentication process occurs in multiple steps. In each step, the user must successfully respond to a challenge tied to a different factor.

MFA is commonly used to achieve strong authentication. However, it's important to select authentication factors from different categories to ensure enhanced security. Using factors from the same category, like a password followed by a security question or PIN, offers little additional protection because all of them belong to the knowledge category (things you know). In contrast, pairing a password with SMS OTP (something you possess) is an example of a more secure MFA.

A variation of MFA allows users to choose their second authentication factor, such as selecting between an SMS OTP or using a passkey.

**Two-factor authentication (2FA)** is a subset of MFA, requiring exactly two factors. It is the most widely adopted MFA method in practice and provides an adequate level of security for most of the practical scenarios.

### Risk-Based Authentication (RBA)

When designing a strong authentication process using Multi-Factor Authentication (MFA), there are a few key challenges you might face:

- **Choosing the Right Number of Factors** - You need to decide how many factors to include to achieve strong authentication. Having too many can ruin the user experience, while simplifying the authentication factors too much can compromise security.

- **Adapting to Changing Security Risks** - The security risks your system faces aren't static. They vary depending on context. This means that relying on a fixed set of MFA options might not be enough for all situations. 

**Risk-Based Authentication (RBA)** addresses these challenges by dynamically assessing the risk level of each login attempt or user action in real-time. Based on this assessment, RBA adjusts the authentication process accordingly, enhancing security without compromising user experience. It analyzes contextual factors surrounding login attempts to determine the level of risk and prompts additional security challenges as necessary. For instance, you might be asked to provide an SMS OTP only when logging in from a new device or unusual location.

Contextual Parameters for RBA:

- Geolocation: Logging in from an unfamiliar or high-risk region.
- Device Information: Accessing the system from a new or unrecognized device.
- Temporal Factors: Time of access, day of the week, or time since last login.
- User Behavior: Analyzing typing patterns, navigation habits, or transaction frequency.
- Account Activity: Number of failed login attempts or sudden changes in activity.
- Transaction Details: Evaluating the value or type of transaction.
- Sensitivity of Accessed Resources: Importance of the data or system being accessed.
- Historical Data: Considering the user’s history of security incidents or suspicious behavior.

In addition to analyzing these contextual parameters, RBA can factor in user-specific attributes like assigned roles, group memberships, or demographic information. For example, if a minor logs into an application, further verification from a guardian might be required after the minor is authenticated.  

RBA is often used interchangeably with **Adaptive Authentication**, though some consider adaptive authentication as a subset of RBA. Sometimes, the term "conditional authentication" is also used interchangeably to refer to RBA. However, conditional authentication puts more emphasis on setting up specific conditions under which additional authentication factors are required based on the predefined rules or policies. 

In practice, the widely used approach is to use RBA to analyze the risk at the time of login. However, RBA can also be used after login in the following scenarios: 

- **Step-up authentication** - When you are performing an action involving high risk, such as transferring funds from your bank account or updating the user profile information, the systems can evaluate your current assurance level which is also known as current level of assurance (LoA). If it’s insufficient, RBA can be used to elevate the level of assurance by prompting for additional security challenges within the same session. Step-up authentication facilitates access to basic features with minimal authentication and adds more layers as needed.  

- **Re-authentication** - When you are logged into an application but stay inactive for sometime or when you have not authenticated recently, the system may want to verify whether the user is still present at the device especially when performing high-risk actions. At that moment, depending on the idle period, time since last authentication and severity of the action, the system can prompt you to re-authenticate and start a new session. For example, an on-line store may allow you to browse their catalog, save items as favorites and add them to the cart for several days but when you are trying to check them out you are asked to authenticate again. 

- **Continuous authentication** - Generally, once you are authenticated and a session is created, you are treated as a legitimate user as long as the session is valid. However, when adopting modern security standards such as Zero Trust Architecture (ZTA), this might not be sufficient. Continuous authentication requires verifying your authenticity throughout the session with each interaction, not just one-time authentication during login. It represents a shift from point-in-time verification to an ongoing, adaptive authentication approach.  

RBA can be broadly used beyond the authentication process to facilitate implementing security measures. For example, successful login from a new device can result in sending a notification to the registered device. Continued authentication failures can result in locking the account and flag for further checks.

## Access Control

Authentication is a very important process to verify that you are really who you say you are, once you have been authenticated, the system has to check your access rights to determine what actions you are permitted to perform or what resources you can view. This process is known as authorization. The whole process of verifying users through authentication and determining what actions or resources an authenticated user is allowed to access through authorization is broadly referred to as access control.

There are several different approaches to implementing access control. The right model for your application should be determined considering your business use cases, performance  and scaling requirements.

### Role-Based Access Control (RBAC)

Role-Based Access Control (RBAC) is the most widely used authorization model. In RBAC, your ability to perform a specific action or access to a specific resource is determined by the roles assigned to your user account. Roles can be assigned directly to your user account or indirectly through a membership of a (user) group.  The use of (user) groups to assign roles simplifies management overhead. You simply inherit the associated roles when you become a member of a group and you lose the roles when you leave the group.

In an application, actions and resource access are represented as permissions. For instance, a banking app might define permissions such as opening an account, viewing balances, transferring money, or downloading statements. These permissions are grouped into roles based on user responsibilities. Essentially, a role is a collection of permissions.  

To sum up, the permissions  of an application (actions and resource access) are categorized into roles, and users are organized into groups. Assigning roles to groups allows for easier management of access. RBAC is a straightforward authorization model that adapts well to future requirements, making it the most popular model in use today.

### Attribute-Based Access Control (ABAC)

In Attribute-Based Access Control (ABAC), your ability to perform a specific action or access a resource in an application is determined by evaluating the attributes of your user profile, the attributes of the action you are trying to perform, or the attributes of the resource you're trying to access, against predefined a access policy. The access policy defines what decisions should be made under specific conditions.

ABAC is broader and allows for defining detailed policy decisions based on complex combinations of attribute values, making it a fine-grained access control model. While the implementation of ABAC is more complex than RBAC, it is well-suited for applications that demand a high degree of security, such as those in finance or healthcare.

Much like Risk-Based Authentication (RBA), ABAC can evaluate not just user and resource attributes but also contextual parameters. For instance, ABAC can consider your location, access time, and the frequency of the action when making the access decision. The access policies used in ABAC support complex rules, and external data sources can be called upon to gather additional information when necessary.

### Relationship-Based Access Control (ReBAC)

Relationship-Based Access Control (ReBAC) is a modern authorization model that determines access rights based on the relationships between resources and users. Unlike traditional access control models like RBAC and ABAC, ReBAC focuses on the connections and dynamic interactions between resources and users generally represented using a graph data structure. 

ReBAC is ideal for use cases like healthcare systems where the access to patient records are based on professional relationships, family relationships and explicit consent. While ReBAC offers significant advantages in terms of flexibility and expressiveness, it brings more complexity to the implementation and maintenance. 

## User Onboarding 

Before you can log in (authenticate) and access resources within an application, you must have a user account within that system. Without an account, you’re not recognized as a user of the application. The process of adding new users to an application is broadly referred to as user onboarding.

The simplest and most widely used method for user onboarding is a registration form displayed on a web page, in which users enter their personal details, such as their name, email, and password to create a user account. This approach is known as self-onboarding or self-registration. It allows users to sign up for the application on their own, without needing administrator involvement. The self-onboarding process typically enforces additional security measures such as email verification or CAPTCHA to prevent fraud and ensure authenticity.

Another increasingly popular method of user onboarding is the use of social media platforms such as Google, Facebook, or LinkedIn. This approach leverages existing profile data (such as name, date of birth, email, and phone number) already stored on these platforms and eliminates the need for users to manually fill out lengthy registration forms. With the user’s permission, the necessary information is securely retrieved from their social media profiles, allowing for the instant creation of an account in the application. This method is commonly referred to as social onboarding. Social onboarding simplifies the registration process by making it faster and more user-friendly. Applications that support social onboarding often also enable social login, which means users can not only create their accounts using social media platforms but also log in via the same platforms afterwards.

The concept of social onboarding and login is not limited to social media platforms alone. For instance, a financial analytics application could allow users to onboard and log in via popular accounting platforms, while government agencies may employ a national digital identity platform to onboard citizens for services managed by these agencies. 

When an application needs to onboard user accounts from an existing directory service such as Active Directory (AD) or Lightweight Directory Access Protocol (LDAP), it can integrate with these systems using a network connection to synchronize or access user data directly. This method is especially common in enterprise software where integrating with a directory service ensures security and efficiency while providing a single source of truth for user management across all connected applications. 

In more complex or enterprise environments, user onboarding may also involve administrator-assisted onboarding, where user accounts are created and managed by system administrators, particularly in cases involving sensitive access controls, business-to-business applications, or compliance requirements.

## User Account Management

When you create a user account during onboarding an application, it needs to be protected and maintained to ensure accuracy and to allow ongoing access to business functions. For instance, if passwords are used, the application must implement the appropriate infrastructure and cryptographic protections, such as hashing passwords securely. Additionally, a strong password policy should be enforced, and extra layers of protection, like second-factor authentication (2FA) via email or SMS, should be made available to users.

In addition to securing the account, it's important to give users control over managing their own information. This includes allowing users to update their profile information whenever changes occur (like a new phone number or address) and offering mechanisms for account recovery, such as resetting forgotten passwords. These capabilities are known as self-care account management features and include:

- **Profile Updates** - Enabling users to easily update their personal details such as name, email, or phone number.

- **Password Management** - Allowing users to update their passwords whenever necessary, along with offering password recovery options.

- **Account Recovery** - Providing secure ways for users to recover their accounts if they forget their login credentials.

- **Multiple Login Identifiers** - Supporting users to log in using various identifiers, like email, phone number, or username.

- **Social Account Integration** - Enabling users to link or associate their social media accounts (like Google or Facebook) for easier login.

- **Multi-Factor Authentication (MFA)** -  Offering users the option to enable MFA, adding an extra layer of security to their accounts.

- **Passkey Enrollment** -  Supporting newer authentication methods like passkeys, which enhance security and user convenience.

- **Consent Management** - Giving users the ability to review and manage their data consents, ensuring transparency in how their data is used.

- **Profile Export** -  Providing a way for users to export their profile data, useful for transparency and portability.

By offering these self-care account management features, the application not only improves user experience but also reduces the administrative burden on support teams. Users can handle most of their own account-related tasks, which in turn minimizes the need for assistance, improving both customer satisfaction and operational efficiency.

In addition to self-care account management features, applications can implement a variety of account protection measures to enhance security. These measures help protect the application and its users from unauthorized access, account compromise, and other security threats. Some of these protection mechanisms include:

- **Conditional Multi-Factor Authentication (MFA)** - Applications can enforce MFA based on contextual factors like location, device, or behavior, adding an extra layer of protection when certain risks are detected. For example, when a user logs in from a new device or an unusual location, MFA can be required to verify the user’s identity.

- **Password Policies** - Enforcing strong password requirements ensures that users create complex passwords that are less vulnerable to brute-force attacks. Applications can specify password length, the use of special characters, numbers, and case sensitivity to enhance security.

- **Password Expiration Policies** - Applications can implement password expiration policies to require users to update their passwords regularly. This minimizes the risk of long-term password exposure and encourages the use of fresh credentials, reducing vulnerability.

- **Prevention of Reused Passwords** - To further protect accounts, applications can prevent users from reusing previous passwords. This ensures that if a password was ever compromised, it cannot be used again.

- **Login Attempt Limits** - Applications can protect against brute-force attacks by limiting the number of failed login attempts allowed. After a certain number of unsuccessful attempts, the system can either lock the account temporarily or require additional security verification.

- **Automatic Account Locking** - To enhance security, applications can enforce automatic account locking after several failed login attempts or suspicious activities. This prevents unauthorized users from continuing attempts to access the account.
- **Bot Protection** - Applications can be protected from bots attempting to gain unauthorized access by implementing CAPTCHA or other automated bot-detection mechanisms. This helps reduce bot-based attacks such as credential stuffing.

- **Login and Security Event Insights** - Providing visibility into security-related activities, such as successful and failed login attempts, password changes, and account recovery actions, can give users insights into their account's security status. Additionally, alerting users of unusual behavior, such as login attempts from unknown devices, can further enhance protection.

