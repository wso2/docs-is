## Dry-run mode

Dry-run mode lets you preview what `importAll` or `exportAll` would do without applying any destructive changes. No resources are created, updated, or deleted on the server in import, and no local files are removed in export.

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

Local file and directory deletions are skipped in the same way. The end-of-run summary reports `Would Import`, `Would Update`, and `Would Delete` counts in place of the applied counts.

!!! note
    Dry-run mode only skips mutating operations. List and detail `GET` requests are still sent to the server so that the tool can diff local files against the current server state.
