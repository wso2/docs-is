# Logging Claims in Audit Logs

This feature enables to specify the required claims to be logged in
audit logs.

Follow the steps given below in order to configure this feature.

Make the following changes in the `         identitiy.xml        ` file
in `         <CARBON_HOME>/repository/conf/identity        ` to enable
the audit logger.

1.  Add the following entry within
    `           <EventListeners>          ` to enable the listener.

    ``` java
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
    name="org.wso2.carbon.user.mgt.listeners.UserClaimsAuditLogger"
    orderId="9" enable="true"/>
    ```

2.  Before the `           </Server>          ` element, add the
    following entry to define the claims that should be logged into the
    audit log.

    ``` java
        <LoggableUserClaims>
                <LoggableUserClaim>http://wso2.org/claims/identity/accountLocked</LoggableUserClaim>
                <LoggableUserClaim>http://wso2.org/claims/role</LoggableUserClaim>
            </LoggableUserClaims>
    ```

    !!! note
    
        In the above configuration, you can define any claim available in
        the <http://wso2.org/claims> dialect as a
        `           LoggableUserClaim          ` . The **accountLocked** and
        **role** claims have been used here only as examples.
    

    On making the above mentioned changes, claims will be logged into
    the `           audit.log          ` file in
    `           <IS_HOME>/repository/log.          `

      

  

  
