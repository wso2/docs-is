### Customization of User Interfaces of WSO2 Identity Server

With the latest release of [IS
5.9.0](https://wso2.com/identity-and-access-management/), a new UI extension has introduced to 
easily customize the basic user interfaces like login page, username and password recovery pages, 
single sign-on pages etc.

In [WSO2 Identity Server
5.9.0](https://wso2.com/identity-and-access-management/), all the UIs are
present in **authenticationendpoint **and **accountrecoveryendpoint **web apps
in <IS-Home>/repository/deployment/server/webapps folder. Please follow the
below steps to customize these pages easily.

*****

#### **Step 1: Create a new extension folder inside these two web apps.**

Create a new folder called **extensions** inside these two web apps
(authenticationendpoint and recoveryendpoint). This folder will contain the
customized JSP files with your custom CSS.

#### **Step 2: Copy the existing header.jsp and footer.jsp files from “includes” folder inside the web app to the “extensions” folder.**

Each web app(authenticationendpoint and recoveryendpoint), contains a folder called "includes" which contains
header.jsp and footer.jsp file. Copy the header.jsp and footer.jsp files in includes to extensions folder created in Step 1.
 The header.jsp file and footer.jsp file has the capability to override the files in "includes" folder.

#### Step 3: Create basic CSS styles need for UI

Create the styles that need to be override.

    <style type="text/css">

    body {
      background: #1e1e2f;
      color: #ffffff;
    }

    .logo-container {
      padding: 15px 30px;
    }

    header .brand img.logo {
      height: 40px;
    }

    .wr-title {
       background: #32344e !important;
       border-top-left-radius: 10px;
       border-top-right-radius: 10px;
    }

    .header {
       border-top: 3px solid #1e8cf8;
       background: #1e1e2f;
       min-height: 70px;
       border-bottom: 1px solid #31314b;
    }
    .....

    a:hover,
    a:active {
    color: #3a9dff;
    }
    </style>

#### Step 4: Edit the footer.jsp and header.jsp in extensions folder as follows,

* Add includes to the header.jsp

**authenticationendpoint** — add to top of the header.jsp file.

    <%@include file=”../localize.jsp” %>
    <%@include file=”../init-url.jsp” %>

**accountrecoveryendpoint** — add to top of the header.jsp file.

    <%@include file=”../localize.jsp” %>

* Add styles created in step 3 to the header.jsp in both web apps inside the
header tag as shown in the
[sample file](https://github.com/wso2/samples-is/blob/master/sample-ui-extensions/accountrecoveryendpoint/extensions/header.jsp)
.
* Add the company name to the footer.jsp in both web apps as shown in the [sample
file](https://github.com/wso2/samples-is/blob/master/sample-ui-extensions/accountrecoveryendpoint/extensions/footer.jsp).

*****

Once all these steps complete, server restart is not needed. Browser refresh will display the changes.

*****


Once adding a [sample ui-extension](https://github.com/wso2/samples-is/blob/master/sample-ui-extensions) to the endpoints, 
UI interfaces will change as follows:

![image](https://user-images.githubusercontent.com/9637873/69425601-420ece00-0d51-11ea-9ce6-b38b3382ae86.png)
<span class="figcaption_hack">Customized Login Page</span>


![image](https://user-images.githubusercontent.com/9637873/69425723-7d110180-0d51-11ea-9467-0297f3933823.png)
<span class="figcaption_hack">Customized Recover Username page</span>

![image](https://user-images.githubusercontent.com/9637873/69425759-8b5f1d80-0d51-11ea-8dd0-947b06a93a5e.png)
<span class="figcaption_hack">Customized Recover Password page</span>


![image](https://user-images.githubusercontent.com/9637873/69425805-a6319200-0d51-11ea-860b-9cab9245c3d7.png)
<span class="figcaption_hack">Customized Self signup page</span>

*****

*One advantage of following this approach is WUM update will not affect your UI
changes and you need not worry about manually adding your custom changes.*

