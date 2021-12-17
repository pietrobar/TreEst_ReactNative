import * as SQLite from 'expo-sqlite';

export default class StorageManager {
    constructor() {
        this.db = SQLite.openDatabase("myDB")
    }
    initDB(onResult, onError) {
        const transaction = (tx) => {
            const query = "CREATE TABLE IF NOT EXISTS User (userid int, pversion int, picture varchar(137000), PRIMARY KEY (userid))"
            tx.executeSql(query,[],
                (tx, queryResult)=>{onResult(queryResult)},
                (tx, error)=>{onError(error)})
        }
        const error = (e) => {onError(e)};
        this.db.transaction(transaction, error);
    }

    storeUserPicture(userId, pversion, picture, onResult, onError){
        const transaction = (tx) =>{
            const query = "INSERT OR REPLACE INTO User (userid, pversion, picture) values (?,?,?)"
            tx.executeSql(query,[userId,pversion,picture],
                (tx, queryResult)=>{onResult(queryResult)},
                (tx, error)=>{onError(error)})
        }
        const error = (e) => {onError(e)};
        this.db.transaction(transaction,error);
    }

    getUserPicture(userId, pversion, onResult, onError){
        const transaction = (tx) =>{
            const query = "SELECT picture FROM User WHERE userid=? and pversion=?"
            tx.executeSql(query,[userId,pversion],
                (tx, queryResult)=>{
                    if (queryResult.rows.length>0){
                        if (queryResult.picture!=undefined){
                            onResult(queryResult.picture)
                        }else onResult(null)
                    }else{
                        onResult(null)//if local version < server version ->null
                    }
                    },
                (tx, error)=>{onError(error)})
        }
        const error = (e) => {onError(e)};
        this.db.transaction(transaction,error);
    }
}