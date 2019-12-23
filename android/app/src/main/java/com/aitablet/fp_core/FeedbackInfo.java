package com.aitablet.fp_core;

public class FeedbackInfo {
    private int code = -1;
    private int step;
    private int verifyUserId;
    private String message;

    public int getVerifyUserId() {
        return verifyUserId;
    }

    public void setVerifyUserId(int verifyUserId) {
        this.verifyUserId = verifyUserId;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public int getStep() {
        return step;
    }

    public void setStep(int step) {
        this.step = step;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public FeedbackInfo(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public void clear(){
        this.code = -1;
        this.verifyUserId = -1;
        this.step = 0;
        this.message = "initial";
    }
}
