# TODO
1. ~~Singularize~~
2. ~~Flask app returns singuarlized units~~
3. Add POS tagging
  ```
  from nltk import pos_tag
  ```
4. Remove "next_label" from NaiveBayes - can only use previous labels
5. Remove stop words
    ```
    from nltk.corpus import stopwords

    example_sent = "This is a sample sentence, showing off the stop words filtration."

    stop_words = set(stopwords.words('english'))

    word_tokens = word_tokenize(example_sent)

    filtered_sentence = [w for w in word_tokens if not w in stop_words]

    filtered_sentence = []

    ```

6. Add Stemmer
  https://pythonprogramming.net/stemming-nltk-tutorial/?completed=/stop-words-nltk-tutorial/
  ```
  from nltk.stem import PorterStemmer
  ```



# Build
  * `./k8/build.sh` this will build a new docker image named "mealprep-nlp:latest" and delete the previous k8 pod
  * `miniDeploy k8/miniService.yaml && miniDeploy k8/miniDeploy.yaml` to create a k8 service and deployment
