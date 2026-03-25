Before you begin, confirm that the following are in place:

**Cluster**

- A running Kubernetes (1.20+) or OpenShift (4.x+) cluster
- Cluster administrator access (`kubectl` or `oc` configured)
- `helm` installed (for Helm-based deployment)

**Database and storage**

- An external RDBMS accessible from the cluster (PostgreSQL, MySQL, Oracle, MSSQL, or MariaDB)
- Database credentials and JDBC driver

**Network**

- An Ingress controller (NGINX Ingress, Istio, or equivalent) or OpenShift Route configured
- TLS certificates for the deployment hostname
- DNS records pointing the hostname to the cluster ingress

**Images**

- WSO2 Identity Server container image accessible from your container registry
- Pull secrets configured if using a private registry
