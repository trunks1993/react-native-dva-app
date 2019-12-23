package com.example.noemhost;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.xmlpull.v1.XmlPullParser;

import android.util.Xml;

public class FingerInfoAnalyze {
	public static List<FingerInfo> getFingersInfo(InputStream inStream) throws Exception {

		List<FingerInfo> fingerInfos = null;
		FingerInfo info = null;

		XmlPullParser pull = Xml.newPullParser();
		pull.setInput(inStream, "UTF-8");
		int event = pull.getEventType();// 获取当前标签

		while (event != XmlPullParser.END_DOCUMENT) {
			switch (event) {
				case XmlPullParser.START_DOCUMENT:
					fingerInfos = new ArrayList<FingerInfo>();
					break;
				case XmlPullParser.START_TAG:
					if ("policeFinger".equals(pull.getName())) {
						info = new FingerInfo();
						info.setFp(pull.getAttributeValue(null, "finger"));
						info.setRybh(pull.getAttributeValue(null, "policeId"));
						info.setType(pull.getAttributeValue(null, "type"));
					}
					break;
				case XmlPullParser.END_TAG:
					if ("policeFinger".equals(pull.getName())) {
						fingerInfos.add(info);
					}
					break;
			}
			event = pull.next();
		}
		return fingerInfos;
	}

}
