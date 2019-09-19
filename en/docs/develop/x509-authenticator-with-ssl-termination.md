# Configuring X509 Authenticator with SSL Termination

SSL bridging is the process of decrypting the encrypted SSL traffic that
arrives from the browser and then re-encrypting it before sending it on
to the server. SSL bridging can be used to ensure that the contents of
the SSL-encrypted transmission are reliable and secure .

It enables NGINX to decrypt client requests from the browser. X509
authenticarion will not work in the normal SSL Termination since NGINX
does not pass the X509 Certificate as a request attribute to the server
after decrypting it. Due to this, the server will not be able to
authenticate the client using its certificate, resulting in the failure
of X509 authentication.

We need a separate valve to handle the request from NGINX and pass the
X509 Certificate as a request attribute to the server. Here, we
configure NGINX to pass the SSL Certificate as a request header.

Following are the steps to configure X509Authenticator with SSL
Termination using NGINX and WSO2 Identity Server.

### Configure NGINX for SSL Termination

1.  Install the [NGINX
    1.15.8](https://medium.com/@ThomasTan/installing-nginx-in-mac-os-x-maverick-with-homebrew-d8867b7e8a5a)
    community version.
2.  Create an SSL directory in `          /usr/local/etc/nginx         `
    .
3.  Create a self-signed key and certificate for NGINX as shown below
    and put them into `           /usr/local/etc/nginx/ssl.          `

    ``` java
    openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -x509 -days 365 
    -out nginx.pem
    openssl x509 -text -noout -in nginx.pem
    ```

4.  Add the following configurations to the
    `           nginx.config          ` file in
    `           /usr/local/etc/nginx.          `

    !!! note
        Mention the path of the file in which you have created the
        self-signed key and the certificate as
        `           ssl_client_certificate.          `
    

    ``` java
    http {
      upstream wso2.is.com{
        server localhost:9443;
        ip_hash;
      }
      # HTTPS server
      server {
        listen 443 ssl;
        server_name localhost;
        #nginx certificate
        ssl_certificate /usr/local/etc/nginx/ssl/nginx.pem;
        #nginx key
        ssl_certificate_key /usr/local/etc/nginx/ssl/key.pem;
        #certificate of the client
        ssl_client_certificate /usr/local/etc/nginx/ssl/certificate.pem;
        ssl_session_timeout 50m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_verify_client on;
        ssl_prefer_server_ciphers on;
        location / {
          #to enable the nginx to pass request header
          proxy_pass_request_headers on;
          proxy_set_header X-HTTPS-Protocol $ssl_protocol;
          proxy_set_header X-SSL-CERT $ssl_client_cert;
          proxy_pass https:/wso2.is.com;
        }
      }
    }
    ```

### Configure the Proxy Port in IS nodes

By default, WSO2 Identity Server runs on the 9443 port. The following
steps describe how you can configure a proxy port to 443.

1.  Open the `           catalina-server.xm          ` l file in
    `           <IS Home>/repository/conf/tomcat/          ` and add the
    proxy port 443 in the https connector as follows.

    ``` java
        <Connector protocol="org.apache.coyote.http11.Http11NioProtocol"
            port= "9443"
            proxyPort="443" 
    ```

2.  Configure the proxy port and host it in the
    `           site.json          ` file in
    `           <IS-HOME>/repository/deployment/server/jaggeryapps/dashboard/conf/          `
    as follows.

    ``` java
        {
            "proxy":{
                "proxyHost":"nginx.mybsf.org"
                "proxyHTTPSPort":"443",
                "proxyContextPath":"",
                "servicePath":"/services"
            }
        }
    ```

3.  Configure the proxy port and host it in the
    `           site.json          ` file in
    `           <IS-HOME>/repository/deployment/server/jaggeryapps/portal/conf/          `
    as follows.

    ``` java
        {
            "proxy":{
                "proxyHost":"nginx.mybsf.org"
                "proxyHTTPSPort":"443",
                "proxyContextPath":"",
            },
            "fido":{
                "appId":""
            }
        }
    ```

4.  Configure the proxy port and host in the
    `           web.xml          ` file in
    `           <IS-HOME>/repository/deployment/server/webapps/shindig/WEB-INF/          `
    as follows.

    ``` java
        <context-param>
            <param-name> system.properties </param-name>
            <param-value>
            <![CDATA[
            shindig.host=
            shindig.port=443
            akey=/shindig/gadgets/proxy?container=default&url=
            ]]>
    ```

### Change the authentication endpoint in the Travelocity sample

Since the NGINX listens to port 443, we need to change the
authentication endpoint of the client.

Go to travelocity properties in
`         <Catalina_Home>/Webapps/travelocity.com/WEB-INF/classes        `
and set `         SAML2.IdPURL        ` to
[https://localhost:443/samlsso](https://localhost/samlsso) as shown
below.

``` java
#The URL of the SAML 2.0 Identity Provider
SAML2.IdPURL=https://localhost:443/samlsso
```

###  Configure X509 Authenticator in WSO2 Identity Server

Follow the steps mentioned
[here](../../develop/x509-certificate-authenticator)
in order to configure X509 Authenticator.

### Add the X509 Authentication Valve to WSO2 Identity Server

1.  Get a git clone by executing the following command in the terminal
    [.](https://github.com/wso2-extensions/identity-x509-commons.git)

    ``` java
        git clone https://github.com/wso2-extensions/identity-x509-commons.git
    ```

2.  If the current branch is not the master, checkout from the master as
    follows.

    ``` java
        git branch checkout master  
    ```

3.  Build the component.

    ``` java
        mvn clean install
    ```

4.  Copy the
    `           org.wso2.carbon.extension.identity.authenticator.x509Certificate.valve-1.0.4-SNAPSHOT.jar          `
    file in
    `           /identity-x509-revocation/component/valve/target          `
    into `           <IS_HOME>/repository/components/dropins/          `
    . (Check whether the version of x509revocation component in the IS
    pack and change its version to 1.0.4-SNAPSHOT).  
      

5.  Open `           catalina.xml          ` in
    `           <IS_HOME>/repository/conf/tomcat/directory          `
    and add the new valve in the configuration file.

    ``` java
        Valve name = <Valve className=”org.wso2.carbon.extension.identity.x509Certificate.valve.X509CertificateAuthenticationValve”/>
    ```

    ![](../assets/img/119111969/119112177.png) 

6.  Configure in `           identity.xml          ` file in
    /repository/conf/identity by adding the value of the certificate
    configured in NGINX within
    `           <X509RequestHeaderName>.          `

    ``` java
        <!--X509 Certificate based authentication configuration-->
        <X509>
           <!--HTTP request header name which passes the X509Certificate  from LB-->
           <X509RequestHeaderName>SSL-CERT</X509RequestHeaderName></X509>
    ```

7.  Now run the travelocity sample and it will be authenticated using
    X509 Certificate when SSL termination is configured.

  

  

  
