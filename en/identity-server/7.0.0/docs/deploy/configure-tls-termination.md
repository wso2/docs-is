# Configure TLS Termination

When you have Carbon servers fronted by a load balancer, you have the option of terminating SSL for HTTPS requests. This means that the load balancer will be decrypting incoming HTTPS messages and forwarding them to the Carbon servers as HTTP.
This is useful when you want to reduce the load on your Carbon servers due to encryption. To achieve this, the load balancer should be configured with TLS termination and the Tomcat RemoteIpValve should be enabled for Carbon servers.

When you work with Carbon servers, this will allow you to access admin services and the admin console of your product using HTTP (without SSL).

## Step 1: Configure the load balancer with TLS termination

See the documentation of the load balancer that you are using for instructions on how to enable TLS termination. For example, see [NGINX SSL Termination](https://www.nginx.com/resources/admin-guide/nginx-ssl-termination/).

## Step 2: Enable RemoteIpValve for Carbon servers

You can enable Tomcat's `RemoteIpValve` for your Carbon server by simply adding the configuration to `<IS-HOME>/repository/conf/deployment.toml`. See the [Tomcat documentation](https://tomcat.apache.org/tomcat-9.0-doc/api/org/apache/catalina/valves/RemoteIpValve.html) for more information about `RemoteIpValve`.

You can find an example below:

``` toml
[catalina.valves.valve.properties]
className = "org.apache.catalina.valves.RemoteIpValve"
internalProxies = "192\.168\.0\.10|192\.168\.0\.11"
remoteIpHeader ="x-forwarded-for"
proxiesHeader="x-forwarded-by"
trustedProxies="proxy1|proxy2"
```