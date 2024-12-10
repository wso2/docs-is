<div class="center-all">
  <h1>Add Single Sign On </h1>
  <h3>Add Single Sign On (SSO) with {{ product_name }}</h3>

  <div class="cards-container">
     <a href="{{base_path}}/guides/authentication/sso-integrations/add-google-workspace-template" class="card square">
      <img src="{{base_path}}/assets/img/logo/google-logo.svg" alt="Google" />
      <span>Google</span>
    </a>
    <a href="{{base_path}}/guides/authentication/sso-integrations/add-salesforce-template" class="card square">
      <img src="{{base_path}}/assets/img/logo/salesforce.svg" alt="Salesforce" />
      <span>Salesforce</span>
    </a>
    <a href="{{base_path}}/guides/authentication/sso-integrations/add-microsoft-365-template" class="card square">
      <img src="{{base_path}}/assets/img/logo/microsoft-logo.svg" alt="Microsoft" />
      <span>Microsoft</span>
    </a>
    {% if product_name == "WSO2 Identity Server" or (product_name == "Asgardeo" and sso_integrations_zoom_slack) %}
    <a href="{{base_path}}/guides/authentication/sso-integrations/add-zoom-template" class="card square">
      <img src="{{base_path}}/assets/img/logo/zoom.svg" alt="Zoom" />
      <span>Zoom</span>
    </a>
    <a href="{{base_path}}/guides/authentication/sso-integrations/add-slack-template" class="card square">
      <img src="{{base_path}}/assets/img/logo/slack.png" alt="Slack" />
      <span>Slack</span>
    </a>
    {% endif %}
  </div>
</div>
