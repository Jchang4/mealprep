#!/bin/bash

# Delete prev deployment & service
kubectl delete deploy mealprep-api
kubectl delete svc mealprep-api

# Build Docker Image
docker build -f k8/Dockerfile -t mealprep-api:latest . && \

# Redeploy
kubectl apply -f k8/minikube.yaml
