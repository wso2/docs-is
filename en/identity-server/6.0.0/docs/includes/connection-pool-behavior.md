By default, when a database connection is returned to the pool, the product rolls back the pending transactions if `defaultAutoCommit=true`. 

However, if required, you can disable the latter mentioned default behavior by disabling the JDBC-Pool JDBC interceptor, `ConnectionRollbackOnReturnInterceptor`, and setting the connection pool behavior on return via the datasource configurations.