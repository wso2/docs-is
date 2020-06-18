
{!fragments/deploying-sample-apps.md!}

### Register a service provider

(TODO: insert portal content)

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. [Download](https://github.com/wso2/samples-is/releases/download/ v4.3.0/pickup-manager.war) the `pickup-manager.war` file from the latest release assets.


### Deploy the sample web app

Next, deploy the sample web app on a web container.

1. Extract the `pickup-manager.war` file and open the `manager.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

2. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![pickup-key-secret-2](../assets/img/fragments/pickup-key-secret-2.png)

3. Next, copy the extracted and modified `pickup-manager` folder to the `<TOMCAT_HOME>/webapps` folder.