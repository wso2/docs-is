# Troubleshooting

This section covers the most common issues encountered during a WSO2 Identity Server deployment on AWS, along with their causes and resolution steps. Work through the relevant section based on where the failure is occurring.

---

## WSO2 IS Fails to Start — Java Version Issue

**Symptom:** Running `./wso2server.sh` produces a Java-related error or exits immediately.

**Cause:** WSO2 Identity Server requires a specific Java version. If the wrong version is installed or `JAVA_HOME` is not set, the server will not start.

**Resolution:**

**Step 1 — Check the installed Java version:**
```bash
java -version
echo $JAVA_HOME
```

Confirm the output matches the Java version required by your WSO2 IS release. Refer to the [WSO2 IS compatibility matrix](https://is.docs.wso2.com) for the exact requirement.

**Step 2 — Install the correct Java version (if missing):**
```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
```

Verify the installation:
```bash
java -version
```

**Step 3 — Set `JAVA_HOME`:**

Find the Java binary path:
```bash
readlink -f $(which java)
```

Set `JAVA_HOME` to the JDK root (remove `/bin/java` from the output):
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc
```

Confirm:
```bash
echo $JAVA_HOME
java -version
```

---

## Cannot Connect to the RDS Database

**Symptom:** Running `mysql -h <RDS_ENDPOINT> ...` times out or is refused.

**Possible causes and fixes:**

| Cause | Fix |
|-------|-----|
| Port `3306` not allowed in the RDS security group | Add an inbound rule for MySQL (`3306`) sourced from the EC2 private subnet CIDR |
| Wrong RDS endpoint in the connection command | Copy the exact endpoint from **RDS → Databases → your instance → Connectivity & Security** |
| Incorrect master username or password | Use the exact credentials set during RDS creation |
| RDS instance not yet available | Check the RDS console — status must be **Available** before connecting |

**Verify the security group rule:**

Go to **EC2 → Security Groups → the security group attached to your RDS instance** and confirm an inbound rule exists for:

| Port | Source |
|------|--------|
| `3306` | EC2 private subnet CIDR (e.g., `10.0.0.0/24`) or the EC2 security group ID |

---

## WSO2 IS Starts but Immediately Crashes

**Symptom:** The server starts but logs show errors and the process exits.

**Step 1 — Check the logs:**
```bash
tail -200 ~/is-server/wso2is/repository/logs/wso2carbon.log
```

**Common log errors and their fixes:**

| Log Error | Cause | Fix |
|-----------|-------|-----|
| `Communications link failure` | Cannot reach RDS | Verify RDS endpoint, port, and security group |
| `Access denied for user` | Wrong DB credentials in `deployment.toml` | Correct `username` and `password` in the database config blocks |
| `Address already in use: 9443` | Another process is using port 9443 | Run `sudo lsof -i :9443`, kill the conflicting process, then restart |
| `JAVA_HOME not set` | Environment variable missing | Follow the Java setup steps above |

---

## NGINX Returns 502 Bad Gateway

**Symptom:** Accessing `https://wso2-is-test.com` shows a 502 error.

**Cause:** NGINX cannot reach the WSO2 IS backend nodes.

**Step 1 — Check the NGINX error log:**
```bash
sudo tail -50 /var/log/nginx/error.log
```

**Step 2 — Verify WSO2 IS is running on the backend nodes:**
```bash
ps aux | grep wso2
```

If WSO2 IS is not running, start it:
```bash
cd ~/is-server/wso2is/bin
./wso2server.sh
```

**Step 3 — Verify the private IPs in the NGINX upstream block:**

SSH into the NGINX instance and confirm the upstream block uses the correct private IPs:
```bash
sudo nano /etc/nginx/sites-available/default
```

The upstream block should match the actual private IPs of your EC2 nodes:
```nginx
upstream wso2_backend {
    server <Node-1-Private-IP>:9443;
    server <Node-2-Private-IP>:9443;
}
```

Get the correct private IPs from each node:
```bash
hostname -I
```

**Step 4 — Test the NGINX config and reload:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## SSL Certificate Warning in Browser

**Symptom:** Browser displays a "Your connection is not private" or "NET::ERR_CERT_AUTHORITY_INVALID" warning.

**Cause:** This is expected behavior when using a self-signed certificate. Browsers do not trust self-signed certificates by default.

**For testing:** Click **Advanced** and proceed past the warning. The connection is still encrypted.

**For production:** Replace the self-signed certificate with one issued by a trusted Certificate Authority. Options include:

| Option | Notes |
|--------|-------|
| Let's Encrypt | Free, automated — suitable for internet-facing deployments |
| AWS Certificate Manager (ACM) | Integrates with AWS load balancers and CloudFront |
| Internal CA | Appropriate for internal or enterprise deployments |

---

## Hostname Does Not Resolve

**Symptom:** `ping wso2-is-test.com` fails or resolves to the wrong IP.

**Cause:** The local hosts file entry is missing or incorrect.

**Fix:** Open `/etc/hosts` on your local machine and verify the entry:
```bash
sudo nano /etc/hosts
```

Confirm the following line exists with the correct NGINX public IP:
```
<NGINX-EC2-Public-IP>    wso2-is-test.com
```

Save and re-test:
```bash
ping wso2-is-test.com
```

---

## Admin Console Loads but Login Fails

**Symptom:** The WSO2 IS login page loads, but submitting credentials fails.

**Possible causes:**

| Cause | Fix |
|-------|-----|
| Admin account not created | Confirm `create_admin_account = true` is set on Node 1 and Node 1 was started first |
| Wrong credentials | Default is `admin` / `admin` unless changed in `deployment.toml` |
| Database connection issue during login | Check `wso2carbon.log` for database errors during the login attempt |
| Node 2 started before Node 1 fully initialized | Restart Node 1 first, wait for full startup, then restart Node 2 |

---

## General Production Checklist

Before moving from a test environment to production, review the following:

| Area | Action Required |
|------|-----------------|
| Security groups | Restrict all ports to known IPs or private subnets — remove `0.0.0.0/0` rules |
| Database access | Port `3306` must only be accessible from EC2 private subnet CIDRs |
| SSL certificate | Replace self-signed certificate with a CA-issued certificate |
| Admin credentials | Change the default `admin` / `admin` password immediately |
| Local hosts file | Remove test entries — configure DNS through Route 53 or your DNS provider |
| Multi-AZ RDS | Enable Multi-AZ on the RDS instance for automated failover |
| Instance sizing | Scale EC2 instance types based on production load requirements |
