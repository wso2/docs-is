<div class="center-all">
  <h1>Add social login</h1>
  <h3>Add social login to your applications with {{ product_name }}</h3>

  <div class="cards-container">
    <a href="{{base_path}}/guides/authentication/social-login/add-facebook-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/facebook-logo.svg" alt="Facebook" />
      <span>Facebook</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-github-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/github-logo.svg#only-light" alt="Github" />
      <img src="{{base_path}}/assets/img/logo/github-logo-dark.svg#only-dark" alt="Github" />
      <span>Github</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-google-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/google-logo.svg" alt="Google" />
      <span>Google</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-microsoft-login" class="card square">
      <img src="{{base_path}}/assets/img/logo/microsoft-logo.svg" alt="Microsoft" />
      <span>Microsoft</span>
    </a>
    <a href="{{base_path}}/guides/authentication/social-login/add-apple-login/" class="card square">
      <img src="{{base_path}}/assets/img/logo/apple-logo.svg#only-light" alt="Apple" />
      <img src="{{base_path}}/assets/img/logo/apple-logo-dark.svg#only-dark" alt="Apple" />
      <span>Apple</span>
    </a>
    {% if product_name == "WSO2 Identity Server" %}
    <a href="{{base_path}}/guides/authentication/social-login/add-x-login/" class="card square">
      <img src="{{base_path}}/assets/img/logo/x-logo.svg#only-light" alt="X" />
      <img src="{{base_path}}/assets/img/logo/x-logo-dark.svg#only-dark" alt="X" /></br>
      <span>X</span>
    </a>
    {% endif %}
    {% if product_name == "Asgardeo" %}
    <a href="{{base_path}}/guides/authentication/social-login/add-linkedin-login/" class="card square">
      <img src="{{base_path}}/assets/img/logo/linkedin-logo.svg" alt="LinkedIn" />
      <span>LinkedIn</span>
    </a>
    {% endif %}
  </div>
</div>
