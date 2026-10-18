import { Canvas, Fill, Rect, Group } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useState } from "react";

export default function GameCanvas() {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / GAME_WIDTH, height / GAME_HEIGHT);
  const offsetX = (width - GAME_WIDTH * scale) / 2;
  const offsetY = (height - GAME_HEIGHT * scale) / 2;
  const [shipX, setShipX] = useState(GAME_WIDTH / 2 - 8);
  const shipY = GAME_HEIGHT - 30;
  const panGesture = Gesture.Pan().onChange((event) => {
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
