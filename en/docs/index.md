--- 
template: templates/single-column.html 
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<div>
    <header>
        <h1>Welcome to the WSO2 Identity Server Documentation!!</h1>
    </header>
    <div class="md-main .md-content" style="float:left; width: 45%;  text-align:justify; max-height:100%; ">
        <p>Identity Server is all about simplifying the Identity and Access Management (IAM) needs of your organization. It is based on open standards and is fully open source.</p>
    </div>
    <div class="md-main .md-content " style="float:right; width: 55%; align:right;  flex-shrink: 0;min-width: 40%; max-height: 100%; max-width:50%; margin-left:10px; margin-top:20px">
        <iframe width="800" height="250" src="https://www.youtube.com/embed/QUlcGOOdXU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div>
        <div class="content">
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/login/webapp-oidc/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">how_to_reg</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Authentication</p>
                        <a href="http://www.google.com"></a>
                        <p class="hint">Try out SSO, MFA, Federation, Self Sign-Up, and Workflows</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/identity-federation/identity-federation-overview/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">how_to_reg</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Identity Federation</p>
                        <p class="hint">Enable login using federated identity providers</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/access-delegation/access-delegation/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">how_to_reg</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Access Delegation</p>
                        <p class="hint">Enable access delagation using OAuth2, UMA</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
        </div>
        <div class="content flex-wrap">
            <!-- start card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/identity-lifecycles/onboard-overview/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">how_to_reg</i>
                    </div>
                    <div class="card-content">
                        <p class="title">User Management</p>
                        <p class="hint">Manage users and groups in your tenant organization</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/tenants/configure-the-tenant-loading-policy/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">how_to_reg</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Tenant Management</p>
                        <p class="hint">Configure and management tenants in your organization</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/my-account/my-account/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">how_to_reg</i>
                    </div>
                    <div class="card-content">
                        <p class="title">User Self-Service</p>
                        <p class="hint">Manage self-service capabilities for your users</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- card for connectors -->
            <!-- end card -->
        </div>
    </div>
</div>