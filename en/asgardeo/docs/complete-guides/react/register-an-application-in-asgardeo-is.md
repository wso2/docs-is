---
template: templates/complete-guide.html
heading: Register an application in Asgardeo/IS
read_time: 2 min
---

First unless you already have done that, you need to create an organization in Asgardeo and register your application as a single page application.

* Sign up for a free Asgardeo account at wso2.com/asgardeo 
* Sign into Asgardeo console and navigate to Applications > New Application.
* Select Single Page Application

![Select Single Page Application]({{base_path}}/complete-guides/react/assets/img/image5.png){: width="600" style="display: block; margin: 0;"}

Complete the wizard popup by providing a suitable name and an authorized redirect URL. 

![Register a new application]({{base_path}}/complete-guides/react/assets/img/image8.png){: width="600" style="display: block; margin: 0;"}

!!! note "Note"
    
    The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use http://localhost:5173, as the sample application will be accessible at this URL.

!!! tip "Hint"
    
    Use the information available in the Quick Start tab of your app or the Quickstart guide under the React SDK for the AuthProvider config.

![Quick start guide]({{base_path}}/complete-guides/react/assets/img/image9.png){: width="600" style="display: block; margin: 0;"}
