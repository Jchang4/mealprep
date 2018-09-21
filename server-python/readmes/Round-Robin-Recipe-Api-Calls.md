# Prevent Getting Rate Limited
Keep getting rate limited because free plans only allow ~50 calls per day. To prevent getting banned, we will use a round-robin system. 

We will make sure the round-robin system uses a `weight` based on total # of calls per day allowed. This means APIs with better free plans (i.e. more API calls) will be used more. 

It's important to note that all of this information must be saved into our database based on id. We will keep track of a source and id to prevent collisions