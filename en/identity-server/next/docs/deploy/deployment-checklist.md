# Deployment Checklist

<table>
     <thead>
          <tr class="header">
               <th><b>Guideline</b></th>
               <th><b>Details</b></th>
          </tr>
     </thead>
     <tbody>
          <tr class="odd">
               <td>Security hardening</td>
               <td>
                    Guidelines for hardening the security of a WSO2 Identity Server deployment in a production environment can be discussed under three high-level categories:
                    <ul>
                         <li>Product-level security</li>
                         <li>OS-level security</li>
                         <li>Network-level security</li>
                    </ul>
                    <b> Related Topics </b>
                    <li><a href="{{base_path}}/deploy/security/security-guidelines/">Security Guidelines for Production Deployment</a></li>
               </td>
          </tr>
          <tr class="even">
               <td>Hostname</td>
               <td>
                    By default, WSO2 Identity Server identifies the hostname of the current machine through the Java API. However, this value sometimes yields erroneous results on some environments. Therefore, users are recommended to configure the hostname by setting the relavent parameter in the <code>&lt;IS_HOME&gt;/repository/conf/deployment.toml</code> file. <br />
                    <b> Related Topics </b>
                    <li><a href="{{base_path}}/deploy/change-the-hostname">Change the hostname</a></li>
               </td>
          </tr>
          <tr class="even">
               <td>Userstores</td>
               <td>
                    <div class="content-wrapper">
                    WSO2 Identity Server offers three choices to store user details:
                    <ul>
                    <li>Using a database</li>
                    <li>Using an LDAP server</li>
                    <li>Using an Active Directory service</li>
                    </ul>
                    The default is the embedded H2 database, with the userstore schema. Like in the case of the registry database, you can switch to a database like Oracle, MySQL, or MSSQL. You can point to an existing LDAP or an Active Directory to make use of existing user bases and grant access privileges based on those userstores.
                    <div class="panel" style="border-width: 1px;">
                    <!-- TODO <div class="panelHeader" style="border-bottom-width: 1px;">
                    <strong>Related topics</strong>
                    </div>
                    <div class="panelContent">
                    <li><a href="{{base_path}}/deploy/work-with-databases/">Working with Databases</a></li>-->
                    </div>
                    </div>
                    </div>
               </td>
          </tr>
          <tr class="odd">
               <td>Tuning WSO2 products</td>
               <td>
                    WSO2 Identity Server has additional guidelines for optimizing the performance of product-specific features. <br />
                    <b>Related Topics</b>
                    <li><a href="{{base_path}}/deploy/performance/performance-tuning-recommendations">Performance Tuning Recommendations</a> </li>
               </td>
          </tr>
          <tr class="odd">
               <td>Firewalls</td>
               <td>
                    <div class="content-wrapper">
                    The following ports must be accessed when operating within a firewall.
                    <ul>
                    <li>9443 - Used by the console and services that use the servlet transport, and is defined in the <code>&lt;IS_HOME&gt;/repository/conf/deployment.toml</code> file.</li>
                    </ul>
                    <div class="panel" style="border-width: 1px;">
                    <div class="panelHeader" style="border-bottom-width: 1px;">
                    <strong>Related topics</strong>
                    </div>
                    <div class="panelContent">
                    <li><a href="{{base_path}}/references/default-ports">Default Ports of WSO2 Identity Server</a> </li>
                    </div>
                    </div>
                    </div>
               </td>
          </tr>
          <tr class="even">
          <td>Proxy servers</td>
          <td>
               <div class="content-wrapper">
               If the product is hosted behind a proxy such as ApacheHTTPD, users can configure products to use the proxy server by providing the following system properties at the start-up.<br /><br />
               <code>
               -Dhttp.proxyHost=xxxx<br>
               -Dhttp.proxyPort=xxxx
               </code>
               <br /><br />
               Alternatively, this can be done by adding the following configurations in the <code>&lt;IS_HOME&gt;/repository/conf/deployment.toml</code> file.<br /><br />
               <code>
               [transport.https.properties]<br>
               proxyhost : "you.proxy.host"<br>
               proxyPort : "your.proxy.port"<br>
               </code>
          </td>
          </tr>
          <tr class="odd">
               <td>High availability</td>
               <td>
                    <div class="content-wrapper">
                    For high availability, WSO2 Identity Server must run on a cluster. Databases used for the repository, user management, and business activity monitoring can also be configured in a cluster or can use replication management provided by the RDBMS.
                    <div class="panel" style="border-width: 1px;">
                    <div class="panelHeader" style="border-bottom-width: 1px;">
                    <!--<strong>Related topics</strong>
                    </div>
                    <div class="panelContent">
                    <ul>
                    <li><a href="TBD:{{base_path}}/administer/clustering-overview">Clustering Overview</a> </li>
                    </ul>
                    </div>-->
                    </div>
                    </div>
               </td>
          </tr>
     <tr class="even">
     <td>Data backup and archiving</td>
     <td>For data backup and for archiving of data, use the functionality provided by the RDBMS.</td>
     </tr>
     </tbody>
</table>