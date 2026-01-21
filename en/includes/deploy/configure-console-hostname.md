# Restrict Public Access to Management Operations

When deploying WSO2 Identity Server, you have the capability to isolate management operations from runtime traffic. By segregating administrative operations, you reduce the attack surface and ensure that high-privilege operations aren't exposed to the public.

This guide outlines two strategies to achieve this in WSO2 Identity Server:

1. **Network-Level Isolation (Recommended)**: Using physical or logical network separation (Control Plane vs. Data Plane).
2. **Proxy-Level Isolation**: Using a reverse proxy to expose the console on a dedicated, non-public hostname.

---

## Approach 1: Control plane & data plane separation

The most robust security model involves physically or logically separating the infrastructure into two planes: a **Control Plane** for administration and a **Data Plane** for runtime operations.

![data-plane-control-plane-seperation]({{base_path}}/assets/img/deploy/data-plane-control-plane-seperation.png)

### 1. Control plane (internal)

The control plane manages administrative tasks (e.g., user management, IdP configuration).

- **Access:** Restricted to internal networks (VPN) or specific IP ranges. **Never** exposed to the public internet.
- **Components:** Identity Server nodes in this plane handle the management operations.
- **Endpoint Visibility:** The load balancer for this plane allows traffic to the `/console` and management APIs.

### 2. Data plane (external)

The data plane handles high-volume runtime traffic from end-users and applications.

- **Access:** Exposed publicly via a public load balancer.
- **Components:** Nodes in this plane are for serving authentication requests and other runtime operations of end-users.
- **Endpoint Visibility:** The public load balancer **blocks** access to sensitive paths.
  - **Blocked Paths:** `/console`, `/carbon`, `/api/server/v1/*` (Management APIs).
  - **Allowed Paths:** `/oauth2`, `/samlsso`, `/scim2/Me`, `/api/identity/user/v1.0/me` (Self-service).

---

## Approach 2: Separate hostname via reverse proxy

If full network separation isn't possible, you can achieve logical isolation by exposing the Console application on a different hostname. This allows you to apply different firewall rules or access policies to the Console domain (e.g., `is.dev.wso2.com`) compared to the public runtime domain (e.g., `carbon.dev.wso2.com`).

This guide uses a Reverse Proxy (NGINX) to rewrite traffic dynamically:

- **Public Runtime URL:** `https://carbon.dev.wso2.com` (Used for login, OAuth flows, user portal).
- **Admin Console URL:** `https://is.dev.wso2.com/console` (Used for administrative operations).

### Step 1: Configure the reverse proxy (NGINX)

The proxy must intercept the Console traffic and rewrite the response body to ensure the browser stays on the `is.dev` domain.

> **Prerequisite:** Configure NGINX and make sure you have SSL certificates for both domains.

Create or update your NGINX configuration file according to the below sample.

```nginx
# Upstream for Identity Server backend
upstream is_backend {
    server 127.0.0.1:9443;
    ip_hash;
}

# Proxy for full Identity Server under carbon.dev.wso2.com
server {
    listen 443 ssl;
    server_name carbon.dev.wso2.com;

    ssl_certificate <path-to-certificate>/certificate.crt;
    ssl_certificate_key <path-to-private-key>/privateKey.key;

    location / {
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;

        proxy_read_timeout 5m;
        proxy_send_timeout 5m;

        proxy_pass https://is_backend;
        proxy_cookie_path / /;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# Proxy for Console under is.dev.wso2.com
server {
    listen 443 ssl;
    server_name is.dev.wso2.com;

    gzip on;
    gzip_types text/html text/css application/javascript application/json text/xml;

    ssl_certificate  <path-to-certificate>/certificate.crt;
    ssl_certificate_key <path-to-private-key>/privateKey.key;

    location ~ ^(/t/[^/]+)?(/o(/[^/]+)?)?/(api|scim2|logincontext)(.*)$ {
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;

        proxy_read_timeout 5m;
        proxy_send_timeout 5m;

        proxy_pass https://is_backend;
        proxy_cookie_path / /;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location ~ ^(/t/[^/]+)?(/o/[^/]+)?/(console|oauth2|oidc|authenticationendpoint|accountrecoveryendpoint|commonauth)(.*)$ {
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;

        proxy_read_timeout 5m;
        proxy_send_timeout 5m;

        proxy_pass https://is_backend;
        proxy_cookie_path / /;

        proxy_set_header Accept-Encoding "";

        sub_filter 'carbon.dev.wso2.com' 'is.dev.wso2.com';
        sub_filter_once off;

        proxy_redirect https://carbon.dev.wso2.com/ https://is.dev.wso2.com/;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

| Configuration                                  	|Description                                                                     	|
|-------------------------------------------------- |---------------------------------------------------------------------------------- |
| `upstream is_backend` | This block defines a group of servers that NGINX can proxy requests to. Here, it points to the WSO2 Identity Server running on `127.0.0.1:9443`. |
| `server { server_name carbon.dev.wso2.com; ... }` | This server block handles all requests for the main Identity Server hostname. It proxies all requests under this domain to the `is_backend`. |
| `server { server_name is.dev.wso2.com; ... }` | This is the server block dedicated to the Console's hostname. It contains two location blocks to handle different paths. |
| `location ~ ^(/t/[^/]+)?(/o(/[^/]+)?)?/(api\|scim2\|logincontext)(.*)$ {` | Proxy API and SCIM requests to the Identity Server. |
| `location ~ ^(/t/[^/]+)?(/o/[^/]+)?/(console\|oauth2\|oidc\|authenticationendpoint\|accountrecoveryendpoint\|commonauth)(.*)$ {` | Handle Console, OAuth/OIDC, and other authentication-related endpoints. |
| `sub_filter 'carbon.dev.wso2.com' 'is.dev.wso2.com';` | Replace any occurrences of the main Identity Server hostname with the Console's hostname in the response body. This is crucial for rewriting URLs in the HTML content. |
| `proxy_redirect https://carbon.dev.wso2.com/ https://is.dev.wso2.com/;` | Rewrite the `Location` header in HTTP redirects, ensuring that the user stays on the Console's domain. |

!!! note

    Some load balancers dosen't support URL rewrite rules similar to `sub_filter` on NGINX. In such cases, you can implement approach 1 described above.

### Step 2: Configure WSO2 Identity Server

Add the following configurations to the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.

```toml
[server]
hostname = "carbon.dev.wso2.com"
node_ip = "127.0.0.1"
base_path = "https://$ref{server.hostname}"

[transport.https.properties]
proxyPort = 443

[cors]
allowed_origins = [
    "https://is.dev.wso2.com",
]

[console]
callback_url = "regexp=(https://is.dev.wso2.com/console|https://is.dev.wso2.com/t/carbon.super/console|https://is.dev.wso2.com/t/carbon.super/o/(.*)/console)"
server_origin = "https://is.dev.wso2.com"

[console.idp_configs]
signInRedirectURL = "https://is.dev.wso2.com/console"
issuer = "https://carbon.dev.wso2.com/oauth2/token"
```

After applying these configurations, restart the WSO2 Identity Server. You can now access the Console application using `https://is.dev.wso2.com:443/console`.
