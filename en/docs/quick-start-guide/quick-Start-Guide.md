# Quick Start Guide

WSO2 Identity Server (WSO2 IS) is a comprehensive identity and access
management (IAM) solution. It caters to identity management requirements
across many platforms such as enterprise applications, services, and
APIs. This guide gives you a quick walk-through to WSO2 IS using a
sample scenario.

#### Sample Scenario

**Pickup** is a cab company that has many employees who use different
credentials to sign in to different internal enterprise applications.
Following are two such applications:

-   **Pickup Dispatch** : This application helps manage the overall
    operations at Pickup.
-   **Pickup Manager** : This application helps allocate vehicles to
    drivers.

Pickup needs to identify the necessary permission levels to be granted
to the employees and any security vulnerabilities.

**Cameron** is a senior manager at Pickup who is responsible for
resolving these issues using WSO2 IS. **Alex** is a junior manager
attending to day-to-day tasks and **Rowan** is the HR manager.

![](attachments/103329099/103329136.png){width="700"}

Let's assume that you are Cameron, and you want to resolve these issues
using WSO2 IS.

!!! tip
    
    **Before you begin**
    
    1.  Download and install OpenJDK 8 or Oracle JDK 1.8.\*.
    2.  Install WSO2 IS by downloading the
        [installer](https://wso2.com/identity-and-access-management/install/)
        .
    
        The WSO2 IS installation location vaires according to the OS as
        given below.
    
        | OS      | Home directory                            |
        |---------|-------------------------------------------|
        | Mac OS  | /Library/WSO2/IdentityServer/             |
        | Windows | C:\\Program Files\\WSO2\\IdentityServer\\ |
        | Ubuntu  | /usr/lib/wso2/IdentityServer/             |
        | CentOS  | /usr/lib64/IdentityServer/                |
    
        Hereafter, the installation location of WSO2 IS is called
        `             <IS_HOME>            ` .
    
    3.  [Download](https://tomcat.apache.org/download-80.cgi) and
        [install](https://tomcat.apache.org/download-80.cgi) Apache Tomcat
        version 8.\*.\* or above.
    4.  [Download](https://curl.haxx.se/download.html) and install curl.
    5.  Create a Twitter application to try out multi-factor or federated
        authentication.
        1.  Go to <https://twitter.com/> and create an account.
        2.  Register a new application on Twitter at
            [https://apps.twitter.com](https://apps.twitter.com/) . You can
            use the following URL as the Callback URL for your Twitter
            application:
            `                               https://localhost:9443/commonauth                              .              `
            .
    
        3.  Note down the `              API key             ` and
            `              secret             ` for later use.
    
    6.  Open the `             /etc/hosts            ` file and add the
        following entry.
    
        ``` xml
            127.0.0.1       localhost.com
    ```

    !!! warning
    
        If you are planning to use Single Sign-On (SSO), do not use
        `             localhost            ` as it will cause the Tomcat
        naked host issue. Use `             localhost.com            `
        instead.
    
        
            Make sure that this is the only such entry available for this IP
            address in the `             /etc/hosts            ` file to avoid
            any conflicts.
        

7.  [Start](https://docs.wso2.com/display/IS570/Running+the+Product)
    WSO2 IS.

**What's Next?** Let's deploy the sample by following the instructions
in the next tab.


**Steps to configure and run the samples**

1.  Download the samples from
    [GitHub](https://github.com/wso2/samples-is/releases/tag/v2.0.0) and
    unzip.

    ``` java
    unzip /home/../is-samples-2.0.0.zip
    ```

    !!! note
    
        From this point onwards
    
        -   `               <IS_HOME>              ` is the directory in
            which the WSO2 Identity Server is installed.
        -   `               <TOMCAT_HOME>              ` is the directory in
            which your Apache Tomcat server is installed.
    

2.  Open the
    `              is-samples-2.0.0/IS-QSG/samples/QSG-bundle/QSG/bin             `
    `              /server.properties             ` file and configure
    the following properties `              .             `

    1.  WSO2 IS location, hostname, and port.
    2.  Tomcat location, hostname, and port.

    ``` java
    wso2is.location=/home/Documents/wso2is-5.8.0
    tomcat.location=/home/Documents/apache-tomcat-<VERSION>
    wso2is.host.domain=localhost
    wso2is.host.port=9443
    tomcat.host.domain=localhost.com
    tomcat.host.port=9090
    ```

3.  Navigate to the
    `              is-samples-2.0.0/IS-QSG/samples/OIDC-APPS             `
    directory and copy `              pickup-dispatch.war             `
    and `              pickup-manager.war             ` to the
    `              Tomcat webapps             ` directory.

4.  Navigate to
    `              is-samples-2.0.0/IS-QSG/samples/SAML2-APPS             `
    and copy
    `              saml2-web-app-pickup-dispatch.com.war             `
    and
    `              saml2-web-app-pickup-manager.com.war             ` to
    the `              Tomcat webapps             ` directory.

5.  Navigate to `              <IS_HOME>/bin             ` using the
    command prompt and start the server.

    ``` java
        Linux   --> sh wso2server.sh
        Windows --> wso2server.bat
    ```

6.  Navigate to `              <TOMCAT_HOME>/bin             ` using the
    command prompt and start the Tomcat server by executing either of
    the following commands.

    ``` java
        Linux   --> sudo sh catalina.sh run
        Windows --> sudo catalina.bat
    ```

7.  Navigate to the `              <TOMCAT_HOME>/             `
    directory and grant access to the files in the
    `              <TOMCAT_HOME>/webapps             ` directory by
    executing the following command.

    ``` java
        sudo chmod 775 -R webapps/
    ```

8.  Navigate to
    `              is-samples-2.0.0/IS-QSG/samples             ` /
    `              QSG-bundle/QSG/bin             ` and execute either
    of the following commands to start the Quick Start samples.

    ``` java
        Linux   --> sudo sh qsg.sh run
        Windows --> sudo qsg.bat run
    ```

    A message appears to pick a scenario, which indicates that the
    samples are deployed and the WSO2 Identity Server is up and running.

9.  When prompted, confirm the configurations.
10. Note that a message appears to pick a scenario, which indicates that
    the samples are deployed and WSO2 IS is up and running.

**What's Next?** Let's try out the samples using the instructions in the
next tab.

Let's try out the samples.

##### **Problem Scenario**

The first problem that Pickup faces is that each employee has to use
separate sets of user names and passwords (credentials) to log in to
Pickup Dispatch and Pickup Manager.

![](attachments/103329099/103329138.png){width="600"}

When the number of applications that are used in Pickup increases, the
employees have to maintain more credentials. This is not scalable.
Cameron decides to use Single Sign-On (SSO) to overcome this situation.
With SSO, when a user signs in to one application (authentication), that
user is automatically authenticated to other applications, eliminating
the need to maintain multiple credentials.

Cameron decides to use WSO2 IS to configure SSO.

![](attachments/103329099/103329139.png){width="830"}

Let's use the command-line to check the SSO functionality with SAML2 or
OIDC.

##### **Configuring SSO with SAML2**

If the two applications are using SAML2 as their authentication
protocol, follow the steps below:

1.  Enter `               1              ` as the scenario number at the
    command prompt to:

    1.  Create the two users, Cameron and Alex.
    2.  Create and assign the user role Manager to Cameron.
    3.  Create service providers for Pickup Dispatch and Pickup Manager.
    4.  Configure SAML2 web SSO for Pickup Dispatch and Pickup
        Manager.  
        ![](attachments/103329099/103329115.png){width="550"}
    5.  Note that a message with the user and web application details
        appears.  
        ![](attachments/103329099/103329116.png){width="500"}

      

    !!! note
    
        You can also perform the above using the WSO2 IS Management Console.
        For more information, see [Creating users and
        roles](http://configuring%20users/#Adding%20a%20new%20user%20and%20assigning%20roles)
        , [Configuring service
        providers](_Adding_and_Configuring_a_Service_Provider_) , and
        [Configuring web app for SSO](_Configuring_Single_Sign-On_) .
    

2.  Go to the URL
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com> using
    a web browser to access the Dispatch application.

3.  Click **Log in** .  
    ![](attachments/103329099/103329117.png){width="250"}
4.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![](attachments/103329099/103329118.png){width="300"}

5.  Select the attributes that you want to share with Dispatch and click
    **Approve** .

    ![](attachments/103329099/103329119.png){width="400"}

    !!! note
    
        Obtaining the user consent is one of the fundamental requirements of
        the GDPR regulation. WSO2 IS facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 IS
        handles consent, see [Consent
        Management](https://docs.wso2.com/display/IS570/Consent+Management)
        .
    

    Note that the Pickup Dispatch home screen appears.

      

    ![](attachments/103329099/103329120.png){width="700"}

6.  Similarly, go to the URL
    <http://localhost.com:8080/saml2-web-app-pickup-manager.com> Using
    your browser to access the Pickup Manager application.

7.  Click **Log in** .  
    ![](attachments/103329099/103329121.png){width="250"}

8.  Note that the Pickup Manager application opens without having to
    enter the user credentials again.
    ![](attachments/103329099/103329122.png){width="700"}

9.  To try out other scenarios, navigate back to where you ran the Quick
    Start sample on the command-line and enter
    `              y             ` to clean the setup.  
    ![](attachments/103329099/103329123.png){width="600"}

##### **Configuring SSO with OIDC**

If the two applications are using OIDC as their authentication protocol,
follow the steps below:

1.  Enter `               2              ` as the scenario number at the
    command prompt.

    1.  Create the two users: Cameron and Alex.
    2.  Create and assign the user role Manager to Cameron.
    3.  Create service providers for Pickup Dispatch and Pickup Manager.
    4.  Configure SAML2 web SSO for Pickup Dispatch and Pickup Manager.

    ![](attachments/103329099/103329115.png){width="550"}  
    Note that a message with the user and web application details
    appears.

    ![](attachments/103329099/103329124.png){width="500"}

2.  Enter the
    [http://localhost.com:8080/pickup-dispatch](http://localhost:8080/Dispatch/)
    URL on a web browser to access the Pickup Dispatch application.
3.  Click **Log in** .  
    ![](attachments/103329099/103329117.png){width="250"}
4.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![](attachments/103329099/103329125.png){width="350"}

5.  Select the approval type that you wish provide and the attributes
    that you wish to share with the application and click **Continue**
    .  
    ![](attachments/103329099/103329126.png){width="400"}

    !!! note
    
        Obtaining the user consent is one of the fundamental requirements of
        GDPR regulation. WSO2 IS facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 IS
        handles consent, see [Consent
        Management](https://docs.wso2.com/display/IS570/Consent+Management)
        .
    

    Note that the Pickup Dispatch home screen appears.

    ![](attachments/103329099/103329120.png){width="700"}

6.  Similarly, enter
    [http://localhost:8080/pickup-manager](http://localhost:8080/Swift/)
    on a browser to access the Pickup Manager application. Notice that
    the Pickup Manager application opens without having to enter the
    user credentials.  
      
    ![](attachments/103329099/103329122.png){width="700"}  
    Hurrah! You have set up SSO and your employees are happy with their
    experience as they only have to provide credentials once in order to
    access both Pickup Dispatch and Pickup Manager.
7.  Next, in order to try out other scenarios, navigate back to the
    command prompt where you ran the Quick Start sample and enter
    `              y             ` to clean the setup.  
    ![](attachments/103329099/103329123.png){width="600"}

[![](attachments/103329099/103329127.png){.image-right
width="130"}](#QuickStartGuide-Top)

##### **Problem Scenario**

Pickup has a secure, hassle-free identity management system in place to
better protect the data resources and applications. However, the
traditional authentication mechanism that uses a user ID and
password is not sufficient. Cameron wants to enhance the security
standards by introducing another level of authentication. As a result,
Cameron decides to use the Multi-factor Authentication (MFA) capability
in WSO2 IS using the following factors:

-   **First factor** : password
-   **Second factor** : Twitter

Let's use the command-line to check the MFA functionality.

##### **Configuring Multi-factor Authentication**

Follow the steps below to configure MFA on the Pickup Dispatch and
Pickup Manager applications where Twitter is the second authentication
factor.

!!! tip
    
    **Before you begin**
    
    If you have run any other samples in this Quick Start Guide, navigate
    back to the `             is-samples-1.0.0/IS-QSG/samples            ` /
    `             QSG-bundle/QSG/bin            ` using the command-line and
    execute either of the following commands to start the Quick Start
    samples.
    
    ``` java
    Linux   --> sudo sh qsg.sh run
    Windows --> sudo qsg.bat run
```

A message appears to pick a scenario.


1.  Enter `              3             ` as the scenario number at the
    command prompt.  
    ![](attachments/103329099/103329115.png){width="550"}
2.  Enter `               y              ` to confirm that you have
    already registered an app in Twitter. (See the **Prerequisites**
    tab)

    ![](attachments/103329099/103329128.png){width="500"}

3.  Enter the `               API key              ` and the secret of
    the Twitter application when prompted.

    ![](attachments/103329099/103329129.png){width="650"}

4.  Note that a message with the user and application details appears.

    ![](attachments/103329099/103329130.png){width="500"}

5.  Go to the Enter the
    [http://localhost:8080/saml2-web-app-pickup-dispatch.com](http://localhost:8080/saml2-web-app-dispatch.com)
    URL on a web browser to access the Dispatch application.

6.  Click **Log in** .  
    ![](attachments/103329099/103329117.png){width="250"}
7.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Manager  --> Username: cameron | Password: cameron123
    Employee --> Username: alex    | Password: alex123 
    ```

    ![](attachments/103329099/103329118.png){width="300"}

    The Twitter login page appears as Twitter is the second
    authentication factor.

8.  Enter your Twitter `               username              ` and
    `               password              ` and click **Sign In** .
    ![](attachments/103329099/103329131.png){width="600"}

    After successful authentication, the **User Consents** form of the
    Dispatch application appears.

9.  Select the attributes that you want to share with Dispatch and click
    **Approve** .

    ![](attachments/103329099/103329119.png){width="400"}

      

    !!! note
    
        Obtaining user consent is one of the fundamental requirements of the
        GDPR regulation. WSO2 IS facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 IS
        handles consent, see [Consent
        Management](https://docs.wso2.com/display/IS570/Consent+Management)
        .
    

10. Note that the Dispatch home screen appears.

    ![](attachments/103329099/103329120.png){width="700"}

11. To try out other scenarios, navigate back to where you ran the Quick
    Start sample on the command-line and enter
    `               y              ` to clean the setup.
    ![](attachments/103329099/103329123.png){width="600"}

    ![](attachments/103329099/103329127.png){.image-right width="130"}

##### Problem Scenario

Pickup works with a team of external consultants. Cameron wants to grant
them access to the Pickup Dispatch and Pickup Manager applications.
However, it is a hassle to keep adding and maintaining their accounts in
the employee database as these consultants are temporary and they keep
rotating. Therefore, Cameron decides to use the identity federation
capability of WSO2 IS. This facilitates the external consultants to use
their already existing Twitter account credentials to sign in to the
Pickup applications.

Let's use the command line utility to check out how an external
consultant uses the command utility to configure federated
authentication.

##### **Configuring Federated Authentication**

Follow the steps below to configure federated authentication using WSO2
IS:

!!! tip
    
    **Before you begin**
    
    If you have run any other samples in this Quick Start Guide, navigate
    back to the `             is-samples-1.0.0/IS-QSG/samples            ` /
    `             QSG-bundle/QSG/bin            ` on the command prompt and
    execute either of the following commands to start the Quick Start
    samples.
    
    ``` java
    Linux   --> sudo sh qsg.sh run
    Windows --> sudo qsg.bat run
```

A message appears to pick a scenario.


1.  Enter `               4              ` as the scenario number at the
    command prompt to:

    1.  Create the two users: Cameron and Alex.
    2.  Create and assign the user role Manager to Cameron.
    3.  Create service providers for Pickup Dispatch and Pickup Manager.
    4.  Configure SAML2 web SSO for Pickup Dispatch and Pickup Manager.

    ![](attachments/103329099/103329115.png){width="550"}

2.  Enter `               y              ` to confirm that you have
    already registered an app in Twitter. (See **Prerequisites** tab)

    ![](attachments/103329099/103329132.png){width="500"}

      

3.  Enter the `               API key              ` and the secret of
    the Twitter application when prompted.

    ![](attachments/103329099/103329133.png){width="650"}

    Note that a message with the user and application details appears.

    ![](attachments/103329099/103329134.png){width="500"}

4.  Enter the
    [http://localhost:8080/saml2-web-app-pickup-dispatch.com](http://localhost:8080/saml2-web-app-dispatch.com)
    URL on a web browser to access the Pickup Dispatch application.
5.  Click **Log in** .

    ![](attachments/103329099/103329117.png){width="250"}  
    The Twitter login page appears.

6.  Enter your Twitter `               username              ` and
    `               password              ` and click **Sign In** .

    After a successful authentication, the **User Consents** form of the
    Dispatch application appears.

7.  Select the attributes that you wish to share with Pickup Dispatch
    and click **Approve** .

    ![](attachments/103329099/103329119.png){width="400"}

    !!! note
    
        Obtaining the user consent is one of the fundamental requirements of
        GDPR regulation. WSO2 IS facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 IS
        handles consent, see [Consent
        Management](https://docs.wso2.com/display/IS570/Consent+Management)
        .
    

    Note that the Pickup Dispatch home screen appears.

    ![](attachments/103329099/103329120.png){width="700"}  
    Hurrah! You have just signed in to the Pickup Dispatch application
    as an external consultant using your Twitter credentials.

8.  Next, in order to try out other scenarios, navigate back to the
    command prompt where you ran the Quick Start sample and enter
    `              y             ` to clean the setup.  
    ![](attachments/103329099/103329123.png){width="600"}

[![](attachments/103329099/103329127.png){.image-right
width="130"}](#QuickStartGuide-FATOP)

##### **Problem Scenario**

Pickup is going through a major expansion and is in the process of
hiring new employees. Currently, when a new employee joins, the Pickup
HR team requests for their details, and creates user accounts and then
asks them to verify, edit and customize their user profiles. This
process sometimes takes few days. Thus, the Rowan and the Pickup HR team
is having a hard time doing this one by one for especially when a larger
number of employees come on-board. Cameron realizes that allowing the
new employees to self sign-up to Pickup web applications will speed up
the onboarding process. As a result Cameron sets this up for Pickup HR
using WSO2 IS.

Let's use the command line utility to check out the self sign-up
functionality.

##### **Configuring Self Sign-up**

Follow the steps below to configure self sign-up for Pickup Dispatch and
Pickup Manager applications using WSO2 IS.

!!! tip
    
    **Before you begin**
    
    1.  If you have run any other samples in this Quick Start Guide,
        navigate back to the
        `               is-samples-1.0.0/IS-QSG/samples              ` /
        `               QSG-bundle/QSG/bin              ` on the command
        prompt and execute either of the following commands to start the
        Quick Start samples.
    
        ``` java
            Linux   --> sudo sh qsg.sh run
            Windows --> sudo qsg.bat run
    ```

    A message appears to pick a scenario.

2.  Open the
    `               <IS_HOME>/repository/conf/output-event-adapters.xml file              `
    .

3.  Locate the adapter configurations for emails and update the
    `               email address              ` ,
    `               username              ` , and
    `               password              ` parameters with the values
    of a valid email account.

    ``` java
        <adapterConfig type="email">        
                <property key="mail.smtp.from"><<email address>></property>
                <property key="mail.smtp.user"><<username>></property>
                <property key="mail.smtp.password"><<password>></property>
                ...
        </adapterConfig>
    ```

4.  Restart WSO2 IS.

    ``` java
        Linux   --> sh wso2server.sh
        Windows --> wso2server.bat
    ```

5.  Navigate to
    `               is-samples-1.0.0/IS-QSG/samples              ` /
    `               QSG-bundle/QSG/bin              ` and execute either
    of the following commands to start the Quick Start samples.

    ``` java
        Linux   --> sudo sh qsg.sh run
        Windows --> sudo qsg.bat run
    ```


1.  Enter `               5              ` as the scenario number at the
    command prompt.

    ![](attachments/103329099/103329115.png){width="550"}

    A prompt appears to choose the user sign-up approach.

    -   **Enable self user registration (without any config)** : This
        enables self sign-up without having to do additional
        configurations. Once registered, the user receives an email to
        the provided email address.
    -   **Enable account lock on creation** : This locks the user
        account during user registration. The user can only sign in to
        the application after clicking the verification link sent to the
        user-provided email address. A confirmation mail is sent to the
        user but user account is locked until the user confirms the
        account by clicking on the account confirmation mail sent by
        WSO2 IS.

    ![](attachments/103329099/103329135.png){width="500"}

2.  Enter `               number              ` that matches with the
    approach you would like to try.

    ![](attachments/103329099/103329100.png){width="500"}

3.  Enter the
    [http://localhost.com:8080/pickup-dispatch](http://localhost.com:8080/saml2-web-app-pickup-dispatch.com)
    URL on a web browser to access the Dispatch application.

4.  Click **Log in** .  
    ![](attachments/103329099/103329117.png){width="250"}
5.  Click **Register Now** .

    ![](attachments/103329099/103329101.png){width="300"}

      

6.  Enter a `               username              ` for your user
    account and click **Proceed to Self Register** .

    ![](attachments/103329099/103329102.png){width="500"}

    !!! note
    
        If you want a user to self register for a specific tenant, provide
        the `               username              ` in the following format:
        `               <USERNAME>@<TENAND_DOMAIN>              ` .
    

7.  Provide the `               user profile details              ` ,
    agree to the **Privacy Policy** , and click **Register** .  
    ![](attachments/103329099/103329103.png){width="600"}

    A confirmation message appears.

    ![](attachments/103329099/103329104.png){width="600"}

8.  Click **Close** .

    1.  If you selected **Enable User Registration (without any
        config)** at [step 1](#QuickStartGuide-WFStep01) , navigate back
        to the Pickup Dispatch application and sign in using the new
        user credentials.

    2.  If you selected **Account Lock on Creation** at [step
        1](#QuickStartGuide-WFStep01) , access your email account to
        view the account registration confirmation mail.

        1.  Click **Confirm Registration** in the email or copy the link
            in the email to your browser and confirm the account
            creation.

            The account gets unlocked and an email is sent.

        2.  Navigate back to the Pickup Dispatch application and sign in
            using the new user credentials.

        ![](attachments/103329099/103329118.png){width="300"}

        Note that the Dispatch home screen appears.

        ![](attachments/103329099/103329120.png){width="700"}

        Hurrah! You have just self-signed up to a Pickup web
        application.

9.  Next, in order to try out other scenarios, navigate back to the
    command prompt where you ran the Quick Start sample and enter
    `               y              ` to clen the setup.
    ![](attachments/103329099/103329123.png){width="600"}

[![](attachments/103329099/103329127.png){.image-right
width="130"}](_Quick_Start_Guide_)

##### **Problem Scenario**

After Cameron sets up self registration for Pickup web applications,
Rowan is concerned about the security. Rowan prefers to review and
approve new user accounts before granting access to the Pickup web
applications. Thus, Rowan reaches out to Cameron with these concerns.
Cameron realizes the possibility of creating a workflow using WSO2 IS
and granting role-based authorization, so that each account registration
will be subject to approval.

Let's use the command-line to check out the workflow functionality.

In this workflow, whenever a new user account is created, first it
creates a task for a junior manager (Alex) to approve/reject the account
creation. Upon the junior manager approving the account creation, a task
will be created for the senior manager (Cameron) to approve or reject
the user account.

##### **Configuring a Workflow**

Follow the steps below to configure a workflow.

!!! tip
    
    **Before you begin**
    
    If you have run any other samples in this Quick Start Guide, navigate
    back to the `             is-samples-1.0.0/IS-QSG/samples            ` /
    `             QSG-bundle/QSG/bin            ` on the command prompt and
    execute either of the following commands to start the Quick Start
    samples.
    
    ``` java
    Linux   --> sudo sh qsg.sh run
    Windows --> sudo qsg.bat run
```

A message appears to pick a scenario.


1.  Enter `              6             ` as the scenario number at the
    command prompt.  
    ![](attachments/103329099/103329115.png){width="550"}

    Note that a message with the user and web application details
    appears.

    ![](attachments/103329099/103329105.png){width="500"}

2.  Enter the
    [http://localhost.com:8080/pickup-dispatch](http://localhost.com:8080/saml2-web-app-pickup-dispatch.com)
    URL on a web browser to access the Pickup Dispatch application.

3.  Click **Log in** .  
    ![](attachments/103329099/103329117.png){width="250"}
4.  Click **Register Now** .

    ![](attachments/103329099/103329101.png){width="300"}

5.  Enter a `               username              ` for your user
    account and click **Proceed to Self Register** .

    ![](attachments/103329099/103329102.png){width="500"}

    !!! note
    
        If you want a user to self register for a specific tenant, provide
        the `               username              ` in the following format:
        `               <USERNAME>@<TENAND_DOMAIN>              ` .
    

6.  Provide the `               user profile details              ` ,
    agree to the **Privacy Policy** , and click **Register** .  
    ![](attachments/103329099/103329103.png){width="600"}

    Even though a new user account is created successfully, it is in
    disabled state. To enable the user, you need to sign in to the WSO2
    dashboard and approve the pending workflow requests.

7.  Enter the
    [http://localhost:9443/dashboard](http://localhost:9443/dasjboard)
    URL on a web browser to access **WSO2 Dashboard** .  
    ![](attachments/103329099/103329118.png){width="300"}

8.  Enter the following credentials to sign in as Alex and click **Sign
    In** .

    ``` java
    Username: alex    | Password: alex123
    ```

9.  Provide the consents.

    ![](attachments/103329099/103329106.png){width="400"}

10. Click **Pending Approvals \> View Details** .  
    ![](attachments/103329099/103329107.png){width="900" height="508"}

11. Click the **Task ID** .

    ![](attachments/103329099/103329108.png){width="900" height="300"}

12. Click **Approve** to approve the user account creation.  
    ![](attachments/103329099/103329109.png){width="900" height="491"}

    Note that a confirmation message appears.  
    ![](attachments/103329099/103329110.png){width="800"}

    Click **OK** .

13. Click **Sign out** to sign out of WSO2 Dashboard as Alex.  
    ![](attachments/103329099/103329111.png){width="200"}

14. Enter the following credentials to sign in as Cameron and click
    **Sign In** .

    ``` java
        Username: cameron    | Password: cameron123
    ```

15. Provide consents.

    ![](attachments/103329099/103329106.png){width="400"}

16. Click **Pending Approvals \> View Details** .

    ![](attachments/103329099/103329112.png){width="900" height="491"}

17. Click the **Task ID** .

    ![](attachments/103329099/103329113.png){width="900" height="307"}

18. Click **Approve** to approve the user account creation.

    ![](attachments/103329099/103329114.png){width="900"}

19. Navigate back to the Pickup Dispatch application and sign in using
    the new user credentials.

    ![](attachments/103329099/103329118.png){width="300"}
    Select the attributes that you wish to share with Pickup Dispatch
    and click **Approve** .

    ![](attachments/103329099/103329119.png){width="400"}

    !!! note
        Obtaining the user consent is one of the fundamental requirements of
        GDPR regulation. WSO2 IS facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 IS
        handles consent, see [Consent
        Management](https://docs.wso2.com/display/IS570/Consent+Management)
        .
    
    Note that the Pickup Dispatch home screen appears.

    ![](attachments/103329099/103329120.png){width="700"}

  

This concludes the Quick Start Guide!

You have set up WSO2 IS and gone through the basic use cases of the
product. For more advanced use cases, check our
[Tutorials](https://docs.wso2.com/display/IS570/Tutorials) .
