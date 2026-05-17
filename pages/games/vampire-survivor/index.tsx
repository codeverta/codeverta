import React, { useEffect } from "react";
import TheGame from "./TheGame";

function VampireSurvivor() {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    setLoaded(true);
  });

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TheGame />
    </div>
  );
}

export default VampireSurvivor;
