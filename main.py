whichWay = 0
counter = 0
bitbot.enable_pid(False)
leftSensor = 1023
rightSensor = 1023
centerSensor = 1023
# 0 - forward , 1- right , 2 - left, 4 -backward

def on_forever():
    global rightSensor, leftSensor, centerSensor, whichWay, counter
    rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
    leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
    centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
    basic.pause(100)
    if leftSensor <= 50 and rightSensor <= 50:
        
        # "forward"
        if whichWay == 0:
           bitbot.gocm(BBDirection.FORWARD, 30, 5)
           counter = counter + 1
           #basic.show_number(counter)
           basic.pause(100)
        #"right"
        if whichWay == 1:
            bitbot.spin_deg(BBRobotDirection.RIGHT, 30, 30)
            whichWay = 0
            basic.pause(100)
            rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
            centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
            if  rightSensor > 100 and centerSensor > 100:
                bitbot.spin_deg(BBRobotDirection.LEFT, 30, 60)
                basic.pause(100)
                leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
                centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
                if  leftSensor > 100 and centerSensor > 100:
                        bitbot.spin_deg(BBRobotDirection.LEFT, 30, 150)
                        basic.pause(100)

        rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
        leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
        centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
        basic.pause(100)
    if leftSensor > 100 and rightSensor > 100 and centerSensor > 100:
        bitbot.gocm(BBDirection.REVERSE, 30, 12)
        whichWay = 1
        basic.pause(100)
        # bitbot.spin_deg(BBRobotDirection.RIGHT, 25, 90)
        rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
        leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
        centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
        basic.pause(100)
    bitbot.steer(bitbot.merge_line_position(), 30)
    basic.pause(100)
basic.forever(on_forever)