<鸟哥的私房菜>笔记
####计算机概论
CPU：控制单元-协调各组件，算数单元-计算与判断，多核就是多个算数单元。
CPU从内存读取数据-〉计算-〉把数据写回内存-〉输出到屏幕
二级缓存：把数据存在CPU内，不需要通过北桥访问内存。
精简指令集RISC：简单指令、性能高。如手机ARM架构。
复杂指令集CISC:单指令擅长复杂工作。如x86架构。
Intel主板的北桥：负责连结速度较快的CPU、主内存与显示卡等组件，注重散热。南桥：负责连接速度较慢的周边介面， 包括硬盘、USB、网络卡等等。
AMD的主板CPU直连内存，不通过北桥，速度快。
内存：容量过小会导致载入大数据-〉挤掉已存数据-〉运行慢，服务器内存比CPU更重要。
显存：如分辨率1024*768=786432像素，每像素占3bytes。所以最少2.25MBytes。
家用服务器买省电CPU。
####Linux历史
GPL授权：自由软件，不得商用。
闭源软件只有二进制执行文件。
CPU同时打开大量文件会频繁切换，切换会占性能。
Linux distributions系统：包管理：RPM / DPKG。 社群版是最新的:CentOS(基于Red Hat)。商业版是稳定的:Red Hat/Ubuntu 
优点：省电、适合配置低的硬件
android是基于Linux内核适配ARM架构的系统。
嵌入式是Linux和驱动的结合。
操作系统应具备能力：输入输出 设备 进程 文件。
####Linux
Linux:多任务，多使用者。硬盘与内存读写是异步的。
硬件配置文件名：/dev
  1. 硬盘：/dev/sd[a-d] 虚拟机的硬盘：/dev/vd[a-p] 接数字是分区。
  2. MBR分区表：/sda1~3是主要分区，4是延伸分区:记录分区信息，/sda5以后是逻辑分区：延伸分区切割的分区槽。
  3. GPT分区表：有34个LBA分区信息备份 支持2TB以上 可分128个分区
  4. 软件磁盘阵列：RAID：/dev/md[0-127]
CMOS：储存硬件参数
Blos:开机首个程序，读取的MBR:446bytes/GPT第一个区:最基本的开机程序。
UEFI:Blos是汇编写的，它是C写的。更灵活。缺点：它的secure boot安全验证可能会阻止进入Linux，为了兼容windows需要留1G的vfat格式空间执行程序。
Boot loader:系统控制MBR的程序，开机管理：载入核心 启动分区的启动扇区 
开机流程： BIOS->MBR->boot loader->核心文件
挂载：把磁盘分区槽绑定在目录下。子目录的数据也存在该分区内。
安装Linux:
  1. 分区：按用途分，防止某分区挂了影响整体。
  2. 服务器： NAT：IP分享器 SAMBA：共享网络 Mail:内网邮箱 DHCP:自动分配IP Web FTP
  3. `dd if=centos7.iso of=/dev/sdc` 把系统拷贝到USB
  4. 设置blos
  5. 强制gpt: 安装时按tab键–输入`inst.gpt`
  6. 桥接模式：虚拟交换机要配IP 网络地址转换模式：IP由VM的DHCP提供
  7. 磁盘类型：ide支持4个设备，scsi支持16个，可热插拔硬盘。
  8. root账号权限最高。
  9. 

####用户
用户组：同一group的user共享文件，有相同权限。
/etc/passwd 注：用户（user）的配置文件；
/etc/shadow 注：用户（user）影子口令文件；
/etc/group 注：用户组（group）配置文件；
/etc/gshadow 注：用户组（group）的影子文件；

`umask` 默认新建权限，显示被减掉的权限值。文件默认没有x.
`chattr` 设置隐藏权限，+i不可删 +a只能增加数据 +S修改同步写入硬盘 +c自动压缩 lsattr查看
rws的SUID：4权限的二进制，执行时会以root权限执行。在群组位则是SGID：2在该目录下的新建文件组名与目录相同。rwt的SBIT:1权限的目录下的文件只能被自己和root删。chmod 7777
`histroy` 命令行历史输入
`which` 搜索命令
`whereis` 搜索文件 find 全局搜索文件 `locate` 数据库搜索，`updatedb`手动更新数据库
`find ./ -newer ./a` 搜索在新建a后的新建文件 find ./ -mtime -4 4天内修改的文件 -group某组的文件，-user某用户创建的文件 -name “*a*”搜索关键词 -size +1M大于1兆的文件 find a -exec ls {} \;搜到的结果用其它命令处理

####常用命令：
区分大小
快捷键：
  补全命令/文件名 TAB 
  /usr/share/doc 软件说明文档
  切换文本模式和xwin  Alt+Ctrl+F1-7 
  翻页 shift+Pgup
关机:reboot 重启 halt 关机 shoutdown sync内存数据强制刷入硬盘 
文件权限：
  ls -al 一般文件(-) 目录文件(d)
  chgrp改群组 chown改用户 chmod改权限
  r:4 ls有效，w:2 能删子级哪怕属于root， x:1 cd有效
   
 
命令帮助：`命令 --help` `man 命令`：首行括号数字代表命令的类型。(1)是shell (5)是配置文件 (8)是管理员`/str ？str`向下上搜索字符
账号：
  注销账号 exit 
  修改用户名 `usermod -l 新名 原名`
  获权 sudo
  切换用户 su 
