# Environment Compatibility


## Tested operating systems and JDKs

As WSO2 Identity Server is a Java application, you can generally run them on most operating systems. Given below are the JDKs that we have tested our product with.

<table>
	<tr>
		<th>Supported JDK versions</th>	
		<td>
			<ul>
				<li>CorrettoJDK 8</li>
				<li>AdoptOpenJDK 8</li>
				<li>AdoptOpenJDK 11</li>
				<li>OpenJDK 8</li>
				<li>OpenJDK 11</li>
				<li>Oracle JDK 8</li>
				<li>Oracle JDK 11</li>
			</ul>
		</td>
	</tr>
	<tr>
		<th>Supported Operating Systems</th>
		<td>
			<ul>
				<li>Ubuntu 16.04</li>
				<li>Ubuntu 18.04</li>
				<li>CentOS 7</li>
				<li>Windows Server 2016</li>
				<li>Windows Server 2012 R2</li>
				<li>Mac OS 10.13.6</li>
			</ul>
		</td>
	</tr>
</table>>

Given below are the JDKs and Operating Systems we have tested WSO2 Identity Server Analytics with.

<table>
	<tr>
		<th>Supported JDK versions</th>	
		<td>
			<ul>
				<li>OpenJDK 8</li>
				<li>Oracle JDK 8</li>
				<li>AdoptOpenJDK 8</li>
			</ul>
		</td>
	</tr>
	<tr>
		<th>Supported Operating Systems</th>
		<td>
			<ul>
				<li>macOS Catalina 10.15.7</li>
				<li>Ubuntu 20.04</li>
				<li>Ubuntu 18.04</li>
				<li>Windows 10</li>
				<li>openSUSE Tumbleweed 20201114</li>
			</ul>
		</td>
	</tr>
</table>

---

## Tested DBMSs

WSO2 Identity Server supports the following DBMSs.

<table>
	<tr>
		<th>WSO2 Identity Server</th>
		<td>
			<ul>
				<li>MySQL 8.0</li>
				<div class="admonition warning">
					<p class="admonition-title"></p>
					<p>To use MySQL 8.0, you need to create the database with charset latin1 as shown below.</p>
					<p><code>create database regdb <br> character set latin1; </code></p>
				</div>
				<li>MySQL 5.7</li>
				<li>Oracle 19c</li>
				<li>Oracle 12c</li>
				<li>Oracle SE2-12.1</li>
				<li>Microsoft SQL Server 2019</li>
				<li>SQLServer-SE-14.00</li>
				<li>DB2 v11.5</li>
				<li>DB2 v10.5 (Compatibility mode: MYS)</li>
				<li>Postgres 11</li>
				<li>Postgresql 10.5</li>
				<li>MariaDB 10.4.13</li>
			</ul>
		</td>
	</tr>
	<tr>
		<th>WSO2 Identity Server Analytics</th>
		<td>
			<ul>
				<li>MySQL 5.7.15</li>
				<li>MySQL 8.0</li>
				<li>Microsoft SQL Server  2014</li>
				<li>Microsoft SQL Server 2019</li>
				<li>Oracle 12.1.0.2.0</li>
				<li>Oracle 12.2.0.1</li>
				<li>Oracle 19c</li>
				<li>Postgres 11</li>
				<li>Postgres 10.5</li>
			</ul>
		</td>
	</tr>
</table>

---

## Tested web browsers

<ul>
<li>Chrome Version 78.0.3904.87 (Official Build) (64-bit)</li>
<li>Firefox 70.0.1 (64-bit)</li>
<li>Internet Explorer 11.576.14393</li>
<li>Safari 13.0.3</li>
</ul>

---

## Tested LDAPs

Following is a list of LDAPs that WSO2 Identity Server was tested with.

<ul>
	<li>Open LDAP 2.4.28</li>
	<li>Microsoft Active Directory Windows 2012</li>
</ul>







