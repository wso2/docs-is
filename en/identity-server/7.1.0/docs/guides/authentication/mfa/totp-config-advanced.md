# TOTP configurations

This page lists all the advanced configurations related to TOTP (Time-based One-Time Password) authentication.

## Default TOTP configuration

The following code snippet shows a sample TOTP configuration in the `<IS_HOME>/repository/conf/deployment.toml` file:

```toml
[authentication.authenticator.totp.parameters]
encodingMethod="Base32"
timeStepSize="30"
windowSize="3"
authenticationMandatory=true
enrolUserInAuthenticationFlow=true
usecase="local"
secondaryUserstore="primary"
TOTPAuthenticationEndpointURL="authenticationendpoint/totp.do"
TOTPAuthenticationEndpointErrorPage="authenticationendpoint/totp_error.do"
TOTPAuthenticationEndpointEnableTOTPPage="authenticationendpoint/totp_enroll.do"
Issuer="WSO2"
UseCommonIssuer=true
```

The parameter values above show the **default** configurations in WSO2 Identity Server.

## Update TOTP configuration

To change a parameter value from the default value, add the configuration to the `deployment.toml` file using the following format:

```toml
[authentication.authenticator.totp.parameters] 
<Property-name> = <Property-value> 
```

## Configuration parameters

Learn about each TOTP configuration parameter and how to customize them.

### encodingMethod

**Description:** The encoding method used to generate the TOTP.

**Default value:** `Base32`

---

### timeStepSize

**Description:** The time step size (in seconds) used to validate the TOTP.

**Default value:** `30`

---

### windowSize

**Description:** The window size used to validate the TOTP. This determines how many time steps before and after the current time step are accepted.

**Default value:** `3`

---

### authenticationMandatory

**Description:** If this value is `true`, TOTP authentication will be enforced as a second step.

**Default value:** `true`

---

### enrolUserInAuthenticationFlow

**Description:** If this value is `true`, it will ask users to enable the TOTP authenticator during the authentication flow.

**Default value:** `true`

---

### usecase

**Description:** This field can take one of the following values: `local`, `association`, `userAttribute`, `subjectUri`. If you do not specify any usecase, the default value is `local`.

**Default value:** `local`

If you choose `userAttribute` as the usecase, add the following parameter to specify the user attribute:

```toml
userAttribute = "http://wso2.org/foursquare/claims/email"
```

---

### secondaryUserstore

**Description:** If you use secondary user stores, enter all the user store values for the particular tenant as comma-separated values.

**Default value:** `primary`

**Example:**

```toml
[authentication.authenticator.totp.parameters]
secondaryUserstore= "jdbc, abc, xyz"
```

---

### TOTPAuthenticationEndpointURL

**Description:** The endpoint of the UI used to gather the TOTP.

**Default value:** `authenticationendpoint/totp.do`

---

### TOTPAuthenticationEndpointErrorPage

**Description:** The endpoint of the error page.

**Default value:** `authenticationendpoint/totp_error.do`

---

### TOTPAuthenticationEndpointEnableTOTPPage

**Description:** The endpoint of the TOTP authenticator enrollment page.

**Default value:** `authenticationendpoint/totp_enroll.do`

---

### Issuer

**Description:** The issuer name that will be shown on the mobile authenticator application. If this parameter is not configured, the tenant domain will be shown.

**Default value:** `WSO2`

---

### UseCommonIssuer

**Description:** If set to `true`, the issuer name defined in the `deployment.toml` file will be used as the issuer for all tenants.

**Default value:** `true`
