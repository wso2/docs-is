# XACML extension in WSO2 Identity Server

 With the XACML architecture there are 4 main separate components as,

    PIP (Policy Information Point) - serves information required for policy evaluation.
    PAP (Policy Administration Point) - serves capabilities to govern the policies.
    PDP (Policy Decision Point) - make decision on incoming requests whether to permit or deny based on the defined policies and information collected from PIP.
    PEP (Policy Enforcement Point) - the interception point which checks and honors the policy decision.


WSO2 Identity Server can act as all these 4 components. Hence, there are extensions points available in all 4 modules.

Visit the following blog for get a detail idea on XACML extension points.

-   [Identity Server XACML extension points](http://pushpalankajaya.blogspot.com/2017/07/wso2-identity-server-extension
-points.html)