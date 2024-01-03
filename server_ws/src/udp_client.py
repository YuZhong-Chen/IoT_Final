#!/usr/bin/env python3

import socket


def UDP_Client(data):
    # Set up the host and port
    host = "140.114.218.56"
    port = 5000

    # Get instance
    client_socket = socket.socket()

    # Connect to the server
    client_socket.connect((host, port))

    # Convert data to hex
    data = bytes(data, encoding="utf-8")
    data = data.hex()
    
    # Send message to server
    client_socket.send(data.encode())

    # Receive response
    data = client_socket.recv(1024).decode()
    data = bytes.fromhex(data).decode()
    print("Received from server: " + data)

    # Close the connection
    client_socket.close()


if __name__ == "__main__":
    # Take input from command line
    message = input(" -> ")

    while True:
        UDP_Client(message)

        # Take input again
        message = input(" -> ")
