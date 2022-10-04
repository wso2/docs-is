# WSO2 Identity Server Documentation

This repository contains the documentation website code and Markdown source files for is.docs.wso2.com.

|  Branch | Build Status |
| :------------ |:-------------
| master      | [![Build Status](https://wso2.org/jenkins/view/Dashboard/job/docs/job/docs-is/badge/icon)](https://wso2.org/jenkins/view/Dashboard/job/docs/job/docs-is/) |

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

```bash
cd docs-is && pip3 install -r requirements.txt
```

**Run mkdocs**

Execute the following command from inside the `<Lang folder>`.

```bash
cd en && mkdocs serve
```

> Note:
If you are getting an error that says mkdocs command is not found, try the following command.

```bash
python3 -m mkdocs serve
```

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
