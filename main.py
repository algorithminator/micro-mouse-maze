def get_coordinates():
    global degrees, counterY, counterX, listVisitedDir
    degrees = input.compass_heading()
    if degrees < 45:
        counterY = counterY + 1
        listVisitedDir.push("N")
    elif degrees < 135:
        counterX = counterX + 1
        listVisitedDir.push("E")
    elif degrees < 225:
        counterY = counterY - 1
        listVisitedDir.push("S")
    elif degrees < 315:
        counterX = counterX - 1
        listVisitedDir.push("W")
    else:
        counterY = counterY + 1
        listVisitedDir.push("N")

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

def checkIfVisited():
    for i in range(listVisitedX.length):
        if (counterX == listVisitedX.get(i)) and (counterY == listVisitedY.get(i)):
            return True
            #basic.show_string("Visited")
    return False

def getPreviousVisited():
    for i in range(listVisitedX.length):
        if i > 0:
           if (counterX == listVisitedX.get(i)) and (counterY == listVisitedY.get(i)):
              return listVisitedX.get(i-1), listVisitedY.get(i-1)
              #basic.show_string("Visited")
        else:
            basic.show_string("Start")
            return 0,0
    return 0,0

def go_back():
    bitbot.gocm(BBDirection.REVERSE, 30, 12)
    whichWay = 1
    basic.pause(100)
    # bitbot.spin_deg(BBRobotDirection.RIGHT, 25, 90)
    rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
    leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
    centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
    basic.pause(100)


whichWay = 0
counterX = 0
counterY = 0
degrees = 0
listVisitedX: List[number] = []
listVisitedY: List[number] = []
listVisitedDir: List[string] = []
backtracking = False
# signX = 1
# signY = 1
bitbot.enable_pid(False)
leftSensor = 1023
rightSensor = 1023
centerSensor = 1023

def on_forever():
    global rightSensor, centerSensor, leftSensor, whichWay
    rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
    centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
    leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
    # basic.show_number(rightSensor)
    # basic.show_number(centerSensor)
    # basic.show_number(leftSensor)
    basic.pause(100)
    if leftSensor <= 50 and rightSensor <= 50:
        # "forward"
        if whichWay == 0:
            bitbot.gocm(BBDirection.FORWARD, 30, 5)

            basic.pause(100)
            get_coordinates()
            basic.pause(100)
            if (checkIfVisited()):
                go_back()
                backtracking = True
                prevX,prevY = getPreviousVisited()
                
                  

            basic.pause(100)
            listVisitedX.push(counterX)
            listVisitedY.push(counterY)
        # basic.pause(100)
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
                    #backtracking = True
                    listVisitedDir.pop()
                    basic.pause(100)
        rightSensor = bitbot.read_line_analog(BBPLineSensor.RIGHT)
        leftSensor = bitbot.read_line_analog(BBPLineSensor.LEFT)
        centerSensor = bitbot.read_line_analog(BBPLineSensor.CENTRE)
        basic.pause(100)
    if leftSensor > 100 and rightSensor > 100 and centerSensor > 100:
        go_back()
    bitbot.steer(bitbot.merge_line_position(), 30)
    basic.pause(100)
basic.forever(on_forever)
