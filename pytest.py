import requests
import random
import time
import threading

ctrl_url = "http://192.168.178.152:5000/api/data/controller"
pdu_url = "http://192.168.178.152:5000/api/data/pdu"
motorsb_url = "http://192.168.178.152:5000/api/data/motorsb"
motorbb_url = "http://192.168.178.152:5000/api/data/motorbb"


headers = {
    'Content-Type': "application/x-www-form-urlencoded",
    'Cache-Control': "no-cache",
}


def hit_ctrl():
    pass


for _ in range(500):
    rng1 = random.randint(0,1025)
    rng2 = random.randint(0,1025)
    rng3 = random.randint(0,1)
    rng4 = random.randint(0,1)
    rng5 = random.randint(0,1)
    rng6 = random.randint(0,1)
    payload = "knob_sb={}&knob_bb={}&knob_fw_sb={}&knob_fw_bb={}&knob_bw_sb={}&knob_bw_bb={}".format(_, _, rng3, rng4, rng5, rng6)
    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)
    time.sleep(0.1)
