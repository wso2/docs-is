Apart from the basic configurations specified above, WSO2 Identity Server supports some advanced database configurations as well.

-	`WSO2_IDENTITY_DB` related configurations that should be added to the `deployment.toml` file.
    
	``` toml
	[database.identity_db.pool_options]
	maxActive = "80"
	maxWait = "360000"
	minIdle ="5"
	testOnBorrow = true
	validationQuery="SELECT 1"
	validationInterval="30000"
	defaultAutoCommit=false
	commitOnReturn=true
	```
   
-	`WSO2_SHARED_DB` `deployment.toml` related configurations that should be added to the `deployment.toml` file.
	
	```toml
	[database.shared_db.pool_options]
	maxActive = "80"
	maxWait = "360000"
	minIdle ="5"
	testOnBorrow = true
	validationQuery="SELECT 1"
	validationInterval="30000"
	defaultAutoCommit=false
	commitOnReturn=true
	```
	
