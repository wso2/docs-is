6. You are directed to the landing page of the sample application. Click on **Import Photos** and the following
page appears.  

	<img name='playground-app' src='../../assets/img/samples/play-ground-with-check-session.png' class='img-zoomable'/>

	!!! tip "Troubleshooting tip"

		If you are getting the following error, the sample applications do not have a keystore in them.
		Therefore, you may get this error after changing the tomcat hostname because the public key of the WSO2 Identity Server does
		not exist in the Java certificate store.

		``` java
		javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: 			sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
		```