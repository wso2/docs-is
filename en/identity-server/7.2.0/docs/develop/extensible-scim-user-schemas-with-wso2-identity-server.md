# Extensible SCIM User Schemas with WSO2 Identity Server



## SCIM1.1 Claim Mapping Instructions



To map an external claim to a local claim in WSO2 IS:



1. Log into the Identity Server.



2. Navigate to \*\*Main Menu → Claims → Add → Add External Claim\*\*.



3. Fill the form:


- **Dialect URI:** urn:scim:schemas:core:1.0

- **External Claim URI:** urn:scim:schemas:extension:wso2:1.0:wso2Extension.department

- **Mapped Local Claim:** http://wso2.org/claims/department



4. Save the mapping.

