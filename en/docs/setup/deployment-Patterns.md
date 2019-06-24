# Deployment Patterns

WSO2 Identity Server includes two main deployment patterns. These
patterns take [high
availability](https://docs.wso2.com/display/ADMIN44x/Clustering+Overview)
into consideration and are recommended for production deployment
environments. The following sections provide high level information on
the recommended patterns available and point off to instructions on how
to set up and configure the deployment pattern.

------------------------------------------------------------------------

-   [Deployment
    prerequisites](#DeploymentPatterns-Deploymentprerequisites)
-   [Deployment Patterns](#DeploymentPatterns-DeploymentPatterns)
    -   [Pattern 1 - HA clustered deployment of WSO2 Identity
        Server](#DeploymentPatterns-Pattern1-HAclustereddeploymentofWSO2IdentityServer)
    -   [Pattern 2 - HA clustered deployment of WSO2 Identity Server
        with WSO2 Identity
        Analytics](#DeploymentPatterns-Pattern2-HAclustereddeploymentofWSO2IdentityServerwithWSO2IdentityAnalytics)

------------------------------------------------------------------------

### Deployment prerequisites

As a first step in planning your deployment, ensure that you have the
necessary system requirements and a compatible environment.

**System requirements**

|        |                                                                                          |
|--------|------------------------------------------------------------------------------------------|
| Memory | **4GB** : 2 GB for the Java Virtual Machine (JVM) and 2 GB for the Operating System (OS) |
| Disk   | 10 GB minimum                                                                            |

**Environment compatibility**

<table>
<tbody>
<tr class="odd">
<td>Operating systems</td>
<td><p>For information on tested operating systems, see <a href="https://docs.wso2.com/display/compatibility/Tested+Operating+Systems+and+JDKs">Tested Operating Systems and JDKs</a> .</p></td>
</tr>
<tr class="even">
<td>RDBMS</td>
<td><p>For information on tested DBMSs, see <a href="https://docs.wso2.com/display/compatibility/Tested+DBMSs">Tested DBMSs</a> .</p></td>
</tr>
<tr class="odd">
<td>Directory services</td>
<td><p>Supports Directory Services implementing following LDAP Protocols:</p>
<ul>
<li>LDAP v2</li>
<li>LDAP v3</li>
</ul>
<p>For information on tested LDAPs, see <a href="https://docs.wso2.com/display/compatibility/Tested+LDAPs">Tested LDAPs</a> .</p></td>
</tr>
<tr class="even">
<td>Java</td>
<td>Oracle JDK 1.8 (There’s a <a href="https://bugs.openjdk.java.net/browse/JDK-8189789">known issue</a> with JDK1.8.0_151)</td>
</tr>
<tr class="odd">
<td>Web browsers</td>
<td><p>For more information on tested web browsers, see <a href="https://docs.wso2.com/display/compatibility/Tested+Web+Browsers">Tested Web Browsers</a> .</p></td>
</tr>
<tr class="even">
<td>Load balancers</td>
<td><p>For more information about load balancers, see <a href="https://docs.wso2.com/display/CLUSTER44x/Setting+up+a+Cluster#SettingupaCluster-Configuringtheloadbalancer">Configuring the load balancer</a> .</p></td>
</tr>
</tbody>
</table>

### Deployment Patterns

-   [Pattern 1 - HA clustered deployment of WSO2 Identity
    Server](#DeploymentPatterns-Pattern1-HAclustereddeploymentofWSO2IdentityServer)
-   [Pattern 2 - HA clustered deployment of WSO2 Identity Server with
    WSO2 Identity
    Analytics](#DeploymentPatterns-Pattern2-HAclustereddeploymentofWSO2IdentityServerwithWSO2IdentityAnalytics)

!!! note
    
    Notes
    
    Note the following before you begin:
    
    1.  Ensure high availability for the respective RDMS and Directory
        Services used for each of the deployment patterns given below.
    
    2.  In each production deployment, share the runtime deployment
        artifacts among nodes using a shared file system. In the deployment
        patterns defined below, this process is referred to as ' Artifact
        synchronization ’.
    
        The Runtime deployment artifacts are:
    
        1.  Email output event publisher  
            /repository/deployment/server/eventpublishers/
    
        2.  Secondary user stores  
            /repository/deployment/server/userstores/
    
        3.  Analytics data publishers and event streams  
            /repository/deployment/server/eventpublishers/  
            /repository/deployment/server/eventstreams/
    
        4.  Workflow engine related artifacts  
            /repository/deployment/server/humantasks/  
            /repository/deployment/server/bpel/
    

#### Pattern 1 - **HA clustered deployment of WSO2 Identity Server**

This deployment can be scaled from two to N nodes based on capacity
requirements.

-   Load balancer should be configured to use sticky sessions

-   All WSO2 Identity Server nodes should participate in a cluster.
    Clustering is used to invalidate local caches of nodes, by notifying
    over cluster messages, as cache updates happen.

    ![](attachments/103329471/103329475.png){width="680" height="466"}  

!!! tip
    
    Set Up Deployment Pattern 1
    
    To set up and configure clustered deployment of WSO2 Identity Server
    according to clustering pattern 1, see [Setting Up Deployment Pattern
    1](_Setting_Up_Deployment_Pattern_1_) .
    

**Open ports**

Product

Port

Usage

  
WSO2 Identity Server

9763

HTTP servlet port

9443

HTTPS servlet port

4000

Ports to be opened with respect to clustering membership scheme used

#### Pattern 2 - **HA clustered deployment of WSO2 Identity Server with WSO2 Identity Analytics**

-   Load balancers should be configured to use sticky sessions.

-   All WSO2 Identity Server nodes should participate in a cluster.
    Clustering is used to invalidate local caches of nodes, by notifying
    over cluster messages, as cache updates happen.

-   Since WSO2 Identity Server Analytics is not mission critical, a two
    node cluster is recommended where only one will receive events over
    TCP failover, as configured in WSO2 Identity Server nodes to publish
    events. The other node will keep its state synced with the active
    node.

![](attachments/103329471/103329474.png){width="760" height="843"}  
  

The Analytics dashboards are to be used by administrators to analyze
login events and sessions. Therefore, the IS analytics deployment can be
isolated from the IS server deployment without sharing the full user
base, permission and governance data. However, if you prefer to do so,
the same user base can be shared among the IS cluster and the IS
Analytics cluster as well.

!!! tip
    
    Set Up Deployment Pattern 2
    
    To set up and configure clustered deployment of WSO2 Identity Server
    according to clustering pattern 2, see [Setting Up Deployment Pattern
    2](_Setting_Up_Deployment_Pattern_2_) .
    

**Open ports**

Product

Port

Usage

WSO2 Identity Server

9763

HTTP servlet port

9443

HTTPS servlet port

WSO2 Analytics

9763

HTTP servlet port

9443

HTTPS servlet port

7611

Thrift port for event receiver

7711

SSL port for authentication to publish events
