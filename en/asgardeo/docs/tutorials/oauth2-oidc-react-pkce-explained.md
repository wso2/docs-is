---
template: templates/tutorial.html
title: "OAuth 2.0 and OIDC in React: The Authorization Code Flow with PKCE, Explained"
description: "A practical, no-fluff explanation of how OAuth 2.0 and OpenID Connect secure a React app, and why the Authorization Code Flow with PKCE is the flow every SPA should use."
author:
  name: "Himesh Siriwardana"
  title: "Senior Technical Writer, IAM"
date: "August 2026"
reading_time: "12 min read"

seo:
  description: "Understand OAuth 2.0 and OpenID Connect in React through the Authorization Code Flow with PKCE: what it is, why SPAs need it, and how the WSO2 Identity Platform React SDK implements it for you."
  keywords: "oauth 2.0, openid connect, oidc, pkce, authorization code flow, react authentication, react sdk, asgardeo, wso2 identity platform, spa security"
  author: "Himesh Siriwardana"
  robots: "index, follow"
  canonical: "https://wso2.com/asgardeo/docs/tutorials/oauth2-oidc-react-pkce-explained/"

what_you_will_learn:
  - "The difference between OAuth 2.0 and OpenID Connect"
  - "Why Single Page Applications must use the Authorization Code Flow"
  - "What PKCE is and the exact problem it solves"
  - "How to see every step of the flow in your browser's devtools"

technology_used:
  - {name: "React", icon: "react.svg"}
  - {name: "OAuth 2.0"}
  - {name: "OpenID Connect"}

source_code: '<a href="https://github.com/asgardeo-samples/react-authentication-tutorial" target="_blank" rel="noopener">View on GitHub</a>'

---

## Introduction

Every time a user clicks a "Sign In" button in your React app, it creates a small storm; The browser jumps between URLs. Random-looking values appear in query parameters. Requests fly off to an identity server. Tokens come back. And a few seconds later, your app somehow knows exactly who the user is.

With a modern SDK like the WSO2 Identity Platform React SDK, all of that sits behind a single `<SignInButton />` component. This is exactly the point of SDKs. Every time you need authentication, you shouldn't have to rebuild an entire authentication protocol.

In this article, we'll pull back the curtain and show you what's happening behind the scenes, not to bore you with facts, but to show you exactly what's happening so the next time someone asks you why your login page is safe, you'll have a much better answer than "the SDK handles it".

The flow we'll be following is **Authorization Code Flow with PKCE**, the OAuth 2.0 and OpenID Connect flow commonly used by modern browser-based apps, including React SPAs.

## What is OAuth 2.0 and how is it different from OpenID Connect

We’re getting a little ahead of ourselves. Before we get into the Authorization Code Flow and PKCE, let’s start with the basics: What is OAuth 2.0, and what is OpenID Connect?

These two terms are often mentioned together and sometimes even used interchangeably. But while they’re closely related, they solve two very different problems.

Let's clear this up once and for all: OAuth 2.0 is about authorization, while OpenID Connect is about authentication.

The next two points will make that distinction a little easier to see.

- **OAuth 2.0** is an *authorization* framework. It answers the question: "Can this application access this resource on behalf of this user?" The output of an OAuth 2.0 flow is an **access token**: a credential your app attaches to API requests to prove that the user has the permission to access this resource and perform the requested action.

- **OpenID Connect (OIDC)** is an *identity* layer built on top of OAuth 2.0. It answers a different question: "Who is this user?" OIDC standardizes how an app requests and verifies a user's identity, and its output is an **ID token**: a token containing claims like the user's name, email, and a unique subject identifier.

Your React application needs both. You use OIDC to establish *who's* logged in (populate a user profile, decide what to render) and OAuth 2.0 access tokens to make authenticated calls to your backend APIs *on that user's behalf*.

## What is the Authorization Code flow?

The OAuth 2.0 specification defines several "flows", known formally as **grant types**, for obtaining tokens. A grant type defines how your application communicates with the token issuer, such as an identity server, to get those tokens.

We won’t go deep into every grant type defined in the OAuth 2.0 specification. Instead, we’ll focus on the **Authorization Code Flow**, the subject of this article. Along the way, you’ll also get a sense of how some older, less secure grant types worked and how the Authorization Code Flow addresses many of their shortcomings.

Before we get into the nitty-gritty, let’s first look at how the Authorization Code grant works at a high level.

![Authorization Code Flow sequence diagram]({{base_path}}/assets/img/tutorials/react-authorization-code-flow/blog-auth-code-flow.png){: style="width: 600px; max-width: 600px; display: block; margin: 1.5rem auto;"}

One thing you may have noticed in the flow diagram above is that the Authorization Code Flow doesn’t send the access token or ID token directly to the application.

Instead, it first returns a short-lived authorization code, which the application then exchanges for tokens.

**Why the two step flow?**

When a user clicks sign in, the authorization request happens through the user's browser. If the access token returns from the browser-based flow, it could be exposed in the URL and potentially end up in places such as the browser history or referrer data.

A legacy grant type called the **Implicit grant** worked this way. Instead of returning an authorization code, it returned the access token directly through the browser redirect.

The Authorization Code Flow avoids that. Rather than sending the token through the redirect, the authorization server returns a short-lived, single-use authorization code. The application then exchanges that code for the actual tokens in a separate request.

**How is this more secure?**

The key difference is how the two steps travel.

The authorization code is returned through the browser redirect, where values can appear in the URL. The token exchange, however, is a separate HTTP request to the token endpoint. The tokens come back in the response body, not in the browser's address bar.

That means the access token and ID token stay out of the redirect URL, browser history, and referrer data. The only thing exposed on that first browser-facing leg is the short-lived authorization code.

**But..if that code travels through the browser, what stops someone from stealing it and exchanging it for the tokens?** If that was your first thought, you’re already one step ahead. For browser-based apps like React SPAs, the Authorization Code Flow alone isn’t quite enough. It needs one more piece: PKCE.

## The public client problem, and how PKCE solves it

For conventional applications, the Authorization Grant Flow alone can be enough on its own. These applications can safely hold a secret, which the authorization server verifies along with the authorization code before issuing tokens.

But, anything shipped in a React app's JavaScript bundle is visible to anyone who opens their browser's devtools. If you embedded a client secret in your frontend code, it wouldn't be a secret anymore. This is why single-page applications are called **public clients**: clients that, by design, cannot hold a confidential secret.

Without a secret, the Authorization Code Flow has a gap: if an attacker somehow got hold of your app's authorization code they could exchange it for tokens themselves.

This is exactly the gap **PKCE** (Proof Key for Code Exchange, defined in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636), pronounced "pixy") closes. Let's look at how PKCE solves this problem.

1. Before sending the authorization request, your app generates a random secret in memory called the **code verifier**.

2. It then derives a **code challenge** from that verifier by hashing it with SHA-256 and Base64URL-encoding the result. Only the challenge is sent with the authorization request. The verifier stays with the app.

3. When the app later exchanges the authorization code for tokens, it sends the original code verifier along with the code.

4. The authorization server applies the same transformation to the verifier and compares the result with the code challenge from the original request. If they don’t match, the token exchange is rejected.

Because the code verifier never leaves your app until that final exchange, a stolen authorization code is useless to an attacker who doesn't also have the verifier.

PKCE was originally introduced to protect public clients like SPAs. In [OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1), however, PKCE is required for all clients using the Authorization Code Flow, adding an extra layer of protection even when a client secret is available.

That, though, is a discussion for another day.

## The flow, step by step

By now, you should have a good idea of how the Authorization Code Flow with PKCE works at a high level. In this section, we’ll take it one step further and look at what those requests actually look like.

Before we jump into the more detailed flow diagram, this time with the user’s browser in the picture, let’s quickly go over a few key pieces of information the application and identity server rely on.

- `client_id` - The identity server uses this to recognize your application.
- `redirect_uri` - The URL the identity server sends the browser back to after authorization is complete. This is often called the **callback URL**.
- `state` - A random value your app creates before the flow starts. When the identity server sends it back, your app checks that it’s the same value it started with. It protects against cross-site request forgery: without it, an attacker could trick a user into completing someone else's login flow.

![Authorization Code Flow with PKCE, full technical sequence diagram]({{base_path}}/assets/img/tutorials/react-authorization-code-flow/blog-auth-code-flow-tech.png){: style="width: 800px; max-width: 100%; display: block; margin: 1.5rem auto;"}

Let’s slow things down and dissect the two most important requests in this flow.

First, the browser talks to the identity server to request an authorization code. Later, the application talks to the identity server again to exchange that code for tokens.

**I want an authorization code**

The user's browser, called the **user agent** in OAuth, sends this request to the identity server to formally kick off the flow.

```bash
GET /authorize?
  response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://app.example.com/callback
  &scope=openid profile
  &state=RANDOM_STATE
  &code_challenge=CODE_CHALLENGE
  &code_challenge_method=S256
```

Let's map the concepts you already know to the actual parameter names in this request:

- `response_type=code` - Tells the identity server that the application wants an authorization code back.

- `scope` - Describes the permissions the application is requesting. Including the `openid` scope turns the OAuth 2.0 request into an OpenID Connect authentication request.

- `code_challenge` - The PKCE challenge derived from the code verifier and sent with the authorization request.

- `code_challenge_method=S256` - Tells the identity server that the challenge was created using SHA-256.

In plain terms, this request says, *Here’s who I am, I want an authorization code, and when you’re done, send it back to this URL*.

**I want my tokens**

Once the browser lands back on your redirect URI with the authorization code, the browser's part is done. The application takes over from here and calls the identity server directly, not through the browser, to exchange that code for tokens.

```bash
POST /oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTHORIZATION_CODE
&redirect_uri=https://app.example.com/callback
&client_id=YOUR_CLIENT_ID
code_verifier=CODE_VERIFIER
```

- `grant_type` - Tells the identity server which OAuth grant the application is using to request tokens.

- `code_verifier` - The original random PKCE value the application created before starting the flow. It sends this now so the identity server can verify that the same app that started the authorization request is the one exchanging the code for tokens.

If the code, the verifier, and everything else on the identity server's checklist line up, the response carries the tokens your application has been waiting for:

```bash
{
  "access_token": "ACCESS_TOKEN",
  "id_token": "ID_TOKEN",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

- `token_type` - Tells the application how the access token should be used when making API requests. A value of Bearer means the app sends the token as a bearer token, typically in the Authorization header. `Authorization: Bearer ACCESS_TOKEN`

## See the flow in your own React app

If you've followed the [Mastering React Auth]({{base_path}}/tutorials/react-authentication-tutorial/) tutorial, you already have a React app wired up with `<AsgardeoProvider />` and `<SignInButton />` from [`@asgardeo/react`](https://www.npmjs.com/package/@asgardeo/react). Let's use that same setup to watch this flow happen in your own application.

Open your app, open the browser devtools, switch to the **Network** tab, and filter requests by typing `authorize`. Now click the sign-in button.

![OIDC authorize request in the browser devtools network tab]({{base_path}}/assets/img/tutorials/react-authorization-code-flow/blog-react-auth-flow-browser.png){: width="800" style="display: block; margin: 0;"}

Switching to the **Payload** tab breaks that same request down into its individual query string parameters, which is easier to read than parsing the raw URL:

![OIDC authorize request payload in the browser devtools network tab]({{base_path}}/assets/img/tutorials/react-authorization-code-flow/blog-react-auth-flow-payload.png){: style="width: 500px; max-width: 100%; display: block; margin: 0;"}

You'll find every parameter we discussed appear in the request. `response_type=code`, `scope=openid profile`, `redirect_uri`, `code_challenge_method=S256`, and a `code_challenge` value. The SDK generated the code verifier, derived this challenge, and attached it here without you having to do any of the work.

After you complete the login form, filter the network tab by typing `token` instead. Click the request that fired right after you click sign in and switch to its **Payload** tab.

![Token exchange request payload in the browser devtools network tab]({{base_path}}/assets/img/tutorials/react-authorization-code-flow/blog-react-auth-flow-token-payload.png){: style="width: 800px; max-width: 100%; display: block; margin: 0;"}

There it is. `grant_type=authorization_code`, the `code` from the redirect, and, critically, a `code_verifier` value, proving this is the same app instance that started the login.

Switch over to the **Response** tab on that same request, and you'll find what the application was waiting for:

![Token exchange response in the browser devtools network tab]({{base_path}}/assets/img/tutorials/react-authorization-code-flow/blog-react-auth-flow-token-response.png){: style="width: 800px; max-width: 100%; display: block; margin: 0;"}

The access token and ID token come back here, in the response body.

!!! note

    - You may see more than one token request in the filtered list. The SDK reuses the same token endpoint later on to silently renew tokens using the refresh token grant, which we will cover elsewhere.

    - You'll also notice a `refresh_token` in the response, which is exactly what the SDK uses for the silent renewal mentioned above.

## PKCE is on by default, and you shouldn't turn it off

For public clients like a React SPA, PKCE is mandatory by default when you register a React application in WSO2 Identity Platform. There's nothing additional you need to configure to make it happen.

The SDK generates the code verifier and challenge automatically as part of every sign-in call.

Though possible to disable PKCE from the WSO2 Identity Platform Console, there's essentially never a good reason to do this for a browser-based app. Since a React app can't hold a client secret, PKCE is the only thing standing between a stolen authorization code and a successful account takeover.

## Conclusion

There you have it.

What looks like a small storm of redirects, query parameters, and token requests at the beginning of this article is really one carefully coordinated flow.

The Authorization Code Flow gives your app a safe way to get tokens without sending them through the browser. PKCE adds the missing proof that a public client like a React app needs when it can't safely keep a client secret.

And with the WSO2 Identity Platform React SDK, all of that still sits behind `<AsgardeoProvider />` and `<SignInButton />`.

The difference is that now, you know exactly what’s happening, and why.
