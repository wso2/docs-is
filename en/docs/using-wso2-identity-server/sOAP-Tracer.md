# SOAP Tracer

The " **SOAP Tracer** " shows SOAP messages, SOAP message requests, and
SOAP message responses -- including when the services were deployed on
the server and the operations invoked. By default, this feature is
turned off. You have to turn it on to enable tracing.

Turning on the Tracer feature will negatively impact performance. This
is because SOAP messages are always completely built (deferred building
is not possible) and stored in the database by WSO2 Data Services.
Hence, this option should be used with caution.

Follow the instructions below to access the SOAP Tracer.

1.  Sign in. Enter your user name and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console)
    .
2.  Click on **Monitor** on the left side of the screen to access the
    **Monitor** menu and click on **SOAP Tracer**.
3.  In the drop-down menu, select **Yes**.  
    ![]( ../../assets/img/103329418/103329420.png) 
4.  The Tracer will show the messages of the operations that were
    invoked.
5.  SOAP message information includes the time-stamp, service name,
    operation invoked, and number of requests sent to the server. The
    most recent SOAP messages are listed on top. When a particular SOAP
    message is selected, its **Request** and **Response** information
    can be viewed.  
    ![]( ../../assets/img/103329418/103329419.png) 

    This Tracer does not apply to operations invoked in the admin
    services, as these are filtered out.

6.  Use the **Search** function to find a message. In the appropriate
    field, enter a word (or part of a word or multiple words) that the
    message should contain, and click on the **Search** button.  
    ![]( ../../assets/img/9372729/9440999.png)
7.  You will see the message in the **Messages** list, and its full
    description will be shown in the **Request** or **Response** text
    area.  
    ![]( ../../assets/img/9372729/9441000.png)
