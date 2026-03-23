leftSensor = 1023
rightSensor = 1023
centerSensor = 1023
alongWall = Math.random_boolean()
spinDir = BBRobotDirection.LEFT
bitbot.enable_pid(False)

def on_forever():
    global rightSensor, leftSensor, centerSensor, spinDir, alongWall
    centerSensor = 1023
    rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
    # - 40 / 10
    leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
    # - 40 / 10
    centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
    # - 40 / 10 input.running_time_micros()

    if alongWall == True:
        spinDir = BBRobotDirection.LEFT
    else:
        spinDir = BBRobotDirection.RIGHT
    
    while centerSensor <= 50:
        bitbot.spin_deg(spinDir, 60, 90)
        basic.pause(50)
        centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
 
    
    rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
    if rightSensor < 50:
        while rightSensor < 50:
           alongWall = Math.random_boolean()
           bitbot.spin_deg(BBRobotDirection.LEFT, 60, 30)
           basic.pause(50)
           rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
        bitbot.move(BBMotor.LEFT, BBDirection.FORWARD, 80)
        bitbot.move(BBMotor.RIGHT, BBDirection.FORWARD, 70)
        basic.pause(50)
        # # langs veggen
        #bitbot.spin_deg(BBRobotDirection.RIGHT, 60, 15)
    
    leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
    if leftSensor < 50:
        while leftSensor < 50:
            alongWall = Math.random_boolean()
            bitbot.spin_deg(BBRobotDirection.RIGHT, 60, 30)
            basic.pause(50)
            leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
        bitbot.move(BBMotor.LEFT, BBDirection.FORWARD, 70)
        bitbot.move(BBMotor.RIGHT, BBDirection.FORWARD, 80)
        basic.pause(50)
        # # langs veggen
        #bitbot.spin_deg(BBRobotDirection.LEFT, 60, 15)

    bitbot.move(BBMotor.LEFT, BBDirection.FORWARD, 80)
    bitbot.move(BBMotor.RIGHT, BBDirection.FORWARD, 75)
    basic.pause(50)
               
basic.forever(on_forever)
