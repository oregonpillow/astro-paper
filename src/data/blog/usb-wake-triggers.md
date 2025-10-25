---
author: Timothy Pillow
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: Prevent USB Devices from Waking Debian from Sleep  
slug: prevent-usb-wake-debian-sleep  
tags:  
  - debian  
  - usb-devices  
  - linux-udev  
  - power-management  
  - linux-tips  
description: Learn how to stop USB devices like mice and keyboards from waking your Debian system from sleep mode by configuring udev rules.
---


After installing Debian 13, I found that when the OS is in suspend "sleep" mode it wakes up easiely as soon as the mouse or keyboard is touched. To prevent this you can lookup the USB devices and disable them with udev rules. Udev rules are configuration files in Linux that specify how the system should handle device events, such as when a device is plugged in or removed.

```sh
❯ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 046d:c548 Logitech, Inc. Logi Bolt Receiver
Bus 001 Device 004: ID 26ce:01a2 ASRock LED Controller
Bus 001 Device 005: ID 8087:0033 Intel Corp. AX211 Bluetooth
Bus 001 Device 006: ID 0c45:800a Microdia Vivitar Vivicam3350B
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```
where the `ID` field is given by `ID <idVendor>:<idProduct>`.

Now you can create a rules file, for example `/etc/udev/rules.d/40-disable-wakeup-triggers.rules` and disable them like this. Replace the idVendor and idProduct values accordingly:
```
ACTION=="add|change", SUBSYSTEM=="usb", DRIVERS=="usb", ATTRS{idVendor}=="046d", ATTRS{idProduct}=="c548", ATTR{power/wakeup}="disabled"
ACTION=="add|change", SUBSYSTEM=="usb", DRIVERS=="usb", ATTRS{idVendor}=="1d6b", ATTRS{idProduct}=="0002", ATTR{power/wakeup}="disabled"
ACTION=="add|change", SUBSYSTEM=="usb", DRIVERS=="usb", ATTRS{idVendor}=="0c45", ATTRS{idProduct}=="800a", ATTR{power/wakeup}="disabled"
ACTION=="add|change", SUBSYSTEM=="usb", DRIVERS=="usb", ATTRS{idVendor}=="26ce", ATTRS{idProduct}=="01a2", ATTR{power/wakeup}="disabled"
ACTION=="add|change", SUBSYSTEM=="usb", DRIVERS=="usb", ATTRS{idVendor}=="8087", ATTRS{idProduct}=="0033", ATTR{power/wakeup}="disabled"
ACTION=="add|change", SUBSYSTEM=="usb", DRIVERS=="usb", ATTRS{idVendor}=="1d6b", ATTRS{idProduct}=="0003", ATTR{power/wakeup}="disabled"
```

References:
- https://askubuntu.com/a/877801
- https://unix.stackexchange.com/a/532839