commit n.版本 v.提交一个版本 点击包含历史版本
undo 撤销没上传的提交(我的git没有)
roll back 回滚版本，其它已提交的会被删除
publish/sync 上传到github网站
delete 删除本地和网站的分支 默认分支不能被删，settings可切换默认
unpublish 仅删除网站分支
新分支保留原来所有代码，并在此基础上添加新代码，不同分支仅历史版本相同。
update from 融合分支
同步产生代码冲突，删除冲突代码和标识符<<<HEAD===>>>origin/master
Settings->add collaborator添加协作者写入权限
fork 把开源项目复制到我的仓库再clone desktop到本地
Graphs->Network 没有合并的提交
pull request 有不同代码讨论
issue   没写代码前讨论

评论markdown快捷键
引用：选中文字按r
引用其它issue或pull request：`#n`
关闭事物卡片：`fix #n`

GitHub Pages url`用户名.github.io/仓库名/` 
https://chenjun-110.github.io/boke/index.html

mysgit和github不是一个软件，版本控制软件无法跟踪二进制文件包括word文档
mysgit中的git bash命令
安装后设置电脑地址：
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"```
```
$ mkdir learngit 创建learngit目录
$ cd learngit    进入目录
$ pwd            显示当前目录
$ git init       把当前目录变成仓库，生成.git```
报错解决：
  1. SSL证书错误：`git config --global http.sslVerify false`
github
```
$ ssh-keygen -t rsa -C "357201017@qq.com //创建SSH Key。 id_rsa是私钥,id_rsa.pub是公钥,去官网绑定ssh粘贴公钥。
$ git remote add 自定义远程库名 git@github.com:chenjun-110/仓库名.git //SSH连接
$ git remote add 自定义远程库名 https://github.com/chenjun-110/仓库名.git //https连接
git remote rm origin 删除远程库
git remote -v 查看远程库
$ git clone https://github.com/chenjun-110/仓库名.git 远程克隆到本地
git pull      取得远程最新分支(有冲突要取得远程分支手动解决再同步)
git add *     添加文件进stage暂存区
$ git commit -m "wrote a readme file" 提交到master分支 -m后面说明文字 可多次add仅一次提交
$ git push -u 远程库名 分支名 //同步上传,以后可以省略-u

git checkout -b 分支名 远程库名/分支名 //创建远程分支的同名分支
git branch --set-upstream 分支名 远程库名/分支名 //链接本地分支和远程同名分支 
git checkout -- readme.txt    撤销工作区(未添加)的修改
git reset HEAD readme.txt 撤销暂存区的修改```
commit只会提交暂存区内的文件，自行修改的不提交。修改后必须add.
```
git status          查看仓库状态
git diff readme.txt 查看修改
cat readme.txt  查看文件内容
git log         查看历史提交
git log --pretty=oneline 查看历史提交，仅显示版本号+说明
git reflog      查看历史命令
//HEAD表示当前版本，上一个版本就是HEAD^，上上一个版本就是HEAD^^，上100个版本HEAD~100
git reset --hard HEAD^      回退到上一个版本(仅适用本地)
git reset --hard xxxxx      回退到指定版本
rm test.txt                 删除本地文件
git checkout -- test.txt    从版本库恢复本地误删文件最新版
git rm test.txt
git commit -m "xx"          删除版本库文件

git branch 分支名               创建新分支
git checkout 分支名             切换分支 
git checkout -b 分支名          创建并切换到新分支
git branch                     查看当前分支
git merge 分支名                把分支合并到当前分支
git branch -d 分支名            删除分支
git merge --no-ff -m "xxx" 分支名 //把分支合并到当前分支,保留分支的commit历史,禁用Fast forward
git branch -D 分知名            强行删除分支(用于删除未合并且已提交)
```
bug
```
git stash                      保存工作区，用于工作区进行到一半无法提交要处理其他bug。
git stash list                 查看保存的工作区
git stash pop                  恢复工作区并删除stash
git stash apply                恢复指定工作区(有多个的情况) 
git stash drop                 删除stash  
```

标签式语义化的commit。
```
git tag 名                    //创建标签
git tag 名 版本号              //创建标签在过去的commit上
git tag -a 名 -m "说明" 版本号 //创建标签
git tag -s 名 -m "说明" 版本号 //创建标签，用私钥签名(前提先安装GnuPG)
git tag -d 名                   //删除本地标签
git push 远程库:refs/tags/标签名 //删除远程标签
git log --pretty=oneline --abbrev-commit 查看历史提交id
git tag     查看所有标签(按字母排序)
git show 名      查看标签详细信息
git push 远程库 标签名    //同步标签
git push 远程库 --tags   //同步所有标签
```
开源贡献：先fork大神的仓库到我的仓库，再克隆到本地。然后修改提交到我的仓库，再pull request到大神。
`.gitignore`文件夹，里面的内容不会被git status扫到。
`git config --global alias.st status` 给status起别名st,带空格的多个单词要加引号
要管理权限用用Gitolite。
要管理公钥用Gitosis。

heroku配置:
heroku login //输入的是heroku网站的账户密码
mlab数据库地址 
mongodb://<dbuser>:<dbpassword>@ds127428.mlab.com:27428/chenjundatabase
`heroku config:set PROD_MONGODB=mongodb://chenjun:c3276230@ds127428.mlab.com:27428/chenjundatabase`

####hexo
新建仓库名格式：chenjun-110.github.io 前缀需为我的用户名,网址也是这个
配置SSH：把公钥上传到github
安装：
 1. 命令行：npm install hexo-cli -g 
 2. 初始化：`hexo init blog` -> `npm install` -> `hexo server`
 3. 在本地仓库下载主题：`git clone https://github.com/iissnan/hexo-theme-next themes/next` -> 改yml配置的:`theme: next`
 4. git工具：npm install hexo-deployer-git --save
 5. 改yml:
```deploy:
  type: git
  repo: <repository url>
  branch: [branch]
  message: [message]```
运行：
  1. 生成：hexo g
  2. 预览：hexo s 默认http://localhost:4000/
  3. 部署：hexo d
目录：
  1. public:生成后
  2. source:解析文件。忽略`_`
  3. scaffolds:每个md文件开头需要加上字段






一般技巧：
  1. 随机注释：git commit -m"`curl -s http://whatthecommit.com/index.txt`"
  2.  `git 任何命令 --help` 跳转到手册，<>是必选参数，[]是可选参数。
实用技巧：
  1. `git checkout -- .`放弃工作区的更改。
  2. `git blame a.js` 缉凶，查看每行是谁提交的。
实战坑：
  1. .gitignore无效：要删除提交区追踪 `git rm -r --cached .` `git add .` git commit -m

报错：
  1. You have not concluded your merge (MERGE_HEAD exists). Please, commit your changes before you can merge. `git merge --abort`  `git reset --merge`











