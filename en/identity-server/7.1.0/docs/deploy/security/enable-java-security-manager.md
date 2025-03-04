# Java Security Manager

The Java Security Manager is used to define various security policies that prevent untrusted code from manipulating your system.  

## How it works

Enabling the Java Security Manager for WSO2 Identity Server activates the Java permissions that are in `sec.policy` in the `<IS_HOME>/repository/conf/` directory.

Administrators can modify this file to change the Java security permissions as required and grant various application-level permissions to the signed and trusted code using Java.

When granting specific Java-level permissions to a certain signed code, it is required to import the public key certificate of the signer as a trusted certificate to one of your keystores. You must then update the `sec.policy` file with the `keystore path` and the `alias` of the certificate.

## Enable Java Security Manager

!!! tip "Before you begin"
    Make sure that you have installed Java 1.8.

To enable the Java Security Manager:

1. To sign the JARs in WSO2 Identity Server, a **key** is required. You can generate a key by generating a new keystore. Follow the steps given below to generate a new keystore with a new key.

    1. Execute the following keytool command.

        !!! note
            The new keystore is created in the directory in which you execute the keytool command.

		``` bash
		keytool -genkey -alias signFiles -keyalg RSA -keystore signkeystore.jks -validity 3650 -dname "CN=mark,OU=Engineering, O=WSO2, L=Colombo, ST=Western, C=LK"
        ```

    2. Enter the keystore password at the prompt.  

		``` bash
		Enter keystore password:  
		Re-enter new password:
		Enter key password for
		(RETURN if same as keystore password)
		```

	Now you have created a new keystore (`signkeystore.jks`) with a new public key certificate (`signFiles`).

	!!! info  
	    For more information on keystores, see [About keystores and truststores]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#about-keystores-and-truststores).

2. By default, WSO2 Identity Server uses the default `wso2carbon.jks` keystore to sign JARs. This keystore is located in the `<IS_HOME>/repository/resources/security` directory. Therefore, next you need to add newly created `signFiles` public key certificate into the `wso2carbon.jks` keystore.

    1. To export the `signFiles` public key certificate from the `signkeystore.jks` keystore, execute the following command.

	    ``` java
	    keytool -export -keystore signkeystore.jks -alias signFiles -file sign-cert.cer 
	    ```

    2. To import the same `signFiles` certificate to the `wso2carbon.jks` keystore, execute the following command.

		!!! tip
		Make sure to specify the correct directory path to the `wso2carbon.jks` file of WSO2 Identity Server.


  		```java
        $ keytool -import -alias signFiles -file sign-cert.cer -keystore <IS_HOME>/repository/resources/security/wso2carbon.jks 
        ```

        You will be prompted to enter the keystore password and verify the certificate.

        ```java
        Enter keystore password:  
        Owner: CN=John, OU=Engineering, O=WSO2, L=Colombo, ST=Western, C=LK
        Issuer: CN=John, OU=Engineering, O=WSO2, L=Colombo, ST=Western, C=LK
        Serial number: 5486f3b0
        Valid from: Tue Dec 09 18:35:52 IST 2014 until: Fri Dec 06 18:35:52 IST 2024
        Certificate fingerprints:
        MD5:  54:13:FD:06:6F:C9:A6:BC:EE:DF:73:A9:88:CC:02:EC
        SHA1: AE:37:2A:9E:66:86:12:68:28:88:12:A0:85:50:B1:D1:21:BD:49:52
        Signature algorithm name: SHA1withRSA
        Version: 3
        Trust this certificate? [no]:  yes
        ```

        !!! warning
            WSO2 no longer recommends MD5 for JAR signing due to cryptographic limitations.

3. Open the security policy file and replace the `grant signedBy` parameter value with the new `signFiles` alias key as shown below.

    ``` java
    grant signedBy "signFiles" {
      // permission java.util.PropertyPermission "*", "read";
      // permission java.lang.RuntimePermission "*", "*";
      // permission java.io.FilePermission "*", "*";
      permission java.security.AllPermission;
    };
    ```

4. Follow the instructions given below to sign the JARS.

    1. Prepare the scripts to sign the JARs and grant them the required permission. You can either use the `signJar.sh` script given below to sign each JAR file separately or you can use the `signJars.sh` script that runs a loop to read all the JAR files and sign them.

		=== "signJar.sh"
			```
			#!/bin/bash
			set -e
			jarfile=$1
			keystore_file="signkeystore.jks"
			keystore_keyalias='signFiles'
			keystore_storepass='wso2123'
			keystore_keypass='wso2123'
			signjar="$JAVA_HOME/bin/jarsigner -keystore $keystore_file -storepass $keystore_storepass -keypass $keystore_keypass"
			verifyjar="$JAVA_HOME/bin/jarsigner -keystore $keystore_file -verify"
			echo "Signing $jarfile"
			$signjar $jarfile $keystore_keyalias
			echo "Verifying $jarfile"
			$verifyjar $jarfile
			# Check whether the verification is successful.
			if [ $? -eq 1 ]
			then
				echo "Verification failed for $jarfile"
			fi
			```

		=== "signJars.sh"
			```
			#!/bin/bash
			if [[ ! -d $1 ]]; then
				echo "Please specify a target directory"
				exit 1
			fi
			for jarfile in `find . -type f -iname \*.jar`
			do
			./signJar.sh $jarfile
			done
			```


	2. To sign the JARs, execute the following command.  

		``` shell
		./signallJars.sh <IS_HOME>
		```

		!!! tip
			Every time you add an external JAR to WSO2 Identity Server, sign them manually using the above instructions for the Java Security Manager to be effective. You may add external JARs to the server when extending the product and applying patches.

5. Open the startup script in the `<IS_HOME>/bin` directory, e.g.,  for Linux, it is `wso2server.sh`.

6. Add the following system properties to the startup script and save the file.

	``` java
	-Djava.security.manager=org.wso2.carbon.bootstrap.CarbonSecurityManager \
	-Djava.security.policy=$CARBON_HOME/repository/conf/sec.policy \
	-Drestricted.packages=sun.,com.sun.xml.internal.ws.,com.sun.xml.internal.bind.,com.sun.imageio.,org.wso2.carbon. \
	-Ddenied.system.properties=javax.net.ssl.trustStore,javax.net.ssl.trustStorePassword,denied.system.properties \
	```

7. Create a `sec.policy` file with the required security policies in the `<IS_HOME>/repository/conf` directory and start WSO2 Identity Server. Starting the server makes the Java permissions defined in the `sec.policy` file take effect as given in the following sample file.

    !!! note
        The first line of the file indicates the `keystore path` and the `alias` of the certificate.

    ??? example  "Sample sec.policy"
        ```java
		keystore "file:${user.dir}/repository/resources/security/wso2carbon.jks", "JKS";
		// ========= Carbon Server Permissions ===================================
		grant {
		// Allow socket connections for any host
		permission java.net.SocketPermission "*:1-65535", "connect,resolve";
		// Allow to read all properties. Use -Ddenied.system.properties in wso2server.sh to restrict properties
		permission java.util.PropertyPermission "*", "read";
		permission java.lang.RuntimePermission "getClassLoader";
		// CarbonContext APIs require this permission
		permission java.lang.management.ManagementPermission "control";
		// Required by any component reading XMLs. For example: org.wso2.carbon.databridge.agent.thrift:4.2.1.
		permission java.lang.RuntimePermission "accessClassInPackage.com.sun.xml.internal.bind.v2.runtime.reflect";
		// Required by org.wso2.carbon.ndatasource.core:4.2.0. This is only necessary after adding above permission.
		permission java.lang.RuntimePermission "accessClassInPackage.com.sun.xml.internal.bind";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/publisher/localhost/publisher/site/conf/locales/jaggery/locale_en.json", "read,write";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/publisher/localhost/publisher/site/conf/locales/jaggery/locale_default.json", "read,write";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/publisher/site/conf/site.json", "read,write";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/store/localhost/store/site/conf/locales/jaggery/locale_en.json", "read,write";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/store/localhost/store/site/conf/locales/jaggery/locale_default.json", "read,write";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/store/site/conf/locales/jaggery/locale_en.json", "read,write";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/store/site/conf/locales/jaggery/locale_default.json", "read,write";
		permission java.io.FilePermission "${carbon.home}/repository/deployment/server/jaggeryapps/store/site/conf/site.json", "read,write";
		permission javax.management.MBeanServerPermission "findMBeanServer,createMBeanServer";
		permission javax.management.MBeanPermission "-#-[-]", "queryNames";
		permission javax.management.MBeanPermission "sun.management.MemoryImpl#*[java.lang:type=Memory]", "queryNames";
		permission javax.management.MBeanPermission "sun.management.MemoryImpl#*[java.lang:type=Memory]", "getMBeanInfo";
		permission javax.management.MBeanPermission "sun.management.MemoryImpl#*[java.lang:type=Memory]", "getAttribute";
		permission javax.management.MBeanPermission "sun.management.MemoryPoolImpl#*[java.lang:type=MemoryPool,name=*]", "queryNames";
		permission javax.management.MBeanPermission "sun.management.MemoryPoolImpl#*[java.lang:type=MemoryPool,name=*]", "getMBeanInfo";
		permission javax.management.MBeanPermission "sun.management.MemoryPoolImpl#*[java.lang:type=MemoryPool,name=*]", "getAttribute";
		permission javax.management.MBeanPermission "sun.management.GarbageCollectorImpl#*[java.lang:type=GarbageCollector,name=*]", "queryNames";
		permission javax.management.MBeanPermission "sun.management.GarbageCollectorImpl#*[java.lang:type=GarbageCollector,name=*]", "getMBeanInfo";
		permission javax.management.MBeanPermission "sun.management.GarbageCollectorImpl#*[java.lang:type=GarbageCollector,name=*]", "getAttribute";
		permission javax.management.MBeanPermission "sun.management.ClassLoadingImpl#*[java.lang:type=ClassLoading]", "queryNames";
		permission javax.management.MBeanPermission "sun.management.ClassLoadingImpl#*[java.lang:type=ClassLoading]", "getMBeanInfo";
		permission javax.management.MBeanPermission "sun.management.ClassLoadingImpl#*[java.lang:type=ClassLoading]", "getAttribute";
		permission javax.management.MBeanPermission "sun.management.RuntimeImpl#*[java.lang:type=Runtime]", "queryNames";
		permission javax.management.MBeanPermission "sun.management.RuntimeImpl#*[java.lang:type=Runtime]", "getMBeanInfo";
		permission javax.management.MBeanPermission "sun.management.RuntimeImpl#*[java.lang:type=Runtime]", "getAttribute";
		permission javax.management.MBeanPermission "sun.management.ThreadImpl#*[java.lang:type=Threading]", "queryNames";
		permission javax.management.MBeanPermission "sun.management.ThreadImpl#*[java.lang:type=Threading]", "getMBeanInfo";
		permission javax.management.MBeanPermission "sun.management.ThreadImpl#*[java.lang:type=Threading]", "getAttribute";
		permission javax.management.MBeanPermission "com.sun.management.UnixOperatingSystem#*[java.lang:type=OperatingSystem]", "queryNames";
		permission javax.management.MBeanPermission "com.sun.management.UnixOperatingSystem#*[java.lang:type=OperatingSystem]", "getMBeanInfo";
		permission javax.management.MBeanPermission "com.sun.management.UnixOperatingSystem#*[java.lang:type=OperatingSystem]", "getAttribute";
		permission javax.management.MBeanPermission "org.wso2.carbon.caching.impl.CacheMXBeanImpl#-[org.wso2.carbon:type=Cache,*]", "registerMBean";
		permission javax.management.MBeanPermission "org.apache.axis2.transport.base.TransportView#-[org.apache.synapse:Type=Transport,*]", "registerMBean";
		permission javax.management.MBeanPermission "org.apache.axis2.transport.base.TransportView#-[org.apache.axis2:Type=Transport,*]", "registerMBean";
		permission javax.management.MBeanPermission "org.apache.axis2.transport.base.TransportView#-[org.apache.synapse:Type=Transport,*]", "registerMBean";
		permission java.lang.RuntimePermission "modifyThreadGroup";
		permission java.io.FilePermission "${carbon.home}/repository/database", "read";
		permission java.io.FilePermission "${carbon.home}/repository/database/-", "read";
		permission java.io.FilePermission "${carbon.home}/repository/database/-", "write";
		permission java.io.FilePermission "${carbon.home}/repository/database/-", "delete";
		};
		// Trust all super tenant deployed artifacts
		grant codeBase "file:${carbon.home}/repository/deployment/server/-" {
			permission java.security.AllPermission;
		};
		grant codeBase "file:${carbon.home}/lib/tomcat/work/Catalina/localhost/-" {
		permission java.io.FilePermission "/META-INF", "read";
		permission java.io.FilePermission "/META-INF/-", "read";
		permission java.io.FilePermission "-", "read";
		permission org.osgi.framework.AdminPermission "*", "resolve,resource";
		permission java.lang.RuntimePermission "*", "accessClassInPackage.org.apache.jasper.compiler";
		};
		// ========= Platform signed code permissions ===========================
		grant signedBy "signFiles" {
		permission java.security.AllPermission;
		};
		// ========= Granting permissions to webapps ============================
		grant codeBase "file:${carbon.home}/repository/deployment/server/webapps/-" {
		// Required by webapps. For example JSF apps.
		permission java.lang.reflect.ReflectPermission "suppressAccessChecks";
		// Required by webapps. For example JSF apps require this to initialize com.sun.faces.config.ConfigureListener
		permission java.lang.RuntimePermission "setContextClassLoader";
		// Required by webapps to make HttpsURLConnection etc.
		permission java.lang.RuntimePermission "modifyThreadGroup";
		// Required by webapps. For example JSF apps need to invoke annotated methods like @PreDestroy
		permission java.lang.RuntimePermission "accessDeclaredMembers";
		// Required by webapps. For example JSF apps
		permission java.lang.RuntimePermission "accessClassInPackage.org.apache.jasper.compiler";
		// Required by webapps. For example JSF EL
		permission java.lang.RuntimePermission "getClassLoader";
		// Required by CXF app. Needed when invoking services
		permission javax.xml.bind.JAXBPermission "setDatatypeConverter";
		// File reads required by JSF (Sun Mojarra & MyFaces require these)
		// MyFaces has a fix https://issues.apache.org/jira/browse/MYFACES-3590  
		permission java.io.FilePermission "/META-INF", "read";
		permission java.io.FilePermission "/META-INF/-", "read";
		// OSGi permissions are requied to resolve bundles. Required by JSF
		permission org.osgi.framework.AdminPermission "*", "resolve,resource";

		};
		```


