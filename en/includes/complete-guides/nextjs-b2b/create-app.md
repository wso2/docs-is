
Let’s walk through setting up a Next.js application. Next.js is a React framework that simplifies creating web applications with features like server-side rendering (SSR) and static site generation (SSG). 

Open a terminal, navigate to the directory where you'd like to create your project, and run the following command to set up a Next.js project:

```bash

npx create-next-app@latest --typescript teamspace

```

!!! note

    In this guide, we'll be using TypeScript. However, you can still follow along even if you prefer to use JavaScript you can simply add `–javascript` flag instead of `–typescript`. Also, verify that you are using the `src` directory in options.

Once this command is executed, you will be prompted with various configuration options for your application. We will use the default options to keep the configurations as simple as possible.

!!! Note
    Since we are using the default options, we are working with the **App Router** instead of the Pages Router.
    For more information about API routes in Next.js App Router:
    - [Blog on App Router](https://nextjs.org/blog/next-13-4#nextjs-app-router){:target="_blank"}
    - [Route Handlers in App Router](https://nextjs.org/docs/app/building-your-application/routing/route-handlers){:target="_blank"}

Once the application is created, install the dependencies using the following command.

```bash

cd teamspace

npm install
```

Then run the sample in the development mode. This allows you to see real-time updates and debug the app as you make changes.

```bash

npm run dev

```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000){:target="_blank"}, and you should see the default Next.js starter page.

![Navigate to localhost]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image10.png){: width="800" style="display: block; margin: 0;"}

At this point, you have a simple Next.js app. Now, it's time to integrate user authentication within the application.
