let leftSensor = 1023
let rightSensor = 1023
let centerSensor = 1023
let alongWall = "right"
let spinDir = BBRobotDirection.Left
bitbot.enablePID(false)
let decreaseSpeed = 0
basic.forever(function on_forever() {
    
    centerSensor = 1023
    rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    //  - 40 / 10
    leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    //  - 40 / 10
    centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    //  - 40 / 10 input.running_time_micros()
    if (alongWall == "right") {
        spinDir = BBRobotDirection.Left
    } else {
        spinDir = BBRobotDirection.Right
    }
    
    while (centerSensor <= 50) {
        bitbot.spinDeg(spinDir, 60, 90)
        decreaseSpeed = 0
        basic.pause(50)
        centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    }
    rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    if (rightSensor < 50) {
        while (rightSensor < 50) {
            alongWall = "right"
            bitbot.spinDeg(BBRobotDirection.Left, 60, 30)
            basic.pause(50)
            rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
        }
        bitbot.move(BBMotor.Left, BBDirection.Forward, 80)
        bitbot.move(BBMotor.Right, BBDirection.Forward, 70)
        decreaseSpeed = 0
        basic.pause(50)
    }
    
    //  # langs veggen
    // bitbot.spin_deg(BBRobotDirection.RIGHT, 60, 15)
    leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    if (leftSensor < 50) {
        while (leftSensor < 50) {
            alongWall = "left"
            bitbot.spinDeg(BBRobotDirection.Right, 60, 30)
            basic.pause(50)
            leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
        }
        bitbot.move(BBMotor.Left, BBDirection.Forward, 70)
        bitbot.move(BBMotor.Right, BBDirection.Forward, 80)
        decreaseSpeed = 0
        basic.pause(50)
    }
    
    //  # langs veggen
    // bitbot.spin_deg(BBRobotDirection.LEFT, 60, 15)
    if (leftSensor > 100 && rightSensor > 100 && centerSensor > 100) {
        bitbot.move(BBMotor.Left, BBDirection.Forward, 80)
        bitbot.move(BBMotor.Right, BBDirection.Forward, 75 - decreaseSpeed)
        decreaseSpeed = decreaseSpeed + 5
    }
    
    basic.pause(50)
})
