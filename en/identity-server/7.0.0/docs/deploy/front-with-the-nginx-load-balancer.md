# WSO2 clusters with Nginx

When setting up the WSO2 Identity Server cluster with Nginx, follow the instructions given below.

!!! note
    Follow the instructions given below only **after** setting up the cluster following the [Deployment Patterns]({{base_path}}/deploy/deployment-guide).

!!! tip
    When clustering WSO2 Identity Server with a load balancer, you may need to
    enable sticky sessions. This is required for the WSO2 Identity Server Console and My Account to work and if we disable temporary session data persistence in the
    `<IS_HOME>/repository/conf/deployment.toml` file. <!--For more information on sticky sessions, see [Sticky Sessions with Manager Nodes]({{base_path}}/deploy/sticky-sessions-with-manager-nodes).-->

Following is the deployment diagram with the load balancer.

![Deployment with the loadbalancer]({{base_path}}/assets/img/setup/deploy/deployment-with-the-loadbalancer.png)


## Configure Nginx

Use the following steps to configure [NGINX Plus](https://www.nginx.com/products/) version 1.7.11 or [nginx community](http://nginx.org/) version 1.9.2 as the load balancer for WSO2 products. (In these steps, we refer to both versions collectively as "Nginx".)

1. Install Nginx (NGINX Plus or Nginx community) in a server configured in your cluster.
2. Configure Nginx to direct the HTTP requests to the two worker nodes via the HTTP 80 port using the `http://is.wso2.com/>`. To do this, create a VHost file ( ` is.http.conf ` ) in the `/etc/nginx/conf.d` directory and add the following configurations into it.

    ??? abstract "Click here to view a generic Nginx configuration"

        ```java
        upstream wso2.is.com {
        server xxx.xxx.xxx.xx3:9763;
        server xxx.xxx.xxx.xx4:9763;
        }
        
        server {
                listen 80;
                server_name is.wso2.com;
                location / {
                    proxy_set_header X-Forwarded-Host $host;
                    proxy_set_header X-Forwarded-Server $host;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_read_timeout 5m;
                    proxy_send_timeout 5m;
                    proxy_pass http://wso2.is.com;
        
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                }
        }
        ```

    ??? example "Nginx configuration that exposes /oauth2, /commonauth, and other endpoints"

        ```java
        upstream ssl.nginx.com {
            server xxx.xxx.xxx.xx3:9443;  
            server xxx.xxx.xxx.xx4:9443  
        ip_hash; 
        }
    
        server {
            listen 443;
            server_name is.wso2.com;   
            ssl on;
            ssl_certificate /home/abc/STAR_wso2is_com.crt; 
            ssl_certificate_key /home/abc/wso2is.key;
    
            location /oauth2/token {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                
                proxy_pass  https://ssl.nginx.com/oauth2/token ;
                proxy_redirect https://xxx.xxx.xxx.xx3:9443/oauth2/token https://is.wso2.com/oauth2/token ;
                proxy_redirect https://xxx.xxx.xxx.xx4:9443/oauth2/token https://is.wso2.com/oauth2/token ; 
            }
    
            location /commonauth {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/commonauth;
                proxy_redirect https://xxx.xxx.xxx.xx3:9443/commonauth https://is.wso2.com/commonauth ;
                proxy_redirect https://xxx.xxx.xxx.xx4:9443/commomnauth https://is.wso2.com/commonauth;
            }
    
            location /oauth2/authorize {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/oauth2/authorize;
                proxy_redirect https://xxx.xxx.xxx.xx3:9443/oauth2/authorize https://is.wso2.com/oauth2/authorize ;
                proxy_redirect https://xxx.xxx.xxx.xx4:9443/oauth2/authorize https://is.wso2.com/oauth2/ authorize;
            }
    
            location /authenticationendpoint/ {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/authenticationendpoint/;
                proxy_redirect https://xxx.xxx.xxx.xx3:9443/authenticationendpoint/ https://is.wso2.com/authenticationendpoint/ ;
                proxy_redirect https://xxx.xxx.xxx.xx4:9443/authenticationendpoint https://is.wso2.com/ authenticationendpoint;
            }
    
            location /oauth2/userinfo {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://ssl.nginx.com/oauth2/userinfo;
                proxy_redirect https://xxx.xxx.xxx.xx3:9443/oauth2/userinfo https://is.wso2.com/oauth2/userinfo ;
                proxy_redirect https://xxx.xxx.xxx.xx4:9443/oauth2/userinfo https://is.wso2.com/oauth2/ userinfo;
            }
        }
        ```

3. Now that you've configured HTTP requests, you must also configure HTTPS requests. Configure Nginx to direct the HTTPS requests to the two worker nodes via the HTTPS 443 port using `https://is.wso2.com/`. To do this, create a VHost file ( ` is.https.conf ` ) in the `/etc/nginx/conf.d` directory and add the following configurations into it.

    !!! note
        The configurations for the Nginx community version and NGINX Plus are different here since the community version does not support the `sticky` directive.

    === "nginx Community Version"
        ```
        upstream ssl.wso2.is.com {
            server xxx.xxx.xxx.xx3:9443;
            server xxx.xxx.xxx.xx4:9443;
            ip_hash;
        }

        server {
        listen 443;
            server_name is.wso2.com;
            ssl on;
            ssl_certificate /etc/nginx/ssl/wrk.crt;
            ssl_certificate_key /etc/nginx/ssl/wrk.key;
            location / {
                    proxy_set_header X-Forwarded-Host $host;
                    proxy_set_header X-Forwarded-Server $host;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_read_timeout 5m;
                    proxy_send_timeout 5m;
                    proxy_pass https://ssl.wso2.is.com;
        
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                }
        }
        ```

    === "NGINX Plus"
        ``` java
        upstream ssl.wso2.is.com {
            server xxx.xxx.xxx.xx3:9443;
            server xxx.xxx.xxx.xx4:9443;

                    sticky learn create=$upstream_cookie_jsessionid
                    lookup=$cookie_jsessionid
                    zone=client_sessions:1m;
        }
    
        server {
        listen 443;
            server_name is.wso2.com;
            ssl on;
            ssl_certificate /etc/nginx/ssl/wrk.crt;
            ssl_certificate_key /etc/nginx/ssl/wrk.key;
            location / {
                    proxy_set_header X-Forwarded-Host $host;
                    proxy_set_header X-Forwarded-Server $host;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_read_timeout 5m;
                    proxy_send_timeout 5m;
                    proxy_pass https://ssl.wso2.is.com;
         
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                }
        }
        ```

4. Configure Nginx to access the WSO2 Identity Server Management Console as `https://mgt.is.wso2.com/carbon` via HTTPS 443 port. This is to direct requests to the manager node. To do this, create a VHost file (`mgt.is.https.conf`) in the `/etc/nginx/conf.d` directory and add the following configurations into it.

    !!! note "Console configurations"
        ``` java
        server {
            listen 443;
            server_name mgt.is.wso2.com;
            ssl on;
            ssl_certificate /etc/nginx/ssl/mgt.crt;
            ssl_certificate_key /etc/nginx/ssl/mgt.key;

            location / {
                    proxy_set_header X-Forwarded-Host $host;
                    proxy_set_header X-Forwarded-Server $host;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_read_timeout 5m;
                    proxy_send_timeout 5m;
                    proxy_pass https://xxx.xxx.xxx.xx2:9443/;
        
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                }
            error_log  /var/log/nginx/mgt-error.log ;
                access_log  /var/log/nginx/mgt-access.log;
        }
        ```

5. Reload the Nginx server using the following command:

    ```
    $sudo service nginx reload
    ```

    !!! tip
        If you have made modifications to anything other than the VHost files, you may need to restart the Nginx server instead of reloading it.
        ```
        $sudo service nginx restart
        ```
