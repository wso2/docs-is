# OpenID Connect Scopes And Claims


### Scopes
By using OpenID Connect scopes, it defines what access privileges should be granted to an access token. 
Usually [claims](#claims) are associated with scopes and based on the scopes, specific set of information will be returned
to the client as claim values.

The [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) defines the 
following set of scopes. WSO2 Identity Server allows to define any other custom scope.

    - openid
    - profile
    - email
    - address
    - phone

The `openid` scope is considered as a special scope and it is mandatory for OpenID Connect requests to have this scope.
The mandatory `sub` claim should be associated with this scope. The other scopes defined in the scopes are optional.

A sample way to request scopes is shown below.
```
scope=openid profile email phone
```

### Claims
Claims are name value pairs that contain information about the user attributes. These claims are associated with OpenID 
Connect [scopes](#scopes)  and the client applications can request claims about the end-user.


Sample scope- claim mapping based on the [specification](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)
is shown below.

| Scope                 | Claim         | 
| --------------------- | ------------- | 
| openid |sub |                            
| profile           | name, family_name, given_name, middle_name, nickname, preferred_username, profile, picture, website, gender, birthdate, zoneinfo, locale, updated_at|                              
| email         | email, email_verified| 
| address         | address.formatted, address.street_address, address.locality, address.region, address.postal_code, address.country| 
| phone         | phone_number, phone_number_verified| 
