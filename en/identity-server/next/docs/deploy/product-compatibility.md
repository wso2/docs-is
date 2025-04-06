# Product compatibility

This document provides compatibility details for WSO2 Identity Server 7.1.0 across various environments.

## {{product_name}} runtime compatibility 

Given below is the tested compatibility of the runtime of {{product_name}} 7.1.0.

### Tested operating systems

WSO2 Identity Server, being a Java application, is compatible with most operating systems. Listed below are the operating systems that have been tested with the {{product_name}} 7.1.0 runtime.

<table>
	<th>Operating System</th>
	<th>Versions</th>
	<tr>
		<td>Ubuntu (x86_64, ARM64)</td>
		<td>24.04</td>
	</tr>
	<tr>
		<td>Rocky Linux</td>
		<td>9.3</td>
	</tr>
	<tr>
		<td>Windows Server</td>
		<td>2024, 2016</td>
	</tr>
	<tr>
		<td>RHEL</td>
		<td>9.5</td>
	</tr>
</table>

### Tested JDKs

The {{product_name}} 7.1.0 runtime has been tested with the following JDKs:

<table>
	<th>JDKs</th>
	<th>Versions</th>
	<tr>
		<td>Temurin OpenJDK</td>
		<td>21, 17, 11</td>
	</tr>
	<tr>
		<td>Oracle JDK</td>
		<td>21</td>
	</tr>
</table>

??? note "IWA limitation on ARM64"

	WSO2 Identity Server does not support NTLM-based Integrated Windows Authentication (IWA) on ARM-based JDKs. This is because NTLM relies on Windows-specific native libraries (SSPI APIs), which are unavailable on ARM architectures. 

    If you need IWA on an ARM64 deployment, use Kerberos authentication instead of NTLM.


## Tested DBMSs

The {{product_name}} 7.1.0 runtime has been tested with the following database management systems (DBMSs):

<table>
	<th>DBMS</th>
	<th>Versions</th>
	<tr>
		<td>MySQL</td>
		<td>8.0.4, 5.7</td>
	</tr>
	<tr>
		<td>Oracle RAC</td>
		<td>23ai, 19c</td>
	</tr>
	<tr>
		<td>Oracle</td>
		<td>23ai, 21c, 19c</td>
	</tr>
	<tr>
		<td>Microsoft SQL Server</td>
		<td>2022, 2019, 2017</td>
	</tr>
	<tr>
		<td>Postgres</td>
		<td>17.2, 16.6, 15.10</td>
	</tr>
	<tr>
		<td>Maria DB</td>
		<td>11.4</td>
	</tr>
	<tr>
		<td>DB2</td>
		<td>11.5</td>
	</tr>
</table>

## Tested web browsers

The {{product_name}} 7.1.0 runtime has been tested with the following browsers:

<table>
	<th>Browser</th>
	<th>Versions</th>
	<tr>
		<td>Chrome</td>
		<td>129</td>
	</tr>
	<tr>
		<td>Firefox</td>
		<td>130</td>
	</tr>
	<tr>
		<td>Microsoft Edge</td>
		<td>127</td>
	</tr>
	<tr>
		<td>Safari</td>
		<td>17</td>
	</tr>
</table>

## Tested LDAPs

The {{product_name}} 7.1.0 runtime has been tested with the following LDAPs:

<table>
	<th>LDAP</th>
	<th>Versions</th>
	<tr>
		<td>Open LDAP</td>
		<td>2.6</td>
	</tr>
	<tr>
		<td>Microsoft Active Directory Windows</td>
		<td>2022</td>
	</tr>
</table>