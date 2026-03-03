# MCP-Auth Quickstart

Welcome to the Secure MCP server Quickstart guide! This guide shows you how to build a secure MCP (Model Context Protocol) server in Python using the [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk), and protect it with **{{ product_name }}**.

By the end of this guide, you will have a working MCP Resource Server that:

- Uses **{{ product_name }}** for secure OAuth 2.1 authentication, following the [MCP Auth Specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- **Exposes a secure tool** that adds two numbers
- Works with MCP Inspector for testing

You do not need prior MCP experience. Just follow the steps.

[//] STEPS_START

## Configure an Application in {{ product_name }}

To enable clients to sign in and safely connect to the MCP server, an application in {{ product_name }} needs to be set up first.

- Sign in to [{{ product_name }}](https://console.asgardeo.io/) console and navigate to **Applications > New Application**.
- Select **MCP Client Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    Name : MCPInspectorApp

    Authorized redirect URL: http://localhost:6274/oauth/callback

!!! Info
    The authorized redirect URL defines the location Asgardeo sends users to after a successful login, typically the address of the client application that connects to the MCP server.
    For this guide, we will use ["MCP Inspector"](https://modelcontextprotocol.io/docs/tools/inspector) to test the MCP server, so we will use `http://localhost:6274/oauth/callback`, as the authorized redirect URL.

Make a note of the **client-id** from the **Protocol** tab of the registered application. You will need it during the [Test the MCP server with authentication](#test-the-mcp-server-with-authentication) section of this guide.

## Create a Simple MCP server

Create a directory called `mcp-auth-quickstart` by running the following commands.

```bash
  mkdir mcp-auth-quickstart
  cd mcp-auth-quickstart
```

Then set up and activate a Python virtual environment using the following commands.

=== "macOS/Linux"

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```
=== "Windows"

    ```bash
    python -m venv .venv
    .venv\Scripts\activate
    ```

Install the following dependencies using `pip`.

```bash
    pip install mcpauth mcp PyJWT httpx pydantic python-dotenv
```

Create `main.py`. This uses FastMCP to define tools and resources.

```python title="main.py"
from mcp.server.fastmcp import FastMCP

# Create a simple MCP server - No Authentication
mcp = FastMCP(
    "Addition Tool",
)

@mcp.tool()
async def add(a: float, b: float) -> dict[str, float]:
    """Add two numbers and return the result."""
    return {
        "a": a,
        "b": b,
        "result": a + b,
    }

if __name__ == "__main__":
    # Runs using streamable-http transport
    mcp.run(transport="streamable-http")

```

## Run and test without authentication

Start the MCP server by running the following command.

``` bash
  python main.py
```

Use **MCP Inspector** as the client application to test the MCP server.

!!! Note
    Running MCP Inspector requires a JavaScript package manager such as `npm`, which comes bundled with `Node.js`. Ensure `Node.js` and `npm` are installed before continuing.

In a new terminal window, run the following command to install the **MCP Inspector** package:

```bash
npm install @modelcontextprotocol/inspector@0.16.3
```  

Then launch the MCP Inspector against the running MCP server:

```bash
npx @modelcontextprotocol/inspector http://localhost:8000/mcp
```  

From the Inspector UI, once connected, open the **Tools** panel, select **List Tools**, and invoke the `add` tool.

## Add authentication to the MCP server

Stop the running server before continuing.

Add environment configuration by creating a `.env` file at the project root to hold the {{ product_name }} configuration:

```properties title=".env"
AUTH_ISSUER=https://api.asgardeo.io/t/<your-tenant>/oauth2/token
CLIENT_ID=<your-client-id>
JWKS_URL=https://api.asgardeo.io/t/<your-tenant>/oauth2/jwks
```

!!! Important

    Replace `<your-tenant>` and `<your-client-id>` with the values obtained from the {{ product_name }} console.
    The tenant name is visible in the console URL path (e.g., `https://console.asgardeo.io/t/<your-tenant>`), and the client ID is found in the application's **Protocol** tab.

Create a `jwt_validator.py` file in the project directory using the implementation below.

- This script is responsible for fetching the JSON Web Key Set (JWKS) from {{ product_name }} and verifying incoming access tokens.

<details>
<summary>Expand to view the implementation</summary>

```python title="jwt_validator.py"
import jwt
from jwt.algorithms import RSAAlgorithm
import httpx
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)


class JWTValidator:
    """
    A class to handle JWT token validation using JWKS.
    Fetches and caches JWKS keys for performance.
    """

    def __init__(self, jwks_url: str, issuer: str, audience: str, ssl_verify: bool = True):
        """
        Initialize the JWT validator.
        
        Args:
            jwks_url: The URL to fetch JWKS from
            issuer: Expected token issuer
            audience: Expected token audience
            ssl_verify: Whether to verify SSL certificates (False for dev/testing)
        """
        self.jwks_url = jwks_url
        self.issuer = issuer
        self.audience = audience
        self.ssl_verify = ssl_verify
        self._jwks_cache: Optional[Dict[str, Any]] = None

    async def _fetch_jwks(self) -> Dict[str, Any]:
        """Fetch JWKS from the authorization server."""
        try:
            async with httpx.AsyncClient(verify=self.ssl_verify) as client:
                response = await client.get(self.jwks_url)
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Failed to fetch JWKS from {self.jwks_url}: {e}")
            raise

    async def _get_jwks(self) -> Dict[str, Any]:
        """Get JWKS, using cache if available."""
        if self._jwks_cache is None:
            self._jwks_cache = await self._fetch_jwks()
        return self._jwks_cache

    def _get_signing_key(self, token_header: Dict[str, Any], jwks: Dict[str, Any]) -> str:
        """Extract the signing key from JWKS based on token header."""
        kid = token_header.get('kid')
        if not kid:
            raise ValueError("Token header missing 'kid' field")

        for key in jwks.get('keys', []):
            if key.get('kid') == kid:
                # Convert JWK to PEM format for PyJWT
                return RSAAlgorithm.from_jwk(key)

        raise ValueError(f"Unable to find matching key for kid: {kid}")

    async def validate_token(self, token: str) -> Dict[str, Any]:
        """
        Validate a JWT token and return the decoded payload.

        Args:
            token: The JWT token to validate
            
        Returns:
            Dict containing the decoded token payload with additional metadata

        Raises:
            ValueError: If token validation fails
        """
        try:
            # Decode header without verification to get the key ID
            unverified_header = jwt.get_unverified_header(token)

            # Get JWKS
            jwks = await self._get_jwks()

            # Get the signing key
            signing_key = self._get_signing_key(unverified_header, jwks)

            # Decode and verify the token
            payload = jwt.decode(
                token,
                signing_key,
                algorithms=['RS256'],
                issuer=self.issuer,
                audience=self.audience,
                options={
                    "verify_signature": True,
                    "verify_exp": True,
                    "verify_iat": True,
                    "verify_iss": True,
                    "verify_aud": True
                }
            )

            # Add metadata to the payload
            payload['_validated_by'] = 'JWTValidator'
            payload['_issuer'] = self.issuer
            payload['_audience'] = self.audience

            return payload

        except jwt.ExpiredSignatureError:
            raise ValueError("Token has expired")
        except jwt.InvalidAudienceError:
            raise ValueError("Invalid audience")
        except jwt.InvalidIssuerError:
            raise ValueError("Invalid issuer")
        except jwt.InvalidSignatureError:
            raise ValueError("Invalid token signature")
        except jwt.DecodeError:
            raise ValueError("Invalid token format")
        except Exception as e:
            logger.error(f"Token validation error: {e}")
            raise ValueError(f"Token validation failed: {e}")


def create_jwt_validator(jwks_url: str, issuer: str, audience: str, ssl_verify: bool = True) -> JWTValidator:
    """
    Factory function to create a JWT validator instance.
    
    Args:
        jwks_url: The URL to fetch JWKS from
        issuer: Expected token issuer
        audience: Expected token audience
        ssl_verify: Whether to verify SSL certificates
        
    Returns:
        JWTValidator: Configured validator instance
    """
    return JWTValidator(jwks_url, issuer, audience, ssl_verify)
```

</details>

Update `main.py` to enable authentication. This:

- Creates a `JWTTokenVerifier` that validates tokens from {{ product_name }}.
- Passes the verifier and OAuth settings into `FastMCP` so the server knows how to secure the `/mcp` endpoint.
- Protects MCP tools, allowing only authenticated clients to call them by validating each incoming token before the tool logic is executed.

```python title="main.py"
import os
from dotenv import load_dotenv
from pydantic import AnyHttpUrl
from typing import Optional

from mcp.server.auth.provider import AccessToken, TokenVerifier
from mcp.server.auth.settings import AuthSettings
from mcp.server.fastmcp import FastMCP
from jwt_validator import JWTValidator
import logging

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class JWTTokenVerifier(TokenVerifier):
    """JWT token verifier using Asgardeo JWKS."""

    def __init__(self, jwks_url: str, issuer: str, client_id: str):
        self.jwt_validator = JWTValidator(
            jwks_url=jwks_url,
            issuer=issuer,
            audience=client_id,
            ssl_verify=True  # Always verify SSL in production; only disable for local dev with self-signed certs
        )

    async def verify_token(self, token: str) -> Optional[AccessToken]:
        try:
            # Validate the JWT token
            payload = await self.jwt_validator.validate_token(token)

            # Extract information from the validated token
            expires_at = payload.get("exp")
            scopes = payload.get("scope", "").split() if payload.get("scope") else []
            subject = payload.get("sub")
            audience = payload.get("aud")
            aut = payload.get("aut")
            act = payload.get("act")

            # This logging is for troubleshooting purposes only. 
            # In production, adjust log levels and mask/redact sensitive claims. 
            logger.info("[JWT VALID] " + ", ".join(
                [f"sub={subject}", f"aut={aut}", f"scopes={scopes}"] +
                ([f"act={act}"] if act else [])
            ))

            return AccessToken(
                token=token,
                client_id=audience if isinstance(audience, str) else self.jwt_validator.audience,
                scopes=scopes,
                expires_at=str(expires_at) if expires_at else None
            )
        except ValueError as e:
            logger.warning(f"Token validation failed: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error during token validation: {e}")
            return None


AUTH_ISSUER = os.getenv("AUTH_ISSUER")
CLIENT_ID = os.getenv("CLIENT_ID")
JWKS_URL = os.getenv("JWKS_URL")

# Validate that required environment variables are set
if not all([AUTH_ISSUER, CLIENT_ID, JWKS_URL]):
    raise ValueError("Missing required environment variables: AUTH_ISSUER, CLIENT_ID, or JWKS_URL")

# Create FastMCP instance as a Resource Server
mcp = FastMCP(
    "Addition Tool",
    # Utilizing Asgardeo for Token Verification
    token_verifier=JWTTokenVerifier(JWKS_URL, AUTH_ISSUER, CLIENT_ID),
    # Auth settings for RFC 9728 Protected Resource Metadata
    auth=AuthSettings(
        issuer_url=AnyHttpUrl(AUTH_ISSUER),
        resource_server_url=AnyHttpUrl("http://localhost:8000"),  # This MCP server's URL
    ),
)


@mcp.tool()
async def add(a: float, b: float) -> dict[str, float]:
    """Add two numbers and return the result."""
    return {
        "a": a,
        "b": b,
        "result": a + b,
    }


if __name__ == "__main__":
    mcp.run(transport="streamable-http") # Runs on port 8000 by default
```

## Project Structure

Your project folder should now look like this:

``` bash
├── main.py              # Main FastMCP server
├── jwt_validator.py     # JWT validation logic
└── .env                 # Your Asgardeo configs
```

## Run the Server

Start your local server:

``` bash
  python main.py
```

Your MCP server is now running at `http://localhost:8000`. This uses Streamable-HTTP, which is compatible with the MCP Inspector.

## Test the MCP server with authentication

Use MCP Inspector to test the authenticated MCP server:

```bash
   npx @modelcontextprotocol/inspector http://localhost:8000/mcp
```

- In the MCP inspector, open the *Authentication* settings on the left panel. Under *OAuth 2.0 Flow*, provide the `client-id` obtained earlier in this guide.
- Click *Connect*, the inspector will prompt for authentication. Follow the OAuth flow to obtain a bearer token from {{ product_name }}.

!!! Info
    You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

- Once the authentication is complete, you should be able to view the resources and invoke the tools exposed by the MCP server.
- Unauthenticated requests to `/mcp` (e.g., via curl without Authorization header) will return **401 Unauthorized** responses with the appropriate **WWW-Authenticate** header.

!!! Important
    With CORS enabled, browser-based clients should connect without errors. For production, customize CORS origins and explore SDK docs for advanced features like stateful sessions.

[//] STEPS_END
