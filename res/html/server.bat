@echo off

cd..

haxelib run http-server -p 3000 bin/js.debug -o

pause