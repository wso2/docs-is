# Entries and Content

A collection includes a set of a child collections and resources. If you
select a collection in the registry, the **Entries** panel opens with
details of the child collections and resources of the collection. For
example,

![](attachments/33128918/33325829.png)

The **Info** and **Actions** links in the **Entries** panel provide the
following information:

<table>
<thead>
<tr class="header">
<th>Links in the Entries panel</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Add Collection</strong></td>
<td>See <a href="#EntriesandContent-Addingchildcollections">Adding child collections</a> .</td>
</tr>
<tr class="even">
<td><strong>Add Resource</strong></td>
<td>See <a href="#EntriesandContent-Addingresourcestoacollection">Adding</a> and <a href="#EntriesandContent-Editingresources">Editing</a> resources.</td>
</tr>
<tr class="odd">
<td><strong>Create Link</strong></td>
<td>See <a href="https://docs.wso2.com/display/DSS311/Entries+and+Content#EntriesandContent-Addinglinks">Entries and Content#Adding links</a> .</td>
</tr>
<tr class="even">
<td><strong>Info</strong><br />
</td>
<td><div class="content-wrapper">
<ul>
<li><strong>Feed -</strong> Generate a RSS feed for the resource</li>
<li><strong>Rating -</strong> Ratings of the resource</li>
<li><p><strong><strong>Media type -</strong></strong> Each collection or resource created and stored on the repository has an associated media type. If you leave the media type unspecified, it takes the default value. There are two main ways to configure media types for resources.<br />
</p>
<ol>
<li>Use a one-time configuration, by modifying the <code>                  mime.types                 </code> file found in the server configuration directory. Done just once before the initial start-up of the server. This method does not apply to collections. The only way to configure media types for a collection is using the second method.</li>
<li>Use the management console as described when adding a collection and a resource.</li>
</ol>
<p>Initially, the system contains media types defined in <code>                 mime.types                </code> file. They are available for resources and a set of default media types is available for collections.<br />
</p>
<div>
<p>Human-readable media types have shorter names in place of MIME names (for example, <code>                  WSDL                 </code> is used instead of application/wsdl+xml). This is achieved by introducing a new file as <code>                                     &lt;PRODUCT_HOME&gt;/repository/conf/mime.mappings                                   </code> . For more information, see <a href="https://docs.wso2.com/display/Governance460/Configuring+Registry+Files">Configuring Registry Files</a> section in WSO2 Governance Registry documentation.</p>
</div>
<p>You can manage media types for resources by editing the properties of <code>                 /system/mime.types/index                </code> collection. This collection contains two resources: collection and <code>                 custom.ui                </code> . To manage media types of collections and custom user interfaces, edit the properties of these two resources.</p></li>
</ul>
</div></td>
</tr>
<tr class="odd">
<td><strong>Actions</strong></td>
<td><div class="content-wrapper">
<p>Allows you to <strong>rename, move, copy or delete</strong> a resource/child collection.<br />
<img src="attachments/33128918/33325827.png" width="700" /></p>
<div>
<p>You cannot move/copy resources and collections across registry mounts if they have dependencies or associations. You can only move/copy within a mount. For more information on mounts, read WSO2 Governance Registry documentation: <a href="http://docs.wso2.org/display/Governance460/Remote+Instance+and+Mount+Configuration+Details">Remote Instance and Mount Configuration Details</a> .</p>
</div>
<div>
<p>These options are not available for all resources/collections.</p>
</div>
</div></td>
</tr>
</tbody>
</table>

-   [Adding child
    collections](#EntriesandContent-Addingchildcollections)
-   [Adding resources to a
    collection](#EntriesandContent-Addingresourcestoacollection)
-   [Editing resources](#EntriesandContent-Editingresources)
-   [Adding links](#EntriesandContent-Addinglinks)

### Adding child collections

You can create a child collection to existing collections in a registry
as shown below:

1.  Select a collection. You can see the Entries panel with details of
    child collections and resources it has.
2.  Click **Add Collection**. ![](attachments/22185138/22514113.png)
3.  Specify the following options:  
    -   A unique name for the collection and a description
    -   Select a media type from the drop-down menu
4.  Click **Add**.

### Adding resources to a collection

You can add a resource to a collection for more convenient usage of
resources as follows:

1.  Select a collection. In its detailed view, you can see the Entries
    panel with details of child collections and resources it has.
2.  In the Entries panel, click **Add Resource**.
    ![](attachments/22185139/22514115.png)
3.  In the Add Resource page that opens, select one of the following
    methods **:**

    -   [Uploading content from
        file](#EntriesandContent-Uploadingcontentfromfile)
    -   [Importing content from
        URL](#EntriesandContent-ImportingcontentfromURL)
    -   [Creating text content](#EntriesandContent-Creatingtextcontent)
    -   [Creating custom
        content](#EntriesandContent-Creatingcustomcontent)

      

    #### Uploading content from file

    Allows you to create a resource by fetching its content from a
    specified file (e.g., XML, WSDL, JAR). For example,

    ![](attachments/33128918/33325824.png){width="650"}

    #### Importing content from URL

    Allows you to fetch a resource from a specified URL path. For
    example,

    ![](attachments/33128918/33325823.png){width="650"}

    #### Creating text content

    Allows you to write the content in the UI itself, using either the
    Rich Text Editor or Plain Text Editor. For example,

    ![](attachments/22185139/22514118.png){width="500"}

    You can add external links (hyperlinks) as resources in the
    registry. To add such a link, create a text resource with the media
    type `            application/vnd.wso2-hyperlink           ` and
    specify the URL as the resource's content.

    #### Creating custom content

    Allows you to create your own type of content with a specified media
    type. For example, to add a user profile to the registry, create
    custom content with the media type
    `           application/vnd.wso2-profiles+xml          ` and provide
    the user name. For example,

    ![](attachments/22185139/22514117.png)

### Editing resources

If you select a resource, in its detailed view, you can see the Content
panel , which provides a UI to edit, upload, and download the content as
follows:

![](attachments/22185137/22514094.png)

-   **Display as text** : Allows only to view the configuration of a
    resource. For example, ****  
    ****

    ![](attachments/22185137/22514098.png)

-   **Edit as text** : Allows to edit a resource either in plain text
    editor or rich text editor. **  
    **

    ![](attachments/22185137/22514096.png)

-   **Upload** : Allows to upload a file to the resource. The existing
    content of the resource will be replaced by the you upload.

    !!! note **NOTE** : Be sure to upload a file of the same type as the
        existing resource, in order to avoid corrupting the resource. For
        resources such as WSDLs or Schemas, **do not** upload modifications

-   **Download** : Allows to download a resource from its host to a file
    in a specified location. **  
    **

    If a Security Warning appears when you try to download a resource,
    click **Save** to start downloading.

    ![](attachments/22185137/22514091.png)

### Adding links

**Symbolic** **links** are much like hyperlinks to existing resources or
collections in the local registry instance. When you access a symbolic
link, the actual resource metadata, community features, associations and
the content can be viewed from that location. If you make a change to
the Symlink resource, the actual resource will get affected. These
Symlink resources are soft links so that the actual resource does not
keep a count for links from which it is referenced by. Instead the link
shows a resource with a description saying that it could not make link
to the original resource. Symbolic and remote links does not support
versioning at the moment.

**Remote** **links** are created to mount a collection of a remotely
deployed registry instance to the local instance. Any path/collection of
the remote instance can be mounted at any point in the local instance.
After mounting, the rest is very similar to symbolic links. You can work
on the remote resource from the local instance.

Follow the instructions below to create a link on a resource/collection
in the collection.

1.  Symbolic links and Remote links can be created in a similar way to
    adding a normal resource. To add a link, click "Create Link" in the
    "Entries" panel.  
    ![](attachments/22185140/22514132.png)
2.  From the drop-down menu, select a symbolic or a remote link to
    add:  

    ##### Symbolic links

    When adding a Symbolic link, enter a name for the link and the path
    of the existing resource or collection being linked. It creates a
    link to the particular resource.

    ![](attachments/22185140/22514127.png)

    The created Symbolic link is shown by an icon with an arrow in the
    Entries panel.

    ![](attachments/22185140/22514131.png)

    ##### Remote links

    You can mount a collection in a remotely deployed registry instance
    to your registry instance by adding a remote link. Provide a name,
    the instance to which you are going to mount and also the path of
    the remote collection. If no path is given, the root collection will
    be mounted.

    ![](attachments/22185140/22514129.png)

    After mounting the Remote collection, you can access and work on
    that collection from your local instance.
