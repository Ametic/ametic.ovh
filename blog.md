---
layout: main.njk
title: Blog
templateEngineOverride: njk,md
---
# Blog

{% if collections.posts and collections.posts.length %}
{% for post in collections.posts | reverse %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}
{% else %}
No posts yet.
{% endif %}
