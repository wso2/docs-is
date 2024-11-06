---
template: templates/complete-guide.html
heading: Create a React application
read_time: 2 min
---

If you want to try out with a sample application without going through this guide, you can use the sample React app [here](https://github.com/asgardeo/asgardeo-auth-react-sdk/tree/main/samples/asgardeo-react-app) with the necessary boilerplate. 

For this guide, you will be creating a simple React app using [Vite](https://vitejs.dev/), a modern, fast and lightweight tool that helps you quickly set up and develop modern JavaScript applications. Open a terminal, change directory to where you want to initialize the project, and run the following command to create your first React sample application.

!!! note "Note"

    You need to have installed [Node.js](https://nodejs.org/en/download/package-manager) v18+ and npm (which comes inbuilt with Node) to run this sample. Although Node.js is primarily a server-side language,it needs to have been installed to manage dependencies and run scripts for our project.

```bash
npm create vite@latest react-authentication-demo –- --template react
```

Running this command will create a folder with a ready-to-run boilerplate React project, with a development server to run the project and instantly reload changes to the project in your browser without manual refresh.

Once the application is created, install the dependencies using the following command.

```bash
cd react-authentication-demo
npm install
```

Then run the sample in the development mode. This allows you to see real-time updates and debug the application as you make changes.

```bash
npm run dev
```

Confirm that the dev server is up and running by verifying the following output in the terminal.

![Dev server is runnig]({{base_path}}/complete-guides/react/assets/img/image13.png){: width="600" style="display: block; margin: 0;"}

Navigate to http://localhost:5173 and you should see the sample application working in the browser.

![Navigate to localhost]({{base_path}}/complete-guides/react/assets/img/image6.png){: width="600" style="display: block; margin: 0;"}

At this point, you have a simple yet fully functional React app. In the next step, let’s try to integrate an OIDC SDK with the app. 
