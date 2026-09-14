If the database becomes unresponsive, WSO2 Identity Server threads can get stuck waiting for a JDBC connection. This happens because the Tomcat JDBC Pool can't abort connection creation by itself ([source](https://github.com/apache/tomcat/blob/9.0.82/modules/jdbc-pool/src/main/java/org/apache/tomcat/jdbc/pool/ConnectionPool.java#L693-L702){: target="_blank"}).

To prevent this, configure **driver-level timeouts** in the JDBC URL:

- **`connectTimeout`** → Maximum time to wait while establishing a database connection.  
- **`socketTimeout`** (or driver-specific equivalent) → Maximum time to wait for responses on an active connection.  
- **`tcpKeepAlive=true`** (if supported) → Helps detect unresponsive database servers.

Also note the distinction:

- **`maxWait`** (Tomcat pool) controls how long to wait for a free connection from the pool.  
- **`connectTimeout` / `socketTimeout`** (driver) → how long to connect/read at the DB level.

> **Note:** The `PoolExhaustedException` warning log is logged only when `maxWait` expires ([source](https://github.com/apache/tomcat/blob/9.0.82/modules/jdbc-pool/src/main/java/org/apache/tomcat/jdbc/pool/ConnectionPool.java#L739-L741){: target="_blank"}). It does **not** cover delays inside the driver’s connection or read operations. Driver-level timeouts are required to handle those cases.

> **Note:** The config parser writes `deployment.toml` values into `<IS_HOME>/repository/conf/datasources/master-datasources.xml` verbatim, and a bare `&` starts an entity reference in XML. Write every `&` that separates JDBC URL parameters as `&amp;` in `deployment.toml`. A bare `&` leaves the generated XML malformed, and the server fails to initialize any datasource at startup. The escaped form is parsed back to a plain `&`, so the driver receives the parameters as intended.
