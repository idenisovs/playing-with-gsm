# Playing with GSM

As it says, I made this repo to store my practice with different GSM functions and AT commands.

Probably, later there will be different NPM packages that might be easy to use around different systems.

## Motivation

There is incredible [Wammu](https://wammu.eu/) project, that does the same I want to do. Unfortunately, it won't work properly with the GSM dongle I already have, as also they haven't bindings for the [Node.js](https://nodejs.org/en/) that I prefer to use for my pet projects.  

## General classes

If you are looking over the source code, note that [Device](https://github.com/idenisovs/playing-with-gsm/blob/master/source/Device.ts) class has just some basic methods while [Modem](https://github.com/idenisovs/playing-with-gsm/blob/master/source/Modem.ts) operates at higher level, providing the API for further usage.

## AT commands

The [AT commands](https://en.wikipedia.org/wiki/Hayes_command_set#GSM) stored within the directory `AT`. They will be appended later, and probably, moved to separate [NPM](https://www.npmjs.com/) library.

## Hardware

Tested with `Huawei E1750` 3G modem. 