Add-Type -AssemblyName System.Drawing

[System.Drawing.Image]$img = [System.Drawing.Image]::FromFile("c:\Users\sohel\OneDrive\Documents\Projects\Websites\Welkin\favicon.png")
$width = $img.Width
$height = $img.Height

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
[System.Drawing.Graphics]$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$radius = $width * 0.25
If ($radius -lt 1) { $radius = 1 }
$diameter = $radius * 2

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc(0, 0, $diameter, $diameter, 180, 90)
$path.AddArc($width - $diameter, 0, $diameter, $diameter, 270, 90)
$path.AddArc($width - $diameter, $height - $diameter, $diameter, $diameter, 0, 90)
$path.AddArc(0, $height - $diameter, $diameter, $diameter, 90, 90)
$path.CloseFigure()

$graphics.SetClip($path)
$graphics.DrawImage($img, 0, 0, $width, $height)

$img.Dispose()
$graphics.Dispose()

$bitmap.Save("c:\Users\sohel\OneDrive\Documents\Projects\Websites\Welkin\favicon_rounded.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()

Write-Output "Favicon corner rounding completed."
