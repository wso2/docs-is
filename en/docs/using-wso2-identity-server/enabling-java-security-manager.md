# Enabling Java Security Manager

The Java Security Manager is used to define various security policies
that prevent untrusted code from manipulating your system.  Enabling the
Java Security Manager for WSO2 products activates the Java permissions
that are in the
`         <PRODUCT_HOME>/repository/conf/sec.policy        ` file. You
modify this file to change the Java security permissions as required.

The steps below show how to enable the Java Security Manager for WSO2
products.

!!! Tip "Before you begin"
    Ensure that you have installed Java 1.8.

1.  Download the WSO2 product to any location (e.g.,
    `           <HOME>/user/<product-pack>          ` folder).

2.  To sign the JARs in your product, you need a key. Generate it using
    the `           keytool          ` command as follows:

    ``` java
    keytool -genkey -alias signFiles -keyalg RSA -keystore signkeystore.jks -validity 3650 -dname "CN=Sanjeewa,OU=Engineering, O=WSO2, L=Colombo, ST=Western, C=LK"

    Enter keystore password:  

    Re-enter new password:
    Enter key password for
    (RETURN if same as keystore password)
    ```

    The default keystore of the WSO2 products is
    `           wso2carbon.jks          `, which is in the
    `           <PRODUCT_HOME>/repository/resources/security          `
    folder. It is used for signing JARs.

3.  Import the `           signFiles          ` public key certificate
    that you created earlier to `           wso2carbon.jks          `
    . The sample below shows the security policy file referring the
    signer certificate from the `           wso2carbon.jks          `
    file:

    ``` java
    $ keytool -export -keystore signkeystore.jks -alias signFiles -file sign-cert.cer 
         
    $ keytool -import -alias signFiles -file sign-cert.cer -keystore repository/resources/security/wso2carbon.jks
        Enter keystore password:  
        Owner: CN=Sanjeewa, OU=Engineering, O=WSO2, L=Colombo, ST=Western, C=LK
        Issuer: CN=Sanjeewa, OU=Engineering, O=WSO2, L=Colombo, ST=Western, C=LK
        Serial number: 5486f3b0
        Valid from: Tue Dec 09 18:35:52 IST 2014 until: Fri Dec 06 18:35:52 IST 2024
        Certificate fingerprints:
        MD5:  54:13:FD:06:6F:C9:A6:BC:EE:DF:73:A9:88:CC:02:EC
        SHA1: AE:37:2A:9E:66:86:12:68:28:88:12:A0:85:50:B1:D1:21:BD:49:52
        Signature algorithm name: SHA1withRSA
        Version: 3
        Trust this certificate? [no]:  yes
        Certificate was added to keystore
    ```

4.  Prepare the scripts to sign the JARs and grant them the required
    permission. For example, the `           signallJars.sh          `
    script given below runs a loop to read all JARs and sign them.

    

    ``` java tab="signallJars.sh script"
    #!/bin/bash
    set -e
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_144.jdk/Contents/Home
    export PATH=$JAVA_HOME/bin:$PATH

    root=$1
    keyname="signkeystore.jks"
    keyalias="signFiles"
    keypass=""
    #keystore=$1/repository/resources/security/$keyname
    keystore=$keyname

    echo "JAVA HOME Set to : $JAVA_HOME"

    for i in `find $1 -iname "*.jar"`
    do
        echo $i
        echo $(jarsigner -sigalg SHA256withRSA -digestalg SHA1 -keystore $keystore -storepass $keypass $i $keyalias) | awk '{print $1 " " $2}'
        echo $(jarsigner -verify -keystore $keystore -storepass $keypass $i $keyalias) | awk '{print $1 " " $2}'
    done
    ```

5.  Execute the following commands to sign the JARs in your product:

    ``` java
    ./signallJars.sh /HOME/user/<product-pack>
    ```

    !!! tip     
        Every time you add an external JAR to the WSO2 product, sign them
        manually using the above instructions for the Java Security Manager
        to be effective. You add external JARs to the server when extending
        the product, applying patches etc.
    

6.  Open the startup script in the
    `          <PRODUCT_HOME>/bin         ` folder. For Linux, it is
    `          wso2server.sh         ` .
7.  Add the following system properties to the startup script and save
    the file:

    ``` java
    -Djava.security.manager=org.wso2.carbon.bootstrap.CarbonSecurityManager \
    -Djava.security.policy=$CARBON_HOME/repository/conf/sec.policy \
    -Drestricted.packages=sun.,com.sun.xml.internal.ws.,com.sun.xml.internal.bind.,com.sun.imageio.,org.wso2.carbon. \
    -Ddenied.system.properties=javax.net.ssl.trustStore,javax.net.ssl.trustStorePassword,denied.system.properties \
    ```

8.  Create a `           sec.policy          ` file with the required
    security policies in the
    `           <PRODUCT_HOME>/repository/conf          ` folder and
    start the server. Starting the server makes the Java permissions
    defined in the `           sec.policy          ` file take effect.
    The following is a sample of how this file would look.

    ``` java
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
