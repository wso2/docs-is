# Write a custom password history policy

{{product_name}} ships with a **password history** governance connector that prevents users from reusing their recent passwords. When the connector is enabled, every accepted password is hashed and written to the `IDN_PASSWORD_HISTORY_DATA` table. Any password matching one of the last *n* entries for that user is rejected.

Your password history requirements might go beyond what the connector offers. For example, you might need to keep the history in an external system, reject passwords that are merely *similar* to earlier ones, or apply a different retention rule. In such cases, you can replace the storage and validation logic by implementing the `org.wso2.carbon.identity.password.history.store.PasswordHistoryDataStore` interface.

!!! note "Migrating from a legacy password policy enforcer"

    On older versions, custom password history rules were often written as `org.wso2.carbon.identity.mgt.policy.AbstractPasswordPolicyEnforcer` classes. These classes are invoked by the legacy `org.wso2.carbon.identity.mgt.IdentityMgtEventListener`, which is disabled by default in {{product_name}} 7.x. Enabling it is not recommended. It strips identity claims from user operations and breaks governance features such as account locking, account disabling, and password expiry.

    Don't confuse it with `org.wso2.carbon.identity.governance.listener.IdentityMgtEventListener`, which is enabled by default and must stay enabled.

    The extension point described on this page is the supported replacement. It needs no listener configuration changes.

---

## How password history validation works

The `passwordHistory` event handler subscribes to the user operation events listed below and delegates the actual work to the configured data store.

| Event | Data store method | Purpose |
|-------|-------------------|---------|
| `PRE_UPDATE_CREDENTIAL`, `PRE_UPDATE_CREDENTIAL_BY_ADMIN` | `validate()` | Validates the new password. Returning `false` aborts the password update. |
| `POST_ADD_USER`, `POST_UPDATE_CREDENTIAL`, `POST_UPDATE_CREDENTIAL_BY_ADMIN` | `store()` | Records a password that was accepted. |
| `POST_DELETE_USER` | `remove()` | Cleans up the history of a deleted user. |

Two points about how the handler invokes your class:

- The handler runs only when the password history connector is **enabled** for the organization and its history count is **greater than zero**. If either condition fails, your data store is never called.
- The handler resolves the class by name and creates a **new instance for every password operation**, using a constructor with the signature `(String hashingAlgorithm, int historyCount)`. Keep the constructor lightweight and do not hold state between calls.

---

## Implement the PasswordHistoryDataStore interface

The interface has three methods to implement and one optional method with a default implementation.

```java
package org.wso2.carbon.identity.password.history.store;

import org.wso2.carbon.identity.application.common.model.User;
import org.wso2.carbon.identity.password.history.exeption.IdentityPasswordHistoryException;

public interface PasswordHistoryDataStore {

    void store(User user, Object credential) throws IdentityPasswordHistoryException;

    void remove(User user) throws IdentityPasswordHistoryException;

    default void deletePasswordHistoryData(int tenantId) throws IdentityPasswordHistoryException {
    }

    boolean validate(User user, Object credential) throws IdentityPasswordHistoryException;
}
```

| Method | Description |
|--------|-------------|
| `void store(User user, Object credential)` | Persists the accepted password for the user. Enforcing the history limit, for example by discarding the oldest entries, is the responsibility of your implementation. |
| `boolean validate(User user, Object credential)` | Returns `true` if the password is allowed and `false` if it violates your history policy. Returning `false` fails the password update with error code `22001`. If the method throws an `IdentityPasswordHistoryException`, the update fails with error code `22003` instead. |
| `void remove(User user)` | Removes all history entries of the given user. Called after the user is deleted. |
| `void deletePasswordHistoryData(int tenantId)` | Not called on a custom data store. See the following warning. |

The `user` argument carries the username, user store domain, and tenant domain of the user whose password is changing. The `credential` argument is the plain text password. Read it with `credential.toString()` and never persist it as is. Password trimming is enabled by default, so the handler usually trims leading and trailing whitespace before passing the credential to your class.

!!! warning "The custom store fully replaces the built-in one"

    Once a custom `dataStore` is configured, the built-in `DefaultPasswordHistoryDataStore` is not used at all, and nothing is written to the `IDN_PASSWORD_HISTORY_DATA` table unless your implementation writes to it.

    In particular, the history count configured for the organization is only passed to your constructor. It is not enforced on your behalf. The "reject the last *n* passwords" behavior belongs to the default store that you are replacing. Your implementation must apply the limit itself if it needs one.

    Organization deletion doesn't reach your data store either. When an organization is deleted, {{product_name}} cleans up the `IDN_PASSWORD_HISTORY_DATA` table through the default store and never calls `deletePasswordHistoryData()` on your implementation. If your store keeps data outside that table, clean it up through your own process.

### Sample implementation

The following example keeps the last *n* password hashes in a table of its own and rejects an exact match against any of them. The helper methods that read and write that table, such as `loadHistory()`, `hash()`, and `persist()`, are omitted for brevity.

```java
package org.example.password.history;

import org.wso2.carbon.identity.application.common.model.User;
import org.wso2.carbon.identity.password.history.exeption.IdentityPasswordHistoryException;
import org.wso2.carbon.identity.password.history.store.PasswordHistoryDataStore;

public class CustomPasswordHistoryDataStore implements PasswordHistoryDataStore {

    private final String hashingAlgorithm;
    private final int historyCount;

    /**
     * The event handler instantiates the data store through this constructor,
     * so the signature must be kept exactly as shown.
     *
     * @param hashingAlgorithm Value of the passwordHistory.hashingAlgorithm property.
     * @param historyCount     Password history count configured for the organization.
     */
    public CustomPasswordHistoryDataStore(String hashingAlgorithm, int historyCount) {

        this.hashingAlgorithm = hashingAlgorithm;
        this.historyCount = historyCount;
    }

    @Override
    public boolean validate(User user, Object credential) throws IdentityPasswordHistoryException {

        // An empty password is not validated against the history.
        if (credential == null) {
            return true;
        }
        for (PasswordHistoryEntry entry : loadHistory(user, historyCount)) {
            if (entry.getHash().equals(hash(credential.toString(), entry.getSalt()))) {
                // The password was used before. Fail the password update.
                return false;
            }
        }
        return true;
    }

    @Override
    public void store(User user, Object credential) throws IdentityPasswordHistoryException {

        if (credential == null) {
            return;
        }
        String salt = generateSalt();
        persist(user, salt, hash(credential.toString(), salt));
        // Apply the history limit. Nothing does this on your behalf.
        deleteEntriesOlderThan(user, historyCount);
    }

    @Override
    public void remove(User user) throws IdentityPasswordHistoryException {

        deleteAllEntries(user);
    }

    // Helper methods such as loadHistory(), hash(), generateSalt(), persist(),
    // deleteEntriesOlderThan(), and deleteAllEntries() are omitted for brevity.
}
```

!!! tip

    Refer to the [default implementation](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.password.history/src/main/java/org/wso2/carbon/identity/password/history/store/Impl/DefaultPasswordHistoryDataStore.java){:target="_blank"} for a complete, working example of salting, hashing, and persisting password history.

---

## Build the data store

Add the password history component as a `provided` dependency in your project.

```xml
<dependency>
    <groupId>org.wso2.carbon.identity.governance</groupId>
    <artifactId>org.wso2.carbon.identity.password.history</artifactId>
    <version>${identity.governance.version}</version>
    <scope>provided</scope>
</dependency>
```

!!! note

    Set `${identity.governance.version}` to the version of the `org.wso2.carbon.identity.password.history` JAR in your {{product_name}} pack. You can find this JAR in the `<IS_HOME>/repository/components/plugins` directory.

Build the project as an OSGi bundle, for example by using the `maven-bundle-plugin`, so that it can be deployed in the `dropins` directory.

The bundle must export the package that contains your data store class. The password history handler loads the class by name, so it can only see packages that other bundles export. By default, the `maven-bundle-plugin` doesn't export packages whose names contain `impl` or `internal`. If your class lives in such a package, export it explicitly.

```xml
<plugin>
    <groupId>org.apache.felix</groupId>
    <artifactId>maven-bundle-plugin</artifactId>
    <extensions>true</extensions>
    <configuration>
        <instructions>
            <Bundle-SymbolicName>${project.artifactId}</Bundle-SymbolicName>
            <Export-Package>org.example.password.history.*</Export-Package>
        </instructions>
    </configuration>
</plugin>
```

If the class isn't exported, password updates fail with error code `22002`, `Error while loading history data source`.

```bash
mvn clean install
```

---

## Deploy and configure the data store

1. Copy the generated JAR file to the `<IS_HOME>/repository/components/dropins` directory.

2. Copy any third-party dependency JAR files to the `<IS_HOME>/repository/components/lib` directory.

3. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [identity_mgt.events.schemes.passwordHistory.properties]
    dataStore = "org.example.password.history.CustomPasswordHistoryDataStore"
    ```

    | Property | Description |
    |----------|-------------|
    | `dataStore` | Fully qualified class name of your implementation. Defaults to `org.wso2.carbon.identity.password.history.store.Impl.DefaultPasswordHistoryDataStore`. |
    | `hashingAlgorithm` | Digest function passed to the constructor of the data store. Defaults to `SHA-256`. |
    | `enable` | Server-wide default for the **Validate password history** connector property. Defaults to `false`. |
    | `count` | Server-wide default for the **Password history validation count** connector property. Defaults to `5`. |

4. Restart {{product_name}}.

5. Enable password history validation for the organization. On the {{product_name}} Console, navigate to **Login & Registration** and select **Password Validation** under **Login Security**. Then, set a [**Password History Count**]({{base_path}}/guides/account-configurations/login-security/password-validation/#password-history-count) greater than zero.

    !!! note

        The `enable` and `count` values in `deployment.toml` only provide the server-wide defaults. The effective values are the ones configured per organization. You can also set them through the [identity governance REST API]({{base_path}}/apis/governance-connectors/) using the `passwordHistory.enable` and `passwordHistory.count` properties.

---

## Try it out

1. Sign in to the My Account portal as a user and change the password to a value that your implementation rejects.
2. The password update fails with error code `22001` and the message `This password has been used in recent history. Please choose a different password`.
3. Change the password to a value that your implementation allows, and confirm that the update succeeds.

Repeat the same test with an administrator changing the password of another user on the Console.
