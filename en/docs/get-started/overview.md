# Overview

As an enterprise's applications, services, and API adoptions grow,
managing identities (such as employees, vendors, partners, and
customers) across internal, shared, and SaaS services becomes a
significant challenge. The [WSO2 Identity
Server](http://wso2.com/products/identity-server/) is a product that can
meet this challenge and also provide options to solve identity problems
you may encounter in future.

WSO2 Identity Server is fully open source and is released under [Apache
Software License Version
2.0,](http://www.apache.org/licenses/LICENSE-2.0) one of the most
business-friendly licenses available today.

### About identity in the digital business

In the digital world of today, the modern enterprises have to offer
their numerous customers remote access to sizable amounts of sensitive
and confidential information, while still maintaining access control and
stringent information security at all times. Additionally, all of this
needs to take place at the bat of an eyelid.

A typical digital business of today relies on users who are constantly
on the move and using various applications and devices. These users are
now using their own devices for ease of access and prefer to sign in
just once. Basically, the digital business caters to people who would
like to use their Facebook, Google, or LinkedIn credentials to access
other information on their own devices. Here’s the catch: an
individual’s identity needs to be validated across these applications,
and this needs to take place in a manner that will ensure security as
well as speed of access and ease of use.

### Identity management

Identity management is used to directly influence the security and
productivity of an organization. This can enforce consistency in
security policies across the organization. Identity management is
particularly advantageous when complying with rules and regulations
enforced in some critical domains by governments. This can also be a
means to provide access to resources to outside parties without
compromising security. Controlling access to resources increases
organizational security. A system that uses a proper identity management
solution is easier to audit. Additionally, there are automated password
reset capabilities.

An identity management system would typically have the following.

-   User stores and directories
-   Authentication of users
-   Authorization of users
-   Single sign-on
-   Provisioning
-   Access delegation
-   Password reset
-   Self-registration
-   Account locking

### The Identity Server and the solution it provides

WSO2 Identity Server provides secure identity management for enterprise
web applications, services, and APIs by managing identity and
entitlements of the users securely and efficiently. The Identity Server
enables enterprise architects and developers to reduce identity
provisioning time, guarantee secure online interactions, and deliver a
reduced single sign-on environment. The WSO2 Identity Server decreases
the identity management and entitlement management administration burden
by including the role-based access control (RBAC) convention,
fine-grained policy-based access control, and Single-Sign-On (SSO)
bridging.

The Identity Server enables you to create, maintain and terminate user
accounts along with user identities across multiple systems including
Cloud applications. When there are multiple applications that
require authentication, users should be able to log in at one place and
still have seamless access to all the other applications.

Additionally, the Identity Server brings about a new and improved
approach to federation. There is a centralized Identity as a Service
Provider. It is still an overall n to n relationship. There is a 1 to n
relationship from a federation partner to consumer services (where
multiple consumer services rely on a single centralized federated
Identity Provider for security) and a 1 to n relationship from consumer
service to federation partners (where a single consumer service can rely
on multiple Identity providers for security). This model ensures greater
efficiency.

WSO2 Identity Server has the ‘ [Jaggery](http://jaggeryjs.org/) ’ user
interface for end users. Apart from the [Management
Console](../../setup/getting-started-with-the-management-console), an [end user
view](../../learn/my-account) is available to manage profiles,
to recover accounts and to manage authorized apps. The log in and
consent pages in the UI can be completely customized because they run on
a separate context as a separate web application. These web applications
can even be dropped into a separate application server if required.
