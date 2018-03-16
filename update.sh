#!/bin/sh
rm -rf index.html static
mv /tmp/dist.tar.gz .
tar zxvf dist.tar.gz
mv dist/* .
rm -rf dist*
