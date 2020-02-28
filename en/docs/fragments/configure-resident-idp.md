## Configure the resident IdP

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Click **Identity Providers > Resident**. 

    ![resident-idp](../../../assets/img/fragments/resident-idp.png)

3. Configure the following. 

    - **Home Realm Identifier**: This is the domain name of the identity provider. If you do not enter a value here, when an authentication request comes to WSO2 Identity Server, a user will be prompted to specify a domain. You can enter multiple identifiers as a comma-separated list.

    - **Idle Session Time Out**: This is the duration in minutes for which an SSO session can be idle for. If WSO2 Identity Server does not receive any SSO authentication requests for the given duration, a session time out occurs. 

    - **Remember Me Period**: This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that the **Remember Me** option is selected in the WSO2 Identity Server login screen.

        <img name='configure-resident-idp' src='../../../assets/img/fragments/configure-resident-idp.png' class='img-zoomable'/>
