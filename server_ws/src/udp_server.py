#!/usr/bin/env python3

import socket
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


def UDP_Server():
    # Set up the host and port
    host = "192.168.1.103"
    port = 5000

    # Get instance
    server_socket = socket.socket()

    # Bind host address and port
    server_socket.bind((host, port))

    # Configure how many client the server can listen simultaneously
    server_socket.listen(4)

    # Main loop
    while True:
        # Accept new connection
        client, address = server_socket.accept()
        print("Connection from: " + str(address))

        while True:
            # Receive data stream. it won't accept data packet greater than 1024 bytes
            recv_data = client.recv(1024).decode()

            # If data is not received, break
            if not recv_data:
                break

            # Print the data received
            print("Received: " + recv_data)

            # Convert string to int
            try:    
                sensor_id = int(recv_data.split(" ")[0])
                data = int(recv_data.split(" ")[1])
            except Exception as e:
                print("Error: " + str(e))
                client.send("Error format".encode())
                break

            # Get current time
            current_time = datetime.now().strftime("%H:%M:%S")

            # Prepare data to push to firebase
            push_data = {
                "Time": current_time,
                "Data": data,
            }

            # Push data to firebase
            if sensor_id == 1:
                database_reference.child("Sensor1").push(push_data)
            elif sensor_id == 2:
                database_reference.child("Sensor2").push(push_data)

            # Send data to the client
            client.send(recv_data.encode())

        # Close the connection
        client.close()
        print("Connection closed.")


if __name__ == "__main__":
    UDP_Server()
