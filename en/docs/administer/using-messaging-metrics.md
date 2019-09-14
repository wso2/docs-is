# Using Messaging Metrics

Messaging metrics are the Java metrics enabled in the WSO2 Message
Broker (MB) or the Broker Profile of WSO2 EI for the purpose of
monitoring broker-specific statistics.

!!! note
    
    The metrics feature is enabled in the broker by default. See the topic
    on [setting up WSO2 Carbon metrics](../../administer/setting-up-carbon-metrics.md) for
    details on how metrics are enabled.
    

Follow the steps given below for instructions on using the **Messaging
Metrics** dashboard.

1.  Log in to the management console of the broker and click **Monitor
    -\> Metrics -\> Messaging Metrics**.  
    ![](../../assets/img/87694058/87694050.png)
2.  The **View Metrics** page will open. At the top of this page, you
    will find the following panel:  
    ![](../../assets/img/87694058/87694057.png)
3.  First, select the **Source** from the drop-down list. In a clustered
    setup, you must specify the broker node that you want to monitor.
4.  You can specify the time interval for which the statistics displayed
    are valid. By default, you will see statistics from the last 5
    minutes.
5.  In the **Views** section, you will find buttons corresponding to the
    different types of metrics that you want to view. You can click the
    relevant button to view the statistics. Given below are the
    statistics corresponding to each button:  
    -   **Disruptor**
        ![](../../assets/img/87694058/87694056.png)

        |                                      |                                                                                                                                                                                                                |
        |--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | **Metric**                           | **Description**                                                                                                                                                                                                |
        | Total Messages in Inbound Disruptor  | The **Disruptor** is a new open-source concurrency framework, designed as a high-performance mechanism for inter-thread messaging. The current number of messages in the inbound disruptor can be viewed here. |
        | Total Acks in Inbound Disruptor      | The current number of acknowledgments in the inbound disruptor.                                                                                                                                                |
        | Total Messages in Outbound Disruptor | The current number of messages in the outbound disruptor.                                                                                                                                                      |

          

    -   **Publish & Subscribe**
        ![](../../assets/img/87694058/87694055.png)

        |                         |                                                                                                                            |
        |-------------------------|----------------------------------------------------------------------------------------------------------------------------|
        | **Metric**              | **Description**                                                                                                            |
        | Total Queue Subscribers | This metric shows the total number of active queue subscribers for a particular broker node. This is an INFO level metric. |
        | Total Topic Subscribers | The total number of active topic subscribers.                                                                              |
        | Total Channels          | The total number of active channels.                                                                                       |

          

    -   **Messages & Acknowledgements**
          

        |                            |                                                                                                                                                           |
        |----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
        | **Metric**                 | **Description**                                                                                                                                           |
        | Messages Received/ sec     | This metric provides the number of messages received per second by a particular broker node. This metric is calculated when a message reaches the server. |
        | Messages Published/ sec    | This metric provides the number of messages published per second. This metric is calculated when the server publishes a message to a subscriber.          |
        | Acknowledges Received /sec | This metric provides the number of acknowledgments received from publishers per second.                                                                   |
        | Acknowledges Sent /sec     | This metric provides the number of acknowledgments sent to publishers per second.                                                                         |

          

        **  
        **
    -   **Database**  
        ![](../../assets/img/87694058/87694051.png)
        ![](../../assets/img/87694058/87694052.png)
        ![](../../assets/img/87694058/87694053.png)
        ![](../../assets/img/87694058/87694054.png)

        |                         |                                                                 |
        |-------------------------|-----------------------------------------------------------------|
        | **Metric**              | **Description**                                                 |
        | Database write latency  | The average time taken for database write calls.                |
        | Database read latency   | The average time taken for database read calls.                 |
        | Database Method latency | The average time taken by message store implementation methods. |
