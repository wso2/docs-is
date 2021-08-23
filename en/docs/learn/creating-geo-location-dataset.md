# Creating a Geolocation Dataset

Follow the procedure below in order to create a geolocation dataset to use when [Enabling Geolocation Based Statistics
](../../learn/enabling-geolocation-based-statistics).

1.  Create an account in [www.maxmind.com](https://www.maxmind.com/) and download the **GeoLite2 City: CSV Format** as a ZIP file.
2.  Download the geoip-2-csv-converter from <https://github.com/maxmind/geoip2-csv-converter/releases> depending on your operating system.

## Prepare the database entries

1.  Unzip the latest CSV file and the geoip-2-csv-converter you have downloaded in the previous step.
2.  Run the `update-geolocation-data.sh` file using the command below.

    For Linux: [update-geolocation-data.sh](../../assets/attachments/learn/geo-location/linux/update-geolocation-data.sh)
    
    For Mac: [update-geolocation-data.sh](../../assets/attachments/learn/geo-location/mac/update-geolocation-data.sh)

    ```shell
    sh update-geolocation-data.sh
    ```      

3. Enter the path to the extracted GeoLite2-City-Blocks-IPv4 directory which you downloaded first, as the response for **Enter path to GeoLite2-City-Blocks-IPv4 directory:**

        E.g :   /&lt;PATH\_TO&gt;/GeoLite2-City-CSV_20200310

    -   Enter the path to the `geoip2-csv-converter` directory as the response for **Enter path to geoip2-csv-converter home directory:**

        E.g :  /&lt;PATH\_TO&gt;/geoip2-csv-converter-v1.1.0

    -   After executing the script, you can find the `final.csv` file inside your current directory.
    -   In the `final.csv` file,

        ``` java
        ** convert GeoLite2-City-Blocks-IPv4
        ** get the first column form original
        ** change the column name to ‘network_cidr’
        ** Extract the ip address data
        ** change the column name to ‘network_blocks’
        ** extract the entries from original
        ** change the column name to ‘network’
        ** change the column name to ‘broadcast’
        ** merge the csv files
        ```

4.  The created `final.csv` file and the `GeoLite2-City-Locations-en.csv` file (located in the downloaded latest CSV zip file) will be used in the [next step](../../learn/enabling-geolocation-based-statistics).
