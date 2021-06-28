# Writing Custom Functions for Adaptive Authentication

With adaptive authentication, it is possible to configure dynamic
sequences based on runtime parameters such as the user’s IP address,
user role, etc. in the WSO2 Identity Server. This feature allows you to
define a dynamic authentication sequence using authentication scripts
written in JavaScript. For more information, see [Adaptive
Authentication](../../learn/adaptive-authentication).  

Custom functions that expose any useful WSO2 Identity Server core
functions and any utility functions can be added as OSGi services. A
core set of functions are available at the following GitHub location:
<https://github.com/wso2-extensions/identity-conditional-auth-functions>

The following steps provide some guidelines on how you can write custom
functions for adaptive authentication.

1.  Create an Apache Maven module that has packaging type as ‘bundle’
    and add the maven-bundle-plugin configuration. You may skip this
    step if you are adding a function to an existing component providing
    a related functionality.
2.  Create a functional interface (i.e., Interface with a single public
    method). The method name and parameters should be the same as you
    would be providing from js. And you may need to use wrapper classes
    for any object classes (except number, string and boolean). You may
    skip this if you can use an existing object. For more information on
    objects, see [object reference
    documentation](../../references/adaptive-authentication-js-api-reference#object-reference)
    .  
      
    The JavaScript function is as follows.

    ``` js
    var isBar = barMethod(context, "s2", {});
    ```

    The functional interface is as follows.

    ``` java
        @FunctionalInterface
        public interface FooFunction {
    
           boolean barMethod(JsAuthenticationContext context, String s2, CustomJsObject object);
        }
    ```

3.  Create a class that implements the functional interface in the above
    step and implement your logic.  

    ``` java
        public class FooFunctionImp implements FooFunction {
             boolean barMethod(String s1, String s2, CustomJsObject object) {
                //Implementation
            }
        }
    ```

    !!! note
    
        **Note** : It is recommended not to throw errors from the Java methods
        to the authentication script. All the errors have to be handled by
        the method itself.
    

4.  Add `           JsFunctionRegistry          ` service in the service
    component class.  

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

5.  In the bundle activator of the module, register the class created in
    step 3 in the `           JsFunctionRegistry          ` service.  

    ``` java
        @Activate
        protected void activate(ComponentContext ctxt) {
    
                FooFunction fooFunctionImpl = new FooFunctionImpl();
                JsFunctionRegistry jsFunctionRegistry = FooFunctionsServiceHolder.getInstance().getJsFunctionRegistry();       jsFunctionRegistry.register(JsFunctionRegistry.Subsystem.SEQUENCE_HANDLER, "barMethod", fooFunctionImpl);
        }
    
        @Deactivate
        protected void deactivate(ComponentContext ctxt) {
    
                JsFunctionRegistry jsFunctionRegistry = UserFunctionsServiceHolder.getInstance().getJsFunctionRegistry();
                if (jsFunctionRegistry != null) {                  jsFunctionRegistry.deRegister(JsFunctionRegistry.Subsystem.SEQUENCE_HANDLER, "barMethod");
                }
        }
    ```

      

6.  If you have one class that implements many functional interface, you
    need to cast to that particular functional interface when
    registering.  

    ``` java
        jsFunctionRegistry.register(JsFunctionRegistry.Subsystem.SEQUENCE_HANDLER, "barMethod", (FooFunction)fooFunctionImpl::barMethod);
    ```

      

  

  

  
