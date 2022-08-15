--- 
template: templates/single-column.html 
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<div>
    <header>
        <h1>Welcome to the WSO2 Identity Server Documentation!</h1>
    </header>
    <div class="md-main .md-content" style="float:left; width: 45%;  text-align:justify; max-height:100%; ">
        <p>WSO2 Identity Server is an API-driven open source identity and access management (IAM) product designed to help you build effective customer IAM (CIAM) solutions. It is based on open standards such as SAML, OAuth, and OIDC with on-premise, cloud, and hybrid deployment options. It supports complex IAM requirements given its high extensibility.</p>
        <p>Within these pages you will find instructions that will help you understand and try out capabilities such as SSO, identity federation, authentication - be it multi-factor authentication or adaptive authentication, and more. You can also browse through our vast API options available. </p>
    </div>
    <div class="md-main .md-content " style="float:right; width: 55%; align:right;  flex-shrink: 0;min-width: 40%; max-height: 100%; max-width:50%; margin-left:10px; margin-top:20px">
        <iframe width="800" height="250" src="https://www.youtube.com/embed/QUlcGOOdXU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div>
        <div class="content">
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/authentication-overview/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/authentication.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">Authentication</p>
                        <a href="http://www.google.com"></a>
                        <p class="hint">Try out login with SSO, MFA, identity federation, and self sign-up</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/identity-federation/identity-federation-overview/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/identity-federation.svg">
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
                        <img src="assets/img/home/access-delegation.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">Access Delegation</p>
                        <p class="hint">Enable secure access delegation to third-party clients using OAuth</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/consent-mgt/manage-user-consent/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/consent-management.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">Consent Management</p>
                        <p class="hint">Manage user consent when accessing a user’s resources</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
        </div>
        <div class="content flex-wrap">
            <!-- start card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/identity-lifecycles/user-management/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/user-management.svg">
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
                <div class="card" onclick="location.href='guides/my-account/my-account/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/user-self-service.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">User Self-Service</p>
                        <p class="hint">Allow users to manage their own user profiles and accounts</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/elk-analytics/elk-analytics/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/analytics.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">Analytics</p>
                        <p class="hint">Use ELK-based analytics to monitor authentication and user sessions</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/tenants/tenant-mgt/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/tenant-management.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">Tenant Management</p>
                        <p class="hint">Configure multi-tenancy to optimize resource sharing among users</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- card for connectors -->
            <!-- end card -->
        </div>
        <div class="content flex-wrap">
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/dialects/dialects-overview/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/claim-management.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">Claim Management</p>
                        <p class="hint">Manage claims and map them to user attributes</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- start card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='guides/authorization/overview/';">
                    <div class="line"></div>
                    <div class="icon">
                        <img src="assets/img/home/access-control.svg">
                    </div>
                    <div class="card-content">
                        <p class="title">Access Control</p>
                        <p class="hint">Use fine-grained access control when an app accesses user resources</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- card for connectors -->
            <!-- end card -->
        </div>
    </div>
</div>
