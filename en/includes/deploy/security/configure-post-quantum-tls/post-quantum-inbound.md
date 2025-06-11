# Configure post-quantum TLS for inbound connections

By following this guide, you will enable **post-quantum TLS** in {{ product_name }} for inbound connections. An inbound connection refers to communication initiated by clients, such as browsers, applications, or APIs, connecting securely to {{ product_name }} using TLS.

!!! note "Post-quantum TLS requirements"

    - Post-quantum TLS is only supported over TLS 1.3.
    - {{product_name}} currently supports post-quantum security only on Linux and MacOS operating systems.

## Step 1: Build native libraries

For post-quantum TLS to work, {{product_name}} requires a few native libraries. These don't come pre-packaged with the {{product_name}} distribution as native libraries depend on the system architecture.

Use one of the following methods to build native libraries.

### Method 1: Use system libraries for build and runtime

This method relies on your operating system’s existing libraries during both the build process and runtime. This results in a faster build time and minimal disk space usage.

#### Build dependencies

1. Make sure your system has the following dependencies installed:

    - Build tools (`make`, `cmake`, `wget`, `tar`)
    - GNU compiler (`gcc`)
    - Apache Portable Runtime (APR) library

2. Install OpenSSL 3.0 or higher.





!!! note "Important"
    For this method, OpenSSL 3.0 or higher is required as a system library to build the other libraries and for the runtime.

=== "Linux"

    To install OpenSSL 3.0+, download the [source](https://www.openssl.org/source/) and follow the instructions given [here](https://github.com/openssl/openssl/blob/master/INSTALL.md#quick-installation-guide).

    Install the other required build dependencies using the command for your relevant Linux distribution.

    In Debian-based Linux:

    ```bash
    apt-get install make cmake wget tar gcc libapr1-dev libssl-dev
    ```

    In Red Hat Linux distributions:

    ```bash
    yum install make cmake wget tar gcc apr-devel openssl-devel perl
    ```

=== "MacOS"

    On macOS, you can use Homebrew to install all the required build dependencies.

    ```bash
    brew install wget cmake openssl@3 apr
    ```

    Add the following line to your shell configuration file (e.g., ~/.bash_profile, ~/.zshrc, or ~/.bashrc):

    For Intel-based Macs:

    ```bash
    export PATH="/usr/local/opt/apr/bin:$PATH"
    ```
    For Apple Silicon-based Macs:

    ```bash
    export PATH="/opt/homebrew/opt/apr/bin:$PATH"
    ```

#### Runtime dependencies

The OpenSSL and APR libraries installed from the previous section will also be used as runtime dependencies in this method.

Follow the instructions given below to install the other required runtime dependencies. These dependencies will be installed within the {{product_name}} directory.

1. Shut down the {{product_name}} instance if it's running.
2. Open a terminal, navigate to `<IS_HOME>/bin/` folder, and execute the following command:

    ```bash
    sh openssl-tls.sh --build_pqclib
    ```

!!! note
    If you change the location of the {{product_name}} folder, you need to re-run the above command to reconfigure the runtime libraries.

### Method 2: Using self-contained libraries

In this method, all the runtime dependencies are installed into the {{product_name}} folder, providing isolation from the system environment for post-quantum TLS operation and ensuring maximum compatibility across different systems and configurations.

#### Build dependencies

The following dependencies are required during build-time.

- Build tools (make, cmake, wget, tar)
- GNU compiler (GCC/Clang)

=== "Linux"

    Install the other required build dependencies using the command for your relevant Linux distribution.

    In Debian-based Linux:

    ```bash
    apt-get install make cmake wget tar gcc git python3 autoconf libtool-bin
    ```

    In Red Hat Linux distributions:

    ```bash
    yum install make cmake wget tar gcc perl git python3 autoconf libtool
    ```

=== "MacOS"

    On macOS, you can use Homebrew to install dependencies.

    ```bash
    brew install wget cmake git python3 autoconf libtool
    ```

#### Runtime dependencies

Follow the instructions given below to install the required runtime dependencies. These dependencies will be installed within the Identity Server directory.

1. Shut down the {{product_name}} instance if it's running.
2. Open a terminal, navigate to `<IS_HOME>/bin/` folder, and execute the following command:

    ```bash
    sh openssl-tls.sh --build_openssl --build_pqclib
    ```

!!! note
    If you change the location of the {{product_name}} folder, you need to re-run the above command to reconfigure the runtime libraries.

## Step 2: Enable post-quantum TLS

1. Shut down the {{product_name}} instance if it's running.
2. Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [transport.https.openssl]
    enabled = true
    named_groups="X25519MLKEM768:x25519"

    [transport.https.sslHostConfig.properties]
    protocols="TLSv1+TLSv1.1+TLSv1.2+TLSv1.3"
    ```

3. Restart {{product_name}}.

!!! note "Disable post-quantum TLS"

    If you need to disable the post-quantum TLS after enabling it:

    1. Shut down the {{product_name}} instance if it's running.
    2. In the `<IS_HOME>/repository/conf/deployment.toml` file, remove the previously added configurations.
    3. Restart {{product_name}}.

    !!! tip
        If you want to keep using TLS 1.3 while disabling post-quantum TLS, change the `<IS_HOME>/repository/conf/deployment.toml` into following configuration.
        
        ``` toml
        [transport.https.openssl]
        enabled = true

        [transport.https.sslHostConfig.properties]
        protocols="TLSv1+TLSv1.1+TLSv1.2+TLSv1.3"
        ```
