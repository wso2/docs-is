# Changing the Default Ports

When you run multiple WSO2 products, multiple instances of the same
product, or multiple WSO2 product clusters on the same server or virtual
machines (VMs), you must change their default ports with an offset value
to avoid port conflicts. Port offset defines the number by which all
ports defined in the runtime such as the HTTP/S ports will be changed.
For example, if the default HTTP port is 9763 and the port offset is 1,
the effective HTTP port will change to 9764. For each additional WSO2
product instance, you set the port offset to a unique value.

-   [Default ports of WSO2
    products](#ChangingtheDefaultPorts-DefaultportsofWSO2products)
-   [Setting a port offset for the
    server](#ChangingtheDefaultPorts-Settingaportoffsetfortheserver)

### Default ports of WSO2 products

See [this link](../../administer/default-ports-of-wso2-products) for the list of ports
that are used in all WSO2 products.

### Setting a port offset for the server

The default port offset value is 0. There are two ways to set an offset
to a port:

-   Pass the port offset to the server during startup. The following
    command starts the server with the default port incremented by 3
    `          :./wso2server.sh -DportOffset=3         `
-   Set the Ports section of
    `          <PRODUCT_HOME>/repository/conf/carbon.xml         ` as
    follows: `          <Offset>3</Offset>         `

When you set the server-level port offset in WSO2 AS as shown above,
[all the ports](../../administer/default-ports-of-wso2-products) used by the server
will change automatically. However, this may not be the case with some
WSO2 products such as WSO2 APIM and WSO2 AM. See the [product
documentation](https://docs.wso2.com/dashboard.action) for instructions
that are specific to your product.
