# Working with the Registry

A **registry** is a content store and a metadata repository for various
artifacts such as services, WSDLs and configuration files. These
artifacts are keyed by unique paths where a path is similar to a Unix
file path. In WSO2 products, all configurations pertaining to modules,
logging, security, data sources and other service groups are stored in
the registry by default.

The registry kernel of WSO2 provides the basic registry and repository
functionality. WSO2 products use the services provided by the registry
kernel to establish their own registry spaces, which are utilized for
storing data and persisting configuration. Here are some of the features
provided by the WSO2 Registry interface:

-   Provides the facility to organize resources into collections.
-   Keeps multiple versions of resources.
-   Manages social aspects such as rating of resources.
-   Provides AtomPub interfaces to publish, view and manage resources
    from remote or non-Java clients.

The Registry space of any WSO2 product contains three major
partitions:  

-   **Local Repository** : Used to store configuration and runtime data
    that is local to the server. This partition is not to be shared with
    multiple servers. Mount point is
    `          /_system/local         `  
-   **Configuration Repository** : Used to store product-specific
    configurations. This partition can be shared across multiple
    instances of the same product (e.g., sharing ESB configurations
    across an ESB cluster). Mount point is
    `          /_system/config         `.
-   **Governance Repository** : Used to store configuration and data
    that are shared across the whole platform. This typically includes
    services, service descriptions, endpoints or datasources. Mount
    point of theis registry is `          /_system/governance         `
   .

You can browse the contents of the registry using the product's
management console.

  
!!! Note

    In the WSO2 Identity Server, registry is used to govern internally used 
    artifacts by the product components.