//mysqlModal.js
//初始化数据库配置
const mysqlConf = {
    db1:{
        host: '192.168.50.100',
        user: 'wee',
        password: '123456',
        database: 'live',
        port: 3306
    },
    db2:{
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'live',
        port: 3306
    }
};

//线程池：封装数据库sql操作（属于可拓展功能）
async function DB1(sql){
    var mysql = require('mysql');
    var pool = mysql.createPool(mysqlConf.db1);
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,conn){
            if(err){
                console.log(err)
            }else{
                conn.query(sql,function(err,results,fields){
                    //事件驱动回调
                    if(err){
                        resolve(err)
                    }else{
                        resolve(results)
                    }
                });
                conn.release();
            }
        });
    })
}
async function DB2(sql){
    var mysql = require('mysql');
    var pool = mysql.createPool(mysqlConf.db2);
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,conn){
            if(err){
                console.log(err)
            }else{
                conn.query(sql,function(err,results,fields){
                    //事件驱动回调
                    if(err){
                        resolve(err)
                    }else{
                        resolve(results)
                    }
                });
                conn.release();
            }
        });
    })
}



module.exports = {DB1,DB2};