# Configure Inbound Provisioning for the Service Provider 

## Configure the resident service provider using the admin portal

(insert-fragment)

### Test it out using SCIM

To confirm that the inbound provisioning is configured properly try the following SCIM commands. 

1. Execute the following curl request to create a new user. 

    **Request**

    ```curl
    curl -v -k --user [username]:[password] --data '{"schemas":[],"name":{"familyName":[last name],"givenName":[name]},"userName":[username],"password":[password],"emails":[{"primary":[true/false],"value":[email address],"type":[home/work]},{"value":[email address 2],"type":[home/work]}]}--header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```

    ```curl tab="Sample Request" 
    curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```

    ```curl tab="Sample Response"
    {"emails":[{"type":"home","value":"kim.jackson@gmail.com","primary":true},{"type":"work","value":"kim_j@wso2.com"}],"meta":{"created":"2018-08-15T14:55:23Z","location":"https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd","lastModified":"2018-08-15T14:55:23Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"name":{"familyName":"jackson","givenName":"kim"},"id":"c8c821ba-1200-495e-a775-79b260e717bd","userName":"kim"}
    ```

2. To confirm that this user has been created successfully using SCIM, execute the following curl command to list the existing users. The user you just added should be listed here.  

    ```curl
    curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} https://{IS_IP}:{IS_PORT}/wso2/scim/Users
    ```

    ```curl tab="Sample Request"
    curl -v -k --user admin:admin https://localhost:9443/scim2/Users
    ```

    ```curl tab="Sample Response"
    {"totalResults":8,"startIndex":1,"itemsPerPage":8,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],"Resources":[{"emails":["paul@somemail.com"],"meta":{"created":"2020-04-20T09:12:34.681Z","location":"https://localhost:9443/scim2/Users/a3b709bd-d8fb-4fc8-ae2f-f7aebcb50ab2","lastModified":"2020-04-20T09:12:34.681Z","resourceType":"User"},"name":{"givenName":"Paul","familyName":"Smith"},"id":"a3b709bd-d8fb-4fc8-ae2f-f7aebcb50ab2","userName":"Paul"},{"emails":["peter@somemail.com"],"meta":{"created":"2020-04-20T09:19:51.494Z","location":"https://localhost:9443/scim2/Users/d0d99e0a-7515-4549-bd05-977f01aa676d","lastModified":"2020-04-20T09:19:51.494Z","resourceType":"User"},"name":{"givenName":"Peter","familyName":"Smith"},"id":"d0d99e0a-7515-4549-bd05-977f01aa676d","userName":"Peter"},{"emails":["admin@wso2.com"],"meta":{"location":"https://localhost:9443/scim2/Users/77daa0d4-cde8-4c24-a0eb-a4c51a0721f2","resourceType":"User"},"name":{"familyName":"Administrator"},"groups":[{"display":"Application/User Portal","value":"5f4e1419-3948-4473-bd02-74eb491241e3","$ref":"https://localhost:9443/scim2/Groups/5f4e1419-3948-4473-bd02-74eb491241e3"},{"display":"admin","value":"e61254fe-4bb5-43a5-a98e-5e6e427f7cfe","$ref":"https://localhost:9443/scim2/Groups/e61254fe-4bb5-43a5-a98e-5e6e427f7cfe"}],"id":"77daa0d4-cde8-4c24-a0eb-a4c51a0721f2","userName":"admin"},{"meta":{"created":"2020-04-27T12:20:01.666Z","location":"https://localhost:9443/scim2/Users/dec825c2-4c7d-429d-ae69-14df73c6b1a7","lastModified":"2020-04-27T12:20:01.666Z","resourceType":"User"},"name":{"familyName":"bulkUser1"},"id":"dec825c2-4c7d-429d-ae69-14df73c6b1a7","userName":"bulkUser1"},{"meta":{"created":"2020-04-27T12:20:01.858Z","location":"https://localhost:9443/scim2/Users/55b66d13-a0c4-4f20-a41c-819806a3c061","lastModified":"2020-04-27T12:20:01.858Z","resourceType":"User"},"name":{"familyName":"bulkUser2"},"id":"55b66d13-a0c4-4f20-a41c-819806a3c061","userName":"bulkUser2"},{"meta":{"created":"2020-04-27T12:20:01.888Z","location":"https://localhost:9443/scim2/Users/b67bcb0f-c407-4604-9107-2b58925214b2","lastModified":"2020-04-27T12:20:01.888Z","resourceType":"User"},"name":{"familyName":"bulkUser3"},"id":"b67bcb0f-c407-4604-9107-2b58925214b2","userName":"bulkUser3"},{"meta":{"location":"https://localhost:9443/scim2/Users/010f2412-139c-4698-8833-11fe8c01a6bc","resourceType":"User"},"name":{"familyName":"cameron"},"groups":[{"display":"Application/User Portal","value":"5f4e1419-3948-4473-bd02-74eb491241e3","$ref":"https://localhost:9443/scim2/Groups/5f4e1419-3948-4473-bd02-74eb491241e3"},{"display":"Internal/system","value":"941b6e53-8472-4015-b952-7bc34155ec44","$ref":"https://localhost:9443/scim2/Groups/941b6e53-8472-4015-b952-7bc34155ec44"},{"display":"Lead","value":"047c342d-b21c-4c80-b32b-51cc6957b6e9","$ref":"https://localhost:9443/scim2/Groups/047c342d-b21c-4c80-b32b-51cc6957b6e9"}],"id":"010f2412-139c-4698-8833-11fe8c01a6bc","userName":"cameron"},{"emails":[{"type":"work","value":"kim_j@wso2.com"},{"type":"home","value":"kim.jackson@gmail.com"}],"meta":{"created":"2020-04-30T05:48:55.945Z","location":"https://localhost:9443/scim2/Users/42e2b3f2-72bb-4297-9060-ff777cf4e2c7","lastModified":"2020-04-30T05:48:55.945Z","resourceType":"User"},"name":{"givenName":"kim","familyName":"jackson"},"id":"42e2b3f2-72bb-4297-9060-ff777cf4e2c7","userName":"kim"}]}
    ```

## Configure a service provider using the admin portal

(insert-fragment)

### Test it out using SCIM 

1. Make note of the OAuth Client Key and OAuth Client Secret you obtained from the admin portal. 

2. Use a service like [Base64](https://www.base64encode.org/) to encode your OAuth Client Key and OAuth Client Secret. For this example, click **Encode** and enter your client key and client secret separated by a colon ":". Click the **> ENCODE \<** button to encode this.

    ![encode-base64](../../assets/img/guides/encode-base64.png)

3. Use the encoded value to generate the access token by inserting it into the following curl command after `Basic`.

    ```curl tab="Sample Request"
    curl -v -X POST -H "Authorization: Basic dUdCSm8yUFJyMzFFcXJSdnZnbGZhYW9aUURVYTo3R2Fad1dnX0s5Wmg5N1J5QTJMaExqcHVEMmdh" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=admin&password=admin" https://localhost:9443/oauth2/token
    ```

    ```curl tab="Sample Response"
    {"access_token":"aa6a9f0b-b593-33ff-9e23-0e0be906d462","refresh_token":"cbf5dcb9-4f74-309b-b965-91e943639204","token_type":"Bearer","expires_in":3600}
    ```

4. To confirm that the provisioning has been configured properly, enter the access token that you received in the previous step and create a user as shown below. 

    ```curl tab="Sample Request"
    curl -v -k --header "Authorization: Bearer aa6a9f0b-b593-33ff-9e23-0e0be906d462"  --data '{"schls":[{"primary":true,"value":"yohanna@wso2.com"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    ``` curl tab="Sample Response"
    {"meta":{"created":"2020-04-30T15:23:44","location":"https://localhost:9443/wso2/scim/Users/e345b533-33b9-4c15-8f8b-1fd6d0d13106","lastModified":"2020-04-30T15:23:44"},"schemas":["urn:scim:schemas:core:1.0"],"name":{"familyName":"fernando","givenName":"yohanna"},"id":"e345b533-33b9-4c15-8f8b-1fd6d0d13106","userName":"PRIMARY/yohanna"}
    ```

    The same user should be listed in the list of users in the admin portal as well. 