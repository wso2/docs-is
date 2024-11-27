---
template: templates/complete-guide.html
heading: Next Steps
read_time: 1 min
---
This guide you just have completed, covered the adding user login for Node.js apps by integrating with an Identity Provider (IdP) and additional use cases such making calls to an OAuth2-protected API. 

!!! tip "Tip"
    
    As you are now familiar with the concepts discussed in the guide, you can use the {{product_name}} Node.js template to bootstrap your application by running the following command.  

    ```bash

    npx tmplr --dir my-vite-Node.js-app asgardeo/asgardeo-vite-Node.js-template

    ```
    The {{product_name}} Node.js template generates a ready-made Node.js sample app with pre-configured login and logout capabilities, helping you kick-start your project in just 2 minutes. 

    All you need is a `client_id`, which you can obtain by registering a **Single Page Application** in {{product_name}}.




<!-- Now that you are familiar with the basics of adding user logins to your Node.js app, you can use the [Asgardeo Vite Node.js Template](https://github.com/asgardeo/asgardeo-vite-Node.js-template){:target="_blank"} to generate a working sample without needing to write code from scratch. After creating an application in the {{product_name}} console and copying the necessary parameters, run the following command to create your working sample. 

```bash

npx tmplr --dir my-vite-Node.js-app asgardeo/asgardeo-vite-Node.js-template

```

The above command generates a working Node.js app with pre-configured Asgardeo Node.js SDK and login/logout features that you can use to build your app further. 

![Asgardeo Vite Node.js Template]({{base_path}}/complete-guides/nodejs/assets/img/image20.png){: width="800" style="display: block; margin: 0;"}


You can quickly test the integration of your newly created Node.js app with {{product_name}} by running the following commands. 


```bash

cd my-vite-Node.js-app 

npm install

npm run dev

``` -->

Now that your Node.js application is secured with authentication features integrated, It is time to explore the additional features {{product_name}} offers to make the login flow more diverse and secure.

- [Multi factor authentication](https://wso2.com/asgardeo/docs/guides/authentication/mfa/){:target="_blank"} 
- [Passwordless authentication](https://wso2.com/asgardeo/docs/guides/authentication/passwordless-login/){:target="_blank"} 
- [Self registration](https://wso2.com/asgardeo/docs/guides/user-accounts/configure-self-registration/){:target="_blank"} 
- [Login UI customization](https://wso2.com/asgardeo/docs/guides/branding/){:target="_blank"} 
