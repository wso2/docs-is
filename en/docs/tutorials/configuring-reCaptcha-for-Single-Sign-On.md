# Configuring reCaptcha for Single Sign On

This topic guides you through configuring reCaptcha for the single sign
on flow. By configuring reCaptcha, you can mitigate or block brute force
attacks.

-   For more information on configuring single sign on, see [Configuring
    Single Sign-On](_Configuring_Single_Sign-On_) .
-   For more information on brute force attacks, see [Mitigating Brute
    Force Attacks](_Mitigating_Brute_Force_Attacks_) .

1.  Set up reCaptcha with the WSO2 Identity Server. For instructions on
    how to do this and more information about reCaptcha, see [Setting Up
    ReCaptcha](_Setting_Up_ReCaptcha_) .

    !!! note
    
        **Note:** To modify the filter mapping for reCaptcha, open the
        `           web.xml          ` file located in the
        `           <IS_HOME>/repository/conf/tomcat/carbon/WEB-INF          `
        directory and find the following filter. You can modify the relevant
        URL patterns if required.
    
        ``` xml
        <filter>
                <filter-name>CaptchaFilter</filter-name>
                <filter-class>org.wso2.carbon.identity.captcha.filter.CaptchaFilter</filter-class>
            </filter>
            <filter-mapping>
                <filter-name>CaptchaFilter</filter-name>
                <url-pattern>/samlsso</url-pattern>
                <url-pattern>/oauth2</url-pattern>
                <url-pattern>/commonauth</url-pattern>
                <dispatcher>FORWARD</dispatcher>
                <dispatcher>REQUEST</dispatcher>
            </filter-mapping>
        ```
    

2.  Start the WSO2 IS Server and login to the management console.
3.  Click **List** under **Identity Providers** found in the **Main**
    tab.
4.  Click **Resident Identity Provider** and expand the **Login
    Policies** tab. Then, expand the **Captcha for SSO Login** tab.
5.  Select **Enable** and enter a value for the **Max failed attempts**
    field. For example, if you enter 3, reCaptcha will be re-enabled
    after 3 failed attempts.  
    ![](attachments/103330887/103330889.png)

    !!! note
    
        **Note:** This value should be less than the number of failed
        attempts configured in the account locking connector.
    
        ![](attachments/103330887/103330888.png)
    

6.  You have now successfully configured reCaptcha for the single sign
    on flow. If the number of failed attempts reaches the maximum
    configured value, the following reCaptcha window appears.  

    ![7.png](https://lh3.googleusercontent.com/kQobGizovBgOEJoJoBKhsRnBb_4tHSCCaKgE-nGZRgM_rdIgNEcaXP-X1DvRa-YL_-hq6_ivsVi8TUQG8-O8z5cpWVDJhlhytj3IYLh1xc_2n6ZHOG_9paB7NtqgYbYwdIXy5U97){width="386"}
