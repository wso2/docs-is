
For this guide, you will be creating a simple React app using [Vite](https://vitejs.dev/){:target="_blank"}, a modern, fast and lightweight tool that helps you quickly set up and develop modern JavaScript apps.

Open a terminal, change directory to where you want to initialize the project, and run the following command to create your first React sample app.

=== "npm"

    ```bash
    npm create vite@latest {{ product }}-react -- --template react
    ```

=== "yarn"

    ```bash
    yarn create vite@latest {{ product }}-react -- --template react
    ```

=== "pnpm"

    ```bash
    pnpm create vite@latest {{ product }}-react -- --template react
    ```

Running this command will create a folder with a ready-to-run boilerplate React project, with a development server to run the project and instantly reload changes to the project in your browser without manual refresh.

Once the application is created, install the dependencies using the following command.

=== "npm"

    ```bash
    cd {{ product }}-react
    npm install
    ```

=== "yarn"

    ```bash
    cd {{ product }}-react
    yarn install
    ```

=== "pnpm"

    ```bash
    cd {{ product }}-react
    pnpm install
    ```

Then run the sample in the development mode. This allows you to see real-time updates and debug the app as you make changes.

=== "npm"

    ```bash
    npm run dev
    ```

=== "yarn"

    ```bash
    yarn dev
    ```

=== "pnpm"

    ```bash
    pnpm dev
    ```

Confirm that the dev server is up and running by verifying the output in the terminal. Then, navigate to [http://localhost:5173](http://localhost:5173){:target="_blank"}  and you should see the sample app working in the browser.

![Navigate to localhost]({{base_path}}/assets/img/complete-guides/react/image6.png){: width="600" style="display: block; margin: 0;"}

At this point, you have a simple yet fully functional React app. In the next step, let’s try to integrate an OIDC SDK with the app.
