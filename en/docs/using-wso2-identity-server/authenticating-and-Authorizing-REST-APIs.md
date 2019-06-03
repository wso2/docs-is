# Authenticating and Authorizing REST APIs

This section guides you through securing REST services and how requests
to REST APIs are authenticated and authorized in WSO2 Identity Server.

The requests that are sent via REST APIs are intercepted by tomcat
valves and authenticated and authorized by an OSGI service. There are
two OSGi services that provide the authentication and authorization
service based on its own handlers.

-   WSO2 Identity Server supports the following **authentication
    handlers** :
    -   OAuth2AccessTokenHandler
    -   ClientCertificateBasedAuthenticationHandler
    -   BasicAuthenticationHandler
-   The **authorization handler** is based on the permission specified
    against a particular user role.

!!! note
    
    You can write your own handlers for both authentication and
    authorization and register them in OSGI.
    

Let's learn how to authenticate and authorize REST APIs:

1.  To enable the intercepting of services:
    1.  Open the `            catalina-server.xml           ` file found
        in the `            <IS_HOME>/repository/conf/tomcat           `
        directory.
    2.  Uncomment the following valves found under the
        `             <Engine name="Catalina">            ` tag.

        ``` xml
         <!-- Authentication and Authorization valve for the rest apis and we can configure context for this in identity.xml  -->
         <!--Valve className="org.wso2.carbon.identity.auth.valve.AuthenticationValve"/>
         <Valve className = "org.wso2.carbon.identity.authz.valve.AuthorizationValve"/-->
        ```

2.  To specify the resources that you want to secure:

    1.  Open the `             identity.xml            ` file found in
        the
        `             <IS_HOME>/repository/conf/identity            `
        directory.

    2.  Specify the resource that you want to secure under the
        `             <ResourceAccssControl>            ` as given
        below.

        | Parameter            | Description                                                                                                                                                 | Sample Value                                               |
        |----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
        | **Resource context** | This defines the resource context relative to the root context, which needs to be secured.                                                                  | `                 /api/identity/*                `         |
        | **secured**          | This specifies whether to enable or disable security in the given resource context.                                                                         | `                 true                `                    |
        | **http-method**      | This defines the method as `                 all                ` , `                 post                ` , `                 get                ` , etc. | `                 all                `                     |
        | **Permissions**      | This defines the user role permission that is required to authorize the resource. You can enter multiple permission strings in a comma-separated list.      | `                 /permission/admin/login                ` |

        Example:

        ``` xml
                <ResourceAccessControl>
                    <Resource context="/api/identity/*" secured="true" http-method="all">
                        <Permissions>/permission/admin/login</Permissions>
                    </Resource>
                </ResourceAccessControl>
        ```

3.  To configure intermediate certificate validation, configure the
    following in the `           identity.xml          ` file as given
    below.

    <table>
    <thead>
    <tr class="header">
    <th>Parameter</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>IntermediateCertificateValidation</strong></td>
    <td>This defines whether intermediate certificate validation is enabled or not.</td>
    <td><code>               true              </code></td>
    </tr>
    <tr class="even">
    <td><strong>IntermediateCerts</strong></td>
    <td>This specifies the context paths of the intermediate certificates.</td>
    <td><code>               localhost              </code></td>
    </tr>
    <tr class="odd">
    <td><strong>ExemptContext</strong></td>
    <td>This specifies the context paths that needs to be excempted from intermediate certificate validation.</td>
    <td><br />
    </td>
    </tr>
    </tbody>
    </table>

    Example:

    ``` java
        <IntermediateCertValidation enable="true">
             <IntermediateCerts>
                 <CertCN>wso2isintcert</CertCN>
                 <CertCN>localhost</CertCN>
             </IntermediateCerts>
             <ExemptContext>
                 <Context>scim2</Context>
             </ExemptContext>
         </IntermediateCertValidation>
    ```

    When using intermediate certificate validation,
    `            CN           ` will be taken as the
    `            username           ` instead of retrieving from the
    header.

  
