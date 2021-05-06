In earlier versions, WSO2 Identity Server had the option to create databases automatically using the 
-DSetup option.  **From [January 2018 onwards](https://wso2.com/products/carbon/release-matrix/), 
WSO2 Identity Server has deprecated the `              -DSetup             `** option.
Note that the proper practice is for the DBA to run the DDL statements manually so that the DBA
can examine and optimize any DDL statement (if necessary) based on the DBA best practices that are in
place within the organization.  