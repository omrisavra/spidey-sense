# Spidey-Sense


https://user-images.githubusercontent.com/5289630/229311390-2fbefd17-3d0b-4a6f-9ba9-164010e89d72.mp4



## Introduction

The Spidey-Sense hat is a wearable device we developed during Brainstorm's "Senses Enhancements" hackathon. The goal of the project was to provide ordinary people with an extra sense of safety and awareness in busy and dangerous environments.

The Spidey-Sense is a smart hat that uses a camera and a Raspberry Pi to detect potential danger from behind the user. The algorithm calculates the distance and speed of objects or people approaching from behind, and if the danger level exceeds a threshold, the Raspberry Pi activates a vibration motor inside the hat. This creates a tingling sensation in the user's head, similar to the "spider sense", warning them of potential danger.

## Technology Overview

The Spidey-Sense hat combines multiple technologies to create a complex wearable device that can grant an extra sense of safety to its users.

### Server-Side

A server-side application using Node.js and Restify to receive and handle requests from the Raspberry Pi. The server-side application receives data from the Raspberry Pi, including the distance and speed of objects or people approaching from behind, and shots of the potential danger.

https://github.com/omrisavra/spidey-sense/tree/master/server

### Client-Side

A client-side application using React.js to communicate with the server-side. The client-side application displays the status of the user's safety. When the user is safe, the client displays "safe". When the danger level exceeds a threshold, the client displays "danger" and shows a snapshot of the potential danger that the camera detected.

https://github.com/omrisavra/spidey-sense/tree/master/alert_device

### Python Vibration Library

A Python vibration library that monitors the server-side and checks if the danger level exceeds a threshold. If the danger level is high, the vibration library activates the vibration motor inside the hat, creating a tingling sensation or vibration in the user's head.

https://github.com/omrisavra/spidey-sense/tree/master/notify_users/vibration_notificiation

### Python Face Distance Approximator

A Python package that uses computer vision techniques to recognize people from behind, approximate their distance, and calculate the danger level. The package uses OpenCV and Haar cascades to detect and recognize people from the back view. It then uses a distance-approximation algorithm to calculate the distance of the person from behind the user. Based on the distance and speed, the package calculates the danger level and communicates with the server-side to update the status.

https://github.com/rosenpin/face-distance-approximator

### Installation and Running

To install and run the Spidey-Sense, you will need a Raspberry Pi, a camera module, and a vibration motor. The code for the algorithm, server-side, client-side, and vibration library can be found in the Spidey-Sense GitHub repository. The Face-Distance-Approximator package can be found in its own GitHub repository.

You need to configure the correct IP addresses for the server side in both the client side code.
Run the server side using `yarn dev` and run the vibration motor `vibration_client.py` and face detection `start_camera.py` library providing the server address with the `-s` argument.


## Conclusion

By leveraging multiple technologies we were able to create a complex wearable device that can grant an extra sense of safety and awareness to its users. The Spidey-Sense hat can be useful in various scenarios such as maneuvering through busy areas, assisting women to get around at night, and helping workers in dangerous jobs stay more aware of their surroundings.


### Getting too close
![IMG_1848](https://user-images.githubusercontent.com/5289630/229369438-36e80dae-806e-4a16-8ae4-2c8b2a474c7d.jpg)

### Threat detected
![PXL_20230331_010835426 MP](https://user-images.githubusercontent.com/5289630/229369432-c2d31112-5a8e-42f0-b374-e6152fd7dc3e.jpg)

### Initial pre POC

https://user-images.githubusercontent.com/5289630/229369449-5357d831-68ff-4592-92e3-2d44c1cc008e.mp4


