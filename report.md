# Runner benchmark report

Benchmark version 3. 81 samples from 3 workflow run(s). Benchmark values are medians across samples, with the lowest to highest sample in brackets; the best median in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | - | 4 | 14.7 | 155 | vm-other | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | Ampere-1a | 4 | 11.7 | 133 | – | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| depot | `depot-ubuntu-24.04-arm-4` | Neoverse-V2 | 4 | 15.6 | 156 | qemu | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | Neoverse-V2 | 4 | 15.3 | 190 | – | Stockholm, SE | AS16509 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | Moses Lake, US | AS8075 Microsoft Corporation | 3 |
| ubicloud | `ubicloud-standard-4-arm` | Neoverse-N1 | 4 | 11.6 | 155 | – | Frankfurt am Main, DE | AS28753 Leaseweb Deutschland GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | Neoverse-V2 | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| avrea | `avrea-macos-26-8-vcpu` | Apple M5 Max (Virtual) | 8 | 24.0 | 361 | apple | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-6vcpu-macos-26` | Apple M5 Max (Virtual) | 6 | 24.0 | 439 | apple | San Jose, US | AS402960 MACWEB | 3 |
| depot | `depot-macos-26` | Apple M4 (Virtual) | 9 | 17.0 | 424 | apple | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `macos-26` | Apple M1 (Virtual) | 3 | 7.0 | 343 | apple | San Antonio, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-macos` | Apple M6 (Virtual) | 12 | 12.0 | 139 | apple | Martinez, US | AS7922 Comcast Cable Communications, LLC | 3 |
| luxor | `luxor-macos-26-small` | Apple M4 Pro (Virtual) | 4 | 8.0 | 449 | apple | Seattle, US | AS19538 Luxor | 3 |
| warpbuild | `warp-macos-26-arm64-6x` | Apple M5 Pro (Virtual) | 6 | 22.0 | 424 | apple | Las Vegas, US | AS395337 MacStadium, Inc. | 3 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.4 | 161 | kvm | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| boat | `boat` | AMD EPYC 4585PX 16-Core Processor | 4 | 7.8 | 84 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| celesto | `celesto-large` | AMD EPYC-Milan Processor | 4 | 15.6 | 63 | kvm | Ashburn, US | AS16276 OVH SAS | 3 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 3 |
| depot | `depot-ubuntu-24.04-4` | AMD EPYC 9R45 96-Core Processor | 4 | 15.6 | 156 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor<br>AMD EPYC 9V74 80-Core Processor<br>Intel(R) Xeon(R) 6973P-C | 4 | 15.6 | 155 | microsoft | Dulles Town Center, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-4vcpu` | AMD EPYC | 4 | 15.6 | 63 | kvm | Warrenton, US | AS16276 OVH SAS | 3 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 3 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | AMD EPYC | 4 | 7.8 | 68 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| ubicloud | `ubicloud-standard-4` | AMD Ryzen 9 7950X3D 16-Core Processor | 4 | 15.6 | 155 | kvm | Falkenstein, DE | AS24940 Hetzner Online GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 3 |

## Benchmarks

| Provider | Label | Queue (s) | Package install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Cache save 1 GB (s) | Cache restore 1 GB (s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | 15.0 (15.0 to 16.0) | 6.9 (6.7 to 7.4) | **13,307 (13,277 to 13,453)** | **49,680 (49,653 to 50,284)** | **54,716 (54,451 to 54,823)** | 32,302 (32,063 to 32,399) | **26,391 (21,702 to 27,497)** | 93,744 (84,988 to 105,486) | 112,663 (111,189 to 113,082) | 245 (215 to 249) | 3.3 (2.9 to 3.3) | 2.4 (2.3 to 2.4) | 19.2 (19.1 to 19.2) | $0.0080 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | 11.0 (10.0 to 12.0) | 12.3 (11.8 to 12.9) | 930 (929 to 931) | 3,672 (3,644 to 3,673) | 26,294 (26,290 to 26,353) | 1,533 (1,374 to 1,801) | 883 (818 to 1,025) | 209,376 (189,981 to 233,850) | 96,256 (84,991 to 97,147) | 169 (109 to 169) | 5.0 (3.8 to 6.2) | 4.7 (4.6 to 5.2) | 54.3 (50.5 to 55.3) | $0.0050 |
| depot | `depot-ubuntu-24.04-arm-4` | **2.0 (1.0 to 2.0)** | 4.9 (4.9 to 5.3) | 3,338 (3,332 to 3,352) | 12,198 (11,731 to 13,189) | 26,506 (25,947 to 26,652) | 6,848 (6,664 to 8,403) | 9,880 (9,195 to 11,613) | 259,974 (241,970 to 290,660) | 277,804 (276,005 to 290,561) | 283 (251 to 302) | 4.9 (4.8 to 4.9) | 3.2 (3.2 to 3.3) | 40.7 (39.4 to 41.1) | $0.0082 ($0.0080 to $0.0084)\* |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | 33.0 (12.0 to 34.0) | 12.4 (10.5 to 15.9) | 3,334 (3,332 to 3,335) | 13,302 (13,267 to 13,302) | 26,628 (26,411 to 26,643) | 472 (472 to 472) | 226 (226 to 226) | 67,092 (67,092 to 67,092) | 33,545 (33,545 to 33,545) | 259 (232 to 275) | 5.5 (5.3 to 5.8) | 4.0 (3.9 to 4.0) | 40.7 (40.1 to 40.9) | $0.0022 |
| github | `ubuntu-24.04-arm` | 6.0 | 17.5 (13.2 to 23.3) | 3,960 (3,959 to 3,962) | 15,759 (15,757 to 15,773) | 27,787 (27,781 to 27,860) | 414 (413 to 414) | 352 (352 to 352) | 19,595 (19,576 to 19,606) | 19,585 (19,559 to 19,587) | 155 (100.0 to 295) | 5.5 (4.5 to 5.8) | 7.2 (5.3 to 10.2) | 45.8 (43.1 to 46.1) | $0.0080\* |
| ubicloud | `ubicloud-standard-4-arm` | 24.0 (20.0 to 27.0) | 31.3 (27.6 to 32.1) | 3,344 (3,341 to 3,350) | 13,151 (13,065 to 13,311) | 15,153 (15,130 to 15,154) | 967 (954 to 1,012) | 930 (903 to 974) | 91,678 (87,972 to 102,535) | 94,128 (82,126 to 94,162) | 252 (223 to 300) | 14.3 (12.6 to 14.7) | 14.3 (14.0 to 14.7) | 68.3 (67.3 to 75.0) | $0.0050 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | 7.0 (6.0 to 21.0) | 22.6 (20.2 to 25.7) | 3,332 (3,330 to 3,334) | 13,268 (13,266 to 13,276) | 26,513 (26,349 to 26,640) | 315 (315 to 315) | 315 (315 to 315) | 4,198 (4,196 to 4,198) | 4,198 | 193 (137 to 296) | 4.1 (3.9 to 4.4) | 5.2 (5.2 to 5.6) | 42.0 (41.3 to 43.8) | $0.0060 |
| avrea | `avrea-macos-26-8-vcpu` | 26.0 (25.0 to 27.0) | 4.1 (4.0 to 4.5) | – | – | 34,402 (34,182 to 34,407) | 17,783 (17,378 to 18,393) | 14,532 (14,461 to 14,617) | 103,018 (102,048 to 103,082) | 50,935 (46,085 to 60,150) | 274 (203 to 281) | 3.0 (2.9 to 3.2) | 2.8 (2.8 to 2.8) | 13.9 (13.9 to 13.9) | $0.0187 |
| blacksmith | `blacksmith-6vcpu-macos-26` | 24.0 (22.0 to 37.0) | **2.9 (2.6 to 3.3)** | – | – | 30,029 (27,239 to 31,882) | 12,699 (12,160 to 12,905) | 11,148 (8,240 to 12,796) | 50,243 (49,449 to 59,797) | 23,255 (23,122 to 23,802) | 187 (166 to 201) | 2.7 (2.6 to 2.8) | 3.9 (3.6 to 5.0) | 19.2 (16.1 to 22.3) | $0.0800 |
| depot | `depot-macos-26` | 53.0 (18.0 to 70.0) | 23.2 (20.5 to 23.6) | – | – | 33,696 (33,692 to 33,722) | 4,964 (4,883 to 5,225) | 745 (198 to 1,220) | 41,844 (41,074 to 42,016) | 24,160 (20,451 to 24,276) | 125 (41.4 to 225) | 13.3 (13.0 to 15.6) | 5.1 (4.9 to 5.7) | 17.1 (16.5 to 20.5) | $0.0240 ($0.0227 to $0.0280)\* |
| github | `macos-26` | 304 (3.0 to 304) | 10.7 (10.6 to 11.9) | – | – | 15,734 (11,479 to 16,775) | 5,857 (5,812 to 7,072) | 4,892 (4,291 to 6,091) | 31,842 (28,839 to 32,647) | 16,755 (16,422 to 17,018) | 115 (91.8 to 123) | 13.5 (11.6 to 25.2) | 14.7 (11.9 to 34.1) | 42.7 (41.7 to 46.1) | $0.0620 |
| groundbox | `groundbox-macos` | 21.0 (20.0 to 590) | 5.7 (5.6 to 5.9) | – | – | 35,231 (33,837 to 35,295) | 4,966 (4,956 to 5,250) | 5,170 (4,555 to 6,008) | 13,207 (13,194 to 13,466) | 8,305 (8,189 to 8,406) | 57.9 (53.4 to 64.1) | 366 (221 to 389) | 23.6 (22.0 to 26.5) | **13.2 (12.5 to 13.4)** | $0.0117 ($0.0108 to $0.0117) |
| luxor | `luxor-macos-26-small` | 27.0 (26.0 to 28.0) | 4.8 (4.3 to 4.9) | – | – | 29,771 (29,568 to 33,441) | 2,508 (2,225 to 5,021) | 2,850 (2,401 to 6,284) | 15,036 (14,560 to 16,053) | 6,424 (6,310 to 7,011) | 109 (37.7 to 257) | 7.4 (6.2 to 7.9) | 17.6 (12.9 to 20.7) | 19.9 (18.9 to 20.1) | $0.0267 ($0.0253 to $0.0280) |
| warpbuild | `warp-macos-26-arm64-6x` | 4.0 (4.0 to 5.0) | 5.1 (3.8 to 5.4) | – | – | 33,236 (30,493 to 33,782) | 7,532 (6,909 to 7,875) | 7,089 (5,203 to 7,936) | 12,694 (11,894 to 14,356) | 8,188 (7,988 to 8,683) | 180 (143 to 297) | 4.3 (3.6 to 4.6) | 16.0 (10.3 to 21.6) | 15.9 (14.5 to 16.9) | $0.0800 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 9.0 (9.0 to 10.0) | 7.3 (7.0 to 7.4) | 6,698 (6,669 to 6,720) | 26,802 (26,204 to 26,815) | 41,708 (41,473 to 42,266) | 16,581 (15,743 to 17,931) | 11,065 (11,047 to 11,623) | 158,900 (141,001 to 265,355) | 166,918 (152,193 to 187,578) | 150 (82.1 to 189) | 7.9 (7.9 to 8.3) | 2.4 (2.4 to 2.8) | 22.8 (22.6 to 24.0) | $0.0031 ($0.0031 to $0.0032) |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 8.0 (8.0 to 9.0) | 20.0 (15.6 to 22.6) | 6,655 (5,697 to 6,744) | 26,247 (22,401 to 26,308) | 40,480 (35,023 to 41,475) | 8,343 (7,587 to 10,244) | 1,992 (1,603 to 2,219) | 421,949 (324,585 to 813,742) | 323,395 (313,902 to 408,341) | 196 (158 to 260) | 2.3 (2.1 to 2.4) | 2.2 (2.2 to 2.5) | 26.4 (24.9 to 33.2) | $0.0080 |
| boat | `boat` | 7.0 | 4.6 (4.6 to 4.9) | 6,418 (6,289 to 6,642) | 25,393 (25,384 to 25,775) | 39,608 (39,155 to 40,271) | 25,375 (21,303 to 28,883) | 12,983 (6,668 to 14,456) | 750,691 (547,967 to 809,310) | 270,293 (251,363 to 395,798) | 245 (238 to 248) | 11.2 (9.1 to 38.8) | 10.3 (10.3 to 12.4) | 27.9 (26.4 to 58.2) | $0.0003 ($0.0003 to $0.0006)\* |
| buildkite | `buildkite-linux-amd64-4x16` | 4.8 (4.7 to 5.2) | 3.2 (3.2 to 4.8) | 6,879 (6,821 to 6,915) | 26,904 (26,171 to 27,247) | 42,142 (41,646 to 42,590) | 5,254 (5,081 to 5,939) | 3,620 (3,491 to 4,499) | 666,056 (615,639 to 711,655) | 502,009 (478,647 to 595,888) | **294 (232 to 304)** | – | – | 23.4 (21.9 to 23.6) | $0.0064 ($0.0059 to $0.0064)\* |
| celesto | `celesto-large` | 9.0 (9.0 to 10.0) | 5.5 (5.2 to 7.6) | 4,280 (4,259 to 4,327) | 16,972 (16,725 to 17,023) | 29,188 (26,786 to 29,198) | 15,891 (14,035 to 16,036) | 11,020 (8,444 to 12,905) | 60,997 (60,979 to 63,931) | 58,706 (46,422 to 61,749) | 210 (160 to 211) | 6.4 (6.3 to 6.4) | 4.5 (4.1 to 4.6) | 38.1 (37.0 to 43.9) | **$0.0009 ($0.0008 to $0.0010)** |
| checklane | `checklane-4vcpu-ubuntu-2404` | 7.0 | 3.4 (2.8 to 5.2) | 6,998 (6,993 to 7,028) | 27,690 (27,555 to 27,823) | 43,613 (42,275 to 43,670) | **35,776 (31,563 to 36,470)** | 15,982 (15,181 to 18,881) | **1,076,698 (1,063,679 to 1,080,465)** | **684,189 (683,686 to 721,783)** | 120 (81.3 to 137) | 2.4 (2.3 to 2.4) | 1.8 (1.8 to 1.9) | 22.7 (22.5 to 23.0) | $0.0015 ($0.0015 to $0.0016) |
| depot | `depot-ubuntu-24.04-4` | **2.0** | 3.8 (3.5 to 3.8) | 5,200 (5,181 to 5,205) | 19,965 (19,913 to 21,729) | 33,153 (32,033 to 34,486) | 7,255 (7,202 to 9,296) | 12,435 (11,282 to 20,086) | 315,016 (166,450 to 390,174) | 271,554 (192,437 to 376,083) | 255 (224 to 285) | 4.0 (3.9 to 4.3) | 2.9 (2.6 to 3.2) | 27.2 (25.7 to 28.7) | $0.0056 ($0.0052 to $0.0058)\* |
| github | `ubuntu-24.04` | 3.0 | 13.2 (12.7 to 15.7) | 3,677 (3,500 to 4,532) | 8,210 (7,359 to 9,531) | 32,222 (27,406 to 37,875) | 408 (405 to 414) | 231 (225 to 414) | 19,580 (19,540 to 19,584) | 19,567 (19,546 to 19,600) | 254 (80.9 to 256) | 4.6 (3.8 to 5.4) | 6.4 (6.1 to 6.6) | 50.3 (44.3 to 70.3) | $0.0120 ($0.0120 to $0.0240)\* |
| groundbox | `groundbox-4vcpu` | 6.0 | 3.3 (2.9 to 6.0) | 7,015 (6,916 to 7,020) | 27,347 (27,059 to 27,549) | 42,888 (42,378 to 42,891) | 1,019 (71.8 to 1,058) | 1,096 (67.2 to 1,722) | 199,775 (27,100 to 199,823) | 199,990 (15,990 to 199,993) | 102 (101 to 103) | **0.7 (0.6 to 1.7)** | **1.1** | 29.9 (24.1 to 30.2) | $0.0030 ($0.0025 to $0.0031) |
| luxor | `luxor-ubuntu-medium-4c-8g` | 9.0 (9.0 to 10.0) | 7.7 (5.3 to 10.5) | 6,915 (6,828 to 6,957) | 26,911 (26,679 to 27,065) | 42,658 (42,153 to 42,977) | 19,410 (17,512 to 23,654) | 15,845 (12,150 to 18,826) | 98,341 (93,011 to 109,482) | 125,225 (124,125 to 126,971) | 210 (166 to 373) | 3.8 (3.5 to 4.1) | 7.7 (5.0 to 10.1) | 23.6 (23.5 to 23.6) | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 7.0 (6.0 to 7.0) | 3.6 (3.4 to 3.7) | 6,879 (6,821 to 6,907) | 26,814 (26,070 to 27,023) | 42,155 (41,854 to 42,178) | 5,169 (5,113 to 6,151) | 3,388 (3,097 to 3,418) | 687,500 (658,912 to 703,405) | 526,727 (484,735 to 537,129) | 153 (6.5 to 301) | 3.3 (3.0 to 3.7) | 5.1 (4.5 to 5.7) | 23.9 (22.7 to 24.3) | $0.0040 |
| ubicloud | `ubicloud-standard-4` | 16.0 (7.0 to 17.0) | 9.7 (9.1 to 11.3) | 5,762 (5,720 to 5,775) | 12,153 (12,090 to 12,185) | 37,244 (36,133 to 39,366) | 3,210 (2,565 to 3,253) | 2,727 (1,130 to 2,763) | 155,234 (125,023 to 167,301) | 123,978 (109,978 to 146,565) | 187 (166 to 202) | 12.3 (11.5 to 13.0) | 13.6 (12.5 to 17.0) | 39.4 (38.3 to 42.1) | $0.0040 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 9.0 (8.0 to 9.0) | 7.2 (7.0 to 7.8) | 6,219 (6,028 to 6,486) | 12,551 (12,299 to 13,275) | 37,497 (37,280 to 38,346) | 3,668 (3,172 to 5,533) | 2,196 (2,152 to 2,905) | 77,092 (58,109 to 118,478) | 48,181 (21,065 to 79,818) | 52.1 (8.4 to 163) | 5.1 (4.7 to 5.2) | 5.7 (5.5 to 6.7) | 37.9 (36.6 to 38.4) | $0.0080 |

\* Not plain pay-as-you-go, so the cost above leaves out:

- `depot-ubuntu-24.04-arm-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04-arm`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
- `depot-macos-26`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `boat`: Needs a plan from $20 a month, which comes back as VM time. Job starts above the plan's included number cost $0.03-0.07 each.
- `buildkite-linux-amd64-4x16`: 4 vCPU hosted agents need the Pro plan, $30 per active user a month.
- `depot-ubuntu-24.04-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.

## Errors

- `groundbox-4vcpu` cache: cache-hit='', restored 0 bytes
- `groundbox-4vcpu` cache: cache-hit='', restored 0 bytes
- `nscloud-ubuntu-24.04-amd64-4x8` cache: cache-hit='', restored 0 bytes
- `warp-macos-26-arm64-6x` cache: cache-hit='', restored 0 bytes
