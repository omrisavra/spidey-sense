import time
import requests
import logging
from vibration_motor import VibrationMotor


class VibrationClient(object):
    NOTIFY_URL = "{server_url}/notify"
    SHOULD_NOTIFY = "true"
    SHOULD_NOT_NOTIFY = "false"

    def __init__(self, rpi_motor_pin_id, server_url, polling_interval=1):
        self.logger = logging.getLogger(str(self))
        self._rpi_motor_pin_id = rpi_motor_pin_id
        self._vibration_motor = VibrationMotor(self._rpi_motor_pin_id)
        self._server_url = server_url
        self._polling_interval = polling_interval
        self._is_running = False

    def start(self):
        self._is_running = True
        while self._is_running:
            self.check_server()
            time.sleep(self._polling_interval)

    def check_server(self):
        try:
            response = requests.get(self.NOTIFY_URL.format(server_url=self._server_url))
            if response.ok:
                if response.content == self.SHOULD_NOTIFY:
                    self._vibration_motor.start()
                elif response.content == self.SHOULD_NOT_NOTIFY:
                    self._vibration_motor.stop()
                else:
                    self.logger.warning(f"Got unexpected response from server: {response.content}")
                    self._vibration_motor.stop()
        finally:
            self.close()

    def close(self):
        self._vibration_motor.stop()
        self._is_running = False

    def __repr__(self):
        return "<VibrationClient:{self._rpi_motor_pin_id}@{self._server_url}>"
