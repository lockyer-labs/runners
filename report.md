# Runner benchmark report

Benchmark version 3. 71 samples from 3 workflow run(s). Benchmark values are medians across samples, with the lowest to highest sample in brackets; the best median in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | - | 4 | 14.7 | 155 | vm-other | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | Ampere-1a | 4 | 11.7 | 133 | – | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| depot | `depot-ubuntu-24.04-arm-4` | Neoverse-V2 | 4 | 15.6 | 156 | qemu | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | Des Moines, US | AS8075 Microsoft Corporation | 3 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | Neoverse-V2 | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| avrea | `avrea-macos-26-8-vcpu` | Apple M5 Max (Virtual) | 8 | 24.0 | 361 | apple | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-6vcpu-macos-26` | Apple M5 Max (Virtual) | 6 | 24.0 | 439 | apple | San Jose, US | AS402960 MACWEB | 3 |
| depot | `depot-macos-26` | Apple M4 (Virtual) | 9 | 17.0 | 424 | apple | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `macos-26` | Apple M1 (Virtual) | 3 | 7.0 | 343 | apple | San Antonio, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-macos` | Apple M6 (Virtual) | 12 | 12.0 | 139 | apple | Martinez, US | AS7922 Comcast Cable Communications, LLC | 3 |
| luxor | `luxor-macos-26-small` | Apple M4 Pro (Virtual) | 4 | 8.0 | 449 | apple | Seattle, US | AS19538 Luxor | 3 |
| warpbuild | `warp-macos-26-arm64-6x` | Apple M5 Pro (Virtual) | 6 | 22.0 | 424 | apple | Las Vegas, US | AS395337 MacStadium, Inc. | 3 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | AMD EPYC<br>Intel(R) Xeon(R) Processor | 4 | 15.4 | 161 | kvm | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| boat | `boat` | AMD EPYC 4585PX 16-Core Processor | 4 | 7.8 | 84 | kvm | Warsaw, PL | AS16276 OVH SAS | 3 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| celesto | `celesto-large` | Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz | 4 | 15.6 | 63 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 3 |
| depot | `depot-ubuntu-24.04-4` | AMD EPYC 9R45 96-Core Processor | 4 | 15.6 | 156 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 2 |
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor<br>AMD EPYC 9V74 80-Core Processor<br>Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Boardman, US | AS16509 Amazon.com, Inc. | 3 |
| groundbox | `groundbox-4vcpu` | AMD EPYC | 4 | 15.6 | 63 | kvm | Warrenton, US | AS16276 OVH SAS | 3 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 3 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | AMD EPYC | 4 | 7.8 | 68 | kvm + container | Ashburn, US | AS401483 Namespace Labs | 3 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 7950X3D 16-Core Processor<br>AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Falkenstein, DE | AS24940 Hetzner Online GmbH | 3 |

## Benchmarks

| Provider | Label | Queue (s) | Package install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Cache save 1 GB (s) | Cache restore 1 GB (s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | 20.0 (14.0 to 24.0) | 7.9 (7.5 to 11.0) | **12,360 (11,773 to 13,312)** | **48,607 (48,550 to 49,018)** | **49,638 (48,641 to 54,223)** | **30,159 (24,441 to 32,773)** | **23,021 (19,859 to 28,019)** | 103,870 (96,730 to 104,593) | 113,300 (112,526 to 118,129) | 233 (143 to 281) | 2.9 (2.9 to 3.4) | 2.4 (2.4 to 3.2) | 19.9 (19.6 to 20.0) | $0.0080 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | 10.0 (9.0 to 10.0) | 13.0 (11.5 to 14.8) | 929 (928 to 931) | 3,659 (3,644 to 3,666) | 26,285 (26,213 to 26,289) | 1,506 (1,502 to 1,562) | 883 (764 to 887) | 227,249 (220,683 to 235,255) | 92,255 (91,681 to 92,513) | 123 (122 to 269) | 4.0 (3.7 to 4.1) | 5.3 (4.9 to 5.3) | 50.9 (50.8 to 51.2) | $0.0050 |
| depot | `depot-ubuntu-24.04-arm-4` | **2.0 (1.0 to 2.0)** | 5.0 (4.2 to 5.1) | 3,330 (3,205 to 3,338) | 13,085 (13,043 to 13,182) | 26,688 (26,555 to 26,690) | 1,367 (1,165 to 2,127) | 14,599 (14,180 to 15,793) | 73,039 (73,026 to 86,445) | 197,658 (183,084 to 200,311) | 170 (83.4 to 229) | 12.0 (11.8 to 12.4) | 3.6 (3.6 to 3.9) | 38.7 (38.1 to 39.1) | $0.0078 ($0.0078 to $0.0080)\* |
| github | `ubuntu-24.04-arm` | 6.0 (5.0 to 6.0) | 22.5 (20.1 to 25.3) | 3,961 (3,960 to 3,961) | 15,720 (15,714 to 15,760) | 27,826 (27,817 to 27,842) | 413 (413 to 414) | 351 (324 to 352) | 19,580 (19,579 to 19,610) | 19,576 (19,568 to 19,583) | 171 (105 to 192) | 5.0 (5.0 to 5.5) | 6.8 (6.7 to 6.9) | 51.9 (44.5 to 54.6) | $0.0080\* |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | 40.0 (40.0 to 41.0) | 25.8 (21.6 to 26.4) | 3,333 (3,329 to 3,341) | 13,280 (13,267 to 13,291) | 26,572 (26,554 to 26,591) | 315 (315 to 315) | 315 (315 to 315) | 4,198 (4,198 to 4,198) | 4,198 (4,198 to 4,198) | 151 (28.8 to 167) | 4.5 (3.4 to 6.0) | 5.3 (4.4 to 8.0) | 42.3 (42.2 to 44.0) | $0.0060 |
| avrea | `avrea-macos-26-8-vcpu` | 26.0 (25.0 to 27.0) | 4.1 (4.0 to 4.5) | – | – | 34,402 (34,182 to 34,407) | 17,783 (17,378 to 18,393) | 14,532 (14,461 to 14,617) | 103,018 (102,048 to 103,082) | 50,935 (46,085 to 60,150) | 274 (203 to 281) | 3.0 (2.9 to 3.2) | 2.8 (2.8 to 2.8) | 13.9 (13.9 to 13.9) | $0.0187 |
| blacksmith | `blacksmith-6vcpu-macos-26` | 24.0 (22.0 to 37.0) | **2.9 (2.6 to 3.3)** | – | – | 30,029 (27,239 to 31,882) | 12,699 (12,160 to 12,905) | 11,148 (8,240 to 12,796) | 50,243 (49,449 to 59,797) | 23,255 (23,122 to 23,802) | 187 (166 to 201) | 2.7 (2.6 to 2.8) | 3.9 (3.6 to 5.0) | 19.2 (16.1 to 22.3) | $0.0800 |
| depot | `depot-macos-26` | 53.0 (18.0 to 70.0) | 23.2 (20.5 to 23.6) | – | – | 33,696 (33,692 to 33,722) | 4,964 (4,883 to 5,225) | 745 (198 to 1,220) | 41,844 (41,074 to 42,016) | 24,160 (20,451 to 24,276) | 125 (41.4 to 225) | 13.3 (13.0 to 15.6) | 5.1 (4.9 to 5.7) | 17.1 (16.5 to 20.5) | $0.0240 ($0.0227 to $0.0280)\* |
| github | `macos-26` | 304 (3.0 to 304) | 10.7 (10.6 to 11.9) | – | – | 15,734 (11,479 to 16,775) | 5,857 (5,812 to 7,072) | 4,892 (4,291 to 6,091) | 31,842 (28,839 to 32,647) | 16,755 (16,422 to 17,018) | 115 (91.8 to 123) | 13.5 (11.6 to 25.2) | 14.7 (11.9 to 34.1) | 42.7 (41.7 to 46.1) | $0.0620 |
| groundbox | `groundbox-macos` | 21.0 (20.0 to 590) | 5.7 (5.6 to 5.9) | – | – | 35,231 (33,837 to 35,295) | 4,966 (4,956 to 5,250) | 5,170 (4,555 to 6,008) | 13,207 (13,194 to 13,466) | 8,305 (8,189 to 8,406) | 57.9 (53.4 to 64.1) | 366 (221 to 389) | 23.6 (22.0 to 26.5) | **13.2 (12.5 to 13.4)** | $0.0117 ($0.0108 to $0.0117) |
| luxor | `luxor-macos-26-small` | 27.0 (26.0 to 28.0) | 4.8 (4.3 to 4.9) | – | – | 29,771 (29,568 to 33,441) | 2,508 (2,225 to 5,021) | 2,850 (2,401 to 6,284) | 15,036 (14,560 to 16,053) | 6,424 (6,310 to 7,011) | 109 (37.7 to 257) | 7.4 (6.2 to 7.9) | 17.6 (12.9 to 20.7) | 19.9 (18.9 to 20.1) | $0.0267 ($0.0253 to $0.0280) |
| warpbuild | `warp-macos-26-arm64-6x` | 4.0 (4.0 to 5.0) | 5.1 (3.8 to 5.4) | – | – | 33,236 (30,493 to 33,782) | 7,532 (6,909 to 7,875) | 7,089 (5,203 to 7,936) | 12,694 (11,894 to 14,356) | 8,188 (7,988 to 8,683) | 180 (143 to 297) | 4.3 (3.6 to 4.6) | 16.0 (10.3 to 21.6) | 15.9 (14.5 to 16.9) | $0.0800 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 8.0 (8.0 to 9.0) | 7.8 (7.1 to 8.0) | 6,494 (6,469 to 6,562) | 25,816 (25,644 to 25,822) | 39,866 (39,602 to 40,166) | 13,133 (13,065 to 15,414) | 9,983 (9,566 to 10,477) | 252,895 (147,137 to 285,688) | 176,739 (165,060 to 218,804) | 132 (125 to 159) | 7.8 (7.8 to 8.3) | 2.6 (2.6 to 2.6) | 24.1 (23.2 to 25.6) | $0.0033 ($0.0032 to $0.0035) |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 7.0 (7.0 to 8.0) | 8.7 (7.3 to 9.6) | 5,329 (5,084 to 5,625) | 22,090 (19,151 to 22,497) | 35,145 (34,671 to 50,696) | 5,651 (2,724 to 6,851) | 2,101 (1,830 to 2,664) | 548,788 (333,675 to 574,777) | 320,886 (258,395 to 452,851) | 262 (215 to 329) | **2.4 (2.2 to 3.0)** | 2.3 (2.2 to 2.7) | 28.9 (22.6 to 47.4) | $0.0080 |
| boat | `boat` | 8.0 | 6.2 (6.1 to 6.8) | 6,434 (6,327 to 6,476) | 25,103 (24,410 to 25,226) | 38,861 (37,779 to 38,897) | 13,390 (13,115 to 16,303) | 6,186 (5,322 to 6,277) | 628,427 (611,333 to 674,164) | 389,826 (387,346 to 391,455) | 208 (186 to 253) | 8.4 (7.9 to 9.5) | 14.1 (13.7 to 15.7) | 26.7 (26.4 to 26.9) | $0.0003\* |
| buildkite | `buildkite-linux-amd64-4x16` | 4.8 (4.8 to 5.2) | 3.3 (3.2 to 3.5) | 6,890 (6,769 to 6,899) | 27,041 (26,324 to 27,204) | 42,020 (41,493 to 42,406) | 5,190 (5,020 to 5,900) | 3,916 (3,848 to 4,394) | 673,460 (669,639 to 697,095) | 472,132 (443,185 to 577,615) | 133 (17.4 to 211) | – | – | 23.1 (22.0 to 24.2) | $0.0064 ($0.0061 to $0.0067)\* |
| celesto | `celesto-large` | 14.0 (13.0 to 14.0) | 6.8 (6.5 to 7.2) | 2,949 (2,910 to 2,965) | 11,718 (11,633 to 11,743) | 21,932 (20,962 to 25,136) | 4,957 (4,891 to 4,995) | 5,572 (4,946 to 6,042) | 317,841 (305,392 to 331,979) | 262,006 (244,079 to 266,686) | 249 (131 to 271) | 6.5 (6.3 to 6.7) | 4.2 (3.7 to 4.3) | 48.5 (47.9 to 51.2) | **$0.0011 ($0.0011 to $0.0012)** |
| checklane | `checklane-4vcpu-ubuntu-2404` | 7.0 (7.0 to 8.0) | 4.1 (3.9 to 4.9) | 6,859 (6,727 to 6,862) | 26,221 (26,189 to 26,445) | 41,157 (41,145 to 41,601) | 5,145 (4,809 to 5,274) | 2,636 (1,828 to 3,319) | 667,088 (550,985 to 1,091,184) | 295,955 (250,803 to 572,423) | 94.4 (91.3 to 96.6) | 2.6 (2.3 to 2.8) | 2.3 (2.0 to 2.7) | 25.9 (25.7 to 25.9) | $0.0017 |
| depot | `depot-ubuntu-24.04-4` | **2.0 (1.0 to 3.0)** | 3.7 (3.7 to 3.7) | 5,496 (5,488 to 5,504) | 21,515 (21,490 to 21,540) | 34,039 (33,726 to 34,352) | 6,563 (4,963 to 8,164) | 15,451 (15,318 to 15,583) | 231,862 (199,847 to 263,877) | 261,693 (243,153 to 280,232) | 191 (122 to 260) | 11.9 (11.9 to 12.0) | 3.2 (3.1 to 3.3) | 28.2 (27.0 to 29.4) | $0.0057 ($0.0054 to $0.0060)\* |
| github | `ubuntu-24.04` | 4.0 (3.0 to 4.0) | 18.5 (12.0 to 35.1) | 3,674 (3,325 to 4,526) | 8,197 (7,004 to 9,528) | 32,021 (27,512 to 41,067) | 414 (413 to 472) | 236 (226 to 414) | 19,625 (18,590 to 68,664) | 19,605 (18,105 to 33,546) | 171 (161 to 250) | 6.2 (5.0 to 6.6) | 10.8 (9.7 to 18.0) | 59.6 (55.4 to 66.3) | $0.0120 ($0.0120 to $0.0240)\* |
| groundbox | `groundbox-4vcpu` | 6.0 (6.0 to 8.0) | 3.1 (3.1 to 3.1) | 6,850 (6,803 to 6,863) | 23,325 (22,847 to 23,644) | 41,769 (41,754 to 41,802) | 2,296 (1,796 to 3,193) | 932 (882 to 1,012) | 199,994 (199,160 to 200,067) | 199,682 (199,252 to 199,874) | 53.4 (35.2 to 58.8) | 4.2 (3.0 to 4.2) | **2.1 (1.9 to 2.2)** | 29.4 (28.9 to 29.4) | $0.0030 ($0.0029 to $0.0030) |
| luxor | `luxor-ubuntu-medium-4c-8g` | 9.0 (9.0 to 10.0) | 5.4 (5.3 to 5.6) | 6,956 (6,949 to 6,963) | 27,042 (26,952 to 27,073) | 42,857 (42,532 to 42,898) | 18,174 (16,613 to 21,087) | 15,236 (13,390 to 15,667) | 84,362 (78,289 to 103,425) | 119,450 (113,918 to 124,926) | **348 (38.1 to 367)** | 3.7 (3.7 to 31.5) | 5.3 (5.2 to 5.4) | 23.4 (23.3 to 23.5) | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 6.0 (6.0 to 7.0) | 6.6 (3.4 to 7.3) | 6,870 (6,808 to 6,901) | 26,944 (26,193 to 26,993) | 42,169 (41,535 to 42,298) | 5,428 (5,270 to 6,169) | 3,748 (3,348 to 4,164) | **708,421 (656,971 to 719,678)** | **490,162 (446,579 to 598,549)** | 128 (98.8 to 339) | 3.6 (2.8 to 4.2) | 5.5 (4.9 to 6.3) | 23.6 (22.8 to 24.8) | $0.0040 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 7.0 (3.0 to 11.0) | 7.6 (6.4 to 8.0) | 6,125 (6,054 to 6,552) | 12,608 (12,305 to 13,670) | 40,673 (37,907 to 42,419) | 4,422 (2,563 to 4,644) | 2,805 (1,991 to 3,141) | 34,208 (30,504 to 86,671) | 32,601 (25,234 to 53,437) | 185 (63.8 to 231) | 5.3 (3.8 to 10.5) | 6.5 (6.1 to 76.9) | 37.4 (32.3 to 38.6) | $0.0080 |

\* Not plain pay-as-you-go, so the cost above leaves out:

- `depot-ubuntu-24.04-arm-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04-arm`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.
- `depot-macos-26`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `boat`: Needs a plan from $20 a month, which comes back as VM time. Job starts above the plan's included number cost $0.03-0.07 each.
- `buildkite-linux-amd64-4x16`: 4 vCPU hosted agents need the Pro plan, $30 per active user a month.
- `depot-ubuntu-24.04-4`: Needs a plan: Developer is $20 a month with 2,000 minutes included.
- `ubuntu-24.04`: Free on public repos. This is GitHub's 4-core larger runner rate, which needs a GitHub Team ($4 per user a month) or Enterprise Cloud plan.

## Errors

- `luxor-ubuntu-medium-4c-8g` cache: cache-hit='', restored 0 bytes
- `warp-macos-26-arm64-6x` cache: cache-hit='', restored 0 bytes
