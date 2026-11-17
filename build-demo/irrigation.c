#include "irrigation.h"
#define DRY_LIMIT 30

int irrigation_required(int moisture_pct) {
    return moisture_pct < DRY_LIMIT;
}
