# EC2 Instance Setup

This section walks through launching and preparing the EC2 instances that will host your WSO2 Identity Server nodes. By the end of this section, you will have two running instances — referred to throughout this guide as `is-node-1` and `is-node-2` — connected to your VPC, accessible via SSH, and ready for the WSO2 IS installation.

---

## Launching EC2 Instances

### Step 1 — Log in to AWS Management Console

Open your browser, navigate to the AWS Management Console, and sign in with your credentials.

### Step 2 — Navigate to the EC2 Dashboard

From the AWS Services menu, select **EC2** to open the EC2 Dashboard, where you can manage instances, security groups, key pairs, and related resources.

### Step 3 — Open the Launch Wizard

Click **Launch Instances** to open the instance configuration wizard.

### Step 4 — Configure the Instance

#### Naming Convention

Use a consistent naming pattern so nodes are easy to identify across your AWS console, logs, and monitoring tools.

| Example Name | Pattern |
|--------------|---------|
| `is-node-1` | `<role>-node-<number>` |
| `is-node-2` | `<role>-node-<number>` |

Guidelines:

- Include the role of the instance (e.g., `is` for Identity Server).
- Include a sequence number (e.g., `1`, `2`) to distinguish nodes.

#### Instance Configuration

| Setting | Recommended Value | Notes |
|---------|-------------------|-------|
| AMI | Ubuntu Server 24.04 LTS (HVM), EBS General Purpose (SSD) | Stable, long-term support base OS |
| Instance type | `t3.medium` | Sufficient for test and moderate-load environments |
| Instance type (production) | `t3.large`, `t3.xlarge`, or `t2.xlarge` | Scale up based on expected traffic and load |

!!! note
    For small to medium test environments, `t3.medium` is sufficient. For production or high-load environments, choose an instance type with more CPU and memory to avoid resource contention under peak authentication traffic.

#### Key Pair Configuration

A key pair is required to establish SSH connections to your EC2 instances. You can create a new one or reuse an existing key pair.

**To create a new key pair:**

1. In the EC2 launch wizard, under **Key Pair**, select **Create a new key pair**.
2. Enter a name (e.g., `wso2is-keypair`).
3. Select the key file format:

    | OS | Format |
    |----|--------|
    | Linux / macOS | `.pem` |
    | Windows (PuTTY) | `.ppk` |

4. Click **Create Key Pair**. The private key file downloads automatically.

!!! warning "Do not lose this file"
    AWS does not allow you to download the private key again after creation. Store it in a secure location. You will need it to SSH into both nodes throughout this guide.

#### Network Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| VPC | `WSO2-IS-VPC` | The VPC created in the previous section |
| Subnet | Public subnet (e.g., `wso2-public-subnet-1`) | Required for SSH and external connectivity |
| Auto-assign Public IP | Enabled | Allows direct SSH access and web traffic |
| Security Group | `wso2is-nginx-sg` | The security group configured in the previous section |

!!! note
    For internal-only resources such as RDS, use a private subnet and disable auto-assigned public IP. Elastic IPs can be assigned later if a static public IP is needed.

### Step 5 — Launch the Second Node

After launching the first node (`is-node-1`), click **Launch Instances** again and apply the same configuration for the second node (`is-node-2`):

| Setting | Value |
|---------|-------|
| Name | `is-node-2` |
| AMI | Same as node 1 |
| Instance type | Same as node 1 |
| Key pair | Same `.pem` key (`wso2is-keypair`) |
| VPC | `WSO2-IS-VPC` |
| Subnet | Same public subnet as node 1 |
| Auto-assign Public IP | Enabled |
| Security Group | Same as node 1 |

### Step 6 — Verify Both Instances

Navigate to **EC2 Dashboard → Instances** and confirm:

- Both `is-node-1` and `is-node-2` show a status of **Running**.
- Both have public IP addresses assigned.
- Note these public IPs — you will use them throughout this guide.

---

## Connect via SSH and Verify the Environment

### Prepare the SSH Key

Locate the `.pem` file downloaded during key pair creation and set the correct file permissions:

```bash
chmod 400 wso2is-keypair.pem
```

This permission level is required for SSH to accept the key. Without it, SSH will reject the connection.

### Connect to Each Node

!!! note
    Run the following commands from the directory where your `.pem` file is saved. If it is in your `Downloads` folder, navigate there first.

```bash
cd ~/Downloads
```

**Connect to Node 1:**
```bash
ssh -i "wso2is-keypair.pem" ubuntu@<Node-1-Public-IP>
```

**Connect to Node 2:**
```bash
ssh -i "wso2is-keypair.pem" ubuntu@<Node-2-Public-IP>
```

A successful connection displays the Ubuntu welcome banner and drops you into the instance terminal:

```
Welcome to Ubuntu 24.04 LTS (GNU/Linux ...)
ubuntu@ip-<private-ip>:~$
```

### Verify Node-to-Node Connectivity

Confirm that the two nodes can communicate with each other over the internal VPC network.

**From Node 1 terminal:**
```bash
ping <Node-2-Private-IP>
```

**From Node 2 terminal:**
```bash
ping <Node-1-Private-IP>
```

**Verify public IP access from your local machine:**
```bash
curl http://<Node-1-Public-IP>
curl http://<Node-2-Public-IP>
```

---

## Prepare Each Node

Run all commands in this section on **both nodes** unless stated otherwise.

### Update System Packages

Ensure each node has the latest security patches before installing any software:

```bash
sudo apt update && sudo apt upgrade -y
```

**Verify the system is fully updated:**
```bash
sudo apt update
```

Expected output:
```
0 packages can be upgraded
```

### Install Required Utilities

```bash
sudo apt install wget unzip curl -y
```

| Utility | Purpose |
|---------|---------|
| `wget` | Downloads files from the internet over HTTP, HTTPS, and FTP |
| `unzip` | Extracts `.zip` archives |
| `curl` | Transfers data over URLs — useful for testing endpoints and downloading files |

**Verify each utility is available:**
```bash
which wget
which unzip
which curl
```

Expected output:
```
/usr/bin/wget
/usr/bin/unzip
/usr/bin/curl
```

### Install Java

WSO2 Identity Server requires Java to run. Install the version specified in the [WSO2 IS compatibility matrix](https://is.docs.wso2.com) for your release.

**Check if Java is already installed:**
```bash
java -version
```

**Install Java (if not present):**
```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
```

**Verify the installation:**
```bash
java -version
```

**Set `JAVA_HOME`:**
```bash
readlink -f $(which java)
```

Use the output path (minus `/bin/java`) to set `JAVA_HOME`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc
```

**Confirm the variable is set:**
```bash
echo $JAVA_HOME
```

### Create the Installation Directory

Create a dedicated folder to keep the WSO2 IS installation organized and consistent across both nodes:

```bash
mkdir -p ~/is-server
cd ~/is-server
```

**Verify the directory was created:**
```bash
pwd
```

Expected output:
```
/home/ubuntu/is-server
```

```bash
ls -la
```

Expected output:
```
total 0
drwxr-xr-x  2 ubuntu ubuntu  4096 ...
drwxr-xr-x 23 ubuntu ubuntu  4096 ...
```

!!! note
    You may choose any folder name that is meaningful to your project (e.g., `wso2-identity`, `identity-server`). Use the same name on both nodes for consistency.

---

## Section Summary

At the end of this section, both nodes should meet the following criteria:

| Checkpoint | Expected State |
|------------|----------------|
| EC2 instances | Running with public IPs assigned |
| SSH access | Accessible from your local machine using the `.pem` key |
| Node-to-node ping | Successful over private VPC network |
| System packages | Fully updated |
| Utilities | `wget`, `unzip`, `curl` installed and verified |
| Java | Installed and `JAVA_HOME` configured |
| Installation directory | `~/is-server` created on both nodes |
