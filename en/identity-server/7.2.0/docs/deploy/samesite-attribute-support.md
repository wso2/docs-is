# SameSite Attribute Support

SameSite Attribute is one of the latest exciting approaches to mitigate attacks caused by cross-origin requests. Google Chrome, Mozilla Firefox, and some other browsers have been promoting using the SameSite attribute. The SameSite attribute is a very convenient and simple method to protect a website from cross-origin request attacks compared to traditional prevention techniques.

## SameSite attribute values
The SameSite attribute can be assigned one of the following values:

### Strict

The cookies that are assigned this value are sent with the request if, and only if, the request originates from the first party (i.e., same site/domain) regardless of the HTTP request type.

``` bash
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
```

### Lax

The cookies that are assigned this value are added to the GET request initiated by third-party domains as well. However, this is done only if the GET request being made causes a top-level navigation change (i.e., the request should cause a change to the URL in the address bar). To elaborate more, iframe, img, and script tags can also be used to load resources that operate as GET requests.
However, none of these requests cause top-level navigation changes (i.e., the URL in the address bar does not change). Therefore, cookies set as Lax are not sent along with these types of GET requests.

``` bash
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
```

### None

This value can be used in scenarios where a user intends to send cookies along with the requests initiated by third-party domains.

``` bash
Set-Cookie: CookieName=CookieValue; SameSite=None;
```


## Mitigate cross-Site request attacks

WSO2 Identity Server uses Double Submit Cookie and Synchronize Token Pattern to prevent CSRF attacks. For more information, refer to [Mitigating Cross-Site Request Forgery Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-cross-site-request-forgery-attacks/).
Providing support for the SameSite attribute, on top of the current mitigation techniques in the WSO2 Identity Server, gives an additional layer of defense for attacks caused by cross-site requests.

- The SameSite attribute value as `None;Secure` for the `samlssoTokenId`, `commonAuthId`, and `opbs` cookies.
- For other cookies that do not contain SameSite, the attribute value will be set as `Strict` by default.

This enforcement, on top of the current mitigation techniques in the WSO2 Identity Server, gives an additional layer of defense against attacks caused by cross-site requests.

!!! info  
    When it uses reverse proxies such as Nginx, the SameSite attribute needs to be configured as `None` in LB Level to make products compatible with Chrome-80 update. To do this, add the following code to the nginx.conf file. This will set the SameSite attribute as `None` for all cookies.

    ```
    location / {
            proxy_cookie_path / "/; SameSite=None";
        }
    ```