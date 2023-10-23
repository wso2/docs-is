# Publishing a XACML Policy

!!! tip "Before you begin"
    
    Before publishing a XACML policy to the Policy Decision Point (PDP), you
    need to create the policy first. For more information on how to create a
    XACML policy, see [Creating a XACML Policy]({{base_path}}/guides/authorization/create-a-policy).
    

In order to use a XACML policy for authorization in WSO2 Identity
Server, you need to publish it to the Policy Decision Point (PDP) where
the authorization decision is made. The policy will not be enforced
unless it is published.

At the point of publishing the policy, the policy in the Policy
Administration Point(PAP) policy store will sync up with PDP policy
store. The PDP will access one or more policies in the Policy
Administration Point(PAP), and other additional information such as
subject, resource, action and environmental resources in the Policy
Information Point(PIP) to make the decision. For more information about
this process, see [XACML system
architecture]({{base_path}}/references/concepts/authorization/access-control).

You can publish a XACML policy to PDP for runtime evaluation using the
instructions in this topic.

1.  Sign in. Enter your username and password to log on to the
    [Management Console]({{base_path}}/setup/getting-started-with-the-management-console).
2.  Navigate to the **Main** menu to access the **Entitlement** menu.
    Click **Policy Administration** under **PAP**.
3.  The policies that you created are listed in the **Available
    Entitlement Policies** table.  
4.  You can publish policies using one of the following options.  
    1.  Click **Publish to My PDP** next to the policy you wish to
        publish - *This will publish the specific policy to PDP.*
    2.  Select the specific policies you wish to publish using the
        checkboxes available and click **Publish** - *This will allow us
        to publish multiple policies at the same time to the PDP.*
    3.  Click **Publish All** to publish all the available policies -
        *This will publish all the policies available in the "Available
        Entitlement Policy" to the PDP*.
    4.  The **Publish Policy** page appears.

5.  Here you can do the following by selecting an option from each
    section.
    	
	a. **Select policy publishing action**
		
	<table>
	<thead>
	<tr class="header">
	<th>Action</th>
	<th>Discription</th>
	</tr>
	</thead>
	<tbody>
	<tr class="odd">
	<td>Add Policy</td>
	<td>The target action of the policy is "CREATE". This option works only for the initial policy publishing process. The policy is published to the PDP and can be viewed by navigating to <strong>PDP&gt;Policy View.</strong></td>
	</tr>
	<tr class="even">
	<td>Update Policy</td>
	<td>The target action of the policy is "UPDATE". This option updates an existing policy that has already been published to the PDP. The existing policy listed in the <strong>Policy View</strong> will be updated.</td>
	</tr>
	<tr class="odd">
	<td>Order Policy</td>
	<td><p>The target action of the policy is "ORDER". This option is used to put the existing published policies in order. The policies will be ordered in descending order in the <strong>Policy View</strong> .</p>
	<p>This is not relevant for the initial policy publishing process.</p></td>
	</tr>
	<tr class="even">
	<td>Enable Policy</td>
	<td><div class="content-wrapper">
	<p>The target action of the policy is "ENABLE". This option enables the policy in the PDP. <img src="{{base_path}}/assets/img/tutorials/enable-policy.png"></p>
	<p>This is not relevant for the initial policy publishing process.<br/>
	</p>
	</div></td>
	</tr>
	<tr class="odd">
	<td>Disable Policy</td>
	<td><div class="content-wrapper">
	<p>The target action of the policy is "DISABLE". This option disables the policy in the PDP.</p>
	<p><img src="{{base_path}}/assets/img/tutorials/disable-policy.png"><br/>
	</p>
	<p>This is not relevant for the initial policy publishing process.</p>
	</div></td>
	</tr>
	<tr class="even">
	<td>Delete Policy</td>
	<td>The target action of the policy is "DELETE". This option deletes an existing published policy in the PDP. The relevant policy will be removed from the <strong>Policy View</strong> in the PDP.</td>
	</tr>
	</tbody>
	</table>
	
	b. **Select policy Enable/Disable**
	
	   -		**Publish As Enabled Policy** - Allows you to enable the policy to be published. This is available by default when publishing to PDP.
	
	   -		**Publish As Disabled Policy** - Allows you to disable the policy to be published.
	
    c. **Select policy order**
    
       -		**Use default policy order** - Sets the default order of a policy as **0**.
       
	   -		**Define policy order** - Allows you to set a policy order according to your preference.

6.  Click **Publish**.
7.  Once you publish, you can see published policies in the **Policy
    View** in the **Entitlement** menu under **PDP**.
8.  By clicking "Edit Order"(2), you can edit the order of the policy
    and the order will be displayed in the policy view(1).

When you have multiple policies published, you can select a policy
combining algorithm from(3) and click **Update**.

When you have multiple ordered policies, the least order will evaluate
first and the policies will evaluate in the ascending order of the order
number(priority). When the priority is high, the order number is low.

  

??? note "Click to view information about policy combining algorithms"
    There are **Policy Combining Algorithms** which are used by *Policy
    Sets* and **Rule Combining Algorithms** which are used by *Policies*.
    Each of the algorithms mentioned below has its Policy Combining
    algorithm and its Rule Combining algorithms as follows:
    
    -   Standard combining algorithms defined in XACML 3.0:
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:rule-combining-algorithm:deny-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:policy-combining-algorithm:deny-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:rule-combining-algorithm:permit-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:policy-combining-algorithm:permit-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:1.0:rule-combining-algorithm:first-applicable
        -   urn:oasis:names:tc<zero-width-space>:xacml:1.0:policy-combining-algorithm:first-applicable
        -   urn:oasis:names:tc<zero-width-space>:xacml:1.0:policy-combining-algorithm:only-one-applicable
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:rule-combining-algorithm:ordered-deny-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:policy-combining-algorithm:ordered-deny-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:rule-combining-algorithm:ordered-permit-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:policy-combining-algorithm:ordered-permit-overrides
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:rule-combining-algorithm:deny-unless-permit
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:rule-combining-algorithm:permit-unless-deny
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:policy-combining-algorithm:deny-unless-permit
        -   urn:oasis:names:tc<zero-width-space>:xacml:3.0:policy-combining-algorithm:permit-unless-deny
    
    These algorithms are explained in detail as follows,
    
    -   **Deny Overrides:**  
        This combining algorithm combines decisions in such a way that if
        any decision is a Deny, then that decision wins.  
        Deny overrides is one of the safest combining algorithms since it
        favors a Deny decision. However, if none of the children return a
        Deny decision, then the combining algorithm will never produce a
        Deny.  
          
    -   **Permit Overrides:**  
        This combining algorithm combines decisions in such a way that if
        any decision is a Permit, then that decision wins.
    
    The permit overrides combining algorithm can be interesting when:
    
    At least one child must return a Permit for access to be granted overall
    regardless of restrictions.
    
    One wants to return all the reasons why access is being denied. This is
    what one could call a “greedy deny overrides”.Forinstanceifthe reason
    for not being able to view a resource is that(a) you are not the owner
    and (b) you are in the wrong department, then we could rework the
    previous example as follows. When any of the deny reason triggers, the
    response would be denied with all the applicable reasons for access
    being denied:
    
    -  **Policy Set (deny overrides)**: role==manager AND action==view AND
            resourceType==resource
    -   **Policy 1 (permit overrides)**
        -   **Rule 1**: deny if resourceOwner != userId + Advice(“you
                    are not the owner of the resource”)
        -   **Rule 2**: deny if rsourceDepartment != userDepartment+
                    Advice(“you are not in the same department as the
                    resource)
    -   **Policy 2**
        -   **Rule 1**: permit
    
    
    -   **First Applicable:**  
        This combining algorithm combines decisions in such a way that the
        final decision returned is the first one produced either of Permit
        or Deny. 
        
        First applicable is useful to shortcut policy evaluation. For
        instance, if a policy set contains a long series of not applicable
        policies and one applicable policy which returns either of Permit or
        Deny, then if that policy comes first and does produce Permit or
        Deny, the PDP will stop there and not process the other siblings.  
    
    -   **Deny Unless Permit \| Permit Unless Deny:**  
    
        In XACML there are 4 possible decisions: Permit, Deny,
        NotApplicable, and Indeterminate. Sometimes, it is desirable to hide
        the NotApplicable and Indeterminate decisions to only allow for
        Permit or Deny. It makes the PEP logic potentially simpler.
    
    -   **Only One Applicable:**
    
		This combining algorithm exists only for policy sets to combine policy
		sets and policies. It cannot be used to combine rules. With this
		combining algorithm, in order for either of a Permit or Deny to be
		returned, then only one of the children must produce a valid decision –
		whether Deny or Permit.
    
    -   **Ordered Deny Overrides \| Ordered Permit Overrides:**  
        The ordered combining algorithms combine decisions in the same way
        as their (unordered) cousins. In, addition they bring the guarantee
        that policies, policy sets, and rules are considered in the order in
        which they are defined. The need to define an ordered combining
        algorithm stems from the fact the XACML specification does not
        specify whether order matters in the deny-overrides and
        permit-overrides combining algorithms.
    
