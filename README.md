# WSO2 Identity Server and Asgardeo documentation

Welcome to the WSO2 Identity Server and Asgardeo documentation repository. We welcome your contributions!

- WSO2 Identity Server Docs: [https://is.docs.wso2.com/](https://is.docs.wso2.com/)
- Asgardeo Docs: [https://wso2.com/asgardeo/docs/](https://wso2.com/asgardeo/docs/)

## Table of content

- [Run the project locally](#run-the-project-locally)
  - [With Python Virtual Environments](#with-python-virtual-environments)
  - [With Dev containers](#with-dev-containers)
- [Install linters](#install-linters)
- [Contribute to documentation](#contribute-to-documentation)
- [Survey On Open Source Community Communication](#survey-on-open-source-community-communication)
- [License](#license)

## Run the project locally

Clone the repository.

```bash
git clone https://github.com/wso2/docs-is.git
```

Choose one of the following methods depending on your preference.

### With Python virtual environments

You can run the Asgardeo docs and WSO2 Identity Server docs locally using Python virtual environments as well.

#### Prerequisites
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
> If you receive a response as shown above, `Python 3.8.0` is your default Python version.
> If you don't have `Python` installed, grab the latest release from the [official downloads page](https://www.python.org/downloads/).
>
> - Install pip
>
> `pip` is already installed if you use Python 3 (>=3.4) downloaded from [python.org][python-org] or if you are working in a [Virtual Environment][virtual-env-guide] created by
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

2. Initialize a Python virtual environment.

   ```bash
   python3 -m venv .venv
   ```

3. Activate the created virtual environment.

   ```bash
   source .venv/bin/activate
   ```

4. Install the dependencies.

   - WSO2 Identity Server

    ```bash
    cd en/identity-server/{version} && pip3 install -r requirements.txt
    ```

   - Asgardeo

    ```bash
    cd en/asgardeo && pip3 install -r requirements.txt
    ```

5. Run the project

```bash
mkdocs serve
```

> [!NOTE]
> If you get an error that says "`mkdocs` command is not found", try the following command.
>
> ```bash
> python3 -m mkdocs serve
> ```

### With dev containers

This repository supports the VS Code dev containers feature, which allows you to create a consistent and isolated development environment inside a Docker container. To use this feature, you need to have the following prerequisites:

- VS Code
- Docker installed on your system
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for VS Code

Once you have these installed, you can open the repository in VS Code and follow these steps:

- Press F1 and select the Remote-Containers: Open Folder in Container... command.
- Select the repository folder and wait for the container to build and start.
- You can now edit, run, debug, and test your code inside the container.

For more information on how to use VS Code dev containers, please refer to the official documentation: https://code.visualstudio.com/docs/remote/containers

## Install linters

To uphold documentation quality, the CI pipeline includes linters to check for writing quality and style. Before creating a pull request (PR), make sure to install the required IDE extensions and test your changes locally to pass these checks.

## Markdownlint

[markdownlint](https://github.com/DavidAnson/markdownlint) checks markdown files for style and syntax issues, helping maintain consistent, clean and readable documentation.

To install markdownlint on Visual Studio Code (VSCode),

1. Install the **markdownlint** extension.

2. In the extension's settings page, provide the absolute path of the `.markdownlint-cli2.jsonc` configuration file as the `Config File`.

   The configuration file and rule sets live in the following locations of the repository:

   ```text
   .
   ├── .markdownlint-cli2.jsonc     # Configuration file for markdownlint-cli2
   └── lint-config/                 # Custom lints
       └── custom lint `.js` files
   ```

3. Reload the extension to load the rules.
4. Fix all markdownlint errors underlined in yellow.

### Vale

[Vale](https://github.com/errata-ai/vale) offers a fast, open-source solution for linting prose, ensuring consistency, clarity, and quality in documentation.

The current setup uses well-established industry rule sets such as [Microsoft](https://github.com/errata-ai/Microsoft) and [write-good](https://github.com/errata-ai/write-good), which provide guidelines for grammar, tone, and readability. We're working on adding custom rules to align with evolving style and voice requirements.

To install Vale in Visual Studio Code (VSCode),

1. Install the **Vale VSCode** extension.

2. In the extension's settings page, provide the absolute path of the `vale.ini` configuration file as the `config`.

   The configuration file and rule sets live in the following locations of the repository:

   ```text
   .
   ├── vale.ini             #Main configuration file for Vale at the root
   └── .vale/
       └── styles/          #Contains style guides
           ├── Microsoft/
           └── write-good/

   ```
   <!-- vale off -->
3. On the same settings page, select the **Install Vale** checkbox. When you enable the extension, this option attempts to install Vale on your system. If the installation fails, manually install Vale by following the instructions in the [Vale documentation](https://vale.sh/docs/install) and ensure that Vale is added to your system's PATH.
   <!-- vale on -->

4. Enable the extension for syntax highlighting.

5. Vale provides three different highlights; `errors` (red), `warnings`(yellow) and `info` (blue). Remove errors and warnings. Optionally, improve info messages as needed.

## Contribute to documentation

Before you contribute, read the following guidelines to understand how you can start contributing:

1. Accept the Contributor License Agreement (CLA)

    You need to accept the contributor license agreement (CLA) sent via a GitHub email notification upon sending your first pull request (PR). Future PRs won't require CLA approval.

    If the CLA changes for some (unlikely) reason, you'll have to accept the new CLA text when you send your first PR after the change.

2. Fork this repository, make your changes, and send in a pull request.

We look forward to your contributions.

## Survey on open source community communication

WSO2 wants to learn more about our open source software (OSS) community and your communication preferences to serve you better.

Also, we may reach out to a small number of respondents to ask more questions in exchange for a small gift.

Link to survey: https://forms.gle/h5q4M3K7vyXba3bK6

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
