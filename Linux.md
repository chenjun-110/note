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
Blos固件：写死在内存里。
显存：如分辨率1024*768=786432像素，每像素占3bytes。所以最少2.25MBytes。
GPL授权：自由软件，不得商用。

####Linux
Linux:多任务，多使用者。
硬件配置文件：/dev

常用命令：
halt   立刻关机 