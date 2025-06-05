---
template: templates/complete-guide.html
heading: Introduction
read_time: 4 mins
---

WSO2 Identity Server (WSO2 IS) is widely recognized as a powerful, open-source identity and access management solution
that offers a high degree of extensibility to meet diverse business requirements. Asgardeo, which is built on the same
robust core technology as WSO2 IS, inherits this extensibility, providing users the flexibility to adapt and extend the
platform according to their specific needs.

With the introduction of the new service-based extension model, both WSO2 IS and Asgardeo now offer a streamlined,
service-oriented approach to extend core functionalities. This model allows developers to implement custom logic
externally without modifying the core product, thereby ensuring maintainability, scalability, and ease of upgrades.

In this guide, we provide sample Pre-Flow Extensions that demonstrate how to use the service-based extension model to
customize the behavior of various authentication and user management actions. Whether you are working with WSO2 IS or
Asgardeo, the samples and approaches detailed here will help you understand how to build and deploy your own service
extensions effectively.

We will cover the following extensions and use cases:

* Pre-issue access token action: The pre-issue access token action allows you to execute custom logic before issuing an
  access token.
* Pre-update password action: The pre-update password action allows you to validate a password during various password
  update flows.

## Learning Objectives

By the end of this guide, you will have a clear understanding of how to implement service-based extensions in both WSO2
Identity Server (WSO2 IS) and Asgardeo. You will be equipped to enhance and tailor your identity management workflows to
better suit your organization's requirements by integrating custom logic into key parts of the authentication and user
management flows.
Specifically, this guide will help you:

* Understand how to implement the following Pre-Actions using the service extension model: Pre-Issue Access Token
  Action, and Pre-Update Password Action.
* Explore sample scenarios for each pre-action, demonstrating real-world business use cases.
* Each sample will include:
    * Implementation details using Node.js.
    * Deployment guidance using popular platforms such as Choreo, Vercel, and AWS Lambda.
    * Best practices for designing, testing, and deploying service extensions in a scalable and maintainable manner.
* Gain hands-on experience with the Node.js programming framework, which will be used throughout the guide to build and
  deploy the extension services.

By following the examples and concepts explained here, you will be able to confidently extend authentication, and user
management flows in a way that meets your specific business and technical requirements.
