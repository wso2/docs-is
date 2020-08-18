# CORS Migration

Complete the following steps for the CORS migration.

1. Remove any CORS configurations defined at `repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2`. 
You will be able to do this by removing the whole tag under the filter class named `com.thetransactioncompany.cors.CORSFilter`. If 
the migration is from a version prior to WSO2 IS 5.9.0, then the original configurations would be defined in the `web.xml` file 
instead of the `web.xml.j2` file.

2. In order to complete the CORS migration, any CORS configurations defined at the `web.xml.j2` file should be reconfigured in 
the `deployment.toml` file. The following table shows how the old configurations in the `web.xml.j2` file are mapped to the new 
ones in the `deployment.toml` file. 

    <table>
        <thead>
            <tr class="header">
                <th>
                    Old configuration
                </th>
                <th>
                    New configuration
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd">
                <td>
                    <p>cors.allowGenericHttpRequests</p>
                </td>
                <td>
                    <p>allow_generic_http_requests</p>
                </td>
            </tr>
            <tr class="even">
                <td>
                    <p>cors.allowOrigin {"*"}</p>
                </td>
                <td>
                    <p>allow_any_origin</p>
                </td>
            </tr>
            <tr class="odd">
                <td>
                    <p>cors.allowOrigin</p>
                </td>
                <td>
                    <p>allowed_origins</p>
                </td>
            </tr>
            <tr class="even">
                <td>
                    <p>cors.allowSubdomains</p>
                </td>
                <td>
                    <p>allow_subdomains</p>
                </td>
            </tr>
            <tr class="odd">
                <td>
                    <p>cors.supportedMethods</p>
                </td>
                <td>
                    <p>supported_methods</p>
                </td>
            </tr>
            <tr class="even">
                <td>
                    <p>cors.supportedHeaders {"*"}</p>
                </td>
                <td>
                    <p>support_any_header</p>
                </td>
            </tr>
            <tr class="odd">
                <td>
                    <p>cors.supportedHeaders</p>
                </td>
                <td>
                    <p>supported_headers</p>
                </td>
            </tr>
            <tr class="even">
                <td>
                    <p>cors.exposedHeaders</p>
                </td>
                <td>
                    <p>exposed_headers</p>
                </td>
            </tr>
            <tr class="odd">
                <td>
                    <p>cors.supportsCredentials</p>
                </td>
                <td>
                    <p>supports_credentials</p>
                </td>
            </tr>
            <tr class="even">
                <td>
                    <p>cors.maxAge</p>
                </td>
                <td>
                    <p>max_age</p>
                </td>
            </tr>
            <tr class="odd">
                <td>
                    <p>cors.tagRequests</p>
                </td>
                <td>
                    <p>tag_requests</p>
                </td>
            </tr>
        </tbody>
    </table>
    
    A sample CORS configuration is shown below.    
                       
    ```
    [cors]
    allow_generic_http_requests = true
    
    allowed_origins = [
       "http://wso2.is"
    ]
    allow_subdomains = false
    supported_methods = [
       "GET",
       "POST",
       "HEAD",
       "OPTIONS"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = []
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

3. Execute the sql command set relavant for your environment in order to migrate the schema. 

    ??? abstract "DB2"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations')
        /
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        )
        /
        CREATE SEQUENCE IDN_CORS_ORIGIN_SEQ START WITH 1 INCREMENT BY 1 NOCACHE
        /
        CREATE TRIGGER IDN_CORS_ORIGIN_TRIG NO CASCADE
            BEFORE INSERT
            ON IDN_CORS_ORIGIN
            REFERENCING NEW AS NEW
            FOR EACH ROW MODE DB2SQL
                BEGIN ATOMIC
                    SET (NEW.ID) = (NEXTVAL FOR IDN_CORS_ORIGIN_SEQ);
                END
        /
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        )
        /
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT
        /
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT
        /
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID)
        /
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID)
        /
        ```
    
    ??? abstract "H2"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations');
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        );
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        );
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;

        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID);
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID);
        ```
    
    ??? abstract "MS SQL"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations');
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        );
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        );
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;

        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID);
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID);
        ```
    
    ??? abstract "MySQL"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES 
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations');
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        ) ENGINE INNODB;
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        ) ENGINE INNODB;
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID);
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID);
        ```
    
    ??? abstract "MySQL Cluster"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations');

        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        ) ENGINE NDB;
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        ) ENGINE NDB;
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;

        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID);
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID);
        ```
    
    ??? abstract "Oracle"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations')
        /
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        )
        /
        CREATE SEQUENCE IDN_CORS_ORIGIN_SEQ START WITH 1 INCREMENT BY 1 NOCACHE
        /
        CREATE TRIGGER IDN_CORS_ORIGIN_TRIG NO CASCADE
            BEFORE INSERT
            ON IDN_CORS_ORIGIN
            REFERENCING NEW AS NEW
                FOR EACH ROW
                   BEGIN
                       SELECT IDN_CORS_ORIGIN_SEQ.nextval INTO :NEW.ID FROM dual;
                   END;
        /
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        )
        /
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT
        /
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT
        /

        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID)
        /
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID)
        /
        ```
    
    ??? abstract "Oracle RAC"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations')
        /
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        )
        /
        CREATE SEQUENCE IDN_CORS_ORIGIN_SEQ START WITH 1 INCREMENT BY 1 NOCACHE
        /
        CREATE TRIGGER IDN_CORS_ORIGIN_TRIG NO CASCADE
            BEFORE INSERT
            ON IDN_CORS_ORIGIN
            REFERENCING NEW AS NEW
                FOR EACH ROW
                   BEGIN
                       SELECT IDN_CORS_ORIGIN_SEQ.nextval INTO :NEW.ID FROM dual;
                   END;
        /
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        )
        /
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT
        /
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT
        /

        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID)
        /
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID)
        /
        ```
    
    ??? abstract "PostgreSQL"
        ```
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('8ec6dbf1-218a-49bf-bc34-0d2db52d151c', 'CORS_CONFIGURATION', 'A resource type to keep the tenant CORS configurations');
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ORIGIN (
            ID                INT           NOT NULL AUTO_INCREMENT,
            TENANT_ID         INT           NOT NULL,
            ORIGIN            VARCHAR(2048) NOT NULL,
            UUID              CHAR(36)      NOT NULL,
        
            PRIMARY KEY (ID),
            UNIQUE (TENANT_ID, ORIGIN),
            UNIQUE (UUID)
        );
        
        CREATE TABLE IF NOT EXISTS IDN_CORS_ASSOCIATION (
            IDN_CORS_ORIGIN_ID  INT NOT NULL,
            SP_APP_ID           INT NOT NULL,
        
            PRIMARY KEY (IDN_CORS_ORIGIN_ID, SP_APP_ID)
        );
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_IDN_CORS_ORIGIN_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (IDN_CORS_ORIGIN_ID)
                REFERENCES IDN_CORS_ORIGIN (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;
        ALTER TABLE IDN_CORS_ASSOCIATION
            ADD CONSTRAINT ID_SP_APP_ID_FOREIGN_CONSTRAINT
                FOREIGN KEY (SP_APP_ID)
                REFERENCES SP_APP (ID)
                ON DELETE CASCADE
                ON UPDATE RESTRICT;
                
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_SP_APP_ID ON IDN_CORS_ASSOCIATION (SP_APP_ID);
        
        CREATE INDEX IDX_IDN_CORS_ASSOCIATION_IDN_CORS_ORIGIN_ID ON IDN_CORS_ASSOCIATION (IDN_CORS_ORIGIN_ID);
        ```
