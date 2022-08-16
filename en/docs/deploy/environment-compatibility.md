# Environment Compatibility


## Tested operating systems and JDKs

As WSO2 Identity Server is a Java application, you can generally run it on most operating systems. Following are the operating systems and JDKs that WSO2 Identity Server is tested with:

<table>
	<tr>
		<th>Supported JDK versions</th>	
		<td>
			<ul>
				<li>OpenJDK 11</li>
				<li>OpenJDK 17</li>
				<li>Oracle JDK 11</li>
				<li>Oracle JDK 17</li>
				<li>AdoptOpenJDK 11</li>
			</ul>
		</td>
	</tr>
	<tr>
		<th>Supported Operating Systems</th>
		<td>
			<ul>
				<li>Ubuntu 20.04</li>
				<li>CentOS 7</li>
				<li>Windows Server 2016</li>
				<li>Windows Server 2012 R2</li>
				<li>Windows 10</li>
				<li>Windows 11</li>
				<li>macOS x86_64</li>
				<li>macOS M1</li>
			</ul>
		</td>
	</tr>
</table>

---

## Tested DBMSs

WSO2 Identity Server supports the following DBMSs:

<ul>
<li>MySQL 8.0</li>
    	<div style="margin-inline: 25px;" class="admonition warning">
     	<p class="admonition-title"></p>
     	<p>To use MySQL 8.0, you need to create the database with charset latin1 as shown below:</p>
     	<p><code>create database regdb <br> character set latin1; </code></p>
    	</div>
<li>MySQL 5.7</li>
<li>Oracle 19C</li>
<li>Oracle SE2-19.0</li>
<li>Microsoft SQL Server 2019</li>
<li>SQLServer-SE-14.00</li>
<li>DB2 v11.5</li>
<li>Postgres 10.19</li>
<li>Postgres 13.7</li>
<li>Postgres 14</li>
<li>Embedded H2</li>
</ul>


---

## Tested web browsers

<ul>
<li>Chrome 104.0.5112.79 (Official Build) (arm64)</li>
<li>Firefox 91</li>
<li>Microsoft Edge 104.0.1293.54 (Official Build) (arm64)</li>
<li>Safari 15.2 (17612.3.6.1.6)</li>
</ul>

---

## Tested LDAPs

Following is a list of LDAPs tested with WSO2 Identity Server:

<ul>
	<li>Open LDAP 2.4.28</li>
	<li>Microsoft Active Directory Windows 2012</li>
</ul>







