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
      description: "New to WSO2 Identity Platform? Create your account, explore the Console, and add login to your first app."
      items:
        - title: Create your account
          text: "Sign up for WSO2 Identity Platform and set up your first organization in minutes."
          cta: Create an account
          path: get-started/create-identity-platform-account.md
        - title: Explore the platform
          text: "Take a tour of the Console and try login with a sample application."
          cta: Explore the Console
          path: get-started/explore-identity-platform.md
        - title: Integrate your app
          text: "Pick your framework for a step-by-step guide, or start from a sample app."
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
            - title: "Vue"
              logo: vue
              path: quick-starts/vue.md
            - title: "Nuxt"
              logo: nuxt
              path: quick-starts/nuxt.md
            - title: "JavaScript"
              logo: javascript
              path: quick-starts/javascript.md
            - title: "Node.js"
              logo: node
              path: quick-starts/nodejs.md
            - title: "Express.js"
              logo: expressjs
              path: complete-guides/expressjs/introduction.md
            - title: ".NET"
              logo: dotnet
              path: complete-guides/dotnet/introduction.md
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
          text: "Users, groups, roles, and connected user stores."
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
      eyebrow: Go live
      title: Get ready for production
      description: "Prepare your organization for real users, then monitor and improve it."
      items:
        - title: "Custom domain"
          text: "Serve login pages from your own domain."
          icon: octicons/globe-24
          path: guides/branding/configure-custom-domains.md
        - title: "Notifications"
          text: "Send emails and SMS through your own providers."
          icon: octicons/mail-24
          path: guides/notification-channels/configure-email-provider.md
        - title: "Account security"
          text: "Set login security, account recovery, and onboarding policies."
          icon: octicons/shield-lock-24
          path: guides/account-configurations/index.md
        - title: "Extend"
          text: "Add your own logic to flows with service extensions."
          icon: octicons/plug-24
          path: guides/service-extensions/understanding-service-extensions.md
        - title: "Monitor"
          text: "Review audit and diagnostic logs."
          icon: octicons/pulse-24
          path: guides/identity-platform-logs/index.md
        - title: "Analyze"
          text: "Track sign-ins and user activity with insights."
          icon: octicons/graph-24
          path: guides/insights/index.md
    - layout: tiles
      eyebrow: Developer resources
      title: Build on WSO2 Identity Platform
      description: "APIs, SDKs, and working samples to extend and integrate the platform."
      items:
        - title: "APIs"
          text: "REST APIs to manage and extend your organization."
          icon: octicons/code-24
          path: apis/index.md
        - title: "SDKs and integrations"
          text: "Libraries for web, mobile, and backend apps."
          icon: octicons/package-24
          path: integrations/index.md
        - title: "Sample apps"
          text: "Run working apps against your organization."
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
        - title: "Improve the docs"
          text: "Report a docs issue or suggest a change on GitHub."
          icon: octicons/mark-github-16
          url: https://github.com/wso2/docs-is/issues
        - title: "Get enterprise support"
          text: "Explore plans with support from WSO2 experts."
          icon: octicons/briefcase-24
          url: https://wso2.com/identity-platform/pricing/
---

<!-- The home page is rendered from templates/guided-home-page.html using the front matter above. -->
