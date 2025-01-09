---
template: templates/complete-guide.html
heading: Create a .NET app
read_time: 2 min
---

Provided that you have already installed the .NET SDK, we will proceed with setting up the development environment. This guide will utilize **Visual Studio Code** as the text editor and the official **C# Dev Kit** extension from Microsoft to help streamline the creation of the .NET application, which is of the Blazor Web app type.

## Creating a New Project in Visual Studio Code

1. Open Visual Studio Code.
2. Bring up the command palette by pressing:
    - `Ctrl + Shift + P` (Windows/Linux)
    - `Cmd + Shift + P` (macOS)
3. In the command palette, type and select **`.NET: New Project…`**.
4. From the drop-down menu, select **Blazor Web App**.
5. Choose a suitable directory location for your project.
6. Enter a project name.
7. Click **Create Project** to create the project in the selected directory.

## Creating a New Project via the Command Line

Alternatively, if you prefer creating the application via the command line, you can use the following command:

```bash
dotnet new blazor -o asgardeo-dotnet
cd asgardeo-dotnet
```

# Running the Application

Once the application is created, you can compile and run it using Visual Studio Code or the terminal.

## Running from Visual Studio Code

1. Navigate to the **Run and Debug** tab in the Activity Bar on the left side of Visual Studio Code.
2. Click the **Run and Debug** button.
3. Once the launch configurations are loaded, select the default configuration, ensuring that the debugger is set to **C#**.
4. After completing the setup, the application will launch in your web browser.

## Running from the Terminal

If you prefer using the terminal, you can execute the following command in the project directory to run the application:

```bash
dotnet run
```

![Run .NET app]({{base_path}}/complete-guides/dotnet/assets/img/image5.png){: width="600" style="display: block; margin: 0;"}
