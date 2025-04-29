
In this step, we implement team switching functionality using Asgardeo's Organization Switch grant type. This allows users to switch between different teams they have access to, updating their session with the appropriate tokens and permissions.

![Switch team app]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image13.png){: width="800" style="display: block; margin: 0; border:1px solid lightgrey"}

## Create API route

Create a new API route at `app/api/switch-org/route.ts` to handle team switching:

```javascript title="app/api/switch-org/route.ts"
import { NextResponse } from "next/server"
import { Session } from "@auth/core/types"
import { auth } from "@/app/auth"

export async function POST(req: Request) {
    // Implementation
}
```

## Implementation

Now that you have created your API route, follow the steps below to implement the team switching functionality. The POST method handler will manage token exchange and session updates when switching between teams.

This organization switching endpoint uses the `Organization Switch` grant type to obtain new tokens scoped to the target organization. These tokens will have the appropriate permissions and context for the selected team.

1. Validate Request Parameters

    First, extract and validate the organization ID from the request body:

    ```javascript title="app/api/switch-org/route.ts"
    try {
        const { orgId } = await req.json()

        if (!orgId) {
            return NextResponse.json(
                { error: "Missing organization ID" }, 
                { status: 400 }
            )
        }

        const accessToken = session?.user?.access_token
    ```

2. Prepare Token Exchange

    Set up the authentication headers and parameters for the organization switch:

    ```javascript title="app/api/switch-org/route.ts"
    // Create Basic Auth header
    const authHeader = Buffer.from(
        `${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ID}:${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_SECRET}`
    ).toString("base64")

    // Prepare token exchange parameters
    const params = new URLSearchParams()
    params.append("grant_type", "organization_switch")
    params.append("switching_organization", orgId)
    params.append("token", accessToken!)
    params.append("scope", process.env.NEXT_PUBLIC_AUTH_SCOPE!)
    ```

3. Exchange Tokens

    Make the request to exchange tokens for the new organization:

    ```javascript title="app/api/switch-org/route.ts"
    // Request new tokens
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ISSUER}`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${authHeader}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        }
    )

    if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.status}`)
    }
    ```

4. Return New Tokens

    Validate and return the new tokens:

    ```javascript title="app/api/switch-org/route.ts"
    const data = await response.json()

    // Validate token response
    if (!data.access_token || !data.id_token) {
        throw new Error("Invalid token response")
    }

    return NextResponse.json({
        accessToken: data.access_token,
        id_token: data.id_token,
    })
    ```

## Component implementation

To implement team switching in the app, you'll need to create components that interact with the API routes we've established. The key components include a team list with switching functionality and session management to handle token updates.

### Configure session updates

The `auth.js` file needs to be configured to handle session updates when switching between teams. The built-in `update()` method from the `useSession()` hook allows us to modify the session data, but we need to configure the JWT callback to process these updates and store the new tokens.

Let's configure the JWT callback in our `auth.ts` file as follows:

```javascript title="auth.ts" hl_lines="2 12-23"
callbacks: {
    async jwt({ token, profile, account, trigger, session }) {
        if (profile) {
            token.email = profile?.username as string;
        }

        if (account) {
            token.access_token = account?.access_token;
            token.id_token = account?.id_token;
        }

        // Handle session updates when team switching.
        if (trigger === "update") {
            // Update access token when provided in session update
            if (session?.user?.access_token) {
                token.access_token = session.user.access_token;
            }

            // Update ID token when provided in session update
            if (session?.id_token) {
                token.id_token = session.id_token;
            }
        }

        return token;
    },
    // Other callbacks...
}
```

### Implement team switching in component

We can update the `TeamList` component that we created in **step 9** to provide functionality to switch between teams. Let's look at the highlighted code that handles team switching.

```javascript title="components/TeamList.tsx" hl_lines="6 15-58 74-79"
"use client";

export default function TeamList() {
    const [teams, setTeams] = useState([]);
    const [switchingTeamId, setSwitchingTeamId] = useState(null);
    const { data: session, update } = useSession();

    useEffect(() => {
        async function fetchTeams() {
            // fetch teams from route.
        }
        fetchTeams();
    }, []);

    // Handle team switching
    async function switchToTeam(teamId) {
        // Set the current team as switching (for UI feedback)
        setSwitchingTeamId(teamId);
        
        try {
            // Call the API route we created at app/api/switch-org/route.ts
            const response = await fetch("/api/switch-org", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orgId: teamId,
                }),
            });
            
            if (!response.ok) {
                throw new Error("Failed to switch team");
            }
            
            // Get the new tokens from the response
            const data = await response.json();
            
            // Update the session with the new tokens
            await update({
                ...session,
                user: {
                    ...session.user,
                    access_token: data.accessToken,
                },
                id_token: data.id_token,
            });
            
            // Reload the page to reflect the new team context
            window.location.reload();
        } catch (error) {
            console.error("Error switching team:", error);
            alert("Failed to switch team. Please try again.");
        } finally {
            // Reset the switching state
            setSwitchingTeamId(null);
        }
    }

    return (
        <div className="team-list">
            <h2>Your Teams</h2>
            
            {teams.length === 0 ? (
                <p>No teams found. Create your first team!</p>
            ) : (
                <ul>
                    {teams.map((team) => (
                        <li key={team.id}>
                            <div>
                                <h3>{team.name}</h3>
                                {team.description && <p>{team.description}</p>}
                            </div>
                            <button 
                                onClick={() => switchToTeam(team.id)}
                                disabled={switchingTeamId === team.id}
                            >
                                {switchingTeamId === team.id ? "Switching..." : "Switch to Team"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

```

!!! Note
    Refer to Step 4 of the GitHub [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app){:target="\_blank"} for the complete implementation.
