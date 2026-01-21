# Write a custom user store manager

This guide explains how to implement a custom user store manager for WSO2 Identity Server.

!!! info "UniqueID user store managers"
    
    This guide documents the **UniqueID user store managers**, which became the default in WSO2 Identity Server from version **5.10.0 onwards**.
    
    If you need to implement a custom user store manager for older versions or for compatibility with legacy systems, see [Non-UniqueID user store managers](#advanced-non-uniqueid-user-store-managers).

## Before you begin

WSO2 Identity Server provides built-in user store manager implementations. Extend one of these classes based on your user store type:

| User store manager class | When to use |
|--------------------------|-------------|
| `org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager` | Use this when your user details are stored in a **database**. This implementation handles most JDBC-based scenarios without writing a custom user store manager. |
| `org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager` | Use this when you have a **read-only LDAP user store**. This implementation allows reading users but does not support insert or update operations. |
| `org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager` | Use this when you need WSO2 Identity Server to **manipulate LDAP user store data** (create, update, delete users). |
| `org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager` | Use this when your user store is **Active Directory**. |

!!! tip "Choosing the right base class"

    - Choose the base class closest to your use case.
    - Override only the methods that need customization.
    - The parent class handles all other operations automatically.

---

## Available methods

The following tables list methods available in the user store manager classes. Override these methods to customize specific behaviors in your custom implementation.

!!! tip "Overriding methods"

    - Override only the methods that need customization.
    - The parent class handles all other operations automatically.
    - For read-only user stores, write methods throw exceptions by default.

### Authentication methods

| Method | Description |
|--------|-------------|
| `AuthenticationResult doAuthenticateWithID(String preferredUserNameProperty, String preferredUserNameValue, Object credential)` | Authenticates a user based on a preferred property (e.g., email, username) and credential. |
| `AuthenticationResult doAuthenticateWithID(String userID, Object credential)` | Authenticates a user using their unique user ID and credential. |
| `AuthenticationResult doAuthenticateWithID(List<LoginIdentifier> loginIdentifiers, Object credential)` | Authenticates a user using multiple login identifiers and credential. |
| `boolean doAuthenticate(String userName, Object credential)` | Authenticates a user using their username and credential. |
| `String preparePassword(Object password, String saltValue)` | Returns the encrypted or plain-text password based on configurations. Override this method to change the password encryption algorithm or hashing mechanism. |

### User read methods

| Method | Description |
|--------|-------------|
| `List<User> doListUsersWithID(String filter, int maxItemLimit)` | Returns a list of users matching the filter string. |
| `String[] doListUsers(String filter, int maxItemLimit)` | Returns a list of usernames matching the filter string. |
| `boolean doCheckExistingUserWithID(String userID)` | Checks whether a user with the given user ID exists. |
| `boolean doCheckExistingUser(String userName)` | Checks whether a user with the given username exists. |
| `boolean doCheckExistingUserNameWithIDImpl(String userName)` | Checks whether a username exists (used internally). |
| `String doGetUserNameFromUserIDWithID(String userID)` | Returns the username for a given user ID. |
| `List<String> doGetUserListFromPropertiesWithID(String property, String value, String profileName)` | Returns a list of user IDs matching the given property value. |

### User write methods

| Method | Description |
|--------|-------------|
| `User doAddUserWithID(String userName, Object credential, String[] roleList, Map<String, String> claims, String profileName, boolean requirePasswordChange)` | Creates a new user with the given details. |
| `void doDeleteUserWithID(String userID)` | Deletes a user by user ID. |
| `void doUpdateCredentialWithID(String userID, Object newCredential, Object oldCredential)` | Updates a user's password after validating the old password. |
| `void doUpdateCredentialByAdminWithID(String userID, Object newCredential)` | Updates a user's password without validating the old password (admin operation). |
| `Date doGetPasswordExpirationTimeWithID(String userID)` | Returns the password expiration time for a user. |

### Role read methods

| Method | Description |
|--------|-------------|
| `boolean doCheckIsUserInRoleWithID(String userID, String roleName)` | Checks whether a user belongs to a role. |
| `boolean doCheckIsUserInRole(String userName, String roleName)` | Checks whether a user belongs to a role by username. |
| `List<User> doGetUserListOfRoleWithID(String roleName, String filter)` | Returns users belonging to a role. |
| `List<User> doGetUserListOfRoleWithID(String roleName, String filter, int maxItemLimit)` | Returns users belonging to a role with a limit. |
| `String[] doGetUserListOfRole(String roleName, String filter)` | Returns usernames belonging to a role. |
| `int doGetUserCountOfRoleWithID(String roleName)` | Returns the count of users in a role. |
| `String[] doGetExternalRoleListOfUserWithID(String userID, String filter)` | Returns external roles of a user. |
| `String[] doGetSharedRoleListOfUserWithID(String userID, String tenantDomain, String filter)` | Returns shared roles of a user. |

### Role write methods

| Method | Description |
|--------|-------------|
| `void doAddRoleWithID(String roleName, String[] userIDList, boolean shared)` | Creates a new role and assigns users to it. |
| `void doDeleteRole(String roleName)` | Deletes a role. |
| `void doUpdateRoleName(String roleName, String newRoleName)` | Renames a role. |
| `void doUpdateRoleListOfUserWithID(String userID, String[] deletedRoles, String[] newRoles)` | Updates the roles assigned to a user. |
| `void doUpdateUserListOfRoleWithID(String roleName, String[] deletedUserIDs, String[] newUserIDs)` | Updates the users assigned to a role. |

### Group read methods

| Method | Description |
|--------|-------------|
| `String doGetGroupIdFromGroupName(String groupName)` | Returns the group ID for a given group name. |
| `String doGetGroupNameFromGroupId(String groupId)` | Returns the group name for a given group ID. |
| `Group doGetGroupFromGroupName(String groupName, List<String> requiredAttributes)` | Returns the group object for a given group name. |
| `Group doGetGroupFromGroupId(String groupId, List<String> requiredAttributes)` | Returns the group object for a given group ID. |
| `List<Group> doGetGroupListOfUser(String userId, int limit, int offset, String sortBy, String sortOrder)` | Returns groups of a user with pagination. |
| `List<Group> doListGroups(Condition condition, int limit, int offset, String sortBy, String sortOrder)` | Returns groups matching a condition with pagination. |

### Group write methods

| Method | Description |
|--------|-------------|
| `Group doAddGroup(String groupName, String groupId, List<String> userIds, Map<String, String> claims)` | Creates a group with the given parameters. |
| `void doUpdateGroupNameByGroupId(String groupId, String newGroupName)` | Updates the name of a group. |
| `void doUpdateUserListOfGroup(String groupId, List<String> deletedUserIds, List<String> newUserIds)` | Updates the users in a group. |
| `void doDeleteGroupByGroupId(String groupId)` | Deletes a group by its ID. |

### Claim methods

| Method | Description |
|--------|-------------|
| `void doSetUserClaimValuesWithID(String userID, Map<String, String> claims, String profileName)` | Sets multiple claim values for a user. |
| `void doSetUserClaimValuesWithID(String userID, Map<String, List<String>> multiValuedClaimsToAdd, Map<String, List<String>> multiValuedClaimsToDelete, Map<String, List<String>> claimsExcludingMultiValuedClaims, String profileName)` | Sets claim values with support for multi-valued claims. |
| `void doSetUserClaimValues(String userName, Map<String, String> claims, String profileName)` | Sets claim values for a user by username. |
| `void doSetUserClaimValue(String userName, String claimURI, String claimValue, String profileName)` | Sets a single claim value for a user. |
| `void doSetUserAttributeWithID(String userID, String attributeName, String value, String profileName)` | Sets an attribute for a user by user ID. |
| `void doDeleteUserClaimValueWithID(String userID, String claimURI, String profileName)` | Deletes a claim value for a user. |
| `void doDeleteUserClaimValuesWithID(String userID, String[] claims, String profileName)` | Deletes multiple claim values for a user. |

### Configuration methods

| Method | Description |
|--------|-------------|
| `Properties getDefaultUserStoreProperties()` | Returns the default properties of the user store. Override this to programmatically change the user store configuration. |
| `boolean isReadOnly()` | Returns whether the user store is read-only. |

---

## Implement a custom JDBC user store manager

This section demonstrates how to create a custom JDBC user store manager using a third-party password hashing library ([Jasypt](http://www.jasypt.org/)).

### Prerequisites

- Java 1.8 or higher
- IDE (Eclipse, IntelliJ IDEA, etc.)
- Apache Maven

### Set up the implementation

1. Create a new Apache Maven project.

2. Add the following dependencies to your `pom.xml` file:

    ??? example "Sample `pom.xml` file"
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>
            <groupId>org.wso2.sample</groupId>
            <artifactId>CustomReadOnlyJDBCUserStoreManager</artifactId>
            <version>1.0.0</version>
            <packaging>bundle</packaging>
            <repositories>
                <repository>
                    <id>wso2-nexus</id>
                    <name>WSO2 internal Repository</name>
                    <url>https://maven.wso2.org/nexus/content/groups/wso2-public/</url>
                    <releases>
                        <enabled>true</enabled>
                        <updatePolicy>daily</updatePolicy>
                        <checksumPolicy>ignore</checksumPolicy>
                    </releases>
                </repository>
            </repositories>
            <dependencies>
                <dependency>
                    <groupId>org.wso2.carbon</groupId>
                    <artifactId>org.wso2.carbon.user.core</artifactId>
                    <version>4.10.42</version>
                </dependency>
                <dependency>
                    <groupId>org.wso2.carbon</groupId>
                    <artifactId>org.wso2.carbon.utils</artifactId>
                    <version>4.10.42</version>
                </dependency>
                <dependency>
                    <groupId>org.wso2.carbon</groupId>
                    <artifactId>org.wso2.carbon.user.api</artifactId>
                    <version>4.10.42</version>
                </dependency>
                <dependency>
                    <groupId>org.jasypt</groupId>
                    <artifactId>jasypt</artifactId>
                    <version>1.9.3</version>
                </dependency>
            </dependencies>
            <build>
                <plugins>
                    <plugin>
                        <artifactId>maven-compiler-plugin</artifactId>
                        <version>3.8.1</version>
                        <inherited>true</inherited>
                        <configuration>
                            <encoding>UTF-8</encoding>
                            <source>1.8</source>
                            <target>1.8</target>
                        </configuration>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.felix</groupId>
                        <artifactId>maven-scr-plugin</artifactId>
                        <version>1.26.4</version>
                        <executions>
                            <execution>
                                <id>generate-scr-scrdescriptor</id>
                                <goals>
                                    <goal>scr</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.felix</groupId>
                        <artifactId>maven-bundle-plugin</artifactId>
                        <version>3.5.1</version>
                        <extensions>true</extensions>
                        <configuration>
                            <instructions>
                                <Bundle-SymbolicName>${project.artifactId}</Bundle-SymbolicName>
                                <Bundle-Name>${project.artifactId}</Bundle-Name>
                                <Private-Package>
                                    org.wso2.sample.user.store.manager.internal
                                </Private-Package>
                                <Export-Package>
                                    !org.wso2.sample.user.store.manager.internal,
                                    org.wso2.sample.user.store.manager.*,
                                </Export-Package>
                                <Import-Package>
                                    org.wso2.carbon.*,
                                    org.apache.commons.logging.*,
                                    org.osgi.framework.*,
                                    org.osgi.service.component.*
                                </Import-Package>
                            </instructions>
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        </project>
        ```

    !!! note
        Update the version number of the carbon dependencies to match your WSO2 Identity Server version.

### Create the custom user store manager class

Create a new class that extends `UniqueIDJDBCUserStoreManager` and override the required methods:

??? example "CustomUserStoreManager.java"
    ```java
    package org.wso2.custom.user.store;

    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;
    import org.jasypt.util.password.StrongPasswordEncryptor;
    import org.wso2.carbon.user.api.RealmConfiguration;
    import org.wso2.carbon.user.core.UserCoreConstants;
    import org.wso2.carbon.user.core.UserRealm;
    import org.wso2.carbon.user.core.UserStoreException;
    import org.wso2.carbon.user.core.claim.ClaimManager;
    import org.wso2.carbon.user.core.common.AuthenticationResult;
    import org.wso2.carbon.user.core.common.FailureReason;
    import org.wso2.carbon.user.core.common.User;
    import org.wso2.carbon.user.core.jdbc.JDBCRealmConstants;
    import org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager;
    import org.wso2.carbon.user.core.profile.ProfileConfigurationManager;
    import org.wso2.carbon.utils.Secret;

    import java.sql.Connection;
    import java.sql.PreparedStatement;
    import java.sql.ResultSet;
    import java.sql.SQLException;
    import java.sql.Timestamp;
    import java.util.Date;
    import java.util.GregorianCalendar;
    import java.util.Map;

    /**
     * Custom User Store Manager with Jasypt password encryption.
     */
    public class CustomUserStoreManager extends UniqueIDJDBCUserStoreManager {

        private static final Log log = LogFactory.getLog(CustomUserStoreManager.class);
        private static final StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();

        public CustomUserStoreManager() {
        }

        public CustomUserStoreManager(RealmConfiguration realmConfig, Map<String, Object> properties, 
                ClaimManager claimManager, ProfileConfigurationManager profileManager, 
                UserRealm realm, Integer tenantId) throws UserStoreException {

            super(realmConfig, properties, claimManager, profileManager, realm, tenantId);
            log.info("CustomUserStoreManager initialized...");
        }

        @Override
        protected AuthenticationResult doAuthenticateWithUserName(String userName, Object credential)
                throws UserStoreException {

            boolean isAuthenticated = false;
            String userID = null;
            User user;

            if (!isValidUserName(userName)) {
                String reason = "Username validation failed.";
                if (log.isDebugEnabled()) {
                    log.debug(reason);
                }
                return getAuthenticationResult(reason);
            }

            if (!isValidCredentials(credential)) {
                String reason = "Password validation failed.";
                if (log.isDebugEnabled()) {
                    log.debug(reason);
                }
                return getAuthenticationResult(reason);
            }

            try {
                String candidatePassword = String.copyValueOf(((Secret) credential).getChars());
                Connection dbConnection = this.getDBConnection();
                dbConnection.setAutoCommit(false);
                
                String sql = this.realmConfig.getUserStoreProperty(JDBCRealmConstants.SELECT_USER_NAME);
                if (log.isDebugEnabled()) {
                    log.debug(sql);
                }

                PreparedStatement prepStmt = dbConnection.prepareStatement(sql);
                prepStmt.setString(1, userName);
                
                if (sql.contains(UserCoreConstants.UM_TENANT_COLUMN)) {
                    prepStmt.setInt(2, this.tenantId);
                }

                ResultSet rs = prepStmt.executeQuery();
                if (rs.next()) {
                    userID = rs.getString(1);
                    String storedPassword = rs.getString(3);

                    boolean requireChange = rs.getBoolean(5);
                    Timestamp changedTime = rs.getTimestamp(6);
                    GregorianCalendar gc = new GregorianCalendar();
                    gc.add(GregorianCalendar.HOUR, -24);
                    Date date = gc.getTime();
                    
                    if (!(requireChange && changedTime.before(date))) {
                        // Compare using Jasypt password encryptor
                        isAuthenticated = passwordEncryptor.checkPassword(candidatePassword, storedPassword);
                    }
                }
                dbConnection.commit();
                log.info(userName + " is authenticated? " + isAuthenticated);
            } catch (SQLException exp) {
                try {
                    this.getDBConnection().rollback();
                } catch (SQLException e1) {
                    throw new UserStoreException("Transaction rollback connection error occurred while" +
                            " retrieving user authentication info. Authentication Failure.", e1);
                }
                log.error("Error occurred while retrieving user authentication info.", exp);
                throw new UserStoreException("Authentication Failure");
            }

            if (isAuthenticated) {
                user = getUser(userID, userName);
                AuthenticationResult authenticationResult = new AuthenticationResult(
                        AuthenticationResult.AuthenticationStatus.SUCCESS);
                authenticationResult.setAuthenticatedUser(user);
                return authenticationResult;
            } else {
                AuthenticationResult authenticationResult = new AuthenticationResult(
                        AuthenticationResult.AuthenticationStatus.FAIL);
                authenticationResult.setFailureReason(new FailureReason("Invalid credentials."));
                return authenticationResult;
            }
        }

        @Override
        protected String preparePassword(Object password, String saltValue) throws UserStoreException {
            if (password != null) {
                String candidatePassword = String.copyValueOf(((Secret) password).getChars());
                log.info("Generating hash value using Jasypt...");
                return passwordEncryptor.encryptPassword(candidatePassword);
            } else {
                log.error("Password cannot be null");
                throw new UserStoreException("Authentication Failure");
            }
        }

        private AuthenticationResult getAuthenticationResult(String reason) {
            AuthenticationResult authenticationResult = new AuthenticationResult(
                    AuthenticationResult.AuthenticationStatus.FAIL);
            authenticationResult.setFailureReason(new FailureReason(reason));
            return authenticationResult;
        }
    }
    ```

!!! important
    
    Always implement the constructor with the following signature:
    
    ```java
    public CustomUserStoreManager(RealmConfiguration realmConfig, Map<String, Object> properties, 
            ClaimManager claimManager, ProfileConfigurationManager profileManager, 
            UserRealm realm, Integer tenantId) throws UserStoreException
    ```

---

## Deploy and configure the custom user store manager

1. Build your project using Maven:
    ```bash
    mvn clean install
    ```

2. Copy the generated JAR file (e.g., `custom-userstore.jar`) to the `<IS_HOME>/repository/components/dropins` directory.

3. Copy any dependency JAR files to the `<IS_HOME>/repository/components/lib` directory.

4. Add the following configuration to `<IS_HOME>/repository/conf/deployment.toml`:

    ```toml
    [user_store_mgt]
    custom_user_stores=["org.wso2.custom.user.store.CustomUserStoreManager"]
    ```

5. Restart WSO2 Identity Server.

!!! tip
    
    You can configure this as a primary user store or a secondary user store. For more information, see [Manage user stores]({{base_path}}/guides/users/user-stores).

---

## Try out the sample user store manager

1. Clone the sample from [GitHub](https://github.com/wso2/samples-is/tree/master/user-mgt/custom-jdbc-user-store-manager){:target="_blank"}.

2. Build the sample:
    ```bash
    mvn clean install
    ```

3. Copy the generated `org.wso2.custom.user.store-1.0.0.jar` to the `<IS_HOME>/repository/components/dropins` directory.

4. Add the following to `<IS_HOME>/repository/conf/deployment.toml`:
    ```toml
    [user_store_mgt]
    custom_user_stores=["org.wso2.custom.user.store.CustomUserStoreManager"]
    ```

5. Restart the Identity Server.

6. Configure the custom user store as a primary or secondary user store.

---

## Advanced: Non-UniqueID user store managers

The UniqueID user store managers became the default in WSO2 Identity Server from version 5.10.0 onwards. If you need to implement a custom user store manager without UniqueID support (for legacy systems or specific requirements), you can extend one of these classes:

| User store manager class | When to use |
|--------------------------|-------------|
| `org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager` | Use this when your user details are stored in a **database**. This implementation handles most JDBC-based scenarios without writing a custom user store manager. |
| `org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager` | Use this when you have a **read-only LDAP user store**. This implementation does not allow you to insert or update users from WSO2 Identity Server. You can only read and use them in the product. |
| `org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager` | Use this when you need WSO2 Identity Server to **manipulate LDAP user store data**. |
| `org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager` | Use this when your user store is **Active Directory**. |

!!! note
    
    For new implementations, use the UniqueID user store managers documented in the sections above. Use non-UniqueID user store managers only for compatibility with legacy systems.

---

## Advanced: Implement from AbstractUserStoreManager

For advanced use cases that require implementing user store methods from scratch, you can extend `org.wso2.carbon.user.core.common.AbstractUserStoreManager` directly.

!!! warning "When to use AbstractUserStoreManager"
    
    Extend `org.wso2.carbon.user.core.common.AbstractUserStoreManager` only when:
    
    - None of the built-in user store managers (JDBC, LDAP, Active Directory) fit your use case.
    - You need complete control over all user store operations.
    - Your user store has a unique architecture not supported by the existing implementations.

When extending `AbstractUserStoreManager`, you must implement all required methods yourself. This includes:

- Authentication methods
- User CRUD operations
- Role and group management
- Claim management

For most use cases, extending one of the built-in user store managers (as described in the sections above) is recommended. This approach requires less code and inherits tested, production-ready implementations.
