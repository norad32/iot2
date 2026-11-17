# MB02 – C-Build und Top-down-Systemdesign

Unterrichtsmaterial für den IoT-Workshop, HF ICT. Struktur und Gestaltung folgen dem kleingeschriebenen Verzeichnis `mb01`: Slidev, ZbW-Hintergrund, zentrierte Titel, Abschnittsfolien, Projektauftrag und Quellen im IEEE-Stil.

## Ablauf

| Teil | Zeit | Schwerpunkt |
| --- | --- | --- |
| Input 1 | 45 min | Embedded Systems, C/C++-Build im Vergleich mit C#/.NET, Header/Implementierung, Cross-Compilation, PlatformIO, Demo und Fehlerdiagnose |
| Input 2 | 45 min | Garagentor: Anforderungen, Blackbox/Whitebox, GPIOs, Entprellung, Motorsteuerung, Schnittstellen und Tests |
| Projektarbeit | Rest des Blocks | Anwendung auf den eigenen B3-Use-Case mit Coaching |

Bei vier Lektionen bleiben **90 Minuten Projektarbeit**; Pausen zusätzlich einplanen. Kurze Verständnisfragen und die Dozentendemo sind in den 90 Inputminuten enthalten. Zeitfenster und Lösungshinweise stehen als Referentennotizen in `slides.md`. Die letzten drei Quellenfolien sind Nachschlagefolien.

## Lernziele

- Präprozessor, Compiler, Assembler und Linker erklären.
- Build-, Upload- und Laufzeitfehler unterscheiden.
- Aus einem Use-Case prüfbare Anforderungen und Systemteile ableiten.
- Schnittstellen beschreiben und den Entwurf mit Szenarien prüfen.
- Entwurf, Build und nächste Projektaufgaben nachvollziehbar dokumentieren.

## Dateien

- [`slides.md`](slides.md): 36 Folien inklusive Referentennotizen und C#/.NET-Vergleich.
- [`auftrag-projekt.md`](auftrag-projekt.md): Auftrag für die verbleibende Projektzeit.
- [`build-demo/`](build-demo/README.md): Einstieg in die Blinky-Build-Demo und Ablauf für die Lehrperson.
- `style.css`, `layouts/default.vue`, `setup/mermaid.ts`, `assets/bg.png`: Gestaltung aus `mb01`.

Die C/C++-Build-Demo verwendet **`blinky-esp32`**: `main.cpp` bindet mit `#include <QwiicLedStick.h>` die Klasse `LED` ein; `lib/led/QwiicLedStick.cpp` enthält ihre Implementierung. PlatformIO-Umgebungen zeigen die Zwischenstufen und vier gezielte Buildfehler. Der Systemdesign-Input verwendet durchgängig die **Garagentorsteuerung aus `fsm-esp32`, Aufgabe 4**, passend zur späteren FSM-Aufgabe in MB05. Anforderungen, Diagramme und Tests berücksichtigen unbekannte Startposition, Endschalter, Stopp und Richtungswechsel. Die Whitebox konkretisiert GPIO-Eingänge, Entprellung, Flankenerkennung, Endlagenauswertung und Motorsteuerung mit verriegelten GPIO-Ausgängen. Die Zuordnung zum späteren Qwiic-/MotorSim-Aufbau wird erläutert. In der anschliessenden Projektarbeit übertragen die Gruppen das Vorgehen auf ihren eigenen B3-Use-Case.

## Starten

Empfohlen und geprüft: **Node.js 22.22.0 LTS**, festgehalten in `.nvmrc`. Befehle im Ordner `mb02` ausführen:

```sh
npm ci
npm run dev
```

Präsentation: `http://localhost:3030/`, Referentenansicht mit Zeitplan und Lösungen: `http://localhost:3030/presenter`.

### Falls der Start mit einem Segmentation Fault abbricht

Mit dem hier installierten System-Node 26.13.0 trat beim Start ein sporadischer Absturz in einem V8-Worker auf. Mit dem offiziellen Node 22.22.0 wurden der Web-Build und die Browserprüfung aller 34 Folien erfolgreich durchgeführt. Die genaue Ursache des System-Node-Absturzes ist noch nicht geklärt.

Bei installiertem `nvm` die Projektversion aktivieren:

```sh
nvm install
nvm use
npm run dev
```

## Web-Build, Browserprüfung und PDF

```sh
npm run build
npm run check:browser
npm run export
```

- Web-Build: `dist/`.
- Browserprüfung: prüft jede Folie auf Browserfehler und überlaufende Inhalte.
- PDF: `slides-export.pdf`.
- Falls Chromium fehlt: `npx playwright install chromium`.

## Vorbereitung der Lehrperson

1. [Build-Demo](build-demo/README.md) im Blinky-Projekt mit PlatformIO ausprobieren, einschliesslich aller vier Fehlerumgebungen.
2. Einen erfolgreichen PlatformIO-Build des Blinky-Projekts inklusive Log vorbereiten.
3. Projektauftrag im Kursportal bereitstellen; vorhandene B3-Use-Cases und Portfolio-Leitfaden griffbereit halten.

Die Studierenden arbeiten mit ihrer Umgebung aus MB01 weiter. Für den Input ist keine zusätzliche GCC-Installation auf ihren Rechnern erforderlich.
