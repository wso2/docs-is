# Configuring reCaptcha for Username Recovery

The user account recovery feature implemented in the WSO2 Identity
Server helps to recover the username of the account in case the user
forgets it. This recovery process can also be secured with captcha
verification.

By configuring reCaptcha, you can mitigate or block brute force attacks.

!!! note
    
    For more information on setting up username recovery, see [Username
    Recovery](https://docs.wso2.com/display/IS570/Username+Recovery).
    
    For more information on brute force attacks, see [Mitigating Brute Force
    Attacks](https://docs.wso2.com/display/IS550/Mitigating+Brute+Force+Attacks)
    .
    

There are two ways to configure this feature.

1.  Configuring username recovery with reCaptcha for a tenant.
2.  Configuring username recovery with reCaptcha globally.

### Configuring username recovery with reCaptcha for a tenant

Follow the instructions given below to configure username recovery with
reCaptcha for a specific tenant.

1.  Set up reCaptcha with WSO2 Identity Server. For instructions on how
    to do this, and for more information about reCaptcha, see [Setting
    Up
    ReCaptcha](https://docs.wso2.com/display/IS530/Setting+Up+ReCaptcha)
    .
2.  Enable the **EnableMultiTenancy** context-parameter in the
    **accountreoceryendpoint web.xml** file.
3.  Start WSO2 Identity Server and log into the [management
    console](https://localhost:9443/carbon/admin/login.jsp) as tenant
    admin.
4.  On the **Main** tab, click on **Identity Provider** → **Resident
    Identity Provider**.

5.  Expand the **Account Management Policies** tab, then click on
    **Account Recovery.**

6.  Select the **Enable reCaptcha for Username Recovery** checkbox to
    enable reCaptcha for the username recovery flow.

    ![](https://lh4.googleusercontent.com/zTd4CiBLN0RieqXIlkpTDs0dT_GCj9yt5W8txpw_Rc10LsOWSu3Xmcnh2_ec53PI47V9XC-FQaePhEItW8e7s-QqUJ5LnwwqoTBR0ypfiTKXIWnHb5ESJtNOkwn5EsewPPhjK6yR){width="698"
    height="268"}

7.  You have now successfully configured reCaptcha for the username
    recovery flow. Start the WSO2 Identity Server and log into the end
    user [dashboard](https://localhost:9443/dashboard).

    !!! tip
    
        If you have changed the port offset or modified the hostname, change
        the port or hostname accordingly.
    

8.  Click on **Forgot Username**.

![](https://lh3.googleusercontent.com/Q62vVVWsshUM8-yjDJpOi4WXv_tDjMwC2ylDOFfD9HBpYdDQE9p6eNExhP4ytEcpLjZsWKoSlch64XXEhaM67bbScBGbtXXomNlS0zye4xXbaPzwbGD0aiTUF0ONcuIQq2bsu0Ha){width="368"
height="478"}

  

Enter the domain name in the page that appears next.

![](https://lh6.googleusercontent.com/LGZTBJ9UdKOWoV6e_xLu27sIYmQsDIdc2RllT67B_3_W2Was4_tr_ni7549NdnW8h_xZEZtDHCPaXwO4wLDZV32TEspcxe6gFV6GCTLDzcmgvPmrFXtgvvwhYJD9lmF4m3FHlzm4){width="624"
height="195"}

  

Clicking on **Proceed to Username Recovery** redirects you to the
following page where you can select the recaptcha option for username
recovery.

  

![](https://lh4.googleusercontent.com/3lW0AoG071ksmcfL4wBVjj0IBPMPfrYFKVjYEOw4w_ICKOUrC9orCGLEISPJ9O7itg7Yezn84kx96GTSc2dpYtlzerkobZ37iAg446JTV2clZbZJL3Sf4MRZvUNdtghxdTYl4i2w){width="624"
height="388"}

### Configuring username recovery with reCaptcha globally

Follow the instructions given below to configure username recovery with
reCaptcha globally.  

1.  Navigate to the **identity.xml** file in
    \<IS\_HOME\>/repository/conf/identity and uncomment the following
    configuration block.

    !!! tip
    
        To avoid any configuration issues, perform **Step-1** before
        starting the WSO2 Identity Server product instance.
    

    ``` java
    <Recovery>
         <ReCaptcha>
                    <Password>
                    <Enable>false</Enable>
                     </Password>
                     <Username>
                    <Enable>true</Enable>
                     </Username>
         </ReCaptcha>

         <Notification>
               ………………
               ……………….

    </Recovery>
    ```

2.  Set up reCaptcha with WSO2 Identity Server. For instructions on how
    to do this and more information about reCaptcha, see [Setting Up
    ReCaptcha](https://docs.wso2.com/display/IS550/Setting+Up+ReCaptcha)
    .

3.  You have now successfully configured reCaptcha for the username
    recovery flow. Start WSO2 Identity Server and log into the end user
    [dashboard](https://localhost:9443/dashboard).

    !!! tip
    
        If you have changed the port offset or modified the hostname, change
        the port or hostname accordingly.
    

4.  Click the Forgot Username link.

![](https://lh3.googleusercontent.com/Q62vVVWsshUM8-yjDJpOi4WXv_tDjMwC2ylDOFfD9HBpYdDQE9p6eNExhP4ytEcpLjZsWKoSlch64XXEhaM67bbScBGbtXXomNlS0zye4xXbaPzwbGD0aiTUF0ONcuIQq2bsu0Ha){width="368"
height="478"}

  

Clicking on **Forgot Username** redirects you to the following page
where you can select the recaptcha option for username recovery.

![](https://lh5.googleusercontent.com/TIgFrkWv6Nq7ut4K-OWBxC6cCswPsJUX_qnhUYL0EuFQ6sWMZpQ47d3fL4GJ64SsJdxbEMRop0V0V2TGnkSKXrA2i8qq2q7OFIDuZ0fqNpUAfhTlHteXgFu87O3bb7CjaweWxXcX){width="624"
height="440"}

  
  
  
