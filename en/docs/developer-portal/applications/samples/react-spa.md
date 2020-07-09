# WSO2 Identity Server - Sample React SPA

This sample application will show case the usage of the of WSO2 Identity Server Javascript SDK and how you can integrate a SPA with Identity Server. The following guide will walk you through how you can try out this sample from the scratch.

## Getting started

### Running the sample

1. Download the sample application from [here](https://github.com/wso2-extensions/identity-samples-js/releases/download/0.1.0/identity-authenticate-sample-js-spa.zip).
2. Run `yarn install`
3. Update your configurations in `src/app.js` with WSO2 Identity Server App Register details.

    E.g.

    ```javascript
    const authConfig = {
        ...
        // ClientID generated for the application
        clientID: "uxRd9AqFa3Blp1ASvKYaUizU7pca",
    };
    ```

4. run `yarn start`
5. Visit `http://localhost:3000` on browser

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
