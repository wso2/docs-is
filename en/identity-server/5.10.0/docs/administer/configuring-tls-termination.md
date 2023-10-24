# Configuring TLS Termination

When you have Carbon servers fronted by a load balancer, you have the option of terminating SSL for HTTPS requests. This means that the load balancer will decrypt incoming HTTPS messages and forward them to WSO2 Identity Server again with HTTPS using private or self-signed certificates. Also, make sure that the load balancer is configured with TLS termination and the Tomcat `RemoteIpValve` is enabled for Carbon servers.

!!! note "Important"
    In the past we recommended using HTTP for internal communication to save some CPU overhead on TLS. However, modern security-conscious deployments benefit from having TLS for the traffic even when it is in between private endpoints. Hence, using HTTP endpoints is no-longer recommended on WSO2 Identity Server.

Given below are the steps you need to follow:

### Step 1: Configuring the load balancer with TLS termination

See the documentation of the load balancer that you are using for
instructions on how to enable TLS termination. For example, see [NGINX
SSL
Termination](https://www.nginx.com/resources/admin-guide/nginx-ssl-termination/)
.

### Step 2: Enabling RemoteIpValve for Carbon servers

You can enable Tomcat's RemoteIpValve for your Carbon server by simply
adding the configuration to `<IS-HOME>/repository/conf/deployment.toml` See the [Tomcat
documentation](https://tomcat.apache.org/tomcat-9.0-doc/api/org/apache/catalina/valves/RemoteIpValve.html)
for more information about `         RemoteIpValve        ` .

You can find an example below,

``` toml
[catalina.valves.valve.properties]
className = "org.apache.catalina.valves.RemoteIpValve"
internalProxies = "192\.168\.0\.10|192\.168\.0\.11"
remoteIpHeader ="x-forwarded-for"
proxiesHeader="x-forwarded-by"
trustedProxies="proxy1|proxy2"
```
