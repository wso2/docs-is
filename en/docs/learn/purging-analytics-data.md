# Purging Analytics Data

Data purging is an option to remove historical data in WSO2 Identity
Server Analytics. This is important as it is not possible to delete
tables or table data in WSO2 Identity Server Analytics. By purging data,
you can achieve high performance in WSO2 IS data analysis without
removing analyzed summary data. Only the data that was streamed by WSO2
Identity Server is purged.

Follow the steps below to purge the analytics data.

This action affects all the tenants.

1.  Navigate to the
    `          <IS_ANALYTICS_HOME>/wso2/worker/deployment/siddhi-files         `
    directory.
2.  Open a required Siddhi application and change the purging interval
    as needed. For more information on data purging, see [Siddhi Query
    Guide - Incremental
    Aggregation](https://wso2.github.io/siddhi/documentation/siddhi-4.0/#incremental-aggregation)
    .
