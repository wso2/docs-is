# Additional Reading on Disaster Recovery

## Spectrum of Disaster Recovery Architectures
The diagram below depicts a spectrum of DR strategies that have been established for
achieving certain levels of RPO/RTO combinations. 

![Disaster recovery spectrum]({{base_path}}/assets/img/setup/deploy/disaster-recovery/disaster-recovery-strategy-spectrum.png){: width="800" style="display: block; margin: 0;"}

The reference points in the spectrum can be used when designing the deployment architecture to achieve the required service level.

!!! note
    It is currently **not** possible to deploy a fully-fledged WSO2 Identity Server in an 
    active-active (multi-site) deployment pattern due certain limitations in the product.

## Failover Mechanism Explained

The following diagram depicts the failover pipeline that is activated to transform the DR 
passive region into a fully fledged active region.

![Disaster recovery pipeline]({{base_path}}/assets/img/setup/deploy/disaster-recovery/disaster-recovery-pipeline.png){: style="display: block; margin: 0;"}

The duration of the downtime or service interruption during this process can vary depending 
on several factors:

- **Failover mechanism**: The efficiency of your failover mechanism and how quickly it can detect and respond to failures.
- **Initialization time**: The time it takes for the passive node to initialize and become fully operational. This can depend on factors such as the complexity of your application and the volume of data that needs to be loaded.
- **Configuration**: The configuration of your infrastructure and the sophistication of your load balancers or DNS settings. More advanced configurations can reduce downtime.
- **Testing and optimization**: How well you've tested and optimized your failover process. Regular testing and fine-tuning can help minimize downtime.

## General Trade Offs to Consider

#### 1. Manual vs automated failover
A manual failover mechanism is usually recommended as the decision to enable DR could be a
major business decision, and the failover of each system component could vary depending on the 
circumstances of the disaster in an unpredictable manner. But it also introduces a variable 
delay to the DR switch as human intervention is required. This can be mitigated by automating 
the failover mechanism, by using an Azure Pipeline Job for example, if the previously mentioned
factors are deemed as trivial to the system.

#### 2. Cold vs warm DR deployment
A cold DR deployment for IS would mean that the minimum RPO/RTO that can be offered would be 
in the range of a few hours. Such a RPO/RTO combination would not be acceptable for most 
businesses. However, a warm DR deployment would ensure a RPO/RTO in the range of a few minutes
but the maintenance costs of the DR environment would be much higher. Selecting a middle 
ground between these two types of deployments by modifying recovery mechanisms of granular 
components is a better approach as optimal costs and RTO/RPOs can be achieved in this manner.
For example, routing and network configurations can be already defined and set in the DR region
so that the cluster will be ready to operate as soon as it gets scaled up with the nodes and pods. 

## Replication Technologies
This section provides information on some common replication technologies that could help in 
designing the deployment pattern.

### Data Replication Services
Enterprises can choose from several database replication services that best fit the specific
needs and requirements for the DR sites, including:

- [**Azure Active geo-replication**](https://learn.microsoft.com/en-us/azure/azure-sql/database/active-geo-replication-overview?view=azuresql){target="_blank"}: 
Active geo-replication is a feature that lets you create a continuously synchronized readable secondary database for a primary database. The readable secondary database may be in the same Azure region as the primary or, more commonly, in a different region. This kind of readable secondary database is also known as a geo-secondary or geo-replica.

- [**Amazon RDS Multi-AZ Deployment**](https://aws.amazon.com/rds/features/multi-az/){target="_blank"}: 
A feature in Amazon Relational Database Service (RDS) that provides automatic failover to a standby database in the event of a primary database failure, ensuring disaster recovery.

- [**Google Cloud SQL Replication**](https://cloud.google.com/sql/docs/mysql/replication/){target="_blank"}: 
A solution for replicating Google Cloud SQL instances across multiple zones or regions for disaster recovery purposes.

- [**Oracle GoldenGate**](https://www.oracle.com/integration/goldengate){target="_blank"}: 
A real-time data replication and integration tool for Oracle databases, offering high availability and disaster recovery solutions.

- [**MySQL Replication**](https://dev.mysql.com/doc/refman/8.0/en/replication.html){target="_blank"}: 
A native replication solution for MySQL databases, offering automatic failover and disaster recovery capabilities.

- [**Microsoft SQL Server Replication**](https://learn.microsoft.com/en-us/sql/relational-databases/replication/sql-server-replication?view=sql-server-ver16){target="_blank"}: 
A set of technologies for copying and distributing data and database objects from one database to another, with options for synchronizing data for disaster recovery purposes.

- [**PostgreSQL Streaming Replication**](https://wiki.postgresql.org/wiki/Streaming_Replication){target="_blank"}: 
This feature in PostgreSQL allows asynchronous data replication from one database server to one or more replicas, providing disaster recovery capabilities.

- [**IBM Db2 Mirror**](https://www.ibm.com/products/db2mirroribmi){target="_blank"}: 
A data replication solution for IBM Db2 databases, providing disaster recovery and data protection.

These are some of the database replication services available for disaster recovery sites, and
organizations can choose the one that best fits their specific needs and requirements.

### File Artifacts Replication Services
Enterprises can choose from several database replication services that best fit the specific
needs and requirements for the DR sites, including:

- [**Azure Files**](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction){target="_blank"}: 
A fully managed file shares in the cloud that are accessible via the industry-standard SMB and NFS protocols. Azure Files shares can be mounted concurrently by cloud or on-premises Windows, Linux, and macOS deployments. Azure Files shares can also be cached on Windows Servers with Azure File Sync for fast access near where the data is being used.

- [**Amazon EFS**](https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html){target="_blank"}: 
You can use Amazon EFS replication to create a replica of your Amazon EFS file system in the AWS Region of your preference. When you enable replication on an EFS file system, Amazon EFS automatically and transparently replicates the data and metadata on the source file system to a new destination EFS file system and keeps the source and destination file systems synchronized. Amazon EFS replication is continual and designed to provide a recovery point objective (RPO) and a recovery time objective (RTO) of minutes.

- [**Google Cloud Filestore**](https://cloud.google.com/filestore/){target="_blank"}: 
High-performance, fully managed file storage. Cloud Filestore is a managed file storage service for applications that require a filesystem interface and a shared filesystem for data. Filestore gives users a simple, native experience for standing up managed Network Attached Storage (NAS) with their Google Compute Engine and Kubernetes Engine instances.
