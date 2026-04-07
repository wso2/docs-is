---
template: templates/deployment-guide.html
read_time: 5 mins
---

Start WSO2 Identity Server for the first time. The initial startup initializes the embedded databases and deploys all web applications — this takes longer than later starts.

!!! note "Before this step"
    Installation is complete and your `IS_HOME` directory is accessible.

{% include "../../deploy/get-started/run-the-product.md" %}

!!! tip "Verify"
    Open `https://localhost:9443/console` in a browser and sign in with the default credentials (`admin` / `admin`). The WSO2 Identity Server Console should load successfully.
