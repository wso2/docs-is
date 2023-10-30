# WSO2 Identity Server and Asgardeo Documentation

This is the WSO2 Identity Server and Asgardeo documentation repository. This repository is open and we welcome your contributions!

To see the documentation site, go to:
WSO2 Identity Server: [https://is.docs.wso2.com/](https://is.docs.wso2.com/)
Asgardeo: [https://wso2.com/asgardeo/docs/](https://wso2.com/asgardeo/docs/)

## Contribute to documentation

Before you contribute, read the following guidelines to understand how you can start contributing:

1. Accept the contributor license agreement (CLA)

    You need to accept the contributor license agreement (CLA) when you are prompted via a GitHub email notification on sending your first pull request (PR). Subsequent PRs will not require CLA acceptance.

    If the CLA changes for some (unlikely) reason, you'll have to accept the new CLA text when you send your first PR after the change.

2. Fork this repository, make your changes, and send in a pull request.

We look forward to your contributions.

## Run the project locally with Devcontainers

This repository supports the VS Code dev containers feature, which allows you to create a consistent and isolated development environment inside a Docker container. To use this feature, you need to have the following pre requisites:

- VS Code
- Docker installed on your system
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for VS Code

Once you have these installed, you can open the repository in VS Code and follow these steps:

- Press F1 and select the Remote-Containers: Open Folder in Container... command.
- Select the repository folder and wait for the container to build and start.
- You can now edit, run, debug, and test your code inside the container.

For more information on how to use VS Code dev containers, please refer to the official documentation: https://code.visualstudio.com/docs/remote/containers

## Prerequisites

To run the project locally, it requires [python](https://www.python.org/downloads/) & [pip](https://pypi.org/project/pip/).

### Install Python

Check if you already have Python installed by running the following command.

```bash
$ python3 --version
Python 3.8.0
```

If you receive a response similar to the one shown above, `Python 3.8.0` is your default Python version.

If you don't seem to have `Python` installed, grab the latest release from the [official downloads page](https://www.python.org/downloads/).

### Install pip

pip is already installed if you are using Python 3 >=3.4 downloaded from [python.org][python-org] or if you are working in a [Virtual Environment][virtual-env-guide] created by [virtualenv][virtualenv] or [pyvenv][pyenv]. Just make sure to [upgrade pip][pip-upgrade-guide].

[python-org]: https://www.python.org
[virtual-env-guide]: https://packaging.python.org/tutorials/installing-packages/#creating-and-using-virtual-environments
[virtualenv]: https://packaging.python.org/key_projects/#virtualenv
[pyenv]: https://packaging.python.org/key_projects/#venv
[pip-upgrade-guide]: https://pip.pypa.io/en/stable/installing/#upgrading-pip


#### Installing with get-pip.py

To install pip with `curl`, execute the following command. Alternatively you can download `get-pip.py` by clicking [here](https://bootstrap.pypa.io/get-pip.py).

```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```

Then run the following command in the folder where you have downloaded get-pip.py

```bash
python3 get-pip.py
```

## Run project locally (Dev Mode)

**Clone the repo**

```bash
git clone https://github.com/wso2/docs-is.git
```

**Install the dependencies**

- WSO2 Identity Server

    ```bash
    cd en/identity-server/{version} && pip3 install -r requirements.txt
    ```

- Asgardeo

    ```bash
    cd en/asgardeo && pip3 install -r requirements.txt
    ```

**Run mkdocs**

Execute the following command from inside the `<Lang folder>`.

```bash
mkdocs serve
```

> Note:
If you are getting an error that says mkdocs command is not found, try the following command.

```bash
python3 -m mkdocs serve
```

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
