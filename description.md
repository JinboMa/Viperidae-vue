# sublime sftp 配置
## 如下代码
```
{
    // The tab key will cycle through the settings when first created
    // Visit http://wbond.net/sublime_packages/sftp/settings for help
    
    // sftp, ftp or ftps
    "type": "sftp",//类型

    "save_before_upload": true,//上传之前保存在本地
    "upload_on_save": true,//在保存时自动上传服务器
    "sync_down_on_open": true,//自动同步
    "sync_same_age": true,
    
    "host": "127.0.0.1",//主机
    "user": "user",//用户名
    "password": "password",//密码
    "port": "8080",//端口(ftp为21)
    
    "remote_path": "/",//服务器路径
    //"file_permissions": "664",
    //"dir_permissions": "775",
    
    //"extra_list_connections": 0,

    "connect_timeout": 10000,//连接失败时常
    //"keepalive": 120,
    //"ftp_passive_mode": true,
    //"ftp_obey_passive_host": false,
    //"ssh_key_file": "~/.ssh/id_rsa",
    //"sftp_flags": ["-F", "/path/to/ssh_config"],
    
    //"preserve_modification_times": false,
    //"remote_time_offset_in_hours": 0,
    //"remote_encoding": "utf-8",
    //"remote_locale": "C",
    //"allow_config_upload": false,
}
```