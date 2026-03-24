def get_coordinates():
    global degrees, counterY, counterX
    
    degrees = input.compass_heading()
    if degrees < 45:
        counterY = counterY + 1
        basic.show_number(counterX)
        basic.show_number(counterY)
    elif degrees < 135:
        counterX = counterX + 1
        basic.show_number(counterX)
        basic.show_number(counterY)
    elif degrees < 225:
        counterY = counterY - 1
        basic.show_number(counterX)
        basic.show_number(counterY)
    elif degrees < 315:
        counterX = counterX - 1
        basic.show_number(counterX)
        basic.show_number(counterY)
    else:
        counterY = counterY + 1
        basic.show_number(counterX)
        basic.show_number(counterY)
    #return [counterX, counterY]
# 0 - forward , 1- right , 2 - left, 4 -backward
def show_direction():
    global degrees, counterY, counterX
    degrees = input.compass_heading()
    if degrees < 45:
        basic.show_arrow(ArrowNames.NORTH)
        counterY = counterY + 1
    elif degrees < 135:
        basic.show_arrow(ArrowNames.EAST)
        counterX = counterX + 1
    elif degrees < 225:
        basic.show_arrow(ArrowNames.SOUTH)
        counterY = counterY - 1
    elif degrees < 315:
        basic.show_arrow(ArrowNames.WEST)
        counterX = counterX - 1
    else:
        basic.show_arrow(ArrowNames.NORTH)
        counterY = counterY + 1
whichWay = 0
counterX = 0
counterY = 0
degrees = 0
# signX = 1
# signY = 1
bitbot.enable_pid(False)
leftSensor = 1023
rightSensor = 1023
centerSensor = 1023

def on_forever():
    global rightSensor, leftSensor, centerSensor, whichWay, counterX, counterY
    rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
    leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
    centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
    basic.pause(100)
    if leftSensor <= 100 and rightSensor <= 100:
        # "forward"
        if whichWay == 0:
            bitbot.gocm(BBDirection.FORWARD, 30, 5)
            basic.pause(100)
            #counter = counter + 1
            # led.plot(counterX, counterY)
            # show_direction();
            get_coordinates()
            #basic.pause(100)
        # "right"
        if whichWay == 1:
            bitbot.spin_deg(BBRobotDirection.RIGHT, 30, 30)
            whichWay = 0
            basic.pause(100)
            rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
            centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
            if rightSensor > 100 and centerSensor > 100:
                bitbot.spin_deg(BBRobotDirection.LEFT, 30, 60)
                basic.pause(100)
                leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
                centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
                if leftSensor > 100 and centerSensor > 100:
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
