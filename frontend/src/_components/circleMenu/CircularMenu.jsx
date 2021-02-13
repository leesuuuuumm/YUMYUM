import { Planet } from "react-planet";

export default function CircularMenu() {
  return (
    <Planet
      centerContent={
        <div
          style={{
            height: 50,
            width: 50,
            borderRadius: "50%",
            backgroundColor: "#1da8a4",
          }}
        />
      }
      hideOrbit
      autoClose
      orbitRadius={60}
      bounceOnClose
      rotation={75}
      // the bounce direction is minimal visible
      // but on close it seems the button wobbling a bit to the bottom
      bounceDirection="BOTTOM"
    >
      <div
        style={{
          height: 30,
          width: 30,
          borderRadius: "50%",
          backgroundColor: "#9257ad",
        }}
      />
      <div
        style={{
          height: 30,
          width: 30,
          borderRadius: "50%",
          backgroundColor: "#9257ad",
        }}
      />
      <div
        style={{
          height: 30,
          width: 30,
          borderRadius: "50%",
          backgroundColor: "#9257ad",
        }}
      />
      <div
        style={{
          height: 30,
          width: 30,
          borderRadius: "50%",
          backgroundColor: "#9257ad",
        }}
      />
      <div />
      <div />
      <div />
    </Planet>
  );
}
