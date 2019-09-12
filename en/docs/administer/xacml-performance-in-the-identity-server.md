# XACML Performance in the Identity Server

This topic includes details of performance tests that were carried out
to understand XACML performance when WSO2 Identity Server is used as the
Policy Decision Point (PDP). XACML performance highly depends on the
interaction between policies and requests. In this test, we attempt to
obtain representative performance numbers by using a large numbers of
random policies and random requests in this test. Note that this test is
specific to this scenario and not to the overall performance of the
XACML engine.

For this test, 1000 XACML policies were randomly generated and loaded
into to the Identity Server. A MySQL database was used as the datastore.
Apache JMeter was used as the PEP and a JMeter script sent random
requests to the PDP. Multiple Apache JMeter threads were used to provide
concurrency. When setting up the testing environment, WSO2 Identity
Server, Apache JMeter and MySQL database were run on three distinct AWS
instances. Performance tests were carried out with the Identity Server
cache enabled and again with the cache disabled.

### Test environment

#### Hardware

Three similar amazon AWS instances were used for the tests. The
specifications of the instances are:

-   Instance type: m3.xlarge
-   vCPU: Intel(R) Xeon(R) CPU E5-2670 v2 @ 2.50GHz
-   CPUs per instance: 4
-   Memory per instance: 15GB
-   AWS Instance Region: All instances are from same AWS region.

#### Software

-   Java version: 1.7.0\_60
-   WSO2 Identity Server version: 5.0.0
-   Apache JMeter version: 2.11.20140701
-   MySQL version: 5.5.37

### Test results

The throughput and latency of WSO2 Identity Server XACML engine is shown
in the following figure.

![Test results](../../assets/img/using-wso2-identity-server/test-results.png)

### Conclusions made

With Cache enabled (normal operation), WSO2 Identity Server provides a
XACML PDP of throughput exceeding 2000 transactions per second. This
throughput is almost independent of concurrency. Latency of transactions
is less than 50 milliseconds in most cases; except when concurrency is
400, where there is an abrupt increase of latency.
