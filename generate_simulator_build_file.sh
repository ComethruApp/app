#!/usr/bin/env bash

in_file='platforms/ios/build/emulator/Comethru.app'
out_file='sbf.zip'

ditto -ck --sequesterRsrc --keepParent $in_file $out_file
