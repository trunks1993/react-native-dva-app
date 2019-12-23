package com.example.noemhost;

import java.io.Serializable;

public class FingerInfo implements Serializable{

	String rybh = "";
	String fp = "";
	String type = "";

	public FingerInfo() {
	}

	public FingerInfo(String rybh, String fp, String type) {
		this.rybh = rybh;
		this.fp = fp;
		this.type = type;
	}

	public String getRybh() {
		return rybh;
	}

	public void setRybh(String rybh) {
		this.rybh = rybh;
	}

	public String getFp() {
		return fp;
	}

	public void setFp(String fp) {
		this.fp = fp;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
