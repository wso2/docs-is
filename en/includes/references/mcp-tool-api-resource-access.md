# API Resources and Scopes Required for MCP Tools

The following table includes the API Resources and Scopes required to be authorized for each MCP Tool supported in Asgardeo MCP Server.

<table>
    <thead>
        <tr>
            <th>MCP Tool</th>
            <th>API Resource</th>
            <th>Scopes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>list_applications</code></td>
            <td> Application Management API (<code>/api/server/v1/applications</code>)</td>
            <td><code>internal_application_mgt_view</code></td>
        </tr>
        <tr>
            <td><code>create_single_page_app</code></td>
            <td> Application Management API (<code>/api/server/v1/applications</code>)</td>
            <td><code>internal_application_mgt_create</code></td>
        </tr>
        <tr>
            <td><code>create_webapp_with_ssr</code></td>
            <td> Application Management API (<code>/api/server/v1/applications</code>)</td>
            <td><code>internal_application_mgt_create</code></td>
        </tr>
        <tr>
            <td><code>create_mobile_app</code></td>
            <td> Application Management API (<code>/api/server/v1/applications</code>)</td>
            <td><code>internal_application_mgt_create</code></td>
        </tr>
        <tr>
            <td><code>create_m2m_app</code></td>
            <td> Application Management API (<code>/api/server/v1/applications</code>)</td>
            <td><code>internal_application_mgt_create</code></td>
        </tr>
        <tr>
            <td rowspan="3"><code>get_application_by_name</code></td>
            <td>Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_create</code></td>
        </tr>
        <tr>
            <td>Claim Management API (<code>/api/server/v1/claim-dialects</code>)</td>
            <td><code>internal_claim_meta_view</code></td>
        </tr>
        <tr>
            <td>OIDC Scope Management API (<code>/api/server/v1/oidc/scopes</code>)</td>
            <td><code>internal_oidc_scope_mgt_view</code></td>
        </tr>
        <tr>
            <td rowspan="3"><code>get_application_by_client_id</code></td>
            <td>Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_create</code></td>
        </tr>
        <tr>
            <td>Claim Management API (<code>/api/server/v1/claim-dialects</code>)</td>
            <td><code>internal_claim_meta_view</code></td>
        </tr>
        <tr>
            <td>OIDC Scope Management API (<code>/api/server/v1/oidc/scopes</code>)</td>
            <td><code>internal_oidc_scope_mgt_view</code></td>
        </tr>
        <tr>
            <td><code>update_application_basic_info</code></td>
            <td>Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_update</code></td>
        </tr>
        <tr>
            <td rowspan="2"><code>update_application_oauth_config</code></td>
            <td rowspan="2">Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_view</code></td>
        </tr>
        <tr>
            <td><code>internal_application_mgt_update</code></td>
        </tr>
        <tr>
            <td><code>update_application_claim_config</code></td>
            <td>Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_update</code></td>
        </tr>
        <tr>
            <td><code>authorize_api</code></td>
            <td>Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_update</code></td>
        </tr>
        <tr>
            <td><code>list_authorized_api</code></td>
            <td>Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_view</code></td>
        </tr>
        <tr>
            <td rowspan="5"><code>update_login_flow</code></td>
            <td rowspan="2">Application Management API (<code>/api/server/v1/applications</code>)</td> 
            <td><code>internal_application_mgt_view</code></td>
        </tr>
        <tr>
            <td><code>internal_application_mgt_update</code></td>
        </tr>
        <tr>
            <td>Authenticators Management API(<code>/api/server/v1/authenticators</code>)</td> 
            <td><code>internal_authenticator_view</code></td>
        </tr>
        <tr>
            <td>Identity Provider Management API (<code>/api/server/v1/identity-providers</code>)</td> 
            <td><code>internal_idp_view</code></td>
        </tr>
        <tr>
            <td>Claim Management API (<code>/api/server/v1/claim-dialects</code>)</td> 
            <td><code>internal_claim_meta_view</code></td>
        </tr>
        <tr>
            <td><code>list_api_resources</code></td>
            <td>API Resource Management API (<code>/api/server/v1/api-resources</code>)</td> 
            <td><code>internal_api_resource_view</code></td>
        </tr>
        <tr>
            <td><code>search_api_resources_by_name</code></td>
            <td>API Resource Management API (<code>/api/server/v1/api-resources</code>)</td> 
            <td><code>internal_api_resource_view</code></td>
        </tr>
        <tr>
            <td><code>get_api_resource_by_identifier</code></td>
            <td>API Resource Management API (<code>/api/server/v1/api-resources</code>)</td> 
            <td><code>internal_api_resource_view</code></td>
        </tr>
        <tr>
            <td><code>create_api_resource</code></td>
            <td>API Resource Management API (<code>/api/server/v1/api-resources</code>)</td> 
            <td><code>internal_api_resource_create</code></td>
        </tr>
        <tr>
            <td><code>create_user</code></td>
            <td>SCIM2 Users API (<code>/scim2/Users</code>)</td> 
            <td><code>internal_user_mgt_create</code></td>
        </tr>
        <tr>
            <td><code>list_claims</code></td>
            <td>Claim Management API (<code>/api/server/v1/claim-dialects</code>)</td> 
            <td><code>internal_claim_meta_view</code></td>
        </tr>
    </tbody>
</table>
