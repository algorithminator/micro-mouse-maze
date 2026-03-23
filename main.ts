let whichWay = 0
let counter = 0
bitbot.enablePID(false)
let leftSensor = 1023
let rightSensor = 1023
let centerSensor = 1023
//  0 - forward , 1- right , 2 - left, 4 -backward
basic.forever(function on_forever() {
    
    rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    basic.pause(100)
    if (leftSensor <= 50 && rightSensor <= 50) {
        //  "forward"
        if (whichWay == 0) {
            bitbot.gocm(BBDirection.Forward, 30, 5)
            counter = counter + 1
            // basic.show_number(counter)
            basic.pause(100)
        }
        
        // "right"
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
