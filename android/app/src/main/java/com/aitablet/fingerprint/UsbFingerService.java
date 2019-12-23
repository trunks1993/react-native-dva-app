package com.aitablet.fingerprint;

import android.annotation.SuppressLint;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.os.Binder;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import com.aitablet.Constant;
import com.example.noemhost.FingerInfo;
import com.example.noemhost.ZazdUtil;

import java.util.List;

public class UsbFingerService extends Service {
	private static final String TAG = "UsbFingerService";
	public static final String OPENFINGER = "OPEN_FINGER";//打开指纹广播
	public static final String CLOSEFINGER = "CLOSE_FINGER";//关闭指纹广播
	public static final String COMPAREFINGER = "COMPARE_FINGER";//开始比对广播
	public static final String CANCELFINGER = "CANCEL_FINGER";//取消比对广播
	public static final String REGISTER = "REGISTER_FINGER";//注册指纹广播
	public static final String DELESOMEFINGER = "DELETE_SOMNEONE_FINGER";//删除某人广播
	public static final String DELEALLFINGER = "DELETE_ALL_FINGER";//清除指纹广播
	private ZazdUtil zazdUtil;
	private Context context;
	private ZaDao zaDao;
	private FingerBinder fingerBinder = new FingerBinder();
	private FingerBroadcastReceiver fingerBroadcastReceiver;
	@SuppressLint("HandlerLeak")
	private Handler myhandler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
				case 1001:
					String id = msg.obj.toString();
					String rybh = "";
					ZaDao dao = new ZaDao(context);
					Cursor Fcs = dao.queryTableAndShow();
					int nums = 0;
					boolean compareTrue = false;
					while (Fcs.moveToNext()) {
						if (Fcs.getString(0).equals(id)) {
							Log.e("rybh", Fcs.getString(1));
							rybh = Fcs.getString(1);
							compareTrue = true;
							break;
						}
					}
					Intent intent = new Intent();
					intent.setAction(Constant.SEND_RYBH_ACTION);
					intent.putExtra(Constant.PERSON_NUMBER, rybh);
					sendBroadcast(intent);
					break;

				default:
					break;
			}
		};
	};

	@Override
	public void onCreate() {

		Log.e(TAG, "OnCreate");
		context = getApplicationContext();
		zaDao = new ZaDao(UsbFingerService.this);
		zazdUtil = new ZazdUtil(context, myhandler);
		zazdUtil.OnOpenDeviceBtn();
		fingerBroadcastReceiver = new FingerBroadcastReceiver();
		IntentFilter filter = new IntentFilter();
		filter.addAction("reboot");
		filter.addAction(Intent.ACTION_SCREEN_OFF);
		filter.addAction(Intent.ACTION_SCREEN_ON);
		filter.addAction(OPENFINGER);
		filter.addAction(CLOSEFINGER);
		filter.addAction(COMPAREFINGER);
		filter.addAction(CANCELFINGER);
		filter.addAction(REGISTER);
		filter.addAction(DELESOMEFINGER);
		filter.addAction(DELEALLFINGER);
		registerReceiver(fingerBroadcastReceiver, filter);

	}

	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		// Log.e(TAG, zazdUtil.OnCloseDeviceBtn()+"");
		super.onDestroy();
	}

	public class FingerBinder extends Binder {

		public void open() {
			Log.e(TAG, "open");
		};

		public void compare() {
			zazdUtil.OnVerifyMoreBtn();
		};

		public void cancel() {
			zazdUtil.cancel();
		};
	}

	private class FingerBroadcastReceiver extends BroadcastReceiver {

		@Override
		public void onReceive(Context context, Intent intent) {
			String action = intent.getAction();
			if ("reboot".equals(action)) {

			} else if (Intent.ACTION_SCREEN_OFF.equals(action)) {
				Log.e("息屏", "息屏");
				zazdUtil.OnCloseDeviceBtn();
			} else if (Intent.ACTION_SCREEN_ON.equals(action)) {
				Log.e("息屏", "亮屏");
			} else if (OPENFINGER.equals(action)) {

			} else if (CLOSEFINGER.equals(action)) {

			} else if (COMPAREFINGER.equals(action)) {
				if (zazdUtil.OnOpenDeviceBtn()) {
					zazdUtil.OnVerifyMoreBtn();
				} else {
					Log.e(TAG, "指纹打开失败");
				}

			} else if (CANCELFINGER.equals(action)) {
				zazdUtil.cancel();
			}else if (REGISTER.equals(action)) {

				Bundle bundle = intent.getExtras();
				List<FingerInfo> finger = (List<FingerInfo>)bundle.get("PoliceFinger");
				Log.e(TAG, finger.size()+"");

				for(FingerInfo info : finger){
					String rybh = info.getRybh();
					String fp = info.getFp();
					String type = info.getType();
					ZaFingerPrint(rybh, fp, type);
				}

			}else if(DELESOMEFINGER.equals(action)){
				String policeId = intent.getStringExtra("policeId");
				List<String> idList = zaDao.getId(policeId);
				for(String str : idList){
					if (zazdUtil.OnDeleteIDBtn(Integer.parseInt(str))) {
						zaDao.deleteById(str);
						Log.d(TAG, "删除表中数据id:"+ str);
					}
				}
			}else if(DELEALLFINGER.equals(action)){
				if(zazdUtil.OnDeleteAllBtn()){
					zaDao.clearTable();
					Log.d(TAG, "清楚表数据");
				}else{
					Log.e(TAG, "指纹设备清除数据失败");
				}
			}

		}
	}

	@Override
	public IBinder onBind(Intent intent) {
		// TODO Auto-generated method stub
		return fingerBinder;
	}

	private void ZaFingerPrint(String rybh, String fp, String type) {
		Boolean isHas = false;
		Cursor Fcs = zaDao.queryTableAndShow();
		int nums = 0;
		while (Fcs.moveToNext()) {
			Log.e("zafinger", Fcs.getString(0) + "," + Fcs.getString(1) + "," + Fcs.getString(2));
			if (Fcs.getString(2).equals(type) && Fcs.getString(1).equals(rybh)) {
				isHas = true;
				Log.e(TAG+rybh+"type="+type, "指纹已经存在" + "rybh:" + rybh + "type:" + type);
				break;
			}
		}
		if (!isHas) {
			try {
				int a = zaDao.insertFP(rybh, type);
				if (a > 0) {
					Log.e(TAG+rybh+"type="+type, "指纹表注册成功");
					if (zazdUtil.OnOpenDeviceBtn()) {
						if (zazdUtil.OnDownDate(a, 1, fp)) {
							Log.e(TAG+rybh+"type="+type, "指纹入设备成功");
						} else {
							Log.e(TAG+rybh+"type="+type, "指纹入设备失败");
							zaDao.deleteByRybh(rybh, type);
						}
					}else{
						zaDao.deleteByRybh(rybh, type);
					}
					// if (!zazdUtil.OnCloseDeviceBtn()) {
					// Log.e(TAG, "指纹关闭失败");
					// } else {
					// Log.e(TAG, "指纹关闭成功");
					// }
				}
			} catch (Exception e) {
				zaDao.deleteByRybh(rybh, type);
			}
		}
	}

}
