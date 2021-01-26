# Usernames in WSO2 Identity Server

Selecting a good username is important as it is a prime link to your identity. Hence, make sure to adhere to
 the following best practices when creating usernames.
 
## Best practices for username creation

- A username should be easy to remember and difficult to guess.
- Make sure the username does not give any hints to guess your password.
- It is better to avoid using combinations of special characters such as `'`, `"`, `,`, `.`, `:`, and `;` as they may be
 difficult to distinguish when being read.

## Restricted Special Characters in Usernames

The following is a list of characters that have been reserved for other purposes. These characters should not used in
 usernames except for the intended purpose.

| Character | Reserved Purpose                                              |                         
|-----------|---------------------------------------------------------------|
| `@`       | For specifying the tenant to which the user belongs           |
| `/`       | For specifying the userstore which holds the user's data      |

!!! warning "Unsupported special characters in usernames"
                
        Please note that the use of special characters `\`, `!`, `(`, `)`, `*`, `~`, `<`, `>`, and whitespaces is
         not supported in this version of WSO2 Identity Server.
