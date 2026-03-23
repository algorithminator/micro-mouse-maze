let leftSensor = 1023
let rightSensor = 1023
let centerSensor = 1023
let alongWall = Math.randomBoolean()
let spinDir = BBRobotDirection.Left
bitbot.enablePID(false)
basic.forever(function on_forever() {
    
    centerSensor = 1023
    rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    //  - 40 / 10
    leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    //  - 40 / 10
    centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    //  - 40 / 10 input.running_time_micros()
    if (alongWall == true) {
        spinDir = BBRobotDirection.Left
    } else {
        spinDir = BBRobotDirection.Right
    }
    
    while (centerSensor <= 50) {
        bitbot.spinDeg(spinDir, 60, 90)
        basic.pause(50)
        centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    }
    rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    if (rightSensor < 50) {
        while (rightSensor < 50) {
            alongWall = Math.randomBoolean()
            bitbot.spinDeg(BBRobotDirection.Left, 60, 30)
            basic.pause(50)
            rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
        }
        bitbot.move(BBMotor.Left, BBDirection.Forward, 80)
        bitbot.move(BBMotor.Right, BBDirection.Forward, 70)
        basic.pause(50)
    }
    
    //  # langs veggen
    // bitbot.spin_deg(BBRobotDirection.RIGHT, 60, 15)
    leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    if (leftSensor < 50) {
        while (leftSensor < 50) {
            alongWall = Math.randomBoolean()
            bitbot.spinDeg(BBRobotDirection.Right, 60, 30)
            basic.pause(50)
            leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
        }
        bitbot.move(BBMotor.Left, BBDirection.Forward, 70)
        bitbot.move(BBMotor.Right, BBDirection.Forward, 80)
        basic.pause(50)
    }
    
    //  # langs veggen
    // bitbot.spin_deg(BBRobotDirection.LEFT, 60, 15)
    bitbot.move(BBMotor.Left, BBDirection.Forward, 80)
    bitbot.move(BBMotor.Right, BBDirection.Forward, 75)
    basic.pause(50)
})
