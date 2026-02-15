import { getPortraitSrc } from "../../../data/portraits.seed.js";
import "./PartyRoster.css";

export default function PartyRoster({
  units,
  activeUnitId,
  onSelect,
  onAdd,
  onRemove,
  jobs,
}) {
  const jobById = (id) => jobs.find((j) => j.id === id);
  const jobName = (id) => jobById(id)?.name || id;

  return (
    <div className="roster">
      <div className="roster__header">
        <h2 className="party-customizer__panel-title roster__title">
          Party Roster
        </h2>

        <div className="roster__header-actions">
          <button
            className="roster__btn roster__btn--ghost"
            onClick={onAdd}
            type="button"
          >
            + Add
          </button>
          <button
            className="roster__btn roster__btn--ghost"
            onClick={onRemove}
            type="button"
            disabled={units.length <= 1}
            title={
              units.length <= 1
                ? "You need at least 1 unit"
                : "Remove selected unit"
            }
          >
            − Remove
          </button>
        </div>
      </div>

      <div className="roster__list">
        {units.map((u) => {
          const job = jobById(u.primaryJobId);
          const isActive = u.id === activeUnitId;

          // ✅ FIX: pass characterId so uniques (cidolfus/orlandeau/etc) resolve correctly
          const portraitSrc = getPortraitSrc({
            primaryJob: job?.name || u.primaryJobId,
            gender: u.gender,
            characterId: u.characterId,
          });

          return (
            <button
              key={u.id}
              type="button"
              className={`roster__item ${isActive ? "roster__item--active" : ""}`}
              onClick={() => onSelect(u.id)}
            >
              <div className="roster__portrait">
                <img
                  src={portraitSrc}
                  alt={`${u.name} portrait`}
                  className="roster__portrait-img"
                  loading="lazy"
                />
              </div>

              <div className="roster__meta">
                <div className="roster__topline">
                  <span className="roster__name">{u.name}</span>
                  <span className="roster__badges">
                    <span className="roster__badge">Lv {u.level}</span>
                    <span className="roster__badge roster__badge--muted">
                      {u.zodiac?.slice(0, 3)}
                    </span>
                  </span>
                </div>

                <div className="roster__subline">
                  <span className="roster__job">{jobName(u.primaryJobId)}</span>
                  <span className="roster__dot">•</span>
                  <span className="roster__gender">{u.gender}</span>

                  {u.characterId && u.characterId !== "none" ? (
                    <>
                      <span className="roster__dot">•</span>
                      <span className="roster__unique">{u.characterId}</span>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="roster__chev" aria-hidden="true">
                ›
              </div>
            </button>
          );
        })}
      </div>

      <div className="roster__footer">
        <div className="roster__hint">
          Tip: changing a unit’s Primary Job updates portraits + roster
          instantly.
        </div>
      </div>
    </div>
  );
}
