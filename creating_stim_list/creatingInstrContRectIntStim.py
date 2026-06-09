import math
from PIL import Image, ImageDraw
import pandas as pd

# Continuous integrated rectangles 

# setting up canvas size
stimW = 400
stimH = 600

# setting global properties of the stim (for now, we could vary them though, e.g., vary dot size so that area is varied)
colorOptions = ["dodgerblue", "#eb9626",]
hueNames = ["orange", "blue"]
radius = 28
gap = 10 #minimum space between edge of canvas and rectangle

#setting up stim parameters
# includes: set1 size, set2 size, habtype as an indicator of stim category
stimList = pd.read_csv("pic_instructions_stim_list.csv")

# draw the rectangles
def create_rect(w, unitH, size, color, x0, y0): #width, unit height in pixels, number of units in the height, color, x1, y1 of rect
    x0 = x0
    x1 = x0 + w
    
    y0 = y0
    y1 = y0 + unitH*size

    return draw.rectangle((x0, y0, x1, y1), fill = color, outline = color)

# function to draw the horizontal border lines
def create_horizontal_line(w, totalHeight, x0, y0):
    # y of top horizontal line
    y1 = y0 - 1
    # y of bottom line
    y2 = y0 + 1 + totalHeight
    
    # xvalue to begin line
    x1 = x0 - 1
    # x value where to terminate (same for both). total height = line length
    x2 = x0 + 1 + w

    draw.line((x1, y1, x2, y1), fill='black', width= 1)
    draw.line((x1, y2, x2, y2), fill="black", width= 1)

# function to draw two vertical border lines
def create_vertical_line(w, unitH, size, x0, y0):
    # y value where to begin line (same for both)
    y1 = y0 - 1
    #y value where to terminate (same for both). total height = line length
    y2 = y0 + 1 + (size*unitH)
    
    # left border starting point
    x1 = x0 - 1
    # right border starting point
    x2 = x0 + 1 + width

    draw.line((x1, y1, x1, y2), fill='black', width= 1)
    draw.line((x2, y1, x2, y2), fill="black", width= 1)

# now to actually create the stim
# looping through the stimList and creating the shapes needed for each
for v in range(1, 3): #to make two sets

    for m in range(0, len(colorOptions)): # to make a set for each color to be dominant, to be counterbalanced

        majorColor = colorOptions[m]
        minorColor = colorOptions[(m+1)%2]

        for j in range(0, len(stimList)):

            # setting up new image from PIL
            stim = Image.new('RGBA', (stimW, stimH), color = 'white')
            draw = ImageDraw.Draw(stim)
            draw.rectangle([(0,0), (stimW - 1,stimH - 1)], outline = 'white')

            width = 80 # fixed width across stimuli
            unitHeight = (math.pi * (radius*radius))/width # creating pixle unit of height, based on width so that area of a single dot will be the area of a single "unit"

            set1 = stimList.iat[j, 0]
            set2 = stimList.iat[j, 1]

            # setting the x0 and y0 of each of the rectangles to be made
            totalHeight = set1 * unitHeight + set2 * unitHeight #height of the whole rectangle

            centX = stimW / 2
            centY = stimH / 2
        
            x0 = centX - width/2
            y0_r2 = centY - (totalHeight/2)
            y0_r1 = y0_r2 + set2*unitHeight

            create_rect(width, unitHeight, set1, majorColor, x0, y0_r1)
            create_rect(width, unitHeight, set2, minorColor, x0, y0_r2)
            
            create_horizontal_line(width, totalHeight, x0, y0_r2)

            create_vertical_line(width, unitHeight, set1, x0, y0_r1)
            create_vertical_line(width, unitHeight, set1, x0, y0_r1)
            create_vertical_line(width, unitHeight, set2, x0, y0_r2)
            create_vertical_line(width, unitHeight, set2, x0, y0_r2)

            # save image with name of the form cont_habtype_set1_set2
            # to make a second version
            fileName = "ContRectInt_" + str(hueNames[m]) + "_" + str(set1) + "_" + str(set2) +  ".png"
            stim.save("StimFiles_instr/" + fileName)
