import RPi.GPIO as GPIO
import logging


class VibrationMotor(object):
    def __init__(self, gpio_pin_id):
        self._gpio_pin_id = gpio_pin_id
        self._is_running = False
        self.logger = logging.getLogger(str(self))
        self.logger.setLevel(logging.DEBUG)
        self.logger.addHandler(logging.StreamHandler())
        self.logger.debug("Setting up PI...")
        self.logger.debug("Setting up device mode as BCM")
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        self.logger.debug(f"Setting up pin {self._gpio_pin_id} as output")
        GPIO.setup(gpio_pin_id, GPIO.OUT)

    def start(self):
        if not self._is_running:
            self.logger.debug("Starting motor")
            GPIO.output(self._gpio_pin_id, GPIO.HIGH)
            self._is_running = True
        else:
            self.logger.debug("Tried to start while motor was already running")

    def stop(self):
        if self._is_running:
            self.logger.debug("Stopping motor")
            GPIO.output(self._gpio_pin_id, GPIO.LOW)
            self._is_running = False
        else:
            self.logger.debug("Tried to stop when motor wasn't running")

    @property
    def is_running(self):
        return self._is_running

    def __repr__(self):
        return f"<VibrationMotor:{self._gpio_pin_id}>"
