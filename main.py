DISTANCE_TO_WALL = 50


def adjustDirToCompass(degrees2):
    
    degrees1 = input.compass_heading()  
    diffDeg = (degrees1 -degrees2)%360
    #less to the left than..
    if diffDeg >=  270 :
            adjustDir = -3 
    #..to the right      
    elif diffDeg <= 90:
            adjustDir = +5 
            
    else:
            
            adjustDir = 0
            
    
    return adjustDir

def on_forever():
    global DISTANCE_TO_WALL 
    degrees2 = input.compass_heading()

    distWall = bitbot.sonar(BBPingUnit.CENTIMETERS)
    basic.pause(100)
    
    # --WALL UP FRONT?--#
    while distWall <= DISTANCE_TO_WALL :
        bitbot.stop(BBStopMode.BRAKE)
        basic.pause(100)
        bitbot.spin_deg(BBRobotDirection.LEFT, 60, 90)
        basic.pause(200)
        distWall = bitbot.sonar(BBPingUnit.CENTIMETERS)
    
    # -- KEEP Direction checking compass-- #
    bitbot.steer(adjustDirToCompass(degrees2), 80)
    basic.pause(100)
basic.forever(on_forever)
