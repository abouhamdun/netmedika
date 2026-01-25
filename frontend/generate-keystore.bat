@echo off
SETLOCAL

REM === CONFIGURE YOUR DETAILS HERE ===
SET KEYSTORE_FILE=my-release-key.keystore
SET ALIAS=my-key-alias
SET STOREPASS=MyStrongPass123!
SET KEYPASS=MyStrongPass123!
SET VALIDITY=10000
SET KEYALG=RSA
SET KEYSIZE=2048
SET CN=Adam Babangida
SET OU=IT
SET O=NetMedika
SET L=Kano
SET ST=Kano
SET C=NG

REM === GENERATE KEYSTORE ===
echo Generating keystore: %KEYSTORE_FILE%
keytool -genkeypair -v ^
  -keystore %KEYSTORE_FILE% ^
  -alias %ALIAS% ^
  -storepass %STOREPASS% ^
  -keypass %KEYPASS% ^
  -keyalg %KEYALG% ^
  -keysize %KEYSIZE% ^
  -validity %VALIDITY% ^
  -dname "CN=%CN%, OU=%OU%, O=%O%, L=%L%, ST=%ST%, C=%C%"

IF NOT EXIST %KEYSTORE_FILE% (
  echo [ERROR] Keystore was not created.
  exit /b 1
)

REM === CREATE CREDENTIALS.JSON ===
echo {
echo   "android": {
echo     "keystore": {
echo       "path": "./%KEYSTORE_FILE%",
echo       "keystorePassword": "%STOREPASS%",
echo       "keyAlias": "%ALIAS%",
echo       "keyPassword": "%KEYPASS%"
echo     }
echo   }
echo } > credentials.json

REM === CREATE EAS.JSON (IF NOT EXISTS) ===
IF NOT EXIST eas.json (
  echo {
  echo   "cli": {
  echo     "version": ">= 3.13.0"
  echo   },
  echo   "build": {
  echo     "production": {
  echo       "android": {
  echo         "workflow": "managed",
  echo         "credentialsSource": "local"
  echo       }
  echo     }
  echo   }
  echo } > eas.json
)

echo [SUCCESS] Keystore and configuration files created.
echo You can now run: eas build -p android --profile production
ENDLOCAL
pause
