# WSO2 Identity Server and Asgardeo Documentation

This is the WSO2 Identity Server and Asgardeo documentation repository. This repository is open source and we welcome your contributions!

- WSO2 Identity Server Docs: [https://is.docs.wso2.com/](https://is.docs.wso2.com/)
- Asgardeo Docs: [https://wso2.com/asgardeo/docs/](https://wso2.com/asgardeo/docs/)

## Table of Content

* [Run the project locally](#run-the-project-locally)
  + [With Python Virtual Environments](#with-python-virtual-environments)
  + [With Devcontainers](#with-devcontainers)
* [Contribute to documentation](#contribute-to-documentation)
* [Survey On Open Source Community Communication](#survey-on-open-source-community-communication)
* [License](#license)

## Run the project locally

Clone the repository.

```bash
git clone https://github.com/wso2/docs-is.git
```

Choose one of the following methods depending on your preference.

### With Python Virtual Environments

You can run the Asgardeo docs and WSO2 Identity Server docs locally using Python virtual environments as well.

> #### Prerequisites
> 
> To run the project locally, it requires [python](https://www.python.org/downloads/) & [pip](https://pypi.org/project/pip/).
> 
> - Install Python
> 
> Check if you already have Python installed by running the following command.
> 
> ```bash
> $ python3 --version
> Python 3.8.0
> ```
>     
> If you receive a response similar to the one shown above, `Python 3.8.0` is your default Python version.
> 
> If you don't seem to have `Python` installed, grab the latest release from the [official downloads page](https://www.python.org/downloads/).
> 
> - Install pip
> 
> `pip` is already installed if you are using Python 3 (>=3.4) downloaded from [python.org][python-org] or if you are working in a [Virtual Environment][virtual-env-guide] created by 
> [virtualenv][virtualenv] or [pyvenv][pyenv]. Just make sure to [upgrade pip][pip-upgrade-guide].
> 
> [python-org]: https://www.python.org
> [virtual-env-guide]: https://packaging.python.org/tutorials/installing-packages/#creating-and-using-virtual-environments
> [virtualenv]: https://packaging.python.org/key_projects/#virtualenv
> [pyenv]: https://packaging.python.org/key_projects/#venv
> [pip-upgrade-guide]: https://pip.pypa.io/en/stable/installation/#upgrading-pip

1. Switch to the documentation you want to run locally.

   For Asgardeo:

   ```bash
   cd en/asgardeo
   ```

   For Identity Server:

   ```bash
   cd en/identity-server/{version} 
   ```
   
3. Initialize a Python virtual environment.

   ```bash
   python3 -m venv .venv
   ```
   
4. Activate the created virtual environment.

   ```bash
   source .venv/bin/activate
   ```

5. Install the dependencies.

   - WSO2 Identity Server

    ```bash
    cd en/identity-server/{version} && pip3 install -r requirements.txt
    ```

   - Asgardeo

    ```bash
    cd en/asgardeo && pip3 install -r requirements.txt
    ```

6. Run the project

```bash
mkdocs serve
```

> [!NOTE]
> If you are getting an error that says "`mkdocs` command is not found", try the following command.
> 
> ```bash
> python3 -m mkdocs serve
> ```

### With Devcontainers

This repository supports the VS Code dev containers feature, which allows you to create a consistent and isolated development environment inside a Docker container. To use this feature, you need to have the following pre requisites:

- VS Code
- Docker installed on your system
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for VS Code

Once you have these installed, you can open the repository in VS Code and follow these steps:

- Press F1 and select the Remote-Containers: Open Folder in Container... command.
- Select the repository folder and wait for the container to build and start.
- You can now edit, run, debug, and test your code inside the container.

For more information on how to use VS Code dev containers, please refer to the official documentation: https://code.visualstudio.com/docs/remote/containers

## Contribute to documentation

Before you contribute, read the following guidelines to understand how you can start contributing:

1. Accept the contributor license agreement (CLA)

    You need to accept the contributor license agreement (CLA) when you are prompted via a GitHub email notification on sending your first pull request (PR). Subsequent PRs will not require CLA acceptance.

    If the CLA changes for some (unlikely) reason, you'll have to accept the new CLA text when you send your first PR after the change.

2. Fork this repository, make your changes, and send in a pull request.

We look forward to your contributions.

## Survey On Open Source Community Communication

WSO2 wants to learn more about our open source software (OSS) community and your communication preferences to serve you better.

In addition, we may reach out to a small number of respondents to ask additional questions and offer a small gift.

Link to survey: https://forms.gle/h5q4M3K7vyXba3bK6

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
