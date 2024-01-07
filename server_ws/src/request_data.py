import requests
import time
from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("../secret/firebase-admin-SDK.json")

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(
    cred,
    {
        "databaseURL": "https://iot-finalproject-968b9-default-rtdb.asia-southeast1.firebasedatabase.app/"
    },
)

# As an admin, the app has access to read and write all data, regardless of Security Rules
database_reference = db.reference("/")

# Update frequency
SLEEP_TIME = 30


def Request_Data(start_time, end_time, PARAM):
    url = "https://smart-campus.kits.tw/api/api/sensors_in_timeinterval/DISTANCE/04c60478-aa8f-4961-bc74-032aa6d23ecc/"

    try:
        r = requests.get(url + start_time + "/" + end_time, params=PARAM, timeout=5)
    except requests.exceptions.Timeout:
        print("Request timeout !")
        return None

    if r.status_code != requests.codes.ok:
        print("Request Error !")
        return None

    return r.json()


def Transfer_Timestamp_to_Date(timestamp):
    date = datetime.fromtimestamp(timestamp / 1000)

    # Only return the hour, minute, second
    return date.strftime("%H:%M:%S")


def Current_Timestamp():
    return datetime.now().timestamp() * 1000


def Upload_Data(data):
    if data.__len__() == 0:
        return

    # Upload the data to firebase
    database_reference.child("Sensor1").set(data)


if __name__ == "__main__":
    # Read the api token from file
    TOKEN = ""
    with open("../secret/token.txt", "r") as f:
        TOKEN = str(f.read())
    PARAM = {"token": TOKEN, "Content-Type": "application/json"}
    
    while True:
        try:
            # Sleep
            time.sleep(SLEEP_TIME)

            print("")
            print("Current Time: " + str(datetime.now()))
            print("Request data ...")

            # Only get the data from now to past 1 hour
            end_time = Current_Timestamp()
            start_time = end_time - 3600000

            # r = Request_Data("1704441600000", str(Current_Timestamp()), PARAM)
            r = Request_Data(str(start_time), str(end_time), PARAM)

            if r == None:
                continue

            count = r["Count"]
            data = []

            # Add value and time into data
            for i in range(count):
                if r["Items"][i]["value"] == None:
                    continue

                data.append(
                    {
                        "Data": r["Items"][i]["value"],
                        "Time": Transfer_Timestamp_to_Date(r["Items"][i]["timestamp"]),
                    }
                )

            # for i in range(data.__len__()):
            #     print("Index: " + str(i))
            #     print("Value: " + str(data[i]["Data"]))
            #     print("Timestamp: " + str(data[i]["Time"]))

            if data.__len__() == 0:
                print("No new data received !")
                continue

            print("Get data successfully !")
            print("Current Time: " + str(datetime.now()))
            print("Data len: " + str(data.__len__()))

            Upload_Data(data)

        except Exception as e:
            print("Error: " + str(e))
