#!/bin/bash

set -e

webpack

# 删除生成的js缓存文件
# rm lib/components/**/*.min.js

echo -e "\033[32m \ncss build成功\n \033[0m"
