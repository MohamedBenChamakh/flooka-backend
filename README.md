## HLS server and a simple client
#### check screenshot in the root path in this report

### transcode a new video:
- Put a video in the src/videos dir
- change the **inputpath** var in **transcoder.js** (you can change ffmpeg commands codecs and options)
- run node **transcoder.js** (to introduce more resolution, **dirs should be created in advance(like 240 in the screen **, else ffmpeg will not find the output folder)

## View the video:
 run **node index.js** and open localhost:4200


#### Segment length should be at maximum 6s
#### All resolutions segments should be the same length(so that transition be more fluid )
#### Codecs and profiles are specific for each device, we need to check this also.