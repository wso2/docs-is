# Authenticate the CLI

Before running {{ product_name }} CLI commands, sign in to your organization. You can sign in as a user or as a machine-to-machine (M2M) application.

| Method | Use it for | Command |
|---|---|---|
| [User](#sign-in-as-a-user) | Day-to-day use from your own machine. | `asg login` |
| [M2M application](#sign-in-as-an-m2m-application) | Scripts, automation and CI/CD pipelines. | `asg login --m2m-application` |

## Sign in as a user

When you sign in as a user, the CLI uses the OAuth 2.0 device authorization flow. You sign in through your browser with your {{ product_name }} credentials, and the CLI acts with the access granted to you.

!!! note "Before you begin"
    An administrator must [enable CLI access]({{base_path}}/cli/#enable-cli-access) for your organization and assign you CLI access.

1. Run the login command with the name of your root organization.

    ```bash
    asg login --org-name <organization-name>
    ```

    If you leave out `--org-name`, the CLI prompts for it.

2. The CLI opens the sign-in page in your browser and shows a code in the terminal.

    !!! tip
        On a machine without a browser, such as a remote server, add `--no-browser`. The CLI prints the sign-in URL so that you can open it on another device.

3. Confirm that the code on the sign-in page matches the code in your terminal and click **Continue**.

4. Sign in with your {{ product_name }} credentials.

When the browser sign-in completes, the terminal shows that you are logged in.

## Sign in as an M2M application

Use an M2M application when no one is available to sign in through a browser, such as in a CI/CD pipeline. The CLI then acts with the API scopes authorized for that application.

1. [Register an M2M application]({{base_path}}/guides/applications/register-machine-to-machine-app/) and note down its **Client ID** and **Client Secret** from the **Protocol** tab.

2. On the **API Authorization** tab of the application, authorize the [management APIs]({{base_path}}/apis/) and scopes needed for the commands you plan to run. For example, `asg apps` commands need the **Application Management API**.

3. Sign in with the application's credentials.

    ```bash
    asg login --m2m-application --org-name <organization-name> --client-id <client-id> --client-secret <client-secret>
    ```

To sign in from a script, add `--no-interactive` so that the CLI does not prompt for input. In this mode, the CLI always signs in as an M2M application.

```bash
asg login --org-name <organization-name> --client-id <client-id> --client-secret <client-secret> --no-interactive
```

!!! warning
    Avoid typing the client secret directly in shared terminals. In CI/CD pipelines, read it from your pipeline's secret store, for example `--client-secret "$CLIENT_SECRET"`.

## Check your sign-in status

```bash
asg status
```

The output shows whether you are signed in, along with the server, base URL, token expiry and the time of your last sign-in.

## Sign out

```bash
asg logout
```

This ends your CLI session and removes the stored tokens and client secret from your machine.

## How the CLI stores credentials

| Data | Where it is stored |
|---|---|
| Organization name, server and client ID | A configuration file in the `asgardeo-cli` folder of your user configuration directory. |
| Access tokens, refresh tokens and client secret | Your operating system's credential store: macOS Keychain, Windows Credential Manager or the Secret Service on Linux. |
