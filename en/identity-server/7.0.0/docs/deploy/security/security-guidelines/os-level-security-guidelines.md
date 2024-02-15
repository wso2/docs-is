# OS-Level Security Guidelines for Production Deployment

This section provides the list of OS-level security guidelines that are recommended for your production environment.

## Run the WSO2 process

Run WSO2 processes with a specific OS-level user.

Use a separate OS-level user to run WSO2 Identity Server. Make sure that the user is only granted the permissions required for that particular user to run the product.

Do not use the root/administrator user of your OS as the root/administrator is granted all privileges by default.

## Software usage

Minimize software to avoid vulnerability—make sure that you only install the software/packages that are relevant to your WSO2 Identity Server's deployment. Also, continuously monitor the software that you install.

To identify the minimum software requirements, refer to [installation pre-requisites]({{base_path}}/deploy/get-started/install/#prerequisites).


## Firewall

Enable a firewall at the OS level (for example, [iptables](https://help.ubuntu.com/community/IptablesHowTo)). This will protect inbound and outbound connections of WSO2 Identity Server. Make sure that you only open the required outbound and inbound ports from the OS-level firewall.

## TCP ports used for clustering

Restrict access to TCP ports used for clustering. To do this, apply a firewall at the host-level to disallow access to TCP ports used for clustering (by default, port `4000`, `4001`, etc.) from unrecognized hosts. These ports should be accessible only from other members of the WSO2 Identity Server cluster.

## SSH

Use Secure Shell (SSH) when interacting with servers and executing commands. Adhere to the following best practices when you configure SSH.

- Change the default ssh port to a higher value.
- Disable the root or administrator.
- Enable login with user keys.
- Display a legal banner or a security banner with security warnings before SSH authentication.

## System updates

Keep the system up-to-date. If there are security updates available for the packages installed in your OS (including the Java runtime), make sure to perform the necessary testing in a staging environment and install them for your OS.

## User activities

Monitor the activities of your OS users by enabling OS-level logs and by reviewing them regularly. You can also set up a centralized log monitoring system for this purpose.

## Session data

In a production environment, there is a possibility for a deadlock/database lock to occur when running a session data cleanup task in high-load scenarios.

To mitigate this, enable cleaning data in chunks by configuring the following properties in the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.  

``` toml
[session_data.cleanup]
clean_expired_session_data_in_chunks_of = "8192"
```

<!--!!! info 
    
    For more information on configuring sessions in production, see <a href="TBD:{{base_path}}/learn/authentication-session-persistence">Authentication Session Persistence</a> in the WSO2 Identity Server documentation.-->

## Backups

Make sure to backup important files and archive them continuously.

!!! note
    For more information, see [Backup and Recovery Recommendations]({{base_path}}/deploy/backup-and-recovery-recommendations/).
