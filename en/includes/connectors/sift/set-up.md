# Set up

The following guide explains how you can install and set up Sift in {{product_name}}.

## Prerequisites

You need to have a Sift account. If you don't have an account, create one by visiting the [Sift website](https://sift.com/).

## Step 1: Install the Sift connector

Follow the steps below to install Sift in {{product_name}}.

1. Download the project artifacts from the {{product_name}} [connector store](https://store.wso2.com/connector/identity-fraud-detection-sift){: target="_blank"}.

2. Copy the `org.wso2.carbon.identity.fraud.detection.sift-<version>.jar` file to the `<IS_HOME>/repository/components/dropins` directory.

3. Restart {{product_name}}.

## Step 2: Add the API key

To work with Sift, you need to register your Sift API key in {{product_name}}. To do so,

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Click **Fraud Detection** and enter the API key.

    ![Configuring Sift in WSO2 Console]({{base_path}}/assets/img/connectors/sift/sift-api-key.png)

3. Click **Update** to save the changes.
