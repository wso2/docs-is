#!/bin/bash

export JAVA_HOME=/opt/java
export PATH=$PATH:$JAVA_HOME/bin

keyname="wso2carbon.jks"
keyalias=wso2carbon
keypass='wso2carbon'
root=$1
keystore=$1/repository/resources/security/$keyname
for p in $root/repository/components/plugins $root/repository/components/lib $root/lib $root/lib/patches $root/lib/api  $root/bin 
do
    for i in `find $p -iname "*.jar"`
    do
        echo $i
        jarsigner -keystore $keystore -storepass $keypass $i $keyalias
    done
done

