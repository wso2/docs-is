# Add FranceConnect Login

[FranceConnect](https://franceconnect.gouv.fr/) is a digital authentication solution provided by the French government. It allows users to log in to various online services using their FranceConnect credentials. This guide will help you set up FranceConnect login in {{ product_name }}.

## Register {{ product_name }} on FranceConnect
1. Log in to the [FranceConnect Portal](https://partenaires.franceconnect.gouv.fr/login){:target="_blank"}. 
2. You will get the Client ID and Client Secret from the FranceConnect application.
3. Enter the following as the Redirect URL:
   - **Authorization callback URL**
      ```bash
      {{ product_url_format }}/commonauth
      ```

## Register the FranceConnect Login

Now, let's register the FranceConnect in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Standard-based Idp**.
3. Click **Create**.
4. Enter a  unique name for your FranceConnect connection.
   ![Add FranceConnect in {{ product_name }}]({{base_path}}/assets/img/guides/idp/franceconnect-eid/add-franceconnect-eid.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
5. Enter the following details and click **Finish**:

       <table>
         <tr>
           <th>Parameter</th>
           <th>Description</th>
         </tr>
         <tr>
             <td>Client ID</td>
             <td>The client ID obtained from FranceConnect.</td>
         </tr>
         <tr>
             <td>Client secret</td>
             <td>The client secret obtained from FranceConnect.</td>
         </tr>
          <td>Authorised redirect URL</td>
             <td>Provide the Authorised redirect URL of your FranceConnect connection. For example `https://app.franceconnect.gouv.fr/api/v1/authorize`.</td>
         </tr>
         <tr>
             <td>Token Endpoint URL</td>
             <td>Provide the Token endpoint URL of your Signicat organization. For example `https://app.franceconnect.gouv.fr/api/v1/token`.</td>
         </tr>
       </table>
   <br>
      ![Enter FranceConnect's Endpoint details {{ product_name }}]({{base_path}}/assets/img/guides/idp/franceconnect-eid/add-franceconnect-wizard.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"} 
6. Click **Next**<br>
7. You can enter *JWKS endpoint URL*  of France Connect or upload the public certificate. This step is not mandatory while creating the connection.
      <table>
         <tr>
             <td>JWKS endpoint URL</td>
             <td>Provide the JWKS endpoint URL of your FranceConnect organization. For example `https://app.franceconnect.gouv.fr/api/v1/jwks`.</td>
         </tr>
      </table>
8. Click **Finish**.

## Enable FranceConnect login

{% include "../../../guides/fragments/add-login/eid-login/add-franceconnect-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, **Sign in with FranceConnect**.

    ![Login with FranceConnect]({{base_path}}/assets/img/guides/idp/franceconnect-eid/signin-with-franceconnect.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to FranceConnect with an existing eID.

    ![Login with FranceConnect IdPs]({{base_path}}/assets/img/guides/idp/franceconnect-eid/franceconnect-idps-login.png){: width="300" style="border: 0.3px solid lightgrey;"}

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.
