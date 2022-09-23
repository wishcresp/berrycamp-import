# Check if the celeste window is aligned by screenshotting a black transition screen.

$url = "http://localhost:32270/tp?area=Celeste/LostLevels&side=a&level=j-16&x=0&y=0"
$res = Invoke-RestMethod -URI $url
Start-Sleep -Milliseconds 200
magick "convert" "screenshot:[1]" "-crop" "320x180+1+31" "+repage" "black.png"