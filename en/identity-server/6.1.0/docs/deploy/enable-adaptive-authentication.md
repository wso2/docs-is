# Enable adaptive authentication

!!! warning "Important"
    **This guide is only applicable for systems operating on JDK 17**. If your system's JDK version is below 17, adaptive authentication is enabled by default and no further configurations are required.

If your system operates on JDK 17, an additional configuration is needed to enable adaptive authentication in WSO2 Identity Server. Refer to the section that applies to you based on the type of deployment.

## For standard deployments

Follow the steps below to enable adaptive authentication for a standard deployment on JDK 17.

1. Stop the WSO2 Identity Server if it is already running.

2. Run the **adaptive.sh** (or **adaptive.bat** for Windows) found in the `<IS-HOME>/bin` directory.

3. Restart the server.

!!! note
    You may disable adaptive authentication by running the same script with the **DISABLE** parameter as follows.</br>
    ```sh adaptive.sh DISABLE```

## For Docker deployments

You can find the docker images for WSO2 Identity Server in the [WSO2 Docker Hub](https://docker.wso2.com/tags.php?repo=wso2is).

To create a Docker image with adaptive authentication enabled, add the following commands to your Dockerfile and run it against the base image.

```
RUN chmod +x ${WSO2_SERVER_HOME}/bin/adaptive.sh
RUN ${WSO2_SERVER_HOME}/bin/adaptive.sh
```
The following is a sample Dockerfile that builds an image with adaptive authentication.

``` bash
FROM wso2is:6.1.0.0-jdk17


ARG USER=wso2carbon
ARG USER_ID=802
ARG USER_HOME=/home/${USER}
# build arguments for WSO2 product installation
ARG WSO2_SERVER_NAME=wso2is
ARG WSO2_SERVER_VERSION=6.1.0
ARG WSO2_SERVER=${WSO2_SERVER_NAME}-${WSO2_SERVER_VERSION}
ARG WSO2_SERVER_HOME=${USER_HOME}/${WSO2_SERVER}


RUN chmod +x ${WSO2_SERVER_HOME}/bin/adaptive.sh
RUN ${WSO2_SERVER_HOME}/bin/adaptive.sh


# Set the user and work directory.
USER ${USER_ID}
WORKDIR ${USER_HOME}


# set environment variables
ENV JAVA_OPTS="-Djava.util.prefs.systemRoot=${USER_HOME}/.java -Djava.util.prefs.userRoot=${USER_HOME}/.java/.userPrefs" \
   WORKING_DIRECTORY=${USER_HOME} \
   WSO2_SERVER_HOME=${WSO2_SERVER_HOME}


# expose ports
EXPOSE 4000 9763 9443


# initiate container and start WSO2 Carbon server
ENTRYPOINT ["/home/wso2carbon/docker-entrypoint.sh"]
```

