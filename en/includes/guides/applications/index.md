# Applications

Regardless of the application type or the development technology, you can connect your application with {{ product_name }} and control the way users log in to your app.

Currently, {{ product_name }} supports integrating {{ no_of_supported_app_types }} application types. When you select an application type, {{ product_name }} provides all the recommended configs in place by default which you can change as needed later.

## Single-page applications

Single-page applications(SPAs) are apps that run on the browser and do not require a page reload with a change
in content.

The main advantage of a single-page application is its speed. Since content is dynamically updated as the user interacts with it, the user does not need to wait for page reloads. Users can experience a seamless flow with high responsiveness from the application.

JavaScript frameworks and libraries, such as React, Angular, Vue.js, are some popular technologies adopted to build SPAs.

- [Register a single-page application]({{base_path}}/guides/applications/register-single-page-app/)

## Web applications

Web applications(web apps) are the most common type of applications in use. They are usually hosted on a web server
and accessed by the browser. Web applications need authentication as they offer functionality dependent on the logged-in user.

- [Register a web application with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/)
- [Register a web application  with SAML]({{base_path}}/guides/applications/register-saml-web-app/)

## Mobile applications

Mobile applications are apps that run on mobile devices. Android and iOS are some of the popular technologies adopted to build Mobile Applications.

- [Register a mobile application]({{base_path}}/guides/applications/register-mobile-app/)

## Standard-based applications

Standard-based applications allow users to configure the application protocol settings (OIDC or SAML) from scratch.

- [Register a standard-based application]({{base_path}}/guides/applications/register-standard-based-app)

{% if product_name == "WSO2 Identity Server" %}
## Machine-to-Machine (M2M) applications

Machine-to-Machine applications, often referred to as M2M applications, are a category of applications designed for automated communication and interaction between devices or services without direct human intervention.
Unlike user-centric applications, M2M applications cater to non-interactive scenarios, including command-line tools, daemons, IoT (Internet of Things) devices, or services running on the backend.

- [Register a machine-to-machine application]({{base_path}}/guides/applications/register-machine-to-machine-app/)
{% endif %}

## Self-Service (My Account) portal

Application users can access the My Account portal for self-service needs. Learn more about the [Self-Service portal]({{base_path}}/guides/user-self-service/).