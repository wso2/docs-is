---
template: templates/complete-guide.html
heading: Create a Next.js app
read_time: 2 min
---

For this guide, we will walk you through setting up a simple Next.js application.

Open a terminal, change directory to where you want to initialize the project, and run the following command to create your first Next.js sample app. 

Running the above command will generate a new folder named asgardeo-nextjs, containing a ready-to-use Next.js project set up with TypeScript. The project includes a development server that automatically reloads the app whenever changes are made.



```bash

npx create-next-app@latest --typescript asgardeo-nextjs

```

!!! note

    In this guide, we'll be using TypeScript. However, you can still follow along even if you prefer to use JavaScript you can simply add `–javascript` flag instead of `–typescript`. Also, verify that you are using the `src` directory in options.


Once this command is executed, you will be prompted with various configuration options for your application. We will use the default options to keep the configurations as simple as possible. If everything goes smoothly, your terminal output should resemble the following.


![Create Next.js app]({{base_path}}/complete-guides/nextjs/assets/img/image3.png){: width="800" style="display: block; margin: 0;"}




!!! note

    Since we are using the default options, we are working with the **app router** instead of the **pages router**.
    

Once the application is created, install the dependencies using the following command.

```bash

cd asgardeo-nextjs

npm install
```

Then run the sample in the development mode. This allows you to see real-time updates and debug the app as you make changes.

```bash

npm run dev

```

This will start the Next.js development server, typically at [http://localhost:3000](http://localhost:3000){:target="_blank"}, and you should see the default Next.js starter page. Confirm that everything is set up correctly by checking for the terminal output indicating that the server is running.

![Navigate to localhost]({{base_path}}/complete-guides/nextjs/assets/img/image4.png){: width="800" style="display: block; margin: 0;"}

At this point, you have a simple yet fully functional Next.js app. Now, it's time to integrate user authentication within the application. For this guide, we will be using the auth.js library, which provides a simple and secure way to handle authentication in Next.js apps.  
