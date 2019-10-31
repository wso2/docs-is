# Configuring the Task Scheduling Component

The **Task Scheduling** component in WSO2 Identity Server allows you to define
specific tasks and to invoke them periodiclly. 

Follow the instructions given on this page to configure and set up
this component **.** Then, see the respective product's documentation
for details on how to use task scheduling.

The task scheduling component is configured in the
`         tasks-config.xml        ` file (stored in the
`         <PRODUCT_HOME>/conf/etc/        ` directory for WSO2 EI, and
in the `         <PRODUCT_HOME>/repository/conf/etc/        ` directory
for other products).

Given below are the settings that you can configure in the
`         tasks-config.xml        ` file.


### Step 1: Setting the task server mode

Select one of the following values for the `tasks` element in the `deployment.toml` file:

-   `AUTO`: This is the default task handling mode. This setting
    detects if clustering is enabled in the
    server and automatically switches to CLUSTERED mode.

    !!! info    
        For more information on clustering, see [Clustering Overview](../../administer/clustering-overview). 

-   `STANDALONE`: This setting is used when a single instance of the
    product server is installed. That is, tasks will be managed locally
    within the server.

-   `CLUSTERED`: This setting is used when a cluster of product
    servers are put together. This requires Axis2 clustering to
    work. With this setting, if one of the servers in the cluster fail,
    the tasks will be rescheduled in one of the remaining server
    nodes.  

    ``` tab="Example"
    [tasks]
    mode = "AUTO"
    ```
    
    

### Step 2: Configuring a cluster of task servers

If you have enabled the `CLUSTERED` task server mode in [step
1](#step-1-setting-the-task-server-mode), the following
configuration elements in the `         tasks-config.xml        ` file
will be effective:

#### Setting the task server count

Use the parameter shown below to specify the number of servers (in the
cluster) that can handle tasks. The task server count is set to "1" by
default, which indicates that at least one node in the cluster is
required for task handling.

``` toml
[tasks.server]
count = "1"
```

Note that a product cluster begins the process of scheduling tasks only
after the given number of servers are activated. For example, consider a
situation where ten tasks are saved and scheduled in your product and
there are five task-handling servers. As the individual servers become
active, we do not want the first active server to schedule all the
tasks. Instead, all five servers should become active and share the ten
tasks between them.

#### Setting the default location resolver

The default location resolver controls how the scheduled tasks are
shared by multiple sever nodes of a cluster. Note that the task server
count should be a value larger than '1' for this location resolver
setting to be effective. For example, if there are 5 task-handling
servers in the cluster, the location resolver determines how the tasks
get shared among the 5 servers.

Handling task failover

The location resolver parameter also controls how task failover is
handled in a clustered environment. A scheduled task will only run in
one of the nodes (at a given time) in a clustered environment. The task
will failover to another node only if the first node fails. This
parameter determines how nodes are selected for task failover.

One of the following options can be used for the **location resolver**.

-   `RoundRobinTaskLocationResolver`: Cluster nodes are selected on a round-robin basis and the tasks
    are allocated. This location resolver is enabled in the
    `deployment.toml` file **by default** as shown below.

    ``` toml
    [tasks.resolver]
    class = "org.wso2.carbon.ntask.core.impl.RoundRobinTaskLocationResolver"
    ```

-   `RandomTaskLocationResolver`: Cluster nodes are randomly selected and the tasks are allocated.
    If you want to enable this location resolver, you need to change the
    default configuration (shown above) in the
    `deployment.toml` file as shown below.

    ``` toml
    [tasks.resolver]
    class = "org.wso2.carbon.ntask.core.impl.RandomTaskLocationResolver"
    ```

-   `RuleBasedLocationResolver`: This allows you to set the criteria for selecting the cluster
    nodes to which the tasks should be allocated. The
    `[task-type-pattern]`, `[task-name-pattern]`, and `[address-pattern
    of the server node]` can be used as criteria. 

    !!! example 
        With this setting, a scheduled task that matches a particular `[task-type-pattern`] and `[task-name-pattern]` will be allocated to the server node with a particular `[address-pattern]`. If multiple server nodes in the cluster match the `[address-pattern]`, the nodes are selected on a round robin basis. This criteria is specified in the configuration using the `<property>` element. Therefore, you can define multiple properties containing different criteria.  

    Before you enable this location resolver, you need to first comment
    out the default location resolver that is already enabled in the
    `           task-config.xml          ` file. You can then uncomment
    the following code block, and update the property values as
    required.

    ``` toml
    [task.resolver]
    class = "org.wso2.carbon.ntask.core.impl.RuleBasedLocationResolver"

    [loop]
    index = ""

    
        <defaultLocationResolver>
                <locationResolverClass>org.wso2.carbon.ntask.core.impl.RuleBasedLocationResolver</locationResolverClass>
                <properties>
                    <property name="rule-1">HIVE_TASK,HTTP_SCRIPT.*,192.168.1.*</property>
                    <property name="rule-2">HIVE_TASK,.*,192.168.2.*</property>
                    <property name="rule-5">.*,.*,.*</property>
                </properties>
        </defaultLocationResolver>
    ```

    As shown above, the property names (rule-1, rule-2 and rule-5)
    define a sequence for the list of properties in the configuration.
    Therefore, scheduled tasks will evaluate the criteria specified in
    each property according to the sequence. That is, rule-1 is checked
    before rule-2. In other words, the scheduled task will first check
    if it matches the criteria in rule-1, and if it does not, it will
    check rule-2.

    !!! note
    
        The `           RuleBasedLocationResolver          ` allows you to
        address scenarios where tasks are required to be executed in
        specific server nodes first. Then, it can fail-over to another set
        of server nodes if the first (preferred) one is not available.
    
