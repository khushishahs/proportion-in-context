import math
from PIL import Image, ImageDraw
import pandas as pd

# Discretized integrated rectangles

# setting up canvas size
stimW = 325
stimH = 525

# num(set1) always orange, other subset always blue
numeratorColor = "orange"
denominatorColor = "dodgerblue"

radius = 25  # of the corresponding circles
gap = 0  # minimum space between edge of canvas and rectangle

# setting up stim parameters
stimList = pd.read_csv("pic_full_stim_list.csv")


# draw the rectangles
def create_rect(w, unitH, size, color, x0, y0):
    # width, unit height in pixels, number of units in the height, color, x1, y1 of rect
    x1 = x0 + w
    y1 = y0 + unitH * size
    return draw.rectangle((x0, y0, x1, y1), fill=color, outline=color)


# function to draw the discretizing lines
def create_horizontal_line(w, unitH, size, x0, y0):
    lineDist = unitH

    for i in range(size + 1):
        y = y0 + i * lineDist
        draw.line((x0, y, x0 + w, y), fill="black", width=1)


# function to draw two vertical border lines
def create_vertical_line(w, unitH, size, x0, y0):
    # y value where to begin line
    y1 = y0
    # y value where to terminate
    y2 = y0 + (size * unitH)

    # left border starting point
    x1 = x0 - 1
    # right border starting point
    x2 = x0 + 1 + w

    draw.line((x1, y1, x1, y2), fill="black", width=1)
    draw.line((x2, y1, x2, y2), fill="black", width=1)


# now to actually create the stim
# create two versions of each stimulus to switch vertical order of subsets 

for j in range(0, len(stimList)):

    set1 = stimList.iat[j, 0]
    set2 = stimList.iat[j, 1]

    width = 80  # fixed width across stimuli
    unitHeight = (math.pi * (radius * radius)) / width
    totalHeight = (set1 + set2) * unitHeight

    centX = stimW / 2
    centY = stimH / 2
    x0 = centX - width / 2

    # set1/orange on bottom
    stim = Image.new("RGBA", (stimW, stimH), (0, 0, 0, 0))
    draw = ImageDraw.Draw(stim)

    y0_top = centY - (totalHeight / 2)
    y0_bottom = y0_top + set2 * unitHeight

    create_rect(width, unitHeight, set2, denominatorColor, x0, y0_top)
    create_rect(width, unitHeight, set1, numeratorColor, x0, y0_bottom)

    create_horizontal_line(width, unitHeight, set2, x0, y0_top)
    create_horizontal_line(width, unitHeight, set1, x0, y0_bottom)

    create_vertical_line(width, unitHeight, set2, x0, y0_top)
    create_vertical_line(width, unitHeight, set1, x0, y0_bottom)

    fileName = "DivRectInt_orange_bottom_" + str(set1) + "_" + str(set2) + ".png"
    stim.save("StimFiles_test/" + fileName)

    # set1/orange on top
    stim = Image.new("RGBA", (stimW, stimH), (0, 0, 0, 0))
    draw = ImageDraw.Draw(stim)

    y0_top = centY - (totalHeight / 2)
    y0_bottom = y0_top + set1 * unitHeight

    create_rect(width, unitHeight, set1, numeratorColor, x0, y0_top)
    create_rect(width, unitHeight, set2, denominatorColor, x0, y0_bottom)

    create_horizontal_line(width, unitHeight, set1, x0, y0_top)
    create_horizontal_line(width, unitHeight, set2, x0, y0_bottom)

    create_vertical_line(width, unitHeight, set1, x0, y0_top)
    create_vertical_line(width, unitHeight, set2, x0, y0_bottom)

    fileName = "DivRectInt_blue_bottom_" + str(set1) + "_" + str(set2) + ".png"
    stim.save("StimFiles_test/" + fileName)