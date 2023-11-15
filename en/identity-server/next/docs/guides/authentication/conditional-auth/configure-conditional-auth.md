{% set product_name = "WSO2 Identity Server" %}
{% set product_url = "https://localhost:9443" %}
{% set product_url_format = "https://localhost:9443" %}
{% set product_url_sample = "https://localhost:9443" %}
{% set jdk_version_message = "!!! Warning \"Before you proceed\"

    For JDK 17 runtime - Adaptive Authentication is disabled by default.
    You need to run **adaptive.sh** (**adaptive.bat** for Windows) in `[IS-HOME]/bin`

    To enable adaptive authentication please proceed following instructions.

    1.   Stop the server if running
    2.   Run adaptive.sh (adaptive.bat for Windows) (eg: `sh adaptive.sh`)
    3.   Restart the server

    To disable adaptive authentication please proceed following instructions.

    1.   Stop the server if running
    2.   Run adaptive.sh (adaptive.bat for Windows) with DISABLE parameter (eg: `sh adaptive.sh DISABLE`)
    3.   Restart the server" %}
{% set asgardeo_auth_script_warning = "" %}
{% include "../../../../../../includes/guides/authentication/conditional-auth/configure-conditional-auth.md" %}