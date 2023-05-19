# New Configuration Model

Configuring WSO2 Identity Server is made easier with a simplified, centralized configuration model that supports injecting configurations with multiple methods such as environment variables, to improve compatibility with different configuration automation tools and cloud native environments. The following sections compare the previous configuration model and new configuration model.

---

## Previous configuration model

WSO2 Identity Server is built using a collection of components out of which many had their own configuration files such as <code>carbon.xml</code>, <code>identity.xml</code>, and <code>axis2.xml</code>. This configuration model had several drawbacks: 

-	Flawed user experience: 
	-	The users had to focus on component-level configurations instead of product-level configurations, and the basis of the component-level configurations was not clearly evident to the user.
	-	Enabling a single functionality may require changing multiple configuration files that could result in a lot of human errors.
-	Lack of structure in the configuration files
-	Inconsistent parameter nomenclature
-	Varied time units used in different configuration files
-	Optional configurations were also visible to the user.

---

## New configuration model

With the **new configuration model** from WSO2 Identity Server 5.9.0 onwards, configurations are handled by the <code>deployment.toml</code> file in the `<IS_HOME>/repository/conf/` directory. The benefits of this new configuration model include:

-	Without being concerned about the components, the users can focus on the configurations.
-	Minimal chance for human errors during configuration 
-	The users will only see the mandatory configurations where certain mandatory configurations shall be inferred without human intervention.
-	Ability to use a proper time unit for a configuration
-	Configurations are well-grouped and consistently named

!!! warning
	If you are familiar with the previous configuration model, note that the `deployment.toml` gets precedence over the old `.xml` configuration files. It is expected to reset changes in `.xml` configuration files unless these configurations are now represented in `deployment.toml` file.

!!! tip
	For TOML configurations pertaining to a particular feature, see the respective document section.

!!! info
	For more information about the new configuration model, see [Simplifying Configuration with WSO2 Identity Server](https://wso2.com/blogs/thesource/2019/10/simplifying-configuration-with-WSO2-identity-server).

