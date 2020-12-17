#!/bin/sh

rm ezroller.zip
cd .. && zip -x\*.git\* -r xpcalc/xpcalc.zip xpcalc -x \*.git\* \*zipit.sh
