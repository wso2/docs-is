SAML logout enables a user to log out of an application and simulatenously log out of other connected applications without having to explicity log out of them one by one. The [SAML 2.0](TODO:link-to-concept) protocol has two approaches for single logout. 

1. Synchronous binding (back-channel)
2. Asynchronous binding (front-channel)

The main difference between back-channel logout and front-channel logout is that the front-channel method uses web browser redirections and user sessions to handle the logout, but the back-channel method is handled via server-to-server communication and the need for browser redirections is eliminated. When using the back channel protocol, you can rely on mutually authenticated TLS (Transport Layer Security) for end-to-end security since the communication is point-to-point. 