# Sample success responses for pre-issue access token action

In this section, you'll find examples of success responses for various scenarios involving access token modifications. These samples demonstrate how to structure your responses based on different types of operations, ensuring that your external service interacts correctly with {{product_name}} during the [pre-issue access token action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-issue-access-token-action/).

## Adding a custom claim to the access token

To add a custom claim to the access token, use the <code>/accessToken/claims/</code> path in the <code>event.accessToken</code> request. This path includes an array of claims.

When adding a new claim, you need to specify the index where the claim should be inserted. The specified index must not be greater than the number of elements currently in the array. If you want to add the claim to the end of the array, you can use the <code>-</code> character as the index.

Only string, number, boolean, and string type arrays are allowed to be added to the access token claims.

Refer to the example response below, which demonstrates adding a custom claim to the last position of access token claims:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/accessToken/claims/-",
      "value": {
        "name": "customSID",
        "value": "12345"
      }
    }
  ]
}
```

Refer to the example response below, which demonstrates adding an multi valued array type custom claim to the last position of access token claims:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/accessToken/claims/-",
      "value": {
        "name": "customArray",
        "value": [
          "foo",
          "bar"
        ]
      }
    }
 ]
}
```

## Changing the access token validity period

The duration for which the token is valid can be changed in seconds.
Refer to the example response below, which demonstrates changing the validity period of the access token:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/accessToken/claims/expires_in",
      "value": 300
    }
 ]
}
```

## Modifying audience values

When adding, replacing or removing an audience value, you need to specify the index where the audience is added, replaced or removed. The specified index must not be greater than the number of elements currently in the array. If you want to add, replace or remove the audience to the end of the array, you can use the <code>-</code> character as the index.

Refer to the example response below, which demonstrates modifying an audience value:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/accessToken/claims/aud/-",
      "value": "example.com"
    },
    {
      "op": "add",
      "path": "/accessToken/claims/aud/-",
      "value": "https://example.com/resource"
    },
    {
      "op": "remove",
      "path": "/accessToken/claims/aud/0"
    }
 ]
}
```

## Modifying scope values

When adding, replacing or removing scopes, you need to specify the index where the scope is added, replaced or removed. The specified index must not be greater than the number of elements currently in the array. If you want to add, replace or remove the scope to the end of the array, you can use the <code>-</code> character as the index.

Refer to the example response below, which demonstrates modifying scopes:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/accessToken/scopes/-",
      "value": "custom-scope-1"
    },
    {
      "op": "remove",
      "path": "/accessToken/scopes/-"
    },
    {
      "op": "replace",
      "path": "/accessToken/scopes/0",
      "value": "edit"
    }
 ]
}
```

## Modifying an additional OIDC claim in the access token

You can replace or remove additional OIDC claims in the access token. When replacing or removing multi valued claims of array type you need to specify the index of the value that is replaced or removed. The specified index must not be greater than the number of elements currently in the array.

Refer to the example response below, which demonstrates modifying OIDC claims:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "remove",
      "path": "/accessToken/claims/groups/0"
    },
    {
      "op": "replace",
      "path": "/accessToken/claims/groups/1",
      "value": "partner"
    },
    {
      "op": "replace",
      "path": "/accessToken/claims/given_name",
      "value": "alice"
    }
 ]
}
```
## Changing the refresh token validity period

The duration for which the refresh token is valid can be changed in seconds.
Refer to the example response below, which demonstrates changing the validity period of the refresh token:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/refreshToken/claims/expires_in",
      "value": 48600
    }
 ]
}
```

## Adding a custom parameter to the token endpoint response

To add a custom top level parameter to the token endpoint response, use the <code>/response/parameters/-</code> path in the <code>event.response</code> request.

String, number, boolean, JSON objects, and arrays are allowed as parameter values. Unlike access token and refresh token claims, arrays aren't limited to string elements — they can hold any combination of these value types, including nested objects and nested arrays. The parameter name must not collide with a standard parameter name, such as <code>access_token</code>, <code>scope</code>, <code>expires_in</code>, <code>refresh_token</code>, or an already added custom parameter.

!!! note
    Unlike token endpoint response parameters, access token and refresh token claims only accept string, number, boolean, and string type array values. JSON objects, and arrays containing anything other than strings, aren't allowed as claim values, so they can't be injected into the access token or the ID token.

Refer to the example response below, which demonstrates adding a custom parameter to the token endpoint response:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/response/parameters/-",
      "value": {
        "name": "custom_param",
        "value": "custom_value"
      }
    }
  ]
}
```

Refer to the example response below, which demonstrates adding a custom parameter with a nested JSON object value to the token endpoint response:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/response/parameters/-",
      "value": {
        "name": "custom_object",
        "value": {
          "context": {
            "a": "b"
          },
          "nested": {}
        }
      }
    }
  ]
}
```

Refer to the example response below, which demonstrates adding a custom parameter with an array value containing non-string elements, including nested JSON objects:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/response/parameters/-",
      "value": {
        "name": "entitlements",
        "value": [
          {
            "resource": "reports",
            "level": 2
          },
          {
            "resource": "billing",
            "level": 1
          }
        ]
      }
    }
  ]
}
```

## Removing an optional parameter from the token endpoint response

You can suppress optional standard parameters, such as <code>refresh_token</code> or <code>id_token</code>, from the token endpoint response. To do this, use the <code>/response/parameters/</code> path followed by the name of the parameter you want to remove, in the <code>event.response</code> request. Standard parameters that are always present in the response, such as <code>access_token</code>, <code>scope</code>, and <code>expires_in</code>, can't be removed.

Refer to the example response below, which demonstrates suppressing the refresh token from the token endpoint response:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "remove",
      "path": "/response/parameters/refresh_token"
    }
  ]
}
```
