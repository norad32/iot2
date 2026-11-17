#include <stdio.h>
#include "irrigation.h"

int main(void) {
    const int moisture_pct = 25;
    printf("Feuchte: %d %% -> Bewaesserungsbedarf: %s\n",
           moisture_pct,
           irrigation_required(moisture_pct) ? "ja" : "nein");
    return 0;
}
