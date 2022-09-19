param(
	[string]$bc_area_id,
	[string]$bc_map_id,
	[string]$id,
	[string]$area_id,
	[string]$map_id,
	[string]$side_id,
	[string]$debug_id,
	[int]$room_width,
	[int]$room_height
)

$wsh = New-Object -ComObject WScript.Shell

$port = 32270
$tile_width = 320
$tile_height = 180
$stride_width = $tile_width
$stride_height = $tile_height

$offset_width = $stride_width / 2
$offset_height = $stride_height / 2

$width_tile_count = [System.Math]::Ceiling($room_width / $stride_width)
$height_tile_count = [System.Math]::Ceiling($room_height / $stride_height)

$total_tiles = $width_tile_count * $height_tile_count

$image_tmp="image_tmp/$($bc_area_id)/rooms/$($bc_map_id)/$($side_id)/$($debug_id)"
if (!(Test-Path $image_tmp))
{
	New-Item -ItemType Directory -Force -Path "$image_tmp"
}

$out_path="image_output/$($bc_area_id)/rooms/$($bc_map_id)/$($side_id)"
if (!(Test-Path $out_path))
{
	New-Item -ItemType Directory -Force -Path "$out_path"
}

for (($j = 1), ($y = $offset_height); $y -lt $room_height + $offset_height; $j++, ($y += $stride_height))
{

	# Keep screen awake while screenshotting.
	$wsh.SendKeys('+{F15}')
	
	for (($i = 1), ($x = $offset_width); $x -lt $room_width + $offset_width; $i++, ($x += $stride_width))
	{
		$count = ($j - 1) * $width_tile_count + $i
		echo "Tile: ($($i), $($j)),  Total: $($count) / $($total_tiles)"

		$res = Invoke-RestMethod -URI "http://localhost:$port/tp?area=$area_id/$map_id&side=$side_id&level=$debug_id&x=$x&y=$y&forcenew=true"
		Start-Sleep -Milliseconds 700

		magick "convert" "screenshot:[1]" "-crop" "320x180+1+31" "+repage" "$($image_tmp)/$($debug_id)_$('{0:d3}' -f ($j))_$('{0:d3}' -f ($i)).png" | Out-Null
	}
}

$i--
$j--

cmd "/c" "magick" "montage" "$($image_tmp)/*.png" "-tile" "$($i)x$($j)" "-geometry" "+0+0" "+repage" "png:-" "|" "magick" "convert" "-" "-crop" "$($room_width)x$($room_height)+0+0" "$($out_path)/$($debug_id).png" | Out-Null