FROM frolvlad/alpine-python-machinelearning
MAINTAINER Justin Chang "justinchangmusic@gmail.com"

WORKDIR /usr/src/app/
COPY . .

# Install Dependencies
RUN pip install --no-cache-dir -r requirements.txt
COPY ./data/nltk_data /usr/nltk_data
