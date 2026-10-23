# NGINX Reverse Proxy and SSL Configuration

NGINX sits in front of your WSO2 IS nodes and serves as the single entry point for all incoming traffic. It terminates SSL connections, forwards requests to the backend nodes, and distributes load across the cluster. This section covers installing NGINX on a dedicated EC2 instance, generating a self-signed SSL certificate for testing, and configuring the reverse proxy to route traffic to your WSO2 IS nodes.

---

## Create the NGINX EC2 Instance

Launch a separate EC2 instance to host NGINX. This keeps the proxy layer independent from the WSO2 IS application nodes.

| Setting | Recommended Value | Notes |
|---------|-------------------|-------|
| AMI | Ubuntu Server 24.04 LTS | Same base OS as the WSO2 IS nodes |
| Instance type | `t2.medium` or higher | NGINX is lightweight; size based on expected request volume |
| VPC | `WSO2-IS-VPC` | Must be in the same VPC as the WSO2 IS nodes |
| Subnet | Public subnet | Requires a public IP for external access |
| Auto-assign Public IP | Enabled | Required for external client access |
| Key pair | `wso2is-keypair` | Same key pair used for the IS nodes |

**Security group inbound rules for the NGINX instance:**

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| `22` | SSH | Your IP | Administrative access |
| `443` | HTTPS | `0.0.0.0/0` | Incoming client traffic via SSL |
| `9443` | Custom TCP | Internal / testing only | Direct WSO2 IS backend access |

---

## Connect to the NGINX Instance

```bash
ssh -i ~/.ssh/wso2is-keypair.pem ubuntu@<NGINX-EC2-Public-IP>
```

Replace `<NGINX-EC2-Public-IP>` with the public IP of the NGINX instance.

---

## Install NGINX

**Update the package list and install NGINX:**
```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install nginx -y
```

**Start NGINX and enable it to run on boot:**
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

**Verify the installation:**
```bash
sudo systemctl status nginx
curl http://localhost
```

A response from the default NGINX welcome page confirms the installation is working.

---

## Generate a Self-Signed SSL Certificate

For testing purposes, generate a self-signed certificate. In production, replace this with a certificate from a trusted Certificate Authority (CA) such as Let's Encrypt or your organization's internal CA.

**Generate a private key:**
```bash
openssl genrsa -out wso2-is-test.com.key 2048
```

**Create a Certificate Signing Request (CSR):**
```bash
openssl req -new -key wso2-is-test.com.key -out wso2-is-test.com.csr \
  -subj "/C=LK/ST=Western/L=Colombo/O=MyOrganization/OU=IT/CN=wso2-is-test.com"
```

Update the `-subj` values to reflect your organization and domain.

**Generate the self-signed certificate (valid for 1 year):**
```bash
openssl x509 -req -days 365 -in wso2-is-test.com.csr \
  -signkey wso2-is-test.com.key -out wso2-is-test.com.crt
```

**Move the certificate and key to the NGINX SSL directory:**
```bash
sudo mkdir -p /etc/nginx/ssl
sudo mv wso2-is-test.com.crt /etc/nginx/ssl/
sudo mv wso2-is-test.com.key /etc/nginx/ssl/
```

---

## Configure Local Hostname Mapping for Testing

To resolve the domain name locally during testing, add an entry to your machine's hosts file.

Edit the hosts file on your **local machine**:
```bash
sudo nano /etc/hosts
```

Add the following line:
```
<NGINX-EC2-Public-IP>    wso2-is-test.com
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

**Verify the mapping:**
```bash
ping wso2-is-test.com
curl -vk https://wso2-is-test.com
```

The domain should resolve to your NGINX instance's public IP.

!!! note
    This hosts file entry applies only to your local machine. In a production environment, configure DNS through Route 53 or your organization's DNS provider.

---

## Configure the NGINX Reverse Proxy

Open the default NGINX site configuration:
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace the contents with the following configuration:

```nginx
# Upstream WSO2 IS backend nodes
upstream wso2_backend {
    server <Node-1-Private-IP>:9443;
    server <Node-2-Private-IP>:9443;
}

server {
    listen 443 ssl;
    server_name wso2-is-test.com;

    ssl_certificate     /etc/nginx/ssl/wso2-is-test.com.crt;
    ssl_certificate_key /etc/nginx/ssl/wso2-is-test.com.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass https://wso2_backend/;
        proxy_set_header Host $host;
        proxy_ssl_name localhost;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Required when WSO2 IS nodes use self-signed certificates
        proxy_ssl_verify off;
        proxy_ssl_server_name on;
        proxy_ssl_protocols TLSv1.2 TLSv1.3;
    }
}
```

Replace `<Node-1-Private-IP>` and `<Node-2-Private-IP>` with the private IPs of your WSO2 IS EC2 nodes.

| Configuration Key | Purpose |
|-------------------|---------|
| `upstream wso2_backend` | Defines the pool of backend WSO2 IS nodes for load balancing |
| `ssl_certificate` / `ssl_certificate_key` | Points NGINX to the self-signed certificate and key |
| `ssl_protocols` | Enforces modern TLS versions only |
| `proxy_pass` | Forwards all requests to the upstream backend pool |
| `proxy_ssl_verify off` | Allows NGINX to accept self-signed certificates from backend nodes |
| `X-Forwarded-For` | Passes the original client IP to WSO2 IS for accurate logging |

---

## Test and Reload NGINX

**Test the configuration syntax:**
```bash
sudo nginx -t
```

Expected output:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**Reload NGINX to apply the configuration:**
```bash
sudo systemctl reload nginx
```

**Verify NGINX is listening on port 443:**
```bash
sudo ss -tulnp | grep 443
```

---

## Update deployment.toml on Both WSO2 IS Nodes

Now that NGINX is configured with a public hostname, update the WSO2 IS `deployment.toml` on both nodes to reflect the hostname and proxy port:

```bash
cd ~/is-server/wso2is/repository/conf
nano deployment.toml
```

Add or update the following:

```toml
[server]
hostname = "wso2-is-test.com"
node_ip = "0.0.0.0"
base_path = "https://$ref{server.hostname}:${carbon.management.port}"

[transport.https.properties]
proxyPort = 443
```

| Setting | Value | Reason |
|---------|-------|--------|
| `hostname` | `wso2-is-test.com` | Must match the domain configured in NGINX |
| `node_ip` | `0.0.0.0` | Binds WSO2 IS to all network interfaces on the instance |
| `proxyPort` | `443` | Tells WSO2 IS that the public-facing port is 443, not 9443 |

Save and exit on both nodes, then restart WSO2 IS for the changes to take effect.

---

## Verify the Reverse Proxy

**Test the SSL certificate:**
```bash
openssl s_client -connect wso2-is-test.com:443
```

Certificate details for `wso2-is-test.com` should appear in the output.

**Test the full proxy path:**
```bash
curl -vk https://wso2-is-test.com
```

The WSO2 IS login page response should be returned through NGINX.

---

## NGINX Configuration Summary

| Component | Status to Verify |
|-----------|-----------------|
| NGINX service | Running (`systemctl status nginx`) |
| SSL certificate and key | Present in `/etc/nginx/ssl/` |
| NGINX config syntax | Passes `nginx -t` |
| Port 443 | Listening (`ss -tulnp \| grep 443`) |
| Reverse proxy | Returns WSO2 IS response via `curl -vk https://wso2-is-test.com` |
| WSO2 IS `deployment.toml` | `hostname` set to domain, `proxyPort` set to `443` on both nodes |
