# Re-brand the SSO Redirection Page

The redirection page for Single Sign-On is available at `<IS-HOME>/repository/resources/identity/pages/samlsso_response.html`. Edit this HTML file to re-brand the SSO redirection page.

Additionally, you can use some variable placeholders inside this HTML
file to enhance your customization. These placeholders are replaced with
actual values when this page is rendered. For example, you can use the
`         $acUrl        ` variable to get the redirecting URL (in case
you want to display it, etc.). There are other variables such as
`         $response        ` and `         $relayState        ` that
contain the SAML response and the relay state is passed along with the
SAML request. You can use these two variables along with
`         $acUrl        ` to implement redirection logic in case of a
failure.

!!! info "About having a different page for different tenants" 

    Currently, WSO2 Identity Server does not contain a mechanism to have a
    separate redirection page template for each service provider. However, a
    simple workaround is possible when you have a small number of service
    providers. The variable `          $acUrl         ` contains the
    assertion consumer URL (redirecting URL). Depending on the value of
    this, you can customize this **samlsso\_response.html** page to display
    different content, with the help of some JavaScript if/else logic. 
    
    See below for a sample sso\_redirect
    page template that can display different content for two different
    $acUrls. However, this may become complex when you have a large number
    of service providers.
    
    ```
    <!-- 
      Variables $acUrl, $response, $relayState and $additionalParams will be replaced by the corrosponding values  
    -->
    
    <html>
    <body>
        <div id="content1" style="visibility: hidden;">
            <p>Content Area for Service Provider One</p>
        </div>
        <div id="content2" style="visibility: hidden;">
            <p>Content Area for Service Provider Two</p>
        </div>
    
        <form method="post" action="$acUrl">
            <p>
            <input type="hidden" name="SAMLResponse" value="$response">
            <input type="hidden" name="RelayState" value="$relayState">
            <!-- $additionalParams -->
            <button type="submit">POST</button>
            </p>
        </form>
    
        <script type="text/javascript">
            var url = "$acUrl";
    
            if (url === "https://localhost:9453/acs") {
            document.getElementById("content1").style.visibility = "visible";
            }
            else if (url === "https://localhost:9463/acs") {
            document.getElementById("content2").style.visibility = "visible";
            }
    
            document.forms[0].submit();           
        </script>
    </body>
    </html>
    ```
