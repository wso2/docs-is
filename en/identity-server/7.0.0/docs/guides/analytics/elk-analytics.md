# ELK-based Analytics - Overview

ELK-based Analytics is the on-premise analytics solution for the WSO2 Identity Server.

## Introduction

You can configure the WSO2 Identity Server to publish authentication and session related events to the ELK cluster and use Kibana dashboards to view analytics. Analytics data is published to a log file by the WSO2 Identity Server and the log file is used as the source for the analytics.

The ELK based on-premise analytics architecture has 4 main components.

1. **Filebeat** monitors the log file locations that you specify, collects log events, and forwards them to logstash.

2. **Logstash** is a server‑side data processing pipeline that ingests data from multiple sources, transforms it, and then sends it to Elasticsearch.

3. **Elasticsearch** is the central component of the Elastic stack and it is a distributed, RESTful search and analytics engine which can be used to store, search, and analyze big volumes of data quickly and in near real time.

4. **Kibana** is a visualization layer that works on top of Elasticsearch, providing users with the ability to analyze and visualize the data.

![ELK Analytics structure]( {{base_path}}/assets/img/elk-analytics/elk-analytics-architecture.png)


ELK-based Analytics provides three types of dashboards:

- **Auth Dashboard** : The latest version of WSO2 Identity
    Server Analytics allows you to
    view and analyze statistics of login attempts made through the
   authentication framework of WSO2 Identity Server.

- **Session Dashboard** : Includes statistics related to specific
   sessions that get created for different applications accessed via the
   WSO2 Identity Server. A session is the duration between a successful log on and the
   subsequent log off by a specific user.

- **Alert Dashboard** : Facilitates alerting so that you can be informed about
   abnormal behavior related to authentication operations carried out
   by the WSO2 Identity Server.

## What's Next?
To set up these components and deploy ELK analytics in the WSO2 Identity Server, follow the [ELK-based Analytics Installation Guide]({{base_path}}/deploy/elk-analytics-installation-guide).

