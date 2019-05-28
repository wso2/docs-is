#!/bin/bash

export JAVA_HOME=/opt/java
export PATH=$PATH:$JAVA_HOME/bin

keyalias=wso2carbon
keypass='wso2carbon'
root=$1
keystore=$root/../../../resources/security/wso2carbon.jks
for i in `find $root -iname "*.jar"`
do
    echo $i
    jarsigner -keystore $keystore -storepass $keypass $i $keyalias
done

