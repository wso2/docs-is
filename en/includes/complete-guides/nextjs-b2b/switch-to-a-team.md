
In this step, we implement team switching functionality using {{product_name}}'s Organization Switch grant type. This allows users to switch between different teams they have access to, updating their session with the appropriate tokens and permissions. We can use the built in component from the SDK for this.

![Switch team app]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image13.png){: width="800" style="display: block; margin: 0; border:1px solid lightgrey"}

With the component 'OrganizationSwitcher' that is provided by the SDK, we can list the current Teams as well as Switch Teams. Let's implement this by importing this component and adding it to the page.tsx file.

{% raw %}

```javascript title="app/page.tsx"
'use client'

import {  SignedIn, SignedOut, SignInButton, SignOutButton, User, UserDropdown, UserProfile, SignUpButton,OrganizationSwitcher } from '@asgardeo/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left - Branding or Nav (can add logo here) */}
            <div className="flex items-center space-x-4">
              <SignedIn>
                {/* Add logo or navigation for signed-in users if needed */}
                <span className="text-sm text-gray-600">Welcome to Team Space</span>
              </SignedIn>
              <SignedOut>
                <span className="text-sm text-gray-600">Team Space</span>
              </SignedOut>
            </div>

            {/* Right - User Actions */}
            <div className="flex items-center space-x-3">
              <SignedIn>
                <UserDropdown />
                <SignOutButton />
                  <Link href="/add-organizations">
                  <button className="px-4 py-2 text-white rounded-full hover:opacity-90 transition" style={{ backgroundColor: "#FF7300" }}>
                      Add Teams
                    </button>
                  </Link>
                <OrganizationSwitcher />
              </SignedIn>
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 gap-6 bg-gray-50">
        <SignedIn>
          <User>
            {(user) => (
              <div className="text-lg font-medium text-gray-800">
                Welcome back, {user.userName || user.username || user.sub}
              </div>
            )}
          </User>
          <div className="mt-4">
            <UserProfile />
          </div>
        </SignedIn>
        <SignedOut>
          <p className="text-gray-700">You are not signed in. Please Sign In or Sign Up</p>
        </SignedOut>
      </main>
    </div>
  );
}

```

{% endraw %}
