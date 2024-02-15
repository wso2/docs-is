# Write Custom Functions for Conditional Authentication

With conditional authentication, it is possible to configure dynamic sequences based on runtime parameters such as the user’s IP address, user role, etc. in the WSO2 Identity Server. This feature allows you to define a dynamic authentication sequence using authentication scripts written in JavaScript. For more information, see [Add conditional authentication]({{base_path}}/guides/authentication/conditional-auth).

Custom functions that expose any useful WSO2 Identity Server core functions and any utility functions can be added as OSGi services. A core set of functions are available at the following GitHub location:
<https://github.com/wso2-extensions/identity-conditional-auth-functions>

See [Conditional authentication - API reference]({{base_path}}/references/conditional-auth/api-reference) for more information.

----

## Write the function
The following steps provide some guidelines on how you can write custom functions for conditional authentication.

1. Create an Apache Maven module that has the packaging type as `bundle` and add the `maven-bundle-plugin` configuration.
    
    !!! info
        You may skip this step if you are adding a function to an existing component providing a related functionality.

2. Create a functional interface (i.e., an Interface with a single public method). The method name and parameters should be the same as the ones you provide from `js`. You may need to use wrapper classes for any object classes (except `number`, `string`, and `boolean`).

    !!! info
        - You may skip this step if you can use an existing object.
        - For more information on objects, see [object reference documentation]({{base_path}}/references/conditional-auth/api-reference/#object-reference).  

    - The JavaScript function is as follows:

        ``` js
        var isBar = barMethod(context, "s2", {});
        ```

    - The functional interface is as follows:

        ``` java
            @FunctionalInterface
            public interface FooFunction {
        
            boolean barMethod(JsAuthenticationContext context, String s2, CustomJsObject object);
            }
        ```

3. Create a class that implements the functional interface in the above step and implement your logic.  

    ``` java
        public class FooFunctionImp implements FooFunction {
             boolean barMethod(String s1, String s2, CustomJsObject object) {
                //Implementation
            }
        }
    ```

    !!! note
        It is recommended to throw errors from the Java methods to the authentication script. All the errors have to be handled by the method itself.

4. Add `JsFunctionRegistry` service to the service component class.  

    ``` java
    @Reference(
                service = JsFunctionRegistry.class,
                cardinality = ReferenceCardinality.MANDATORY,
                policy = ReferencePolicy.DYNAMIC,
                unbind = "unsetJsFunctionRegistry"
        )
        public void setJsFunctionRegistry(JsFunctionRegistry jsFunctionRegistry) {   
       FooFunctionsServiceHolder.getInstance().setJsFunctionRegistry(jsFunctionRegistry);
        }

        public void unsetJsFunctionRegistry(JsFunctionRegistry jsFunctionRegistry) {
            FooFunctionsServiceHolder.getInstance().setJsFunctionRegistry(null);
        }
    ```

5. In the bundle activator of the module, register the class created in step 3 in the `JsFunctionRegistry` service.  

    ``` java
        @Activate
        protected void activate(ComponentContext ctxt) {
    
                FooFunction fooFunctionImpl = new FooFunctionImpl();
                JsFunctionRegistry jsFunctionRegistry = FooFunctionsServiceHolder.getInstance().getJsFunctionRegistry();
                jsFunctionRegistry.register(JsFunctionRegistry.Subsystem.SEQUENCE_HANDLER, "barMethod", fooFunctionImpl);
        }
    
        @Deactivate
        protected void deactivate(ComponentContext ctxt) {
    
                JsFunctionRegistry jsFunctionRegistry = UserFunctionsServiceHolder.getInstance().getJsFunctionRegistry();
                if (jsFunctionRegistry != null) {
                    jsFunctionRegistry.deRegister(JsFunctionRegistry.Subsystem.SEQUENCE_HANDLER, "barMethod");
                }
        }
    ```

6. If you have one class that implements many functional interfaces, you need to cast to that particular functional interface when registering.  

    ``` java
        jsFunctionRegistry.register(JsFunctionRegistry.Subsystem.SEQUENCE_HANDLER, "barMethod", (FooFunction)fooFunctionImpl::barMethod);
    ```

## Try it out
This section guides you to try out a sample conditional authentication function.

### Deploy a sample authentication function
1. Build [the sample](https://github.com/wso2/samples-is/tree/v4.5.6/adaptive-authentication/org.wso2.custom.auth.functions) using maven `mvn clean install`.
2. Copy the `org.wso2.custom.auth.functions-1.0.0` binary file from `target` directory into  `<IS_HOME>/repository/components/dropins` directory.
3. Restart WSO2 IS.

### Configure the authentication script
To configure the application with a custom conditional authentication script:

1. Register an application.
2. Navigate to **Sign-in Method** tab.
3. Click **Start with default configuration** to define the login flow starting with the `username and password` login.
4. Turn on **Conditional Authentication** by switching the toggle on. You can add the following conditional authentication script using the editor.
5. Click **Update**.
    ``` js
    var onLoginRequest = function(context) {
        executeStep(1, {
            onSuccess: function (context) {
                var userName = getUsernameFromContext(context, 1);
                Log.info("Username: " + userName);
            } 
        });
    };
    ```

This custom `getUsernameFromContext()` function can be used to retrieve the username from the authentication context.
