# Write a Custom Workflow Template

You may have already tried out workflow support for user store operations where you can configure user store operations to get approved at one or more steps.

Multi-step approval is a very simple example of flows that can be used with IS workflow feature, but users are allowed define different types of configurable flows by adding a new workflow template.

---
  

## Add a new workflow template

A workflow template defines a configurable flow. It is an abstract representation of a workflow. You can add a new template by creating a custom bundle as below and copying it to the `<IS_HOME>/repository/components/dropins` folder.   

First, you need to create a `SampleTemplate` class which extends the [AbstractTemplate](https://github.com/wso2/carbon-identity-framework/blob/master/components/workflow-mgt/org.wso2.carbon.identity.workflow.mgt/src/main/java/org/wso2/carbon/identity/workflow/mgt/template/AbstractTemplate.java) class. The following methods should be overridden:

-   `getInputData()` -  Provides the parameter definition required by the
    template.

-   `getTemplateId()` - Should return the template Id which should be
    unique.

-   `getName()` - Returns a user friendly name for the template. This will
    be the name shown at the admin UI.

-   `getDescription()` - Returns a description about this template.

??? example "Click to view a sample class written for a multi-step approval template"
    ```
    public class SampleTemplate extends AbstractTemplate {
    
        public SampleTemplate(String metaDataXML) throws WorkflowRuntimeException {
            super(metaDataXML);
        }
    
        @Override
        protected InputData getInputData(String parameterName) throws WorkflowException {
            return null;
        }
    
        @Override
        public String getTemplateId() {
            return TEMPLATE_ID;
        }
    
        @Override
        public String getName() {
            return APPROVAL_TEMPLATE_NAME;
        }
    
        @Override
        public String getDescription() {
            return DESCRIPTION;
        }
    }
    ```

The configurable details of the template such as `Template ID`, `Template Name`, `Template Meta Data`, etc. should be separately defined
in an xml file like shown below.   

``` xml
<met:MetaData xmlns:met="http://metadata.bean.mgt.workflow.identity.carbon.wso2.org">
    <met:Template>
        <met:TemplateId>SampleTemplate</met:TemplateId>
        <met:TemplateName>SampleTemplate</met:TemplateName>
        <met:TemplateDescription>Sample Template</met:TemplateDescription>
        <met:ParametersMetaData xmlns:met="http://metadata.bean.mgt.workflow.identity.carbon.wso2.org">
            <met:ParameterMetaData Name="UserAndRole" InputType="Multiple_Steps_User_Role" isRequired="true">
                <met:DisplayName>User and Role</met:DisplayName>
            </met:ParameterMetaData>
        </met:ParametersMetaData>
    </met:Template>
</met:MetaData>
```

Finally in the service component, register this template at activation. You can do this as follows. 

``` xml
bundleContext.registerService(AbstractTemplate.class, new SampleTemplate(readFileContent(Constants.TEMPLATE_PARAMETER_METADATA_FILE_NAME)), null);
```
  
Next, add a concrete implementation of this template.

----

## Add a workflow template implementation

The template implementation defines how the template should be deployed and executed. Optionally, you can write this as a separate bundle and
copy it to the `<IS_HOME>/repository/components/dropins` folder.

The implementations can be written by extending the [AbstractWorkflow](https://github.com/wso2/carbon-identity-framework/blob/master/components/workflow-mgt/org.wso2.carbon.identity.workflow.mgt/src/main/java/org/wso2/carbon/identity/workflow/mgt/workflow/AbstractWorkflow.java) class. The following method should be overridden:

-   `getInputData()` -  Returns a parameter definition required by the template implementation.

    ??? example "Click to view a sample class written for a sample template"
        ``` java
        public class SampleTemplateImplementation extends AbstractWorkflow {

            private final static Log log = LogFactory.getLog(SampleTemplateImplementation.class);

            public SampleTemplateImplementation(Class<? extends TemplateInitializer> templateInitializerClass,
                                                Class<? extends WorkFlowExecutor> workFlowExecutorClass, String metaDataXML) {
                super(templateInitializerClass, workFlowExecutorClass, metaDataXML);
            }

            @Override
            protected InputData getInputData(ParameterMetaData parameterMetaData) throws WorkflowException {
                InputData inputData = null;
                if (parameterMetaData != null && parameterMetaData.getName() != null) {
                    String parameterName = parameterMetaData.getName();
                    if ("BPSProfile".equals(parameterName)) {
                        inputData = new InputData();
                        MapType mapType = new MapType();
                        inputData.setMapType(mapType);
                        Item item = new Item();
                        item.setKey("embeded_bps");
                        item.setValue("embeded_bps");
                        mapType.setItem(new Item[]{item});
                    } else if ("HTSubject".equals(parameterName)) {
                        inputData = new InputData();
                        MapType mapType = new MapType();
                        inputData.setMapType(mapType);
                        Item item1 = new Item();
                        item1.setKey("subject1");
                        item1.setValue("subject1");
                        Item item2 = new Item();
                        item2.setKey("subject2");
                        item2.setValue("subject2");
                        mapType.setItem(new Item[]{item1, item2});
                    }
                }
                return inputData;
            }

            @Override
            public void deploy(List<Parameter> parameterList) throws WorkflowException {
                super.deploy(parameterList);
            }
        }
        ```

    The configurable details of the template implementation such as `Template ID`, `Template Implementation ID`, `Template Implementation Meta Data`, etc. should be separately defined in xml file like below.

    ``` xml
    <met:MetaData xmlns:met="http://metadata.bean.mgt.workflow.identity.carbon.wso2.org">
        <met:WorkflowImpl>
            <met:WorkflowImplId>SampleWorkflow</met:WorkflowImplId>
            <met:WorkflowImplName>SampleWorkflow</met:WorkflowImplName>
            <met:WorkflowImplDescription>Sample Workflow</met:WorkflowImplDescription>
            <met:TemplateId>SampleTemplate</met:TemplateId>
            <met:ParametersMetaData>
                <met:ParameterMetaData Name="BPSProfile" InputType="Select" isRequired="true" isInputDataRequired="true">
                    <met:DisplayName>BPS Profile(Server Profile Name)</met:DisplayName>
                </met:ParameterMetaData>
                <met:ParameterMetaData Name="HTSubject" InputType="Select" isRequired="true" isInputDataRequired="true">
                    <met:DisplayName>Task Subject(Approval task subject to display)</met:DisplayName>
                </met:ParameterMetaData>
            </met:ParametersMetaData>
        </met:WorkflowImpl>
    </met:MetaData>
    ```

Finally, in the service component, we need to register this template at activation as follows.

``` java
bundleContext.registerService(AbstractWorkflow.class, new SampleTemplateImplementation(BPELDeployer.class, RequestExecutor.class, readFileContent(Constants.WORKFLOW_IMPL_PARAMETER_METADATA_FILE_NAME)), null);
```

Now, when adding a new workflow, you will get a drop-down menu to select which template to follow in that workflow.

![Workflow template selection](../../../assets/img/extend/workflow-template-selection.png)

The source of the sample which was used for this documentation can be found [here](https://github.com/wso2/samples-is/tree/master/workflow/template/sample-template).
