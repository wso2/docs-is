# Sticky Sessions with Multiple Nodes

When a single WSO2 product is interacting with a web application, a
session object is created. It remains in the memory of the WSO2 product.
However, in a clustered environment where you could have multiple WSO2
product servers fronted by a load balancer, the situation is different.

If the backend application is state-full, it may use sessions. You can
manage sessions in two different ways.

-   **Using sticky sessions** : 

    In this approach, once a session is
    created by the backend server, a session ID will be sent back to the
    client in the response message. This session ID will be tracked by
    the intermediate load balancers. If the user/client sent another
    request with the same session ID, that request will be sent to the
    same backend server.
    
-   **Session replication** : 

    In this approach, backend servers will
    replicate the sessions among all the nodes in the cluster, and the
    load balancers will be able to send any request to any node.

This session can be implemented at the HTTP level or at the SOAP level.
One downside of this approach is if a node has failed, the sessions
associated with that node are lost and need to be restarted. With sticky
sessions enabled, the session data is kept in memory, but persistent
data is saved into a database.

If cluster nodes share state, and they are not stored in same shared
persistent media like a database, all changes done at each node have to
be disseminated to all other nodes in the cluster. Often, this is
implemented using a group communication method. Group communication
keeps track of the members of groups of nodes defined by users and
updates the group membership when nodes have joined or if they leave.
When a message is sent using group communication, it guarantees that all
nodes in the current group will receive the message. 

!!! info
    For WSO2 products,
    the clustering implementation uses Hazelcast as the form of group
    communication to disseminate all the changes to all other nodes in the
    cluster.
