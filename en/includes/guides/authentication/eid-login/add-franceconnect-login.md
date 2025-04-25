# Add FranceConnect eID Login

FranceConnect is a digital authentication solution provided by the French government. It allows users to log in to various online services using their FranceConnect credentials. This guide will help you set up FranceConnect login in {{ product_name }}.

## Register {{ product_name }} on FranceConnect
1. Log in to the [FranceConnect Portal](https://partenaires.franceconnect.gouv.fr/login){:target="_blank"}. 
2. You will get the Client ID and Client Secret from the FranceConnect application.
3. Enter the following as the Redirect URL:
   - **Authorization callback URL**
      ```bash
      {{ product_url_format }}/commonauth
      ```

## Register the FranceConnect eID Login

Now, let's register the FranceConnect in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Standard-based Idp**.
3. Click **Create**.
4. Enter a  unique name for your FranceConnect connection.
   ![Add FranceConnect in {{ product_name }}]({{base_path}}/assets/img/guides/idp/franceconnect-eid/add-franceconnect-eid.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
3. Enter the following details and click **Finish**:
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
          <td>Provide the Authorised redirect URL of your FranceConnect connection. For example https://app.franceconnect.gouv.fr/api/v1/authorize..</td>
      </tr>
      <tr>
          <td>Token Endpoint URL</td>
          <td>Provide the Token endpoint URL of your Signicat organization. For example https://app.franceconnect.gouv.fr/api/v1/token.</td>
      </tr>
    </table>
   ![Enter FranceConnect's Endpoint details {{ product_name }}]({{base_path}}/assets/img/guides/idp/franceconnect-eid/add-franceconnect-wizard.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

