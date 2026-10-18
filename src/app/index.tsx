import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

export default function Index() {
  const [Comp, setComp] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    (async () => {
      let etapa = "importar modulo web";
      try {
        const { LoadSkiaWeb } =
          await import("@shopify/react-native-skia/lib/module/web");
        etapa = "LoadSkiaWeb (carregar canvaskit)";
        await LoadSkiaWeb({ locateFile: (f: string) => `/${f}` });
        etapa = "importar TestCanvas";
        const mod = await import("@/game/GameCanvas");
        setComp(() => mod.default);
      } catch (e: any) {
        console.log("ERRO SKIA na etapa:", etapa, e);
        setErro(`Etapa: ${etapa}\n${String(e?.stack ?? e?.message ?? e)}`);
      }
    })();
  }, []);

  if (Platform.OS !== "web") {
    const GameCanvas = require("@/game/GameCanvas").default;
    return <GameCanvas />;
  }
  if (erro) return <Text style={{ color: "red" }}>{erro}</Text>;
  if (!Comp) return <Text>Carregando...</Text>;
  return <Comp />;
}
