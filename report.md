# Runner benchmark report

Benchmark version 5. 84 samples from 2 workflow run(s). Benchmark values are medians across samples, with the lowest to highest sample in brackets; the best median in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | - | 4 | 14.7 | 155 | vm-other | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | Ampere-1a | 4 | 11.7 | 133 | – | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| depot | `depot-ubuntu-24.04-arm-4` | Neoverse-V2 | 4 | 15.6 | 156 | qemu | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | Neoverse-V1<br>Neoverse-V2 | 4 | 15.3 | 190 | – | Stockholm, SE | AS16509 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | Moses Lake, US | AS8075 Microsoft Corporation | 3 |
| ubicloud | `ubicloud-standard-4-arm` | Neoverse-N1 | 4 | 11.6 | 155 | – | Falkenstein, DE | AS24940 Hetzner Online GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | Neoverse-V2 | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| avrea | `avrea-macos-26-8-vcpu` | Apple M5 Max (Virtual) | 8 | 24.0 | 361 | apple | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-6vcpu-macos-26` | Apple M5 Max (Virtual) | 6 | 24.0 | 438 | apple | San Jose, US | AS402960 MACWEB | 3 |
| depot | `depot-macos-26` | Apple M4 (Virtual) | 8 | 20.0 | 424 | apple | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `macos-26` | Apple M1 (Virtual) | 3 | 7.0 | 343 | apple | San Jose, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-macos` | Apple M6 (Virtual) | 12 | 12.0 | 139 | apple | Martinez, US | AS7922 Comcast Cable Communications, LLC | 3 |
| luxor | `luxor-macos-26-small` | Apple M4 Pro (Virtual) | 4 | 8.0 | 449 | apple | Seattle, US | AS19538 Luxor | 3 |
| warpbuild | `warp-macos-26-arm64-6x` | Apple M5 Pro (Virtual) | 6 | 22.0 | 424 | apple | Las Vegas, US | AS395337 MacStadium, Inc. | 3 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.4 | 161 | kvm | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| boat | `boat` | AMD EPYC | 4 | 7.8 | 84 | kvm | Gravelines, FR | AS16276 OVH SAS | 3 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| celesto | `celesto-large` | Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz | 4 | 15.6 | 63 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD Ryzen 9 9950X | 4 | 15.6 | 169 | kvm | Solihull, GB | AS212027 PebbleHost Ltd | 3 |
| depot | `depot-ubuntu-24.04-4` | AMD EPYC 9R45 96-Core Processor | 4 | 15.6 | 156 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor<br>Intel(R) Xeon(R) 6975P-C<br>Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz | 4 | 15.6 | 155 | microsoft | Phoenix, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-4vcpu` | AMD EPYC | 4 | 15.6 | 63 | kvm | Warrenton, US | AS16276 OVH SAS | 3 |
| homemade | `homemade-small` | AMD EPYC | 4 | 7.8 | 32 | kvm | Gravelines, FR | AS16276 OVH SAS | 3 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 3 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | AMD EPYC | 4 | 7.8 | 68 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| ubicloud | `ubicloud-standard-4` | AMD Ryzen 9 7950X3D 16-Core Processor | 4 | 15.6 | 155 | kvm | Falkenstein, DE | AS24940 Hetzner Online GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 3 |

## Benchmarks

| Provider | Label | Queue (s) | Package install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | fsync writes (/s) | Download (MB/s) | Cache save 1 GB (s) | Cache restore 1 GB (s) | Docker build, no cache (s) | Docker build, cached (s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | 14.0 (13.0 to 15.0) | 4.0 (3.9 to 4.1) | **13,494 (13,484 to 13,522)** | **50,072 (49,003 to 50,179)** | **54,601 (54,599 to 54,615)** | **32,043 (31,435 to 33,516)** | **26,871 (25,775 to 26,918)** | 99,126 (85,697 to 100,594) | 111,889 (111,776 to 111,914) | 4,136 (3,976 to 4,237) | 327 (301 to 333) | 3.2 (2.9 to 3.2) | 2.5 (2.3 to 2.7) | 8.8 (8.8 to 10.7) | 5.0 (5.0 to 5.1) | 19.2 (19.1 to 19.2) | $0.0080 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | 10.0 (10.0 to 11.0) | 13.8 (10.8 to 14.1) | 931 (930 to 932) | 3,658 (3,658 to 3,669) | 26,337 (26,294 to 26,367) | 1,746 (1,600 to 1,835) | 893 (765 to 1,031) | 247,450 (243,199 to 248,463) | 96,651 (96,278 to 100,106) | 11,784 (11,643 to 12,128) | 299 (212 to 314) | 4.6 (4.3 to 4.8) | 4.9 (4.4 to 5.1) | 14.0 (13.5 to 16.2) | 7.3 (7.0 to 7.4) | 49.6 (48.6 to 49.9) | $0.0050 |
| depot | `depot-ubuntu-24.04-arm-4` | **1.0 (1.0 to 2.0)** | 4.8 (4.6 to 5.2) | 3,333 (3,284 to 3,343) | 13,159 (13,139 to 13,164) | 26,454 (26,311 to 26,682) | 8,192 (7,499 to 8,222) | 11,752 (11,544 to 11,942) | 306,224 (292,660 to 306,486) | 305,571 (291,572 to 308,505) | 73,119 (72,476 to 73,519) | 490 (477 to 501) | 3.9 (3.3 to 3.9) | 2.6 (2.6 to 2.7) | 13.5 (13.0 to 13.6) | 5.9 (5.7 to 6.1) | 39.0 (38.5 to 39.1) | $0.0080 ($0.0078 to $0.0080)\* |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | 39.0 (39.0 to 43.0) | 16.2 (14.0 to 18.8) | 3,016 (3,014 to 3,332) | 11,992 (11,991 to 13,296) | 20,465 (20,427 to 26,417) | 315 (315 to 472) | 151 (151 to 226) | 69,697 (67,092 to 69,710) | 33,539 (33,539 to 33,545) | 8,262 (8,075 to 20,551) | 689 (224 to 737) | 9.2 (4.0 to 9.3) | 4.9 (4.0 to 5.0) | 9.3 (9.2 to 9.6) | 4.8 (4.8 to 5.1) | 54.0 (39.2 to 56.0) | $0.0022 |
| github | `ubuntu-24.04-arm` | 5.0 (5.0 to 6.0) | 17.1 (14.9 to 24.3) | 3,960 (3,955 to 3,960) | 15,746 (15,739 to 15,749) | 27,776 (27,663 to 27,894) | 414 (413 to 414) | 352 (321 to 353) | 19,555 (19,542 to 19,639) | 19,570 (19,555 to 19,599) | 3,767 (2,247 to 4,661) | 339 (235 to 418) | 5.3 (5.2 to 5.6) | 7.9 (7.3 to 9.4) | 21.8 (21.7 to 29.5) | 11.9 (11.5 to 14.3) | 45.1 (43.3 to 54.1) | $0.0080\* |
| ubicloud | `ubicloud-standard-4-arm` | 22.0 (20.0 to 26.0) | 21.0 (20.2 to 21.2) | 3,340 (3,335 to 3,341) | 13,260 (13,239 to 13,314) | 15,115 (15,098 to 15,153) | 1,035 (1,028 to 1,038) | 994 (986 to 1,000) | 99,644 (95,848 to 100,894) | 85,137 (84,164 to 88,165) | 3,965 (3,543 to 4,129) | 210 (169 to 214) | 10.9 (10.7 to 11.1) | 13.1 (12.5 to 13.5) | 37.3 (35.7 to 39.4) | 15.3 (15.3 to 15.5) | 64.9 (63.9 to 66.4) | $0.0050 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | 6.0 (6.0 to 20.0) | 23.4 (20.2 to 26.2) | 3,334 (3,323 to 3,335) | 13,267 (13,265 to 13,276) | 26,636 (26,412 to 26,646) | 315 (315 to 315) | 315 (315 to 315) | 4,197 (4,197 to 4,198) | 4,198 (4,198 to 4,198) | 537 (518 to 538) | 681 (646 to 748) | 3.5 (3.2 to 3.9) | 4.7 (4.2 to 6.3) | 17.3 (17.1 to 19.0) | 9.3 (9.2 to 9.3) | 42.9 (41.4 to 43.3) | $0.0060 |
| avrea | `avrea-macos-26-8-vcpu` | 26.0 (25.0 to 36.0) | 4.0 (4.0 to 4.1) | – | – | 34,384 (34,082 to 34,415) | 17,862 (17,807 to 18,043) | 17,914 (17,805 to 17,948) | 102,157 (101,955 to 102,991) | 62,841 (62,297 to 63,234) | – | 407 (221 to 416) | 3.4 (3.2 to 3.5) | 2.8 (2.7 to 2.8) | – | – | 13.5 (13.5 to 13.6) | $0.0187 |
| blacksmith | `blacksmith-6vcpu-macos-26` | 22.0 (20.0 to 26.0) | 2.8 (2.6 to 2.9) | – | – | 31,646 (30,297 to 32,228) | 12,875 (12,095 to 13,028) | 4,491 (2,620 to 12,335) | 49,831 (48,032 to 60,578) | 25,721 (25,467 to 26,304) | – | 178 (143 to 213) | 2.6 (2.6 to 3.0) | 3.8 (3.6 to 4.0) | – | – | 15.0 (13.9 to 16.6) | $0.0800 |
| depot | `depot-macos-26` | 6.0 | 4.8 (4.7 to 4.9) | – | – | 33,675 (33,374 to 33,709) | 2,582 (2,580 to 2,589) | 1,314 (1,293 to 1,321) | 44,972 (44,374 to 45,048) | 21,728 (21,719 to 22,024) | – | 526 (507 to 536) | 3.8 (3.7 to 3.9) | 3.2 (3.1 to 3.3) | – | – | 15.4 (14.9 to 15.6) | $0.0213 ($0.0200 to $0.0213)\* |
| github | `macos-26` | 4.0 | 7.6 (7.5 to 8.5) | – | – | 21,817 (20,968 to 23,734) | 9,451 (8,554 to 11,019) | 7,326 (6,414 to 10,018) | 48,561 (39,773 to 58,068) | 25,076 (19,023 to 26,067) | – | 210 (171 to 249) | 12.6 (11.4 to 13.9) | 20.7 (14.9 to 20.8) | – | – | 32.2 (28.1 to 33.5) | $0.0620 |
| groundbox | `groundbox-macos` | 21.0 (20.0 to 198) | 5.6 (5.5 to 5.6) | – | – | 36,261 (36,249 to 36,299) | 14,671 (14,381 to 15,019) | 12,686 (12,261 to 13,777) | 113,257 (112,879 to 114,100) | 60,213 (50,943 to 61,572) | – | 36.1 (32.8 to 62.7) | **1.3 (1.3 to 1.4)** | – | – | – | **12.1 (12.0 to 12.3)** | $0.0108 ($0.0100 to $0.0108) |
| luxor | `luxor-macos-26-small` | 28.0 (27.0 to 30.0) | 5.5 (5.3 to 5.6) | – | – | 30,354 (30,321 to 33,799) | 13,646 (12,779 to 16,989) | 11,515 (10,795 to 14,684) | 97,272 (96,487 to 133,409) | 58,829 (57,674 to 77,134) | – | 252 (95.8 to 292) | 3.8 (3.8 to 4.1) | 2.8 (2.5 to 3.0) | – | – | 21.1 (18.2 to 21.6) | $0.0293 ($0.0253 to $0.0293) |
| warpbuild | `warp-macos-26-arm64-6x` | 27.0 | 4.1 (4.1 to 4.2) | – | – | 32,777 (32,677 to 33,066) | 8,070 (7,894 to 8,184) | 7,423 (6,622 to 8,663) | 16,240 (16,036 to 16,288) | 9,023 (8,771 to 9,054) | – | 218 (196 to 270) | 4.7 (4.3 to 5.3) | 26.6 (25.3 to 28.1) | – | – | 14.2 (14.1 to 14.4) | $0.0800 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 8.0 (8.0 to 9.0) | 3.2 (2.9 to 3.3) | 6,757 (6,718 to 6,764) | 26,913 (26,865 to 26,914) | 42,267 (42,257 to 42,281) | 18,264 (15,837 to 19,055) | 10,367 (10,188 to 10,994) | 80,800 (80,456 to 213,814) | 183,136 (95,240 to 197,068) | 27,973 (25,883 to 29,707) | 570 (518 to 609) | 8.0 (7.9 to 8.4) | 2.8 (2.4 to 2.9) | 10.6 (10.5 to 10.8) | 4.8 (4.7 to 4.9) | 22.4 (22.3 to 22.5) | $0.0031 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 7.0 (7.0 to 8.0) | 30.7 (11.6 to 37.6) | 6,639 (6,500 to 6,760) | 26,299 (25,071 to 26,377) | 41,155 (39,115 to 41,190) | 6,730 (6,548 to 12,774) | 1,963 (1,445 to 2,219) | 774,092 (745,618 to 816,420) | 396,957 (387,566 to 507,320) | 53,546 (45,874 to 59,848) | 468 (443 to 482) | 2.2 (2.1 to 2.2) | 2.1 (2.0 to 2.2) | 6.9 (6.6 to 7.3) | **3.5 (3.3 to 3.7)** | 25.3 (23.4 to 26.5) | $0.0080 |
| boat | `boat` | 70.0 (69.0 to 75.0) | 14.1 (8.9 to 32.0) | 5,847 (5,379 to 6,167) | 21,676 (21,031 to 24,453) | 33,020 (32,873 to 36,252) | 1,543 (658 to 1,568) | 632 (375 to 850) | 12,211 (6,385 to 13,961) | 34,126 (8,502 to 38,930) | 2,513 (135 to 3,282) | 108 (50.1 to 457) | 27.9 (19.5 to 47.9) | 27.8 (19.1 to 34.6) | 28.3 (28.0 to 31.4) | – | 31.6 (28.2 to 62.8) | $0.0003 ($0.0003 to $0.0006)\* |
| buildkite | `buildkite-linux-amd64-4x16` | 5.1 (4.7 to 5.2) | 5.5 (4.7 to 5.6) | 6,886 (6,753 to 6,944) | 27,234 (25,309 to 27,452) | 42,403 (40,747 to 42,656) | 5,884 (4,235 to 6,069) | 4,340 (2,894 to 4,520) | 634,128 (633,746 to 643,183) | 516,650 (364,324 to 542,609) | 67,053 (52,382 to 67,576) | **904 (829 to 990)** | – | – | – | – | 21.9 (21.9 to 25.0) | $0.0059 ($0.0059 to $0.0067)\* |
| celesto | `celesto-large` | 25.0 (20.0 to 25.0) | 7.0 (6.9 to 10.1) | 2,976 (2,974 to 2,982) | 11,826 (11,796 to 11,846) | 25,574 (25,493 to 25,596) | 5,622 (4,256 to 5,931) | 6,114 (5,094 to 6,334) | 355,966 (305,973 to 370,475) | 273,714 (233,283 to 288,862) | 48,438 (34,597 to 50,277) | 704 (684 to 721) | 5.4 (5.2 to 5.8) | 3.4 (2.9 to 3.7) | 41.9 (32.3 to 43.2) | 10.0 (9.5 to 10.2) | 43.6 (43.5 to 43.9) | **$0.0010** |
| checklane | `checklane-4vcpu-ubuntu-2404` | 6.0 | **2.7 (2.6 to 4.6)** | 6,993 (6,964 to 6,994) | 27,337 (27,193 to 27,789) | 43,650 (42,643 to 43,650) | 31,345 (30,850 to 31,931) | 18,159 (17,146 to 18,931) | **1,083,108 (1,062,706 to 1,091,424)** | **749,163 (747,682 to 763,083)** | **139,828 (110,636 to 152,211)** | 108 (105 to 375) | 2.2 (2.2 to 2.4) | 1.9 (1.9 to 2.1) | 8.8 (8.8 to 8.9) | 5.3 (4.1 to 6.0) | 22.9 (22.6 to 23.0) | $0.0015 |
| depot | `depot-ubuntu-24.04-4` | 2.0 (1.0 to 12.0) | 3.3 (3.0 to 5.1) | 5,571 (4,884 to 5,594) | 21,703 (18,650 to 21,970) | 34,498 (29,247 to 34,645) | 9,776 (9,096 to 10,748) | 13,730 (12,107 to 15,260) | 427,391 (311,810 to 473,868) | 417,780 (268,739 to 439,832) | 69,200 (51,285 to 82,282) | 595 (476 to 713) | 3.9 (3.3 to 4.1) | 2.3 (2.3 to 2.4) | 10.7 (9.7 to 11.3) | 5.0 (4.9 to 5.0) | 26.3 (25.5 to 30.0) | $0.0054 ($0.0052 to $0.0062)\* |
| github | `ubuntu-24.04` | 3.0 | 12.6 (11.9 to 24.2) | 3,311 (2,979 to 3,678) | 6,950 (6,211 to 8,213) | 27,300 (25,575 to 40,989) | 414 (414 to 472) | 414 (226 to 414) | 19,592 (19,579 to 68,882) | 19,573 (19,572 to 33,546) | 3,951 (3,523 to 6,126) | 554 (200 to 638) | 4.5 (4.4 to 4.6) | 6.2 (4.5 to 8.8) | 24.4 (15.5 to 29.6) | 13.9 (13.6 to 13.9) | 66.7 (56.9 to 67.8) | $0.0240 ($0.0120 to $0.0240)\* |
| groundbox | `groundbox-4vcpu` | 5.0 (5.0 to 6.0) | 3.1 (2.8 to 3.6) | 6,889 (6,662 to 6,896) | 26,217 (26,174 to 26,263) | 42,057 (41,523 to 42,083) | 2,180 (1,731 to 5,059) | 1,898 (1,862 to 2,846) | 354,939 (325,023 to 362,484) | 359,945 (348,776 to 362,063) | 52,118 (51,404 to 59,302) | 56.0 (55.0 to 112) | 2.1 (1.8 to 2.7) | 1.5 (1.3 to 2.4) | **6.4 (5.5 to 7.3)** | – | 27.6 (24.2 to 27.9) | $0.0028 ($0.0025 to $0.0028) |
| homemade | `homemade-small` | 6.0 | 13.4 (8.7 to 15.3) | 5,413 (5,392 to 5,506) | 20,600 (20,478 to 21,314) | 38,075 (37,866 to 38,381) | 5,560 (4,589 to 6,685) | 1,207 (1,189 to 1,357) | 279,048 (265,003 to 292,796) | 178,532 (166,666 to 237,437) | 29,679 (26,530 to 33,129) | 43.7 (43.0 to 51.4) | 5.4 (4.4 to 5.5) | 3.6 (3.0 to 3.9) | 16.0 (14.6 to 17.3) | 10.4 | 32.9 (29.8 to 33.0) | $0.0003 ($0.0003 to $0.0003)\* |
| luxor | `luxor-ubuntu-medium-4c-8g` | 9.0 (7.0 to 9.0) | 5.0 (5.0 to 5.1) | 6,876 (6,870 to 6,979) | 26,772 (26,743 to 27,159) | 42,663 (42,580 to 43,213) | 17,547 (17,056 to 19,457) | 14,139 (9,404 to 15,255) | 99,353 (81,196 to 126,150) | 127,463 (124,169 to 131,011) | 25,669 (23,708 to 26,710) | 115 (96.0 to 616) | 4.0 (3.9 to 4.4) | **1.5 (1.4 to 1.5)** | 10.7 (10.6 to 10.7) | 5.1 (5.0 to 5.1) | 23.6 (23.3 to 23.8) | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 7.0 (6.0 to 7.0) | 3.4 (3.4 to 5.2) | 6,749 (6,741 to 6,863) | 25,230 (25,149 to 27,067) | 40,996 (40,701 to 42,307) | 4,366 (4,233 to 5,924) | 2,580 (2,380 to 4,436) | 662,024 (642,840 to 684,483) | 392,385 (377,979 to 518,156) | 56,677 (54,249 to 70,029) | 806 (691 to 924) | 3.3 (2.9 to 3.5) | 4.0 (3.6 to 4.5) | 9.6 (9.6 to 9.7) | 5.6 (5.5 to 6.5) | 25.8 (22.8 to 25.8) | $0.0040 |
| ubicloud | `ubicloud-standard-4` | 16.0 | 10.8 (8.4 to 11.1) | 5,855 (5,815 to 5,960) | 12,328 (12,327 to 12,558) | 41,536 (37,035 to 41,615) | 2,765 (2,520 to 3,296) | 1,214 (1,046 to 1,260) | 159,230 (157,819 to 160,755) | 123,405 (102,676 to 130,419) | 3,921 (2,282 to 5,266) | 205 (107 to 355) | 10.5 (9.3 to 10.6) | 14.8 (12.0 to 16.3) | 27.9 (26.4 to 28.6) | 10.1 (8.4 to 10.9) | 40.6 (38.3 to 43.8) | $0.0040 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 8.0 (8.0 to 9.0) | 8.3 (7.5 to 8.7) | 6,115 (5,946 to 6,201) | 12,749 (12,499 to 12,937) | 38,062 (37,340 to 38,274) | 3,966 (3,705 to 4,790) | 2,728 (2,484 to 3,638) | 27,665 (22,888 to 48,308) | 20,348 (17,502 to 34,939) | 1,955 (1,899 to 2,093) | 552 (472 to 583) | 4.8 (4.7 to 5.6) | 6.3 (5.9 to 7.0) | 20.5 (17.0 to 20.8) | 8.9 (7.5 to 11.4) | 38.5 (35.1 to 39.9) | $0.0080 |

\* Not plain pay-as-you-go, so the cost above leaves out:

- `depot-ubuntu-24.04-arm-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04-arm`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
- `depot-macos-26`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `boat`: Needs a plan from $20 a month, which comes back as VM time. Job starts above the plan's included number cost $0.03-0.07 each.
- `buildkite-linux-amd64-4x16`: 4 vCPU hosted agents need the Pro plan, $30 per active user a month.
- `depot-ubuntu-24.04-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
- `homemade-small`: Pro is $20 a month and includes $20 of running time. Hobby is free with lower limits.

## Errors

- `depot-ubuntu-24.04-4` docker: the cached build didn't reuse the npm ci layer
- `groundbox-4vcpu` docker: the cold build job didn't finish
- `groundbox-4vcpu` docker: the cached build didn't reuse the npm ci layer
- `groundbox-4vcpu` docker: the cached build didn't reuse the npm ci layer
- `boat` docker: the cached build didn't reuse the npm ci layer
- `boat` docker: the cached build didn't reuse the npm ci layer
- `boat` docker: the cached build didn't reuse the npm ci layer
- `homemade-small` docker: the cached build didn't reuse the npm ci layer
- `homemade-small` docker: the cached build didn't reuse the npm ci layer
- `groundbox-macos` cache: cache-hit='', restored 0 bytes
- `groundbox-macos` cache: cache-hit='', restored 0 bytes
- `groundbox-macos` cache: cache-hit='', restored 0 bytes
