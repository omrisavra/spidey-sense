import time
import requests
import logging
import argparse
from vibration_motor import VibrationMotor


class VibrationClient(object):
    NOTIFY_URL = "{server_url}/notify"
    SHOULD_NOTIFY = "true"
    SHOULD_NOT_NOTIFY = "false"

    def __init__(self, rpi_motor_pin_id, server_url, polling_interval=1):
        self.logger = logging.getLogger(str(self))
        self.logger.addHandler(logging.StreamHandler())
        self.logger.setLevel(logging.DEBUG)
        self._rpi_motor_pin_id = rpi_motor_pin_id
        self._vibration_motor = VibrationMotor(self._rpi_motor_pin_id)
        self._server_url = server_url
        self._polling_interval = polling_interval
        self._is_running = False

    def start(self):
        self.logger.info("Starting vibration client")
        self._is_running = True
        while self._is_running:
            self.logger.debug(f"Checking server")
            self.check_server()
            self.logger.debug(f"Sleeping for {self._polling_interval}")
            time.sleep(self._polling_interval)

    def check_server(self):
        try:
            self.logger.debug(f"Sending a get reqeust to {self.NOTIFY_URL.format(server_url=self._server_url)}")
            response = requests.get(self.NOTIFY_URL.format(server_url=self._server_url))
            if response.ok:
                if response.content == self.SHOULD_NOTIFY:
                    self.logger.debug("Should start motor, starting it...")
                    self._vibration_motor.start()
                elif response.content == self.SHOULD_NOT_NOTIFY:
                    self.logger.debug("Should stop motor, stopping it...")
                    self._vibration_motor.stop()
                else:
                    self.logger.warning(f"Got unexpected response from server: {response.content}")
                    self._vibration_motor.stop()
        except KeyboardInterrupt:
            self.logger.info("Manually stopped")
        finally:
            self.close()

    def close(self):
        self.logger.debug("Stopping motor")
        self._vibration_motor.stop()
        self.logger.info("Stopping vibration client")
        self._is_running = False

    def __repr__(self):
        return "<VibrationClient:{self._rpi_motor_pin_id}@{self._server_url}>"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Vibration Client')
    parser.add_argument("-s", "--server", type=str, help="The url of the server, INCLUDING port")
    parser.add_argument("-i", "--interval", default=1, type=int, help="How many seconds between polling of the server")
    parser.add_argument("--pin-id", default=18, type=int, help="The GPIO pin id")
    args = parser.parse_args()
    client = VibrationClient(rpi_motor_pin_id=args.pin_id, server_url=args.server, polling_interval=args.interval)
    client.start()
