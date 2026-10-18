import { Canvas, Fill, Rect, Group } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";

const SHIP_SPEED = 250;

export default function GameCanvas() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / GAME_WIDTH, height / GAME_HEIGHT);
  const offsetX = (width - GAME_WIDTH * scale) / 2;
  const offsetY = (height - GAME_HEIGHT * scale) / 2;
  const [shipX, setShipX] = useState(GAME_WIDTH / 2 - 8);
  const shipY = GAME_HEIGHT - 30;

  const keys = useRef({ left: false, right: false });

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const setKey = (down: boolean) => (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") keys.current.left = down;
      if (k === "arrowright" || k === "d") keys.current.right = down;
    };
    const onDown = setKey(true);
    const onUp = setKey(false);
    const onBlur = () => {
      keys.current.left = false;
      keys.current.right = false;
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);

    let last = performance.now();
    let raf = requestAnimationFrame(function loop(now) {
      const dt = (now - last) / 1000;
      last = now;
      const dir = (keys.current.right ? 1 : 0) - (keys.current.left ? 1 : 0);
      if (dir !== 0) {
        setShipX((x) =>
          Math.max(0, Math.min(GAME_WIDTH - 16, x + dir * SHIP_SPEED * dt)),
        );
      }
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onChange((event) => {
      setShipX((prevX) => {
        const newX = prevX + event.changeX / scale;
        return Math.max(0, Math.min(GAME_WIDTH - 16, newX));
      });
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Canvas style={{ flex: 1 }}>
        <Fill color="black" />
        <Group
          transform={[
            { translateX: offsetX },
            { translateY: offsetY },
            { scale },
          ]}
        >
          <Rect x={shipX} y={shipY} width={16} height={10} color="lightgreen" />
        </Group>
      </Canvas>
    </GestureDetector>
  );
}
