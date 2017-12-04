#### gcc和Linux
默认生成.out: gcc main.c 
自定义后缀： gcc main.c -o main 
打开警告： gcc -Wall main.c
安装路径：/usr/bin/gcc-4.8
vim改源文件：/etc/apt/sources.list 东北大学16.04的可用 源和安装版本必须相同
装不了软件时，慎用：Unable to locate package update
```
apt-get clean
rm -rf /var/lib/apt/lists/*
apt-get clean
apt-get update 更新源
apt-get upgrade 更新已安装的包
```
有多个gcc版本时指定gcc`sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 100`
aptitude install libqt4-dbus=4.4.3-1
####
C程序从main函数的第一条语句开始执行

#### 语法
printf()
字符串转义：`\t`水平制表符和按下Tab键的效果相同，用于在终端下定位表格的下一列。 windows的行分隔`\r\n`,Linux的行分隔`\n`