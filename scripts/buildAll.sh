#!/bin/bash
cd ~/Desktop/mealprep

echo 'Build nlp-ingredients'
cd ./nlp-ingredients
./k8/build.sh

echo ''
echo 'Build server'
cd ../server
./k8/build.sh
