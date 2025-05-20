
At this point, we’ve successfully implemented login and logout capabilities using the Asgardeo provider for Auth.js. The next step is to explore how to access and display logged-in user details within the app utilizing the callbacks provided by auth.js library. To retrieve user information from the ID token provided by {{product_name}}, the simplest approach is to use the JWT (JSON Web Token) returned during authentication. In auth.js, you can leverage the JWT callback function to access and manipulate this token. The JWT callback is triggered whenever a JWT is created or updated (e.g., at sign-in), making it a great place to include the user's information

Modified the code as below to see logged in user details.

```javascript title="auth.ts" hl_lines="14-29"

import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

declare module "next-auth" {
  interface User {
    username?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.username;
      }

      return token;
    },
    async session({ session, token }) {            
      if (token) {
        session.user.username = token.username as string;
      }

      return session;
    }
  }
})

```
Auth.js is made to work with many identity providers and some of the objects/arguments are not valid or vary from one provider to another. In {{product_name}}, by accessing the `profile` object in the `jwt` callback, we are able to get the information about the user using their decoded ID token information that is received from the profile object. 

Once this user information is returned from the `jwt` callback, we need to pass this data to the `session` object of the `auth()` function. To do that, we will be using the `session` callback. In the `session` callback, `session` is the object that is available in the `auth()` function and `token` object is the object returned from the `jwt` callback.




Then, update `page.tsx` with the following highlighted line to display the username of logged in user.  

```javascript title="page.tsx" hl_lines="4"

...
          <>
            <p> You are now signed in!</p>
            <p> hello {session.user?.username}</p>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </>

...

```



If your Next.js application is already running in the development mode, the home page will be reloaded and you will see the updated user interface.

![Logout screen]({{base_path}}/assets/img/complete-guides/nextjs/image8.png){: width="800" style="display: block; margin: 0;"}



## Getting additional user attributes

By default, {{product_name}} will only send the username in the ID token. But this can be configured in the {{product_name}} console to send any user attribute in the ID token and then that will be available in the profile object.

To get additional user attributes to the ID token, the application should be configured to request the specific user attributes at the time of login. For example, if you want to retrieve a user's mobile number as an attribute, you need to configure the application to request the user’s mobile number as an attribute in the ID token.

1. Log in to the {{product_name}} console and select the application you created.
2. Go to the **User Attributes** tab, expand **Profile** section. 
3. Select the **First Name (given_name)**.
4. Select the **Last Name (family_name))**.
5. Click Update to save the changes.


 

Now, you need to modify the `auth.ts` with the required user attributes as shown in the following example.  


```javascript title="auth.ts" hl_lines="7-8 20-21 29-30"

import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

declare module "next-auth" {
  interface User {
    username?: string;
    given_name?: string;
    family_name?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.username;
        token.given_name = profile.given_name;
        token.family_name = profile.family_name;
      }

      return token;
    },
    async session({ session, token }) {            
      if (token) {
        session.user.username = token.username as string;
        session.user.given_name = token.given_name as string;
        session.user.family_name = token.family_name as string;
      }

      return session;
    }
  }
})

```

Since we are adding new information to the user object inside the `session object` (which is having the interface - User), note that we also have to update the interface to contain this new information.


Then, you can update `page.tsx` as given below to display the above user attributes.  

```javascript title="page.tsx" hl_lines="5-6"

...
          <>
            <p> You are now signed in!</p>
            <p> hello {session.user?.username}</p>
            <p> Given name:  {session.user?.given_name}</p>
            <p> Family name: {session.user?.family_name}</p>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </>

...

```

!!! Tip

    If you don’t get any value for given_name and family_name, it might be because you have not added these values when creating the user in {{product_name}}. You can add these values either using the **{{product_name}} console** or logging into the **My Account** of that particular user.


## Displaying user details in the server side

Using the above information from the `session` object. Let's create a `ServerProfile` server component to display the user details. To do this, create a file `/src/app/server-profile/page.tsx` as follows.

```javascript title="/src/app/server-profile/page.tsx"
import { auth } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";
import { redirect } from "next/navigation";

const ServerProfile = async () => {
    const session = await auth();

    const goToIndex = async () => {
        "use server";
        redirect("/");
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <h1 className="mb-5">Profile Page</h1>
            <p>Email: {session?.user?.email}</p>
            <p>First Name: {session?.user?.given_name}</p>
            <p>Last Name: {session?.user?.family_name}</p>
            <form action={goToIndex}>
                <button
                    type="submit"
                    className="rounded-full border border-solid flex items-center justify-center text-sm h-10 px-4 mt-3"
                >
                    Go to index page
                </button>
            </form>
            <div className="mt-5">
                <SignOutButton />
            </div>
        </div>
    );
};

export default ServerProfile;
```

This component is fully server-side rendered and will fetch the user details from the {{product_name}}. The `fetchUserDetails` function is used to fetch the user details from the {{product_name}} using the access token. The `ServerProfile` component will display the user details if the user is logged in. If the user is not logged in, the component will display an error message.

When a user is logged in and if your visit **http://localhost:3000/server-profile**, the following content should be visible:

![Profile screen (server component)]({{base_path}}/assets/img/complete-guides/nextjs/image23.png){: width="800" style="display: block; margin: 0;"}


## Displaying user details in the client side

In previous steps we used session data and retrieved current user information using the session object in the `auth()` function provided by the Auth.js library. What if we wanted to do the same in the client-side? As we can have both client and server components in Next.js, it is important to have both as we want to secure both components using authentication with Next.js and {{product_name}}.

The approach is very similar to server-side components. To demonstrate this, let’s create a user profile component in our application. To get session information in the client-side, you can use the `useSession()` hook offered by Auth.js. Now using this hook, let's create a file `/src/app/client-profile/page.tsx` as follows.

```javascript title="/src/app/client-profile/page.tsx"
"use client";

import { SignOutButton } from "@/components/sign-out-button";
import { useSession } from "next-auth/react";

export default function Profile() {
    const { data: session } = useSession()

    if (!session) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <h1>You need to sign in to view this page</h1>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <h1 className="mb-5">Profile Page</h1>
            <p>Email : {session?.user?.email}</p>
            <p>First Name : {session?.user?.given_name}</p>
            <p>Last Name : {session?.user?.family_name}</p>
            <div className="mt-5">
                <SignOutButton />
            </div>
        </div>
    );
}

```

Since we are accessing the hooks provided by the Auth.js, it is important to wrap the whole application using the `<SessionProvider/>` provider. This can be achieved by wrapping the `/src/app/layout.tsx` file as it is the entry point of the application.

```javascript title="/src/app/profile/page.tsx" hl_lines="14-16"
import { SessionProvider } from "next-auth/react";

...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

```

!!! note
    This a good time to remove the `<SessionProvider/>` we added to the `/src/app/page.tsx` in previous steps as this is no longer required.


When a user is logged in and if your visit http://localhost:3000/client-profile, the following content should be visible:

![Profile screen (client component)]({{base_path}}/assets/img/complete-guides/nextjs/image21.png){: width="800" style="display: block; margin: 0;"}

When a user is not logged in, it should look as follows:

![Profile screen (Not logged in)]({{base_path}}/assets/img/complete-guides/nextjs/image22.png){: width="800" style="display: block; margin: 0;"}


In this step, we further improved our Next.js app to display the user attributes. As the next step, we will try to secure routes within the app.
