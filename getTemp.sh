#!/bin/bash
#* * * * * /home/pi/Git/Playground/getTemp.sh > /home/pi/Git/Playground/getTemp.log 2>&1
CURRENTDATE=`date +'%Y-%m-%d %H:%M:%S:%3N'`
CURRENTTEMP=`vcgencmd measure_temp | egrep -o '[0-9]*\.[0-9]*'`
/usr/bin/sqlite3 /home/pi/Git/Playground/db/temperature.db "INSERT INTO Temperature VALUES ('$CURRENTDATE', $CURRENTTEMP);"
