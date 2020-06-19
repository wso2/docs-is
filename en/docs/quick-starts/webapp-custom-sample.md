# Enable Login for a Sample Custom Web Application
This page guides you through integrating custom inbound authenticator with WSO2 Identity Server.

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/integrate-custom-protocol" rel="nofollow noopener">I have my own application</a>

----

{!fragments/deploying-sample-apps.md!}

----
## Download the sample
To be able to deploy a WSO2 Identity Server sample, you need to download it onto your machine first.

Follow the instructions below to download the sample from GitHub. 
Please refer ['Write a Custom Inbound Protocol'](insertlink) section for the implementation details.

1. Navigate to [WSO2 Identity Server Samples](insertlink).

2. [Download](inserlink) the TODO.war file and TODO-authenticator.jar from the latest release assets.

---
## Deploy the inbound authenticator

 - Copy the [authenticator.jar](TODO:insert-download-link) to the `<IS_HOME>/repository/components/dropins` directory.
 
----

(TODO: dev-portal-fragment)

{!fragments/register-a-service-provider.md!}

4. Expand **Inbound Authentication Configuration** and fill the relevant data in the **Custom Inbound Configuration section.
![inbound authentication configuration](../assets/img/guides/custom-inbound-authenticator-config.png)

----

## Deploy and test the sample web app
1. Copy the extracted and modified (TODO) folder to the `<TOMCAT_HOME>/webapps` folder

2. Access the TestApp application at [http://localhost:8080/TestApp](insertlink)

3. Click **Login**

3. (TODO: Explain the behaviour based on the sample)


----

!!! info "Related Topics"
    - [Guide: Enable Login for a Web Application](../../../guides/login/integrate-custom-protocol)
    - [Guide: Write a Custom Inbound Protocol](TODO:insert-link-to-guide)