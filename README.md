# Meal Prep App
Code is split up into three services:
  * Frontend
  * Server
  * NLP Ingredient Parser

# Build Project and Deploy to Minikube
`./scripts/buildAll.sh`


---

# Architecture: Save WebScraped Recipes to Database
Webscrape common recipes and put in database. Anytime someone asks for an ingredient combo with less than N results, we can add that search query to a queue. Finally, we can have a chron job that goes through the query and adds recipes. 

1. Pros
  - Scalable; since we have the data, the solution can be made scalable
  - AWS Hosting is very cheap
    - ~$0.115 per GB-month
2. Cons
  - Cannot download the code and work from any machine
    - Solution: Setup persistent database via droplet / heroku / etc.
  
---


# Designs:
  - https://dribbble.com/tags/cooking_app
  - https://www.awwwards.com/inspiration/search?text=cooking
