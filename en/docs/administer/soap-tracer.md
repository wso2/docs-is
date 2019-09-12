# SOAP Tracer

The " **SOAP Tracer** " shows SOAP messages, SOAP message requests, and
SOAP message responses -- including when the services were deployed on
the server and the operations invoked. By default, this feature is
turned off. You have to turn it on to enable tracing.

!!! info
    Turning on the Tracer feature will negatively impact performance. This
    is because SOAP messages are always completely built (deferred building
    is not possible) and stored in the database by WSO2 Data Services.
    Hence, this option should be used with caution.

Follow the instructions below to access the SOAP Tracer.

1.  Sign in. Enter your user name and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console).
2.  Click on **Monitor** on the left side of the screen to access the
    **Monitor** menu and click on **SOAP Tracer**.
3.  In the drop-down menu, select **Yes**.  
    ![SOAP message tracer](../../assets/img/using-wso2-identity-server/soap-message-tracer.png) 
4.  The Tracer will show the messages of the operations that were
    invoked.
5.  SOAP message information includes the time-stamp, service name,
    operation invoked, and number of requests sent to the server. The
    most recent SOAP messages are listed on top. When a particular SOAP
    message is selected, its **Request** and **Response** information
    can be viewed.  
    ![Request and response](../../assets/img/using-wso2-identity-server/request-and-response.png) 

    !!! info
        This Tracer does not apply to operations invoked in the admin
        services, as these are filtered out.

6.  Use the **Search** function to find a message. In the appropriate
    field, enter a word (or part of a word or multiple words) that the
    message should contain, and click on the **Search** button.  
    ![Search button](../../assets/img/using-wso2-identity-server/search-button.png)
7.  You will see the message in the **Messages** list, and its full
    description will be shown in the **Request** or **Response** text
    area.  
    ![Request and response displayed](../../assets/img/using-wso2-identity-server/request-and-response-displayed.png)
