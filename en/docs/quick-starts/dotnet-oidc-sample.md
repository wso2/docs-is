# .NET WPF Sample for OIDC .NET SDK

This sample is related to the [.NET SDK for OIDC](). More information related to it can be found in the respective
 page. 

Sample related to the WSO2 Identity Server written using .NET technologies. Can be found in 
[this](https://github.com/wso2-extensions/identity-samples-dotnet) repository. This document explains about the sample. 

1. Pickup-Manager

This sample consists an application written using WPF technologies to demonstrate the capabilities of the OIDC SDK for 
WSO2 Identity Server. The sample application can be configured with the WSO2 Identity Server and used to authenticate 
with the OIDC protocol. 

## Running the Sample

Following content available to download.

1. Pickup-Manager Sample - Application to demonstrate capabilities of OIDC SDK for WSO2 Identity Server.
2. Pickup-Manager Sample Setup - Windows Setup application to install the Pickup-Manager Sample.

Please follow the instructions given below to run each sample. 

### OIDC SDK Sample (Login_APP)

Build the sample project to get the necessary exe files. The files will be located in the bin /debug or bin
/release folder according to the build profile.

#### Prerequisites

1. Microsoft Windows 8 (Or server equivalent) or greater version.
2. .NET Framework Standard 4.5.x or greater.

#### How to run

1. Double click the Login_App.exe file to run the application.
2. At the first start, application will ask the necessary configurations related to the Identity Server OIDC application.
Please follow the [link](https://is.docs.wso2.com/en/5.9.0/learn/configuring-oauth2-openid-connect-single-sign-on/) on how to configure OIDC application in WSO2 Identity Server. 
3. Follow the on screen guidance to run the application. 

### OIDC Sample Setup Project (Pickup-Manager-Setup)

This will install the sample application with the necessary dependencies. To install the application,
1. Double click the setup.exe file.
2. Follow the on screen instructions.

After the installation is complete, follow the instructions in How to run section of the IDC SDK Sample (Login_APP) to
run the application.

## How to build the Solution

Please follow the instructions given below to build the entire solution or each project. Since these samples are depends
on its respective SDKs, it is required to download the necessary DLLs or build each project before building the samples.
SDKs are located in [this](https://github.com/wso2-extensions/identity-sdks-dotnet) github location.

### Prerequisites

1. Microsoft Windows 8 (Or server equivalent) or greater version.
2. .NET Framework Standard 4.5.x or greater.
3. Visual Studio 2017 Community or greater.
4. [Visual Studio Installer Projects addon to build the Setup Project.](https://marketplace.visualstudio.com/items?itemName=VisualStudioClient.MicrosoftVisualStudio2017InstallerProjects) 
5. [OIDC SDK project.](https://github.com/wso2-extensions/identity-sdks-dotnet/tree/master/org.wso2.identity.sdk.oidc)

### Building the OIDC SDK Sample Project

After having all the perquisites ready, please follow the instructions given below to build the project. 

1. Build the OIDC SDK project. (Follow the instructions given in the respective project on how to build it.) or
download the necessary DLL file. 
2. Update the references in the Sample Project to point to the SDK DLL. (If you have build the OIDC SDK project you can ignore this step.)
3. Build the project.

### Building the OIDC Sample Setup Project (Pickup-Manager-Setup)

After having all the perquisites ready, please follow the instructions given below to build the project.

1. Build the OIDC SDK Sample project.
2. Build the project.
