# Using Remote Registry Instances for the Registry Partitions

You can configure and use the registry space in one of the following
ways:  

-   Use the registry space shipped by default with the product.  
-   Use remote registry instances for different registry partitions.
    These partitions can also be shared across multiple product
    instances.  

This guide explains the second option using WSO2 Governance Registry as
the remote registry instance.  

The registry space contains three major partitions as local,
configuration and governance repositories. For more information on these
partitions, see Working with the Registry . You can share t wo of these
three partitions across multiple product instances in a typical
production environment. Therefore, we identify four main deployment
strategies for the three partitions as follows: All Partitions in a
Single Server Config and Governance Partitions in a Remote Registry
Governance Partition in a Remote Registry Config and Governance
Partitions in Separate Nodes

In any of the above four sections, you can mount any WSO2 product to a
remote WSO2 Governance Registry instance. Examples discussed here use
JDBC-based configuration model as it is the recommended approach for a
production setup.
