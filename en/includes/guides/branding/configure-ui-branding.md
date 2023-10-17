# Configure UI branding

You can customize the user interfaces (UIs) presented to your users during the login, sign-up, and account recovery flows, and on the My Account portal according to the theming guidelines of your organization.

!!! note "UI Branding for B2B applications"
    If you have created [suborganizations]({{base_path}}/guides/organization-management/manage-b2b-organizations/manage-suborganizations/), note that the branding you configure for your root organization also applies to your suborganizations.

By branding these interfaces, users will get a familiar and consistent user experience.

!!! note
    See the complete list of [UI branding options](#ui-branding-preferences) currently available in {{ product_name }}.

![{{ product_name }} branding example]({{base_path}}/assets/img/guides/branding/branding-example.png)

## Update branding

Follow the steps given below to configure the branding preferences for your organization.

1. On the {{ product_name }}, go to **Customization** > **Branding**.

    ![{{ product_name }} Console - Branding UI]({{base_path}}/assets/img/guides/branding/branding-asgardeo-console-ui.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

2. Update the [UI branding options](#ui-branding-preferences) in the **General**, **Design**, and **Advanced** tabs.

    !!! note
        - If you leave any of the branding preferences empty, {{ product_name }} defaults will be used.
        - The real-time preview will show you a sample view as you update the values.

4. Click **Save & Publish** to publish your branding configurations.

The email templates of the organization will be automatically updated according to your branding preferences if the preferences are in the published state. See [Branding email templates]({{base_path}}/guides/branding/customize-email-templates/#configure-email-templates) for more information.

{{ powered_by_note }}

## Disable branding

You can temporarily disable your branding preferences by clicking **Unpublish** in the **Danger Zone**. Your progress will be preserved up to the point and you can choose to publish them again later by clicking on the **Save & Publish** button.

When disabled, {{ product_name }}'s default branding will apply to the interfaces in your application's login, user registration, account recovery flows, and My Account portal.

## Revert branding

If you want to revert your branding preferences, scroll down to the **Danger Zone** and click **Revert to default**.

!!! warning
    Note that this permanently removes all the branding options that you have saved and the {{ product_name }} defaults will immediately apply.

## Preview branding

You can preview how your branding preferences will look once they are saved and published.

To preview your branding configurations for different flows, on the **Preview** window, select the screen you wish to preview from the **Screen** list.

![{{ product_name }} Console - Branding Preview]({{base_path}}/assets/img/guides/branding/branding-preview.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

{{ asgardeo_help }}

## UI branding preferences

Listed below are the branding preferences that you can use to customize the {{ product_name }} interfaces (UIs) presented to your users.

### General preferences

Listed below are general branding preferences you can apply to the interfaces.

<table>
   <tr>
      <td><b>Site Title</b></td>
      <td>The site title may appear in browser tabs, search engine results, social shares, etc. You can use any meaningful text here.</td>
   </tr>
   <tr>
      <td><b>Copyright Text</b></td>
      <td>The copyright text is a short description that informs users about the copyright law protecting your applications.</br></br>
      In {{ product_name }}, the copyright text will appear on the footer of the login screens and on the footer of emails.
      </td>
   </tr>
   <tr>
      <td><b>Contact Email</b></td>
      <td>This email address will appear on emails, error pages and, other pages where users would require support from the organization admin.</td>
   </tr>
</table>

### Design preferences

Listed below are the design changes you can apply to the user registration and login interfaces.

#### Layout variations

Select one of the available layouts for your login interfaces. {{ product_name }} uses the **Centered** layout by default.

!!! note Custom layout
    If you want to use the **Custom** layout from the list (shown below), contact {{ product_name }} support through the [WSO2 cloud support portal](https://cloud-support.wso2.com/) or send a request email to `asgardeo-help@wso2.com` and the team will get back to you with instructions.

    ![Select custom login layout]({{base_path}}/assets/img/guides/branding/select-custom-layout.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    Note that these requests should be sent from the account of an administrator in the organization.

#### Theme variations

Select from either **Dark** or **Light** theme variations to modify the styling of your login screens. {{ product_name }} uses the **Light** theme by default.

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
               Use an image that’s at least 600x600 pixels and less than 1MB in size for better performance.
            </td>
         </tr>
         <tr>
            <td><b>Favicon</b></td>
            <td>Browsers that provide favicon support typically display a page's favicon in the browser's address bar and next to the page's name in a list of bookmarks.</br></br>
            You can update the favicon by specifying the URL of a hosted image (of type <b>png</b>, <b>ico</b>, etc.).</br></br>
            Use an image with a square aspect ratio that’s at least 16x16 pixels in size for better results.
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
               Use an image that’s at least 250x50 pixels and less than 1MB in size for better performance.
            </td>
         </tr>
      </table>

    !!! note "Important"
        Be sure that the hosted image you use will properly return Content-Type headers. Without these headers, the image will not correctly render and you will experience a 403 error. You can use static image hosting services to ensure these headers are properly returned.

??? note "Color Palette"
    This is the primary color palette for your interfaces. Click the color swatch and apply colors that match your organization’s style guide.

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
             The inverted variation of the background color used in surface elements like the     application header in the My Account portal.
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
             By default, {{ product_name }} uses <b>four</b> pixels as the border-radius for primary     buttons.
          </td>
       </tr>
    </table>
    
    #### Secondary Button
    
    <table>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the text inside the secondary action buttons.</br></br>
             By default, {{ product_name }} uses a dark gray shade as the font color for secondary     buttons.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border radius of the secondary action buttons.</br></br>
             By default, {{ product_name }} uses <b>four</b> pixels as the border-radius for secondary     buttons.
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
             By default, {{ product_name }} uses a light gray shade as the font color for     external-connection buttons.
          </td>
       </tr>
       <tr>
          <td><b>Font Color</b></td>
          <td>
             This is the font color of the text inside the external-connection buttons.</br></br>
             By default, {{ product_name }} uses a dark gray shade as the font color for     external-connection buttons.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border radius of the external-connection buttons.</br></br>
             By default, {{ product_name }} uses <b>four</b> pixels as the border-radius for     external-connection buttons.
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
          <td><b>Border Width</b></td>
          <td>
             This is the border radius of the inputs on the login screens.</br></br>
             By default, {{ product_name }} uses <code>four</code> pixels as the border-radius for the     login box.
          </td>
       </tr>
       <tr>
          <td><b>Border Radius</b></td>
          <td>
             This is the border radius of the login box.</br></br>
             By default, {{ product_name }} uses <b>12</b> pixels as the border-radius for the login box.
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
</table>
