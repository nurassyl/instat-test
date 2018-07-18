### Install development dependencies

- ##### On Windows
	- ##### Install "Windows subsystem for Linux" in Windows features.
	- ##### Windows -> Settings -> Update & Security -> For developers -> Developer mode (On)
	- ##### Install chocolatey (run "cmd.exe" as administrator):
	`
	@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
	`
	- ##### Install Git, Visual Studio Code (run "cmd.exe" as administrator):
	`
	choco install -y git visualstudiocode nodejs --version 8.11 && npm install -g yarn npx
	`
