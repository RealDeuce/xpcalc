#!/bin/sh

rm xpcalc.zip
cd .. && zip -x\*.git\* -r xpcalc/xpcalc.zip xpcalc -x \*.git\* \*zipit.sh
