# XACML Sample for an Online Trading Application

The following sample demonstrates how to build a XACML driven
authorization for an on-line trading application called “K-Martket”.
This sample is shipped with the [Balana XACML
implementation](https://svn.wso2.org/repos/wso2/trunk/commons/balana).

### Prerequisites

Requires Java 1.8

### Scenario

-   K-Market is an online trading company. You can create a user account
    with K-Market and user profile data store in their own JDBC user
    store.
-   K-Market enforces some control over online trading based on the
    customer’s privileges which are determined by certain attributes of
    the customer (age, email etc).
-   In the initial phase of their access control system, K-Market has
    included the following access control scenario:  
    K-Market has three seperate customer groups (i.e. Blue, Silver and
    Gold) and have put limitations for each group when purchasing items
    online:  
      

    <table>
    <thead>
    <tr class="header">
    <th>Blue Customers</th>
    <th>Silver Customers</th>
    <th>Gold Customers</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Can not buy any liquor or medicine</td>
    <td>Can not buy any liquor</td>
    <td>Can purchase liquor and medicine</td>
    </tr>
    <tr class="even">
    <td>Maximum amount spent on a purchase is limited to $100</td>
    <td>Maximum amount spent on a purchase is limited to $500</td>
    <td>Maximum amount spent on a purchase is limited to $500</td>
    </tr>
    <tr class="odd">
    <td>Maximum amount spent on purchasing drinks is limited to $10</td>
    <td>Maximum amount spent on purchasing drinks is limited to $50</td>
    <td>Maximum amount spent on a purchasing liquor is limited to $10</td>
    </tr>
    <tr class="even">
    <td><br />
    </td>
    <td>Maximum amount spent on purchasing medicine is limited to $50</td>
    <td><br />
    </td>
    </tr>
    </tbody>
    </table>

-   When the customer proceeds to the shopping cart checkout to enter
    credit card details, the K-Market access control system is triggered
    to check whether it is an authorized online purchase.

### Executing the sample

This sample can be modified further by editing the policy files or
adding new policies. Follow the instructions below to test out the
sample.

1.  The code for the sample can be checked out from the [GitHub
    repository](https://github.com/wso2/samples-is).

2.  Start up [Identity Server](../../setup/running-the-product) and log in to the
    management console.
3.  Upload the policy by following the first three steps found
    [here](../../learn/creating-a-xacml-policy)
    and click on **Import Existing Policy**
4.  Click **Choose File** and upload the three policies found
    [here](https://svn.wso2.org/repos/wso2/people/asela/xacml/sample/kmarket/resources/)
    (one by one) and click **Upload**. The policies can also be found
    in your checked out folder in the
    `          <Sample_Home>/kmarket-trading-sample/resources         `
    directory.
5.  Publish the policies in PDP runtime. More information on this can be
    found in the [Publishing a XACML Policy
    page](../../learn/publishing-a-xacml-policy).
6.  Navigate to the **Entitlement** menu. Click **Policy View** under
    **PDP** and click **Enable** under the **Actions** section, for each
    policy.
7.  Implement PIP attribute finder module to retrieve the user's
    attributes from custom JDBC user store of the "Kmarket". More
    information on writing a custom PIP attribute finder module for this
    scenario can be found [here](../../develop/writing-a-custom-policy-info-point).
8.  Run the sample by navigating inside the `
    <Sample_Home>/xacml/kmarket-trading-sample/ ` directory on the
    command line and executing the **run** script.

    !!! info 
        UNIX: run.sh

        Windows: run.bat

        All dependant libraries can be found within the sample

    !!! note
    
        1. This sample contains dependancy for the [PEP agent
        sample](https://svn.wso2.org/repos/wso2/people/asela/xacml/pep/simple-agent/)
        . The PEP agent is an agent library that allows the client side API
        to talk with the WSO2 Identity Server. It is still under development
        however, this agent would work with this sample.
    
        2\. This sample does not consider user authentication so you can enter
        any value for the user's password. However, you can also advocate for
        authentication using the WSO2 Identity Server API.
    
