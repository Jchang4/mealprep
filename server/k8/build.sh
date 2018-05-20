#!/bin/bash

BUILD_NUM=$1

if [ -z $BUILD_NUM ]; then
  BUILD_NUM='latest'
fi

function get_pod_name() {
  kubectl get pod | grep $1 | awk '{print $1}'
}

docker build -f k8/Dockerfile -t mealprep-api:$BUILD_NUM . && \
kubectl delete pod "$(get_pod_name mealprep-api)" && \
sleep 7 && \
kubectl get pod "$(get_pod_name mealprep-api)"
