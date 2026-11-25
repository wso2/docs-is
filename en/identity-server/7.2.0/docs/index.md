---
template: templates/guided-home-page.html

# Home page content, rendered top to bottom by templates/guided-home-page.html.
# Each `path` is a docs source file relative to docs/. The build warns if a
# path no longer exists (see en/home_page_links.py).
home:
  sections:
    - layout: steps
      featured: true
      eyebrow: Start here
      title: Get up and running in three steps
      description: "New to WSO2 Identity Server? Learn the basics, run the server on your machine, and add login to your first app."
      items:
        - title: Learn the basics
          text: "See what WSO2 Identity Server does and the concepts you will use as you build."
          cta: Read the introduction
          path: get-started/quick-start-guide.md
        - title: Set up the server
          text: "Download the server, start it, and sign in to the Console in a few minutes."
          cta: Follow the quick setup
          path: get-started/quick-set-up.md
        - title: Integrate your app
          text: "Pick your framework for a step-by-step quickstart, or start from a sample app."
          cta: See all integration options
          path: get-started/start-integrating-apps/index.md
          frameworks:
            - title: "React"
              logo: react
              path: quick-starts/react.md
            - title: "Next.js"
              logo: nextjs
              path: quick-starts/nextjs.md
            - title: "Angular"
              logo: angular
              path: quick-starts/angular.md
            - title: "JavaScript"
              logo: javascript
              path: quick-starts/javascript.md
            - title: "Express.js"
              logo: expressjs
              path: quick-starts/expressjs.md
            - title: "Spring Boot"
              logo: spring-boot
              path: quick-starts/springboot.md
    - layout: tiles
      eyebrow: Guides
      title: Explore by capability
      description: "Go straight to the guides for the identity feature you are working on."
      items:
        - title: "Applications"
          text: "Register web, mobile, and machine-to-machine apps."
          icon: octicons/browser-24
          path: guides/applications/index.md
        - title: "Authentication"
          text: "Passwordless login, MFA, social login, and adaptive flows."
          icon: octicons/key-24
          path: guides/authentication/index.md
        - title: "Authorization"
          text: "Role-based access control and API authorization."
          icon: octicons/shield-check-24
          path: guides/authorization/index.md
        - title: "User management"
          text: "Users, groups, roles, and user stores."
          icon: octicons/people-24
          path: guides/users/index.md
        - title: "User self-service"
          text: "Self sign-up, account recovery, and My Account."
          icon: octicons/person-24
          path: guides/user-self-service/index.md
        - title: "Organizations"
          text: "Build B2B apps with organizations and delegated administration."
          icon: octicons/organization-24
          path: guides/organization-management/index.md
        - title: "Branding"
          text: "Customize login pages, emails, and text to match your brand."
          icon: octicons/paintbrush-16
          path: guides/branding/index.md
        - title: "Agentic AI"
          text: "Give AI agents an identity and secure MCP servers."
          icon: octicons/dependabot-24
          path: guides/agentic-ai/ai-agents/index.md
    - layout: stages
      eyebrow: Setup
      title: Take it to production
      description: "Follow the server lifecycle, from the first install to keeping it up to date."
      items:
        - title: "Install"
          text: "Check the requirements and install the server."
          icon: octicons/download-24
          path: deploy/get-started/install.md
        - title: "Configure"
          text: "Connect user stores and databases."
          icon: octicons/gear-24
          path: deploy/configure/user-stores/index.md
        - title: "Secure"
          text: "Harden the server with the security guidelines."
          icon: octicons/shield-lock-24
          path: deploy/security/security-guidelines/index.md
        - title: "Deploy"
          text: "Choose a deployment pattern and roll it out."
          icon: octicons/container-24
          path: deploy/deployment-guide.md
        - title: "Monitor"
          text: "Track logs, metrics, and server health."
          icon: octicons/pulse-24
          path: deploy/monitor/index.md
        - title: "Upgrade"
          text: "Move to the latest version with confidence."
          icon: octicons/sync-24
          path: deploy/upgrade/upgrade-wso2-is.md
    - layout: tiles
      eyebrow: Developer resources
      title: Build on WSO2 Identity Server
      description: "APIs, SDKs, and working samples to extend and integrate the server."
      items:
        - title: "APIs"
          text: "REST APIs to manage and extend the server."
          icon: octicons/code-24
          path: apis/index.md
        - title: "SDKs and integrations"
          text: "Libraries for web, mobile, and backend apps."
          icon: octicons/package-24
          path: integrations/index.md
        - title: "Sample apps"
          text: "Run working apps against your server."
          icon: octicons/beaker-24
          path: get-started/try-samples/index.md
        - title: "Tutorials"
          text: "End-to-end scenarios to learn by doing."
          icon: octicons/mortar-board-24
          path: tutorials/index.md
    - layout: links
      eyebrow: Community and support
      title: Get help and contribute
      items:
        - title: "Join the community"
          text: "Ask questions and learn from other developers on Discord."
          icon: octicons/comment-discussion-24
          url: https://discord.com/invite/wso2
        - title: "Contribute on GitHub"
          text: "Report issues and contribute to WSO2 Identity Server."
          icon: octicons/mark-github-16
          url: https://github.com/wso2/product-is/wiki/Contributing-to-Identity-Server
        - title: "Get enterprise support"
          text: "Work with WSO2 experts through a support subscription."
          icon: octicons/briefcase-24
          url: https://wso2.com/subscription/
---

<!-- The home page is rendered from templates/guided-home-page.html using the front matter above. -->
