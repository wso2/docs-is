
### Download the sample

To deploy a WSO2 Identity Server sample application, you need [download the `playground2.war`](https://github.com/wso2/samples-is/releases/download/v4.5.2/playground2.war) file from the latest release assets.

### Deploy the sample web app

To deploy the sample web app on a web container:

1. Copy the downloaded `playground2.war` file into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder.

2. Start the Tomcat server.

3. Access the applcation through this URL: `http://wso2is.local:8080/playground2/oauth2.jsp`

    !!! info
        By default, Tomcat runs on port 8080. If you have configured it to run on a different port, update the URL and access the playground application.  
