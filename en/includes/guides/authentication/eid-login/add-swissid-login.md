# Add SwissID login

[SwissID](https://www.swissid.ch/) is a secure digital identity solution developed in Switzerland, enabling users to access various online services through a single login. It is provided by SwissSign AG, a subsidiary of Swiss Post, and is recognized by the Swiss federal government as a trust service provider

## Register {{ product_name }} on SwissID

1. [Contact SwissID](https://www.swissid.ch/en/b2b-kontakt.html) in order to become a partner.
2. Once that process is done, you need to provide following as redirection URI.
    - **Authorization callback URL**
       ```bash
       {{ product_url_format }}/commonauth
       ```
   
3. You will get the Client ID and Client Secret from the SwissID application.
4. Take note of the **Client ID** and **Client secret**.

## Register the SwissID
Now, let's register the SwissID IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Standard-based Idp**.
3. Click **Create**.
4. Enter a  unique name for your SwissID connection.
   ![Add SwissConnect in {{ product_name }}]({{base_path}}/assets/img/guides/idp/swissid-eid/add-swissid-eid.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
5. Enter the following details and click **Finish**:

       <table>
         <tr>
           <th>Parameter</th>
           <th>Description</th>
         </tr>
         <tr>
             <td>Client ID</td>
             <td>The client ID obtained from SwissID.</td>
         </tr>
         <tr>
             <td>Client secret</td>
             <td>The client secret obtained from SwissID.</td>
         </tr>
          <td>Authorised redirect URL</td>
             <td>Provide the Authorised redirect URL of SwissID connection. For example `https://<swissid_env>/idp/oauth2/authorize`.</td>
         </tr>
         <tr>
             <td>Token Endpoint URL</td>
             <td>Provide the Token endpoint URL of SwissID. For example `https://<swissid_env>/api/v1/token`.</td>
         </tr>
       </table>
   <br>
      ![Enter SwissID's Endpoint details {{ product_name }}]({{base_path}}/assets/img/guides/idp/swissid-eid/add-swissid-wizard.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"} 
6. Click **Next**<br>
7. You can enter *JWKS endpoint URL*  of SwissID or upload the public certificate. This step is not mandatory while creating the connection.
      <table>
         <tr>
             <td>JWKS endpoint URL</td>
             <td>Provide the JWKS endpoint URL of your SwissID organization. For example `https://<swissid_env>/idp/oauth2/connect/jwk_uri`.</td>
         </tr>
      </table>
8. Click **Finish**.

## Enable SwissID login

{% include "../../../guides/fragments/add-login/eid-login/add-swissid-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, **Sign in with SwissID**.

    ![Login with SwissID]({{base_path}}/assets/img/guides/idp/swissid-eid/signin-with-swissid.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to SwissID with an existing eID.

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.
