# Sharing Databases in a Cluster

All WSO2 products are shipped with a default H2 database. WSO2
products use the underlying registry services in the WSO2 Carbon
platform to establish their own registry space, which is utilized for
storing data and persisting configurations. In addition to the registry
space, all identity-related data and user permissions are also stored in
this default database.

The registry space provided to each product contains three major
partitions.

-   The local data repository
-   The configuration registry
-   The governance registry

Each of these partitions can be separated in a clustered production
environment. The following table provides more information on each
partition and the type of data that would typically reside in them.

| Partition              | Description                                                                                                                                                                                                                                | Type of data                                                                                                                                                                                                                                              |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Local data repository  | This partition of the registry space is specific to the node that the product resides in. This is not intended to be shared among multiple servers.                                                                                        | The local data repository contains system configuration as well as runtime data that is local to a single instance of a product. For example, the local data repository is used to store mount configurations that are local to each instance.            |
| Configuration registry | These configurations can be shared across multiple instances of the same product (a cluster of ESB nodes for example). However, these cannot be shared in a cluster of multiple different products unless certain configurations are done. | The configuration registry, which is the most widely used partition of the registry space, contains product specific configuration.                                                                                                                       |
| Governance registry    | The governance registry partition has been designed in a way that it can be made use of by multiple instances of various Carbon based products.                                                                                            | The governance registry contains data and configuration shared across the platform. The WSO2 Governance Registry makes use of this partition of the registry space to store services and related metadata such as WSDLs, schemas, policies and endpoints. |

### Databases in production environments

From most production environments, it is recommended to externalize the
databases to a JDBC database of your choice and split the registry space
to manage registry resources in a better way. The governance registry
and configuration registry data can either be stored in a single
database or in two databases (i.e., one for configuration and one for
governance) depending on the amount of data used.

The following diagram depicts how the databases are configured in a
typical WSO2 product cluster.

![](../../assets/img/56984483/56984486.png)

In the above diagram, the governance and configuration registry is
shared for the whole WSO2 product cluster (assuming the cluster is
comprised of the same WSO2 product; the configuration registry is not
shared for different products). This means, each node in the cluster is
configured to point to this database. These configurations involve
changes to the
`         <PRODUCT_HOME>/repository/conf/registry.xml        ` file for
each WSO2 product in the cluster.

The user management database is also shared among all nodes in the
cluster, although the way it is shared differs slightly from the
governance and configuration registry. The user management database is
basically a user store and is configured using the
`         <PRODUCT_HOME>/repository/conf/user-mgt.xml        ` file for
each WSO2 product in the cluster.

Furthermore, each WSO2 product has its own local data repository for
runtime data.

Each of the WSO2 products in the cluster must have datasources defined
for each of the databases that they point to. This is configured in the
`         <PRODUCT_HOME>/repository/conf/datasources/master-datasources.xml        `
file for each WSO2 product.

### Mounting the registry

The governance and configuration registry has to be mounted in order to
be shared by all products in the cluster. These mounting configurations
are done so that any changes to data in these databases are communicated
to all nodes in the product cluster. In the case of a node failing,
another node can take up the tasks required and will be able to do so as
the governance and configuration registry is up to date across all the
WSO2 product instances.
