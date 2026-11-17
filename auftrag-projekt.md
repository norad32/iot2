# Auftrag · Vom Use-Case zum ersten Systementwurf

Arbeitet in euren bestehenden Gruppen am **eigenen B3-Projekt** weiter. Nutzt eure Use-Case-Sammlung und den Portfolio-Leitfaden aus MB01.

**Zeit:** restliche Unterrichtszeit nach den zwei Inputs. Bei vier Lektionen stehen dafür 90 Minuten zur Verfügung. Die Zeitaufteilung unten ist eine Orientierung für eure Projektarbeit; Coaching und kurze Abnahmen finden darin statt.

## Ziel

Ihr könnt euren Entwurf vom fachlichen Bedarf bis zu den Softwaremodulen erklären und einen kleinen Ablauf nachvollziehbar bauen und prüfen.

## 1. Use-Case und Anforderungen · ca. 15 min

- Wählt einen konkreten Use-Case, z. B. Bewässerung einer Zone oder Nachfüllen des Reservoirs.
- Haltet Ziel, Auslöser, Normalfall und mindestens einen Fehler- oder Sonderfall fest.
- Formuliert drei bis fünf prüfbare Anforderungen mit IDs. Klärt relevante Einheiten, Grenzwerte, Aktualität und Reaktionszeiten.
- Kennzeichnet eigene Annahmen und offene Fragen. Die Beispielzahlen aus den Folien sind keine vorgegebenen B3-Grenzwerte.

| ID | Anforderung | Herkunft / Annahme | Wie prüfen wir sie? |
| --- | --- | --- | --- |
| A1 | … | … | … |

## 2. Systembild und Schnittstellen · ca. 20 min

- Zeichnet zuerst eine Blackbox mit einer klar beschrifteten Systemgrenze, externen Beteiligten sowie Ein- und Ausgängen.
- Öffnet die Blackbox: Welche drei bis sechs Bausteine benötigt ihr? Beschriftet jeden Pfeil mit den ausgetauschten Daten oder Signalen.
- Ordnet die Bausteine Geräten bzw. Softwaremodulen zu. Markiert geplante, bereits vorhandene und simulierte Teile.
- Beschreibt zwei wichtige Schnittstellen so, dass zwei Gruppenmitglieder unabhängig daran arbeiten könnten.

| Schnittstelle | Daten und Bedeutung | Einheit / Wertebereich | Zeitpunkt / Aktualität | Fehlerverhalten | Zuständigkeit |
| --- | --- | --- | --- | --- | --- |
| … → … | … | … | … | … | … |

Skizzen dürfen handgezeichnet und als Foto abgelegt werden. Entscheidend sind Verständlichkeit und konsistente Systemgrenzen.

## 3. Einen Entscheid begründen · ca. 10 min

Vergleicht zwei sinnvolle Varianten anhand von mindestens zwei Kriterien, z. B. lokale oder zentrale Entscheidungslogik, reale oder simulierte Eingangsdaten für den ersten Prototyp.

Notiert kurz:

1. Welche Varianten habt ihr betrachtet?
2. Welche Kriterien sind für euren Use-Case wichtig?
3. Welche Variante wählt ihr, mit welcher Begründung?
4. Welche Annahme müsst ihr noch prüfen und wie?

Belegt übernommene technische Aussagen nach dem IEEE-Muster aus MB01. Eigene Annahmen, Messungen und Entscheidungen als solche kennzeichnen.

## 4. Kleinen Ablauf bauen und prüfen · ca. 35 min

- Baut zuerst euren vorhandenen Projektstand und notiert den verwendeten Build-Aufruf sowie die PlatformIO-Umgebung.
- Identifiziert im Build-Log mindestens die Übersetzungs- und Linkphase. Bei einem inkrementellen Build ist nicht jede Phase erneut nötig; für ein vollständiges Log könnt ihr zuerst `pio run -e esp32dev -t clean` und danach `pio run -e esp32dev -v` verwenden. Umgebungsname bei Bedarf anpassen.
- Setzt einen kleinen durchgängigen Ablauf um: **Eingang → Entscheid → sichtbarer Ausgang**.
- Trennt die Entscheidungslogik möglichst von Hardwarezugriffen. Benennt Schnittstelle und Implementierung.
- Verwendet bei noch fehlenden Komponenten klar markierte Testwerte. Dokumentiert, welche Teile bereits real sind.
- Prüft mindestens einen Normalfall, einen Grenzfall und einen Fehlerfall. Vergleicht Soll und Ist; dokumentiert offene Abweichungen.

| Anforderung | Eingaben / Aufbau | Erwartung | Beobachtung | Ergebnis / nächster Schritt |
| --- | --- | --- | --- | --- |
| … | … | … | … | … |

Eine LED kann das Ventil modellieren. Ein erfolgreicher Build allein gilt nicht als Funktionsnachweis. Falls ihr blockiert seid, haltet die Phase, die erste relevante Fehlermeldung und den nächsten Prüfschritt fest und holt Coaching.

## 5. Stand sichern und erklären · ca. 10 min

- Legt Systemskizze, Anforderungen, Schnittstellen, Variantenentscheid und Testbeobachtungen im Projekt-Repository ab, z. B. unter `docs/mb02/`.
- Committet den bearbeiteten Code und dokumentiert Build-Befehl, Umgebung und Ergebnis; vorhandene Toolchain-/Bibliotheksversionen festhalten, soweit verfügbar.
- Erstellt konkrete nächste Aufgaben als GitHub-Issues mit Zuständigkeit und Termin.
- Aktualisiert euer Arbeitsjournal.
- Zeigt der Lehrperson kurz den Stand. Eine Person führt vor, eine andere erklärt Systemgrenze, Schnittstelle und Build-Kette.

**Ergebnis:** ein nachvollziehbarer Entwurfsstand und ein kleiner geprüfter Ablauf; offene Punkte sind sichtbar und als Aufgaben erfasst.

Der Entwurf wird in den nächsten Modulblöcken weiterentwickelt. Die Ergebnisse unterstützen die bestehenden Portfolioaspekte Big Picture, Umsetzung, Softwarequalität, Organisation und Arbeitsjournal.
