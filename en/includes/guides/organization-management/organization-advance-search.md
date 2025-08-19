## Search an organization

You can search for an organization by the organization's **Name** and **Meta Attributes** in the {{ product_name }} Console using the **Advanced Search** feature.

There are two ways to search for an organization:

1. Using the **Advanced Search Dropdown UI** as shown below.

    ![organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-advance-search-dropdown.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

   {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0" ) %}
   
      By checking the **Search in nested levels** checkbox in the Advanced Search Dropdown, you can search for an organization in the nested levels instead of just the immediate level organizations.
   
      Clicking on the search result allows you to view the exact path where the organization exists.
   
      ![nested-level-organization-search]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-nested-level-search.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
   {% endif %}

2. Using the **Search Bar**.

    You can type the search query directly into the search bar.

    e.g., name co Best, attributes.Country eq USA. (Multiple filters can be connected using the **and** operator)

    ![organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-advance-search.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}