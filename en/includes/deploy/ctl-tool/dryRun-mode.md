## Dry-run mode

Dry-run mode lets you preview what `importAll` or `exportAll` would do without modifying the server or deleting any local files.

### Usage

Pass the `--dryRun` (`-d`) flag to either command:

=== "Import"

    ```bash
    iamctl importAll --config ./env --dryRun
    ```

=== "Export"

    ```bash
    iamctl exportAll --config ./env --dryRun
    ```

### Behavior

In dry-run mode, all mutating operations (POST, PUT, PATCH, DELETE) are skipped and logged with a `[DRY RUN] Would <METHOD> <url>` message instead of being sent to the server:

```bash title="Sample log output"
[DRY RUN] Would POST https://localhost:9443/api/server/v1/applications
```

During import, no resources are created, updated, or deleted on the server. During export, resources are still fetched and written to disk, but stale local files and directories are left in place. The end-of-run summary reports `Would Import`, `Would Update`, and `Would Delete` counts in place of the applied counts.
