import React from "react";

interface SlotItem {
  letter: string;
  fromIndex: number;
}

interface Props {
  slots: Array<SlotItem | null>;
  onDropToSlot: (
    slotIndex: number,
    data: { letter: string; fromIndex: number }
  ) => void;
  onRemoveFromSlot: (slotIndex: number) => void;
  onStartDragFromSlot?: (slotIndex: number) => void;
  onEndDragFromSlot?: (slotIndex: number) => void;
}

const HotChocolateAnswer: React.FC<Props> = ({
  slots,
  onDropToSlot,
  onRemoveFromSlot,
  onStartDragFromSlot,
  onEndDragFromSlot,
}) => {
  return (
    <div style={{ marginTop: 18, textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {slots.map((s, i) => (
          <div
            key={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              e.stopPropagation();
              const raw = e.dataTransfer.getData("application/json");
              if (!raw) return;
              try {
                const data = JSON.parse(raw);
                if (data && data.letter != null && data.fromIndex != null) {
                  onDropToSlot(i, {
                    letter: data.letter,
                    fromIndex: data.fromIndex,
                  });
                }
              } catch (err) {
                // ignore
              }
            }}
            onClick={() => s && onRemoveFromSlot(i)}
            draggable={!!s}
            onDragStart={(e) => {
              if (!s) return;
              e.dataTransfer.setData(
                "application/json",
                JSON.stringify({
                  letter: s.letter,
                  fromIndex: s.fromIndex,
                  fromSlot: i,
                })
              );
              e.dataTransfer.effectAllowed = "move";
              onStartDragFromSlot && onStartDragFromSlot(i);
            }}
            onDragEnd={() => {
              onEndDragFromSlot && onEndDragFromSlot(i);
            }}
            style={{
              width: 64,
              height: 56,
              borderRadius: 12,
              background: s
                ? "linear-gradient(180deg,#ffffff,#f7f7f7)"
                : "rgba(255,255,255,0.06)",
              boxShadow: s ? "0 8px 16px rgba(0,0,0,0.12)" : undefined,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: s ? "pointer" : "default",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 800, color: "#5b2f15" }}>
              {s ? s.letter : ""}
            </span>
          </div>
        ))}
      </div>
      {/* Submit handled automatically by the parent when all slots are filled */}
    </div>
  );
};

export default HotChocolateAnswer;
