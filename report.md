# Runner benchmark report

Benchmark version 3. 81 samples from 1 workflow run(s). Benchmark values are medians across samples, with the lowest to highest sample in brackets; the best median in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | - | 4 | 14.7 | 155 | vm-other | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | Ampere-1a | 4 | 11.7 | 133 | – | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| depot | `depot-ubuntu-24.04-arm-4` | Neoverse-V2 | 4 | 15.6 | 156 | qemu | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | Neoverse-V2 | 4 | 15.3 | 190 | – | Stockholm, SE | AS16509 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | Cheyenne, US | AS8075 Microsoft Corporation | 3 |
| ubicloud | `ubicloud-standard-4-arm` | Neoverse-N1 | 4 | 11.6 | 155 | – | Falkenstein, DE | AS24940 Hetzner Online GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | Neoverse-V2 | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| avrea | `avrea-macos-26-8-vcpu` | Apple M5 Max (Virtual) | 8 | 24.0 | 361 | apple | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-6vcpu-macos-26` | Apple M5 Max (Virtual) | 6 | 24.0 | 438 | apple | San Jose, US | AS402960 MACWEB | 3 |
| depot | `depot-macos-26` | Apple M4 (Virtual) | 9 | 17.0 | 424 | apple | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `macos-26` | Apple M1 (Virtual) | 3 | 7.0 | 343 | apple | San Jose, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-macos` | Apple M6 (Virtual) | 12 | 12.0 | 139 | apple | Martinez, US | AS7922 Comcast Cable Communications, LLC | 3 |
| luxor | `luxor-macos-26-small` | Apple M4 Pro (Virtual) | 4 | 8.0 | 449 | apple | Seattle, US | AS19538 Luxor | 3 |
| warpbuild | `warp-macos-26-arm64-6x` | Apple M5 Pro (Virtual) | 6 | 22.0 | 424 | apple | Las Vegas, US | AS395337 MacStadium, Inc. | 3 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.4 | 161 | kvm | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| boat | `boat` | AMD EPYC 4585PX 16-Core Processor | 4 | 7.8 | 84 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| celesto | `celesto-large` | AMD EPYC-Milan Processor<br>Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz | 4 | 15.6 | 63 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 3 |
| depot | `depot-ubuntu-24.04-4` | AMD EPYC 9R45 96-Core Processor | 4 | 15.6 | 156 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor<br>Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Boardman, US | AS16509 Amazon.com, Inc. | 3 |
| groundbox | `groundbox-4vcpu` | AMD EPYC | 4 | 15.6 | 63 | kvm | Warrenton, US | AS16276 OVH SAS | 3 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 3 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | AMD EPYC | 4 | 7.8 | 68 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| ubicloud | `ubicloud-standard-4` | AMD Ryzen 9 7950X3D 16-Core Processor | 4 | 15.6 | 155 | kvm | Falkenstein, DE | AS24940 Hetzner Online GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 3 |

## Benchmarks

| Provider | Label | Queue (s) | Package install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Cache save 1 GB (s) | Cache restore 1 GB (s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | 14.0 | 6.8 (6.7 to 7.1) | **13,730 (13,488 to 13,770)** | **50,517 (50,310 to 50,532)** | **54,551 (53,720 to 54,735)** | **33,724 (33,583 to 33,819)** | **26,191 (22,048 to 27,550)** | 88,492 (85,876 to 90,120) | 114,243 (113,211 to 116,965) | 312 (281 to 325) | 3.0 (2.9 to 3.0) | 2.4 (2.3 to 2.5) | 19.3 (19.2 to 21.4) | $0.0080 ($0.0080 to $0.0088) |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | 10.0 | 11.7 (11.5 to 12.4) | 930 (927 to 931) | 3,664 (3,647 to 3,669) | 26,331 (26,158 to 26,373) | 1,614 (1,555 to 1,730) | 953 (848 to 969) | 234,940 (227,180 to 241,071) | 92,873 (86,974 to 95,403) | 143 (115 to 260) | 4.8 (4.2 to 4.8) | 5.5 (5.0 to 10.0) | 51.0 (50.0 to 52.6) | $0.0050 |
| depot | `depot-ubuntu-24.04-arm-4` | **1.0** | 4.8 (4.5 to 5.9) | 3,335 (3,330 to 3,336) | 13,159 (13,128 to 13,160) | 26,614 (26,497 to 26,638) | 8,896 (8,693 to 9,063) | 11,686 (11,494 to 11,894) | 304,372 (298,044 to 305,539) | 308,826 (300,619 to 311,815) | 308 (79.9 to 310) | 3.9 (3.6 to 4.1) | 3.2 (3.1 to 3.3) | 38.5 (38.0 to 39.4) | $0.0078 ($0.0076 to $0.0080)\* |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | 29.0 (12.0 to 34.0) | 11.1 (10.7 to 17.2) | 3,331 (3,329 to 3,332) | 13,295 (13,273 to 13,299) | 26,634 (26,622 to 26,637) | 472 (472 to 472) | 226 (226 to 226) | 67,092 (67,091 to 67,092) | 33,545 (33,545 to 33,545) | 280 (269 to 283) | 6.0 (5.9 to 6.0) | 4.2 (4.1 to 4.3) | 40.0 (39.6 to 40.2) | $0.0022 |
| github | `ubuntu-24.04-arm` | 5.0 | 19.9 (17.6 to 24.6) | 3,958 (3,954 to 3,960) | 15,744 (15,736 to 15,753) | 27,794 (27,704 to 27,807) | 414 (413 to 421) | 351 (320 to 352) | 19,603 (19,590 to 19,618) | 19,569 (19,556 to 19,570) | 131 (98.0 to 247) | 5.9 (5.6 to 6.5) | 6.8 (6.6 to 7.3) | 47.1 (45.3 to 53.1) | $0.0080\* |
| ubicloud | `ubicloud-standard-4-arm` | 20.0 (18.0 to 20.0) | 25.6 (23.2 to 28.6) | 3,341 (3,320 to 3,344) | 13,211 (13,203 to 13,321) | 15,133 (15,053 to 15,139) | 1,033 (962 to 1,067) | 981 (938 to 1,016) | 100,194 (100,043 to 101,902) | 89,514 (86,851 to 93,024) | 214 (205 to 216) | 11.1 (10.9 to 11.5) | 12.7 (11.0 to 16.0) | 65.6 (62.5 to 73.5) | $0.0050 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | 19.0 (19.0 to 20.0) | 20.3 (19.9 to 21.0) | 3,332 (3,332 to 3,333) | 13,263 (13,259 to 13,271) | 26,597 (26,537 to 26,653) | 315 (315 to 315) | 315 (315 to 315) | 4,197 (4,196 to 4,198) | 4,198 (4,198 to 4,198) | 171 (5.0 to 300) | 3.3 (3.1 to 4.3) | 3.8 (3.8 to 4.6) | 42.2 (41.3 to 43.1) | $0.0060 |
| avrea | `avrea-macos-26-8-vcpu` | 25.0 (23.0 to 26.0) | 4.3 (4.0 to 5.2) | – | – | 34,365 (34,328 to 34,376) | 17,879 (17,818 to 17,949) | 17,291 (17,269 to 17,512) | 101,771 (101,575 to 102,910) | 62,640 (62,588 to 63,332) | 286 (262 to 289) | 3.3 (3.2 to 3.4) | 3.0 (2.9 to 3.1) | 13.8 (13.6 to 13.9) | $0.0187 |
| blacksmith | `blacksmith-6vcpu-macos-26` | 31.0 (25.0 to 39.0) | **2.7 (2.6 to 3.3)** | – | – | 28,855 (28,643 to 32,272) | 12,780 (12,313 to 12,930) | 9,576 (8,181 to 12,480) | 50,358 (42,235 to 51,893) | 22,863 (21,318 to 23,992) | 205 (161 to 207) | 2.7 (2.6 to 2.8) | 4.2 (4.1 to 5.6) | 16.7 (14.5 to 21.7) | $0.0800 |
| depot | `depot-macos-26` | 4.0 (4.0 to 5.0) | 21.5 (21.1 to 30.4) | – | – | 33,710 (33,681 to 33,716) | 6,121 (5,135 to 6,140) | 1,389 (350 to 1,723) | 41,756 (41,526 to 41,986) | 24,196 (23,809 to 24,366) | 239 (79.2 to 264) | 6.3 (6.1 to 6.4) | 5.4 (5.3 to 7.1) | 16.8 (16.5 to 16.8) | $0.0227\* |
| github | `macos-26` | 3.0 | 10.4 (8.0 to 12.7) | – | – | 18,209 (16,135 to 22,208) | 7,817 (5,850 to 9,232) | 6,763 (5,762 to 7,712) | 47,908 (37,679 to 59,415) | 20,264 (14,642 to 23,883) | 108 (89.2 to 124) | 11.9 (11.1 to 24.1) | 17.7 (13.6 to 21.3) | 40.6 (33.4 to 50.7) | $0.0620 |
| groundbox | `groundbox-macos` | 26.0 (20.0 to 179) | 5.7 (5.2 to 5.7) | – | – | 36,173 (36,124 to 36,200) | 13,860 (13,783 to 13,903) | 12,041 (11,221 to 12,278) | 113,770 (112,283 to 114,214) | 59,121 (58,151 to 61,709) | 58.5 (57.8 to 60.8) | 2.6 (2.3 to 3.0) | **2.1 (1.9 to 2.5)** | **12.9 (12.7 to 14.3)** | $0.0108 ($0.0108 to $0.0125) |
| luxor | `luxor-macos-26-small` | 27.0 | 4.3 (4.3 to 4.7) | – | – | 31,441 (31,169 to 33,739) | 13,578 (12,798 to 17,034) | 11,995 (11,337 to 14,816) | 97,486 (95,799 to 133,776) | 58,862 (57,783 to 78,150) | 218 (209 to 319) | 6.6 (6.5 to 6.6) | 13.0 (12.8 to 16.3) | 19.8 (18.3 to 20.0) | $0.0267 ($0.0253 to $0.0280) |
| warpbuild | `warp-macos-26-arm64-6x` | 29.0 (27.0 to 30.0) | 4.5 (4.0 to 5.0) | – | – | 29,044 (28,516 to 33,286) | 7,117 (5,808 to 7,833) | 5,702 (5,373 to 8,813) | 11,216 (10,564 to 15,205) | 7,021 (6,334 to 9,032) | 195 (158 to 201) | 5.1 (4.1 to 6.5) | 25.8 (7.8 to 26.8) | 18.8 (13.9 to 20.2) | $0.0800 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 7.0 (6.0 to 7.0) | 6.9 (6.6 to 7.0) | 6,757 (6,754 to 6,758) | 26,872 (26,785 to 26,894) | 42,233 (42,003 to 42,254) | 17,988 (17,007 to 18,934) | 9,948 (9,944 to 10,247) | 176,864 (146,999 to 274,879) | 195,584 (141,296 to 224,645) | 223 (211 to 297) | 8.1 (8.0 to 8.2) | 2.7 (2.5 to 2.8) | 22.5 (22.5 to 22.7) | $0.0031 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 7.0 | 11.5 (11.3 to 18.4) | 6,484 (6,222 to 6,579) | 25,148 (24,420 to 25,252) | 39,811 (37,982 to 39,870) | 7,817 (4,893 to 8,799) | 1,992 (1,795 to 2,383) | 694,823 (691,595 to 804,964) | 430,506 (292,231 to 448,520) | 199 (111 to 213) | **2.3 (2.3 to 2.4)** | 2.2 (2.2 to 2.5) | 26.0 (25.8 to 26.1) | $0.0080 |
| boat | `boat` | 6.0 (6.0 to 7.0) | 6.7 (4.5 to 9.3) | 6,235 (6,161 to 6,367) | 23,822 (22,969 to 25,554) | 37,660 (34,032 to 38,964) | 12,092 (4,726 to 14,405) | 4,296 (2,764 to 10,726) | 571,515 (503,863 to 731,014) | 181,128 (140,103 to 560,238) | 199 (154 to 311) | 20.1 (19.4 to 32.3) | 12.6 (11.8 to 12.7) | 27.1 (24.1 to 29.3) | $0.0003 ($0.0003 to $0.0003)\* |
| buildkite | `buildkite-linux-amd64-4x16` | 5.6 (4.9 to 5.6) | 3.0 (2.9 to 3.5) | 6,879 (6,863 to 6,908) | 26,895 (26,853 to 26,963) | 42,295 (42,050 to 42,342) | 5,239 (5,233 to 5,925) | 3,815 (3,235 to 4,405) | 707,200 (643,146 to 727,534) | 494,202 (490,229 to 571,498) | 294 (153 to 387) | – | – | 23.4 (22.4 to 23.4) | $0.0064 ($0.0061 to $0.0064)\* |
| celesto | `celesto-large` | 10.0 (9.0 to 10.0) | 6.6 (4.6 to 6.8) | 2,969 (2,939 to 4,312) | 11,694 (11,500 to 17,019) | 24,534 (21,859 to 27,141) | 5,400 (5,023 to 15,894) | 5,582 (5,258 to 9,643) | 308,531 (66,788 to 344,834) | 250,536 (64,414 to 265,696) | 233 (219 to 255) | 6.1 (5.8 to 6.1) | 4.9 (4.2 to 5.5) | 47.2 (37.2 to 47.6) | **$0.0011 ($0.0008 to $0.0011)** |
| checklane | `checklane-4vcpu-ubuntu-2404` | 6.0 | 4.1 (3.5 to 5.5) | 6,616 (6,604 to 6,915) | 26,162 (25,943 to 27,006) | 41,074 (40,941 to 43,404) | 22,430 (20,511 to 25,614) | 13,615 (9,447 to 15,586) | **958,581 (671,954 to 973,117)** | **750,625 (607,707 to 810,279)** | 82.3 (79.3 to 158) | 2.7 (2.7 to 2.8) | 2.3 (2.3 to 2.4) | 23.7 (23.0 to 25.3) | $0.0016 ($0.0016 to $0.0017) |
| depot | `depot-ubuntu-24.04-4` | **1.0 (1.0 to 2.0)** | 3.2 (3.2 to 3.2) | 5,590 (5,558 to 5,597) | 21,780 (21,632 to 21,847) | 34,293 (34,243 to 34,370) | 10,419 (3,379 to 10,615) | 14,020 (13,304 to 17,674) | 471,942 (117,518 to 473,041) | 465,767 (270,787 to 479,708) | 120 (20.1 to 277) | 3.4 (3.4 to 3.5) | 2.5 (2.4 to 2.7) | 26.7 (26.5 to 27.4) | $0.0054 ($0.0054 to $0.0056)\* |
| github | `ubuntu-24.04` | 3.0 (2.0 to 3.0) | 27.2 (12.1 to 28.1) | 3,317 (3,316 to 3,675) | 6,986 (6,979 to 8,207) | 40,956 (27,372 to 41,097) | 472 (414 to 472) | 226 (226 to 414) | 69,054 (19,595 to 70,684) | 33,546 (19,589 to 33,546) | 176 (150 to 228) | 6.6 (4.1 to 8.0) | 14.6 (6.2 to 15.9) | 56.7 (54.9 to 66.3) | $0.0120 ($0.0120 to $0.0240)\* |
| groundbox | `groundbox-4vcpu` | 5.0 | 3.6 (2.7 to 3.7) | 6,903 (6,901 to 7,008) | 26,357 (26,318 to 27,613) | 42,116 (42,062 to 43,051) | 3,223 (2,748 to 5,637) | 1,649 (1,556 to 2,476) | 239,864 (231,998 to 370,363) | 366,102 (361,479 to 380,980) | 57.6 (48.1 to 90.8) | 2.7 (1.6 to 2.7) | 6.4 (1.1 to 6.4) | 26.9 (22.8 to 27.0) | $0.0027 ($0.0023 to $0.0028) |
| luxor | `luxor-ubuntu-medium-4c-8g` | 7.0 (7.0 to 9.0) | 5.3 (5.2 to 7.1) | 6,876 (6,834 to 6,957) | 26,824 (26,688 to 27,209) | 42,461 (42,147 to 43,008) | 18,488 (17,266 to 18,823) | 15,293 (13,637 to 16,875) | 95,623 (79,189 to 106,363) | 118,723 (112,098 to 126,235) | **461 (401 to 472)** | 3.9 (3.9 to 3.9) | 7.9 (4.9 to 8.5) | 23.6 (23.5 to 23.8) | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 6.0 (6.0 to 7.0) | 3.2 (3.2 to 4.9) | 6,882 (6,875 to 6,886) | 26,883 (26,811 to 26,904) | 42,179 (42,108 to 42,188) | 5,285 (5,208 to 6,196) | 3,762 (3,737 to 3,955) | 655,182 (606,563 to 710,298) | 494,178 (491,540 to 596,918) | 51.9 (4.0 to 171) | 2.8 (2.3 to 3.6) | 4.4 (4.2 to 4.9) | 23.9 (22.7 to 24.1) | $0.0040 |
| ubicloud | `ubicloud-standard-4` | 16.0 (15.0 to 17.0) | 10.6 (10.2 to 11.5) | 5,845 (5,662 to 5,953) | 12,295 (12,023 to 12,426) | 40,389 (36,924 to 42,085) | 2,731 (2,653 to 3,069) | 2,117 (1,163 to 2,570) | 167,689 (154,361 to 175,972) | 131,529 (128,221 to 151,757) | 247 (203 to 297) | 9.6 (9.3 to 10.0) | 12.1 (11.1 to 14.2) | 40.6 (39.8 to 43.9) | $0.0040 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 7.0 (7.0 to 9.0) | 7.1 (6.5 to 7.3) | 6,292 (6,012 to 6,405) | 12,792 (12,548 to 13,367) | 38,053 (37,578 to 40,132) | 3,740 (3,280 to 4,424) | 3,130 (2,088 to 4,262) | 49,131 (30,868 to 295,336) | 43,115 (18,931 to 74,227) | 177 (79.1 to 197) | 4.6 (4.1 to 4.7) | 5.9 (5.8 to 6.4) | 37.9 (34.1 to 39.2) | $0.0080 |

\* Not plain pay-as-you-go, so the cost above leaves out:

- `depot-ubuntu-24.04-arm-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04-arm`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
- `depot-macos-26`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `boat`: Needs a plan from $20 a month, which comes back as VM time. Job starts above the plan's included number cost $0.03-0.07 each.
- `buildkite-linux-amd64-4x16`: 4 vCPU hosted agents need the Pro plan, $30 per active user a month.
- `depot-ubuntu-24.04-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
