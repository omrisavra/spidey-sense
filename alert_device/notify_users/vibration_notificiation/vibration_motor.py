import RPi.GPIO as GPIO
import logging


class VibrationMotor(object):
    def __init__(self, gpio_pin_id):
        self._gpio_pin_id = gpio_pin_id
        self.logger = logging.getLogger(str(self))
        self.logger.debug("Setting up PI...")
        self.logger.debug("Setting up device mode as BCM")
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        self.logger.debug(f"Setting up pin {self._gpio_pin_id} as output")
        GPIO.setup(gpio_pin_id, GPIO.OUT)

    def start_vibration(self):
        self.logger.debug("Starting vibration")
        GPIO.output(self._gpio_pin_id, GPIO.HIGH)

    def stop_vibration(self):
        self.logger.debug("Stopping vibration")
        GPIO.output(self._gpio_pin_id, GPIO.LOW)

    def __repr__(self):
        return f"<VibrationMotor:{self._gpio_pin_id}>"
