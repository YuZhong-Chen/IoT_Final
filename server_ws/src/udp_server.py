#!/usr/bin/env python3

import socket


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
            data = client.recv(1024).decode()

            # If data is not received, break
            if not data:
                break

            # Print the data received
            print("Received: " + str(data))

            # Send data to the client
            client.send(data.encode())

        # Close the connection
        client.close()
        print("Connection closed.")


if __name__ == "__main__":
    UDP_Server()
