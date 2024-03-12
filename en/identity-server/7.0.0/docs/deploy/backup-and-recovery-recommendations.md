# Backup and Recovery Recommendations

WSO2 Identity Server does not persist data in the file systems or retain or generate artifacts. By default, it only stores log files in the file system and data and artifacts in the databases and the repository.

## What you should back up?

WSO2 Identity server recommends you to back up the following:

- **Database backups** :
    Back up of all the databases defined in `<IS_HOME>/repository/conf/deployment.toml`.

- **Artifact backups** :
    This includes hot-deployment artifacts, web applications, synapse files, tenant directories, etc. Backup of the `<IS_HOME>/repository` directory periodically. The frequency of the backups depends on your usage. For example, if you are creating or updating APIs daily, consider creating daily backups.

- **WSO2 product instance backups** :
    One-time-only backup that you take of the entire server directory. This includes all the configuration files, logs, server extensions, and deployment artifacts for both tenants and super tenants. This backup is ideally done when the server is ready to be deployed in a production environment.

## Backup recommendations

We recommend that you use a proper artifact management system such as [Puppet](https://puppet.com/) to back up and manage your artifacts before deploying them in the WSO2 Carbon runtime. Also, use the [WSO2 Update Manager(WUM)]({{base_path}}/deploy/get-started/get-wso2-updates) tool, which is a command-line utility that allows you to get the latest updates (bug fixes and security fixes) of a particular product release. The following diagram depicts how you can manage your artifacts using a configuration management system.

![Managing artifacts]({{base_path}}/assets/img/setup/deploy/puppet.png)

## Recovery recommendations

Be sure to determine the following depending on your business continuity requirements:

- **Recovery Point Objective (RPO)**: This determines up to what points are you to recover using the latest, known, and good points.
- **Recovery Time Objective (RTO)**: How long it takes to recover to the RPO.
- **Backup Frequency**: This decides how frequently you should take backups. If your RPO is one day, your backup frequency should be daily.
- **Disaster Recovery Site**: This denotes the place where the latest copy of your backup is. This can vary from a different shelf in your data center to a completely different geographical location.

We also recommend the following:

1. Align your artifact deployment and recovery processes.
2. Schedule disaster recovery drills to test the recoverability of the system.
3. Test your artifacts in an environment that is identical to the production environment before deploying them into production.

## Recovery strategy

The following steps include how to recover your setup using the backups:

1. Recover the hot-deployment artifacts by replacing the `<IS_HOME>/repository` directory with the backed up copy.
2. Recover the WSO2 Identity Server entirely by directly replacing the existing WSO2 server directory in its production setup with the backup server directory. This will ensure that all the files, logs, and configurations made to the product do not need to be redone.
3. To recover the databases, follow the recovery strategy recommended by the databases you are using. For information on supported and tested databases, see [Tested Database Management Systems]({{base_path}}/deploy/environment-compatibility/#tested-dbmss).
