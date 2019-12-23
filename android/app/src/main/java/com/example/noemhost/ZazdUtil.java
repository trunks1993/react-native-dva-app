package com.example.noemhost;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.os.SystemClock;
import android.util.Base64;
import android.util.Log;

public class ZazdUtil {
	private static final String TAG = "ZazdUtil";
	private Context context;
	private static DevComm m_usbComm;
	private Handler handler;
	boolean m_bCancel, m_bConCapture;
	byte[] m_binImage, m_bmpImage, p_pbyTemplate;

	public ZazdUtil(Context context, Handler handler) {
		this.context = context;
		this.handler = handler;
		m_binImage = new byte[1024 * 100];
		m_bmpImage = new byte[1024 * 100];
		p_pbyTemplate = new byte[498];
		if (m_usbComm == null) {
			m_usbComm = new DevComm(context, m_IConnectionHandler);
		}
	}

	public ZazdUtil(Context context) {
		this.context = context;
		m_binImage = new byte[1024 * 100];
		m_bmpImage = new byte[1024 * 100];
		p_pbyTemplate = new byte[498];
		if (m_usbComm == null) {
			m_usbComm = new DevComm(context, m_IConnectionHandler);
		}
	}

	private final IUsbConnState m_IConnectionHandler = new IUsbConnState() {
		@Override
		public void onUsbConnected() {
			String[] w_strInfo = new String[1];

			if (m_usbComm.Run_TestConnection() == DevComm.ERR_SUCCESS) {

				if (m_usbComm.Run_GetDeviceInfo(w_strInfo) == DevComm.ERR_SUCCESS) {

					Log.e(TAG, "Open Success!!!");
				}
			} else {
				// m_txtStatus.setText("Can not connect to device!");
			}
		}

		@Override
		public void onUsbPermissionDenied() {
			// m_txtStatus.setText("Permission denied!");
		}

		@Override
		public void onDeviceNotFound() {
			// m_txtStatus.setText("Can not find usb device!");
		}
	};

	private String GetErrorMsg(int nErrorCode) {
		String str = new String("");

		switch (nErrorCode) {
			case DevComm.ERR_SUCCESS:
				str = "Succcess";
				break;
			case DevComm.ERR_VERIFY:
				str = "Verify NG";
				break;
			case DevComm.ERR_IDENTIFY:
				str = "Identify NG";
				break;
			case DevComm.ERR_EMPTY_ID_NOEXIST:
				str = "Empty Template no Exist";
				break;
			case DevComm.ERR_BROKEN_ID_NOEXIST:
				str = "Broken Template no Exist";
				break;
			case DevComm.ERR_TMPL_NOT_EMPTY:
				str = "Template of this ID Already Exist";
				break;
			case DevComm.ERR_TMPL_EMPTY:
				str = "This Template is Already Empty";
				break;
			case DevComm.ERR_INVALID_TMPL_NO:
				str = "Invalid Template No";
				break;
			case DevComm.ERR_ALL_TMPL_EMPTY:
				str = "All Templates are Empty";
				break;
			case DevComm.ERR_INVALID_TMPL_DATA:
				str = "Invalid Template Data";
				break;
			case DevComm.ERR_DUPLICATION_ID:
				str = "Duplicated ID : ";
				break;
			case DevComm.ERR_BAD_QUALITY:
				str = "Bad Quality Image";
				break;
			case DevComm.ERR_MERGE_FAIL:
				str = "Merge failed";
				break;
			case DevComm.ERR_NOT_AUTHORIZED:
				str = "Device not authorized.";
				break;
			case DevComm.ERR_MEMORY:
				str = "Memory Error ";
				break;
			case DevComm.ERR_INVALID_PARAM:
				str = "Invalid Parameter";
				break;
			case DevComm.ERR_GEN_COUNT:
				str = "Generation Count is invalid";
				break;
			case DevComm.ERR_INVALID_BUFFER_ID:
				str = "Ram Buffer ID is invalid.";
				break;
			case DevComm.ERR_INVALID_OPERATION_MODE:
				str = "Invalid Operation Mode!";
				break;
			case DevComm.ERR_FP_NOT_DETECTED:
				str = "Finger is not detected.";
				break;
			default:
				str = String.format("Fail, error code=%d", nErrorCode);
				break;
		}

		return str;
	}

	/**
	 * 打开指纹设备
	 *
	 * @return true 成功
	 */
	public Boolean OnOpenDeviceBtn() {
		String[] w_strInfo = new String[1];

		if (m_usbComm != null) {
			if (!m_usbComm.IsInit()) {
				if (m_usbComm.OpenComm()) {
					//
					Log.e(TAG, "打开设备q");
					return true;
				} else {
					Log.e(TAG, "Failed init usbq!");
					return false;
				}
			} else {
				if (m_usbComm.Run_TestConnection() == DevComm.ERR_SUCCESS) {
					if (m_usbComm.Run_GetDeviceInfo(w_strInfo) == DevComm.ERR_SUCCESS) {
						Log.e(TAG, "Open Success！");
						return true;
					} else {
						Log.e(TAG, "Can not connect to device!");
						return false;
					}
				} else {
					Log.e(TAG, "Can not connect to device!");
					return false;
				}
			}
		}
		return false;
	}

	/**
	 * 关闭指纹设备
	 *
	 * @return true 成功
	 */
	public Boolean OnCloseDeviceBtn() {
		m_bCancel = true;
		return m_usbComm.CloseComm();
	}

	/**
	 * 1比N 单次比对
	 */
	public Boolean OnVerifyMoreBtn() {
		final String userID = "";
		if (!m_usbComm.IsInit()) {
			Log.e(TAG, "Failed init usb!");
			return false;
		}

		m_usbComm.Run_SLEDControl(1);
		m_bCancel = false;
		Log.e(TAG, "m_bCancel=" + m_bCancel);
		new Thread(new Runnable() {
			int w_nRet;
			int[] w_nID = new int[1];
			int[] w_nLearned = new int[1];
			int[] w_nWidth = new int[1];
			int[] w_nHeight = new int[1];
			boolean next = true;

			@SuppressLint("NewApi")
			@Override
			public void run() {

				if (Capturing() < 0)
					return;

				// Up Cpatured Image
				w_nRet = m_usbComm.Run_UpImage(0, m_binImage, w_nWidth, w_nHeight);

				if (w_nRet != DevComm.ERR_SUCCESS) {
					Log.e(TAG, GetErrorMsg(w_nRet));
					return;
				}

				// Draw image

				// Create template
				long m_nPassedTime;
				m_nPassedTime = SystemClock.elapsedRealtime();
				w_nRet = m_usbComm.Run_Generate(0);

				if (w_nRet != DevComm.ERR_SUCCESS) {
					Log.e(TAG, GetErrorMsg(w_nRet));

					if (w_nRet == DevComm.ERR_CONNECTION)
						return;
					else {
						SystemClock.sleep(1000);
						// continue;
					}
				}

				// Identify
				w_nRet = m_usbComm.Run_Search(0, 1, 500, w_nID, w_nLearned);
				m_nPassedTime = SystemClock.elapsedRealtime() - m_nPassedTime;

				if (w_nRet == DevComm.ERR_SUCCESS) {
					Log.e(TAG,
							String.format(
									" Result : Success\r\nTemplate No : %d, Learn Result : %d\r\nMatch Time : %dms",
									w_nID[0], w_nLearned[0], m_nPassedTime));
					Message msg = new Message();
					msg.obj = w_nID[0];
					msg.what = 1001;
					handler.sendMessage(msg);
				}

				else {
					Log.e(TAG, String.format("\r\nMatch Time : %dms", m_nPassedTime));
					Log.e(TAG, GetErrorMsg(w_nRet));
					Message msg = new Message();
					msg.obj = "";
					msg.what = 1001;
					handler.sendMessage(msg);
				}

			}
			// }
		}).start();

		return false;
	}

	public boolean OnDownDate(int id, int p_nRamBufferID, String fp) {

		byte[] p_pbyTemplates = new byte[498];
		p_pbyTemplates = Base64.decode(fp, Base64.DEFAULT);
		int w_nRet = m_usbComm.Run_DownChar(p_nRamBufferID, p_pbyTemplates);
		int[] w_nDupID = new int[1];
		if (w_nRet != DevComm.ERR_SUCCESS) {
			Log.e("zdz", "注册失败");
			return false;
		} else {
			Log.e("zdz", "注册第一步成功");
		}

		w_nRet = m_usbComm.Run_StoreChar(id, p_nRamBufferID, w_nDupID);

		if (w_nRet != DevComm.ERR_SUCCESS) {
			if (w_nRet == DevComm.ERR_DUPLICATION_ID) {
				Log.e(TAG, "Result : Fail\r\nDuplication ID = %d" + w_nDupID[0]);
			} else {
				Log.e(TAG, GetErrorMsg(w_nRet));
			}
			return false;
		} else {
			Log.e(TAG, "Result : Success\r\nTemplate No : %d" + "id:" + id);

		}
		return true;
	}

	public boolean OnDeleteIDBtn(int id) {
		int w_nRet;

		if (!m_usbComm.IsInit())
			return false;

		if (id > 500) {
			return false;
		}

		w_nRet = m_usbComm.Run_DelChar(id, id);

		if (w_nRet != DevComm.ERR_SUCCESS) {
			Log.e(TAG, "id:" + id + "Delete false !");
			return false;
		}
		Log.e(TAG, "id:" + id + "Delete OK !");
		return true;
	}


	public boolean OnDeleteAllBtn() {
		int w_nRet;

		if (!m_usbComm.IsInit())
			return false;

		w_nRet = m_usbComm.Run_DelChar(1, 500);

		if (w_nRet != DevComm.ERR_SUCCESS) {
			return false;
		}

		return true;
	}

	private int Capturing() {
		int w_nRet;
		while (true) {
			if (m_bCancel) {
				return -1;
			}
			w_nRet = m_usbComm.Run_GetImage();

			if (w_nRet == DevComm.ERR_CONNECTION) {
				Log.e(TAG, "Communication error!");
				return -1;

			} else if (w_nRet == DevComm.ERR_SUCCESS) {
				Log.e(TAG, "DevComm.ERR_SUCCESS");
				break;
			}

		}

		return 0;
	}

	public void cancel() {
		m_bCancel = true;
	}

}
