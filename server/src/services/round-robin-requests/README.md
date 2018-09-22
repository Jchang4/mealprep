# Round Robin Requests
Make requests to several Recipe APIs in a round robin fashion. This prevents being rate-limited and going over the number of allowed API calls. 

The goal is to prevent being banned!


## How does it work?
We will use `RecipeApiEvents` every time an API call is made. In general there are two types of requests that Recipe API companies keep an eye on:
- api calls per minute : rate limit; i.e. 5 / minute
- number of api responses : limit to the total num. of responses; i.e. 5000 / day

Given `RecipeApiProfiles`, we know exactly how many calls we can make per day, and which api calls we can make the most calls to. In order to rate limit ourselves, we will perform these api calls in a **round robin** fashion. Once we've used up all of the API calls we will ignore the profile and move onto the next. Once we have used up all of our API calls we will default to only our API. 


## Configuration