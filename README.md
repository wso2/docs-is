# WSO2 Identity Server Documentation

End-user apps in WSO2 Identity Server

|  Branch | Build Status |
| :------------ |:------------- 
| master      | [![Build Status](https://wso2.org/jenkins/view/Dashboard/job/docs/job/docs-is/badge/icon)](https://wso2.org/jenkins/view/Dashboard/job/docs/job/docs-is/) |

## Prerequisite

To run the project on local, it requires [python](https://www.python.org/downloads/) & [mkdocs](https://www.mkdocs.org/)

## Run project locally (Dev Mode)

1. Clone the repo.
2. Install python and pip (If not already installed).
3. Install mkdocs through pip (`pip install mkdocs`).
4. Install the material theme for mkdocs (`pip install mkdocs-material`).
5. Run `mkdocs serve` command in `<Lang folder>`. E.g. `cd en && mkdocs serve`.

**NOTE:**

If you are doing changes and want to see them on the fly, running the server with `mkdocs serve --dirtyreload` option
 will make the server load only the changed items and display the changes faster. 

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
