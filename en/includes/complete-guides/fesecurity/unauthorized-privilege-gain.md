
It's also important to ensure that components intended for authenticated users are not accessible without logging in. Allowing unauthorized access to such components poses a security risk. Additionally, components designed for higher-privilege users should not be accessible to regular users.


Similar to the role-based access control example provided earlier, you can define access rules for components, specifying whether they can be accessed by unauthenticated users and the roles required for access. The following sample code demonstrates how to define roles for components and redirect unauthenticated or unauthorized users who attempt to access restricted components.

```javascript title="src/main.jsx" hl_lines="15"

const {state, getDecodedIDToken } = useAuthContext();
const [decodedIdToken, setDecodedIdToken] = useState();

useEffect(() => {
  if (state.isAuthenticated) {
    const fetchUserInfo = async () => {
      const info = await getDecodedIDToken();
      setDecodedIdToken(info);
    };
    fetchUserInfo();
  }
}, [state.isAuthenticated, getDecodedIDToken]);

const roleBasedComponent = (Component, requiredRole) => {
  if (!state.isAuthenticated) {
    return <Navigate to="/HomePage" />;
  }
  if (decodedIdToken && decodedIdToken?.roles.includes(requiredRole)) {
    return <Component />;
  }
  return <Navigate to="/AuthPage" />;
};

return (
  <div className="App">
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/HouseOwner/:username" element={roleBasedComponent(HouseOwnerHouseList,"HouseOwner")} />
        <Route path="/house-owner/:houseId" element={ roleBasedComponent(HouseOwnerHouseRequest,"HouseOwner")} />
        <Route path="/Renter" element={roleBasedComponent(Renter,"Renter")} />
        <Route path="/Admin" element={roleBasedComponent(Admin,"Admin")}/>
      </Routes>
    </main>
  </div>
);

```


There can be scenarios where someone else’s user account can be accessed simply by providing its unique identifier. For example, if the user1 can view their user account using, **`http://localhost:3000/user1`** and if the same user can view or modify user2’s account using **`http://localhost:3000/user2`**, it exposes a security concern violating confidentiality and integrity.

![Unauthorized User Account Modifications
]({{base_path}}/assets/img/complete-guides/fesecurity/image9.png){: width="800" style="display: block; margin: 0;"}


To prevent unauthorized access, every API request from the application should include the access token in the authorization header. The API server can then validate the access token and grant access based on the token's owner. You can use the httpRequest method in the Asgardeo SDK to make API calls, which automatically includes the access token in the authorization header. Below is a sample code segment that makes an API call to the SCIM2/Me endpoint in {{product_name}} to retrieve user details. {{product_name}} validates the access token and returns the details of the token's owner if the token is valid. You can also explore additional parameters available in httpRequest.

```javascript title="src/main.jsx" 

export async function getUserDetails () {

	const requestConfig = {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/scim+json"
		},
		method: "GET",
		url: "https://api.asgardeo.io/t/mifrazmurthaja/scim2/Me"
	};

	return auth.httpRequest(requestConfig)
	.then((response) => {
		return response.data;
	})
	.catch((error) => {
		throw new Error('Failed to fetch user profile.');
	});
};



```