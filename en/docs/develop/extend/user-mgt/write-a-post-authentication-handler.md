# Write a Post-Authentication Handler

WSO2 Identity Server authentication framework facilitates you with the pluggable architecture of multiple inbound/outbound protocols as well as local and federated authenticators including a large number of extension points. The Post Authentication Handler is one such extension point which allows you to do a task upon successful authentication. Authentication to the system is only successful once the execution of post-authentication handlers is completed. The following handlers are examples of post-authentication handlers that are available by default.

-   **Application authorization handler** - Once the user successfully authenticates to a service provider, this authorization handler will check whether the given user is entitled to login by evaluating a xacml policy. This happens during authorization.  
      
-   **Missing mandatory claim handler** - When mandatory claims are configured in a service provider under claim configurations, the user is prompted to fill in mandatory claim values if the values are not already known at the point of authentication.  
      
-   **Consent handler / disclaimer dialog** - This handler requests for either consent or disclaimer approval. Once the authentication steps are completed, the user is prompted for consent or disclaimer approval and the user is only able to proceed once it is accepted or approved.

---

## Write a post-authentication handler

Writing a custom post-authentication handler is fairly simple. For a sample implementation consisting of the disclaimer dialog, see the [sample post-authentication handler](https://github.com/wso2/samples-is/tree/master/etc/sample-post-authentication-handler). Follow the instructions on the readme to try it out.

Extend the `org.wso2.carbon.identity.application.authentication.framework.handler.request.AbstractPostAuthnHandler` to write a custom handler. This allows you to enable/disable or change the priority of this handler via configurations in the `deployment.toml`  configuration file. The post-authentication handler interface consists of a single main method which you need to implement in order to implement a post-authentication handler.

``` java
PostAuthnHandlerFlowStatus handle(HttpServletRequest httpServletRequest,

    HttpServletResponse httpServletResponse,

    AuthenticationContext authenticationContext)

throws PostAuthenticationFailedException;
```

The post-authentication operations can be done within the implementation of this handler. The response can be coveyed on the interface using one of the following two methods.  
  
### By returning a PostAuthnHandlerFlowStatus

This method of returning the response can have multiple flow statuses:

<table>
<thead>
<tr class="header">
<th>Status</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>SUCCESS_COMPLETED</td>
<td>This status can be returned if the post-authentication process is complete. The next post handler is then invoked as the current one has been completed.</td>
</tr>
<tr class="even">
<td>INCOMPLETE</td>
<td><p>This status indicates that the post-authentication process is incomplete (e.g., a redirection to an external page). The response can be simply redirected and you can expect it to come back to your post-authentication handler once the response is submitted to WSO2 IS again.</p>
<p>If a response from an external page is submitted to the post-authentication handler which is in progress, the following needs to be included in the request along with the input data that is recieved from the external page:</p>
<ol>
<li><p>SessionDataKey</p></li>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>The 'sessionDataKey' query parameter is used to coordinate the request state across components participating in the request flow. It does not correlate with the user session. Furthermore, the request state maintained against the 'sessionDataKey' parameter value is cleared by each participating component at the end of request flow. This means that even if an external party grabs the 'sessionDataKey' they will not be able to get into the authentication sequence, as the user session is not associated with that key.</p>
</div>
<li><p>PASTR cookie (this is used to track the post-authentication sequence and used to secure the post-authentication flow.)</p></li>
</ol></td>
</tr>
</tbody>
</table>

As seen in the sample implementation, the disclaimer page is redirected and it stores the “consentPoppedUp” state so that next time the post handler continues upon the response, it can look for the disclaimer response and proceed.  
  

### By throwing a PostAuthenticationFailedException

A post-authentication exception along with an error code and message can be thrown if you wish to break the login flow or do not need to continue the login flow. The error code will be displayed in an error page. For example, this exception can be used for failing a login attempt due to an authorization failure.

Follow the steps given in the [sample post-authentication handler readme](https://github.com/wso2/samples-is/blob/master/etc sample-post-authentication-handler/README.MD) to install this sample and get it working with WSO2 Identity Server. You can enable and disable this newly written handler using the configuration shown below in the `<IS_HOME>/repository/conf/deployment.toml`. You can also change the execution order using the ` order` parameter. The handler with the lesser value for the `order` parameter will be executed first.

```toml
    [[event_listener]]
    id = "custom_post_auth_listener"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
    name = "org.wso2.carbon.identity.post.authn.handler.disclaimer.DisclaimerPostAuthenticationHandler"
    order = 899
```

!!! note
    These configurations will not be effective if the `getPriority` and `isEnable` methods of your post authentication handler are overridden.
    
