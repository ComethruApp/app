#!/usr/bin/env bash

signed_apk="Comethru.apk"
rm -f $signed_apk
ionic cordova build android --prod --release
unsigned_apk="platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $HOME/comethru.jks $unsigned_apk comethru
zipalign -v 4 $unsigned_apk $signed_apk
apksigner verify $signed_apk && echo "All's well!" || echo "Signing failed."
