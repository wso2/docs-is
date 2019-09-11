# Writing a Custom Password Validator

The Identity Server admin can define custom password policies and
enforce them at user creation. This page demonstrates the process of
writing a simple custom password policy and enforcing it.

### Configuring password policy extensions

1.  Open the `           identity.xml          ` file found in the
    `           <IS_HOME>/repository/conf/identity/          ` directory
    and set the
    `           org.wso2.carbon.identity.mgt.IdentityMgtEventListener          `
    under the `           <EventListeners>          ` tag to
    **enable="true"**.

    ``` xml
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" 
    name="org.wso2.carbon.identity.mgt.IdentityMgtEventListener" orderId="50" enable="true"/>
    ```

2.  Open the `           identity-mgt.properties          ` file found
    in the `           <IS_HOME>/repository/conf/identity/          `
    directory and define the following custom classes.

    ``` java
    Password.policy.extensions.1=org.wso2.carbon.identity.mgt.policy.password.DefaultPasswordLengthPolicy
    Password.policy.extensions.1.min.length=6
    Password.policy.extensions.1.max.length=12
    ```

    !!! info
        `            min.length           ` and
        `            max.length           ` are the parameters that are
        passed to the custom password policy class (i.e.,
        `            DefaultPasswordLengthPolicy           ` ). If you have
        more than one custom class, it can be defined by incrementing the
        integer as follows (e.g., "
        `            Password.policy.extensions.                         2                        "           `
        )  and providing the parameters mentioned above if needed.

        ``` java
        Password.policy.extensions.2=org.wso2.carbon.identity.mgt.policy.password.DefaultPasswordNamePolicy
        ```

### Writing the custom password policy

You can write the custom classes for password policies by extending the
`                   org.wso2.carbon.identity.mgt.policy.AbstractPasswordPolicyEnforcer                 `
abstract class.

The two methods you need to implement are as follows:
<ul>
    <li><b>public void init(Map&lt;String, String&gt; params)­</b> - This method is
    used to initialize the configuration parameters.</li>
    <li><b>public boolean enforce(Object... args)­</b> - This method defines
    the logic of the policy enforcement.</li>
</ul>

The custom policies defined are added to a registry at runtime and are
enforced in the order given in the configuration file. Therefore, you
need to consider the policy enforcement order when defining the
configuration.

The following code block is a sample implementation of the two methods.

``` java
@Override
public void init(Map<String, String> params) {


    if (params != null && params.size() > 0) {
        MIN_LENGTH = Integer.parseInt(params.get("min.length"));
        MAX_LENGTH = Integer.parseInt(params.get("max.length"));
    }
}


@Override
public boolean enforce(Object... args) {
// If null input pass through.


    if (args != null) {


        String password = args[0].toString();
        if (password.length() < MIN_LENGTH) {


            errorMessage = "Password at least should have " + MIN_LENGTH + "characters";
            return false;
        } 
 
        else if (password.length() > MAX_LENGTH) {
            errorMessage = "Password cannot have more than " + MAX_LENGTH + "characters";
            return false;
        } 
 
        else {
            return true;
        }
    } 
    else {
        return true;
    }
}
```

#### Deploying and configuring the custom password validator

Do the following to deploy and enforce the custom password policy in the
WSO2 Identity Server.

1.  Compile the custom password policy code and get the resulting
    `          .jar         ` file.
2.  Copy the . `          jar         ` file into the
    `          <IS_HOME>/repository/components/dropins         ` folder.