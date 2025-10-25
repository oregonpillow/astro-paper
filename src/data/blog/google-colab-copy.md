---
author: Timothy Pillow
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: Copying Folders in Google Drive Using Google Colab  
slug: copying-folders-google-drive-google-colab  
tags:  
  - google-drive  
  - google-colab  
  - file-management  
description: Learn how to efficiently copy folders in Google Drive using Google Colab, bypassing the platform's limitation of not allowing direct folder duplication.
---

Google Drive is a great platform for storing files and document management. However one annoying feature is that it only allows you to copy files, not directories (as of January 2020).

![google-copy](/google-copy.png)

Selecting an individual file or multiple files to copy works fine and the option to ‘Make a copy’ to your drive is presented with a right click.

But when you select folders as part of the selection, Google Drive gives no option to copy folders. What?!

## The Classic Problem

Someone shares a folder with you containing multiple sub-folders and files but tells you not to alter the original data. Therefore you need to make a copy of the folder to your own drive.

But when you right click the shared folder you are only given an option to ‘Add to My Drive’ which doesn’t copy the folder; it places a shortcut of the folder on your Drive — which again doesn’t help because you don’t want to modify the shared folder!

![google-shortcut](/google-shortcut.png)

## The Solution — Open a Google Colab Notebook!

Luckily, there is a simple hacker solution to this problem. Using Google Colab, you can map your Google Drive to Colab notebook then issue a Linux command to manipulate / copy your files.

1. Open a Google Colab Notebook
2. Map your Google Drive

```bash
from google.colab import drive
drive.mount('/gdrive')
```

3. Copy Using Linux

```bash
#path that contains folder you want to copy
%cd /gdrive/My Drive/...
%cp -av YOUR_FOLDER NEW_FOLDER_COPY
```

![colab-ex1](/colab-ex1.png)

If you’re wondering what % is for, it’s simply the Google Colab way of signaling to the notebook to run a Linux terminal command. For help finding the ‘path’ of your Google Drive or Folder, use the side panel on the left — right clicking on a folder will present you with an option to ‘copy path’.

Lastly, confirm the folder copy worked.

![colab-final](/colab-final.png)

I’m pretty confident this is the easiest solution that exists to efficiently copy large folders on Google Drive. A much less effective solution that many people try is to download the folder of interest then upload it again to their drive.

Hope it helps!
