package com.aitablet.fingerprint;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteDatabase.CursorFactory;

public class ZaDBOpenHelper extends SQLiteOpenHelper {

	private static final String DBNAME = "zada.db";  //数据库名
	private static final int VERSION = 1;
	private static final String TAG = "ZaDBOpenHelper";

	public ZaDBOpenHelper(Context context, String name, CursorFactory factory,
						  int version) {
		super(context, DBNAME, null, VERSION);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		// TODO Auto-generated method stub  //新建一个表存储字段count,三个字段count1,count2,count3,永远只用一条数据，每次都是更新数据
		//za指纹表
		String zaFingerPring  = "create table if not exists zafingerp_t (id INTEGER PRIMARY KEY AUTOINCREMENT, rybh varchar(32) not null,type varchar(32) not null,isOk varchar(32));";
		db.execSQL(zaFingerPring);
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		// TODO Auto-generated method stub
		if(newVersion > oldVersion){
		}else{
			return;
		}
		onCreate(db);
	}



}

