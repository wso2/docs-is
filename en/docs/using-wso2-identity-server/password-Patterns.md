# Password Patterns

WSO2 Identity Server (IS) allows you to define custom password policies
and enforce them at the point of user creation. This topic guides you
through configuring a simple custom password policy and enforcing it.
You can also have a different password policy for each tenant in a
multi-tenant environment.

1.  Start the WSO2 IS server and login to the management console.
2.  Click **Resident** under **Identity Providers** found in the
    **Main** tab of the [management
    console](../../setup/getting-started-with-the-management-console).
3.  Expand the **Password Policies** tab.
4.  Expand the **Password Patterns** tab and select **Enable Password
    Policy Feature**. Update the default values and click **Update**.

    !!! note
    
        Configuring password policies for multiple tenants
    
        **Note:** To configure this separately for different tenants in a
        multi-tenant environment, first login with Tenant A credentials and
        configure the password policy. Next, logout and login again with
        Tenant B credentials to configure a different policy for Tenant B.
    

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Default Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Password Policy Min Length</td>
    <td>This value specifies the minimum length allowed for a password.</td>
    <td>6</td>
    </tr>
    <tr class="even">
    <td>Password Policy Max Length</td>
    <td>This value specifies the maximum length allowed for a password.</td>
    <td>12</td>
    </tr>
    <tr class="odd">
    <td>Password Policy Pattern</td>
    <td>This is a Java based regular expression (regex) that defines a character sequence for the password to follow.</td>
    <td><div class="content-wrapper">
    <p>^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&amp;*])).{0,100}$</p>
    <div>
    <p>For more information on the password pattern characters and the different patterns you can use, see <a href="https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html">Java Regex Pattern</a> .</p>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td>Password Policy Error Message</td>
    <td>This value specifies the error message that will appear if the password policy is violated at the point of user creation.</td>
    <td>'Password pattern policy violated. Password should contain a digit[0-9], a lower case letter[a-z], an upper case letter[A-Z], one of !@#$%&amp;* characters'</td>
    </tr>
    </tbody>
    </table>

    ![](../../assets/img//103330510/103330511.png) 

**Related Links**

-   To configure a global password policy that applies to all tenants,
    you can write a custom password policy using the configuration file
    instead of through the management console. For more information, see
    [Writing a Custom Password
    Validator](_Writing_a_Custom_Password_Validator_).
-   To record user password history, see [Password History
    Validation](_Password_History_Validation_).
