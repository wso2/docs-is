# Configure UI branding

{{product_name}} allows you to customize the user interfaces (UIs) displayed to your users during login, sign-up, account recovery, and self-service.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

Customizations take effect at two levels:

- **Organization-wide Branding**: This functions as the default branding and applies to all applications in an organization.
- **Application-specific Branding**: Each application can have its own branding. This overrides the organization-wide branding applied by default to the application.

By branding these interfaces, your users will experience a familiar and consistent look and feel that aligns with your organizational or application-specific themes.

!!! note "UI Branding for B2B applications"

    If you have implemented [B2B organizations]({{base_path}}/guides/organization-management/), the behavior of each branding levels will work as follows:

    **For organization-specific branding**:

    - You may configure separate UI branding for each organization. 
    - If you have not configured UI branding for your organization, the UI branding of your immediate parent  organization will be applied to the organization. If your parent organization has no branding, the  grand-parent organization's branding will apply. This will continue all the way until the root organization.  If the root organization has no branding, the default {{product_name}} branding will apply.
     
    **For application-specific branding**:

    - If you configure application-specific branding, it will override the organization’s branding for that  application.
    - If no application-specific branding is set, the UI branding of the organization will be applied. If the  organization has no branding, the application-specific branding of the immediate parent's organization will  apply. This will continue all the way until the root organization. If the root organization has no branding, the default {{product_name}} branding will apply.


    ![{{ product_name }} branding path resolver]({{base_path}}/assets/img/guides/branding/generic-app-branding-resolver-path.png)

!!! note
    See the complete list of [UI branding options](#ui-branding-preferences) currently available in {{ product_name }}.

{% else %}

!!! note "UI Branding for B2B applications"
    If you have created [organizations]({{base_path}}/guides/organization-management/manage-organizations/), note that you can configure separate UI branding for your organizations. If you have not configured UI branding for your organization, the UI branding of your immediate parent organization will be applied to the organization. If your parent organization has no branding, the grand-parent organization's branding will apply. This will continue all the way until the root organization. If the root organization has no branding, the default {{product_name}} branding will apply.

By branding these interfaces, users will get a familiar and consistent user experience.

!!! note
    See the complete list of [UI branding options](#ui-branding-preferences) currently available in {{ product_name }}.

{% endif %}

![{{ product_name }} branding example]({{base_path}}/assets/img/guides/branding/branding-example.png)

## Update branding

Follow the steps given below to configure branding preferences:

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

1. On the {{ product_name }}, go to **Branding** > **Styles & Text**.

2. In the top right corner, select either **Organization** for organization-wide branding or **Application** and choose an application for application-specific branding.

    ![{{ product_name }} Console - Branding UI]({{base_path}}/assets/img/guides/branding/branding-console-ui.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
   
   
    !!! note
       
        You may also navigate to application branding by going to the **General** tab of your application and under **Branding**, selecting **Go to Application Branding**.

2. Update the [UI branding options](#ui-branding-preferences) in the **General**, **Design**, **Advanced**, and **Text** tabs.

    !!! note
        - Text branding is currently not available for application-specific branding. You can still configure text branding at the organization level, and it will apply to all applications unless overridden by application-specific branding in other areas.
        - If you leave any of the branding preferences empty, {{ product_name }} defaults will be used.
        - The real-time preview will show you a sample view as you update the values.

3. Click **Save & Publish** to publish your branding configurations.

{% else %}

1. On the {{ product_name }}, go to **Branding** > **Styles & Text**.

    ![{{ product_name }} Console - Branding UI]({{base_path}}/assets/img/guides/branding/branding-console-ui.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Update the [UI branding options](#ui-branding-preferences) in the **General**, **Design**, **Advanced**, and **Text** tabs.

    !!! note
        - If you leave any of the branding preferences empty, {{ product_name }} defaults will be used.
        - The real-time preview will show you a sample view as you update the values.

3. Click **Save & Publish** to publish your branding configurations.

{% endif %}

The email templates of the organization will be automatically updated according to your branding preferences if the preferences are in the published state. See [Customize email templates]({{base_path}}/guides/branding/customize-email-templates/#configure-email-templates) for more information.

{{ powered_by_note }}

## Preview branding

You can preview how your branding preferences will look once they are saved and published.

To preview your branding configurations for different flows, on the **Preview** window, select the screen you wish to preview from the **Screen** list.

![{{ product_name }} Console - Branding Preview]({{base_path}}/assets/img/guides/branding/branding-preview.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Disable branding

You can temporarily disable your branding preferences by clicking **Unpublish** in the **Danger Zone**. Your progress will be preserved up to the point and you can choose to publish them again later by clicking on the **Save & Publish** button.

When disabled, {{ product_name }}'s default branding will apply to the interfaces in your application's login, user registration, account recovery flows, and My Account portal.

## Revert branding

If you want to revert your branding preferences, scroll down to the **Danger Zone** and click **Revert to default**.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

!!! warning
    Note that this permanently removes all the branding options that you have saved and the branding of the next available level (such as organization branding or {{ product_name }} defaults) will be applied to your organization or application.

{% else %}

!!! warning
    Note that this permanently removes all the branding options that you have saved and the {{ product_name }} defaults will immediately apply.

{% endif %}

{{ asgardeo_help }}

## UI branding preferences

Listed below are the branding preferences that you can use to customize the {{ product_name }} interfaces (UIs) presented to your users.

### General preferences

Listed below are general branding preferences you can apply to the interfaces.

<table>
   <tr>
      <td><b>Organization Display Name</b></td>
      <td>This name will appear as the organization name in the emails that send to your users. If not set, {{ product_name }} defaults are used.</td>
   </tr>   
    <tr>
      <td><b>Contact Email</b></td>
      <td>This email address will appear on emails, error pages and, other pages where users would require support from the organization admin.</td>
   </tr>
</table>

### Design preferences

Listed below are the design changes you can apply to the user registration interface, login interfaces and My Account portal.

!!! Note
    
    My Account branding can only be configured at the organization level.

#### Layout variations

Select one of the available layouts for your user registration and login interfaces. {{ product_name }} uses the **Centered** layout by default.

{% if product_name == "Asgardeo" %}
!!! note "Custom layout"
    If you want to use the **Custom** layout from the list (shown below), contact Asgardeo support through the [WSO2 cloud support portal](https://cloud-support.wso2.com/){:target="_blank"} or send a request email to `asgardeo-help@wso2.com` and the team will get back to you with instructions.

    ![Select custom login layout]({{base_path}}/assets/img/guides/branding/select-custom-layout.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    Note that these requests should be sent from the account of an administrator in the organization.     
{% endif %}

#### Theme variations

Select from either **Dark** or **Light** theme variations to modify the styling of your user registration screen, login screen and My Account portal. {{ product_name }} uses the **Light** theme by default.

#### Theme preferences

The following design preferences apply to the theme you select. You can configure and save separate design preferences for each of the themes.

??? note "Images"

      You can configure the {{ product_name }} logo, My Account logo, and favicon for the theme you selected.

      <table>
         <tr>
            <td><b>Logo</b></td>
            <td> This is the logo that appears above the login box in login screens and in emails sent by the organization. Update the following values to set the logo:
               <ul>
                  <li><b>URL</b>: You can update the logo by specifying the URL of a hosted image.</li>
                  <li><b>Alt Text</b>: The 'Alt text' or 'alternative text' is a short description of an image. This text is useful to make sense of the image when it can't be viewed for some reason. A descriptive alt text is always a good practice to improve accessibility.</li>
               </ul>
               Use an image that's at least 600x600 pixels and less than 1MB in size for better performance.
            </td>
         </tr>
         <tr>
            <td><b>Favicon</b></td>
            <td>Browsers that provide favicon support typically display a page's favicon in the browser's address bar and next to the page's name in a list of bookmarks.</br></br>
            You can update the favicon by specifying the URL of a hosted image (of type <b>png</b>, <b>ico</b>, etc.).</br></br>
            Use an image with a square aspect ratio that's at least 16x16 pixels in size for better results.
            </td>
         </tr>
         <tr>
            <td><b>My Account Logo</b></td>
            <td> This is the logo that appears in the header of the My Account portal. Update the following values to set the logo:
               <ul>
                  <li><b>URL</b>: You can update the logo by specifying the URL of a hosted image.</li>
                  <li><b>Alt Text</b>: The 'Alt text' or 'alternative text' is a short description of an image. This text is useful to make sense of the image when it can't be viewed for some reason. A descriptive alt text is always a good practice to improve accessibility.</li>
                  <li><b>Logo Title</b>: The text shown beside the Logo.</li>
               </ul>
               Use an image that's at least 250x50 pixels and less than 1MB in size for better performance.
            </td>
         </tr>
      </table>

    !!! note "Important"
        Be sure that the hosted image you use will properly return Content-Type headers. Without these headers, the image will not correctly render and you will experience a 403 error. You can use static image hosting services to ensure these headers are properly returned.

??? note "Color Palette"
    This is the primary color palette for your interfaces. Click the color swatch and apply colors that match your organization's style guide.

    <table>
       <tr>
          <td><b>Primary Color</b></td>
          <td>
             The color that appears dominantly in primary actions, anchor tags, emails, etc.</br></br>
             By default, {{ product_name }} uses an orange shade as the primary color for both <b>Light</b> and <b>Dark</b> themes
          </td>
       </tr>
       <tr>
          <td><b>Secondary Color</b></td>
          <td>
             The color that appears in secondary actions and other emphasized content.</br></br>
             By default, {{ product_name }} uses a lighter gray shade as the secondary color.
          </td>
       </tr>
    </table>

    #### Body background
    
    <table>
       <tr>
          <td><b>Main Background Color</b></td>
          <td>
             This is the main background color used in the UIs. This will be used as the  background color for login, sign-up, and account recovery flows, and on the My  Account portal.
          </td>
       </tr>
    </table>
    
    #### Surface background
    
    <table>
       <tr>
          <td><b>Main Surface Background Color</b></td>
          <td>
             The main background color used in surface elements like cards, popups, panels, etc.
          </td>
       </tr>
       <tr>
          <td><b>Light Surface Background Color</b></td>
          <td>
             A lighter variation of the background color used in specific parts of the surface  elements like cards, popups, panels, etc.
          </td>
       </tr>
       <tr>
          <td><b>Dart Surface Background Color</b></td>
          <td>
             A darker variation of the background color used in specific parts of the surface  elements like cards, popups, panels, etc.
          </td>
       </tr>
       <tr>
          <td><b>Inverted Surface Background Color</b></td>
          <td>
             The inverted variation of the background color used in surface elements like the application header in the My Account portal.
          </td>
       </tr>
    </table>
    
    #### Outlines
    
    <table>
       <tr>
          <td><b>Default Outline Color</b></td>
          <td>
             The default outline color used in elements like cards, tooltips, dropdowns, etc.
          </td>
       </tr>
    </table>
 
    #### Text Colors
 
    <table>
       <tr>
          <td><b>Primary Text Color</b></td>
          <td>
             The primary text color used in the user interface. Select a color that provides good contrast against the background color and is easy to read.
          </td>
       </tr>
       <tr>
          <td><b>Secondary Text Color</b></td>
          <td>
             The secondary text color used in the user interface. Select a color that compliments  the primary color and enhances the visual hierarchy of your design.
          </td>
       </tr>
    </table>
 
    #### Alerts
 
    <table>
       <tr>
          <td><b>Neutral Alert Background Color</b></td>
          <td>
             The color of the message boxes that appears to convey non-critical information or  feedback.
          </td>
       </tr>
       <tr>
          <td><b>Info Alert Background Color</b></td>
          <td>
             The color of the message boxes that appears to convey informative messages such as tips or additional information.
          </td>
       </tr>
       <tr>
          <td><b>Warning Alert Background Color</b></td>
          <td>
             The color of the message boxes that appears to convey warning messages such as  potential risks or notifications that require your attention.
          </td>
       </tr>
       <tr>
          <td><b>Error Alert Background Color</b></td>
          <td>
             The color of the message boxes that appears to convey error messages such as system     failures or critical errors.
          </td>
       </tr>
    </table>
 
    #### Illustrations
 
    <table>
       <tr>
          <td><b>Primary Color</b></td>
          <td>
             This is the primary color used for the SVG illustrations in My Account portal.
          </td>
       </tr>
       <tr>
          <td><b>Secondary Color</b></td>
          <td>
             This is the secondary color used for the SVG illustrations in My Account portal.
          </td>
       </tr>
       <tr>
          <td><b>Accent Color 1</b></td>
          <td>
             This is the primary accent color used for the SVG illustrations. Choose a color that  will draw attention to specific elements of your illustration and highlight key features of your user interface design.
          </td>
       </tr>
       <tr>
          <td><b>Accent Color 2</b></td>
          <td>
             This is the secondary accent color used for the SVG illustrations. Choose an alternate  accent color that harmonizes with your design aesthetic and enhances the overall visual appeal of your SVG illustration.
          </td>
       </tr>
       <tr>
          <td><b>Accent Color 3</b></td>
          <td>
             This is the tertiary accent color used for the SVG illustrations. Choose an accent color  that harmonizes with your design aesthetic and enhances the overall visual appeal of your SVG illustration.
          </td>
       </tr>
    </table>

??? note "Footer"
    Decide how you want the footer to look in the login screens by modifying the following attributes:

    <table>
       <tr>
          <td><b>Border Color</b></td>
          <td>
             The color of the top border of the footer that appears on the login screens.</br></br>
             By default, the <b>Default Outline Color</b> from the <b>Color Palette</b> will be used     until a value for this is defined.
          </td>
       </tr>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             The font color of the texts and links that appear on the footer.</br></br>
             By default, the <b>Primary Text Color</b> from the <b>Color Palette</b> will be used until     a value for this is defined.
          </td>
       </tr>
    </table>

??? note "Font"

    Use one of the following options to override the default font for the theme you selected.
    
    #### Use a web-safe font
    
    <table>
       <tr>
          <td><b>Font Family</b></td>
          <td>
             The list of available web-safe fonts to select from.</br></br>
             By default, {{ product_name }} uses Montserrat as the font family.
          </td>
       </tr>
    </table>
    
    #### Import a font
    
    <table>
       <tr>
          <td><b>Font Import URL</b></td>
          <td>
             Get the URL of a hosted font from the font service and add it here.</br></br>
             E.g., <code>https://fonts.googleapis.com/css2?family=Poppins&display=swap</code>
          </td>
       </tr>
       <tr>
          <td><b>Font Family</b></td>
          <td>
             This is the font family corresponding to the font imported using the URL  (specified in the     <b>Font Import URL</b> field).</br></br>
             E.g., <code>Poppins</code>, <code>Sans-serif</code>
          </td>
       </tr>
    </table>

??? note "Headings"

    These preferences decide the look and feel of  `h1`, `h2`, `h3`, `h4`, `h5`, and `h6` elements on     the login screens.
    
    <table>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the headings that appear on the login screens.</br></br>
             By default, the <b>Default Outline Color</b> from the <b>Color Palette</b> will be used     until a value for this is defined.
          </td>
       </tr>
    </table>

??? note "Buttons"

    These preferences change the look and feel of buttons that appear on the login screens.
    
    #### Primary Button
    
    <table>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the text inside the primary action buttons.</br></br>
             By default, {{ product_name }} uses white as the font color for primary buttons.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border radius of the primary action buttons.</br></br>
             By default, {{ product_name }} uses <b>22</b> pixels as the border-radius for primary     buttons.
          </td>
       </tr>
    </table>
    
    #### Secondary Button
    
    <table>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the text inside the secondary action buttons.</br></br>
             By default, {{ product_name }} uses black as the font color for secondary     buttons.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border radius of the secondary action buttons.</br></br>
             By default, {{ product_name }} uses <b>22</b> pixels as the border-radius for secondary     buttons.
          </td>
       </tr>
    </table>
    
    #### External Connection Button
    
    These preferences change the look and feel of buttons used for linking external identity providers     (Facebook, Google, etc.) from the login screens.
    
    <table>
       <tr>
          <td><b>Background Color</b></td>
          <td>
             This is the background color for external-connection buttons.</br></br>
             By default, {{ product_name }} uses white as the font color for     external-connection buttons.
          </td>
       </tr>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the text inside the external-connection buttons.</br></br>
             By default, {{ product_name }} uses black as the font color for     external-connection buttons.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border radius of the external-connection buttons.</br></br>
             By default, {{ product_name }} uses <b>22</b> pixels as the border-radius for     external-connection buttons.
          </td>
       </tr>
    </table>

??? note "Inputs"

    These preferences change the look and feel of input fields, checkboxes, etc. on the login screens.
    
    <table>
       <tr>
          <td><b>Background Color</b></td>
          <td>
             This is the background color of the inputs on the login screens.</br></br>
             By default, {{ product_name }} uses white as the background color for the inputs.
          </td>
       </tr>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the inputs on the login screens.</br></br>
             By default, the <b>Primary Text Color</b> from the <b>Color Palette</b>  will be used until     a value for this is defined.
          </td>
       </tr>
       <tr>
          <td><b>Border Color</b></td>
          <td>
             This is the border color of the inputs on the login screens.</br></br>
             By default, the <b>Default Outline Color</b> from the <b>Color Palette</b> will be used     until a value for this is defined.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border radius of the login box.</br></br>
             By default, {{ product_name }} uses <b>8</b> pixels as the border-radius for the login box.
          </td>
       </tr>
    </table>
    
    #### Input Labels
    
    <table>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the input labels on the login screens.</br></br>
             By default, the page font color will be used until a value for this is defined.
          </td>
       </tr>
    </table>

??? note "Login Page"

    These are the specific design preferences you can update specifically for login, sign-up, account     recovery flows. If these are not set,
    the values will be inferred from the color palette.
    
    <table>
       <tr>
          <td><b>Background Color</b></td>
          <td>
             This is the background color that appears on the login, sign-up, account recovery screens.</    br></br>
             By default, the <b>Main Background Color</b> from the <b>Color Palette</b> will be used     until a value for this is defined.
          </td>
       </tr>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             The font color of the text that appears on the login, sign-up, account recovery screens.</    br></br>
             By default, the <b>Primary Text Color</b> from the <b>Color Palette</b> will be used until     a value for this is defined.
          </td>
       </tr>
    </table>

??? note "Login Box"

    These preferences change how the login box appears on the screens.
    
    <table>
       <tr>
          <td><b>Background Color</b></td>
          <td>
             This is the background color of the login box.</br></br>
             By default, the <b>Main Surface Background Color</b> from the <b>Color Palette</b> will be     used until a value for this is defined.
          </td>
       </tr>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the text inside the login box.</br></br>
             By default, the <b>Primary Text Color</b> from the <b>Color Palette</b> will be used until     a value for this is defined.
          </td>
       </tr>
       <tr>
          <td><b>Border Color</b></td>
          <td>
             This is the border color of the login box.</br></br>
             By default, the <b>Default Outline Color</b> from the <b>Color Palette</b> will be used     until a value for this is defined.
          </td>
       </tr>
       <tr>
          <td><b>Border Width</b></td>
          <td>
             This is the border width of the login box.</br></br>
             By default, {{ product_name }} uses <b>one</b> pixel as the border width for the login box.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border-radius of the login box.</br></br>
             By default, {{ product_name }} uses <code>12</code> pixels as the border-radius for the login box.
          </td>
       </tr>
    </table>

### Advanced preferences

Listed below are some advanced branding preferences you can apply to the user registration and login interfaces.

<table>
   <tr>
      <td><b>Privacy Policy</b></td>
      <td>
         This is a link to a statement or a legal document that states how your organization collects, handles, and processes the data of your users and visitors.</br></br>
         Once you configure a valid URL, {{ product_name }} will show this on the footer of the login screens.
      </td>
   </tr>
   <tr>
      <td><b>Terms of Service</b></td>
      <td>
         This is a link to an agreement that your users must agree to and abide by in order to use your organization's applications or other services.</br></br>
         Once you configure a valid URL, {{ product_name }} will show this on the footer of the login screens.
      </td>
   </tr>
   <tr>
      <td><b>Cookie Policy</b></td>
      <td>
         This is a link to a document or a webpage with detailed information on all cookies used by your applications and the purpose of each of them.
      </td>
   </tr>
   <tr>
      <td><b>Self Signup</b></td>
      <td>
         This is a link to your organization's self signup page.
      </td>
   </tr>
</table>

#### Locale-aware URLs

By default, {{product_name}} automatically appends the `ui_locales` parameter with the selected locale to URLs. However, if you need to tailor your URL structure to meet specific requirements, you can use the following placeholders to create a more customized URL:

##### Supported placeholders:

- **`{{locale}}`**: This placeholder represents the complete locale tag, including both the language and country, separated by a hyphen. For example, `ja-JP`.
- **`{{country}}`**: Use this placeholder to insert the country code. For example, `JP`.
- **`{{lang}}`**: This placeholder is for the language code. For example, `ja`.

These placeholders provide flexibility in constructing URLs that adapt to different regions, languages, and countries. Customize your URLs to deliver a personalized user experience.

##### Examples of customized URLs:

1. Constructing a URL with the complete locale tag:

    === "URL format"
        
        `https://example.com/{{locale}}/page`

    === "Sample"
        
        Assume `ja-JP` is selected as the locale: `https://example.com/ja-JP/page`

2. Inserting the country code into the URL:

    === "URL format"
        `https://example.com/country/{{country}}/page`

    === "Sample"
        If the selected country code is `JP`: `https://example.com/country/JP/page`

3. Using the language code in the URL:

    === "URL format"
        `https://example.com/lang/{{lang}}/page`

    === "Sample"
        If the selected language code is `ja`: `https://example.com/lang/ja/page`

4. Combining language and country codes:

    === "URL format"
        `https://example.com/{{lang}}_{{country}}/page`

    === "Sample"
        If the selected language code is `ja`, the country code is `JP`, and the delimiter is underscore: `https://example.com/ja_JP/page`

### Text preferences

You can add text branding to screens of your organization in a language listed under the `Locale` list of **Text** branding.

Listed below are the text branding preferences you can apply to the screens in your organization.

<table>
   <tr>
      <th>Screen</th>
      <th style="width: 200px;">Field</th>
      <th>Description</th>
   </tr>
   <tr>
      <td rowspan="2"><b>Common</b></td>
      <td><code>copyright</code></td>
      <td>This text is displayed at the footer of all login screens within your organization and in emails from your organization, providing essential legal or branding information.</td>
   </tr>
   <tr>
      <td><code>site.title</code></td>
      <td>The site title may appear in browser tabs, search engine results, social shares, etc. You can use any meaningful text here.</td>
   </tr>
   <tr>
      <td rowspan="2"><b>Login</b></td>
      <td><code>login.button</code></td>
      <td>This is the text that appears on the main action button of the login box for your organization. </td>
   </tr>
   <tr>
      <td><code>login.heading</code></td>
      <td>This is the main heading of the login box, serving as a concise introduction to the login page.</td>
   </tr>
   <tr>
      <td><b>SMS OTP</b></td>
      <td><code>sms.otp.heading</code></td>
      <td>This is the heading of the SMS OTP box.</td>
   </tr>
   <tr>
      <td><b>Email OTP</b></td>
      <td><code>email.otp.heading</code></td>
      <td>The heading of the Email OTP box.</td>
   </tr>
   <tr>
      <td><b>TOTP</b></td>
      <td><code>totp.heading</code></td>
      <td>This is the heading of the TOTP box.</td>
   </tr>
   <tr>
      <td rowspan="2"><b>Sign Up</b></td>
      <td><code>sign.up.button</code></td>
      <td>The text on the primary action button within the sign-up box.</td>
   </tr>
   <tr>
      <td><code>sign.up.heading</code></td>
      <td>This is the main heading of the sign-up box, providing a brief introduction to the registration page within your organization.</td>
   </tr>
</table>

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}
!!! note
    - Adding custom fields to the text preferences is not supported.
    - Text branding is currently not available for application-specific branding.

{% else %}
!!! note
    Adding custom fields to the text preferences is not supported.

{% endif %}
