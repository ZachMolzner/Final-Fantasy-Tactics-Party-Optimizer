.unit-sheet {
  display: grid;
  gap: 14px;
  width: 100%;
  min-width: 0;
}

.unit-sheet__identity {
  display: grid;

  grid-template-columns: minmax(0, 230px) minmax(0, 1fr);

  gap: 14px;
  align-items: start;

  width: 100%;
  min-width: 0;
}

.unit-sheet__portraitFrame {
  display: grid;
  gap: 10px;
  align-content: start;

  width: 100%;
  max-width: 230px;
  min-width: 0;
}

.unit-sheet__portrait {
  width: min(230px, 100%);
  aspect-ratio: 3 / 4;
  height: auto;

  border-radius: 16px;
  position: relative;
  overflow: hidden;

  border: 2px solid rgba(199, 155, 59, 0.7);
  background: rgba(255, 250, 240, 0.72);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.unit-sheet__zodiacWatermark {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 4rem;
  opacity: 0.08;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  pointer-events: none;
}

.unit-sheet__portrait-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 10px;
}

.unit-sheet__nameplate {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(79, 61, 35, 0.35);
  background: rgba(255, 250, 240, 0.9);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.14);

  width: min(230px, 100%);
}

.unit-sheet__nameplate-name {
  font-weight: 900;
  color: #3b2b15;
  overflow-wrap: anywhere;
}

.unit-sheet__grid {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 10px;
  min-width: 0;
}

.unit-sheet__identity .unit-sheet__grid {
  min-width: 0;
}

.party-customizer__field {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.party-customizer__input,
.party-customizer__select {
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid rgba(79, 61, 35, 0.45);
  background: rgba(255, 250, 240, 0.85);

  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.unit-sheet__hint {
  font-size: 0.86rem;
  opacity: 0.85;
  margin-top: 4px;
  overflow-wrap: anywhere;
}

.unit-sheet__abilityGroup {
  border: 1px solid rgba(79, 61, 35, 0.35);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 250, 240, 0.75);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
  min-width: 0;
}

.unit-sheet__abilityGroupTitle {
  font-weight: 900;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(79, 61, 35, 0.18);
  background: rgba(255, 232, 168, 0.35);
  color: #3b2b15;
}

.unit-sheet__abilityList {
  display: grid;
  min-width: 0;
}

.unit-sheet__abilityRow {
  display: grid;

  grid-template-columns: 22px minmax(0, 1fr);

  gap: 10px;
  align-items: start;

  padding: 10px 12px;
  cursor: pointer;
  user-select: none;

  border-bottom: 1px solid rgba(79, 61, 35, 0.14);
}

.unit-sheet__abilityRow:last-child {
  border-bottom: 0;
}

.unit-sheet__abilityRow:hover {
  background: rgba(255, 232, 168, 0.22);
}

.unit-sheet__abilityRow--on {
  background: rgba(244, 207, 122, 0.22);
}

.unit-sheet__abilityCheckbox {
  margin-top: 3px;
  width: 18px;
  height: 18px;
  accent-color: #c79b3b;
  cursor: pointer;
}

.unit-sheet__abilityMain {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.unit-sheet__abilityLine {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.unit-sheet__abilityName {
  font-weight: 900;
  color: #3b2b15;

  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unit-sheet__abilityMeta {
  font-size: 0.85rem;
  opacity: 0.85;
  font-weight: 800;
  flex-shrink: 0;
}

.unit-sheet__abilityTags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
}

.unit-sheet__tag {
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid rgba(79, 61, 35, 0.28);
  background: rgba(255, 255, 255, 0.65);
  color: rgba(59, 43, 21, 0.9);
  max-width: 100%;
}

.unit-sheet__tag--muted {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .unit-sheet__identity {
    grid-template-columns: 1fr;
  }

  .unit-sheet__portraitFrame {
    max-width: 240px;
    margin: 0 auto;
  }

  .unit-sheet__portrait {
    width: min(240px, 100%);
    margin: 0 auto;
  }

  .unit-sheet__nameplate {
    width: min(240px, 100%);
    margin: 0 auto;
  }

  .unit-sheet__grid {
    grid-template-columns: 1fr;
  }
}
