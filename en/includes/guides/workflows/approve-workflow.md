To view the workflow approvals, you need to navigate to the **Approvals** section under the **User Management** in the admin console. Here, you will see a list of approvals that can be approved by you.

![Workflow approval page]({{base_path}}/assets/img/guides/workflows/workflow-approvals.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Approval lifecycle
There are multiple status indicators for the workflow approvals. The status of the approval can be one of the following:

- **Reserved**: The approval is reserved by you and no one else can approve it. This status is set when you claim the approval or when you are the only participant in the approval step.
- **Ready**: The approval is ready to be approved by you. This status is set when multiple participants are involved in the approval step and you are one of them and no one has claimed the approval yet.
- **Approved**: The approval is approved by you.
- **Rejected**: The approval is rejected by you.
- **Blocked**: The approval has claimed by another participant and you cannot approve it.

!!! Note
    Claiming an approval is a way to reserve it for yourself. If you claim an approval, no one else can approve it until you either approve or reject it. This is useful when you want to ensure that you are the only one approving the request.

    Also note that even if you claim an approval, you can still release it back to the pool of approvals so that other participants can approve it.

### View approval details
To view the details of an approval, you can click on the approval in the list. This will open the approval details page where you can see the details of the approval related to the operation.

![Approval details]({{base_path}}/assets/img/guides/workflows/approval-details.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}