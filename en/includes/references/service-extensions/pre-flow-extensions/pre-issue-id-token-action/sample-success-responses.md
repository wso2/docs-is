# Sample success responses for pre-issue ID token action

In this section, you'll find examples of success responses for various scenarios involving ID token modifications. These samples demonstrate how to structure your responses based on different types of operations, ensuring that your external service interacts correctly with {{product_name}} during the [pre-issue ID token action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-issue-id-token-action/).

## Adding a custom claim to the ID token

To add a custom claim to the ID token, use the <code>/idToken/claims/</code> path in the <code>event.idToken</code> request. This path includes an array of claims.

When adding a new claim, you need to specify the index where the claim should be inserted. The specified index must not be greater than the number of elements currently in the array. If you want to add the claim to the end of the array, you can use the <code>-</code> character as the index.

Only string, number, boolean, and string type arrays are allowed to be added to the ID token claims.

Refer to the example response below, which demonstrates adding a custom claim to the last position of ID token claims:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/idToken/claims/-",
      "value": {
        "name": "customSID",
        "value": "12345"
      }
    }
  ]
}
```

Refer to the example response below, which demonstrates adding a multi-valued array type custom claim to the last position of ID token claims:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/idToken/claims/-",
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

## Replacing an existing OIDC claim

You can replace existing OIDC claims in the ID token (for example, <code>given_name</code>, <code>family_name</code>, <code>email</code>). When replacing multi-valued claims of array type, you need to specify the index of the value that is replaced. The specified index must not be greater than the number of elements currently in the array.

Refer to the example response below, which demonstrates replacing an OIDC claim:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/idToken/claims/given_name",
      "value": "alice"
    }
  ]
}
```

## Replacing the ID token validity period

The duration for which the ID token is valid can be changed in seconds. Refer to the example response below, which demonstrates changing the validity period of the ID token:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/idToken/claims/expires_in",
      "value": 300
    }
  ]
}
```

## Modifying audience values

When adding, replacing, or removing an audience value, you need to specify the index where the audience is added, replaced, or removed. The specified index must not be greater than the number of elements currently in the array. If you want to add, replace, or remove the audience at the end of the array, you can use the <code>-</code> character as the index.

Refer to the example response below, which demonstrates modifying audience values:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/idToken/claims/aud/-",
      "value": "example.com"
    },
    {
      "op": "add",
      "path": "/idToken/claims/aud/-",
      "value": "https://example.com/resource"
    },
    {
      "op": "remove",
      "path": "/idToken/claims/aud/0"
    }
  ]
}
```

## Removing a claim

You can remove claims from the ID token. For array-type claims such as <code>aud</code>, specify the index of the value to remove. Refer to the example response below, which demonstrates removing a claim:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "remove",
      "path": "/idToken/claims/given_name"
    }
  ]
}
```

## Combined example

Refer to the example response below, which demonstrates a combination of add, replace, and remove operations on the ID token:

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/idToken/claims/-",
      "value": {
        "name": "customSID",
        "value": "12345"
      }
    },
    {
      "op": "replace",
      "path": "/idToken/claims/given_name",
      "value": "alice"
    },
    {
      "op": "replace",
      "path": "/idToken/claims/expires_in",
      "value": 300
    },
    {
      "op": "add",
      "path": "/idToken/claims/aud/-",
      "value": "https://example.com/resource"
    },
    {
      "op": "remove",
      "path": "/idToken/claims/family_name"
    }
  ]
}
```
