
# coding: utf-8

# In[ ]:

import json
from os.path import join, dirname
from watson_developer_cloud import AlchemyLanguageV1

alchemy_language = AlchemyLanguageV1(api_key='6026adae6314a2a74df3c7a23a8e99d7f6e20c28')

#url = 'https://developer.ibm.com/watson/blog/2015/11/03/price-reduction-for-watson-personality-insights/'
url = 'http://www.news.uwa.edu.au/201608248962/awards-and-prizes/research-help-premature-babies-recognised-national-awards'


# In[ ]:

print(json.dumps(alchemy_language.targeted_sentiment(text='I love cats! Dogs are smelly.',
                                                     targets=['cats', 'dogs'], language='english'), indent=2))

# In[ ]:

print(json.dumps(alchemy_language.author(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.keywords(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.concepts(max_items=2, url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.entities(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.dates(url=url, anchor_date='2016-03-22 00:00:00'), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.category(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.typed_relations(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.relations(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.language(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.text(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.raw_text(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.title(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.feeds(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.microformats(url='http://microformats.org/wiki/hcard-examples'), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.publication_date(url=url), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.taxonomy(url=url), indent=2))


# In[ ]:

combined_operations = ['page-image', 'entity', 'keyword', 'title', 'author', 'taxonomy', 'concept', 'doc-emotion', 'publication_date']
print(json.dumps(alchemy_language.combined(url=url, extract=combined_operations), indent=2))


# In[ ]:

print(json.dumps(alchemy_language.category(url=url), indent=2))
print(json.dumps(alchemy_language.typed_relations(url=url), indent=2))
print(json.dumps(alchemy_language.relations(url=url), indent=2))


# In[ ]:



