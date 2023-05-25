# WingVision

## Overview
    
Study Project at Peter the Great St. Petersburg Polytechnic University

This service uses state-of-the-art machine learning algorithms to analyze video streams and identify the presence of
birds. It then saves only those segments of the video that contain birds, making it easier than ever to capture stunning
footage of these magnificent creatures in their natural habitats.

The service is perfect for wildlife enthusiasts, researchers, conservationists, and filmmakers who want to easily
monitor bird behavior, identify different bird species, and protect endangered bird populations.

## Run the project

```bash
docker compose up -d

cd api
cp .env.example .env
npx prisma db push
```

## Prisma cheatsheet 

```bash
npx prisma migrate dev --name init
npx prisma generate
```