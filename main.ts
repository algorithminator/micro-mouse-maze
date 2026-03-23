function get_coordinates() {
    
    degrees = input.compassHeading()
    if (degrees < 45) {
        counterY = counterY + 1
        listVisitedDir.push("N")
    } else if (degrees < 135) {
        counterX = counterX + 1
        listVisitedDir.push("E")
    } else if (degrees < 225) {
        counterY = counterY - 1
        listVisitedDir.push("S")
    } else if (degrees < 315) {
        counterX = counterX - 1
        listVisitedDir.push("W")
    } else {
        counterY = counterY + 1
        listVisitedDir.push("N")
    }
    
}

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

function checkIfVisited(): boolean {
    for (let i = 0; i < listVisitedX.length; i++) {
        if (counterX == listVisitedX.get(i) && counterY == listVisitedY.get(i)) {
            return true
        }
        
    }
    // basic.show_string("Visited")
    return false
}

function getPreviousVisited(): number[] {
    for (let i = 0; i < listVisitedX.length; i++) {
        if (i > 0) {
            if (counterX == listVisitedX.get(i) && counterY == listVisitedY.get(i)) {
                return [listVisitedX.get(i - 1), listVisitedY.get(i - 1)]
            }
            
        } else {
            // basic.show_string("Visited")
            basic.showString("Start")
            return [0, 0]
        }
        
    }
    return [0, 0]
}

function go_back() {
    bitbot.gocm(BBDirection.Reverse, 30, 12)
    let whichWay = 1
    basic.pause(100)
    //  bitbot.spin_deg(BBRobotDirection.RIGHT, 25, 90)
    let rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    let leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    let centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    basic.pause(100)
}

let whichWay = 0
let counterX = 0
let counterY = 0
let degrees = 0
let listVisitedX : number[] = []
let listVisitedY : number[] = []
let listVisitedDir : string[] = []
let backtracking = false
//  signX = 1
//  signY = 1
bitbot.enablePID(false)
let leftSensor = 1023
let rightSensor = 1023
let centerSensor = 1023
basic.forever(function on_forever() {
    let backtracking: boolean;
    
    rightSensor = bitbot.readLineAnalog(BBPLineSensor.Right)
    centerSensor = bitbot.readLineAnalog(BBPLineSensor.Centre)
    leftSensor = bitbot.readLineAnalog(BBPLineSensor.Left)
    //  basic.show_number(rightSensor)
    //  basic.show_number(centerSensor)
    //  basic.show_number(leftSensor)
    basic.pause(100)
    if (leftSensor <= 50 && rightSensor <= 50) {
        //  "forward"
        if (whichWay == 0) {
            bitbot.gocm(BBDirection.Forward, 30, 5)
            basic.pause(100)
            get_coordinates()
            basic.pause(100)
            if (checkIfVisited()) {
                go_back()
                backtracking = true
                let [prevX, prevY] = getPreviousVisited()
            }
            
            basic.pause(100)
            listVisitedX.push(counterX)
            listVisitedY.push(counterY)
        }
        
        //  basic.pause(100)
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
                    // backtracking = True
                    _py.py_array_pop(listVisitedDir)
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
        go_back()
    }
    
    bitbot.steer(bitbot.mergeLinePosition(), 30)
    basic.pause(100)
})
