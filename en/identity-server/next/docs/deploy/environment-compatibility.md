# Environment Compatibility

This document provides compatibility details for WSO2 Identity Server across various environments.

## Tested JDKs and operating systems

WSO2 Identity Server, being a Java application, is compatible with most operating systems. Below are the operating systems and JDK versions that have been tested for compatibility.

<table>
	<tr>
		<th>Tested JDK versions</th>
		<td>
			<ul>
				<li>Temurin OpenJDK 11</li>
				<li>Temurin OpenJDK 17</li>
				<li>Temurin OpenJDK 21</li>
				<li>Oracle JDK 21</li>
			</ul>
		</td>
	</tr>
	<tr>
		<th>Tested Operating Systems</th>
		<td>
			<ul>
				<li>Ubuntu 24.04 (x86_64, ARM64)</li>
				<li>Rocky Linux 9.4</li>
				<li>Windows Server 2025</li>
				<li>Windows Server 2012 R2</li>
			</ul>
		</td>
	</tr>
</table>

## Tested DBMSs

WSO2 Identity Server is compatible with the following database management systems (DBMSs):

- MySQL 8.4

	!!! warning
		To use MySQL 8.0, you need to create the database with charset latin1 as shown below:

		```
		create database regdb
		character set latin1;
		```
- Oracle RAC 23ai
- Oracle 23ai
- Microsoft SQL Server 2022
- Postgres 17
- Maria DB 11.4
- DB2 11.5
- Embedded H2

## Tested web browsers

Following is a list of web browsers tested with WSO2 Identity Server:

- Chrome 129
- Firefox 130
- Microsoft Edge 127
- Safari 17

## Tested LDAPs

Following is a list of LDAPs tested with WSO2 Identity Server:

- Open LDAP 2.6
- Microsoft Active Directory Windows 2025
