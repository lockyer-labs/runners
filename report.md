# Runner benchmark report

Benchmark version 4. 81 samples from 1 workflow run(s). Benchmark values are medians across samples, with the lowest to highest sample in brackets; the best median in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | - | 4 | 14.7 | 155 | vm-other | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | Ampere-1a | 4 | 11.7 | 133 | – | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| depot | `depot-ubuntu-24.04-arm-4` | Neoverse-V2 | 4 | 15.6 | 156 | qemu | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | Neoverse-V1<br>Neoverse-V2 | 4 | 15.3 | 190 | – | Stockholm, SE | AS16509 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04-arm` | Neoverse-N2<br>Neoverse-V3 | 4 | 15.6 | 155 | microsoft | Des Moines, US | AS8075 Microsoft Corporation | 3 |
| ubicloud | `ubicloud-standard-4-arm` | Neoverse-N1 | 4 | 11.6 | 155 | – | Frankfurt am Main, DE | AS28753 Leaseweb Deutschland GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | Neoverse-V2 | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| avrea | `avrea-macos-26-8-vcpu` | Apple M5 Max (Virtual) | 8 | 24.0 | 361 | apple | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-6vcpu-macos-26` | Apple M5 Max (Virtual) | 6 | 24.0 | 439 | apple | San Jose, US | AS402960 MACWEB | 3 |
| depot | `depot-macos-26` | Apple M4 (Virtual) | 9 | 17.0 | 424 | apple | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `macos-26` | Apple M1 (Virtual) | 3 | 7.0 | 343 | apple | San Jose, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-macos` | Apple M6 (Virtual) | 12 | 12.0 | 139 | apple | Martinez, US | AS7922 Comcast Cable Communications, LLC | 3 |
| luxor | `luxor-macos-26-small` | Apple M4 Pro (Virtual) | 4 | 8.0 | 449 | apple | Seattle, US | AS19538 Luxor | 3 |
| warpbuild | `warp-macos-26-arm64-6x` | Apple M5 Pro (Virtual) | 6 | 22.0 | 424 | apple | Las Vegas, US | AS395337 MacStadium, Inc. | 3 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.4 | 161 | kvm | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| boat | `boat` | AMD EPYC 4585PX 16-Core Processor | 4 | 7.8 | 84 | kvm | Strasbourg, FR | AS16276 OVH SAS | 3 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| celesto | `celesto-large` | Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz | 4 | 15.6 | 63 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 3 |
| depot | `depot-ubuntu-24.04-4` | AMD EPYC 9R45 96-Core Processor | 4 | 15.6 | 156 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor<br>Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Boardman, US | AS16509 Amazon.com, Inc. | 3 |
| groundbox | `groundbox-4vcpu` | AMD EPYC | 4 | 15.6 | 63 | kvm | Warrenton, US | AS16276 OVH SAS | 3 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 3 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | AMD EPYC | 4 | 7.8 | 68 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| ubicloud | `ubicloud-standard-4` | AMD Ryzen 9 7950X3D 16-Core Processor | 4 | 15.6 | 155 | kvm | Falkenstein, DE | AS24940 Hetzner Online GmbH | 3 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 3 |

## Benchmarks

| Provider | Label | Queue (s) | Package install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | fsync writes (/s) | Download (MB/s) | Cache save 1 GB (s) | Cache restore 1 GB (s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | 19.0 | 7.8 (7.6 to 7.9) | **12,066 (12,048 to 12,197)** | **48,422 (46,155 to 48,531)** | **46,771 (46,207 to 48,033)** | 24,394 (21,506 to 26,396) | 14,463 (12,280 to 14,565) | 99,171 (95,143 to 122,146) | 103,886 (103,761 to 105,848) | 4,377 (4,240 to 4,450) | 3.0 (3.0 to 3.0) | 3.5 (3.3 to 3.6) | 2.6 (2.4 to 2.9) | 19.1 (19.1 to 19.1) | $0.0080 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | 11.0 (10.0 to 11.0) | 14.8 (14.7 to 15.4) | 931 (930 to 931) | 3,669 (3,656 to 3,669) | 26,366 (26,193 to 26,368) | 1,593 (1,482 to 1,727) | 878 (843 to 1,043) | 226,852 (222,866 to 235,965) | 92,879 (88,761 to 94,477) | 11,309 (11,150 to 11,940) | 208 (113 to 318) | 4.3 (4.1 to 4.3) | 4.9 (4.7 to 4.9) | 51.8 (50.9 to 53.9) | $0.0050 |
| depot | `depot-ubuntu-24.04-arm-4` | **2.0** | 5.1 (5.1 to 5.2) | 3,344 (3,336 to 3,356) | 13,196 (13,179 to 13,222) | 26,653 (26,426 to 26,668) | 8,008 (7,939 to 10,109) | 11,826 (11,718 to 12,240) | 307,804 (284,638 to 312,547) | 311,369 (309,526 to 313,780) | 72,380 (67,217 to 74,418) | 382 (352 to 410) | 3.9 (3.8 to 4.4) | 3.1 (3.0 to 3.5) | 40.2 (39.8 to 40.6) | $0.0082 ($0.0080 to $0.0082)\* |
| flamewill | `flamewill-4vcpu-16gb-ubuntu-2404` | 30.0 (12.0 to 39.0) | 13.4 (8.5 to 18.1) | 3,334 (3,016 to 3,337) | 13,282 (11,980 to 13,304) | 26,643 (20,428 to 26,646) | 472 (315 to 472) | 226 (151 to 226) | 67,092 (67,091 to 69,717) | 33,545 (33,539 to 33,545) | 14,851 (7,993 to 20,578) | 13.3 (7.1 to 24.2) | 6.0 (5.1 to 6.9) | 4.0 (4.0 to 5.4) | 41.8 (40.1 to 56.3) | $0.0022 |
| github | `ubuntu-24.04-arm` | 5.0 | 18.5 (14.6 to 22.8) | 3,959 (3,915 to 3,959) | 15,743 (15,617 to 15,763) | 27,793 (27,779 to 43,721) | 413 (413 to 414) | 352 (329 to 352) | 19,574 (19,539 to 19,632) | 19,567 (19,562 to 19,606) | 3,902 (3,725 to 4,771) | 335 (299 to 369) | 5.9 (4.7 to 5.9) | 6.9 (6.4 to 8.1) | 46.3 (39.4 to 47.6) | $0.0080\* |
| ubicloud | `ubicloud-standard-4-arm` | 45.0 (37.0 to 47.0) | 28.3 (27.3 to 30.5) | 3,333 (3,331 to 3,341) | 13,293 (13,116 to 13,303) | 15,065 (15,053 to 15,096) | 1,021 (1,001 to 1,029) | 952 (930 to 985) | 105,090 (97,004 to 106,308) | 91,303 (89,377 to 95,034) | 3,699 (3,092 to 3,943) | 105 (28.1 to 108) | 11.9 (10.1 to 13.0) | 12.0 (11.6 to 13.6) | 65.8 (64.5 to 73.8) | $0.0050 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | 20.0 (8.0 to 21.0) | 21.1 (20.1 to 27.6) | 3,330 (3,328 to 3,334) | 13,271 (13,268 to 13,291) | 26,649 (26,456 to 26,656) | 315 (315 to 315) | 315 (315 to 315) | 4,196 (4,196 to 4,196) | 4,198 (4,198 to 4,198) | 517 (516 to 517) | 465 (446 to 523) | 4.0 (4.0 to 4.1) | 4.8 (4.5 to 4.9) | 44.1 (41.2 to 47.7) | $0.0060 |
| avrea | `avrea-macos-26-8-vcpu` | 24.0 | 4.1 (4.0 to 5.3) | – | – | 34,426 (34,310 to 34,436) | 17,869 (17,789 to 17,986) | **17,846 (17,662 to 17,964)** | 101,557 (101,411 to 102,634) | 62,851 (61,973 to 62,979) | – | 2.4 (2.4 to 3.4) | 3.4 (3.2 to 3.5) | 2.8 (2.8 to 3.0) | 13.2 (12.7 to 13.2) | $0.0187 ($0.0173 to $0.0187) |
| blacksmith | `blacksmith-6vcpu-macos-26` | 23.0 (22.0 to 33.0) | **2.4 (2.3 to 2.5)** | – | – | 30,867 (27,970 to 31,840) | 12,447 (11,841 to 13,075) | 10,597 (9,488 to 11,175) | 52,427 (51,723 to 52,487) | 25,243 (24,121 to 25,663) | – | 161 (155 to 429) | 2.7 (2.6 to 2.9) | 4.0 (3.8 to 5.2) | 18.0 (14.8 to 19.6) | $0.0800 |
| depot | `depot-macos-26` | 4.0 (4.0 to 5.0) | 23.0 (21.9 to 28.5) | – | – | 33,696 (31,741 to 33,725) | 6,213 (4,774 to 6,232) | 1,216 (1,198 to 1,355) | 40,063 (11,415 to 41,773) | 22,818 (9,946 to 24,128) | – | 364 (349 to 386) | 7.0 (5.9 to 7.5) | 4.9 (4.8 to 5.4) | 17.3 (16.4 to 19.4) | $0.0240 ($0.0227 to $0.0267)\* |
| github | `macos-26` | 4.0 | 11.5 (7.0 to 14.3) | – | – | 17,628 (16,197 to 20,775) | 6,875 (6,318 to 7,471) | 4,762 (2,965 to 5,562) | 27,456 (26,413 to 35,052) | 13,687 (8,393 to 17,088) | – | 18.4 (10.5 to 150) | 15.7 (14.6 to 17.9) | 24.1 (12.7 to 32.3) | 52.0 (44.1 to 55.4) | $0.0620 |
| groundbox | `groundbox-macos` | 25.0 (20.0 to 189) | 5.5 (5.2 to 5.8) | – | – | 36,222 (36,129 to 36,223) | 13,856 (13,793 to 13,965) | 13,592 (13,003 to 13,747) | 113,422 (112,991 to 114,054) | 58,423 (50,213 to 63,659) | – | 38.7 (28.7 to 62.2) | 2.5 (2.4 to 2.8) | 2.1 (2.1 to 2.2) | **12.4 (12.4 to 12.4)** | $0.0108 |
| luxor | `luxor-macos-26-small` | 27.0 (27.0 to 28.0) | 4.3 (4.1 to 4.4) | – | – | 31,318 (29,618 to 33,838) | 13,964 (12,622 to 17,041) | 13,116 (12,409 to 14,797) | 113,494 (97,719 to 132,673) | 66,169 (58,756 to 77,481) | – | 206 (41.4 to 240) | 6.2 (5.4 to 6.7) | 64.0 (59.6 to 71.6) | 18.5 (18.3 to 21.0) | $0.0253 ($0.0253 to $0.0280) |
| warpbuild | `warp-macos-26-arm64-6x` | 26.0 (25.0 to 30.0) | 4.3 (4.1 to 5.3) | – | – | 30,622 (27,808 to 33,919) | 7,029 (6,440 to 7,496) | 5,898 (4,300 to 6,498) | 15,605 (13,273 to 16,214) | 8,346 (6,830 to 8,748) | – | 342 (152 to 371) | 4.4 (4.3 to 6.0) | 8.6 (8.1 to 28.9) | 15.8 (14.6 to 18.2) | $0.0800 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 8.0 | 6.7 (6.6 to 6.9) | 6,764 (6,764 to 6,783) | 26,946 (26,839 to 26,964) | 42,322 (42,213 to 42,323) | 16,141 (15,859 to 18,014) | 10,058 (9,816 to 10,451) | 122,150 (97,823 to 165,410) | 162,815 (130,746 to 195,334) | 17,123 (14,327 to 20,092) | 765 (727 to 928) | 8.2 (8.2 to 8.5) | 2.7 (2.5 to 3.0) | 22.4 (22.4 to 22.4) | $0.0031 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 8.0 (7.0 to 8.0) | 15.7 (14.0 to 25.6) | 6,687 (5,816 to 6,696) | 25,799 (22,634 to 26,392) | 41,294 (35,719 to 41,341) | 7,578 (4,854 to 8,343) | 2,175 (2,082 to 2,273) | **823,992 (293,865 to 824,518)** | 413,283 (311,319 to 443,946) | 50,115 (24,284 to 52,788) | 175 (153 to 262) | **2.2 (2.2 to 2.3)** | 2.2 (2.1 to 2.4) | 25.8 (24.8 to 25.8) | $0.0080 |
| boat | `boat` | 6.0 (6.0 to 8.0) | 4.8 (4.4 to 5.9) | 6,485 (6,331 to 6,829) | 25,773 (21,324 to 27,119) | 39,046 (37,319 to 41,516) | **29,930 (20,203 to 33,008)** | 15,565 (9,296 to 16,562) | 793,876 (585,948 to 794,899) | 473,218 (141,883 to 611,886) | 55,110 (36,555 to 77,881) | **847 (101 to 849)** | 6.6 (6.3 to 44.6) | 12.1 (10.3 to 12.1) | 24.9 (22.7 to 35.1) | $0.0003 ($0.0002 to $0.0004)\* |
| buildkite | `buildkite-linux-amd64-4x16` | 5.7 (5.4 to 5.9) | 5.3 (3.2 to 5.5) | 6,892 (6,865 to 6,938) | 26,943 (26,847 to 27,000) | 42,170 (42,112 to 42,421) | 5,218 (5,206 to 5,910) | 3,418 (3,116 to 4,460) | 668,833 (603,202 to 685,128) | 504,823 (430,560 to 562,054) | 65,226 (64,798 to 68,886) | 634 (615 to 648) | – | – | 23.2 (22.3 to 23.4) | $0.0064 ($0.0061 to $0.0064)\* |
| celesto | `celesto-large` | 9.0 (9.0 to 10.0) | 7.1 (5.9 to 7.2) | 2,973 (2,970 to 2,975) | 11,833 (11,693 to 11,851) | 25,381 (24,232 to 25,554) | 7,109 (6,031 to 7,180) | 7,030 (6,418 to 7,147) | 378,305 (377,655 to 379,806) | 286,764 (285,239 to 289,382) | 55,536 (54,058 to 56,471) | 459 (420 to 483) | 5.5 (5.5 to 5.5) | 3.3 (3.0 to 3.3) | 42.1 (41.8 to 42.2) | **$0.0010 ($0.0009 to $0.0010)** |
| checklane | `checklane-4vcpu-ubuntu-2404` | 6.0 | 5.3 (4.2 to 5.6) | 6,676 (6,658 to 6,883) | 26,320 (26,233 to 27,295) | 41,881 (40,935 to 42,111) | 23,886 (19,131 to 34,251) | 11,625 (10,984 to 16,619) | 693,196 (457,522 to 1,012,086) | **536,717 (449,273 to 677,890)** | **112,366 (75,167 to 119,897)** | 294 (108 to 296) | 2.6 (2.5 to 2.6) | 2.2 (2.2 to 2.4) | 24.2 (24.1 to 24.4) | $0.0017 |
| depot | `depot-ubuntu-24.04-4` | **2.0** | 3.7 (3.4 to 3.8) | 5,146 (5,128 to 5,248) | 20,078 (19,841 to 21,558) | 33,410 (31,527 to 33,869) | 8,817 (7,884 to 9,413) | 12,319 (11,843 to 14,666) | 410,747 (169,731 to 448,498) | 384,748 (254,735 to 404,765) | 66,759 (43,956 to 82,075) | 419 (369 to 426) | 4.1 (3.9 to 4.6) | 2.7 (2.6 to 3.2) | 29.1 (27.1 to 30.8) | $0.0060 ($0.0056 to $0.0062)\* |
| github | `ubuntu-24.04` | 4.0 (3.0 to 4.0) | 24.0 (13.5 to 27.4) | 3,315 (3,293 to 3,678) | 6,958 (6,951 to 8,218) | 40,849 (27,256 to 40,978) | 472 (414 to 472) | 226 (226 to 414) | 68,923 (19,584 to 69,177) | 33,545 (19,591 to 33,546) | 6,252 (3,298 to 7,652) | 295 (92.5 to 445) | 6.5 (5.1 to 33.0) | 12.8 (6.7 to 16.1) | 57.9 (52.7 to 68.5) | $0.0120 ($0.0120 to $0.0240)\* |
| groundbox | `groundbox-4vcpu` | 5.0 (5.0 to 6.0) | 3.8 (3.0 to 3.8) | 6,868 (6,831 to 6,873) | 23,206 (23,188 to 23,635) | 41,721 (41,550 to 41,768) | 3,140 (1,645 to 8,068) | 1,272 (1,142 to 2,105) | 230,768 (229,487 to 370,747) | 270,386 (263,567 to 302,994) | 51,678 (50,933 to 55,286) | 39.1 (36.4 to 43.1) | 2.8 (2.4 to 3.0) | **2.0 (1.2 to 2.1)** | 28.5 (28.2 to 29.3) | $0.0029 ($0.0029 to $0.0030) |
| luxor | `luxor-ubuntu-medium-4c-8g` | 8.0 (8.0 to 9.0) | 11.9 (11.6 to 12.1) | 6,973 (6,959 to 6,984) | 27,167 (27,089 to 27,201) | 43,244 (43,056 to 43,330) | 19,226 (19,114 to 19,713) | 16,264 (13,413 to 17,185) | 98,175 (79,703 to 101,949) | 126,207 (122,964 to 126,364) | 26,482 (26,051 to 26,691) | 213 (53.8 to 263) | 3.8 (3.8 to 4.0) | 5.1 (5.0 to 5.4) | 23.3 (23.3 to 23.5) | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 7.0 | 3.5 (3.1 to 5.0) | 6,888 (6,855 to 6,925) | 26,914 (26,883 to 27,018) | 42,190 (42,016 to 42,216) | 5,235 (5,172 to 6,137) | 3,599 (3,332 to 4,100) | 700,683 (662,735 to 716,948) | 495,432 (426,275 to 538,995) | 66,401 (64,626 to 66,566) | 577 (534 to 592) | 3.5 (2.4 to 4.2) | 4.6 (4.4 to 5.6) | 23.9 (22.8 to 24.0) | $0.0040 |
| ubicloud | `ubicloud-standard-4` | 18.0 (15.0 to 18.0) | 11.5 (10.8 to 11.9) | 5,782 (5,729 to 5,801) | 12,242 (12,237 to 12,312) | 41,320 (40,738 to 41,411) | 2,739 (2,464 to 2,788) | 2,425 (1,145 to 2,540) | 167,299 (154,432 to 182,217) | 128,545 (112,665 to 146,061) | 2,793 (2,608 to 3,005) | 124 (98.3 to 147) | 10.1 (9.9 to 10.8) | 12.5 (12.0 to 13.1) | 42.8 (41.1 to 44.4) | $0.0040 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 9.0 (8.0 to 9.0) | 7.5 (5.7 to 7.6) | 6,018 (5,945 to 6,156) | 12,506 (12,435 to 12,729) | 37,418 (36,961 to 37,500) | 3,930 (3,207 to 5,019) | 3,141 (2,197 to 3,372) | 62,931 (48,937 to 225,723) | 39,567 (29,184 to 122,835) | 2,221 (1,960 to 3,799) | 455 (376 to 514) | 3.8 (3.8 to 4.4) | 5.0 (5.0 to 6.3) | 34.9 (33.2 to 36.6) | $0.0080 |

\* Not plain pay-as-you-go, so the cost above leaves out:

- `depot-ubuntu-24.04-arm-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04-arm`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
- `depot-macos-26`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `boat`: Needs a plan from $20 a month, which comes back as VM time. Job starts above the plan's included number cost $0.03-0.07 each.
- `buildkite-linux-amd64-4x16`: 4 vCPU hosted agents need the Pro plan, $30 per active user a month.
- `depot-ubuntu-24.04-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
