# Environment Compatibility

This doc covers the compaitibility information of WSO2 Identity Server with different environments.

## Tested operating systems and JDKs

As WSO2 Identity Server is a Java application, you can generally run it on most operating systems. Following are the operating systems and JDKs that WSO2 Identity Server is tested with:

<table>
	<tr>
		<th>Tested JDK versions</th>
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
		<th>Tested Operating Systems</th>
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

## Tested DBMSs

WSO2 Identity Server supports the following DBMSs:

- MySQL 8.0

	!!! warning
		To use MySQL 8.0, you need to create the database with charset latin1 as shown below:

		```
		create database regdb
		character set latin1;
		```

- MySQL 5.7
- Oracle 19C
- Oracle SE2-19.0
- Microsoft SQL Server 2019
- SQLServer-SE-14.00
- DB2 v11.5
- Postgres 10.19
- Postgres 13.7
- Postgres 14
- Embedded H2

## Tested web browsers

Following is a list of web browsers tested with WSO2 Identity Server:

- Chrome 104.0.5112.79 (Official Build) (arm64)
- Firefox 91
- Microsoft Edge 104.0.1293.54 (Official Build) (arm64)
- Safari 15.2 (17612.3.6.1.6)

## Tested LDAPs

Following is a list of LDAPs tested with WSO2 Identity Server:

- Open LDAP 2.4.28
- Microsoft Active Directory Windows 2012
