# Configuring Metrics Properties

When the [monitoring capability with metrics is
enabled](_Enabling_Metrics_and_Storage_Types_) in your product, the
metrics dashboard will be available when you log into the management
console. The metrics dashboard will provide a page for viewing the
statistics that use JVM metrics. Further, depending on the WSO2 product
that you are using, there will be a separate page for viewing
product-specific statistics using metrics.

The `         <PRODUCT_HOME>/repository/conf/metrics.properties        `
file specifies the properties that correspond to the gauges for JVM
metrics in the metrics dashboard. The level defined for a property in
this file determines the extent to which the relevant gauge in the
dashboard should be updated with information. The different levels that
can be defined for properties are as follows:

| Level     | Description                                                                                                    |
|-----------|----------------------------------------------------------------------------------------------------------------|
| **Off**   | Designates no informational events.                                                                            |
| **Info**  | Designates informational metric events that highlight the progress of the application at coarse-grained level. |
| **Debug** | Designates fine-grained informational events that are most useful to debug an application.                     |
| **Trace** | Designates finer-grained informational events than the DEBUG.                                                  |
| **All**   | Designates all the informational events.                                                                       |

If no specific level is configured for a property in the
`         metrics.properties        ` file, the metrics root level will
apply. The root level is defined as shown in the following example in
the `         metrics.properties        ` file.

``` java
metrics.rootLevel=OFF
```

If you want to change the current root level, you can also use the
following command.

``` java
-Dmetrics.rootLevel=INFO
```

The levels in the `         metrics.properties        ` file can be
configured to any hierarchy. However, if the level defined for an
individual property is different to the level defined for its parent in
the hierarchy, the level defined for the individual property will
overrule that of the parent. For example, if we have
`         metric.level.jvm.memory=INFO        ` in the
`         <PRODUCT_HOME>/repository/conf/metrics.properties        `
file, all metrics under `         jvm.memory        ` will have
`         INFO        ` as the configured level. However, if you have
`         metric.level.jvm.memory.heap=TRACE        ` , the
`         TRACE        ` level would apply for the
`         metric.level.jvm.memory.heap        ` property even though it
is a child property of `         jvm.memory.        `

The properties that are included in this file by default are as follows:

-   [JVM's direct and mapped buffer
    pools](#ConfiguringMetricsProperties-JVM'sdirectandmappedbufferpools)
-   [Class loading](#ConfiguringMetricsProperties-Classloading)
-   [GC](#ConfiguringMetricsProperties-GC)
-   [Memory](#ConfiguringMetricsProperties-Memory)
-   [Operating system
    load](#ConfiguringMetricsProperties-Operatingsystemload)
-   [Threads](#ConfiguringMetricsProperties-Threads)

### JVM's direct and mapped buffer pools

| Property                 | Default Level | Description                                               |
|--------------------------|---------------|-----------------------------------------------------------|
| metric.level.jvm.buffers | OFF           | The gauge showing the current number of distinct buffers. |

### Class loading

| Property                       | Default Level | Description                                                           |
|--------------------------------|---------------|-----------------------------------------------------------------------|
| metric.level.jvm.class-loading | INFO          | The gauge showing the number of classes currently loaded for the JVM. |

### GC

| Property            | Default Level | Description                                                                                                                                                     |
|---------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metric.level.jvm.gc | DEBUG         | The gauge for showing garbage collection and memory usage. Monitoring this allows you to identify memory leaks that will have a negative impact on performance. |

### Memory

| Property                         | Default Level | Description                                                                     |
|----------------------------------|---------------|---------------------------------------------------------------------------------|
| metric.level.jvm.memory          | INFO          | The gauge for showing the used and committed memory in WSO2 MB.                 |
| metric.level.jvm.memory.heap     | INFO          | The gauge for showing the used and committed heap in WSO2 MB.                   |
| metric.level.jvm.memory.non-heap | INFO          | The gauge for showing the used code cache and used CMS Perm Gen in WSO2 MB.     |
| metric.level.jvm.memory.total    | INFO          | The gauge for showing the total memory currently available for the JVM.         |
| metric.level.jvm.memory.pools    | OFF           | The gauge for showing the used and available memory for JVM in the memory pool. |

### Operating system load

| Property            | Default Level | Description                                                                        |
|---------------------|---------------|------------------------------------------------------------------------------------|
| metric.level.jvm.os | INFO          | The gauge for showing the current load imposed by the JVM on the operating system. |

### Threads

| Property                                      | Default Level | Description                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metric.level.jvm.threads                      | OFF           | The parent property of all the gauges relating to the JVM thread pool. The metric level defined for this property will apply to all the remaining properties in this table. The metric level set via this property to a child property can be overruled if a different level is set for it. |
| metric.level.jvm.threads.count                | DEBUG         | The gauge for showing the number of active and idle threads currently available in the JVM thread pool.                                                                                                                                                                                     |
| metric.level.jvm.threads.daemon.count         | DEBUG         | The gauge for showing the number of active `             daemon            ` threads currently available in the JVM thread pool.                                                                                                                                                            |
| metric.level.jvm.threads.blocked.count        | OFF           | The gauge for showing the number of threads that are currently blocked in the JVM thread pool.                                                                                                                                                                                              |
| metric.level.jvm.threads.deadlock.count       | OFF           | The gauge for showing the number of threads that are currently in deadlock in the JVM thread pool.                                                                                                                                                                                          |
| metric.level.jvm.threads.new.count            | OFF           | The gauge for showing the number of new threads generated in the JVM thread pool.                                                                                                                                                                                                           |
| metric.level.jvm.threads.runnable.count       | OFF           | The gauge for showing the number of runnable threads currently available in the JVM thread pool.                                                                                                                                                                                            |
| metric.level.jvm.threads.terminated.count     | OFF           | The gauge for showing the number of threads terminated from the JVM thread pool since you started running the WSO2 MB instance.                                                                                                                                                             |
| metric.level.jvm.threads.timed\_waiting.count | OFF           | The gauge for showing the number of threads with `             Timed_Waiting            ` status.                                                                                                                                                                                           |
| metric.level.jvm.threads.waiting.count        | OFF           | The gauge for showing the number of threads with `             Waiting            ` status in the JVM thread pool. One or more other threads are required to perform certain actions before these threads can proceed with their actions.                                                   |
