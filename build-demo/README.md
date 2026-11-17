# Build-Demo · Blinky · 10 Minuten

Die MB02-Folien verwenden den echten ESP32-Build aus `blinky-esp32`.
Der vollständige [Demo-Leitfaden](../../blinky-esp32/docs/build-demo.md) enthält
Vorbereitung, Zwischenstufen, erwartete Diagnosen und Upload.

Im PlatformIO-Terminal im Ordner `blinky-esp32` ausführen:

```sh
pio run -e demo-stages
```

`#include <QwiicLedStick.h>` in `src/main.cpp` zeigen, dann Deklarationen in
`lib/led/QwiicLedStick.h` und Definitionen in `lib/led/QwiicLedStick.cpp` vergleichen.
Danach unter `.pio/build/demo-stages/` die Dateien `src/main.cpp.ii`, `src/main.cpp.s`,
`src/main.cpp.o`, `lib*/libled.a` und `firmware.elf` der jeweiligen Buildphase zuordnen.

## Fehler einzeln vorführen

```sh
pio run -e demo-missing-header
pio run -e demo-compiler-error
pio run -e demo-missing-definition
pio run -e demo-duplicate-definition
```

Jeder dieser vier Builds soll scheitern: fehlender Header, fehlendes Semikolon,
fehlende Definition und doppelte Definition. Vor jedem Aufruf die Phase und
Meldung vorhersagen lassen. Die Fehler werden über `platformio.ini` und
`src/demo_faults.cpp` ausgewählt.

## Zum erfolgreichen Build zurückkehren

```sh
pio run -e esp32dev
```

Für die Build-Demo ist kein Board erforderlich. Für den anschliessenden Upload
ESP32 und Qwiic LED Stick anschliessen und `pio run -e esp32dev -t upload` ausführen.
