import React, { useState } from "react";

export default function useGlobalState() {
  const [showTree, setShowTree] = useState(true);
  const [showThanksgiving, setShowThanksgiving] = useState(false);
  const [showChristmasEve, setShowChristmasEve] = useState(false);
  const [showChristmas, setShowChristmas] = useState(false);

  return {
    showThanksgiving,
    showChristmas,
    showChristmasEve,
    showTree,
    setShowChristmas,
    setShowChristmasEve,
    setShowThanksgiving,
    setShowTree,
  };
}
