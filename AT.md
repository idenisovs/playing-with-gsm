# AT commands

- https://www.cavliwireless.com/blog/nerdiest-of-things/an-introduction-to-cellular-at-commands

## AT+CMEE - Command Mobile Equipment Error

It controls the format of error responses from the modem.

- 0 - Just ERROR
- 1 - ERROR + Code
- 2 - ERROR + Text

## AT+CFUN=1,1 - Force a SIM Reset via AT

AT+CFUN=0 disables the radio

## AT^CURC=0 - Disable unsolicited result codes related to network registration.

- 0 - Disable unsolicited network registration messages (silent mode).
- 1 — Enable unsolicited messages (verbose/monitoring mode).

## at+cpas

The status of the modem. For data-only devices might be not supported

## at+cfun - power management

- AT+CFUN=0 - turn off the transmitter
- AT+CFUN=1,1 - cold restart

## ATI

Info about modem.

## AT&V

Settings