Choose an attribute from the local attributes listed in the **Subject attribute** dropdown. 

!!! note 
    If you want to choose an attribute from the local claim dialect from the dropdown that is not present in `http://wso2.org/oidc/claim`, you need to first add it  to the OpenID Connect dialect. Follow the instructions given below to do this. 

    1.  Choose **Attribute dialects** from the left panel. 

    2.  Click the edit icon adjacent to `http://wso2.ord/oidc/claim` in the list. 

    3.  Click **Add new external attribute**. 

    4.  In the pop-up that appears, enter an appropriate name for the attribute URI that you want to add and choose the local attribute URI you want to map it to. 

    5.  Click **Save**. 

    Now you can choose this attribute as the value for your subject attribute.  


![subject-attribute](../../assets/img/fragments/subject-uri-username.png))