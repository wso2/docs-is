# Asgardeo outbound IP addresses

Asgardeo uses the following outbound IP addresses for its production environments. If your network security settings require allowlisting specific IPs, refer to the corresponding IPs for your region.

!!! warning "Note"

    These IP addresses may change over time. To ensure uninterrupted access, regularly check this page for the latest updates.

## European (EU) region

<table>
    <tr>
        <th>Primary region</th>
        <th>Disaster Recovery (DR) region</th>
    </tr>
    <tr>
        <td>
            20.105.55.120/30</br></br>
            20.54.29.224/30
        </td>
        <td>
            20.13.49.72/30</br></br>
            20.13.49.64/30
        </td>
    </tr>
</table>


## United States (US) region

<table>
    <tr>
        <th>Primary region</th>
        <th>Disaster Recovery (DR) region</th>
    <tr>
    <tr>
        <td>
            20.75.101.160/30</br></br>
            20.22.127.196/30</br></br>
            20.75.70.112/30
        </td>
        <td>
            20.84.237.36/30</br></br>
            20.112.208.212/30
        </td>
    </tr>
</table>

- These IP addresses facilitate outbound communication from Asgardeo's infrastructure.

- If you have firewalls or network security policies in place, ensure these IPs are allowlisted to maintain seamless connectivity.

- Disaster Recovery regions are only activated in the event of a failure in the primary region.