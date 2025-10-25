---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: Benchmarking SSDs on Linux with Fio and fio-cdm
slug: benchmarking-ssds-linux-fio-fio-cdm
featured: false
draft: false
tags:
  - linux
  - benchmarking
  - tools
description: Learn how to benchmark SSDs on Linux using Fio and its Python wrapper fio-cdm, a powerful alternative to CrystalDiskMark.
---

One of the most popular SSD benchmarking tools available today is [CrystalMark](https://crystalmark.info/en/software/crystaldiskmark/) for Windows. Unfortunately no such program exists for Linux. Instead, Linux has a more powerful alternative called [Fio](https://github.com/axboe/fio) but is complicated to run if you just want a quick benchmark.

Luckily, a Python wrapper for Fio exists called [fio-cdm](https://github.com/xlucn/fio-cdm) which outputs the same metrics that CrystalMark produces. What's better, the program requires no python dependencies.

```bash
apt-get install -y fio
git clone git@github.com:xlucn/fio-cdm.git
cd fio-cdm
python3 ./fio-cdm .
```

![fio-cdm-screenshot screenshot](/fio-cdm-screenshot.png)

- Fio: https://github.com/axboe/fio
- fio-cdm: https://github.com/xlucn/fio-cdm
- CrystalMark: https://crystalmark.info/en/software/crystaldiskmark
