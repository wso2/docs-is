All the basic information of a user/application is stored in the form of
claims. However, for the same information, different Identity Providers(IDP)
have different claims. Therefore, there should be a proper mechanism to
map those claims within Identity Providers.

Here, we are authenticating the service provider application using
facebook IDP. Therefore we need to map FaceBook claims with our WSO2 IDP
claims.

So our next step is to configure claims in the Identity Server and map
them with Facebook.

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Identity Providers**.
    
2.  Click **Edit** to edit the facebook identity provider you created.

3.  Under **Claim Configuration**, go to **Basic Claim Configuration**.
    
4.  Select the **Define Custom Claim Dialect** option under **Select
    Claim mapping Dialect**.
    
5.  Click **Add Claim Mapping.** The following screen will be
    displayed.  
    ![add-claim-mapping-for-facebook](/assets/img/fragments/add-claim-mapping-for-facebook.png)
    
6.  Now add custom claim mappings as follows.  
    ![custom-claim-mapping](/assets/img/fragments/custom-claim-mapping.png)

    !!! note 
    
		You can retrieve all the public information of the user and the
		email address. The following are some common attribute names.

		-	id  
		-	email  
		-	name  
		-	first\_name  
		-	last\_name  
		-	link  
		-	gender  
		-	locale  
		-	age\_range

		More information is available from the following link:
		<https://developers.facebook.com/docs/facebook-login/permissions/v2.0>

		You can map these attributes to any **Local Claim URI** that is
		suitable.

7.  From the receiving claims, you can select one claim as the user
    identifier for that particular identity provider. You can configure
    this through **User ID Claim URI** (e.g., email).
8.  Click **Update** to save changes.

## Configure requested claims for travelocity.com (optional)

Generally, the service providers need some information from the Identity
Provider side after the authentication process in order to provide their
service. To help this process we need to configure the necessary claims
on the service provider side.

For that follow the below steps:

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the travelocity.com service provider.
3.  Go to **Claim Configuration**.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as follows. Here you should add the claims you
    mapped in the Identity Provider claim configuration. Select the
    **Mandatory Claim** checkbox for any claims that are mandatory.

    !!! info "Do only,"

		If the service provider needs any claims to be used after
		authentication process, the SP can request those claims from IDP as
		" **Requested Claims**".

    ![add-requested-claims](/assets/img/fragments/add-requested-claims.png)

	!!! info 
		Here, the claims which are marked as **mandatory** are requested by
		the service provider from the identity provider. If they are not
		available, the user will be redirected to a different page to
		request those mandatory claim values from the user as they are
		mandatory.

5.  **Subject Claim URI** is the unique claim which we can use to
    identify a service provider. Therefore, select a suitable claim for
    the **Subject Claim URI** such that it will become a unique
    identifier for the service provider.

6.  Click **Update** to save changes.

Now you have configured the Identity Server.