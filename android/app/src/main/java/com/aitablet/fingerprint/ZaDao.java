package com.aitablet.fingerprint;

import java.util.ArrayList;
import java.util.List;

import com.aitablet.fingerprint.ZaDBOpenHelper;
import com.example.noemhost.ZazdUtil;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class ZaDao {
	private static final String DBNAME = "zada.db"; // 数据库名，注意保持一致
	private static final int VERSION = 1;
	private static final String TAG = "ZaDao";
	private ZaDBOpenHelper helper;
	private SQLiteDatabase db;
	private Cursor cursor;
	private static final String FP_TABLE = "zafingerp_t";


	public ZaDao(Context context) {
		helper = new ZaDBOpenHelper(context, DBNAME, null, VERSION);
		db = helper.getWritableDatabase();
	}

	// 插入操作 ,指纹编号与人员编号
	public int insertFP(String rybhNum, String type) {
		ContentValues values = new ContentValues();
		values.put("rybh", rybhNum);
		values.put("type", type);
		long a = db.insert(FP_TABLE, null, values);
		if (a > 0) {
			cursor = db.query(FP_TABLE, new String[] { "id", "rybh", "type","isOK" }, null, null, null, null, null);
			if (cursor.moveToLast())
				return cursor.getInt(0);
		}
		return -1;
	}

	// 根据某个属性，查询数据
	public Cursor queryTableAndShow() {
		cursor = db.query(FP_TABLE, new String[] { "id", "rybh", "type" }, null, null, null, null, null);
		return cursor;
	}

	// 根据人员编号查询id
	public List<String> getId(String number) {
		int id = 0;
		List<String> idList = new ArrayList<String>();
		Cursor cs = db.query(FP_TABLE, new String[] { "id", "rybh", "type" }, "rybh=?",  new String[]{number}, null, null, null);
		while (cs.moveToNext()) {
			Log.e("zafinger", cs.getString(0) + "," + cs.getString(1) + "," + cs.getString(2));
			id = cs.getInt(0);
			idList.add(id+"");
		}
		cs.close();
		return idList;
	}

	public void close() {
		if (!cursor.isClosed()) {
			cursor.close();
		}
		if (db != null) {
			db.close();
			db = null;
		}
		if (helper != null) {
			helper.close();
			helper = null;
		}
	}

	public void clearTable() {
		db.execSQL("delete from " + FP_TABLE);// 删除表(仅删除表中内容)
	}

	public void deleteByRybh(String rybh,String type) {
		db.execSQL("delete from " + FP_TABLE + " where rybh = '" + rybh + "'" +"and type = '" + type + "'");// 删除表(仅删除表中内容)
	}

	public void deleteById(String id) {
		db.execSQL("delete from " + FP_TABLE + " where id = '" + id + "'");// 删除表(仅删除表中内容)
	}
}
