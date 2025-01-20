# TwoFrame

[Design Document](https://docs.google.com/document/d/1roJpB6hwYXnBu9f7VOHHy2qPxTvn9sTQGKJnU_JaNqI/edit?usp=sharing)

## Requirements

[Docker](https://www.docker.com/products/docker-desktop/)

## Setup

1. Follow the instructions [here](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=access-method&access-method=studio) to get a local instance of supabase running.

2. Verify your supabase is up and running through docker, setup your .env file to use the local supabase urls (use `supabase status` to get the urls)
3. Make sure to run `npm install` before running the project with `npm run dev`

## Database Schema

1. Configure the schema you want to use within `src/db/schema.ts`.
2. `npx drizzle-kit generate` then `npx drizzle migrate` to migrate schema changes into your supabase instance
