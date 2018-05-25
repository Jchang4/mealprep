#!/bin/bash

# Delete Service & Deployment
kubectl delete svc mealprep-nlp && kubectl delete deploy mealprep-nlp && \
# Create Docker Build
docker build -f k8/Dockerfile -t mealprep-nlp:latest . && \
# Deploy Service & Deployment
kubectl apply -f k8/minikube.yaml
