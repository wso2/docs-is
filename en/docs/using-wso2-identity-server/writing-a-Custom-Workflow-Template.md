# Writing a Custom Workflow Template

You may have already tried out workflow support for user store
operations where you can configure user store operations to get approved
at one or more steps.

Multi-step approval is a very simple example of flows that can be used
with IS workflow feature, but users are allowed define different types
of configurable flows by adding a new workflow template.

  

# Adding a New Workflow Template

A workflow template defines a configurable flow. It is an abstract
representation of a workflow. You can add a new template by creating a
custom bundle as below and copying it to
repository/components/dropins folder.

  

First, you need to create a SampleTemplate class which extends
AbstractTemplate class. The following methods should be overridden:

-   getInputData() :  Provides the parameter definition required by the
    template.

-   getTemplateId() : Should return the template Id which should be
    unique

-   getName() : Returns a user friendly name for the template. This will
    be the name shown at the admin UI

-   getDescription(): Returns a description about this template

Following is a sample class written for a multi-step approval template.

  

<table>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">public</span> <span class="kw">class</span> SampleTemplate <span class="kw">extends</span> AbstractTemplate {</a>
<a class="sourceLine" id="cb1-2" title="2"></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">public</span> <span class="fu">SampleTemplate</span>(<span class="bu">String</span> metaDataXML) <span class="kw">throws</span> WorkflowRuntimeException {</a>
<a class="sourceLine" id="cb1-4" title="4">        <span class="kw">super</span>(metaDataXML);</a>
<a class="sourceLine" id="cb1-5" title="5">    }</a>
<a class="sourceLine" id="cb1-6" title="6"></a>
<a class="sourceLine" id="cb1-7" title="7">    <span class="at">@Override</span></a>
<a class="sourceLine" id="cb1-8" title="8">    <span class="kw">protected</span> InputData <span class="fu">getInputData</span>(<span class="bu">String</span> parameterName) <span class="kw">throws</span> WorkflowException {</a>
<a class="sourceLine" id="cb1-9" title="9">        <span class="kw">return</span> <span class="kw">null</span>;</a>
<a class="sourceLine" id="cb1-10" title="10">    }</a>
<a class="sourceLine" id="cb1-11" title="11"></a>
<a class="sourceLine" id="cb1-12" title="12">    <span class="at">@Override</span></a>
<a class="sourceLine" id="cb1-13" title="13">    <span class="kw">public</span> <span class="bu">String</span> <span class="fu">getTemplateId</span>() {</a>
<a class="sourceLine" id="cb1-14" title="14">        <span class="kw">return</span> TEMPLATE_ID;</a>
<a class="sourceLine" id="cb1-15" title="15">    }</a>
<a class="sourceLine" id="cb1-16" title="16"></a>
<a class="sourceLine" id="cb1-17" title="17">    <span class="at">@Override</span></a>
<a class="sourceLine" id="cb1-18" title="18">    <span class="kw">public</span> <span class="bu">String</span> <span class="fu">getName</span>() {</a>
<a class="sourceLine" id="cb1-19" title="19">        <span class="kw">return</span> APPROVAL_TEMPLATE_NAME;</a>
<a class="sourceLine" id="cb1-20" title="20">    }</a>
<a class="sourceLine" id="cb1-21" title="21"></a>
<a class="sourceLine" id="cb1-22" title="22">    <span class="at">@Override</span></a>
<a class="sourceLine" id="cb1-23" title="23">    <span class="kw">public</span> <span class="bu">String</span> <span class="fu">getDescription</span>() {</a>
<a class="sourceLine" id="cb1-24" title="24">        <span class="kw">return</span> DESCRIPTION;</a>
<a class="sourceLine" id="cb1-25" title="25">    }</a>
<a class="sourceLine" id="cb1-26" title="26">}</a></code></pre></div>
</div>
</div>
<div class="container" title="Hint: double-click to select code">
<p><br />
</p>
</div>
<p><br />
</p>
</div></td>
</tr>
</tbody>
</table>

The configurable details of the template such as “Template ID”,
“Template Name”, “Template Meta Data”, etc. should be separately defined
in xml file like below.

  

``` java
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

  

The finally in the service component, we need to register this template
at activation. We can do this as follows.

  

``` java
bundleContext.registerService(AbstractTemplate.class, new SampleTemplate(readFileContent(Constants.TEMPLATE_PARAMETER_METADATA_FILE_NAME)), null);
```

  
Now we need to add a concrete implementation of this template.

# Adding a Workflow Template Implementation

The template implementation defines how the template should be deployed
and executed. Optionally you can write this as a separate bundle and
copy into repository/components/dropins folder.

The implementations can be written by extending the AbstractWorkflow
class. The following methods should be overridden:

-   getInputData() :  Returns a parameter definition required by the
    template implementation

The following shows a sample class written for a sample template.

``` java
public class SampleTemplateImplementation extends AbstractWorkflow {

    private static Log log = LogFactory.getLog(SampleTemplateImplementation.class);

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

The configurable details of the template implementation such as
“Template ID”, “Template Implementation ID”, “Template Implementation
Meta Data”, etc. should be separately defined in xml file like below.

``` java
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

Finally, in the service component, we need to register this template at
activation as follows.

``` java
bundleContext.registerService(AbstractWorkflow.class, new SampleTemplateImplementation(BPELDeployer.class, RequestExecutor.class, readFileContent(Constants.WORKFLOW_IMPL_PARAMETER_METADATA_FILE_NAME)), null);
```

Now when adding a new workflow, you will get a drop-down menu to select
which template to follow in that workflow.

![]( ../../assets/img/103330093/103330094.png)

Source of the sample which used for this documentation can be found
[here](https://github.com/wso2/product-is/tree/5.x.x/modules/samples/workflow/template/sample-template)
.
