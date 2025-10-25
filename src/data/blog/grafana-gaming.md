---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: Monitoring Windows PCs with Nvidia GPU and Windows Exporters in Grafana  
slug: monitoring-windows-pc-grafana-exporters  
tags:  
  - grafana  
  - prometheus  
  - windows  
  - nvidia-gpu  
  - system-monitoring  
description: Learn how to monitor your Windows PC with Nvidia GPU and Windows Exporters, set them up as services, and integrate them with Prometheus and Grafana for efficient system monitoring.
---

I recently discovered 2 excellent exporters for Windows, which allow you to monitor your PC whenever it's turned on. This assumes your PC is running Windows and has a nvidia GPU. It assumes you already are running prometheus + grafana, or at least know how to set them up.

The 2 exporters are:

- [nvidia_gpu_exporter](https://github.com/utkuozdemir/nvidia_gpu_exporter)
- [windows_exporter](https://github.com/prometheus-community/windows_exporter)

## Setup Nvidia GPU Exporter

1. Download the latest nvidia_gpu_exporter binary and extract it: [nvidia_gpu_exporter/releases](https://github.com/utkuozdemir/nvidia_gpu_exporter/releases)
2. Additionally download [Non-Sucking-Service-Manager](https://nssm.cc/download) which we'll use to setup the exporter binary as a startup service.
3. Test the gpu exporter by opening `nvidia_gpu_exporter.exe`, it should show that it's listening on a port and serving the exporter. You can also check it out at `<your pc hostname>:9835/metrics`. If it's working, we're ready to convert it into a service.
4. After downloading `nssm`, navigate to the application folder using the command line and execute: `nssm.exe install nvidia_gpu_exporter`

For example:

```sh
C:\Users\oregonpillow\Downloads\nssm-2.24-103-gdee49fc\nssm-2.24-103-gdee49fc\win64>nssm.exe install nvidia_gpu_exporter
```

This will open the GUI, simply select the `nvidia_gpu_exporter.exe` in the Path option, and the Startup directory will be auto-filled. Select `Install service` and you're all set.

![nssm_service_install](/nssm_service_install.png)

Sample Promethesus config:

```yml
- job_name: nvidia_exporter
    honor_timestamps: true
    scrape_interval: 15s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    static_configs:
      - targets: ["<your PC hostname>:9835"]
```

5. Add the [dashboard.json](https://github.com/utkuozdemir/nvidia_gpu_exporter/tree/master/grafana) to your grafana instance.

![gpu_exporter_grafana](/gpu_exporter_grafana.png)

## Setup Windows Exporter

1. Download the latest windows exporter binary - make sure it's the `.msi` variant, as this will install it as a service: [windows_exporter/releases](https://github.com/prometheus-community/windows_exporter/releases/)

Sample prometheus config:

```yml
 job_name: windows_exporter
    honor_timestamps: true
    scrape_interval: 15s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    static_configs:
      - targets: ["<your PC hostname>:9182"]
```

2. Choose a Windows Exporter dashboard for grafana.
   Many exist for the windows_exporter, the one i'm currently using is here: [Grafana ID: 14499](https://grafana.com/grafana/dashboards/14499-windows-node/)

![windows_exporter_grafana](/windows_exporter_grafana.png)
