---
template: templates/complete-guide.html
heading: Create a Next.js app
read_time: 2 min
---

Let’s walk through setting up a Next.js application. Next.js is a flexible and powerful React framework that simplifies creating web applications with features like server-side rendering (SSR) and static site generation (SSG). 

Open a terminal, navigate to the directory where you'd like to create your project, and run the following command to set up a Next.js project:

```bash

npx create-next-app@latest --typescript asgardeo-nextjs-b2b-sample-app

```

!!! note

    In this guide, we'll be using TypeScript. However, you can still follow along even if you prefer to use JavaScript you can simply add `–javascript` flag instead of `–typescript`. Also, verify that you are using the `src` directory in options.

Once this command is executed, you will be prompted with various configuration options for your application. We will use the default options to keep the configurations as simple as possible.

!!! note

    Since we are using the default options, we are working with the **app router** instead of the **pages router**.
    

Once the application is created, install the dependencies using the following command.

```bash

cd asgardeo-nextjs-b2b-sample-app

npm install
```

Then run the sample in the development mode. This allows you to see real-time updates and debug the app as you make changes.

```bash

npm run dev

```

This will start the Next.js development server, typically at [http://localhost:3000](http://localhost:3000){:target="_blank"}, and you should see the default Next.js starter page. Confirm that everything is set up correctly by checking for the terminal output indicating that the server is running.

![Navigate to localhost]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image10.png){: width="800" style="display: block; margin: 0;"}

At this point, you have a simple yet fully functional Next.js app. Now, it's time to integrate user authentication within the application. For this guide, we will be using the auth.js library, which provides a simple and secure way to handle authentication in Next.js apps.  
