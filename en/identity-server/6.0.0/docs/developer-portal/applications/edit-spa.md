# Single Page Application

WSO2 Identity Server allows you to handle the authentication in your SPA conveniently and with minimum number of code lines. This a guide will demonstrate how you can integrate WSO2 Identity Server with any new or existing SPA using the Javascript OIDC SDK.

## Quick Start

Follow the step given below in order to try out how to integrate a SPA with WSO2 Identity Server.

```
1. Configure an application in the Identity Server using the SPA template.
2. Install and integrate the Javascript OIDC SDK. 
3. Run the application.
```

### Configure SPA in the Identity Server

The developer portal provide the capability to create applications using pre defined set of templates. Since you have created this application with the SPA template, most of the configurations should be added already. 

In case if you want to change any of the configurations please refer the [Application Configurations](#) section in the help panel to learn more about the purposes of these configurations and their usage.

### Install the Javascript OIDC SDK

As the next step you can install the Javascript OIDC SDK which will handle all the authentication related details and operations for you. By using this SDK you can manage the authentication of your application users without having to write many lines of code.

Run the following command within your project directory to install the SDK:

```
npm i @wso2/identity-oidc-js
```

In order to see how you can integrate the SDK with your application please refer to the [SDKs](#) section of the help panel or you can also check it out on [NPM registry](https://www.npmjs.com/package/@wso2/identity-oidc-js).

### Download and try out the SPA sample

In case if you don't have an application implemented, you can still try out this entire flow using our SPA samples. You can refer to the [Samples](#) section in the help panel to see more details.

You can also directly download the sample [here](#) or view the [source code on GitHub](https://github.com/wso2-extensions/identity-samples-js/tree/master/identity-authenticate-sample-js-spa).