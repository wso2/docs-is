
Let’s walk through setting up a Next.js application. Next.js is a React framework that simplifies creating web applications with features like server-side rendering (SSR) and static site generation (SSG).

Open a terminal, navigate to the directory where you'd like to create your project, and run the following command to set up a Next.js project:

Running the below command will generate a new folder named Teamspace, containing a ready-to-use Next.js project set up with TypeScript. The project includes a development server that automatically reloads the app whenever changes are made.

=== "npm"

    ``` bash
    npm create next-app@latest teamspace -- --yes
    ```

=== "yarn"

    ``` bash
    yarn create next-app@latest teamspace -- --yes
    ```

=== "pnpm"

    ``` bash
    pnpm create next-app@latest teamspace -- --yes
    ```

Once the application is created, navigate to the app folder. Then run the sample in the development mode. This allows you to see real-time updates and debug the app as you make changes.

=== "npm"

    ``` bash
    cd teamspace
    npm run dev
    ```

=== "yarn"

    ``` bash
    cd Teamspace
    yarn dev
    ```

=== "pnpm"

    ``` bash
    cd Teamspace
    pnpm dev
    ```

This will start the Next.js development server, typically at [http://localhost:3000](http://localhost:3000){:target="_blank"}, and you should see the default Next.js starter page. Confirm that everything is set up correctly by checking for the terminal output indicating that the server is running.

![Navigate to localhost]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image10.png){: width="800" style="display: block; margin: 0;"}

At this point, you have a simple Next.js app. Now, it's time to integrate {{product_name}} within the application.
