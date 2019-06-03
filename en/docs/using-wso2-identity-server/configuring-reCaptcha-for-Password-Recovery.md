# Configuring reCaptcha for Password Recovery

The password account recovery feature implemented in the WSO2 Identity
Server helps to recover the password of the account in case the user
forgets it. This recovery process can also be secured with captcha
verification.

By configuring reCaptcha, you can mitigate or block brute force attacks.

For more information on setting up password recovery, see [Password
Recovery](https://docs.wso2.com/display/IS570/Username+Recovery) .

For more information on brute force attacks, see [Mitigating Brute Force
Attacks](https://docs.wso2.com/display/IS550/Mitigating+Brute+Force+Attacks)
.

There are two ways to configure this feature.

1.  Configuring password recovery with reCaptcha for a tenant.
2.  Configuring password recovery with reCaptcha globally.

### Configuring password recovery with reCaptcha for a tenant

Follow the instructions given below to configure password recovery with
reCaptcha for a specific tenant.

1.  Set up reCaptcha with WSO2 Identity Server. For instructions on how
    to do this, and more information about reCaptcha, see [Setting Up
    ReCaptcha](https://docs.wso2.com/display/IS530/Setting+Up+ReCaptcha)
    .

2.  Enable the **EnableMultiTenancy** context-parameter in the
    **accountreoceryendpoint web.xml** file.

3.  Start WSO2 Identity Server and log into the [management
    console](https://localhost:9443/carbon/admin/login.jsp) as a tenant
    admin.

4.  On the **Main** tab, click on **Identity Provider** → **Resident
    Identity Provider** .

5.  Expand the **Account Management Policies** tab, then click on
    **Account Recovery.**

6.  Select the **Enable reCaptcha for Password Recovery** checkbox to
    enable reCaptcha for the password recovery flow.

    ![](https://lh3.googleusercontent.com/05TXlVbtJUx0TjtgKpp9xcLCKlJrScQQJZcUPbQxZTyPclSyX1s63gkz2MpEy7MXCYqceCjSPu2lVxeWKlHrVLkZu0rDB0c1AXPP92AwgiYs_T3vPamx5GDffaPeZHB57ijXlKrY){width="740"}

7.  You have now successfully configured reCaptcha for the password
    recovery flow. Start WSO2 Identity Server and log into the end user
    [dashboard](https://localhost:9443/dashboard) .

    !!! tip
    
        If you have changed the port offset or modified the hostname, change
        the port or hostname accordingly.
    

8.  Click on **Forgot Password** .

![](https://lh6.googleusercontent.com/W3hrI3O5Gb_VSEzNvBTw5PBKmvc8VIcS1toWSKsq3UqKo0zKGwUFLH4NpOR5U47iNivK8YxVxaJ-8G6wVumznKN4-sfc8CNjLSJ9zyZNPbFFW1_Sc8-BrZl4phqZ4GcPH-yROtuC){width="368"
height="478"}

  

Enter your username in the page that appears next and select **Proceed
to Password Recovery** .

![](https://lh3.googleusercontent.com/ppE9_Zzy0aBMxvY-m4TN99rgvrF_Fm8fu0ilJcC_n1v4Tq-iPkzwyWzRwBgMggpNiraFZyQYXIg3DEvyiJq_0VM_T_kG_Kigtm5anp4PUnwHjOLtiwfQmSWOlYI-LlUbpBjhjIAG){width="624"
height="227"}

  

You are redirected to the **Recover Password** page where you can select
the recaptcha option.

![](https://lh6.googleusercontent.com/FRpXHuLpTwsPKIUIOCeR_31HxqS8xpCJS5T9Am-MzeooRpAGHHdp9HX9GG-XBcoppIW-zeAta11_Ejo2WFpVhcIDdJ0UzqIpd9uiEvuNVFKzPyc3Zq5QNBs2580wnd4wyjpuJgbG){width="624"
height="333"}

### Configuring password recovery with reCaptcha globally

Follow the instructions given below to configure password recovery with
reCaptcha globally.  

1.  Navigate to the **identitiy.xml** file in
    \<IS\_HOME\>/repository/conf/identity, and uncomment the following
    configuration block.

    !!! tip
    
        To avoid any configuration issues, perofrm **step-1** before
        starting the WSO2 Identity Server product instance.
    

    ``` java
    <Recovery>
         <ReCaptcha>
                    <Password>
                    <Enable>true</Enable>
                     </Password>
                     <Username>
                    <Enable>false</Enable>
                     </Username>
         </ReCaptcha>

         <Notification>
               ………………
               ……………….

    </Recovery>
    ```

2.  Set up reCaptcha with WSO2 Identity Server. For instructions on how
    to do this, and more information about reCaptcha, see [Setting Up
    ReCaptcha](https://docs.wso2.com/display/IS550/Setting+Up+ReCaptcha)
    .

3.  You have now successfully configured reCaptcha for the password
    recovery flow. Start WSO2 Identity Server and log into the end user
    [dashboard.](https://localhost:9443/dashboard)  

    !!! tip
    
        If you have changed the port offset or modified the hostname, change
        the port or hostname accordingly.
    

4.  Click on **Forgot Password** .

![](https://lh6.googleusercontent.com/W3hrI3O5Gb_VSEzNvBTw5PBKmvc8VIcS1toWSKsq3UqKo0zKGwUFLH4NpOR5U47iNivK8YxVxaJ-8G6wVumznKN4-sfc8CNjLSJ9zyZNPbFFW1_Sc8-BrZl4phqZ4GcPH-yROtuC){width="341"
height="444"}

You are redirected to the **Recover Password** page where you can choose
the recaptcha option for password recovery.

![](https://lh5.googleusercontent.com/IR5qEpiMKOkVTwaTa1X-kzNCojR_tqEE8P8vuVIr56WoNhv9_IBCjO8V3H9IvDnFycqfHM0n9DXOfYeJLH_0TA5ZCmzuxH6ZHc1bnSXbiPIIyCrwWCSYOGaUVbySJZNLMxI75s3L){width="624"
height="377"}

  
