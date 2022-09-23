param(
  [int]$x,
  [int]$y,
	[string]$bc_area_id,
	[string]$bc_map_id,
	[string]$id,
	[string]$area_id,
	[string]$map_id,
	[string]$side_id,
	[string]$debug_id
)

$wsh = New-Object -ComObject WScript.Shell

$port = 32270

$out_path="image_output/previews/$($bc_area_id)/$($type)/$($bc_map_id)/$($side_id)"
if (!(Test-Path $out_path))
{
	New-Item -ItemType Directory -Force -Path "$out_path"
}

# Keep screen awake while screenshotting.
$wsh.SendKeys('+{F15}')

$res = Invoke-RestMethod -URI "http://localhost:$port/tp?area=$area_id/$map_id&side=$side_id&level=$debug_id&x=$x&y=$y"
Start-Sleep -Milliseconds 700

$out_img_path = "$($out_path)/$($debug_id).png"
magick "convert" "screenshot:[1]" "-crop" "320x180+1+31" "+repage" "png:-" "|" "pngquant" "-" "--speed=1" "--quality=50-100" "--force" "--nofs" ">" "$out_img_path" | Out-Null
pngquant --speed=1 --skip-if-larger --quality=50-100 --force --verbose --nofs --ext=.png "$out_img_path"