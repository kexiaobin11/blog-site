# blog-site

# Git协同开发文档

## 1. Git工作流程概述

为了确保高效的协同开发，团队使用Git进行版本控制。每个开发人员在开始新功能开发时，都会从`main`分支切出一个新的`feature`分支。`feature`分支的命名将基于相关的`issue`号，确保每个功能与其对应的任务（issue）一一对应。

## 2. 分支创建与管理

### 2.1 创建`feature`分支

当开发一个新功能时，需要先从`main`分支切出一个新的`feature`分支。此分支的命名规范为`feature/issue-<issue号>`，其中`<issue号>`为当前功能对应的任务编号。

#### 步骤：
1. 切换到`main`分支并拉取最新代码：
   ```bash
   git checkout main
   git pull origin main# Git协同开发文档
   ```
## 1. Git工作流程概述

为了确保高效的协同开发，团队使用Git进行版本控制。每个开发人员在开始新功能开发时，都会从`main`分支切出一个新的`feature`分支。`feature`分支的命名将基于相关的`issue`号，确保每个功能与其对应的任务（issue）一一对应。

## 2. 分支创建与管理

### 2.1 创建`feature`分支

当开发一个新功能时，需要先从`main`分支切出一个新的`feature`分支。此分支的命名规范为`issue号`，其中`<issue号>`为当前功能对应的任务编号。


![image](https://github.com/user-attachments/assets/43f865f9-917d-4a38-99a1-0ccaffe043f3)


#### 步骤：
1. 领取issue后切换到`main`分支并拉取最新代码：
   ```bash
   git checkout main
   git pull origin main
    ```
2. 切换到issue号的分支
   ```bash
   git checkout -b <issue号>
   ```
3.	代码开发后查看未暂存的更改：
   ```bash
   git diff 
   ```
4.	提交并推送更新：
   ```bash
    git add <文件路径> 如果能保证没有问题使用 git add . 当前文件下的全部命令
    git commit -m "新功能的描述"
    git push origin <issue号>
   ```

