# Sample success responses for pre-issue id token action

In this section, you'll find examples of success responses for common ID token modification scenarios. These samples show how to structure responses when adding claims, replacing values, or removing data, ensuring your external service works correctly with {{product_name}} during the [pre-issue id token action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-issue-id-token-action/).

## Adding a custom claim to the id token

To add a custom claim to the ID token, use the <code>/idToken/claims/</code> path in the <code>event.idToken</code> request. This path includes an array of claims.

When adding a new claim, specify the index where you insert the claim. The specified index must not exceed the number of elements currently in the array. To add the claim to the end of the array, use the <code>-</code> character as the index.

You can add only string, number, boolean, string type arrays, and custom objects to the ID token claims.

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

## Replacing the id token validity period

You can change the duration(in seconds) for which the ID token remains valid. Refer to the example response below, which demonstrates changing the validity period of the ID token:

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

When adding, replacing, or removing an audience value, specify the index where you add, replace, or remove the audience. The specified index must not exceed the number of elements currently in the array. To add, replace, or remove the audience at the end of the array, use the <code>-</code> character as the index.

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

## Replacing an existing OIDC claim

You can replace existing OIDC claims in the ID token (for example, <code>given_name</code>, <code>family_name</code>, <code>email</code>). When replacing multi-valued claims of array type, specify the index where you insert the value. The specified index must not exceed the number of elements currently in the array.

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

## Removing an existing OIDC claim

You can remove an existing OIDC claims from the ID token. For array-type claims such as <code>aud</code>, specify the index of the value to remove. Refer to the example response below, which demonstrates removing a claim:

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
