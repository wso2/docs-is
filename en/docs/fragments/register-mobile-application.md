1. Access WSO2 Identity Server Developer Portal .
 
 2. Go to **Applications** and click **New Application**.
  
 3. Click **Show More**
 
 4. Open the **Mobile Application** template.
  
 5. Enter a **Name** for the application 
    
    This indicates the name of your application.
    
    **Example**: sample-app
    

 6. Click **Next**.
 
 7. Enter **Callback URL**. 
 
    The **Callback URL** is the exact location in the service provider's application where authorization code 
    would be sent. This URL should be the redirect scheme of the application that the user is redirected to after successful authentication.
    
    **Example**: wso2sample://oauth2
        
    !!! Tip    
        This [deep-linking](https://developer.android.com/training/app-links#app-links-vs-deep-links) allows the developers to register an app for a URI scheme.
        
        
     
 8. Click **Next**
 
 9. View the application details and Click **Finish**
 
 10. Click on the **Access** tab and note the **Client ID** that appears. 