# Deployment Patterns

This section provides high-level information on the recommended deployment pattern.

You can run multiple nodes of WSO2 Identity Server in a cluster mode to achieve two requirements.

1. **Handle requests seamlessly**: If one node becomes unavailable or is experiencing high traffic, another node will seamlessly handle the requests.
2. **Balancing traffic handling**: Multiple nodes can handle the traffic together so that cluster throughput is higher than the throughput of a single node.

<!--For complete information on clustering concepts, see [Clustering Overview]({{base_path}}/deploy/clustering-overview). -->

The following sections guide you through setting up the deployment pattern, which is a HA Clustered Deployment of two WSO2 Identity Server nodes.

## Deployment prerequisites

As a first step in planning your deployment, ensure that you have the necessary system requirements and a compatible environment.

## System requirements

<table style="width:100%;">
<colgroup>
<col style="width: 11%" />
<col style="width: 88%" />
</colgroup>
<tbody>
<tr class="odd">
<td></td>
<td><ul>
<li>4 vCPUs</li>
<li>4 GB RAM</li>
<li>10 GB Disk Space</li>
</ul>
</td>
</tr>
</tbody>
</table>

The above recommendations can change based on the expected concurrency and performance.

!!! note
    For more information on prerequisites, see [Installation Prerequisites]({{base_path}}/deploy/get-started/install).

## Environment compatibility

<table>
<tbody>
<tr class="odd">
<th>Operating systems</th>
<td><p>For information on tested operating systems, see <a href="{{base_path}}/deploy/environment-compatibility/#tested-operating-systems-and-jdks">Tested Operating Systems and JDKs</a> 
.</p></td>
</tr>
<tr class="even">
<th>RDBMS</th>
<td><p>For information on tested DBMSs, see <a href="{{base_path}}/deploy/environment-compatibility/#tested-dbmss">Tested DBMSs</a> .</p></td>
</tr>
<tr class="odd">
<th>Directory services</th>
<td><p>Supports Directory Services implementing following LDAP Protocols:</p>
<ul>
<li>LDAP v2</li>
<li>LDAP v3</li>
</ul>
<p>For information on tested LDAPs, see <a href="{{base_path}}/deploy/environment-compatibility/#tested-ldaps">Tested LDAPs</a> .</p></td>
</tr>
<tr class="even">
<th>Java</th>
<td>Oracle JDK 1.8</td>
</tr>
<tr class="odd">
<th>Web browsers</th>
<td><p>For more information on tested web browsers, see <a href="{{base_path}}/deploy/environment-compatibility/#tested-web-browsers">Tested Web Browsers</a> .</p></td>
</tr>
<!--<tr class="even">
<th>Load balancers</th>
<td><p>For more information about load balancers, see <a href="{{base_path}}/deploy/load-balancing/#types-of-load-balancers">Configuring the load balancer</a> .</p></td>
</tr>-->
</tbody>
</table>

## Configure databases

In a clustered deployment, all WSO2 Identity Server nodes are pointed to the same databases to ensure the integrity of the data. Also, you can configure multiple logical databases if you require to keep your data logically separated in the environment. The following tutorial demonstrates deployment with an identity database (`IDENTITY_DB`) and a user database (`UM_DB`).

!!! note
    Alternatively, you can create more databases to separate the data logically for each data type.  
    This will not make a difference in performance and is not mandatory. Separating databases logically may help to have a different backup and scaling strategy when the deployment is large and complex.
    If you do wish to separate the data logically into separate databases, see [Set Up Separate Databases for Clustering]({{base_path}}/deploy/set-up-separate-databases-for-clustering).

!!! tip
    If you have configured the shared database correctly, the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory should have the following configurations.

    Following is a sample configuration. Therefore parameter values might be different.
    
    ```toml
    [database.identity_db]
    type = "mysql"
    hostname = "localhost"
    name = "regdb"
    username = "regadmin"
    password = "regadmin"
    port = "3306"
    
    [database.shared_db]
    type = "mysql"
    hostname = "localhost"
    name = "regdb"
    username = "regadmin"
    password = "regadmin"
    port = "3306"
    ```

The following diagram is a high-level component diagram showing how the system would look when two databases are used.

![Component diagram]({{base_path}}/assets/img/setup/deploy/component-diagram.png)

<!-- TODO !!! note
    For instructions on how to configure the data sources for other databases and more information related to databases, see [Work with Databases]({{base_path}}/deploy/work-with-databases)-->

## Mount the shared registry

WSO2 Identity Server comprises three different registry repositories.

1. **Local Repository**: Stores configuration and runtime data that is local to the server.

2. **Configuration Repository**: Stores product-specific configurations.

3. **Governance Repository**: This stores configuration and data that are shared across the whole platform. This typically includes services, service descriptions, endpoints, or data sources.

<!--!!! info
    For more information about the registry, 
    see [Work with the Registry](TO-DO:{{base_path}}/guides/working-with-the-registry).-->

In this cluster setup, we use the default h2 database as the local registry in each node individually. The governance and configuration registries should be mounted to share across all nodes. In the WSO2 Identity Server, config and governance registries are mounted by default.

!!! note
    The production recommendation is to set the `<versionResourcesOnChange>` property in the `registry.xml` file to false. This is because the automatic versioning of resources can be an extremely expensive operation.

    ```
    <versionResourcesOnChange>false</versionResourcesOnChange>
    ```

<!-- TODO To make sure the configurations were applied correctly,

<ol>
    <li>Log in to the WSO2 Identity Server Management Console (<code>https://&lt;IS_HOST&gt;:&lt;PORT&gt;/carbon</code>).</li>
    <li>
        <p>Navigate to <b>Home > Registry > Browse</b>.</p>
        <p><img src="{{base_path}}/assets/img/deploy/registry-browser-2.png" alt="Registry browser"></p>
        <p>Note that the governance collection is shown with the symlink icon.</p>
    </li>
</ol> -->

## Clustering-related configurations

WSO2 supports the following membership schemes for clustering

- Well Known Address (WKA)
- Multicast membership
- AWS membership
- AWS ECS membership
- Kubernetes membership

The following configurations need to be done in both the WSO2 Identity Server nodes to enable clustering between them.

1. Enable clustering on node one and node two by setting the membership scheme that fits your deployment by editing the
   `<IS_HOME>/repository/conf/deployment.toml` file.

    !!! info
        The simplest is the well-known address (WKA) based clustering method. It only suites where all the nodes are deployed on machines having static IP addresses. <!--For more information, see [About Membership Schemes]({{base_path}}/deploy/clustering-overview/#about-membership-schemes).-->
        Configurations for each membership scheme are listed below.
        
        ??? tip "Click to see the instructions for the WKA scheme"            
            Edit the `<IS_HOME>/repository/conf/deployment.toml` file to add the following configurations.
            Configure the `localMemberHost` and `localMemberPort` entries. Add the IP of the editing node itself.                    
                    ```
                    [clustering]
                    membership_scheme = "wka"
                    local_member_host = "192.168.2.1"
                    local_member_port = "4000"
                    members = ["192.168.2.1:4000", "192.168.2.2:4001"]
                    ```                    
            Under the `members` section, add the `hostName` and `port` for each WKA member. As we have only two nodes in our sample cluster configuration, we will configure both as WKA nodes.         
            
            You can also use IP address ranges for the `hostName`. For example, `192.168.1.2-10`. This should ensure that the cluster eventually recovers after failures. One shortcoming of doing this is that you can define a range only for the last portion of the IP address. You should also keep in mind that the smaller the range, the faster it discovers members since each node has to scan fewer potential members. 
            
        ??? tip "Click to see the instructions for the AWS ECS membership scheme"  
                      
            1. Create a working AWS ECS Cluster. Note the following when creating a cluster.
                -   Note the `name` and `VPC CIDR block` of the cluster, as you will require them later for configurations.
                -   Ensure that the `Container instance IAM role` that you assign to the ECS cluster has the following permission policy attached. 
                        ```
                        { "Version": "2012-10-17", 
                             "Statement":
                             [
                             {
                                 "Effect": "Allow",
                                 "Action":
                                     [
                                     "ec2:DescribeAvailabilityZones",
                                     "ec2:DescribeInstances"
                                     ],
                                     "Resource": [ "*" ]
                             }
                             ]
                        }
    
                        ```
                -   Make sure that the security group of the cluster instances has an inbound rule to allow incoming traffic on the Hazelcast default port range `(5701 - 5708)`. It is advised to restrict access to instances in the same security group for this inbound rule. 
            
            2. Create a `deployment.toml` file in a preferred directory and add the following configurations.                   
                    ```
                    [clustering]
                    membership_scheme = "aws-ecs"
                    
                    [clustering.properties]
                    region = "us-east-1"
                    clusterName = "ECS-IS-CLUSTER"
                    vpcCidrBlock = "10.0.*.*"
                    ```                    
            Under the `clustering.properties` section, set the `region`, `clusterName`, and `vpcCidrBlock` based on the AWS ECS cluster you created in the previous step.       

            !!! note
                Once all the configurations are complete, build a docker image including the configurations. You can consume this docker image to create a `Task Definition` and run a new `Service` or a `Task` on the `AWS ECS cluster` you created.

        ??? tip "Click to see the instructions for the AWS EC2 membership scheme"  

            When WSO2 products are deployed in clustered mode on Amazon EC2 instances, it is recommended to use the AWS clustering mode. Open the `deployment.toml` file (stored in the `<IS_HOME>/repository/conf/` directory) and make the following changes.

            1. Apply the following configuration parameters and update the values for the server to enable AWS clustering.
                    ```toml
                    [clustering]
                    membership_scheme = "aws"
                    domain = "wso2.carbon.domain"
                    local_member_host = "10.0.21.80"
                    local_member_port = "5701"
                    ```
                The port used for communicating cluster messages has to be any port number between 5701 and 5800. The local member host must be set to the IP address bound to the network interface used for communicating with other members in the group (private IP address of EC2 instance).

            2. Apply the following parameters to update the values to configure clustering properties.
                    ```toml
                    [clustering.properties]
                    accessKey = "***"
                    secretKey = "***"
                    securityGroup = "security_group_name"
                    region = "us-east-1"
                    tagKey = "a_tag_key"
                    tagValue = "a_tag_value"  
                    ```
                It's recommended to add all the nodes to the same security group. The AWS credentials and security group depend on your configurations in the Amazon EC2 instance. The `tagKey` and `tagValue` are optional and the rest of the above parameters are mandatory. 

            3. To provide specific permissions for creating an access key and secret key for only this AWS clustering attempt, use the custom policy block given below.
                See the [AWS documentation](http://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_managed-policies.html) for details on how to add the custom IAM policy. 
                    Attach this to the user account that will operate AWS clustering in your WSO2 IS. The access key and secret key can only be used to list EC2 instance details in the AWS account.
                    ```json
                    { "Version": "2012-10-17",
                    "Statement":
                    [
                    {
                        "Effect": "Allow",
                        "Action":
                            [
                            "ec2:DescribeAvailabilityZones",
                            "ec2:DescribeInstances"
                            ],
                            "Resource": [ "*" ]
                    }
                    ]
                    }
                    ```

        ??? tip "Click to see the instructions for the Kubernetes membership scheme"
            When WSO2 IS nodes are deployed in clustered mode on Kubernetes, the Kubernetes Membership Scheme enables the automatic discovery of these servers. The Kubernetes Membership Scheme supports finding the pod IP addresses using the Kubernetes API.

            - If not already present, download and copy the <a href=https://github.com/wso2/kubernetes-common/tags>kubernetes-membership-scheme-1.x.x.jar</a> to the `<IS_HOME>/repository/components/dropins/` directory.

            - Configure the `<IS_HOME>/repository/conf/deployment.toml` file with the following configurations.

            | Parameter | Description   | Example   |
            |-----------|---------------|-----------|
            | `membershipScheme`  | This is the membership scheme that will be used to manage the membership of nodes in a cluster.   | `kubernetes`    |
            | `local_member_host` | This is the member's hostname or IP address. Set it to the pod's local IP address.   | `172.17.0.2`    |
            | `local_member_port` | This is the TCP port used by this member and through which other members will contact this member. | `4000` |
            | `membershipSchemeClassName` | org.wso2.carbon.membership.scheme.kubernetes.KubernetesMembershipScheme   |                |
            | `KUBERNETES_NAMESPACE`  | This is the Kubernetes Namespace in which the pods are deployed.  | `wso2-is` |
            | `KUBERNETES_SERVICES`   | These are the Kubernetes Services that belong in the cluster. | `wso2is-service` |
            | `KUBERNETES_MASTER_SKIP_SSL_VERIFICATION`   | This defines whether the SSL certificate verification of the Kubernetes API should be carried out or not. | `true` |
            | `USE_DNS`   | This configures the membership scheme to use Kubernetes API for pod IP resolution. Set this to false.    | `false`    |
            
            ``` 
            [clustering]
            membership_scheme = "kubernetes"
            local_member_host = "172.17.0.2"
            local_member_port = "4000"

            [clustering.properties]
            membershipSchemeClassName = "org.wso2.carbon.membership.scheme.kubernetes.KubernetesMembershipScheme"
            KUBERNETES_NAMESPACE = "wso2-is"
            KUBERNETES_SERVICES = "wso2is-service"
            KUBERNETES_MASTER_SKIP_SSL_VERIFICATION = true
            USE_DNS = false
            ```

            - In order to retrieve the pod IP address information from the Kubernetes apiserver, the Kubernetes membership scheme uses the pod's service account. Hence, the pods need to be associated with a service account that has permission to read the "endpoints" resource. Make sure the role you bind has the following permissions. 
            
                ``` 
                rules:
                    apiGroups: [""] 
                    verbs: ["get", "list"] 
                    resources: ["endpoints"] 
                ```
            
            - Optionally, a Kubernetes token or basic authentication can be used to authenticate with the Kubernetes apiserver. 
            The following properties can be set under `[clustering.properties]` accordingly.
                - `KUBERNETES_API_SERVER`: This is the Kubernetes API endpoint,e.g., `http://172.17.8.101:8080`. Alternatively, an https endpoint can be set via `KUBERNETES_SERVICE_HOST` and `KUBERNETES_SERVICE_PORT_HTTPS`.
                - `KUBERNETES_SERVICE_HOST`: This is the Kubernetes API hostname or IP address, e.g., `kuberneteshostname`.
                - `KUBERNETES_SERVICE_PORT_HTTPS`: This is the Kubernetes API https listening port. This must be an integer value.
                - `KUBERNETES_API_SERVER_TOKEN`: This is the Kubernetes Master token for authentication (optional), e.g., `yourkubernetestoken`.
                - `KUBERNETES_API_SERVER_USERNAME`: This is the Kubernetes Master username (optional), e.g., `admin`.
                - `KUBERNETES_API_SERVER_PASSWORD`: This is the Kubernetes Master password (optional).


2. Configure caching.

    !!! note
        Distributed caching is disabled, and it is not recommended to use this due to many practical issues related to configuring and running distributed caching properly. WSO2 Identity Server employs **Hazelcast** as the primary method of implementing cluster messages while using distributed caching in a simple setup.

    ??? info "About Caching"
        <ul>
            <li><b>Why caching</b></br>Caching is an additional layer on top of the databases. It enables keeping the recently used data fetched from the database in local memory so that for subsequent data requests, , the data can be served from the local memory instead of fetching from the database. You need to evaluate certain advantages and disadvantages when deciding on your caching strategy.</li>
            <li><b>Advantages</b>
                <ul>
                    <li>The load on the underlying database or LDAP is reduced as data is served from already fetched data in memory.</li>
                    <li>Improved performance due to the reduced number of database calls for repetitive data fetching</li>
                </ul>
            </li>
            <li><b>Disadvantages</b>
                <ul>
                    <li>Coherency problems may occur when the data change is not immediately reflected on cached data if one node or an external system updates the database.</li>
                    <li>Data in memory can become stale yet be served, e.g., serving data from memory while its corresponding record in the database is deleted.</li>
                </ul>
            </li>
        </ul>

    ??? tip "Caching in WSO2 Identity Server"
        Historically WSO2 Identity Server used distributed caching to utilize the advantages mentioned above and minimize the coherence problem. However, in newer deployment patterns where the network is not tightly controlled, distributed caching fails in unexpected ways. Hence, we **no longer recommend using distributed caching**. Instead, it is **recommended to have local caches** (if required) and **cache invalidation messages** (if required) by considering the information given below.

        **The ForceLocalCache property**

        When Hazelcast clustering is enabled, certain caches act as distributed caches. The `force_local_cache` property in the `<IS_HOME>/repository/conf/deployment.toml` directory marks that all the caches should act like local caches even in a clustered setup. (This is by default set to `true`).
        ```
        [server]
        force_local_cache = true
        ```
        Cache invalidation uses Hazelcast messaging to distribute the invalidation message over the cluster and invalidate the caches properly. This is used to minimize the coherence problem in a multi-node setup.
        
        **Typical clustered deployment cache scenarios**

        <table>
            <thead>
                <tr>
                    <th>Scenario</th>
                    <th>Local<br>Caching</th>
                    <th>Distributed<br>Caching</th>
                    <th>Hazelcast<br>Clustering</th>
                    <th>Distributed<br>Invalidation</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1. All caches are local with distributed cache invalidation</td>
                    <td>Enabled</td>
                    <td>Not<br> Applicable</td>
                    <td>Enabled</td>
                    <td>Enabled</td>
                    <td>
                        <ul>
                            <li>This is the <b>recommended approach</b>.</li>
                            <li>Hazelcast messaging invalidates the caches.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>2. All caches are local without distributed cache invalidation</td>
                    <td>Enabled</td>
                    <td>Not<br> Applicable</td>
                    <td>Disabled</td>
                    <td>Disabled</td>
                    <td>
                        <ul>
                            <li>Invalidation clears only the caches in specific nodes. Other caches are 
                            cleared at cache expiration.</li>
                            <li>Hazelcast communication is not used.</li>
                            <li>As the decisions take time to propagate over nodes (default cache timeout is 15 minutes), there is a security risk in this method. To reduce the risk, reduce the default cache timeout period. To learn how to reduce the default cache timeout period, see [Configuring Cache Layers - timeout]({{base_path}}/deploy/performance/configure-cache-layers#timeout).</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>3. No caching</td>
                    <td>Disabled</td>
                    <td>Disabled</td>
                    <td>Disabled</td>
                    <td>Disabled</td>
                    <td>
                        <ul>
                            <li>The data are directly acquired from the database.</li>
                            <li>Eliminates the security risks caused due to not having cache invalidation.</li>
                            <li>This method will create a performance degradation due to the lack of 
                            caching.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>4. Certain caches are disabled while the remaining are local</td>
                    <td>Enabled<br>for the <br> available local caches</td>
                    <td>Not<br> Applicable</td>
                    <td>Enabled</td>
                    <td>Enabled</td>
                    <td>
                        <ul>
                            <li>To reduce the security risk created in the second scenario and to 
                            improve performance in comparison with the third scenario, disable the 
                            security-related caches and sustain the performance-related caches as 
                            local caches.</li>
                            <li>This requires identifying these caches depending on the use case.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>5. Distributed caching enabled</td>
                    <td>Disabled <br> - the <br> `force_local_cache` is<br> set to `false`.</td>
                    <td>Enabled</td>
                    <td>Enabled</td>
                    <td>Not<br> Applicable</td>
                    <td>
                        <ul>
                            <li>This scenario is only recommended if the network has tight tolerance where the network infrastructure is capable of handling high bandwidth with very low latency.</li>
                            <li>Typically, this applies only when you deploy <b>all the nodes in a single server rack having fiber-optic cables</b>. In any other environment, this implementation will cause cache losses. Thus, this implementation is <b>not recommended for general use</b>.
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        </li>
    </ul>

3. Go to the `<IS_HOME>/repository/conf/deployment.toml` file and add the proxy port as `443`. The port 443 is the Load Balancer frontend port.

    !!! abstract ""
        **Example**
        ```
        [transport.http.properties]
        proxyPort = 80
        [transport.https.properties]
        proxyPort = 443
        ```

4. You may change the `<IS_HOME>/repository/conf/deployment.toml` file to access the servers using a hostname instead of the raw IP. This hostname is how the external applications try to look up WSO2 Identity Server endpoints. The `hostName` should be resolved to the Load Balancer front-end IP address.

    ```
    [server]
    hostname = "wso2.is"
    ```

    !!! note
        The WSO2 Identity Server cluster uses this hostname and therefore it must be specified in the `/etc/hosts` file in each node so that internal calls will not be routed through the Load Balancer.

        Example: 
        `192.168.2.1   wso2.is`

## Enable artifact synchronization

You must have a shared file system to enable synchronization for runtime artifacts. You can use one of the following depending on your environment.

- **Network File System (NFS)**: This is one of the most commonly known shared file systems and can be used in a Linux environment.
- **Server Message Block (SMB) file system**: This can be used in a Windows environment.
- **Amazon EFS**: This can be used in an AWS environment.

Once you have chosen a file system:

1. Mount it in the nodes that are participating in the cluster.
2. If the userstores need to be updated at runtime, create a directory called `Userstores` in the shared file system and create a symlink from the `<IS_HOME>/repository/deployment/server/userstores` path to the `Userstores` directory.
3. If multi-tenancy is required, create a directory called `Tenants` in the shared file system and create a symlink from the `<IS_HOME>/repository/tenants` path to the `Tenants` directory.

!!! note
    Instead of mounting the file system directly to the `<IS_HOME>/repository/deployment/server/userstores` and `<IS_HOME>/repository/tenants` paths, a symlink is created. Otherwise, if you delete the product to redeploy it, the file system will get mounted to a non-existing path.

## Front with a load balancer

To access the two WSO2 Identity Server nodes, you need to front the system with a load balancer.
You can use any load balancer that is available to your system.

!!! info
    To learn how to front the two-node cluster with an Nginx load balance, see [Set up WSO2 clusters with Nginx]({{base_path}}/deploy/front-with-the-nginx-load-balancer). If you’ve changed the hostnames of nodes, make sure to keep that in mind when you’re configuring your load balancer.

## Run the cluster

1. Start the load balancer and WSO2 Identity Server nodes.
2. Access the WSO2 Identity Server Console.
    Depending on your load balancer, traffic will be served by one of the cluster nodes.
3. Shut down cluster node one and observe that the traffic is served by node two.
4. Start node one and shut down node two. Note that traffic will be served by node one.
