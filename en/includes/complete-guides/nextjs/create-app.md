
For this guide, we will walk you through setting up a simple Next.js application.

Open a terminal, change directory to where you want to initialize the project, and run the following command to create your first Next.js sample app.

Running the above command will generate a new folder named {{ product }}-nextjs, containing a ready-to-use Next.js project set up with TypeScript. The project includes a development server that automatically reloads the app whenever changes are made.

=== "npm"

    ``` bash
    npm create next-app@latest {{ product }}-nextjs -- --yes
    ```

=== "yarn"

    ``` bash
    yarn create next-app@latest {{ product }}-nextjs -- --yes
    ```

=== "pnpm"

    ``` bash
    pnpm create next-app@latest {{ product }}-nextjs -- --yes
    ```

Once this command is executed, if everything goes smoothly, your terminal output should resemble the following.

![Create Next.js app]({{base_path}}/assets/img/complete-guides/nextjs/image3.png){: width="800" style="display: block; margin: 0;"}

Once the application is created, navigate to the app folder. Then run the sample in the development mode. This allows you to see real-time updates and debug the app as you make changes.

=== "npm"

    ``` bash
    cd {{ product }}-nextjs
    npm run dev
    ```

=== "yarn"

    ``` bash
    cd {{ product }}-nextjs
    yarn dev
    ```

=== "pnpm"

    ``` bash
    cd {{ product }}-nextjs
    pnpm dev
    ```

This will start the Next.js development server, typically at [http://localhost:3000](http://localhost:3000){:target="_blank"}, and you should see the default Next.js starter page. Confirm that everything is set up correctly by checking for the terminal output indicating that the server is running.

![Navigate to localhost]({{base_path}}/assets/img/complete-guides/nextjs/image4.png){: width="800" style="display: block; margin: 0;"}

At this point, you have a simple yet fully functional Next.js app. Now, it's time to integrate user authentication within the application. For this guide, we will be using the auth.js library, which provides a simple and secure way to handle authentication in Next.js apps.  
