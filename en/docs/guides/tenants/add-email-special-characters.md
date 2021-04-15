# Configure Emails with Special Characters

Follow the steps below to accommodate email addresses with special character in WSO2 Identity Server.  

1.	Sign in to WSO2 Identity Server Management Console at `https://<IS_HOST>:<PORT>/carbon` as an administrator. 

2.	On the **Main** menu of the Management Console, click **Identity > Claims > List**.

	<img src="../../../assets/img/guides/claims-list-menu-item.png" alt="Claims List menu-item" width="200" style="border:1px solid grey">   

3.	Click  **http://wso2.org/claims**.

	<img src="../../../assets/img/guides/claim-list-wso2.png" alt="WSO2 Claim" width="600" style="border:1px solid grey">   	

4.	Under **Email**, click **Edit**.

	<img src="../../../assets/img/guides/email-claim-edit.png" alt="Claim Edit option" width="600" style="border:1px solid grey"> 

5.	Enter the required special characters (`!#$%&'*+-=?^_`) in the **Regular Expression** text box.

	<img src="../../../assets/img/guides/wso2-claim-edit-screen.png" alt="WSO2 Claim Edit screen" width="700" style="border:1px solid grey"> 


	!!! example "Using # and $"

		-	To add **`#`** to the email regex pattern: 
			```
			^([a-zA-Z0-9_.-#])+\@(([a-zA-Z0-9#-])+.)+([a-zA-Z0-9#]{2,4})+$`
			```			

		-	To add **`$`** to the email regex pattern:
			```
			^([a-zA-Z0-9_.-\])+\@(([a-zA-Z0-9\\-])+.)+([a-zA-Z0-9\]{2,4})+
			```

	!!! warning "Escaping $"

		When using the `$` character, make sure to use the appropriate escape characters, such as `\`, e.g., `abc\$def@somemail.com`


