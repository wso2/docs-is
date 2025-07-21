
In this section, we will focus on how to call a secure API from your React app using the access token.

For simplicity, let's assume that the APIs we’re calling are secured by the same Identity Provider (IdP) and use the same issuer— in this case, {{product_name}}. This is typical when React apps are interacting with internal APIs within the same organization.

!!! tip "Tip"

    If your app needs to call APIs secured by a different IdP, you’ll need to exchange your current access token for a new one issued by the IdP securing those APIs. This can be done using the OAuth2 token exchange grant type or other supported grant types. We will cover these scenarios in a separate guide.

## Using SDK Built-in HTTP client

When your application is wrapped with `AsgardeoProvider`, you can use the `useAsgardeo` hook to access the authenticated `http` module. This module has the following features:

- Includes the necessary authentication headers (Bearer token)
- Handles token refresh when tokens expire
- Provides methods like `request()` and `requestAll()` for making API calls

You can use the `http` module provided by the Asgardeo SDK to make HTTP requests to these endpoints. This function is used to send http requests to {{product_name}} or desired backend. The developer doesn’t need to manually attach the access token since this function does it automatically.

The following is a simple example of how you might use the Asgardeo SDK’s `http` to call a protected API endpoint, such as `/scim2/Me` (to get the user profile details after signing in). In this case, the SCIM 2 endpoint is secured by {{product_name}} . {{product_name}} provides a SCIM 2 API for managing users within your organization. While user management with SCIM 2 is a topic for a different guide, we will use the API as part of our current guide.

!!! note "Note"

    The storage type must be set to `webWorker` for the token to be automatically attached. If it’s set to `sessionStorage` or `localStorage`, you may implement your own function for attaching the access token to the network request. 

```javascript

import React, { useEffect, useState } from 'react';
import { useAsgardeo } from '@asgardeo/react';

export default function UserProfile() {
  const { http, isSignedIn } = useAsgardeo();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    (async () => {
      try {
        const response = await http.request({
          url: '<base-url>`/scim2/Me',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/scim+json',
          },
          method: 'GET',
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    })();
  }, [http, isSignedIn]);

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      )}
    </div>
  );
}
```

!!! tip "Tip"

    You need to construct the `<base-url>` value as per the followng instructions: 

    For Asgardeo: 

    `<base-url> = https://api.asgardeo.io/t/<your_Asgardeo_org_name>`

    For WSO2 Idenity Server: 

    `<base-url> =https://localhost:9443`

Note that you don’t need to manually specify the Authorization header under headers in `http`, as `http` function intercepts the request and attaches the access token to the network request as the Authorization header.

In the above example, the final request config sent by the `http` function would be as follows

```javascript

const response = await http.request({
    url: '<base-url>`/scim2/Me',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/scim+json',
        "Authorization": "Bearer <access_token_retrieved_from_web_worker>"
    },
    method: 'GET',
});

```

!!! tip "Tip"

    You need to construct the `<base-url>` value as per the followng instructions: 

    For Asgardeo: 

    `<base-url> = https://api.asgardeo.io/t/<your_Asgardeo_org_name>`

    For WSO2 Idenity Server: 

    `<base-url> =https://localhost:9443`

In case you want to send multiple API requests in parallel, you can use the `httpRequestAll` function to simultaneously trigger parallel network requests and receive responses after all network requests are completed.

The following code snippet shows a javascript function which accepts a list of application IDs and sends multiple network requests for each app ID in parallel. The responses will contain results for each id, as an array of responses.

```javascript
import React, { useEffect, useState } from 'react';
import { useAsgardeo } from '@asgardeo/react';

export default function UserProfile() {
  const { http, isSignedIn } = useAsgardeo();
  const [userData, setUserData] = useState({
    profile: null,
    discoverableApplications: [],
  });

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    const requests = [];

    requests.push({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: '<base-url>/api/users/v1/me/applications',
    });

    requests.push({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/scim+json',
      },
      method: 'GET',
      url: '<base-url>/scim2/Me',
    });

    (async () => {
      try {
        const response = await http.requestAll(requests);

        setUserData({
          discoverableApplications: response[0].data.applications,
          profile: response[1].data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [http, isSignedIn]);

  return <pre>{JSON.stringify(userData, null, 4)}</pre>;
}

```

!!! tip "Tip"

    You need to construct the `<base-url>` value as per the followng instructions: 

    For Asgardeo: 

    `<base-url> = https://api.asgardeo.io/t/<your_Asgardeo_org_name>`

    For WSO2 Idenity Server: 

    `<base-url> = https://localhost:9443`

## Using a custom HTTP client

In case you are not using the webWorker as the storage type, the `getAccessToken` function can be used to fetch the access token and manually attach it to the network request. The following is an example where the access token is fetched and manually attached to the authorization header of a Fetch request.

```javascript
import React, { useEffect, useState } from 'react';
import { useAsgardeo } from '@asgardeo/react';

export default function UserProfile() {
  const { isSignedIn, getAccessToken } = useAsgardeo();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    (async () => {
      try {
        const response = await fetch('<base-url>/scim2/Me', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/scim+json',
            Authorization: `Bearer ${await getAccessToken()}`,
          },
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        setUserData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [isSignedIn, getAccessToken]);

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      )}
    </div>
  );
}
```

!!! tip "Tip"

    You need to construct the `<base-url>` value as per the followng instructions: 

    For Asgardeo: 

    `<base-url> = https://api.asgardeo.io/t/<your_Asgardeo_org_name>`

    For WSO2 Idenity Server: 

    `<base-url> =https://localhost:9443`
