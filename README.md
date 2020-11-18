# Playing with GSM

As it says, I made this repo to store my practice over different GSM functions and [AT commands](https://en.wikipedia.org/wiki/Hayes_command_set#GSM).

Later probably there will be built different [NPM](https://www.npmjs.com/) packages that might be easy to use around different systems.

## Motivation

There is incredible [Wammu](https://wammu.eu/) project, that does the same I want to do. Unfortunately, it won't work properly with the GSM dongle I already have, and they haven't bindings for the [Node.js](https://nodejs.org/en/) that I prefer to use for my pet projects. 

As also, it`s always fun to play with hardware at the low level.

## General classes

If you are looking over the source code, note that [Device](https://github.com/idenisovs/playing-with-gsm/blob/master/source/Device.ts) class has just some basic methods while [Modem](https://github.com/idenisovs/playing-with-gsm/blob/master/source/Modem.ts) operates at higher level, providing the friendly API for further usage.

## AT commands

The AT command stored within the directory `AT`. They will be appended later, and probably, moved to separate NPM library.

## Hardware

Tested with `Huawei E1750` 3G modem. 