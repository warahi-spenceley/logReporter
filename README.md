# Introduction

## Project description
This repository contains the source code for logreporter, a project that reads `.log` files and consoles the following specific data:
* How many unique IP addresses
* The top 3 most visited URLs
* The top 3 most active IP addresses

# Development Environment
## Requirements
* Install the tools below:
  * NodeJS
  * npm

## How to run locally

### Install dependencies
```
npm install
```

### How to run the report
```
npm run report
```
Will take the data from `./example-data.log` and console log a report containing the following:
* Total number of unique IP addresses
* Top 3 most visited URLs
* Top 3 most active IP addresses

### How to run tests
```
npm run test
```
Will run the unit tests.