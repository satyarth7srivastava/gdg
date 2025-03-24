import qrcode

# example data
data = ("Amitesh,2304003,NIT Patna")
# output file name
filename = "qrcodes/2304003.png"
# generate qr code
img = qrcode.make(data)
# save img to a file
img.save(filename)
