# Message Monitoring with TCPMon

The most common usage of TCPMon is as an intermediary, which monitors
the communication between the client (front end) and the back end
server. That is, the messages sent from the client are received by the
intermediary instead of the back end server. These messages are then
forwarded to the back end server from the intermediary.

#### Monitoring Messages between Client and Server

The following diagram depicts a typical communication between the front
end client and the back end server. 80 is the listening port of the back
end server which receives the messages from the client:  
  
![](../assets/img/56986697/56986699.png)

The following diagram depicts how TCPMon is placed between the client
and the server in order to monitor the messages. 8081 is the listening
port in TCPMon which receives the messages from the client instead of
the back end server:

![](../assets/img/56986697/56986698.png)

!!! note
    
    As an intermediary, TCPMon only receives messages and forwards them to
    the back end server. Therefore, it is a safe tool to be used for
    debugging purposes.
    

Note that TCPMon cannot be used to view messages transferred over https
protocol.

To monitor messages from client to server using TCPMon:

1.  Start TCPMon. Follow the instructions on [Starting TCPMon](../../administer/starting-tcpmon).
2.  Give 8081 (the listening port of TCPMon) in the **Listen Port**
    field (This could be any unused port in your local machine).
3.  Give the address of the back end server as the target hostname. For
    example, if you are monitoring messages sent to
    [www.apache.org](http://www.apache.org), enter this web address as
    the hostname.
4.  Give 80 as the target port, which is the listening port of
    [www.apache.org.](http://www.apache.org.)  
    ![](../assets/img/56986697/56986700.png)
5.  Click **Add** to save the setting.
6.  Now, p oint the browser to 'localhost:8081' instead of
    [www.apache.org](http://www.apache.org).  
    ![](../assets/img/56986697/56986701.png)
7.  A new tab in TCPMon will indicate the 8081 port. You can view the
    requests and responses passing through TCPMon as shown below.  
    ![](../assets/img/56986697/56986702.png)
8.  The options at the bottom of the screen can be used to have the
    messages in XML format (useful in debugging Web services), to save
    and resend the messages and also to switch the layout of the message
    windows.

    ![](../assets/img/56986697/56986703.png)
