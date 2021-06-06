# Manage Keystores via UI

The WSO2 Identity Server Management Console enables viewing keystore details such as the available certificates. To do this, you need to first upload the relevant keystore via the WSO2 Identity Server Management Console. 
    
!!! info "Before you begin"

    Make sure to create and store all the required keystore files in the `<IS_HOME>/repository/resources/security` directory.      

!!! info 
    -   For instructions on creating new keystore files, see [Create New Keystores](../../../deploy/security/create-new-keystores).
    -   For instructions on updating configuration files with the keystore information, see [Configure Keystores](../../../deploy/security/configure-keystores-in-wso2-products).

!!! warning 
    Do not delete the default `wso2carbon.jks`.

---

## Upload keystores  

Follow the instructions below to upload a keystore file via the WSO2 Identity Server Management Console.

<ol>
    <li>
        <p>In the <b>Main</b> menu of the WSO2 Identity Server Management Console (<code>https://&lt;IS_HOST&gt;:&lt;PORT&gt;/carbon</code>), click <b>Manage > Keystores > Add</b>.</p>
        <p><img src="../../../assets/img/deploy/security/add-key-store-menu-item.png" width="200;"></p>
        <p>The <b>Add Key Store</b> page appears.</p>
        <p><img src="../../../assets/img/deploy/security/add-new-keystore-screen.png" width="600;"></p>
    </li>
    <li>
        <p>Provide the required information:</p>
        <p>            
            <ul>
                <li><b>Keystore password</b>: This is required to access the private key and provider.</li>
                <li><b>Provider</b></li>
                <li><b>Keystore Type</b>: This is to specify the type of the keystore file that you are uploading as JKS or PKCS12.
                    <ul>
                        <li><b>JKS</b>: Java Key Store (JKS) allows you to read and store key entries and certificate entries. However, the key entries can only store private keys.</li>
                        <li><b>PKCS12</b>: Public Key Cryptography Standards (PKCS12) allows you to read a keystore in this format and export the information from that keystore. However, you cannot modify the keystore. This is used to import certificates from different browsers into your Java Key store.</li>
                    </ul>
                </li>
            </ul>
        </p>        
    </li> 
    <li>Click <b>Next</b>.</li>
    <li>Enter the private key password.</li>
    <li>
        <p>Click <b>Finish</b> to add the new keystore to the list.</p>
        <p>
            <div class="admonition tip">
                <p class="admonition-title">tip</p>
                <p>This keystore file is now saved to the WSO2 Identity Server registry. To see the registry path:
                    <ol>
                        <li>On <b>Main</b> tab, click <b>Manage > Registry > Browse</b>.</li>
                        <li>
                            <p>Enter <code>/_system/governance/repository/security/key-stores/</code> in the <b>Location</b> text box and click <b>Go</b>.</p>
                            <p>Note that the keystores added via the WSO2 Identity Server Management Console get listed out.</p>
                        </li>
                    </ol>
                </p>
            </div>
        </p>
    </li>
</ol>


## View keystores 

Follow the instructions below to view the details of the keystore that you uploaded. 

<ol>
    <li>In the <b>Main</b> menu of the WSO2 Identity Server Management Console, click <b>Manage > Keystores > List</b>. The <b>Key Store List</b> page appears.</li>
    <li>
        <p>Click <b>View</b> of the corresponding keystore that you want to view. The <b>View Key Store</b> screen appears with the following information:
            <ul>
                <li>
                    <p></p><b>Private key certificates</b></p> 
                    <p><img src="../../../assets/img/deploy/security/private-key.png"></p>
                </li>
                <li>
                    <p><b>Available certificates</b></p>
                    <p><img src="../../../assets/img/deploy/security/available-certificates.png"></p>
                </li>
            </ul> 
        </p>  
    </li>
    <li>Click <b>Finish</b> to get back to the <b>Keystores</b> screen.</li>
</ol>
