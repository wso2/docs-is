--- 
template: templates/single-column.html 
---

<style>
    @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://wso2.cachefly.net/wso2/sites/all/fonts/docs/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
    }

    .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    }
</style>

<div>
    <header>
        <h1>Welcome to the WSO2 Identity Server Documentation!</h1>
    </header>
    <div class="md-main .md-content" style="float:left; width: 45%;  text-align:justify; max-height:100%; ">
        <p>WSO2 Identity Server is an API-driven open source IAM product designed to help you build effective CIAM solutions. It is based on open standards such as SAML, OAuth and OIDC with the deployment options of on-premise, cloud, and hybrid. It supports complex IAM requirements given its high extensibility.</p>
        <p>Within these pages you will find tutorials that help you understand and try out capabilities such as SSO, Identity Federation, Authentication - be it multi-factor authentication or adaptive authentication, and more. You can also browse through our vast API options available. </p>
    </div>
    <div class="md-main .md-content " style="float:right; width: 55%; align:right;  flex-shrink: 0;min-width: 40%; max-height: 100%; max-width:50%; margin-left:10px; margin-top:20px">
        <iframe width="800" height="250" src="https://www.youtube.com/embed/QUlcGOOdXU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div>
        <div class="content">
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='get-started/quick-start-guide';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">timer</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Quick Start</p>
                        <a href="http://www.google.com"></a>
                        <p class="hint">Try out SSO, MFA, Federation, Self Sign-Up, and Workflows in minutes</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='learn/logging-in-to-your-application-via-identity-server-using-facebook-credentials';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">how_to_reg</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Authentication</p>
                        <p class="hint">Configure Authentication with WSO2 Identity Server</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='learn/adaptive-authentication/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">call_split</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Adaptive Authentication</p>
                        <p class="hint">Configure Adaptive Authentication with WSO2 Identity Server</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- start card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='learn/single-sign-on/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">dynamic_feed</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Single Sign-On</p>
                        <p class="hint">Configure Single Sign-On (SSO) with WSO2 Identity Server</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
        </div>
        <div class="content flex-wrap">
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='learn/identity-federation/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">cloud_download</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Identity Federation</p>
                        <p class="hint">Configure Federated Authentication with WSO2 Identity Server</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='learn/access-control/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">security</i>
                    </div>
                    <div class="card-content">
                        <p class="title">Access Control</p>
                        <p class="hint">Configure Access Control with WSO2 Identity Server</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card-wrapper">
                <div class="card" onclick="location.href='develop/calling-admin-services/';">
                    <div class="line"></div>
                    <div class="icon">
                        <i class="material-icons md-36">settings_applications</i>
                    </div>
                    <div class="card-content">
                        <p class="title">APIs</p>
                        <p class="hint">Identity and Access Management with APIs</p>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- card for connectors -->
            <!-- end card -->
        </div>
    </div>
</div>
