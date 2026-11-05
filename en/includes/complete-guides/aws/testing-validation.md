# Testing and Validation

This section walks through validating each layer of the deployment — from EC2 node connectivity and database access through to NGINX reverse proxy behavior and end-to-end SSL. Work through the checks in order, as each layer depends on the one below it.

---

## 1. Verify EC2 Node Connectivity

### Node-to-Node Communication

Confirm that the two WSO2 IS nodes can reach each other over the internal VPC network.

**From Node 1:**
```bash
ping <Node-2-Private-IP>
```

**From Node 2:**
```bash
ping <Node-1-Private-IP>
```

Both should respond continuously. Press `Ctrl+C` to stop.

### Public IP Access

From your local machine, verify both nodes are reachable over HTTP:
```bash
curl http://<Node-1-Public-IP>
curl http://<Node-2-Public-IP>
```

---

## 2. Verify Database Connectivity

From either EC2 node, connect to the RDS instance:
```bash
mysql -h <RDS_ENDPOINT> -P 3306 -u <MASTER_USERNAME> -p
```

Once connected, confirm the schema and tables are present:
```sql
USE wso2db;
SHOW TABLES;
```

The output should include tables with the following prefixes:

| Table Prefix | Component |
|--------------|-----------|
| `UM_` | User management |
| `IDN_` | Identity and authentication |
| `CONSENT_` | User consent management |

Exit the MySQL client:
```sql
EXIT;
```

---

## 3. Verify NGINX is Running

**Check the NGINX service status:**
```bash
sudo systemctl status nginx
```

The output should show `Active: active (running)`.

**Confirm NGINX is listening on port 443:**
```bash
sudo ss -tulnp | grep 443
```

**Test the configuration syntax:**
```bash
sudo nginx -t
```

Expected output:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

## 4. Verify the SSL Certificate

**Test the SSL handshake using OpenSSL:**
```bash
openssl s_client -connect wso2-is-test.com:443
```

The output should display the certificate details for `wso2-is-test.com`, including the issuer, validity period, and subject.

**Test the full proxy path using curl:**
```bash
curl -vk https://wso2-is-test.com
```

A response body containing WSO2 IS content confirms NGINX is correctly terminating SSL and proxying requests to the backend nodes.

---

## 5. Verify Hostname Resolution

```bash
ping wso2-is-test.com
```

This should resolve to your NGINX instance's public IP, as configured in the local hosts file. Confirm the IP in the ping output matches `<NGINX-EC2-Public-IP>`.

---

## 6. Access the WSO2 IS Console via Browser

Open a browser and navigate to:
```
https://wso2-is-test.com/console
```

- The WSO2 Identity Server login page should load through the NGINX proxy.
- A self-signed certificate warning will appear in the browser — this is expected. Proceed past the warning.
- Log in with `admin` / `admin` (or the credentials configured in `deployment.toml`).

---

## 7. Verify Both Nodes Are Serving Traffic

Monitor the logs on both nodes during active browser sessions to confirm that NGINX is distributing requests across both nodes.

**Node 1:**
```bash
tail -f ~/is-server/wso2is/repository/logs/wso2carbon.log
```

**Node 2:**
```bash
tail -f ~/is-server/wso2is/repository/logs/wso2carbon.log
```

As you interact with the console, both logs should show incoming request activity, confirming that NGINX is load balancing between the two nodes.

---

## Validation Checklist

| Layer | Check | Expected Result |
|-------|-------|-----------------|
| EC2 networking | Node-to-node ping | Successful responses from both nodes |
| EC2 networking | Public IP curl | HTTP response returned |
| Database | `mysql -h ...` connection | MySQL monitor prompt appears on both nodes |
| Database | `SHOW TABLES` | Tables with `UM_`, `IDN_`, `CONSENT_` prefixes visible |
| NGINX | `systemctl status nginx` | `Active: active (running)` |
| NGINX | `nginx -t` | Syntax OK |
| NGINX | Port 443 check | Port listed in `ss -tulnp` output |
| SSL | `openssl s_client` | Certificate details displayed |
| SSL | `curl -vk https://...` | WSO2 IS response returned |
| DNS | `ping wso2-is-test.com` | Resolves to NGINX public IP |
| Console | Browser access | WSO2 IS login page loads |
| Load balancing | Logs on both nodes | Both nodes show request activity |
