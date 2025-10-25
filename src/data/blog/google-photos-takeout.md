---
author: Timothy Pillow
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: Downloading Google Photos Without Waiting for Google Takeout  
slug: download-google-photos-without-takeout  
tags:  
  - google-photos  
  - photo-management  
  - automation  
description: Learn how to download your entire Google Photos library directly from the web interface without waiting for Google Takeout, using simple automation techniques.
---

Google Takeout, sometimes known as 'Download Your Data' allows you to export all your Google cloud photos. However, for large libraries you must wait for Google to archive the photos into a .zip or .tgz file and then email you a link. This can take several days to receive for large libraries. I waited several days for a 32GB+ library.

However, there is a way to download all your photos from the web-gui WITHOUT, yes you read that right, without waiting for the archived files.

Go to [photos.google.com](https://photos.google.com) to display all your photos. There is no direct way to select all photos on this page to download (at least, beyond a 500 photo limit), so here is the workaround:

1. Load all the photos on the page
2. Select all the photos on the page + add them to a new album
3. Download the album

Here are the 3 steps explained.

## 1. Load all the photos on the page

In order to select all the photos, you need to have each image thumbnail fully rendered. Simply scrolling from the top to the bottom instance will result in only rendering thumbnails at the very top + very bottom. We need ALL of them to be rendered. The key is to scroll slowly through the ENTIRE PAGE to force all thumbnails to be rendered.

For example, with the following python code, I was able to slowly scroll the entire page by keeping the down arrow on my keyboard “virtually” pressed using the [pyautogui](https://pyautogui.readthedocs.io/en/latest/) module for python.

```python
import pyautogui
from time import sleep

while True:
  pyautogui.keyDown('down')
  sleep(0.05)
  pyautogui.keyUp('down')
```

I left it running for a few hours until it had finished. There are many options to scroll an entire page automatically. This is just one method.

## 2. Select all the photos on the page + add them to a new album

Now that the entire page of photos is rendered, select the last photo, then scroll up to the top of page and select first photo WHILE holding SHIFT key (this will select all photos on the page).

Then select the + button in top right > Album > Select Add to New Album then wait. This can take several minutes for all the photos to be added.

## 3. Download the new album

Lastly, select the album with all your photos in, and in the top right of screen select the 3 dot button > Select Download.

This can take a while depending on your library, but eventually you’ll be offered a ZIP file to download.

Done! You’ve now bypassed the long takeout process! However…there is a drawback…

**Caveat to the method**
The advantage of downloading photos with Google Takeout is that timestamps are generally preserved (at least from what i can tell so far), but timestamps with this method default to the day of download, e.g. today.

Depending on your needs it might be better to wait for your Google Takeout data to be ready.
