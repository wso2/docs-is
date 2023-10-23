# Uninstalling the product

To remove an already installed product, follow the instructions below:

<table>
<thead>
<tr class="header">
<th>OS</th>
<th>Instructions</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Mac OS</td>
<td><div class="content-wrapper">
<p>Open a terminal and run the following command as the root user:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" 
data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code 
class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">sudo bash &lt;IS_HOME&gt;/&lt;VERSION&gt;/uninstall.<span class="fu">sh</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Windows</td>
<td>
<li>Go to the <strong>Start Menu -&gt; Programs -&gt; WSO2 -&gt; Uninstall &lt;PRODUCT_NAME_VERSION&gt;</strong> or 
search <strong>Uninstall &lt;PRODUCT_NAME_VERSION&gt;</strong> and click the shortcut icon. This will uninstall the 
product from your computer. </li>
<li><b>NOTE:</b> The above path is provided assuming the IS_HOME is in <code>C:/Program 
Files/WSO2/&lt;PRODUCT_NAME>/&lt;VERSION></code></li>
</td>
</tr>
<tr class="odd">
<td>Ubuntu</td>
<td><div class="content-wrapper">
<p>Open a terminal and run the following command:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">sudo apt-get purge &lt;PRODUCT_DISTRIBUTION_NAME&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>CentOS</td>
<td><div class="content-wrapper">
<p>Open a terminal and run the following command:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">sudo yum remove &lt;PRODUCT_DISTRIBUTION_NAME&gt;-x86_<span class="dv">64</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>