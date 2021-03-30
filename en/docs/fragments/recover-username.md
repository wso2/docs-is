Follow the steps below to configure WSO2 Identity Server to enable username recovery.

1.	Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

	1.	Check whether the following listener configs are in place.

		```
		[event.default_listener.identity_mgt]
		priority= "50"
		enable = false
		[event.default_listener.governance_identity_mgt]
		priority= "95"
		enable = true
		```

{! fragments/configure-email-sending.md !}

3.	On the **Main** > **Identity** menu of the Management Console, click **Identity Providers** > **Resident**.

	<img src="../../../assets/img/fragments/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

4.	Under the **Account Management** section, click **Account Recovery**.	

5.	Select the following check boxes:
	-	**Username Recovery**
	-	**Manage notifications sending internally**

	<img src="../../../assets/img/fragments/user-name-recovery-options.png" alt="User Name Recover options" width="600" style="border:1px solid grey">  	

6.	Click **Update**. 