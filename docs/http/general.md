---
sidebar_position: 1
---
# General best practices

- make as few requests as possible
    - avoid requests in loops
- use resolver instead of ngOnInit data fetching
- avoid multiple requests to get the data you want
    - if you need to combine the result of 2 requests = design issue
- avoid sequential requests
- avoid filtering request result, example : getting a list for just one item
- no HTTP call in loops