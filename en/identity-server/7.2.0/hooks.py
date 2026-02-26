import os
import json
from mkdocs.structure.nav import Section, Page, Link

def parse_json(file_path):
    features_to_remove = {"feature": {}, "page": []}
    with open(file_path, 'r') as json_file:
         parse_data = json.load(json_file)
         for feature, details in parse_data.items():
            enabled = details['enabled']
            page = details['page']
            features_to_remove['feature'][feature] = enabled
            
            if not enabled:
                features_to_remove['page'].extend(page)
    json_file.close()
    return features_to_remove

files_to_remove = parse_json(os.path.join(os.getcwd(), '../../asgardeo/features.json'))

def on_config(config):

    for feature, enabled in files_to_remove['feature'].items():
        config[feature] = True
       
    return config