# SMART on FHIR

Follow the tutorial below to learn about how you can leverage Asgardeo to implement a robust authentication and authorization mechanism for your healthcare applications built on SMART on FHIR.

## What is FHIR?

[FHIR](https://hl7.org/fhir/R4/index.html){target="_blank"} (Fast Healthcare Interoperability Resources) is a standard introduced by HL7 for securely exchanging healthcare data. The standard defines a set of structured data formats for key healthcare resources such as patients, practitioners, diagnostics and medications. This ensures that regardless of how the data are stored in one system, they can be understood and processed by another system even if it is running on a different technology.

## What is SMART on FHIR?

[SMART ON FHIR](https://hl7.org/fhir/smart-app-launch/index.html){target="_blank"} is a framework that extends FHIR and allows third-party developers to create applications that seamlessly integrate with Electronic Health Records (EHR) systems. There are two main advantages of using SMART ON FHIRE for building healthcare apps:

- Interoperability - As the framework provides a standardized method to access healthcare data, developers can build applications that work across different EHR systems, irrespective of the underlying technology.

- Security - The framework uses open standards such as OAuth2 and OpenID Connect for authorization and authentication to ensure EHR systems are accessed securely and in compliance with privacy regulations such as HIPAA.

## How can Asgardeo help?

Asgardeo, a cloud-native Identity and Access Management (IAM) solution, is equipped with support for open standards such as OpenID Connect and Oauth 2.0 that developers can simply integrate right into their SMART on FHIR applications. This helps developers to safeguard patient information, comply with privacy regulations, and manage access to FHIR resources based on user roles.

Asgardeo simplifies and automates identity and permission management, making it an ideal solution for integrating third-party applications securely within the healthcare ecosystem.

## How do I integrate Asgardeo into my app?

This guide outlines the steps to configure Asgardeo to work with your SMART on FHIR app. A Postman collection is provided to automate the process, enhancing efficiency and ensuring consistent configurations that can be quickly set up. This guide also explains how to effectively use the Postman script to configure Asgardeo with your app.

### Prerequisite

You need to have an account. If you do not have one, create one for free in Asgardeo(https://asgardeo.io/signup){target="_blank"}. Follow the [documentation]({{base_path}}/get-started/) to learn how to get started.

### Step 1: Get a bearer token from Asgardeo

To run the Postman collection, the application requires access to a number of Asgardeo REST APIs. For this, you need to register your app in Asgardeo and obtain a bearer token with the right permissions. To do so, follow the steps below.

1. Log in to the [Asgardeo Console](https://console.asgardeo.io/){target="_blank"}.

2. 



