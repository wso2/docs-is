# Configure Post-Quantum TLS

To overcome the quantum threat on traditional cryptographic techniques, WSO2 Identity Server integrates  post-quantum cryptography with the current traditional methods. Specifically, it adopts [X25519+Kyber](https://datatracker.ietf.org/doc/draft-tls-westerbaan-xyber768d00/) key agreement algorithm for inbound TLS communications, ensuring robust protection against quantum threats. To configure TLS with post-quantum security, Identity Server defaults to OpenSSL 3.x as the JSSE provider, alongside the liboqs library to support post-quantum algorithms.

Post-quantum TLS is **disabled** by default on Identity Server.

!!! note
    - Post-quantum TLS only works with TLS 1.3
    - Post-quantum secure TLS in Identity Server is currently only supported on Linux and MacOS operating systems.

## Build Post-Quantum TLS

For post quantum TLS to work, a few native libraries are required. These libraries are not packed with the Identity Server distribution by default as native libraries are system architecture-dependent. Hence, these libraries must be built and installed into your Identity Server distribution.

### Using system libraries for runtime dependencies

In this mode, the system-level dependencies are utilized, resulting in the fastest build time and minimal disk space usage.

#### Build dependencies

- Build tools (make, cmake, wget, tar)
- GNU compiler
- APR library
- OpenSSL libraries

=== "Linux"

    !!! note "Important"
        OpenSSL 3.0 or higher is required before building the post-quantum secure TLS.  

    In Debian-based Linux, install other dependencies using:

    ```bash
    apt-get install make cmake wget tar gcc libapr1-dev libssl-dev
    ```

    In Red Hat Linux distributions, install other dependencies using:

    ```bash
    yum install make cmake wget tar gcc apr-devel openssl-devel perl
    ```

=== "MacOS"

    Install dependencies using Homebrew:

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

### Enable Post-Quantum TLS

1. Shut down the Identity Server instance if it's running.
2. Open a terminal, navigate to `<IS_HOME>/bin/` folder, and execute the following command:
    ```bash
    sh openssl-tls.sh --build_liboqs
    ```
3. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [transport.https.openssl]
    enabled = true
    named_groups="x25519_kyber768:x25519"

    [transport.https.sslHostConfig.properties]
    protocols="TLSv1+TLSv1.1+TLSv1.2+TLSv1.3"
    ```
4. Restart the WSO2 Identity Server.

!!! note
    If the path of the Identity Server directory is altered, re-run the `sh openssl-tls.sh --build_liboqs` command to enable the Post-Quantum TLS.

## Build Post-Quantum TLS: self contained mode

In this mode, all dependencies are contained within the Identity Server folder, guaranteeing total isolation from the system environment and ensuring maximum compatibility across different systems and configurations.

### Build dependencies

- Build tools (make, cmake, wget, tar)
- GNU compiler

=== "Linux"

    In Debian-based Linux, install other dependencies using:

    ```bash
    apt-get install make cmake wget tar gcc
    ```

    In Red Hat Linux distributions, install other dependencies using:

    ```bash
    yum install make cmake wget tar gcc perl
    ```

=== "MacOS"

    Install dependencies using Homebrew:

    ```bash
    brew install wget cmake
    ```

### Enable Post-Quantum TLS

1. Shut down the Identity Server instance if it's running.
2. Open a terminal, navigate to `<IS_HOME>/bin/` folder, and execute the following command:

    ```bash
    sh openssl-tls.sh --build_openssl --build_liboqs
    ```
3. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [transport.https.openssl]
    enabled = true
    named_groups="x25519_kyber768:x25519"

    [transport.https.sslHostConfig.properties]
    protocols="TLSv1+TLSv1.1+TLSv1.2+TLSv1.3"
    ```
4. Restart the WSO2 Identity Server.


!!! note
    If the path of the Identity Server directory is altered, re-run the `sh openssl-tls.sh --build_openssl  --build_liboqs` command to enable the Post-Quantum TLS.

## Disable Post-Quantum TLS

If you need to disable the Post-Quantum TLS after enabling it:

1. Shut down the Identity Server instance if it's running.
2. In the `<IS_HOME>/repository/conf/deployment.toml` file, remove the previously added configurations.
3. Restart the WSO2 Identity Server.

!!! tip
    If you want to keep using TLS 1.3 while disabling post quantum secure mode, change the `<IS_HOME>/repository/conf/deployment.toml` into following configuration.
    
    ``` toml
    [transport.https.openssl]
    enabled = true

    [transport.https.sslHostConfig.properties]
    protocols="TLSv1+TLSv1.1+TLSv1.2+TLSv1.3"
    ```
