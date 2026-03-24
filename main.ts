function get_coordinates() {
    
    degrees = input.compassHeading()
    if (degrees < 45) {
        counterY = counterY + 1
        basic.showNumber(counterX)
        basic.showNumber(counterY)
    } else if (degrees < 135) {
        counterX = counterX + 1
        basic.showNumber(counterX)
        basic.showNumber(counterY)
    } else if (degrees < 225) {
        counterY = counterY - 1
        basic.showNumber(counterX)
        basic.showNumber(counterY)
    } else if (degrees < 315) {
        counterX = counterX - 1
        basic.showNumber(counterX)
        basic.showNumber(counterY)
    } else {
        counterY = counterY + 1
        basic.showNumber(counterX)
        basic.showNumber(counterY)
    }
    
}

// return [counterX, counterY]
//  0 - forward , 1- right , 2 - left, 4 -backward
function show_direction() {
    
    degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showArrow(ArrowNames.North)
        counterY = counterY + 1
    } else if (degrees < 135) {
        basic.showArrow(ArrowNames.East)
        counterX = counterX + 1
    } else if (degrees < 225) {
        basic.showArrow(ArrowNames.South)
        counterY = counterY - 1
    } else if (degrees < 315) {
        basic.showArrow(ArrowNames.West)
        counterX = counterX - 1
    } else {
        basic.showArrow(ArrowNames.North)
        counterY = counterY + 1
    }
    
}

let whichWay = 0
let counterX = 0
let counterY = 0
let degrees = 0
//  signX = 1
//  signY = 1
bitbot.enablePID(false)
let leftSensor = 1023
let rightSensor = 1023
let centerSensor = 1023
basic.forever(function on_forever() {
    
    rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    basic.pause(100)
    if (leftSensor <= 100 && rightSensor <= 100) {
        //  "forward"
        if (whichWay == 0) {
            bitbot.gocm(BBDirection.Forward, 30, 5)
            basic.pause(100)
            // counter = counter + 1
            //  led.plot(counterX, counterY)
            //  show_direction();
            get_coordinates()
        }
        
        // basic.pause(100)
        //  "right"
        if (whichWay == 1) {
            bitbot.spinDeg(BBRobotDirection.Right, 30, 30)
            whichWay = 0
            basic.pause(100)
            rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
            centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
            if (rightSensor > 100 && centerSensor > 100) {
                bitbot.spinDeg(BBRobotDirection.Left, 30, 60)
                basic.pause(100)
                leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
                centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
                if (leftSensor > 100 && centerSensor > 100) {
                    bitbot.spinDeg(BBRobotDirection.Left, 30, 150)
                    basic.pause(100)
                }
                
            }
            
        }
        
        rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
        leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
        centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
        basic.pause(100)
    }
    
    if (leftSensor > 100 && rightSensor > 100 && centerSensor > 100) {
        bitbot.gocm(BBDirection.Reverse, 30, 12)
        whichWay = 1
        basic.pause(100)
        //  bitbot.spin_deg(BBRobotDirection.RIGHT, 25, 90)
        rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
        leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
        centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
        basic.pause(100)
    }
    
    bitbot.steer(bitbot.mergeLinePosition(), 30)
    basic.pause(100)
})
