// nav.ts
// Bezpieczny powrot — wraca do poprzedniego ekranu, a gdy go brak, przechodzi na ekran glowny.
import { router } from "expo-router";

// Powrot z zabezpieczeniem przed brakiem ekranu docelowego
export function goBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/");
  }
}
