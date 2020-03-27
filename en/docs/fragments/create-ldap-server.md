## Create an LDAP Server

1.  Open Apache Directory Studio.

2.  On the **LDAP Servers** tab found on the bottom left corner,click **New Server**.  

    ![new-server](../assets/img/fragments/new-server.png)

3.  Select **LDAP server ApacheDS 2.0.0** and click **Finish**.  

    ![select-ldap-server](../assets/img/fragments/select-ldap-server.png)

4.  Right-click on the newly created server and click **Open Configuration**.

    ![ldap-server-config](../assets/img/fragments/ldap-server-config.png)

5.  Port offset the LDAP and LDAP server ports by changing the LDAP port to 10390 and the LDAP server port to 10637. This ensures that the embedded LDAP server running in the prior installation of WSO2 IS does not conflict with the current installation.

    ![ldap-port-offset](../assets/img/fragments/ldap-port-offset.png)

6.  Right-click on the new server and click **Create a Connection**.  

    ![create-an-ldap-connection](../assets/img/fragments/create-ldap-connection.png)

7.  Right-click on the server and click **Run** to start the server.

    ![run-ldap-server](../assets/img/fragments/run-ldap-server.png) 