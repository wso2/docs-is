1.	Navigate to the `<IS_HOME>/repository/conf/deployment.toml` file.

2.	Disable the `                defaultAutoCommit               ` property by defining it as `false`.

3.	Set the `                rollbackOnReturn               ` property to the datasources as `true`.

	- `WSO2_IDENTITY_DB` related configurations that should be added to the `<IS_HOME>/repository/conf/deployment.toml` file.
			
		``` toml
		[database.identity_db.pool_options]
		defaultAutoCommit="false"
		rollbackOnReturn="true"
		```
		
	- `WSO2_SHARED_DB` related configurations that should be added to the `<IS_HOME>/repository/conf/deployment.toml` file.
				
		``` toml
		[database.shared_db.pool_options]
		defaultAutoCommit="false"
		rollbackOnReturn="true"
		```

The elements in the above configuration are described below.

<table>
<tr>
<td><strong>Element</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr class="even">
<td><strong>commitOnReturn</strong></td>
<td>If <code>defaultAutoCommit=false</code>, then you can set <code>commitOnReturn=true</code>, so that the pool can complete the transaction by calling the commit on the connection as it is returned to the pool. However, if the <code>rollbackOnReturn=true</code> then this attribute is ignored. The default value is false.</td>
</tr>
<tr class="odd">
<td><strong>rollbackOnReturn</strong></td>
<td>If <code>defaultAutoCommit=false</code>, then you can set <code>rollbackOnReturn=true</code> so that the pool can terminate the transaction by calling rollback on the connection as it is returned to the pool. The default value is false.</td>
</tr>
</table>